/**
 * MerchantLogo — renders a merchant's logo next to a transaction.
 *
 * Two-tier strategy:
 *   1. Try logo.dev with a domain derived from the merchant name (see
 *      lib/utils/merchants.ts). If the request succeeds the user sees
 *      the real brand mark.
 *   2. If the request fails (404, network error) or the logo.dev token
 *      isn't configured, fall back to a coloured initial-circle. The
 *      colour is hashed from the merchant name so the same merchant
 *      always gets the same fallback colour.
 *
 * This keeps the transaction list visually rich without requiring a
 * pre-curated logo dataset.
 */
'use client';

import { useState } from 'react';
import { getMerchantDomain } from '@/lib/utils/merchants';

const COLORS = [
  ['#e0f2fe', '#0369a1'], // sky
  ['#fce7f3', '#be185d'], // pink
  ['#dcfce7', '#15803d'], // green
  ['#fef3c7', '#b45309'], // amber
  ['#ede9fe', '#6d28d9'], // violet
  ['#fee2e2', '#b91c1c'], // red
  ['#e0fdf4', '#0f766e'], // teal
  ['#f0fdf4', '#166534'], // emerald
];

function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

interface MerchantLogoProps {
  name: string;
  size?: number;
}

export default function MerchantLogo({ name, size = 36 }: MerchantLogoProps) {
  const [failed, setFailed] = useState(false);

  const token = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;
  const domain = getMerchantDomain(name);
  const initial = name.trim()[0]?.toUpperCase() ?? '?';
  const [bg, text] = getColor(name);

  const fallback = (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        background: bg,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ color: text, fontWeight: 700, fontSize: size * 0.38, lineHeight: 1 }}>
        {initial}
      </span>
    </div>
  );

  if (failed || !token) return fallback;

  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid #f1f5f9',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.logo.dev/${domain}?token=${token}&retina=true`}
        alt={name}
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'contain' }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

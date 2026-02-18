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

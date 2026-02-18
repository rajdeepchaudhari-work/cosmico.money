'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const STORAGE_KEY = 'cosmico_disclaimer_v1';

const checks = [
  { label: 'No real bank accounts accessed', sub: 'All data is simulated via Plaid Sandbox' },
  { label: 'No real money is moved',          sub: 'Transfers run through Dwolla Sandbox only' },
  { label: 'No real financial data stored',   sub: 'Everything is test data — fully isolated' },
];

export default function DisclaimerModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col">

        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="px-6 pt-4 pb-4 sm:pt-6">
          <div className="flex items-center gap-3 mb-1">
            {/* Warning icon */}
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
              style={{ background: 'rgba(252,92,58,0.1)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="#FC5C3A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">Sandbox Demo — Not a Real Bank</h2>
              <p className="text-xs text-gray-400 mt-0.5">Please read before continuing</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mx-6" />

        {/* Body */}
        <div className="px-6 py-5 space-y-5 overflow-y-auto" style={{ maxHeight: '52vh' }}>

          {/* Sandbox pill */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(252,92,58,0.08)', color: '#FC5C3A' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-current" />
            Running in Sandbox / Test Mode only
          </div>

          {/* Intro */}
          <p className="text-sm text-gray-600 leading-relaxed">
            Cosmico is a <span className="font-semibold text-gray-900">portfolio & demonstration project</span> built for educational purposes. It is not a regulated bank or financial service.
          </p>

          {/* Check list */}
          <div className="space-y-2.5">
            {checks.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div
                  className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(54,141,255,0.12)' }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#368DFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Regulatory disclaimer */}
          <div className="rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3.5">
            <div className="flex items-center gap-1.5 mb-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">Regulatory Disclaimer</p>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Cosmico is <strong>not authorised or regulated by the Financial Conduct Authority (FCA)</strong>, FINRA, or any financial regulatory body. It does not provide financial advice or payment services and must not be relied upon for real-world financial decisions.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 pt-4 pb-6 sm:pb-5 border-t border-gray-100 bg-gray-50/60">
          <button
            onClick={handleAccept}
            className="w-full py-3 rounded-xl text-white text-sm font-semibold tracking-wide hover:opacity-90 active:scale-[0.98] transition-all shadow"
            style={{ background: 'linear-gradient(135deg, #FC5C3A 0%, #ff7958 100%)' }}
          >
            I Understand — Continue to Cosmico
          </button>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <Image src="/icons/logo.svg" alt="Cosmico" width={14} height={14} className="opacity-35" />
            <span className="text-[11px] text-gray-400">Cosmico · Beta · Sandbox Mode</span>
          </div>
        </div>

      </div>
    </div>
  );
}

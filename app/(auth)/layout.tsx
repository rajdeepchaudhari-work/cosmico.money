import Link from "next/link";
import Image from "next/image";
import ChatWidget from "@/components/ChatWidget";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full font-inter" style={{ background: '#09090f' }}>
      {/* ── Left: Form panel ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-16 lg:px-16">
        {children}
      </div>

      <ChatWidget />

      {/* ── Right: Brand panel (desktop only) ── */}
      <div
        className="hidden lg:flex relative w-[460px] shrink-0 flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1c0f3a 55%, #1a1f3a 100%)' }}
      >
        {/* Glow orbs */}
        <div className="absolute rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ width: 340, height: 340, top: '8%', left: '-15%', background: 'radial-gradient(circle, #FC5C3A, transparent)' }} />
        <div className="absolute rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ width: 280, height: 280, bottom: '12%', right: '-8%', background: 'radial-gradient(circle, #FC5C3A, transparent)' }} />
        <div className="absolute rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ width: 200, height: 200, top: '50%', right: '20%', background: 'radial-gradient(circle, #ff7958, transparent)' }} />

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        {/* Content */}
        <div className="relative z-10 px-10 py-12 flex flex-col items-center text-center w-full">
          <Link href="/landing" className="flex items-center gap-2 mb-12">
            <Image src="/icons/logo.svg" alt="Cosmico" width={36} height={36} />
            <span className="text-xl font-bold text-white font-ibm-plex-serif">Cosmico</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
              style={{ background: 'rgba(252,92,58,0.15)', color: '#FC5C3A', border: '1px solid rgba(252,92,58,0.25)' }}>
              Beta
            </span>
          </Link>

          <h2 className="text-3xl font-bold text-white font-ibm-plex-serif leading-snug mb-4">
            Banking that<br />
            <span style={{ background: 'linear-gradient(135deg, #FC5C3A, #ff7958)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              works for you.
            </span>
          </h2>

          <p className="text-sm leading-relaxed mb-10 max-w-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            AI-powered insights, multi-bank aggregation, and Quest Board rewards — all in one intelligent dashboard.
          </p>

          <div className="flex flex-col gap-2.5 w-full mb-10">
            {[
              { icon: '🏦', text: 'Connect all your banks in one place' },
              { icon: '🤖', text: 'AI-powered spending insights 24/7' },
              { icon: '🏆', text: 'Earn rewards for smart financial habits' },
              { icon: '🔐', text: 'Bank-grade 2FA on every sign-in' },
            ].map(f => (
              <div key={f.text} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}>
                <span className="text-base shrink-0">{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Mini stat row */}
          <div className="flex gap-8 mb-10">
            {[
              { value: '2,000+', label: 'Beta users' },
              { value: '£0', label: 'Fees, ever' },
              { value: '3', label: 'Countries' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="w-full pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Protected by 2FA · End-to-end encrypted · GDPR compliant
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

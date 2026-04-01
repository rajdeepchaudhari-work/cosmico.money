import Image from 'next/image'
import Link from 'next/link'
import DisclaimerModal from '@/components/DisclaimerModal'
import ChatWidget from '@/components/ChatWidget'
import AnimatedTagline from '@/components/AnimatedTagline'
import dynamic from 'next/dynamic'

const SplineBackground = dynamic(() => import('@/components/SplineBackground'), { ssr: false })

export default function LandingPage() {
  return (
    <main className="min-h-screen font-inter overflow-x-hidden" style={{ background: '#09090f' }}>
      <DisclaimerModal />
      <ChatWidget />

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{
        background: 'rgba(9,9,15,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/icons/logo.svg" alt="Cosmico" width={30} height={30} />
            <span className="text-xl font-bold text-white font-ibm-plex-serif">Cosmico</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 uppercase tracking-wide"
              style={{ background: 'rgba(252,92,58,0.15)', color: '#FC5C3A' }}>Beta</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in"
              className="text-sm font-medium transition-colors px-3 py-2"
              style={{ color: 'rgba(255,255,255,0.6)' }}>
              Sign In
            </Link>
            <Link href="/sign-up"
              className="text-sm font-semibold text-white px-5 py-2 rounded-lg transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #FC5C3A, #ff7958)' }}>
              Join Beta
            </Link>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          HERO — Dark gradient with 3D mockup
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">

        {/* Spline 3D background */}
        <SplineBackground scene="/hero-scene.splinecode" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* ── Left: Copy ── */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 uppercase tracking-wide"
                style={{ background: 'rgba(252,92,58,0.12)', color: '#FC5C3A', border: '1px solid rgba(252,92,58,0.2)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FC5C3A' }} />
                AI-Powered Banking · Beta
              </div>

              <h1 className="font-bold text-white leading-[1.15] mb-6 font-ibm-plex-serif"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)' }}>
                Banking that<br />
                <span className="inline-block whitespace-nowrap"><AnimatedTagline /></span>
              </h1>

              <p className="text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
                style={{ color: 'rgba(255,255,255,0.5)' }}>
                Cosmico connects all your bank accounts, analyses spending with AI-powered charts, and rewards you for smart financial habits — one intelligent dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12">
                <Link href="/sign-up"
                  className="px-8 py-4 rounded-xl text-white font-bold hover:scale-105 transition-all text-sm"
                  style={{ background: 'linear-gradient(135deg, #FC5C3A 0%, #ff7958 100%)', boxShadow: '0 0 40px rgba(252,92,58,0.35)' }}>
                  Get Early Access →
                </Link>
                <Link href="/sign-in"
                  className="px-8 py-4 rounded-xl font-semibold text-sm hover:scale-105 transition-all"
                  style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
                  Sign In
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
                {[
                  { value: '2,000+', label: 'Early adopters' },
                  { value: '3', label: 'Countries' },
                  { value: '£0', label: 'Fees, always' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: 3D Dashboard Mockup ── */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div style={{ perspective: '1200px' }} className="relative">

                {/* Glow behind card */}
                <div className="absolute inset-0 blur-3xl opacity-25 scale-90 rounded-3xl"
                  style={{ background: 'linear-gradient(135deg, #FC5C3A, #368DFF)' }} />

                {/* Main card */}
                <div className="relative hero-mockup" style={{
                  transform: 'rotateX(6deg) rotateY(-14deg)',
                  width: 380,
                  background: '#13131e',
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
                  overflow: 'hidden',
                }}>
                  {/* Header */}
                  <div style={{ background: '#1a1a2e', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#FC5C3A,#ff7958)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: 'white' }}>C</div>
                      <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>Cosmico</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                      <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>Live</span>
                    </div>
                  </div>
                  {/* Balance */}
                  <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: 1 }}>Total Balance</p>
                    <p style={{ color: 'white', fontSize: 30, fontWeight: 800, margin: '0 0 3px', lineHeight: 1.1 }}>£24,891<span style={{ fontSize: 16, opacity: 0.55 }}>.50</span></p>
                    <span style={{ color: '#10b981', fontSize: 11, fontWeight: 600 }}>↑ +£1,240 this month</span>
                  </div>
                  {/* Mini banks */}
                  <div style={{ padding: '12px 20px', display: 'flex', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    {[{ name: 'Barclays', amt: '£12,440', c: '#1e40af' }, { name: 'Monzo', amt: '£8,200', c: '#FC5C3A' }, { name: 'Chase', amt: '£4,251', c: '#0d9488' }].map(b => (
                      <div key={b.name} style={{ flex: 1, background: b.c + '20', border: `1px solid ${b.c}40`, borderRadius: 9, padding: '7px 9px' }}>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, margin: '0 0 2px', textTransform: 'uppercase' }}>{b.name}</p>
                        <p style={{ color: 'white', fontSize: 11, fontWeight: 700, margin: 0 }}>{b.amt}</p>
                      </div>
                    ))}
                  </div>
                  {/* Spend bars */}
                  <div style={{ padding: '12px 20px 8px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 0.8 }}>Monthly Spend</p>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 40 }}>
                      {[35, 52, 41, 68, 45, 72, 58, 44, 60, 78, 55, 80].map((h, i) => (
                        <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 3, background: i === 11 ? 'linear-gradient(180deg,#FC5C3A,#ff7958)' : 'rgba(255,255,255,0.09)' }} />
                      ))}
                    </div>
                  </div>
                  {/* Transactions */}
                  <div style={{ padding: '10px 20px 14px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 0.8 }}>Recent</p>
                    {[
                      { icon: '🛒', name: 'Tesco', amt: '-£48.20', t: 'Today' },
                      { icon: '☕', name: 'Costa Coffee', amt: '-£4.50', t: 'Yesterday' },
                      { icon: '↗️', name: 'Salary', amt: '+£3,200', t: 'Mon', green: true },
                    ].map(tx => (
                      <div key={tx.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <span style={{ fontSize: 14 }}>{tx.icon}</span>
                          <div>
                            <p style={{ color: 'white', fontSize: 11, fontWeight: 600, margin: 0 }}>{tx.name}</p>
                            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 9, margin: 0 }}>{tx.t}</p>
                          </div>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: tx.green ? '#10b981' : 'rgba(255,255,255,0.65)' }}>{tx.amt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating notification */}
                <div className="absolute hero-badge-top" style={{ top: -16, right: -22, background: 'white', borderRadius: 12, padding: '9px 13px', boxShadow: '0 12px 40px rgba(0,0,0,0.4)', minWidth: 155 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#111827', margin: '0 0 2px' }}>💸 Transfer sent</p>
                  <p style={{ fontSize: 10, color: '#6b7280', margin: 0 }}>£250 to John D. · Just now</p>
                </div>

                {/* Floating AI badge */}
                <div className="absolute hero-badge-bottom" style={{ bottom: -14, left: -22, borderRadius: 12, padding: '9px 13px', boxShadow: '0 12px 40px rgba(252,92,58,0.3)', background: 'linear-gradient(135deg,#FC5C3A,#ff7958)', minWidth: 148 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'white', margin: '0 0 2px' }}>🤖 Cosmico AI</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', margin: 0 }}>You could save £180/mo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #09090f)' }} />
      </section>

      {/* ── Countries Strip ── */}
      <div className="py-10 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          <p className="text-xs font-bold uppercase tracking-widest shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }}>Available in</p>
          <div className="flex items-center gap-4 sm:gap-8 flex-wrap justify-center">
            {[{ src: '/icons/US.png', label: 'United States' }, { src: '/icons/UK.png', label: 'United Kingdom' }, { src: '/icons/CA.png', label: 'Canada' }].map(c => (
              <div key={c.label} className="flex items-center gap-2.5">
                <Image src={c.src} alt={c.label} width={32} height={22} className="rounded-sm shadow-sm object-cover" />
                <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>{c.label}</span>
              </div>
            ))}
            <div className="hidden sm:block w-px h-6" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="flex items-center gap-2.5 opacity-35">
              <Image src="/icons/european-union.png" alt="EU" width={32} height={22} className="rounded-sm shadow-sm object-cover grayscale" />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>Europe</span>
                <span className="text-[10px] font-bold uppercase tracking-wide mt-0.5" style={{ color: '#FC5C3A' }}>Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BENTO FEATURES GRID
      ══════════════════════════════════════ */}
      <section className="py-32 px-6 relative" style={{ background: '#0a0a12' }}>
        {/* Dot grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

        <div className="max-w-6xl mx-auto relative">

          {/* Editorial header */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-7">
              <div className="h-px w-10" style={{ background: '#FC5C3A' }} />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.18em]" style={{ color: '#FC5C3A' }}>Why Cosmico</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2 className="text-5xl lg:text-6xl font-bold text-white font-ibm-plex-serif leading-[1.05]">
                One platform.<br />
                <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.22)', color: 'transparent' }}>Every edge.</span>
              </h2>
              <p className="text-sm leading-relaxed max-w-xs lg:text-right" style={{ color: 'rgba(255,255,255,0.32)' }}>
                AI-native financial infrastructure built for people who demand more from their money.
              </p>
            </div>
            <div className="mt-10 h-px" style={{ background: 'linear-gradient(90deg, rgba(252,92,58,0.5), rgba(54,141,255,0.3), transparent)' }} />
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* 01 — AI Insights (wide) */}
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-default"
              style={{ background: 'linear-gradient(140deg,#111122 0%,#0d0d1a 100%)', border: '1px solid rgba(255,255,255,0.07)', minHeight: 300 }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at 20% 60%, rgba(252,92,58,0.09), transparent 55%)' }} />
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.18)' }}>— 01</span>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full"
                    style={{ background: 'rgba(252,92,58,0.1)', border: '1px solid rgba(252,92,58,0.2)' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FC5C3A' }} />
                    <span className="text-xs font-bold" style={{ color: '#FC5C3A' }}>GPT-4o-mini</span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 flex-1">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3 font-ibm-plex-serif leading-tight">
                      AI that reads<br />your finances
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.36)' }}>
                      Your personal AI banker analyses every transaction in real time — surfacing savings, flagging anomalies, and advising before you even notice.
                    </p>
                    <div className="flex gap-2 mt-6 flex-wrap">
                      {['Spending AI', 'Trend detection', 'Smart alerts', 'Category charts'].map(t => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-md font-mono"
                          style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.32)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mini AI insight widget */}
                  <div className="shrink-0 w-full lg:w-52 rounded-xl overflow-hidden self-start"
                    style={{ background: '#0b0b17', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="px-4 py-2.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: 'linear-gradient(135deg,#FC5C3A,#ff7958)' }}>C</div>
                      <span className="text-xs font-bold text-white">Cosmico AI</span>
                      <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#34d399' }} />
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                      <div className="rounded-lg px-3 py-2.5 text-xs leading-relaxed"
                        style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        Spent <span className="text-white font-bold">£284</span> this month — dining out is <span style={{ color: '#FC5C3A' }}>38%</span> of budget.
                      </div>
                      <div className="space-y-2">
                        {[{ label: 'Dining', pct: 38, color: '#FC5C3A' }, { label: 'Transport', pct: 22, color: '#368DFF' }, { label: 'Groceries', pct: 28, color: '#8b5cf6' }].map(b => (
                          <div key={b.label}>
                            <div className="flex justify-between mb-1">
                              <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.28)' }}>{b.label}</span>
                              <span className="text-[9px] font-mono font-bold" style={{ color: b.color }}>{b.pct}%</span>
                            </div>
                            <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                              <div className="h-1 rounded-full transition-all" style={{ width: `${b.pct}%`, background: b.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 02 — Security */}
            <div className="relative rounded-2xl overflow-hidden group cursor-default"
              style={{ background: 'linear-gradient(160deg,#0c1828 0%,#0d0d1a 100%)', border: '1px solid rgba(54,141,255,0.1)', minHeight: 300 }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(54,141,255,0.1), transparent 55%)' }} />
              <div className="p-8 flex flex-col h-full">
                <span className="text-xs font-mono mb-8" style={{ color: 'rgba(255,255,255,0.18)' }}>— 02</span>
                {/* Encrypted hash display */}
                <div className="rounded-xl p-4 mb-auto font-mono"
                  style={{ background: 'rgba(54,141,255,0.06)', border: '1px solid rgba(54,141,255,0.12)' }}>
                  <p className="text-[9px] mb-2 uppercase tracking-widest" style={{ color: 'rgba(54,141,255,0.5)' }}>AES-256 · TLS 1.3</p>
                  <p className="text-xs break-all leading-relaxed" style={{ color: 'rgba(54,141,255,0.65)' }}>a3f9••••b2c1••••e7d4••••91fa••••</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#34d399' }} />
                    <span className="text-[9px] font-bold" style={{ color: '#34d399' }}>Session verified · 2FA active</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-white mb-2 font-ibm-plex-serif">Bank-grade security</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.33)' }}>
                    End-to-end encryption and 2FA on every sign-in. The same standards as tier-1 institutions.
                  </p>
                </div>
              </div>
            </div>

            {/* 03 — Transfers */}
            <div className="relative rounded-2xl overflow-hidden group cursor-default"
              style={{ background: 'linear-gradient(140deg,#0f0d22 0%,#0d0d1a 100%)', border: '1px solid rgba(139,92,246,0.1)', minHeight: 210 }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at 30% 70%, rgba(139,92,246,0.1), transparent 55%)' }} />
              <div className="p-8">
                <span className="text-xs font-mono mb-7 block" style={{ color: 'rgba(255,255,255,0.18)' }}>— 03</span>
                {/* Transfer visual */}
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(139,92,246,0.28)' }}>R</div>
                  <div className="flex-1 relative flex items-center">
                    <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.4), rgba(139,92,246,0.1))' }} />
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 px-2 py-0.5 rounded-md"
                      style={{ background: '#0d0d1a', border: '1px solid rgba(139,92,246,0.25)' }}>
                      <span className="text-xs font-mono font-bold" style={{ color: '#8b5cf6' }}>£250</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(139,92,246,0.28)' }}>J</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1.5 font-ibm-plex-serif">Instant transfers</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.33)' }}>
                  ACH-powered with zero fees. Settled in seconds.
                </p>
              </div>
            </div>

            {/* 04 — Multi-bank */}
            <div className="relative rounded-2xl overflow-hidden group cursor-default"
              style={{ background: 'linear-gradient(140deg,#091626 0%,#0d0d1a 100%)', border: '1px solid rgba(54,141,255,0.1)', minHeight: 210 }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(54,141,255,0.09), transparent 55%)' }} />
              <div className="p-8">
                <span className="text-xs font-mono mb-7 block" style={{ color: 'rgba(255,255,255,0.18)' }}>— 04</span>
                {/* Bank stack */}
                <div className="flex flex-col gap-2 mb-7">
                  {[
                    { name: 'Barclays', bal: '£12,440', c: '#1d4ed8' },
                    { name: 'Monzo', bal: '£8,200', c: '#FC5C3A' },
                    { name: 'Chase', bal: '£4,251', c: '#0d9488' },
                  ].map(b => (
                    <div key={b.name} className="flex items-center justify-between px-3 py-2 rounded-lg"
                      style={{ background: `${b.c}12`, border: `1px solid ${b.c}28` }}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: b.c }} />
                        <span className="text-xs font-semibold text-white">{b.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold" style={{ color: b.c }}>{b.bal}</span>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-1.5 font-ibm-plex-serif">Multi-bank view</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.33)' }}>
                  All accounts, balances, and transactions — unified.
                </p>
              </div>
            </div>

            {/* 05 — AI Rewards */}
            <div className="relative rounded-2xl overflow-hidden group cursor-default"
              style={{ background: 'linear-gradient(140deg,#18100a 0%,#0d0d1a 100%)', border: '1px solid rgba(252,92,58,0.1)', minHeight: 210 }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(252,92,58,0.1), transparent 55%)' }} />
              <div className="p-8">
                <span className="text-xs font-mono mb-7 block" style={{ color: 'rgba(255,255,255,0.18)' }}>— 05</span>
                {/* Quest progress widget */}
                <div className="rounded-xl p-4 mb-7"
                  style={{ background: 'rgba(252,92,58,0.07)', border: '1px solid rgba(252,92,58,0.14)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Tesco Challenge</span>
                    <span className="text-xs font-mono font-bold" style={{ color: '#FC5C3A' }}>60%</span>
                  </div>
                  <div className="h-1.5 rounded-full mb-2" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: '60%', background: 'linear-gradient(90deg,#FC5C3A,#ff7958)' }} />
                  </div>
                  <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.28)' }}>£5 cashback · spend £50 at Tesco</p>
                </div>
                <h3 className="text-xl font-bold text-white mb-1.5 font-ibm-plex-serif">AI Rewards</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.33)' }}>
                  GPT-4o-mini builds personalised quests. Earn cashback for habits you already have.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CSS 3D Scroll Card ── */}
      <ScrollCard />

      {/* ══════════════════════════════════════
          AI SPOTLIGHT
      ══════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: '#09090f' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-wide"
              style={{ background: 'rgba(252,92,58,0.1)', color: '#FC5C3A', border: '1px solid rgba(252,92,58,0.15)' }}>
              ✦ Powered by GPT-4o-mini
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 font-ibm-plex-serif">
              Meet{' '}
              <span style={{ background: 'linear-gradient(135deg, #FC5C3A 0%, #368DFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Cosmico AI
              </span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Your personal AI banker, available 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Chat mockup */}
            <div className="rounded-3xl overflow-hidden" style={{
              background: '#13131e', border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 0 80px rgba(252,92,58,0.06)',
            }}>
              <div className="px-5 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #FC5C3A, #ff7958)' }}>
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-sm">C</div>
                <div>
                  <p className="text-white font-bold text-sm">Cosmico AI</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>Always online · GPT-4o-mini</p>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              </div>
              <div className="p-5 flex flex-col gap-4" style={{ background: '#0f0f1a' }}>
                {[
                  { ai: true, msg: "Hi! 👋 I've analysed your accounts. You've spent **£284** this month — mostly food & dining. Want tips to cut back?" },
                  { ai: false, msg: "Yes please! What's my top merchant this month?" },
                  { ai: true, msg: "Your top merchant is **Tesco** at £62. You also have a Quest there — you're 60% towards a **£5 cashback** reward! 🎯" },
                ].map((m, i) => (
                  <div key={i} className={`flex gap-3 items-start ${!m.ai ? 'justify-end' : ''}`}>
                    {m.ai && (
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: 'linear-gradient(135deg, #FC5C3A, #ff7958)' }}>C</div>
                    )}
                    <div className="rounded-2xl px-4 py-3 max-w-xs text-sm leading-relaxed"
                      style={{
                        background: m.ai ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #FC5C3A, #ff7958)',
                        border: m.ai ? '1px solid rgba(255,255,255,0.06)' : 'none',
                        borderTopLeftRadius: m.ai ? 4 : 16,
                        borderTopRightRadius: m.ai ? 16 : 4,
                        color: m.ai ? 'rgba(255,255,255,0.8)' : 'white',
                      }}>
                      {m.msg.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </div>
                  </div>
                ))}
                <div className="flex gap-2 mt-1">
                  <div className="flex-1 rounded-xl px-4 py-2.5 text-sm"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.25)' }}>
                    Ask anything about your finances...
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #FC5C3A, #ff7958)' }}>↑</div>
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="flex flex-col gap-6">
              {[
                { icon: '💬', color: '#FC5C3A', title: 'Contextual spending chat', desc: 'Reads your live transaction data before every response — answers about your real finances, not generic advice.' },
                { icon: '🎯', color: '#368DFF', title: 'Personalised AI rewards', desc: 'GPT-4o-mini analyses your spending patterns and generates tailored merchant challenges to earn cashback.' },
                { icon: '📊', color: '#8b5cf6', title: 'Spending analysis on demand', desc: 'Ask "where did my money go?" — get instant Monzo-style charts: doughnuts, bar charts, trend lines.' },
                { icon: '⚡', color: '#10b981', title: 'Always-on floating widget', desc: 'Lives in the corner of your dashboard. One click — instant answers, no navigation.' },
              ].map(item => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${item.color}14`, border: `1px solid ${item.color}22` }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          QUEST REWARDS
      ══════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: '#0d0d17' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-wide"
              style={{ background: 'rgba(54,141,255,0.1)', color: '#368DFF', border: '1px solid rgba(54,141,255,0.15)' }}>
              ✦ AI-Generated · Personalised
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 font-ibm-plex-serif">
              Earn rewards for spending{' '}
              <span style={{ background: 'linear-gradient(135deg, #368DFF, #FC5C3A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                you already do
              </span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.35)' }}>
              GPT-4o-mini studies your transaction history and builds a personalised Quest Board.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="flex flex-col gap-6">
              {[
                { icon: '🤖', color: '#368DFF', title: 'AI builds your quests', desc: 'Every challenge is generated fresh from your actual spending. Tesco shopper? You get a Tesco quest.' },
                { icon: '📈', color: '#FC5C3A', title: 'XP progress tracking', desc: 'Live progress bars fill as you spend. Watch your XP grow toward the reward threshold.' },
                { icon: '🎁', color: '#8b5cf6', title: 'Real prizes, real merchants', desc: 'Amazon vouchers, cashback, and gift cards from brands you use — unlocked automatically.' },
                { icon: '🔄', color: '#10b981', title: 'Fresh quests, always', desc: 'Complete your board and new AI challenges appear. Your Quest Board evolves with you.' },
              ].map(item => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${item.color}14`, border: `1px solid ${item.color}22` }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quest board */}
            <div className="rounded-3xl overflow-hidden" style={{ background: '#13131e', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="px-5 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e293b)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(54,141,255,0.2)' }}>🎯</div>
                  <div>
                    <p className="text-white font-bold text-sm">Quest Board</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Cosmico AI</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(54,141,255,0.15)', color: '#60a5fa' }}>3 Active</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>1 Done</span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-3" style={{ background: '#0f0f1a' }}>
                {[
                  { icon: '🛒', name: 'Tesco Challenge', desc: 'Spend £80 at Tesco this month', reward: '£5 cashback', xp: '+120 XP', pct: 60, progress: '£48 / £80', color: '#FC5C3A' },
                  { icon: '☕', name: 'Costa Coffee Run', desc: 'Visit Costa 5 times this month', reward: 'Free drink', xp: '+80 XP', pct: 40, progress: '2 / 5 visits', color: '#368DFF' },
                ].map(q => (
                  <div key={q.name} className="rounded-2xl overflow-hidden" style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${q.color}, ${q.color}66)` }} />
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${q.color}15` }}>{q.icon}</div>
                          <div>
                            <p className="text-sm font-bold text-white">{q.name}</p>
                            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{q.desc}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <p className="text-xs font-bold" style={{ color: q.color }}>{q.reward}</p>
                          <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{q.xp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 rounded-full h-1.5" style={{ background: 'rgba(255,255,255,0.07)' }}>
                          <div className="h-1.5 rounded-full" style={{ width: `${q.pct}%`, background: `linear-gradient(90deg, ${q.color}, ${q.color}88)` }} />
                        </div>
                        <span className="text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.3)' }}>{q.progress}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl overflow-hidden opacity-45" style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #10b981, #10b98166)' }} />
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(16,185,129,0.1)' }}>🎬</div>
                      <div>
                        <p className="text-sm font-bold text-white">Cinema Weekend</p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Spend £20 at Vue Cinema</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.12)', color: '#34d399' }}>✓ Done</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="py-32 px-6 relative overflow-hidden" style={{ background: '#09090f' }}>
        {/* faint horizontal rule accent */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#FC5C3A' }} />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.18em]" style={{ color: '#FC5C3A' }}>Getting Started</span>
              <div className="h-px w-8" style={{ background: '#FC5C3A' }} />
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white font-ibm-plex-serif leading-tight">
              Up in{' '}
              <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.3)', color: 'transparent' }}>3 steps.</span>
            </h2>
          </div>

          {/* Steps — horizontal timeline on desktop */}
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-[52px] left-[16.66%] right-[16.66%] h-px"
              style={{ background: 'linear-gradient(90deg, rgba(252,92,58,0.4), rgba(54,141,255,0.4), rgba(139,92,246,0.4))' }} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                {/* Number node */}
                <div className="relative mb-10 z-10">
                  <div className="w-[104px] h-[104px] rounded-2xl flex flex-col items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #1a0e06, #0f0d1a)', border: '1px solid rgba(252,92,58,0.2)', boxShadow: '0 0 40px rgba(252,92,58,0.12)' }}>
                    <span className="text-3xl font-bold font-ibm-plex-serif" style={{ color: '#FC5C3A' }}>01</span>
                    <span className="text-[9px] font-mono uppercase tracking-widest mt-1" style={{ color: 'rgba(252,92,58,0.45)' }}>Sign up</span>
                  </div>
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: '0 0 0 1px rgba(252,92,58,0.4), 0 0 30px rgba(252,92,58,0.15)' }} />
                </div>

                {/* Card */}
                <div className="w-full rounded-2xl p-6 mb-6"
                  style={{ background: '#0f0f1a', border: '1px solid rgba(252,92,58,0.1)' }}>
                  {/* Coded visual — form fields */}
                  <div className="flex flex-col gap-2.5">
                    <div className="h-8 rounded-lg px-3 flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'rgba(252,92,58,0.5)' }} />
                      <div className="h-2 rounded flex-1" style={{ background: 'rgba(255,255,255,0.08)', maxWidth: '70%' }} />
                    </div>
                    <div className="h-8 rounded-lg px-3 flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'rgba(252,92,58,0.3)' }} />
                      <div className="h-2 rounded flex-1" style={{ background: 'rgba(255,255,255,0.06)', maxWidth: '55%' }} />
                    </div>
                    <div className="h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #FC5C3A, #ff7958)' }}>
                      Create account →
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-ibm-plex-serif">Create your account</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Sign up in under two minutes. No paperwork, no branch visits.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative mb-10 z-10">
                  <div className="w-[104px] h-[104px] rounded-2xl flex flex-col items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #081628, #0f0d1a)', border: '1px solid rgba(54,141,255,0.2)', boxShadow: '0 0 40px rgba(54,141,255,0.1)' }}>
                    <span className="text-3xl font-bold font-ibm-plex-serif" style={{ color: '#368DFF' }}>02</span>
                    <span className="text-[9px] font-mono uppercase tracking-widest mt-1" style={{ color: 'rgba(54,141,255,0.45)' }}>Link banks</span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: '0 0 0 1px rgba(54,141,255,0.4), 0 0 30px rgba(54,141,255,0.12)' }} />
                </div>

                <div className="w-full rounded-2xl p-6 mb-6"
                  style={{ background: '#0f0f1a', border: '1px solid rgba(54,141,255,0.1)' }}>
                  {/* Bank connection visual */}
                  <div className="flex flex-col gap-2">
                    {[{ name: 'Barclays', c: '#1d4ed8' }, { name: 'Monzo', c: '#FC5C3A' }, { name: 'Chase', c: '#0d9488' }].map((b, i) => (
                      <div key={b.name} className="flex items-center justify-between h-8 px-3 rounded-lg"
                        style={{ background: `${b.c}10`, border: `1px solid ${b.c}25` }}>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: b.c }} />
                          <span className="text-xs font-semibold text-white">{b.name}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold" style={{ color: '#34d399' }}>✓ linked</span>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-ibm-plex-serif">Connect your banks</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Link accounts via Plaid. Read-only, zero risk, instant sync.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative mb-10 z-10">
                  <div className="w-[104px] h-[104px] rounded-2xl flex flex-col items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #120d22, #0f0d1a)', border: '1px solid rgba(139,92,246,0.2)', boxShadow: '0 0 40px rgba(139,92,246,0.1)' }}>
                    <span className="text-3xl font-bold font-ibm-plex-serif" style={{ color: '#8b5cf6' }}>03</span>
                    <span className="text-[9px] font-mono uppercase tracking-widest mt-1" style={{ color: 'rgba(139,92,246,0.45)' }}>Track &amp; earn</span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: '0 0 0 1px rgba(139,92,246,0.4), 0 0 30px rgba(139,92,246,0.12)' }} />
                </div>

                <div className="w-full rounded-2xl p-6 mb-6"
                  style={{ background: '#0f0f1a', border: '1px solid rgba(139,92,246,0.1)' }}>
                  {/* Spend chart visual */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>Monthly Spend</span>
                      <span className="text-xs font-mono font-bold text-white">£284</span>
                    </div>
                    <div className="flex items-end gap-1 h-10">
                      {[35, 52, 41, 68, 45, 72, 58, 44, 60, 78, 55, 82].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 11 ? 'linear-gradient(180deg,#8b5cf6,#6d28d9)' : 'rgba(139,92,246,0.18)' }} />
                      ))}
                    </div>
                    <div className="h-6 rounded-lg flex items-center px-3 gap-2"
                      style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.18)' }}>
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#8b5cf6' }} />
                      <span className="text-[10px] font-mono" style={{ color: 'rgba(139,92,246,0.8)' }}>Tesco quest · 60% complete</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-ibm-plex-serif">Track &amp; earn rewards</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  AI analyses your spending, builds quests, and helps you grow your wealth.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECURITY LEDGER
      ══════════════════════════════════════ */}
      <div className="relative px-6 py-20 overflow-hidden" style={{ background: '#060609' }}>
        {/* subtle top rule */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(52,211,153,0.6)' }}>Security Infrastructure</p>
              <h3 className="text-3xl lg:text-4xl font-bold text-white font-ibm-plex-serif">
                Secure by design.<br />
                <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}>Transparent by default.</span>
              </h3>
            </div>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Every layer of Cosmico is built with your data security as the primary constraint — not an afterthought.
            </p>
          </div>

          {/* Ledger rows */}
          <div className="flex flex-col">
            {[
              { id: 'ENC-001', label: 'End-to-end encryption', value: 'AES-256 · TLS 1.3', status: 'ACTIVE', color: '#34d399' },
              { id: 'AUTH-002', label: '2FA on every sign-in', value: 'TOTP enforced · no bypass', status: 'ACTIVE', color: '#34d399' },
              { id: 'PLAID-003', label: 'Read-only bank access', value: 'Zero write permissions via Plaid', status: 'VERIFIED', color: '#368DFF' },
              { id: 'GDPR-004', label: 'UK GDPR compliant', value: 'Data never sold or shared', status: 'COMPLIANT', color: '#a78bfa' },
            ].map((row, i) => (
              <div key={row.id} className="flex items-center gap-6 py-4 group"
                style={{ borderTop: i === 0 ? '1px solid rgba(255,255,255,0.07)' : undefined, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="text-[10px] font-mono w-20 shrink-0" style={{ color: 'rgba(255,255,255,0.18)' }}>{row.id}</span>
                <span className="text-sm font-semibold text-white flex-1">{row.label}</span>
                <span className="text-xs font-mono hidden md:block flex-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{row.value}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: row.color }} />
                  <span className="text-[10px] font-mono font-bold" style={{ color: row.color }}>{row.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-8">
            <Image src="/icons/gdpr.png" alt="GDPR" width={24} height={24} className="opacity-25" />
            <p className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.18)' }}>
              Appwrite cloud auth · Sandbox mode · No real funds processed · Not FCA regulated
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          CTA — Final
      ══════════════════════════════════════ */}
      <section className="relative px-6 py-32 overflow-hidden" style={{ background: '#060609' }}>
        {/* Large diagonal glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full blur-[120px]" style={{ width: 700, height: 700, top: '-20%', left: '-15%', background: 'radial-gradient(circle, rgba(252,92,58,0.12), transparent 60%)' }} />
          <div className="absolute rounded-full blur-[120px]" style={{ width: 600, height: 600, bottom: '-20%', right: '-10%', background: 'radial-gradient(circle, rgba(54,141,255,0.1), transparent 60%)' }} />
        </div>
        {/* Fine dot grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">

            {/* Left — copy */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(252,92,58,0.08)', border: '1px solid rgba(252,92,58,0.18)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FC5C3A' }} />
                <span className="text-xs font-mono font-bold uppercase tracking-[0.15em]" style={{ color: '#FC5C3A' }}>Limited Beta · Free Forever</span>
              </div>

              <h2 className="font-bold leading-[1.02] mb-8 font-ibm-plex-serif"
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'white' }}>
                The bank account<br />
                <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.25)', color: 'transparent' }}>you deserved</span><br />
                all along.
              </h2>

              <p className="text-base leading-relaxed mb-10 max-w-sm mx-auto lg:mx-0" style={{ color: 'rgba(255,255,255,0.36)' }}>
                AI insights. Instant transfers. Quest rewards. One unified view of every account — completely free.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/sign-up"
                  className="px-10 py-4 rounded-xl text-white font-bold text-sm transition-all hover:scale-[1.03] hover:shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #FC5C3A, #ff7958)', boxShadow: '0 0 50px rgba(252,92,58,0.25)' }}>
                  Create Free Account →
                </Link>
                <Link href="/sign-in"
                  className="px-10 py-4 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03]"
                  style={{ color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.02)' }}>
                  Sign in
                </Link>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 justify-center lg:justify-start">
                {['No credit card', 'Sandbox mode', 'GDPR compliant', 'Free forever'].map(t => (
                  <span key={t} className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    <span style={{ color: '#34d399' }}>✓</span> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — live stats dashboard */}
            <div className="flex-1 w-full max-w-sm mx-auto lg:mx-0 flex flex-col gap-3">
              {/* Balance */}
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.28)' }}>Total Balance</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#34d399' }} />
                    <span className="text-[10px] font-mono" style={{ color: '#34d399' }}>live sync</span>
                  </div>
                </div>
                <p className="text-4xl font-bold text-white font-ibm-plex-serif mb-1">£24,891</p>
                <p className="text-xs font-mono mb-5" style={{ color: '#34d399' }}>↑ +£1,240 this month</p>
                <div className="flex items-end gap-1 h-10">
                  {[30,42,35,52,40,58,48,62,55,70,60,80].map((h,i) => (
                    <div key={i} className="flex-1 rounded-sm" style={{
                      height: `${h}%`,
                      background: i === 11 ? 'linear-gradient(180deg,#FC5C3A,#ff7958)' : 'rgba(252,92,58,0.15)'
                    }} />
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-4" style={{ background: 'rgba(54,141,255,0.06)', border: '1px solid rgba(54,141,255,0.12)' }}>
                  <p className="text-[9px] font-mono uppercase tracking-widest mb-3" style={{ color: 'rgba(54,141,255,0.5)' }}>AI Insights</p>
                  <p className="text-2xl font-bold text-white font-ibm-plex-serif">12</p>
                  <p className="text-[10px] mt-0.5 font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>this week</p>
                </div>
                <div className="rounded-xl p-4" style={{ background: 'rgba(252,92,58,0.06)', border: '1px solid rgba(252,92,58,0.12)' }}>
                  <p className="text-[9px] font-mono uppercase tracking-widest mb-3" style={{ color: 'rgba(252,92,58,0.5)' }}>Cashback</p>
                  <p className="text-2xl font-bold text-white font-ibm-plex-serif">£47</p>
                  <p className="text-[10px] mt-0.5 font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>earned total</p>
                </div>
              </div>

              {/* Quest */}
              <div className="rounded-xl p-4" style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.12)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white">Active Quest — Tesco</span>
                  <span className="text-[10px] font-mono font-bold" style={{ color: '#a78bfa' }}>60%</span>
                </div>
                <div className="h-1.5 rounded-full mb-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-1.5 rounded-full" style={{ width: '60%', background: 'linear-gradient(90deg,#8b5cf6,#a78bfa)' }} />
                </div>
                <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>£5 cashback · spend £50 at Tesco</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="relative px-6 pt-16 pb-10 overflow-hidden" style={{ background: '#040407' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

        <div className="max-w-6xl mx-auto">

          {/* Top row — logo + nav */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 pb-14"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-5">
                <Image src="/icons/logo.svg" alt="Cosmico" width={28} height={28} />
                <span className="text-white font-bold text-xl font-ibm-plex-serif">Cosmico</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ml-1"
                  style={{ background: 'rgba(252,92,58,0.12)', color: '#FC5C3A', border: '1px solid rgba(252,92,58,0.2)' }}>Beta</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.22)' }}>
                Open banking infrastructure for modern financial habits. Multi-bank aggregation, AI insights, and personalised rewards — in one dashboard.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Image src="/icons/gdpr.png" alt="GDPR" width={32} height={32} className="opacity-20 hover:opacity-40 transition-opacity" />
                <span className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>UK GDPR</span>
              </div>
            </div>

            {/* Nav columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] mb-5" style={{ color: 'rgba(255,255,255,0.18)' }}>Product</p>
                <ul className="space-y-3">
                  {[{ label: 'Get Early Access', href: '/sign-up' }, { label: 'Sign In', href: '/sign-in' }].map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] mb-5" style={{ color: 'rgba(255,255,255,0.18)' }}>Legal</p>
                <ul className="space-y-3">
                  {[{ label: 'Terms & Conditions', href: '/terms' }, { label: 'Privacy Policy', href: '/privacy' }].map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] mb-5" style={{ color: 'rgba(255,255,255,0.18)' }}>Regions</p>
                <ul className="space-y-3">
                  {[{ src: '/icons/US.png', label: 'United States' }, { src: '/icons/UK.png', label: 'United Kingdom' }, { src: '/icons/CA.png', label: 'Canada' }].map(r => (
                    <li key={r.label} className="flex items-center gap-2">
                      <Image src={r.src} alt={r.label} width={16} height={12} className="rounded-sm object-cover opacity-70" />
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{r.label}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-2 opacity-30">
                    <Image src="/icons/european-union.png" alt="EU" width={16} height={12} className="rounded-sm object-cover grayscale" />
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Europe</span>
                    <span className="text-[9px] font-mono font-bold" style={{ color: '#FC5C3A' }}>Soon</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sandbox disclaimer */}
          <div className="mt-8 px-5 py-4 rounded-xl font-mono"
            style={{ background: 'rgba(234,179,8,0.03)', border: '1px solid rgba(234,179,8,0.07)' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(234,179,8,0.4)' }}>
              ⚠ Sandbox · Not a regulated financial service
            </p>
            <p className="text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.18)' }}>
              Cosmico is a portfolio &amp; demo project operating in sandbox/test mode via Plaid Sandbox, Dwolla Sandbox, and Appwrite. No real money is moved. Not authorised by the FCA, FINRA, or any financial regulatory body.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <span className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.14)' }}>
              © 2026 Cosmico · All rights reserved
            </span>
            <div className="flex items-center gap-2">
              {['Next.js', 'Plaid', 'Dwolla', 'Appwrite', 'OpenAI'].map((t, i, arr) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.14)' }}>{t}</span>
                  {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.08)' }}>·</span>}
                </span>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </main>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import DisclaimerModal from '@/components/DisclaimerModal'
import ChatWidget from '@/components/ChatWidget'
import AnimatedTagline from '@/components/AnimatedTagline'

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

        {/* Background glow orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full blur-3xl opacity-20"
            style={{ width: 600, height: 600, top: '-10%', left: '-10%', background: 'radial-gradient(circle, #FC5C3A, transparent)' }} />
          <div className="absolute rounded-full blur-3xl opacity-15"
            style={{ width: 500, height: 500, bottom: '-5%', right: '5%', background: 'radial-gradient(circle, #368DFF, transparent)' }} />
          <div className="absolute rounded-full blur-3xl opacity-10"
            style={{ width: 400, height: 400, top: '40%', left: '40%', background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
        </div>

        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* ── Left: Copy ── */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 uppercase tracking-wide"
                style={{ background: 'rgba(252,92,58,0.12)', color: '#FC5C3A', border: '1px solid rgba(252,92,58,0.2)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FC5C3A' }} />
                AI-Powered Banking · Beta
              </div>

              <h1 className="font-bold text-white leading-[1.05] mb-6 font-ibm-plex-serif"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)' }}>
                Banking that
                <br />
                <AnimatedTagline />
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
                <div className="relative" style={{
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
                <div className="absolute" style={{ top: -16, right: -22, background: 'white', borderRadius: 12, padding: '9px 13px', boxShadow: '0 12px 40px rgba(0,0,0,0.4)', minWidth: 155 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#111827', margin: '0 0 2px' }}>💸 Transfer sent</p>
                  <p style={{ fontSize: 10, color: '#6b7280', margin: 0 }}>£250 to John D. · Just now</p>
                </div>

                {/* Floating AI badge */}
                <div className="absolute" style={{ bottom: -14, left: -22, borderRadius: 12, padding: '9px 13px', boxShadow: '0 12px 40px rgba(252,92,58,0.3)', background: 'linear-gradient(135deg,#FC5C3A,#ff7958)', minWidth: 148 }}>
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
      <section className="py-28 px-6" style={{ background: '#0d0d17' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#FC5C3A' }}>Why Cosmico</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 font-ibm-plex-serif leading-tight">
              Everything in one{' '}
              <span style={{ background: 'linear-gradient(135deg, #FC5C3A, #368DFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                intelligent platform
              </span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.35)' }}>
              A complete AI-powered financial OS. Secure, fast, and effortlessly intelligent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large — AI Analytics */}
            <div className="md:col-span-2 rounded-3xl overflow-hidden relative group hover:scale-[1.01] transition-transform cursor-default"
              style={{ background: '#111120', border: '1px solid rgba(255,255,255,0.06)', minHeight: 280 }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(252,92,58,0.07), transparent 65%)' }} />
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-3"
                      style={{ background: 'rgba(252,92,58,0.12)', color: '#FC5C3A' }}>✦ GPT-4o-mini</div>
                    <h3 className="text-2xl font-bold text-white mb-2">AI-powered insights</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 320 }}>
                      Your personal AI banker reads your live transaction data and gives you spending summaries, savings tips, and financial advice — 24/7.
                    </p>
                  </div>
                  <Image src="/icons/undraw/Analytics.svg" alt="Analytics" width={110} height={85}
                    className="hidden sm:block opacity-75 shrink-0"
                    style={{ filter: 'drop-shadow(0 0 18px rgba(252,92,58,0.35))' }} />
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['Spending breakdowns', 'Monthly trends', 'Category charts', 'AI summaries'].map(tag => (
                    <span key={tag} className="text-xs px-3 py-1.5 rounded-full font-medium"
                      style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="rounded-3xl overflow-hidden relative group hover:scale-[1.01] transition-transform cursor-default flex flex-col"
              style={{ background: '#111120', border: '1px solid rgba(255,255,255,0.06)', minHeight: 280 }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(54,141,255,0.07), transparent 65%)' }} />
              <div className="p-8 flex flex-col flex-1">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-2xl"
                  style={{ background: 'rgba(54,141,255,0.1)' }}>🔐</div>
                <h3 className="text-xl font-bold text-white mb-2">Bank-grade security</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  End-to-end encryption, 2FA on every sign-in, and the same standards used by top financial institutions.
                </p>
                <Image src="/icons/undraw/Secure server.svg" alt="Security" width={130} height={95}
                  className="mt-auto opacity-70"
                  style={{ filter: 'drop-shadow(0 0 14px rgba(54,141,255,0.3))' }} />
              </div>
            </div>

            {/* Transfers */}
            <div className="rounded-3xl overflow-hidden relative group hover:scale-[1.01] transition-transform cursor-default"
              style={{ background: 'linear-gradient(135deg, #1a1040, #111120)', border: '1px solid rgba(139,92,246,0.12)', minHeight: 200 }}>
              <div className="p-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-2xl"
                  style={{ background: 'rgba(139,92,246,0.12)' }}>💸</div>
                <h3 className="text-xl font-bold text-white mb-2">Instant transfers</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  ACH-powered transfers with zero fees. Send money anywhere in seconds.
                </p>
              </div>
            </div>

            {/* Multi-bank */}
            <div className="rounded-3xl overflow-hidden relative group hover:scale-[1.01] transition-transform cursor-default"
              style={{ background: 'linear-gradient(135deg, #0f1f3d, #111120)', border: '1px solid rgba(54,141,255,0.12)', minHeight: 200 }}>
              <div className="p-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-2xl"
                  style={{ background: 'rgba(54,141,255,0.1)' }}>🏦</div>
                <h3 className="text-xl font-bold text-white mb-2">Multi-bank view</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Link all your banks via Plaid. Every account, balance, and transaction in one place.
                </p>
              </div>
            </div>

            {/* Rewards */}
            <div className="rounded-3xl overflow-hidden relative group hover:scale-[1.01] transition-transform cursor-default"
              style={{ background: 'linear-gradient(135deg, #1f1810, #111120)', border: '1px solid rgba(252,92,58,0.12)', minHeight: 200 }}>
              <div className="p-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-2xl"
                  style={{ background: 'rgba(252,92,58,0.1)' }}>🏆</div>
                <h3 className="text-xl font-bold text-white mb-2">AI Rewards</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  GPT-4o-mini builds personalised quests from your spending. Complete them to earn cashback and gift cards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <section className="py-28 px-6" style={{ background: '#09090f' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#FC5C3A' }}>Getting Started</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white font-ibm-plex-serif">
              Up and running in <span style={{ color: '#FC5C3A' }}>3 steps</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: 1, icon: '/icons/undraw/Savings.svg', title: 'Create your account', desc: 'Sign up in under two minutes. No paperwork, no branch visits. Email, details, done.', color: '#FC5C3A' },
              { num: 2, icon: '/icons/undraw/Online banking.svg', title: 'Connect your banks', desc: 'Link all your accounts securely via Plaid. Read-only, zero risk, instant sync.', color: '#368DFF' },
              { num: 3, icon: '/icons/undraw/Personal finance.svg', title: 'Track & earn rewards', desc: 'Cosmico AI analyses your spending, builds Quest Board challenges, and helps you grow.', color: '#8b5cf6' },
            ].map(step => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-5"
                  style={{ background: step.color, boxShadow: `0 0 20px ${step.color}50` }}>
                  {step.num}
                </div>
                <div className="rounded-2xl p-6 mb-5 w-full flex items-center justify-center"
                  style={{ background: '#13131e', border: '1px solid rgba(255,255,255,0.06)', height: 200 }}>
                  <div className="relative w-full" style={{ height: 148 }}>
                    <Image src={step.icon} alt={step.title} fill className="opacity-75"
                      style={{ objectFit: 'contain', filter: `drop-shadow(0 0 14px ${step.color}50)` }} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security strip ── */}
      <div className="py-12 px-6" style={{ background: '#0d0d17', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 justify-center">
          <Image src="/icons/undraw/Secure login.svg" alt="Secure" width={80} height={60}
            className="opacity-55" style={{ filter: 'drop-shadow(0 0 10px rgba(54,141,255,0.3))' }} />
          <div className="text-center md:text-left">
            <p className="text-white font-bold mb-1">Built with security in mind</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              2FA on every sign-in · End-to-end encryption · Read-only Plaid access · UK GDPR compliant · Appwrite cloud auth
            </p>
          </div>
          <div className="md:ml-auto">
            <Image src="/icons/gdpr.png" alt="GDPR" width={44} height={44} className="opacity-35 hover:opacity-60 transition-opacity" />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          CTA — Dark
      ══════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: '#09090f' }}>
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-12"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a1040 50%, #1e293b 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-15 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ background: '#FC5C3A' }} />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 translate-x-1/4 translate-y-1/4 pointer-events-none"
              style={{ background: '#368DFF' }} />
            <div className="flex-1 relative z-10 text-center lg:text-left">
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
                style={{ background: 'rgba(252,92,58,0.15)', color: '#FC5C3A', border: '1px solid rgba(252,92,58,0.2)' }}>
                Limited Beta
              </span>
              <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6 font-ibm-plex-serif">
                Be among the first
                <br />
                <span style={{ color: '#FC5C3A' }}>to experience it.</span>
              </h2>
              <p className="text-lg mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Create a free account and get AI-powered spending insights, Quest Board rewards, and your personal AI banker — completely free.
              </p>
              <Link href="/sign-up"
                className="inline-block px-10 py-4 rounded-xl text-white font-bold hover:scale-105 transition-all text-sm"
                style={{ background: 'linear-gradient(135deg, #FC5C3A 0%, #ff7958 100%)', boxShadow: '0 0 50px rgba(252,92,58,0.35)' }}>
                Create Free Account →
              </Link>
            </div>
            <div className="flex-1 relative z-10 flex justify-center lg:justify-end">
              <Image src="/icons/undraw/Investing.svg" alt="Invest" width={360} height={280}
                className="opacity-80" style={{ filter: 'drop-shadow(0 0 30px rgba(252,92,58,0.2))' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="pt-16 pb-10 px-6" style={{ background: '#06060c', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/icons/logo.svg" alt="Cosmico" width={26} height={26} />
                <span className="text-white font-bold text-lg font-ibm-plex-serif">Cosmico</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ml-1"
                  style={{ background: 'rgba(252,92,58,0.15)', color: '#FC5C3A' }}>Beta</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.28)' }}>
                A developer sandbox project demonstrating modern open banking — multi-bank aggregation, AI insights, instant transfers, spending analysis, and personalised rewards.
              </p>
              <div className="mt-6">
                <Image src="/icons/gdpr.png" alt="GDPR" width={44} height={44} className="opacity-25 hover:opacity-50 transition-opacity" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.2)' }}>Product</p>
              <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                <li><Link href="/sign-up" className="hover:text-white transition-colors">Get Early Access</Link></li>
                <li><Link href="/sign-in" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.2)' }}>Regions</p>
              <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {[{ src: '/icons/US.png', label: 'United States' }, { src: '/icons/UK.png', label: 'United Kingdom' }, { src: '/icons/CA.png', label: 'Canada' }].map(r => (
                  <li key={r.label} className="flex items-center gap-2">
                    <Image src={r.src} alt={r.label} width={20} height={14} className="rounded-sm object-cover" />
                    {r.label}
                  </li>
                ))}
                <li className="flex items-center gap-2 opacity-30">
                  <Image src="/icons/european-union.png" alt="EU" width={20} height={14} className="rounded-sm object-cover grayscale" />
                  Europe <span className="text-[10px]" style={{ color: '#FC5C3A' }}>Soon</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 rounded-xl px-5 py-4" style={{ background: 'rgba(234,179,8,0.04)', border: '1px solid rgba(234,179,8,0.08)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(234,179,8,0.45)' }}>Sandbox — Not a regulated financial service</p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.22)' }}>
              Cosmico is a <strong style={{ color: 'rgba(255,255,255,0.38)' }}>portfolio and demonstration project</strong> for educational purposes only. It operates in sandbox / test mode using simulated data from Plaid Sandbox, Dwolla Sandbox, and Appwrite. No real money is moved. Cosmico is <strong style={{ color: 'rgba(255,255,255,0.38)' }}>not authorised or regulated</strong> by the FCA, FINRA, or any financial regulatory body.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
            <span>© 2026 Cosmico · All rights reserved · Sandbox build</span>
            <span>Next.js · Plaid · Dwolla · Appwrite · OpenAI</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

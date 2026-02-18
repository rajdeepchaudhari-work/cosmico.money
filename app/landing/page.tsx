import Image from 'next/image'
import Link from 'next/link'
import DisclaimerModal from '@/components/DisclaimerModal'
import ChatWidget from '@/components/ChatWidget'
import AnimatedTagline from '@/components/AnimatedTagline'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white font-inter overflow-x-hidden">
      <DisclaimerModal />
      <ChatWidget />

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/icons/logo.svg" alt="Cosmico" width={30} height={30} />
            <span className="text-xl font-bold text-gray-900 font-ibm-plex-serif">Cosmico</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-semibold text-white px-4 py-2 rounded-lg transition-all hover:opacity-90 shadow-sm"
              style={{ background: '#FC5C3A' }}
            >
              Join Beta
            </Link>
          </div>
        </div>
      </nav>

      {/* ────────────────────────────────────────
          SECTION 1 — Hero
      ──────────────────────────────────────── */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">

          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide"
              style={{ background: 'rgba(252,92,58,0.1)', color: '#FC5C3A' }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#FC5C3A' }}
              />
              ✦ AI-Powered Banking · Beta
            </div>

            <h1 className="text-5xl lg:text-[3.75rem] font-bold text-gray-900 leading-tight mb-6 font-ibm-plex-serif">
              Banking that
              <br />
              <AnimatedTagline />
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Cosmico connects all your bank accounts, analyses your spending with AI-powered charts, and rewards you for smart financial habits. One intelligent dashboard for everything.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/sign-up"
                className="px-7 py-3.5 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition-transform text-sm"
                style={{ background: 'linear-gradient(135deg, #FC5C3A 0%, #ff7958 100%)' }}
              >
                Get Early Access →
              </Link>
              <Link
                href="/sign-in"
                className="px-7 py-3.5 rounded-xl font-semibold text-sm border-2 hover:scale-105 transition-transform"
                style={{ color: '#368DFF', borderColor: '#368DFF' }}
              >
                Sign In
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-400">
              Join{' '}
              <span className="font-semibold text-gray-600">2,000+ early adopters</span>{' '}
              already on the waitlist
            </p>
          </div>

          {/* Right: illustration */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-25 scale-110"
                style={{ background: 'linear-gradient(135deg, #FC5C3A, #368DFF)' }}
              />
              <Image
                src="/icons/Hero/undraw_finance_m6vw.svg"
                alt="Cosmico banking dashboard"
                width={520}
                height={420}
                className="relative z-10 drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          COUNTRIES STRIP
      ──────────────────────────────────────── */}
      <div className="py-10 px-6 border-y border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 shrink-0">
            Available in
          </p>
          <div className="flex items-center gap-4 sm:gap-8 flex-wrap justify-center">

            {/* US */}
            <div className="flex items-center gap-2.5">
              <Image src="/icons/US.png" alt="United States" width={32} height={22} className="rounded-sm shadow-sm object-cover" />
              <span className="text-sm font-semibold text-gray-700">United States</span>
            </div>

            {/* UK */}
            <div className="flex items-center gap-2.5">
              <Image src="/icons/UK.png" alt="United Kingdom" width={32} height={22} className="rounded-sm shadow-sm object-cover" />
              <span className="text-sm font-semibold text-gray-700">United Kingdom</span>
            </div>

            {/* CA */}
            <div className="flex items-center gap-2.5">
              <Image src="/icons/CA.png" alt="Canada" width={32} height={22} className="rounded-sm shadow-sm object-cover" />
              <span className="text-sm font-semibold text-gray-700">Canada</span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-gray-200" />

            {/* EU — Coming Soon */}
            <div className="flex items-center gap-2.5 opacity-45">
              <Image src="/icons/european-union.png" alt="European Union" width={32} height={22} className="rounded-sm shadow-sm object-cover grayscale" />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold text-gray-500">Europe</span>
                <span
                  className="text-[10px] font-bold uppercase tracking-wide mt-0.5"
                  style={{ color: '#FC5C3A' }}
                >
                  Coming soon
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────
          SECTION 2 — Features
      ──────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: '#F8FAFF' }}>
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: '#368DFF' }}
            >
              Why Cosmico
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-ibm-plex-serif">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A complete AI-powered financial OS designed for modern life. Secure, fast, and effortlessly intelligent.
            </p>
          </div>

          {/* Main cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1 — Instant Transfers */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div
                className="rounded-2xl p-5 mb-6"
                style={{ background: 'rgba(252,92,58,0.07)' }}
              >
                <Image
                  src="/icons/Hero/undraw_transfer-money_h9s3.svg"
                  alt="Instant Transfers"
                  width={150}
                  height={120}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Transfers</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Send money to anyone, anywhere in seconds. No hidden fees, no delays. Just seamless ACH-powered transfers at your fingertips.
              </p>
            </div>

            {/* Card 2 — Security (featured card) */}
            <div
              className="bg-white rounded-2xl p-8 flex flex-col items-center text-center relative"
              style={{ boxShadow: '0 4px 24px rgba(252,92,58,0.13)', border: '1.5px solid rgba(252,92,58,0.18)' }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #FC5C3A, #ff7958)' }}
              >
                Our Priority
              </div>
              <div
                className="rounded-2xl p-5 mb-6"
                style={{ background: 'rgba(252,92,58,0.07)' }}
              >
                <Image
                  src="/icons/Hero/undraw_server-cluster_7ugi.svg"
                  alt="Bank-grade Security"
                  width={150}
                  height={120}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bank-grade Security</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Your data is encrypted end-to-end. We use the same security standards as the world&apos;s top financial institutions, so your money is always safe.
              </p>
            </div>

            {/* Card 3 — Spending Analysis */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div
                className="rounded-2xl p-5 mb-6"
                style={{ background: 'rgba(54,141,255,0.07)' }}
              >
                <Image
                  src="/icons/Hero/undraw_mobile-payments_uate.svg"
                  alt="Spending Analysis"
                  width={150}
                  height={120}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Spending Analysis</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Monzo-style interactive charts show exactly where your money goes: category doughnuts, monthly bars, and daily spend trends, all in real time.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ────────────────────────────────────────
          Cosmico AI Spotlight
      ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wide"
              style={{ background: 'rgba(252,92,58,0.1)', color: '#FC5C3A' }}
            >
              ✦ Powered by GPT-4o-mini
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-ibm-plex-serif">
              Meet{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #FC5C3A 0%, #368DFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Cosmico AI
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Your personal AI banker, available 24/7. Ask questions, get spending summaries, and understand your finances like never before.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Left — chat preview mockup */}
            <div
              className="rounded-3xl overflow-hidden shadow-xl border"
              style={{ borderColor: 'rgba(252,92,58,0.15)' }}
            >
              {/* Chat header */}
              <div
                className="px-5 py-4 flex items-center gap-3"
                style={{ background: 'linear-gradient(135deg, #FC5C3A, #ff7958)' }}
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                  C
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Cosmico AI</p>
                  <p className="text-white/70 text-xs">Always online · GPT-4o-mini</p>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              </div>

              {/* Chat messages */}
              <div className="bg-gray-50 p-5 flex flex-col gap-4">

                {/* AI message */}
                <div className="flex gap-3 items-start">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #FC5C3A, #ff7958)' }}
                  >
                    C
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      Hi! 👋 I&apos;ve analysed your accounts. You&apos;ve spent <strong>£284</strong> this month — mostly on food &amp; dining. Want some tips to cut back?
                    </p>
                  </div>
                </div>

                {/* User message */}
                <div className="flex gap-3 items-start justify-end">
                  <div
                    className="rounded-2xl rounded-tr-none px-4 py-3 max-w-xs"
                    style={{ background: 'linear-gradient(135deg, #FC5C3A, #ff7958)' }}
                  >
                    <p className="text-white text-sm leading-relaxed">
                      Yes please! What&apos;s my top merchant this month?
                    </p>
                  </div>
                </div>

                {/* AI message 2 */}
                <div className="flex gap-3 items-start">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #FC5C3A, #ff7958)' }}
                  >
                    C
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      Your top merchant is <strong>Tesco</strong> at £62 spent. You also have an active Quest to earn <strong>£5 cashback</strong> there — you&apos;re 60% of the way! 🎯
                    </p>
                  </div>
                </div>

                {/* Input bar */}
                <div className="flex gap-2 mt-2">
                  <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-400">
                    Ask anything about your finances...
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #FC5C3A, #ff7958)' }}
                  >
                    ↑
                  </div>
                </div>

              </div>
            </div>

            {/* Right — feature list */}
            <div className="flex flex-col gap-5 justify-center">
              {[
                {
                  icon: '💬',
                  color: '#FC5C3A',
                  title: 'Contextual spending chat',
                  desc: 'Cosmico AI reads your live transaction data before every response, so answers are always about your real finances, not generic advice.',
                },
                {
                  icon: '🎯',
                  color: '#368DFF',
                  title: 'Personalised AI rewards',
                  desc: 'GPT-4o-mini analyses your spending patterns and generates tailored merchant challenges. Earn gift cards and cashback for habits you already have.',
                },
                {
                  icon: '📊',
                  color: '#8b5cf6',
                  title: 'Spending analysis on demand',
                  desc: 'Ask "where did my money go last month?" or navigate to Spending Analysis for full Monzo-style charts: doughnuts, bar charts, and trend lines.',
                },
                {
                  icon: '⚡',
                  color: '#10b981',
                  title: 'Floating widget — always there',
                  desc: 'Cosmico AI lives in the bottom corner of your dashboard. One click to open, instant answers with no page navigation required.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${item.color}18` }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          Rewards Quest Board Spotlight
      ──────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: '#F8FAFF' }}>
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wide"
              style={{ background: 'rgba(54,141,255,0.1)', color: '#368DFF' }}
            >
              ✦ AI-Generated · Personalised to you
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-ibm-plex-serif">
              Earn rewards for spending{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #368DFF 0%, #FC5C3A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                you already do
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              GPT-4o-mini studies your real transaction history and builds a personalised Quest Board of merchant challenges. Complete them to win cashback and gift cards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Left — feature list */}
            <div className="flex flex-col gap-5 justify-center">
              {[
                {
                  icon: '🤖',
                  color: '#368DFF',
                  title: 'AI builds your quests',
                  desc: 'Every challenge is generated fresh by GPT-4o-mini based on your actual spending, not a one-size-fits-all list. Tesco shopper? You get a Tesco quest.',
                },
                {
                  icon: '📈',
                  color: '#FC5C3A',
                  title: 'XP progress tracking',
                  desc: 'Each quest has a live progress bar that fills as you spend. Watch your XP grow toward the reward threshold with no manual tracking needed.',
                },
                {
                  icon: '🎁',
                  color: '#8b5cf6',
                  title: 'Real prizes, real merchants',
                  desc: 'Rewards include Amazon vouchers, cashback, and gift cards from brands you actually use. They unlock automatically when you complete a quest.',
                },
                {
                  icon: '🔄',
                  color: '#10b981',
                  title: 'Fresh quests, always',
                  desc: 'Complete your board and new AI-generated challenges appear. Your spending habits evolve and your Quest Board evolves with them.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${item.color}18` }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — Quest Board mockup */}
            <div
              className="rounded-3xl overflow-hidden shadow-xl border"
              style={{ borderColor: 'rgba(54,141,255,0.15)' }}
            >
              {/* Board header */}
              <div
                className="px-5 py-4 flex items-center justify-between"
                style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e293b)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: 'rgba(54,141,255,0.25)' }}>
                    🎯
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Quest Board</p>
                    <p style={{ color: 'rgba(255,255,255,0.5)' }} className="text-xs">Powered by Cosmico AI</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(54,141,255,0.2)', color: '#60a5fa' }}>3 Active</div>
                  <div className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399' }}>1 Done</div>
                </div>
              </div>

              {/* Quest cards */}
              <div className="bg-gray-50 p-4 flex flex-col gap-3">

                {/* Quest 1 — active */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="h-1" style={{ background: 'linear-gradient(90deg, #FC5C3A, #ff7958)' }} />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-orange-50">🛒</div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Tesco Challenge</p>
                          <p className="text-xs text-gray-500">Spend £80 at Tesco this month</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold" style={{ color: '#FC5C3A' }}>£5 cashback</p>
                        <p className="text-[10px] text-gray-400">+120 XP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: '60%', background: 'linear-gradient(90deg, #FC5C3A, #ff7958)' }} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">£48 / £80</span>
                    </div>
                  </div>
                </div>

                {/* Quest 2 — active */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="h-1" style={{ background: 'linear-gradient(90deg, #368DFF, #60a5fa)' }} />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-blue-50">☕</div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Costa Coffee Run</p>
                          <p className="text-xs text-gray-500">Visit Costa 5 times this month</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold" style={{ color: '#368DFF' }}>Free drink</p>
                        <p className="text-[10px] text-gray-400">+80 XP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: '40%', background: 'linear-gradient(90deg, #368DFF, #60a5fa)' }} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">2 / 5 visits</span>
                    </div>
                  </div>
                </div>

                {/* Quest 3 — completed */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 opacity-75">
                  <div className="h-1" style={{ background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-green-50">🎬</div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Cinema Weekend</p>
                          <p className="text-xs text-gray-500">Spend £20 at Vue Cinema</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)' }}>
                        <span style={{ color: '#10b981' }} className="text-xs font-bold">✓ Completed</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          SECTION 3 — How it works
      ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: '#FC5C3A' }}
            >
              Getting Started
            </p>
            <h2 className="text-4xl font-bold text-gray-900 font-ibm-plex-serif">
              Up and running in 3 steps
            </h2>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <span
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold z-10"
                  style={{ background: '#FC5C3A' }}
                >
                  1
                </span>
                <div
                  className="rounded-2xl p-5"
                  style={{ background: 'rgba(252,92,58,0.07)' }}
                >
                  <Image
                    src="/icons/Hero/undraw_wallet_diag.svg"
                    alt="Create your account"
                    width={160}
                    height={130}
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Create your account</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sign up in under two minutes. No paperwork, no branch visits. Just your email and a few details to get started.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <span
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold z-10"
                  style={{ background: '#FC5C3A' }}
                >
                  2
                </span>
                <div
                  className="rounded-2xl p-5"
                  style={{ background: 'rgba(54,141,255,0.07)' }}
                >
                  <Image
                    src="/icons/Hero/undraw_online-payments_d5ef.svg"
                    alt="Connect your banks"
                    width={160}
                    height={130}
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Connect your banks</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Securely link all your existing bank accounts in seconds using Plaid. Read-only access, zero risk to your money.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <span
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold z-10"
                  style={{ background: '#FC5C3A' }}
                >
                  3
                </span>
                <div
                  className="rounded-2xl p-5"
                  style={{ background: 'rgba(252,92,58,0.07)' }}
                >
                  <Image
                    src="/icons/Hero/undraw_online-transactions_8chx.svg"
                    alt="Track and transfer"
                    width={160}
                    height={130}
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Track &amp; transfer</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Let Cosmico AI analyse your spending, generate personalised rewards quests, and help you make smarter financial moves every single day.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          SECTION 4 — Full financial picture
      ──────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: '#F8FAFF' }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">

          {/* Illustration */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-20 scale-110"
                style={{ background: 'linear-gradient(135deg, #368DFF, #FC5C3A)' }}
              />
              <Image
                src="/icons/Hero/undraw_credit-card-payment_3zqz.svg"
                alt="Full financial picture"
                width={460}
                height={360}
                className="relative z-10 drop-shadow-xl"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="flex-1 text-center lg:text-left">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: '#368DFF' }}
            >
              All in one place
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-ibm-plex-serif leading-tight">
              Your complete financial picture
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Stop jumping between apps. Cosmico pulls all your accounts, cards, and transactions into a single intelligent dashboard powered by AI insights, so you always know exactly where you stand.
            </p>
            <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
              {[
                { icon: '💳', text: 'Multi-bank account aggregation with real-time balances' },
                { icon: '📊', text: 'Monzo-style Spending Analysis with category charts, monthly bars and daily trends' },
                { icon: '🤖', text: 'Cosmico AI assistant to chat about your finances and get instant answers' },
                { icon: '🎯', text: 'AI-generated Quest Board rewards personalised to your spending habits' },
                { icon: '↗️', text: 'Instant ACH transfers to anyone with no bank charges' },
                { icon: '⚙️', text: 'Full profile and settings control for tax residency, address and connected banks' },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <span className="text-gray-600 text-sm leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/sign-up"
                className="px-7 py-3.5 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition-transform text-sm"
                style={{ background: 'linear-gradient(135deg, #FC5C3A 0%, #ff7958 100%)' }}
              >
                Start for Free →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ────────────────────────────────────────
          SECTION 6 — Beta CTA
      ──────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center gap-10 p-10 lg:p-16"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
          >
            {/* Glow blobs */}
            <div
              className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ background: '#FC5C3A' }}
            />
            <div
              className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 translate-x-1/4 translate-y-1/4 pointer-events-none"
              style={{ background: '#368DFF' }}
            />

            {/* Text */}
            <div className="flex-1 relative z-10 text-center lg:text-left">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
                style={{ background: 'rgba(252,92,58,0.2)', color: '#FC5C3A' }}
              >
                Limited Beta
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 font-ibm-plex-serif">
                Be among the first
                <br />
                <span style={{ color: '#FC5C3A' }}>to experience it.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Cosmico is launching soon. Create a free account today and get access to AI-powered spending insights, Quest Board rewards, and your personal AI banker. All completely free.
              </p>
              <Link
                href="/sign-up"
                className="inline-block px-8 py-4 rounded-xl text-white font-bold shadow-lg hover:scale-105 transition-transform text-sm"
                style={{ background: 'linear-gradient(135deg, #FC5C3A 0%, #ff7958 100%)' }}
              >
                Create Free Account →
              </Link>
            </div>

            {/* Illustration */}
            <div className="flex-1 relative z-10 flex justify-center lg:justify-end">
              <Image
                src="/icons/Hero/undraw_savings_d97f.svg"
                alt="Save and grow your money"
                width={380}
                height={300}
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 text-gray-400 pt-16 pb-10 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Top row — brand + nav columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">

            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/icons/logo.svg" alt="Cosmico" width={26} height={26} />
                <span className="text-white font-bold text-lg font-ibm-plex-serif">Cosmico</span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ml-1"
                  style={{ background: 'rgba(252,92,58,0.15)', color: '#FC5C3A' }}
                >
                  Beta
                </span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm text-gray-500">
                A developer sandbox project demonstrating modern open banking concepts — multi-bank aggregation, AI-powered insights, instant transfers, spending analysis, and personalised rewards in one dashboard.
              </p>
              <div className="mt-6">
                <Image
                  src="/icons/gdpr.png"
                  alt="GDPR Compliant"
                  width={44}
                  height={44}
                  className="opacity-50 hover:opacity-80 transition-opacity"
                  title="GDPR Compliant"
                />
              </div>
            </div>

            {/* Product links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Product</p>
              <ul className="space-y-3 text-sm">
                <li><Link href="/sign-up" className="hover:text-white transition-colors">Get Early Access</Link></li>
                <li><Link href="/sign-in" className="hover:text-white transition-colors">Sign In</Link></li>
                <li>
                  <span className="flex items-center gap-2">
                    Spending Analysis
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(54,141,255,0.15)', color: '#368DFF' }}>New</span>
                  </span>
                </li>
                <li>
                  <span className="flex items-center gap-2">
                    Cosmico AI
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(252,92,58,0.15)', color: '#FC5C3A' }}>GPT-4o</span>
                  </span>
                </li>
                <li>
                  <span className="flex items-center gap-2">
                    AI Rewards
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(252,92,58,0.15)', color: '#FC5C3A' }}>Beta</span>
                  </span>
                </li>
                <li>
                  <span className="flex items-center gap-2">
                    Mobile App
                    <span className="text-[10px] font-semibold text-gray-600">Coming soon</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Supported countries */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Supported Regions</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Image src="/icons/US.png" alt="US" width={20} height={14} className="rounded-sm object-cover" />
                  United States
                </li>
                <li className="flex items-center gap-2">
                  <Image src="/icons/UK.png" alt="UK" width={20} height={14} className="rounded-sm object-cover" />
                  United Kingdom
                </li>
                <li className="flex items-center gap-2">
                  <Image src="/icons/CA.png" alt="CA" width={20} height={14} className="rounded-sm object-cover" />
                  Canada
                </li>
                <li className="flex items-center gap-2 opacity-40">
                  <Image src="/icons/european-union.png" alt="EU" width={20} height={14} className="rounded-sm object-cover grayscale" />
                  Europe
                  <span className="text-[10px] font-semibold" style={{ color: '#FC5C3A' }}>Soon</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Sandbox / regulatory disclaimer */}
          <div className="mt-8 rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-yellow-500/80 mb-2">
              Sandbox — Not a regulated financial service
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Cosmico is a <strong className="text-gray-400">portfolio and demonstration project</strong> built for educational purposes only. It operates entirely in sandbox / test mode using simulated data from Plaid Sandbox, Dwolla Sandbox, and Appwrite. No real money is moved, no real bank accounts are accessed, and no real financial data is processed.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed mt-2">
              Cosmico is <strong className="text-gray-400">not authorised or regulated by the Financial Conduct Authority (FCA)</strong>, the Financial Industry Regulatory Authority (FINRA), or any other financial regulatory body. It does not provide financial advice, payment services, or any regulated financial activity. It should not be relied upon for any real-world financial decisions.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed mt-2">
              If you are looking for a regulated banking service, please use a provider authorised by the FCA, FDIC, or the appropriate regulator in your country.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <span>© 2026 Cosmico · All rights reserved · Sandbox build</span>
            <span>Built with Next.js · Plaid · Dwolla · Appwrite · OpenAI</span>
          </div>

        </div>
      </footer>

    </main>
  )
}

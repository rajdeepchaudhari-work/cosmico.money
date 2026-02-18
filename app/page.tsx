import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white font-inter overflow-x-hidden">

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
              Beta Launch — Limited Early Access
            </div>

            <h1 className="text-5xl lg:text-[3.75rem] font-bold text-gray-900 leading-tight mb-6 font-ibm-plex-serif">
              Banking that{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #FC5C3A 0%, #368DFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                works for you
              </span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Cosmico connects all your bank accounts, tracks your spending in real-time, and lets you send money globally — from one beautiful dashboard.
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
              Everything you need, nothing you don't
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A complete financial OS designed for modern life — secure, fast, and effortlessly simple.
            </p>
          </div>

          {/* Cards grid */}
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
                Send money to anyone, anywhere in seconds. No hidden fees, no delays — just seamless ACH-powered transfers at your fingertips.
              </p>
            </div>

            {/* Card 2 — Security (accent card) */}
            <div
              className="rounded-2xl p-8 shadow-sm flex flex-col items-center text-center"
              style={{ background: 'linear-gradient(160deg, #368DFF 0%, #1a6fd4 100%)' }}
            >
              <div className="rounded-2xl p-5 mb-6 bg-white/10">
                <Image
                  src="/icons/Hero/undraw_vault_tyfh.svg"
                  alt="Bank-grade Security"
                  width={150}
                  height={120}
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Bank-grade Security</h3>
              <p className="text-blue-100 leading-relaxed text-sm">
                Your data is encrypted end-to-end. We use the same security standards as the world's top financial institutions — so your money is always safe.
              </p>
            </div>

            {/* Card 3 — Smart Insights */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div
                className="rounded-2xl p-5 mb-6"
                style={{ background: 'rgba(54,141,255,0.07)' }}
              >
                <Image
                  src="/icons/Hero/undraw_mobile-payments_uate.svg"
                  alt="Smart Spending Insights"
                  width={150}
                  height={120}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Spending Insights</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Visualise exactly where your money goes with automatic categorisation, reward tracking, and real-time budget alerts.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          SECTION 3 — Beta CTA
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
                Cosmico is launching soon. Create a free account today and help shape the future of personal banking.
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
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/icons/logo.svg" alt="Cosmico" width={22} height={22} />
            <span className="font-bold text-gray-700 font-ibm-plex-serif">Cosmico</span>
            <span className="text-gray-400 text-sm ml-1">© 2026 · Beta</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/sign-in" className="hover:text-gray-700 transition-colors">Sign In</Link>
            <Link href="/sign-up" className="hover:text-gray-700 transition-colors">Sign Up</Link>
          </div>
        </div>
      </footer>

    </main>
  )
}

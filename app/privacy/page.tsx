import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Privacy Policy – Cosmico Bank" };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white font-inter">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4">
        <Link href="/sign-up" className="inline-flex items-center gap-2">
          <Image src="/icons/logo.svg" width={30} height={30} alt="Cosmico" />
          <span className="text-20 font-ibm-plex-serif font-bold text-black-1">Cosmico</span>
        </Link>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-12 text-gray-700">
        <h1 className="text-32 font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-14 text-gray-400 mb-10">Last updated: February 2026 &mdash; Cosmico Bank (Sandbox / Demo)</p>

        <Section title="1. Who We Are">
          Cosmico Bank (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a demo financial
          services platform operated by Cosmico Ltd, registered in England and Wales. We are
          committed to protecting your privacy and handling your data responsibly in accordance with
          the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
        </Section>

        <Section title="2. Information We Collect">
          When you register for an account, we collect:
          <ul className="mt-2 list-disc pl-5 space-y-1 text-14">
            <li>Personal details: name, date of birth, nationality</li>
            <li>Contact information: email address, postal address</li>
            <li>Identity verification: NI number / SSN (last 4 digits) / SIN — for demo purposes only</li>
            <li>Account credentials: hashed passwords (never stored in plain text)</li>
            <li>Usage data: pages visited, features used, login timestamps</li>
          </ul>
          <p className="mt-3 text-14 text-gray-500 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            <strong>Sandbox notice:</strong> This is a demo environment. Please do not submit real
            identity documents, real financial credentials, or sensitive personal data.
          </p>
        </Section>

        <Section title="3. How We Use Your Information">
          We use your information to:
          <ul className="mt-2 list-disc pl-5 space-y-1 text-14">
            <li>Create and manage your account</li>
            <li>Provide secure authentication (including two-factor verification via email OTP)</li>
            <li>Display personalised account dashboards and transaction data</li>
            <li>Send account-related notifications and security alerts</li>
            <li>Comply with legal and regulatory obligations</li>
            <li>Improve the platform through aggregated, anonymised analytics</li>
          </ul>
        </Section>

        <Section title="4. Third-Party Services">
          We use the following third-party providers who may process your data:
          <ul className="mt-2 list-disc pl-5 space-y-1 text-14">
            <li><strong>Appwrite</strong> — user authentication and database storage</li>
            <li><strong>Plaid</strong> — bank account linking (sandbox mode, no real bank access)</li>
            <li><strong>Resend</strong> — transactional email delivery (OTP codes)</li>
            <li><strong>Sentry</strong> — error monitoring and performance tracking (anonymised)</li>
          </ul>
          Each provider operates under their own privacy policy and data processing agreements.
        </Section>

        <Section title="5. Data Retention">
          We retain your account data for as long as your account is active. You may request
          deletion of your account and associated data at any time by contacting
          privacy@cosmico.co.uk. Upon deletion, your personal data will be permanently removed
          within 30 days, except where retention is required by law.
        </Section>

        <Section title="6. Data Security">
          We implement industry-standard security measures including:
          <ul className="mt-2 list-disc pl-5 space-y-1 text-14">
            <li>Passwords hashed using bcrypt before storage</li>
            <li>OTP codes hashed with HMAC-SHA256, never stored in plain text</li>
            <li>Sessions transmitted over HTTPS with secure, HttpOnly cookies</li>
            <li>Two-factor authentication (email OTP) on every sign-in</li>
          </ul>
        </Section>

        <Section title="7. Your Rights (UK GDPR)">
          Under UK GDPR, you have the right to:
          <ul className="mt-2 list-disc pl-5 space-y-1 text-14">
            <li><strong>Access</strong> — request a copy of the data we hold about you</li>
            <li><strong>Rectification</strong> — ask us to correct inaccurate data</li>
            <li><strong>Erasure</strong> — request deletion of your personal data</li>
            <li><strong>Portability</strong> — receive your data in a machine-readable format</li>
            <li><strong>Object</strong> — opt out of processing based on legitimate interests</li>
          </ul>
          To exercise these rights, contact{" "}
          <a href="mailto:privacy@cosmico.co.uk" className="text-blue-600 hover:underline">
            privacy@cosmico.co.uk
          </a>.
        </Section>

        <Section title="8. Cookies">
          We use strictly necessary cookies only:
          <ul className="mt-2 list-disc pl-5 space-y-1 text-14">
            <li><strong>appwrite-session</strong> — maintains your authenticated session</li>
          </ul>
          We do not use tracking or advertising cookies.
        </Section>

        <Section title="9. Changes to This Policy">
          We may update this Privacy Policy periodically. We will notify you of significant changes
          via email. Continued use of the Service after changes are published constitutes acceptance
          of the updated policy.
        </Section>

        <Section title="10. Contact &amp; Complaints">
          For privacy enquiries, contact our Data Protection Officer at{" "}
          <a href="mailto:privacy@cosmico.co.uk" className="text-blue-600 hover:underline">
            privacy@cosmico.co.uk
          </a>. If you are unsatisfied with our response, you have the right to lodge a complaint
          with the Information Commissioner&apos;s Office (ICO) at{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
            ico.org.uk
          </a>.
        </Section>
      </article>

      <footer className="border-t border-gray-100 px-6 py-6 text-center text-12 text-gray-400">
        © {new Date().getFullYear()} Cosmico Bank. All rights reserved.
        &nbsp;&middot;&nbsp;
        <Link href="/terms" className="hover:underline">Terms &amp; Conditions</Link>
      </footer>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-18 font-semibold text-gray-900 mb-3">{title}</h2>
      <div className="text-15 leading-relaxed">{children}</div>
    </section>
  );
}

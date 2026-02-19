import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Terms & Conditions – Cosmico Bank" };

export default function TermsPage() {
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
        <h1 className="text-32 font-bold text-gray-900 mb-2">Terms &amp; Conditions</h1>
        <p className="text-14 text-gray-400 mb-10">Last updated: February 2026 &mdash; Cosmico Bank (Sandbox / Demo)</p>

        <Section title="1. Acceptance of Terms">
          By creating an account and using Cosmico Bank ("the Service"), you agree to be bound by
          these Terms &amp; Conditions. If you do not agree, please do not use the Service. These
          terms apply to all users, including visitors, registered customers, and contributors.
        </Section>

        <Section title="2. Sandbox &amp; Demo Environment">
          Cosmico Bank is currently operating in a <strong>sandbox / demonstration environment</strong>.
          No real funds are processed, transferred, or stored. All account balances, transactions,
          and bank connections are simulated using test data provided by Plaid Sandbox and Dwolla
          Sandbox APIs. You must not submit real financial or personally identifiable information.
        </Section>

        <Section title="3. Eligibility">
          You must be at least 18 years of age to open an account. By registering, you confirm that
          all information you provide is accurate and complete. Cosmico Bank reserves the right to
          suspend accounts that contain false or misleading information.
        </Section>

        <Section title="4. Account Security">
          You are responsible for maintaining the confidentiality of your login credentials and for
          all activity that occurs under your account. You agree to notify us immediately at
          support@cosmico.co.uk if you suspect any unauthorised access. We will never ask you for
          your password via email or phone.
        </Section>

        <Section title="5. Acceptable Use">
          You agree not to use the Service to:
          <ul className="mt-2 list-disc pl-5 space-y-1 text-14">
            <li>Attempt to gain unauthorised access to any part of the platform</li>
            <li>Submit malicious code, scripts, or automated requests</li>
            <li>Impersonate another person or entity</li>
            <li>Violate any applicable law or regulation</li>
          </ul>
        </Section>

        <Section title="6. Intellectual Property">
          All content, branding, and software within Cosmico Bank are the property of Cosmico Ltd.
          You may not reproduce, distribute, or create derivative works without prior written
          permission.
        </Section>

        <Section title="7. Limitation of Liability">
          To the fullest extent permitted by law, Cosmico Bank and its affiliates shall not be
          liable for any indirect, incidental, or consequential damages arising from your use of the
          Service. As this is a sandbox environment, no financial losses can result from use of the
          platform.
        </Section>

        <Section title="8. Modifications to Terms">
          We reserve the right to update these Terms at any time. Continued use of the Service after
          changes are published constitutes acceptance of the revised Terms. We will notify users of
          material changes via email.
        </Section>

        <Section title="9. Governing Law">
          These Terms are governed by the laws of England and Wales. Any disputes shall be subject
          to the exclusive jurisdiction of the courts of England and Wales.
        </Section>

        <Section title="10. Contact Us">
          For questions about these Terms, please contact us at{" "}
          <a href="mailto:legal@cosmico.co.uk" className="text-blue-600 hover:underline">
            legal@cosmico.co.uk
          </a>.
        </Section>
      </article>

      <footer className="border-t border-gray-100 px-6 py-6 text-center text-12 text-gray-400">
        © {new Date().getFullYear()} Cosmico Bank. All rights reserved.
        &nbsp;&middot;&nbsp;
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
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

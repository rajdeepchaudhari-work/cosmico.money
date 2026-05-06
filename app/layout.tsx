/**
 * Top-level Next.js layout.
 *
 * Sets up the two web fonts the design system uses (Inter for UI, IBM
 * Plex Serif for occasional accents), wires up document metadata
 * (title, description, favicon), and pre-connects to Spline so the
 * landing-page 3D scene starts loading sooner.
 *
 * `dynamic = 'force-dynamic'` keeps every page request server-rendered
 * fresh — important because so much of the app depends on the auth
 * cookie which we can't safely cache.
 */
export const dynamic = 'force-dynamic'

import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
  title: "Cosmico",
  description: "Cosmico is a modern banking platform for everyone.",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
      </head>
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>{children}</body>
    </html>
  );
}

# Cosmico Money

A modern fintech banking platform — connect your accounts, track spending, send money, and get AI-powered financial insights.

![Next.js](https://img.shields.io/badge/-Next_JS_14-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4)
![Appwrite](https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E)

---

## Features

- **Multi-bank aggregation** — Link accounts from different banks via Plaid and view everything in one dashboard
- **Transaction history** — Search, filter, and analyze transactions across all connected accounts
- **Fund transfers** — ACH transfers via Dwolla (US) and Direct Debit via GoCardless (UK)
- **Spending analytics** — Pie charts and category breakdowns (Food & Drink, Travel, Shopping)
- **Cosmico AI** — GPT-4o-mini powered financial assistant available on every page
- **Rewards / Quest Board** — AI-generated spending challenges that unlock rewards when targets are hit
- **Secure auth** — Email + OTP two-factor authentication with Appwrite sessions
- **Multi-country support** — US, UK, and Canada (US: Dwolla ACH, UK: GoCardless Direct Debit)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, Server Actions) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS + ShadCN UI (Radix UI) |
| Forms | React Hook Form + Zod |
| Auth & Database | Appwrite Cloud |
| Bank Linking | Plaid SDK + react-plaid-link |
| Payments (US) | Dwolla (ACH transfers) |
| Payments (UK) | GoCardless (Direct Debit) |
| AI | OpenAI GPT-4o-mini |
| Email | Resend |
| Charts | Chart.js + react-chartjs-2 |
| 3D Graphics | Spline (@splinetool/react-spline) |
| Monitoring | Sentry + Vercel Speed Insights |

---

## Pages & Routes

### Public
| Route | Description |
|---|---|
| `/landing` | Landing page — hero, features, card animation, AI spotlight |
| `/sign-in` | Login with email + OTP |
| `/sign-up` | Registration with country, personal details, OTP |
| `/verify-otp` | OTP verification step |
| `/forgot-password` | Password reset request |
| `/privacy` | Privacy policy |
| `/terms` | Terms & conditions |

### Protected (requires auth)
| Route | Description |
|---|---|
| `/` | Dashboard — total balance, recent transactions, right sidebar |
| `/my-banks` | All connected bank accounts as cards |
| `/transaction-history` | Paginated, searchable transaction table |
| `/spending` | Spending breakdown by category with charts |
| `/rewards` | Quest Board — AI reward challenges with progress tracking |
| `/payment-transfer` | Send money (Dwolla for US / GoCardless for UK) |
| `/assistant` | Full-screen Cosmico AI chat interface |
| `/settings` | Profile, address, connected banks, account deletion |

---

## Project Structure

```
app/
  (auth)/                  # Public auth pages with sidebar layout
  (root)/                  # Protected dashboard pages
  landing/                 # Public landing page
components/
  ui/                      # ShadCN components
  Sidebar.tsx              # Main nav sidebar
  PlaidLink.tsx            # Plaid Link modal
  PaymentTransferForm.tsx  # US ACH transfer form
  UKPaymentTransferForm.tsx# UK Direct Debit form
  SpendingCharts.tsx       # Category spending charts
  RewardCard.tsx           # Reward challenge card
  ChatWidget.tsx           # Floating AI chat widget
  ScrollCard.tsx           # Scroll-driven 3D card animation
  SplineBackground.tsx     # 3D hero background
lib/
  actions/
    user.actions.ts        # Auth, Plaid link, bank account CRUD
    bank.actions.ts        # Plaid account/transaction fetching
    transaction.actions.ts # Transfer recording in Appwrite
    dwolla.actions.ts      # Dwolla ACH customer + transfer
    gocardless.actions.ts  # GoCardless UK payment flow
    rewards.actions.ts     # AI reward generation + tracking
    assistant.actions.ts   # AI chat assistant
  appwrite.ts              # Appwrite client (admin + session)
  plaid.ts                 # Plaid client config
  utils.ts                 # cn, formatAmount, formUrlQuery, parseStringify
types/
  index.d.ts               # Global TypeScript interfaces
public/
  cards/                   # Cosmico card images (front & back)
  hero-scene.splinecode    # Self-hosted Spline 3D hero scene
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Appwrite Cloud project
- Plaid developer account (sandbox)
- Dwolla sandbox account
- GoCardless sandbox account
- OpenAI API key
- Resend account

### Installation

```bash
git clone https://github.com/rajdeepchaudhari-work/cosmico.money.git
cd cosmico.money
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
# Appwrite
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_APPWRITE_KEY=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
APPWRITE_REWARDS_COLLECTION_ID=

# Plaid
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions,identity
PLAID_COUNTRY_CODES=US,GB,CA

# Dwolla (US ACH)
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox

# GoCardless (UK Direct Debit)
GOCARDLESS_AUTH_TOKEN=
GOCARDLESS_ENV=sandbox

# OpenAI
OPENAI_API_KEY=

# Resend (email)
RESEND_API_KEY=

# OTP
OTP_SECRET=

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Misc
NEXT_PUBLIC_LOGO_DEV_TOKEN=
```

### Run

```bash
npm run dev       # Development server → localhost:3000
npm run build     # Production build
npm start         # Start production server
npm run lint      # Run ESLint
```

---

## Auth Flow

1. User registers with name, address, date of birth, country, and government ID
2. Appwrite account created → Dwolla/GoCardless customer provisioned (by country)
3. OTP sent via Resend email → user verifies
4. Session stored in `appwrite-session` HTTP-only cookie
5. User links bank account via Plaid Link modal
6. All subsequent requests validated server-side via session cookie

---

## License

All rights reserved. © 2026 Cosmico Money.

# Cosmico Money

A modern fintech banking platform built for the next generation of money management.

![Next.js](https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4)
![Appwrite](https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E)

---

## Overview

Cosmico is a financial SaaS platform that connects your bank accounts, tracks spending, moves money, and provides AI-powered insights — all in one place.

## Features

- **Bank Account Linking** — Connect multiple bank accounts via Plaid
- **Real-time Transactions** — View and filter transaction history across all accounts
- **Fund Transfers** — Send money between accounts via Dwolla ACH
- **Cosmico AI** — GPT-4o-mini powered personal finance assistant
- **Rewards Tracking** — Earn and track rewards for everyday spending
- **Secure by Design** — End-to-end encryption, biometric login support, SOC 2 compliance

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + ShadCN UI |
| Auth & Database | Appwrite |
| Bank Integration | Plaid (Sandbox) |
| Payments | Dwolla (ACH transfers) |
| AI | OpenAI GPT-4o-mini |
| Monitoring | Sentry |

## Getting Started

### Prerequisites

- Node.js 18+
- Appwrite project
- Plaid developer account
- Dwolla sandbox account

### Installation

```bash
git clone https://github.com/rajdeepchaudhari-work/cosmico.money.git
cd cosmico.money
npm install
```

### Environment Variables

Create a `.env` file in the root with the following:

```env
# Appwrite
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
NEXT_APPWRITE_KEY=

# Plaid
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions,identity
PLAID_COUNTRY_CODES=GB,US

# Dwolla
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  (auth)/          # Sign in / Sign up pages
  (root)/          # Protected dashboard pages
  landing/         # Public landing page
components/        # Reusable UI components
lib/
  actions/         # Server actions (Plaid, Dwolla, Appwrite, user)
  appwrite.ts      # Appwrite client setup
  plaid.ts         # Plaid client setup
  utils.ts         # Utility functions
types/             # Global TypeScript types
public/            # Static assets
```

## License

All rights reserved. © 2026 Cosmico Money.

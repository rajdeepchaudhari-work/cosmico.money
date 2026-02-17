# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start Next.js dev server (localhost:3000)
- `npm run build` — Production build (TS and ESLint errors are ignored via next.config.mjs)
- `npm run lint` — Run ESLint (next/core-web-vitals config)
- `npm start` — Start production server

No test framework is configured.

## Architecture

Cosmico is a Next.js 14 financial SaaS app using the App Router. It connects to bank accounts via Plaid, processes money transfers via Dwolla, and uses Appwrite for auth/database.

### Route Groups

- `app/(auth)/` — Public auth pages (sign-in, sign-up) with their own layout (image sidebar)
- `app/(root)/` — Protected pages (dashboard, my-banks, transaction-history, payment-transfer) with sidebar nav layout. The root layout calls `getLoggedInUser()` and redirects unauthenticated users to `/sign-in`.

### Server Actions (`lib/actions/`)

All backend logic lives in `"use server"` action files — there are no API routes:

- `user.actions.ts` — Auth (signUp/signIn/getLoggedInUser), Plaid link token creation/exchange, bank account CRUD
- `bank.actions.ts` — Fetches account data and transactions from Plaid API, aggregates balances
- `transaction.actions.ts` — Records fund transfers in Appwrite database
- `dwolla.actions.ts` — Dwolla customer creation, funding sources, and ACH transfers

### Data Flow

1. Server components in `app/` pages fetch data via server actions (async/await)
2. Client components (marked `"use client"`) handle interactivity (forms, navigation, Plaid Link modal)
3. URL search params drive state for pagination and bank account filtering (via `formUrlQuery` utility)
4. `parseStringify()` is used to serialize data across the server/client boundary

### External Services

- **Appwrite** — Auth (email/password sessions stored in `appwrite-session` HTTP-only cookie), NoSQL database with three collections: Users, Banks, Transactions. Two client patterns: `createAdminClient()` (API key, for server operations) and `createSessionClient()` (cookie-based, for auth checks). Configured in `lib/appwrite.ts`.
- **Plaid** — Bank account linking and transaction sync. Client configured in `lib/plaid.ts`. Sandbox mode by default.
- **Dwolla** — ACH fund transfers between users. Client initialized in `dwolla.actions.ts`. Sandbox mode by default.

### UI & Styling

- ShadCN UI components in `components/ui/` (configured via `components.json` with `@/` path alias)
- Tailwind CSS with custom theme: brand gradients (`bank-gradient`, `bank-green-gradient`), extended color palettes, custom shadows, and two fonts (`inter`, `ibm-plex-serif`)
- Global CSS classes for layout sections defined in `app/globals.css` (e.g., `.sidebar`, `.auth-form`, `.payment-transfer_form-item`)
- Form validation uses React Hook Form + Zod (`authFormSchema` in `lib/utils.ts`)

### Types

Global TypeScript type declarations are in `types/index.d.ts` (interfaces for User, Account, Bank, Transaction, and all component/action props). Path alias `@/*` maps to the project root.

### Key Utilities (`lib/utils.ts`)

- `cn()` — Tailwind class merging (clsx + tailwind-merge)
- `formatAmount()` — USD currency formatting
- `formUrlQuery()` — URL search param manipulation for pagination/filtering
- `encryptId()` / `decryptId()` — Base64 encoding for sharable bank IDs
- `parseStringify()` — JSON round-trip for server-to-client data transfer

## Environment Variables

All required in `.env` — Appwrite (endpoint, project, database/collection IDs, secret), Plaid (client ID, secret, env, products, country codes), Dwolla (key, secret, base URL, env). See README.md for the full list.

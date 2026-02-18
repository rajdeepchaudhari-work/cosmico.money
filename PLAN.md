# Cosmico Bank — Project Implementation Plan
**Module:** CN6000 Final Year Project
**Student:** 2522821
**Supervisor:** Himanshu Singhal
**Stack:** Next.js 14, Appwrite, Plaid, Dwolla, Vercel

---

## Current State (Completed)

| Feature | Status | Notes |
|---|---|---|
| Multi-bank account aggregation | ✅ Done | Plaid Sandbox — real API, simulated data |
| Transaction history & search | ✅ Done | Pagination, client-side filtering, merchant logos |
| ACH fund transfers | ✅ Done | Dwolla Sandbox |
| Rule-based rewards/loyalty system | ✅ Done | Merchant spending challenges, progress tracking |
| User auth (sign-up, sign-in, forgot password) | ✅ Done | Appwrite email/password sessions |
| Country support (US, UK, CA) | ✅ Done | Currency formatting, country-aware validation |
| Landing page | ✅ Done | Beta launch page with sandbox/FCA disclaimer modal |
| Cloud deployment | ✅ Done | Vercel, production CI/CD |
| GDPR & FCA regulatory disclaimer | ✅ Done | Footer + entry modal |

---

## What Will Be Implemented

### 1. Agentic AI Loyalty Engine
**Priority: HIGH — core proposal objective**
**Effort: 1–2 weeks**

The existing rule-based rewards system will be upgraded to use an AI agent (Claude claude-sonnet-4-6 via Anthropic API) that:

- Autonomously analyses a user's full transaction history
- Detects spending patterns by merchant, category, and frequency
- Generates **personalised reward challenges** tailored to that user's actual behaviour
  - e.g. "You spend ~£45/month at Starbucks. Reach £60 this month to earn a £5 gift card."
- Re-evaluates and updates challenges as new transactions come in
- Acts as an autonomous agent — no manual reward seeding required

**Implementation plan:**
- [ ] Create `lib/actions/ai.actions.ts` — server action that calls Anthropic API
- [ ] Build prompt that passes transaction history + existing categories to the model
- [ ] Parse AI response into structured reward objects matching existing `Reward` schema
- [ ] Replace `seedRewards()` with `generateAIRewards(userId, transactions)`
- [ ] Add `ANTHROPIC_API_KEY` to environment variables
- [ ] Add UI indicator on rewards page showing "AI-generated challenges"

---

### 2. AI Financial Insights Page
**Priority: HIGH — strong demo piece**
**Effort: 3–5 days**

A dedicated `/insights` page powered by AI that gives users natural language analysis of their spending:

- Monthly spending summary by category
- Anomaly detection ("You spent 40% more on dining this month")
- Savings opportunities ("Switching your coffee habits could save £30/month")
- Personalised financial health score

**Implementation plan:**
- [ ] Create `app/(root)/insights/page.tsx`
- [ ] Add insights link to sidebar navigation
- [ ] Create `lib/actions/insights.actions.ts` — sends transaction data to Claude
- [ ] Stream AI response to the UI using Vercel AI SDK or chunked responses
- [ ] Display as card-based dashboard with key metrics + AI narrative

---

### 3. AI Financial Chat Assistant
**Priority: MEDIUM**
**Effort: 3–5 days**

A chat interface where users can ask questions about their own finances:

- "How much did I spend on food last month?"
- "Which merchant do I spend the most at?"
- "Am I on track to hit my Starbucks reward?"

The AI receives the user's actual transaction data as context with each message.

**Implementation plan:**
- [ ] Create `app/(root)/assistant/page.tsx`
- [ ] Add assistant link to sidebar
- [ ] Maintain conversation history in component state
- [ ] Each message sends last 90 days of transactions as system context
- [ ] Stream responses using Anthropic API streaming

---

### 4. Blockchain Audit Trail (Simplified)
**Priority: MEDIUM — scoped down from full smart contracts**
**Effort: 1 week**

> **Note for supervisor:** Full smart contract-based loyalty system (as originally proposed) is out of scope for the timeframe. The implementation will be a **blockchain audit trail** — reward completion events are hashed and recorded on the Ethereum Sepolia testnet, providing tamper-proof proof of reward issuance. This demonstrates the core blockchain principle (immutability, transparency) without requiring a full Solidity loyalty contract.

**What it does:**
- When a user completes a reward challenge, the event (userId, rewardId, timestamp, amount) is hashed
- The hash is recorded as a transaction on Ethereum Sepolia testnet via `ethers.js`
- Users can view their reward receipts with an on-chain transaction hash (verifiable on Sepolia Etherscan)

**Implementation plan:**
- [ ] Set up Hardhat project in `/blockchain` subfolder
- [ ] Write minimal `RewardAudit.sol` contract with a single `logReward(bytes32 hash)` event
- [ ] Deploy to Sepolia testnet
- [ ] Create `lib/actions/blockchain.actions.ts` — calls contract when reward is completed
- [ ] Add `BLOCKCHAIN_PRIVATE_KEY` and `SEPOLIA_RPC_URL` to environment variables
- [ ] Display transaction hash on completed reward cards as proof of record

---

### 5. Formal Testing Documentation
**Priority: LOW — report requirement**
**Effort: 1–2 days**

- [ ] Export Postman collection documenting all server actions (auth, bank, transfer, rewards, AI)
- [ ] Run OWASP ZAP against Vercel deployment and document findings
- [ ] Write up security assessment in project report

---

## What Will NOT Be Implemented (Informing Tutor)

| Proposal item | Decision | Reason |
|---|---|---|
| Full Solidity smart contract loyalty system | ❌ Replaced with audit trail | Requires Solidity expertise + significant extra scope; audit trail demonstrates the same principle |
| MongoDB | ❌ Substituted with Appwrite | Appwrite is a comparable managed NoSQL solution; justified by managed hosting, built-in auth, and real-time capabilities |
| Python-based AI agents (LangChain) | ❌ Using Anthropic API directly | Direct API integration is simpler, more reliable, and avoids Python/JS bridge complexity |
| Real PSD2 compliance | ❌ Out of scope | Platform operates in sandbox mode; PSD2 is discussed in report as research context |

---

## Tech Stack (Final)

| Layer | Technology | Proposal Equivalent |
|---|---|---|
| Frontend | Next.js 14 (React) | React ✅ |
| Backend | Next.js Server Actions | Node.js ✅ (server-side JS) |
| Database | Appwrite (NoSQL) | MongoDB ⚠️ (justified substitution) |
| Open Banking | Plaid Sandbox | TrueLayer / Plaid ✅ |
| Payments | Dwolla Sandbox | ACH transfer layer ✅ |
| AI | Anthropic Claude API | OpenAI API / LangChain ✅ (equivalent) |
| Blockchain | Ethereum Sepolia + ethers.js | Ethereum Testnet ✅ (simplified) |
| Deployment | Vercel | Vercel ✅ |

---

## Remaining Milestones

| Milestone | Target |
|---|---|
| AI rewards generation live | Week 1 |
| AI insights page | Week 2 |
| AI chat assistant | Week 2 |
| Blockchain audit trail | Week 3 |
| Testing documentation | Week 4 |
| Report write-up | Ongoing |

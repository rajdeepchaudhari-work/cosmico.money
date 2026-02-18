"use server";

import OpenAI from "openai";
import { UK_MERCHANT_CHALLENGES } from "@/constants";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type RawReward = Omit<Reward, "$id">;

/**
 * Agentic AI Rewards Engine
 *
 * Analyses the user's real transaction history and asks GPT-4o-mini to
 * generate personalised spending challenges. Falls back to the static
 * UK_MERCHANT_CHALLENGES if the API call fails or returns no data.
 */
export const generateAIRewards = async (
  transactions: Transaction[]
): Promise<RawReward[]> => {
  try {
    // Aggregate spend per merchant name (debit transactions only)
    const merchantSpend: Record<string, number> = {};
    for (const txn of transactions) {
      if (txn.amount > 0 && txn.name) {
        const key = txn.name.toLowerCase();
        merchantSpend[key] = (merchantSpend[key] || 0) + txn.amount;
      }
    }

    // Pick the top 10 merchants by total spend
    const topMerchants = Object.entries(merchantSpend)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, amount]) => ({ name, amount: Math.round(amount) }));

    const userContext =
      topMerchants.length > 0
        ? `The user's top UK merchants by spending are:\n${topMerchants
            .map((m) => `- ${m.name}: £${m.amount}`)
            .join("\n")}\n\nGenerate 6 personalised reward challenges based on their actual spending habits.`
        : `The user is a new customer with no transaction history yet. Generate 6 reward challenges for a typical UK bank customer.`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are the rewards engine for Cosmico, a UK digital bank. Your job is to generate personalised spending challenges that reward customers for loyalty at their favourite merchants.

Return a JSON object with a "rewards" array. Each item must have exactly these fields:
- merchantName: string  (display name shown to user, e.g. "Tesco")
- merchantMatch: string (lowercase keyword used to match transaction names, e.g. "tesco")
- targetAmount: number  (spend target in GBP, realistic range £50–£1000)
- rewardAmount: number  (reward value in GBP, roughly 1–5% of targetAmount)
- rewardLabel: string   (e.g. "£10 Tesco Gift Card")
- category: string      (must be one of: "Food and Drink", "Travel", "Shopping")

Rules:
- Use real UK merchants only (e.g. Tesco, Sainsbury's, Costa Coffee, M&S, TfL, Boots, Greggs, Pret, JD Sports, ASOS, Amazon, etc.)
- Spread challenges across all 3 categories
- Make targetAmount achievable within 1–3 months of normal spending
- rewardLabel should be in GBP (£) format
- Return exactly 6 rewards`,
        },
        {
          role: "user",
          content: userContext,
        },
      ],
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return [];

    const parsed = JSON.parse(content);
    const rewards: RawReward[] = parsed.rewards;

    if (!Array.isArray(rewards) || rewards.length === 0) return [];

    return rewards;
  } catch (error) {
    console.error("generateAIRewards failed, using fallback:", error);
    // Return static challenges as fallback so the page never breaks
    return UK_MERCHANT_CHALLENGES;
  }
};

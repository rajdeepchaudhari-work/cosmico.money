/**
 * Reward server actions.
 *
 * Owns the Appwrite "Rewards" collection: a per-user list of spending
 * challenges shown on the /rewards page. Rewards are seeded once per user
 * — either with a static UK_MERCHANT_CHALLENGES list (seedRewards) or with
 * AI-generated challenges based on the user's actual spending
 * (seedAIRewards). Progress against each reward is calculated on the page
 * itself in lib/utils/rewards.ts so the AI never has to "know" how much
 * the user has spent — the data shown to the user is always real.
 */
"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";
import { UK_MERCHANT_CHALLENGES } from "@/constants";
import { generateAIRewards } from "./ai.actions";

/**
 * Returns up to 100 rewards belonging to the user. We cap at 100 because
 * a single user is only ever seeded six rewards — the limit is purely
 * defensive in case seeding ever runs twice.
 */
export const getRewards = async (userId: string): Promise<Reward[]> => {
  try {
    const { database } = await createAdminClient();

    const result = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_REWARDS_COLLECTION_ID!,
      [Query.equal("userId", userId), Query.limit(100)]
    );

    return parseStringify(result.documents);
  } catch (error) {
    console.error("Error fetching rewards:", error);
    return [];
  }
};

/**
 * Static fallback seeder. Inserts the hard-coded UK_MERCHANT_CHALLENGES
 * list (Tesco, Costa, M&S, etc.) for users who don't have any rewards yet.
 * Idempotent — if the user already has at least one reward, it bails out.
 */
export const seedRewards = async (userId: string): Promise<{ success: boolean }> => {
  try {
    const { database } = await createAdminClient();

    const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
    const REWARDS_COLLECTION_ID = process.env.APPWRITE_REWARDS_COLLECTION_ID!;

    // Check if this user already has rewards
    const existing = await database.listDocuments(
      DATABASE_ID,
      REWARDS_COLLECTION_ID,
      [Query.equal("userId", userId), Query.limit(1)]
    );

    if (existing.total > 0) {
      return { success: true };
    }

    // Seed static UK merchant challenges for this user
    for (const challenge of UK_MERCHANT_CHALLENGES) {
      await database.createDocument(
        DATABASE_ID,
        REWARDS_COLLECTION_ID,
        ID.unique(),
        { ...challenge, userId }
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Error seeding rewards:", error);
    return { success: false };
  }
};

/**
 * Agentic seed: uses GPT-4o-mini to generate personalised reward challenges
 * from the user's transaction history, then persists them to Appwrite.
 * Falls back to static UK_MERCHANT_CHALLENGES if the AI call fails.
 */
export const seedAIRewards = async (
  transactions: Transaction[],
  userId: string
): Promise<{ success: boolean }> => {
  try {
    const { database } = await createAdminClient();

    const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
    const REWARDS_COLLECTION_ID = process.env.APPWRITE_REWARDS_COLLECTION_ID!;

    // Skip if this user already has rewards
    const existing = await database.listDocuments(
      DATABASE_ID,
      REWARDS_COLLECTION_ID,
      [Query.equal("userId", userId), Query.limit(1)]
    );

    if (existing.total > 0) {
      return { success: true };
    }

    // Ask the AI to generate personalised challenges
    const aiRewards = await generateAIRewards(transactions);

    // Use static fallback if AI returns nothing
    const rewardsToSeed =
      aiRewards.length > 0 ? aiRewards : UK_MERCHANT_CHALLENGES;

    for (const challenge of rewardsToSeed) {
      await database.createDocument(
        DATABASE_ID,
        REWARDS_COLLECTION_ID,
        ID.unique(),
        { ...challenge, userId }
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Error seeding AI rewards:", error);
    return { success: false };
  }
};

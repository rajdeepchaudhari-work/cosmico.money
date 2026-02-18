"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";
import { UK_MERCHANT_CHALLENGES } from "@/constants";
import { generateAIRewards } from "./ai.actions";

export const getRewards = async (): Promise<Reward[]> => {
  try {
    const { database } = await createAdminClient();

    const result = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_REWARDS_COLLECTION_ID!,
      [Query.limit(100)]
    );

    return parseStringify(result.documents);
  } catch (error) {
    console.error("Error fetching rewards:", error);
    return [];
  }
};

export const seedRewards = async (): Promise<{ success: boolean }> => {
  try {
    const { database } = await createAdminClient();

    const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
    const REWARDS_COLLECTION_ID = process.env.APPWRITE_REWARDS_COLLECTION_ID!;

    // Check if rewards already exist
    const existing = await database.listDocuments(
      DATABASE_ID,
      REWARDS_COLLECTION_ID,
      [Query.limit(1)]
    );

    if (existing.total > 0) {
      return { success: true };
    }

    // Seed all UK merchant challenges
    for (const challenge of UK_MERCHANT_CHALLENGES) {
      await database.createDocument(
        DATABASE_ID,
        REWARDS_COLLECTION_ID,
        ID.unique(),
        challenge
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
  transactions: Transaction[]
): Promise<{ success: boolean }> => {
  try {
    const { database } = await createAdminClient();

    const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
    const REWARDS_COLLECTION_ID = process.env.APPWRITE_REWARDS_COLLECTION_ID!;

    // Skip if rewards already exist
    const existing = await database.listDocuments(
      DATABASE_ID,
      REWARDS_COLLECTION_ID,
      [Query.limit(1)]
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
        challenge
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Error seeding AI rewards:", error);
    return { success: false };
  }
};

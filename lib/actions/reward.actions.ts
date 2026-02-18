"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";
import { UK_MERCHANT_CHALLENGES } from "@/constants";

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

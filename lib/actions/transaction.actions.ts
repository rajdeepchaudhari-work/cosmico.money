/**
 * In-app transfer server actions.
 *
 * These manage the Appwrite "Transactions" collection, which records money
 * movements between Cosmico users (e.g. UK GoCardless and US Dwolla
 * transfers). They are completely separate from Plaid transactions —
 * Plaid only sees what the underlying bank reports, while this collection
 * is our own ledger of demo transfers initiated through the app.
 */
"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

/**
 * Records a successful in-app transfer in Appwrite. Defaults the channel
 * to "online" and the category to "Transfer" if the caller doesn't override
 * them — almost no callers do, since these are always app-initiated.
 */
export const createTransaction = async (transaction: CreateTransactionProps) => {
  try {
    const { database } = await createAdminClient();

    const newTransaction = await database.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        channel: 'online',
        category: 'Transfer',
        ...transaction
      }
    )

    return parseStringify(newTransaction);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Returns every in-app transaction touching a given bank, both sent and
 * received. Two queries are needed because Appwrite doesn't allow OR-style
 * conditions, so we union the senderBankId and receiverBankId result sets.
 */
export const getTransactionsByBankId = async ({bankId}: getTransactionsByBankIdProps) => {
  try {
    const { database } = await createAdminClient();

    const senderTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal('senderBankId', bankId)],
    )

    const receiverTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal('receiverBankId', bankId)],
    );

    const transactions = {
      total: senderTransactions.total + receiverTransactions.total,
      documents: [
        ...senderTransactions.documents, 
        ...receiverTransactions.documents,
      ]
    }

    return parseStringify(transactions);
  } catch (error) {
    console.log(error);
  }
}
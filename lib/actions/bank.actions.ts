/**
 * Bank-data server actions.
 *
 * Wrappers around the Plaid API that combine on-the-fly Plaid data
 * (live balances, recent transactions, institution metadata) with the
 * Bank documents we persist in Appwrite (which hold the access tokens
 * we received during the link flow). The pages and components in the
 * app never call Plaid directly — they go through these helpers so the
 * access tokens stay on the server.
 */
"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";


/**
 * Returns every bank account the user has linked, enriched with live
 * balances + institution data from Plaid. Also returns aggregated totals
 * (total balance across all banks, number of banks) which the dashboard
 * uses for the headline figure.
 */
export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    // get banks from db
    const banks = await getBanks({ userId });

    const accounts = await Promise.all(
      banks?.map(async (bank: Bank) => {
        // get each account info from plaid
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        // get institution info from plaid
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.$id,
          sharaebleId: bank.shareableId,
        };

        return account;
      })
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);

    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

/**
 * Returns a single bank account along with its full transaction list.
 * Combines two sources:
 *   • Plaid transactionsSync — for transactions on the underlying bank.
 *   • Appwrite Transactions collection — for in-app transfers between
 *     Cosmico users (those don't exist in Plaid because we don't move
 *     real money in sandbox mode).
 * The two lists are merged and sorted newest-first.
 */
export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    // get bank from db
    const bank = await getBank({ documentId: appwriteItemId });

    // get account info from plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    // get transfer transactions from appwrite
    const transferTransactionsData = await getTransactionsByBankId({
      bankId: bank.$id,
    });

    const transferTransactions = transferTransactionsData.documents.map(
      (transferData: Transaction) => ({
        id: transferData.$id,
        name: transferData.name!,
        amount: transferData.amount!,
        date: transferData.$createdAt,
        paymentChannel: transferData.channel,
        category: transferData.category,
        type: transferData.senderBankId === bank.$id ? "debit" : "credit",
      })
    );

    // get institution info from plaid
    const institution = await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    });

    const transactions = await getTransactions({
      accessToken: bank?.accessToken,
    });

    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank.$id,
    };

    // sort transactions by date such that the most recent transaction is first
    const allTransactions = [...transactions, ...transferTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return parseStringify({
      data: account,
      transactions: allTransactions,
    });
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
  }
};

/**
 * Looks up institution-level metadata (logo, primary colour, name) from
 * Plaid. Used to render the bank-specific styling on each card and tab.
 */
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US", "CA", "GB"] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

import { normalizeCategory } from "@/lib/utils/category";

/**
 * Pulls every transaction Plaid knows about for one access_token.
 *
 * Uses /transactions/sync, which is cursor-based: the first call returns
 * everything from the start of the account's history; subsequent calls
 * (with the same cursor) return only what's new. Here we always loop until
 * has_more is false so the caller gets a full snapshot.
 *
 * Each Plaid transaction is normalised into the shape the rest of the app
 * expects: a stable id, a numeric amount (positive = debit, negative =
 * credit), a tidied-up category (see lib/utils/category.ts), and an
 * optional merchant logo URL.
 */
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let hasMore = true;
  let cursor: string | undefined = undefined;
  let allTransactions: any[] = [];

  try {
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
        cursor,
      });

      const data = response.data;

      const newTransactions = data.added.map((t) => ({
        id: t.transaction_id,
        name: t.name,
        paymentChannel: t.payment_channel || "online",
        type: t.amount > 0 ? "debit" : "credit",
        accountId: t.account_id,
        amount: t.amount,
        pending: t.pending,

        // 🔥 CATEGORY FIX
        category: normalizeCategory(
          t.personal_finance_category?.primary ||
          t.category?.[0] ||
          "Payment"
        ),

        date: t.date,
        image: t.logo_url,
      }));

      allTransactions.push(...newTransactions);

      hasMore = data.has_more;
      cursor = data.next_cursor;
    }

    return parseStringify(allTransactions);
  } catch (error) {
    console.error("Plaid sync error:", error);
    return [];
  }
};

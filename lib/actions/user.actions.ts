/**
 * User & Bank server actions.
 *
 * Central server-side module that handles:
 *   • Authentication (sign-up, sign-in, sign-out, password recovery)
 *     — Two-factor: every login first creates an Appwrite session but the
 *       session cookie is only set after a 6-digit email OTP is verified.
 *   • Plaid linking (creating link tokens, exchanging public tokens, persisting
 *     bank documents in Appwrite).
 *   • US Dwolla customer + funding source creation (only US users get a
 *     Dwolla customer; UK/Canada use GoCardless or no transfer at all).
 *   • CRUD on the Bank and User collections in Appwrite.
 *
 * All functions in this file run server-side ("use server") so they can safely
 * touch the Appwrite admin key, Plaid secret, and Dwolla credentials.
 */
"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies, headers } from "next/headers";
import { COUNTRY_CONFIG, encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";

import { plaidClient } from "@/lib/plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
import { sendOTPAndStorePending } from "./otp.actions";

// Appwrite collection IDs are pulled from environment variables so the same
// codebase can target dev / staging / production projects without changes.

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

/**
 * Looks up the application-level User document in the Appwrite "Users"
 * collection by the Appwrite auth user ID. Used everywhere the app needs
 * profile information (name, address, country, dwollaCustomerId, etc.) that
 * isn't stored on the auth account itself.
 */
export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

/**
 * First half of the two-factor sign-in flow.
 *
 * Validates the email/password against Appwrite, but instead of activating
 * the session straight away we hand the session.secret to the OTP module,
 * which stashes it server-side and emails the user a six-digit code.
 * The session cookie is only set once the OTP is later verified — this
 * means a leaked password alone is not enough to access the account.
 */
export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    const user = await getUserInfo({ userId: session.userId });

    // Don't set the session cookie yet — require OTP first.
    await sendOTPAndStorePending({
      userId: session.userId,
      email,
      firstName: user.firstName,
      sessionSecret: session.secret,
      isSignUp: false,
    });

    return parseStringify({ requiresOTP: true, userId: session.userId });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

/**
 * Creates a brand-new account.
 *
 * Steps performed in order:
 *   1. (Optional) tidy up a previous half-finished sign-up attempt — if the
 *      user pressed Back after entering their email and is restarting with a
 *      different one, we delete the orphaned auth account + Users doc so the
 *      database doesn't fill up with unverified users.
 *   2. Create the Appwrite auth account with email + password.
 *   3. For US users only, create a Dwolla customer (UK/Canada don't need one).
 *   4. Persist the application-level User document with all profile data.
 *   5. Create an Appwrite session and hand it to the OTP module — same
 *      "session is held back until OTP verified" pattern as signIn.
 */
export const signUp = async (params: SignUpParams & { previousPendingUserId?: string }) => {
  const { password, previousPendingUserId, ...userData } = params as any;
  const { email, firstName, lastName, country } = userData;

  let newUserAccount;

  try {
    const { account, database, user: adminUser } = await createAdminClient();

    // If the user went back to fix their email, clean up the previous
    // unverified account so we don't leak orphaned records.
    if (previousPendingUserId) {
      try {
        const docs = await database.listDocuments(DATABASE_ID!, USER_COLLECTION_ID!, [
          Query.equal("userId", [previousPendingUserId]),
        ]);
        for (const doc of docs.documents) {
          await database.deleteDocument(DATABASE_ID!, USER_COLLECTION_ID!, doc.$id);
        }
        await adminUser.delete(previousPendingUserId);
      } catch {
        // Ignore — the account may have already been cleaned up by a
        // previous attempt or a server retry.
      }
    }

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) throw new Error("Error creating user");

    let dwollaCustomerId = "";
    let dwollaCustomerUrl = "";

    if (country === "US") {
      const url = await createDwollaCustomer({
        ...userData,
        type: "personal",
      });

      if (!url) throw new Error("Error creating Dwolla customer");

      dwollaCustomerUrl = url;
      dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
    }

    await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl,
      }
    );

    const session = await account.createEmailPasswordSession(email, password);

    // Don't set the session cookie yet — require OTP first
    await sendOTPAndStorePending({
      userId: session.userId,
      email,
      firstName,
      sessionSecret: session.secret,
      isSignUp: true,
    });

    return parseStringify({ requiresOTP: true, userId: session.userId });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

/**
 * Resolves the currently authenticated user from the Appwrite session cookie.
 * Returns null if no session is present — used by the protected route layout
 * to redirect unauthenticated visitors to /sign-in.
 */
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
};

/**
 * Asks Plaid for a short-lived link_token. The browser passes this token to
 * the Plaid Link UI, which the user uses to pick their bank and authenticate.
 * The token is scoped to the current user and to the products we need
 * ("auth" for account/routing numbers, "transactions" for transaction sync).
 * Country code is derived from the user's profile so a UK user is shown
 * UK banks, a US user is shown US banks, etc.
 */
export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth", "transactions"] as Products[],
      language: "en",
      country_codes: [(COUNTRY_CONFIG[user.country]?.plaidCode || "US") as CountryCode],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.log(error);
  }
};

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      }
    );

    return parseStringify(bankAccount);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Final step of bank linking. After the user finishes Plaid Link in the
 * browser we receive a one-shot public_token; this function exchanges it for
 * a long-lived access_token, then persists everything we need to query the
 * account later (access_token, account_id, item_id, plus a Dwolla funding
 * source URL for US users so we can later move money between accounts).
 */
export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Trade the short-lived public_token for a permanent access_token + item_id.
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    let fundingSourceUrl = "";

    if (user.country === "US") {
      // Create a processor token for Dwolla using the access token and account ID
      const request: ProcessorTokenCreateRequest = {
        access_token: accessToken,
        account_id: accountData.account_id,
        processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
      };

      const processorTokenResponse = await plaidClient.processorTokenCreate(
        request
      );
      const processorToken = processorTokenResponse.data.processor_token;

      // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
      fundingSourceUrl = await addFundingSource({
        dwollaCustomerId: user.dwollaCustomerId,
        processorToken,
        bankName: accountData.name,
      }) || "";

      // If the funding source URL is not created, throw an error
      if (!fundingSourceUrl) throw Error;
    }

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    // Revalidate the path to reflect the changes
    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error("An error occurred while creating exchanging token:", error);
  }
};

export const getBanks = async ({ userId }: getBanksProps) => {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(banks.documents);
  } catch (error) {
    console.log(error);
  }
};

export const getBank = async ({ documentId }: getBankProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("$id", [documentId])]
    );

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Triggers Appwrite's built-in password-reset flow. Appwrite emails the user
 * a recovery link that points back to /reset-password with userId + secret in
 * the query string; that page then calls resetPassword() below.
 */
export const sendPasswordRecovery = async (email: string) => {
  try {
    const { account } = await createAdminClient();
    const origin = headers().get('origin') || 'http://localhost:3000';
    await account.createRecovery(email, `${origin}/reset-password`);
    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Completes the password-reset flow using the userId/secret pair Appwrite
 * embeds in the recovery email link.
 */
export const resetPassword = async (userId: string, secret: string, password: string) => {
  try {
    const { account } = await createAdminClient();
    await account.updateRecovery(userId, secret, password);
    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBankByAccountId = async ({
  accountId,
}: getBankByAccountIdProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("accountId", [accountId])]
    );

    if (bank.total !== 1) return null;

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Updates the User document from the Settings page. Calls revalidatePath so
 * Next.js refreshes the cached Settings page on the next render.
 */
export const updateUserProfile = async (
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    address1?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  }
): Promise<{ success: boolean }> => {
  try {
    const { database } = await createAdminClient();
    await database.updateDocument(DATABASE_ID!, USER_COLLECTION_ID!, userId, data);
    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false };
  }
};

/**
 * Removes a connected bank from the user's account. Only deletes our local
 * Appwrite Bank document — Plaid still holds the access_token until it is
 * explicitly invalidated, but for sandbox/demo purposes deleting the
 * document is enough to make the bank disappear from the dashboard.
 */
export const disconnectBank = async (
  bankDocumentId: string
): Promise<{ success: boolean }> => {
  try {
    const { database } = await createAdminClient();
    await database.deleteDocument(DATABASE_ID!, BANK_COLLECTION_ID!, bankDocumentId);
    revalidatePath("/settings");
    revalidatePath("/my-banks");
    return { success: true };
  } catch (error) {
    console.error("Error disconnecting bank:", error);
    return { success: false };
  }
};

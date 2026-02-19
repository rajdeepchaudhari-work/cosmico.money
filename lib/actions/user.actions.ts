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

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

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

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    const user = await getUserInfo({ userId: session.userId });

    // Don't set the session cookie yet — require OTP first
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

export const signUp = async (params: SignUpParams & { previousPendingUserId?: string }) => {
  const { password, previousPendingUserId, ...userData } = params as any;
  const { email, firstName, lastName, country } = userData;

  let newUserAccount;

  try {
    const { account, database, user: adminUser } = await createAdminClient();

    // If user went back to fix their email, clean up the previous unverified account
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
        // Ignore — account may have already been cleaned up
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

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
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

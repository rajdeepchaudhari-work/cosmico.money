/**
 * Appwrite client factories.
 *
 * The app uses two distinct authentication patterns when talking to
 * Appwrite, and this file exposes one factory function for each:
 *
 *   • createSessionClient — uses the user's "appwrite-session" cookie.
 *     Anything done with this client is performed AS the user, so
 *     Appwrite's row-level security applies. Used for things like
 *     account.get() inside getLoggedInUser().
 *
 *   • createAdminClient — uses the server-side API key (NEXT_APPWRITE_KEY).
 *     Used for privileged operations that need to bypass user permissions:
 *     creating documents on behalf of a user during sign-up, listing all
 *     of a user's banks during seeding, sending OTP emails, etc.
 *
 * The clients expose only the Appwrite SDK objects the app actually uses
 * (Account, Databases, Users) so unrelated SDK surface area stays out of
 * the rest of the codebase.
 */
"use server";

import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

/**
 * Builds an Appwrite client scoped to the currently signed-in user via
 * their session cookie. Throws if no session exists, which lets calling
 * code (e.g. getLoggedInUser) treat that as the "not logged in" branch.
 */
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = cookies().get("appwrite-session");

  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

/**
 * Builds an Appwrite client authenticated with the server-side API key.
 * This bypasses user-level permissions, so it MUST only be used inside
 * "use server" code — never in components or routes that could be called
 * directly from the browser.
 */
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    }
  };
}


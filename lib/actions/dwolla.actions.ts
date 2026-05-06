/**
 * Dwolla server actions.
 *
 * Dwolla powers the US ACH transfer flow (UK uses GoCardless, Canada is
 * disabled for now). This module wraps the dwolla-v2 SDK with the small
 * subset of operations the app actually needs:
 *
 *   • createDwollaCustomer  — called during US sign-up to create the
 *                             Dwolla-side identity record.
 *   • addFundingSource      — called after Plaid linking to register the
 *                             linked bank as a Dwolla funding source.
 *   • createTransfer        — performs the actual ACH transfer between
 *                             two funding sources.
 *
 * All credentials come from environment variables, and the SDK is pinned
 * to either sandbox or production based on DWOLLA_ENV.
 */
"use server";

import { Client } from "dwolla-v2";

const getEnvironment = (): "production" | "sandbox" => {
  const environment = process.env.DWOLLA_ENV as string;

  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environment should either be set to `sandbox` or `production`"
      );
  }
};

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
});

/**
 * Registers a Plaid-linked bank with Dwolla so it can be used as a
 * source/destination for transfers. The processor token comes from
 * Plaid's processorTokenCreate endpoint and acts as a one-time bridge
 * between the two systems — Dwolla never sees the raw account number.
 */
export const createFundingSource = async (
  options: CreateFundingSourceOptions
) => {
  try {
    return await dwollaClient
      .post(`customers/${options.customerId}/funding-sources`, {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      })
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Funding Source Failed: ", err);
  }
};

/**
 * Generates the on-demand ACH authorization links Dwolla needs to attach
 * to a funding-source creation request. This is the digital equivalent
 * of the customer agreeing to let us debit their account on demand.
 */
export const createOnDemandAuthorization = async () => {
  try {
    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );
    const authLink = onDemandAuthorization.body._links;
    return authLink;
  } catch (err) {
    console.error("Creating an On Demand Authorization Failed: ", err);
  }
};

/**
 * Creates a Dwolla customer record and returns the customer's resource URL.
 * Dwolla's REST API returns the new resource URL in the Location header,
 * so we pluck it out and pass it back to the caller, which extracts the
 * UUID portion to store on the User document.
 */
export const createDwollaCustomer = async (
  newCustomer: NewDwollaCustomerParams
) => {
  try {
    return await dwollaClient
      .post("customers", newCustomer)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Dwolla Customer Failed: ", err);
  }
};

/**
 * Performs an ACH transfer between two funding sources. The amount is in
 * dollars (USD); Dwolla expects strings, not numbers, so make sure callers
 * pass a string like "10.00".
 */
export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) => {
  try {
    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: "USD",
        value: amount,
      },
    };
    return await dwollaClient
      .post("transfers", requestBody)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};

/**
 * Convenience wrapper that ties on-demand authorization + funding-source
 * creation together so callers (in practice, exchangePublicToken) can
 * register a Plaid-linked bank with Dwolla in a single call.
 */
export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) => {
  try {
    // create dwolla auth link
    const dwollaAuthLinks = await createOnDemandAuthorization();

    // add funding source to the dwolla customer & get the funding source url
    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };
    return await createFundingSource(fundingSourceOptions);
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};

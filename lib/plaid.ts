/**
 * Plaid SDK singleton.
 *
 * Configured to talk to Plaid's sandbox environment — the same set of
 * APIs as production but populated with fake banks ("Plaid Sandbox HSBC",
 * "Plaid Sandbox Chase", etc.) and test credentials. No real account data
 * is ever exchanged. The plaidClient is imported by lib/actions/* on the
 * server so credentials never leak to the browser.
 */
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    }
  }
})

export const plaidClient = new PlaidApi(configuration);
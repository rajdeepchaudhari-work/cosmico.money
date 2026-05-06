/**
 * Normalises Plaid's category strings into the small, human-friendly set
 * the dashboard's doughnut chart and transaction tables understand.
 *
 * Plaid returns categories that are sometimes detailed ("FOOD_AND_DRINK",
 * "TRAVEL_AIRLINES") and sometimes generic ("Payment"). Mapping them all
 * onto a fixed handful of buckets keeps the chart readable and prevents
 * the category list from sprawling as Plaid evolves its taxonomy.
 */
export function normalizeCategory(raw?: string): string {
  if (!raw) return "Payment";

  const key = raw.toLowerCase();

  if (key.includes("food") || key.includes("drink"))
    return "Food and Drink";

  if (key.includes("travel") || key.includes("airline"))
    return "Travel";

  if (key.includes("transport") || key.includes("uber"))
    return "Transportation";

  if (key.includes("transfer"))
    return "Transfer";

  if (key.includes("payment"))
    return "Payment";

  if (key.includes("bank"))
    return "Bank Fees";

  return "Payment";
}

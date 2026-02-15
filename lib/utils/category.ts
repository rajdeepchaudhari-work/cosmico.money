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

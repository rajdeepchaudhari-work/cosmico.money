export const normalizeCategory = (category?: string) => {
    if (!category) return "Payment";
  
    const map: Record<string, string> = {
      FOOD_AND_DRINK: "Food and Drink",
      TRANSPORTATION: "Travel",
      TRAVEL: "Travel",
      ENTERTAINMENT: "Entertainment",
      PAYMENT: "Payment",
      BANK_FEES: "Bank Fees",
    };
  
    return map[category] || category;
  };
  
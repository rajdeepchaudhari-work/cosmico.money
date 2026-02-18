export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "My Banks",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/coins.svg",
    route: "/rewards",
    label: "Rewards",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Transfer Funds",
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];

export const topCategoryStyles = {
  "Food and Drink": {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-700",
    },
    icon: "/icons/monitor.svg",
  },
  Travel: {
    bg: "bg-success-25",
    circleBg: "bg-success-100",
    text: {
      main: "text-success-900",
      count: "text-success-700",
    },
    progress: {
      bg: "bg-success-100",
      indicator: "bg-success-700",
    },
    icon: "/icons/coins.svg",
  },
  default: {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

export const transactionCategoryStyles = {
  "Food and Drink": {
    borderColor: "border-pink-600",
    backgroundColor: "bg-pink-500",
    textColor: "text-pink-700",
    chipBackgroundColor: "bg-inherit",
  },
  Payment: {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Bank Fees": {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  Transfer: {
    borderColor: "border-red-700",
    backgroundColor: "bg-red-700",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  Processing: {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-500",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#F2F4F7]",
  },
  Success: {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  Travel: {
    borderColor: "border-[#0047AB]",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  default: {
    borderColor: "",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
};

export const rewardCategoryStyles: Record<string, {
  bg: string;
  circleBg: string;
  text: { main: string; count: string };
  progress: { bg: string; indicator: string };
  icon: string;
}> = {
  "Food and Drink": {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: { main: "text-blue-900", count: "text-blue-700" },
    progress: { bg: "bg-blue-100", indicator: "bg-blue-700" },
    icon: "/icons/monitor.svg",
  },
  Travel: {
    bg: "bg-success-25",
    circleBg: "bg-success-100",
    text: { main: "text-success-900", count: "text-success-700" },
    progress: { bg: "bg-success-100", indicator: "bg-success-700" },
    icon: "/icons/coins.svg",
  },
  Shopping: {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: { main: "text-pink-900", count: "text-pink-700" },
    progress: { bg: "bg-pink-100", indicator: "bg-pink-700" },
    icon: "/icons/shopping-bag.svg",
  },
  default: {
    bg: "bg-green-25",
    circleBg: "bg-green-100",
    text: { main: "text-green-900", count: "text-green-700" },
    progress: { bg: "bg-green-100", indicator: "bg-green-700" },
    icon: "/icons/coins.svg",
  },
};

export const UK_MERCHANT_CHALLENGES = [
  { merchantName: "Sainsbury's", merchantMatch: "sainsbury", targetAmount: 1000, rewardAmount: 10, rewardLabel: "£10 Sainsbury's Gift Card", category: "Food and Drink" },
  { merchantName: "Tesco", merchantMatch: "tesco", targetAmount: 800, rewardAmount: 8, rewardLabel: "£8 Tesco Gift Card", category: "Food and Drink" },
  { merchantName: "Costa Coffee", merchantMatch: "costa", targetAmount: 200, rewardAmount: 5, rewardLabel: "£5 Costa Gift Card", category: "Food and Drink" },
  { merchantName: "Greggs", merchantMatch: "greggs", targetAmount: 150, rewardAmount: 5, rewardLabel: "£5 Greggs Gift Card", category: "Food and Drink" },
  { merchantName: "M&S", merchantMatch: "marks & spencer", targetAmount: 500, rewardAmount: 10, rewardLabel: "£10 M&S Gift Card", category: "Shopping" },
  { merchantName: "Boots", merchantMatch: "boots", targetAmount: 300, rewardAmount: 5, rewardLabel: "£5 Boots Gift Card", category: "Shopping" },
  { merchantName: "TfL", merchantMatch: "tfl", targetAmount: 500, rewardAmount: 10, rewardLabel: "£10 TfL Credit", category: "Travel" },
  { merchantName: "JD Sports", merchantMatch: "jd sports", targetAmount: 400, rewardAmount: 10, rewardLabel: "£10 JD Sports Gift Card", category: "Shopping" },
];

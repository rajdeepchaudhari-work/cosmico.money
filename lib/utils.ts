/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export const COUNTRY_CONFIG: Record<string, {
  currency: string; locale: string; prefix: string;
  idLabel: string; idPlaceholder: string;
  stateLabel: string; statePlaceholder: string;
  postalPlaceholder: string;
  addressPlaceholder: string;
  cityPlaceholder: string;
  plaidCode: string; transfersEnabled: boolean;
}> = {
  US: {
    currency: "USD", locale: "en-US", prefix: "$",
    idLabel: "SSN (last 4)", idPlaceholder: "e.g. 1234",
    stateLabel: "State", statePlaceholder: "e.g. NY",
    postalPlaceholder: "e.g. 10001",
    addressPlaceholder: "e.g. 123 Main St",
    cityPlaceholder: "e.g. New York",
    plaidCode: "US", transfersEnabled: true,
  },
  CA: {
    currency: "CAD", locale: "en-CA", prefix: "CA$",
    idLabel: "SIN", idPlaceholder: "e.g. 123-456-789",
    stateLabel: "Province", statePlaceholder: "e.g. ON",
    postalPlaceholder: "e.g. K1A 0A9",
    addressPlaceholder: "e.g. 123 Maple Ave",
    cityPlaceholder: "e.g. Toronto",
    plaidCode: "CA", transfersEnabled: false,
  },
  UK: {
    currency: "GBP", locale: "en-GB", prefix: "\u00a3",
    idLabel: "NI Number", idPlaceholder: "e.g. QQ 12 34 56 C",
    stateLabel: "County", statePlaceholder: "e.g. Greater London",
    postalPlaceholder: "e.g. SW1A 1AA",
    addressPlaceholder: "e.g. 10 Downing Street",
    cityPlaceholder: "e.g. London",
    plaidCode: "GB", transfersEnabled: false,
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number, country: string = "US"): string {
  const config = COUNTRY_CONFIG[country] || COUNTRY_CONFIG.US;
  const formatter = new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export const authFormSchema = (type: string) => z.object({
  // sign up only
  firstName:   type === 'sign-in' ? z.string().optional() : z.string().min(2, 'At least 2 characters'),
  lastName:    type === 'sign-in' ? z.string().optional() : z.string().min(2, 'At least 2 characters'),
  address1:    type === 'sign-in' ? z.string().optional() : z.string().min(5, 'Enter a valid address').max(50),
  city:        type === 'sign-in' ? z.string().optional() : z.string().min(2, 'Enter a valid city').max(50),
  country:     type === 'sign-in' ? z.string().optional() : z.string().min(2, 'Please select a country'),
  state:       type === 'sign-in' ? z.string().optional() : z.string().min(2, 'Required').max(50),
  postalCode:  type === 'sign-in' ? z.string().optional() : z.string().min(3, 'Enter a valid postal code').max(10),
  dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3, 'Enter your date of birth'),
  ssn:         type === 'sign-in' ? z.string().optional() : z.string().min(1, 'Required'),
  confirmPassword: type === 'sign-in' ? z.string().optional() : z.string().min(8, 'Password must be at least 8 characters'),
  agreeToTerms: type === 'sign-in'
    ? z.boolean().optional()
    : z.boolean().refine(val => val === true, { message: 'You must accept the Terms & Conditions and Privacy Policy' }),
  // both
  email:    z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
}).superRefine((data, ctx) => {
  if (type === 'sign-in') return;

  // ── Confirm password ──────────────────────────────────────
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Passwords don't match", path: ['confirmPassword'] });
  }

  const country = data.country || 'US';

  // ── Postal code ──────────────────────────────────────────
  const postalRules: Record<string, { regex: RegExp; message: string }> = {
    US: { regex: /^\d{5}(-\d{4})?$/,                                       message: 'Use format: 10001 or 10001-1234' },
    CA: { regex: /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/,                  message: 'Use format: K1A 0A9' },
    UK: { regex: /^[A-Za-z]{1,2}\d[A-Za-z\d]?[ ]?\d[A-Za-z]{2}$/,        message: 'Use format: SW1A 1AA' },
  };
  if (data.postalCode && postalRules[country] && !postalRules[country].regex.test(data.postalCode)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: postalRules[country].message, path: ['postalCode'] });
  }

  // ── ID number (SSN / SIN / NI) ───────────────────────────
  const idRules: Record<string, { regex: RegExp; message: string }> = {
    US: { regex: /^\d{4}$/,                                                        message: 'Enter last 4 digits of SSN, e.g. 1234' },
    CA: { regex: /^\d{3}-\d{3}-\d{3}$/,                                           message: 'Use format: 123-456-789' },
    UK: { regex: /^[A-Za-z]{2}[ ]?\d{2}[ ]?\d{2}[ ]?\d{2}[ ]?[A-Za-z]$/,        message: 'Use format: QQ 12 34 56 C' },
  };
  if (data.ssn && idRules[country] && !idRules[country].regex.test(data.ssn)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: idRules[country].message, path: ['ssn'] });
  }

  // ── State / Province (US & CA need 2-letter code) ────────
  const stateRules: Record<string, { regex: RegExp; message: string }> = {
    US: { regex: /^[A-Z]{2}$/, message: 'Use 2-letter state code, e.g. NY' },
    CA: { regex: /^[A-Z]{2}$/, message: 'Use 2-letter province code, e.g. ON' },
  };
  if (data.state && stateRules[country] && !stateRules[country].regex.test(data.state.toUpperCase())) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: stateRules[country].message, path: ['state'] });
  }

  // ── Date of birth ─────────────────────────────────────────
  if (data.dateOfBirth) {
    // Accept YYYY-MM-DD (native date input) or DD-MM-YYYY
    const isIso = /^\d{4}-\d{2}-\d{2}$/.test(data.dateOfBirth);
    const isDMY = /^\d{2}-\d{2}-\d{4}$/.test(data.dateOfBirth);
    if (!isIso && !isDMY) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Select a valid date of birth', path: ['dateOfBirth'] });
    } else {
      const normalized = isDMY
        ? data.dateOfBirth.split('-').reverse().join('-')
        : data.dateOfBirth;
      const dob = new Date(normalized);
      const age = new Date().getFullYear() - dob.getFullYear();
      if (isNaN(dob.getTime())) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Enter a valid date', path: ['dateOfBirth'] });
      } else if (age < 18) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'You must be at least 18 years old', path: ['dateOfBirth'] });
      } else if (age > 120) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Enter a valid date of birth', path: ['dateOfBirth'] });
      }
    }
  }
})
"use server";

const GC_BASE = process.env.GOCARDLESS_ENV === "production"
  ? "https://api.gocardless.com"
  : "https://api-sandbox.gocardless.com";

const GC_VERSION = "2015-07-06";

function gcHeaders() {
  return {
    Authorization: `Bearer ${process.env.GOCARDLESS_AUTH_TOKEN}`,
    "GoCardless-Version": GC_VERSION,
    "Content-Type": "application/json",
  };
}

async function gcPost<T = any>(path: string, body: object): Promise<T> {
  const res = await fetch(`${GC_BASE}${path}`, {
    method: "POST",
    headers: gcHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }

  return res.json();
}

// Create a GoCardless customer (UK equivalent of createDwollaCustomer)
export const createGoCardlessCustomer = async ({
  email,
  firstName,
  lastName,
  address1,
  city,
  postalCode,
}: {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  postalCode: string;
}) => {
  try {
    const data = await gcPost<{ customers: { id: string } }>("/customers", {
      customers: {
        email,
        given_name: firstName,
        family_name: lastName,
        address_line1: address1,
        city,
        postal_code: postalCode,
        country_code: "GB",
      },
    });

    return data.customers.id;
  } catch (err) {
    console.error("GoCardless createCustomer failed:", err);
  }
};

// Create a bank account + mandate + payment (UK equivalent of createTransfer)
export const createGoCardlessPayment = async ({
  gcCustomerId,
  sortCode,
  accountNumber,
  accountHolderName,
  amount,
  description,
}: {
  gcCustomerId: string;
  sortCode: string;
  accountNumber: string;
  accountHolderName: string;
  amount: string;
  description?: string;
}) => {
  try {
    // 1. Create a customer bank account (recipient's sort code + account number)
    const bankData = await gcPost<{ customer_bank_accounts: { id: string } }>(
      "/customer_bank_accounts",
      {
        customer_bank_accounts: {
          account_number: accountNumber,
          branch_code: sortCode.replace(/-/g, ""), // strip dashes → 200000
          account_holder_name: accountHolderName,
          country_code: "GB",
          links: { customer: gcCustomerId },
        },
      }
    );
    const bankAccountId = bankData.customer_bank_accounts.id;

    // 2. Create a BACS Direct Debit mandate against that bank account
    const mandateData = await gcPost<{ mandates: { id: string } }>("/mandates", {
      mandates: {
        scheme: "bacs",
        links: { customer_bank_account: bankAccountId },
      },
    });
    const mandateId = mandateData.mandates.id;

    // 3. Create the payment (GoCardless uses pence — multiply £ by 100)
    const amountInPence = Math.round(parseFloat(amount) * 100);
    const paymentData = await gcPost<{ payments: { id: string; status: string } }>(
      "/payments",
      {
        payments: {
          amount: amountInPence,
          currency: "GBP",
          description: description || "Cosmico Bank Transfer",
          links: { mandate: mandateId },
        },
      }
    );

    return {
      paymentId: paymentData.payments.id,
      status: paymentData.payments.status,
    };
  } catch (err) {
    console.error("GoCardless createPayment failed:", err);
  }
};

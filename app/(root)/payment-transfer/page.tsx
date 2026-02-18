import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import UKPaymentTransferForm from '@/components/UKPaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return null;

  const accounts = await getAccounts({ userId: loggedIn.$id });
  if (!accounts) return;

  const accountsData = accounts?.data;

  // UK users — GoCardless Direct Debit (sort code + account number)
  if (loggedIn.country === "UK") {
    return (
      <section className="payment-transfer">
        <HeaderBox
          title="Payment Transfer"
          subtext="Send money to any UK bank account using sort code and account number"
        />
        <section className="size-full pt-5">
          <UKPaymentTransferForm accounts={accountsData} user={loggedIn} />
        </section>
      </section>
    );
  }

  // Non-US, non-UK countries — not yet supported
  if (loggedIn.country && loggedIn.country !== "US") {
    return (
      <section className="payment-transfer">
        <HeaderBox
          title="Payment Transfer"
          subtext="Fund transfers are not yet available in your region."
        />
        <div className="flex flex-col items-center justify-center gap-4 pt-10">
          <p className="text-16 text-gray-600">
            Transfers are coming soon for {loggedIn.country} accounts.
          </p>
        </div>
      </section>
    );
  }

  // US users — Dwolla ACH
  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />
      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </section>
  );
}

export default Transfer
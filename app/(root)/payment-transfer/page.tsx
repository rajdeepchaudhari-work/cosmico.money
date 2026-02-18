import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import Image from 'next/image';
import React from 'react'

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return null;

  const accounts = await getAccounts({
    userId: loggedIn.$id
  })

  if(!accounts) return;

  const accountsData = accounts?.data;

  if (loggedIn.country && loggedIn.country !== "US") {
    return (
      <section className="payment-transfer">
        <HeaderBox
          title="Payment Transfer"
          subtext="Fund transfers are currently only available for US accounts."
        />
        <div className="flex flex-col items-center justify-center gap-4 pt-10">
          <Image
            src="/icons/undraw_access-denied_krem.svg"
            alt="Access Denied"
            width={300}
            height={300}
          />
          <p className="text-16 text-gray-600">
            Dwolla-powered transfers are not available in your region ({loggedIn.country}).
          </p>
        </div>
      </section>
    );
  }

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
  )
}

export default Transfer
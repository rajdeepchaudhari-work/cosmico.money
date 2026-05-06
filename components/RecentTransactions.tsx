/**
 * RecentTransactions — the dashboard panel that lists transactions
 * for the currently selected bank with a tab strip across the top.
 *
 * Tabs are driven by the same appwriteItemId prop as the rest of the
 * dashboard, so navigating between banks remains a server-driven URL
 * change rather than purely client-side state.
 */
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionSearchTable from './TransactionSearchTable'

const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  country,
}: RecentTransactionsProps) => {
  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>

      <Tabs defaultValue={appwriteItemId} className="w-full">
      <TabsList className="recent-transactions-tablist">
          {accounts.map((account: Account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <BankTabItem
                key={account.id}
                account={account}
                appwriteItemId={appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {accounts.map((account: Account) => (
          <TabsContent
            value={account.appwriteItemId}
            key={account.id}
            className="space-y-4"
          >
            <BankInfo
              account={account}
              appwriteItemId={appwriteItemId}
              type="full"
            />

            <TransactionSearchTable transactions={transactions} country={country} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

export default RecentTransactions
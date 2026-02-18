import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccounts, getAccount } from "@/lib/actions/bank.actions";
import SpendingCharts from "@/components/SpendingCharts";
import { redirect } from "next/navigation";

const Spending = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect("/sign-in");

  const accounts = await getAccounts({ userId: loggedIn.$id });

  let allTransactions: Transaction[] = [];
  if (accounts?.data?.length) {
    const results = await Promise.allSettled(
      accounts.data.map((account: Account) =>
        getAccount({ appwriteItemId: account.appwriteItemId })
      )
    );
    for (const result of results) {
      if (result.status === "fulfilled" && result.value?.transactions) {
        allTransactions.push(...result.value.transactions);
      }
    }
  }

  const country = loggedIn?.country || "UK";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "100vh",
        overflowY: "auto",
        background: "#f8fafc",
        padding: "32px 28px",
        gap: 24,
      }}
    >
      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}>Spending</h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
            A breakdown of where your money goes — across all connected accounts.
          </p>
        </div>
        <span
          style={{
            background: "rgba(252,92,58,0.08)",
            color: "#FC5C3A",
            border: "1px solid rgba(252,92,58,0.2)",
            fontSize: 11,
            fontWeight: 700,
            padding: "6px 14px",
            borderRadius: 99,
            whiteSpace: "nowrap",
            alignSelf: "center",
          }}
        >
          {allTransactions.length} transactions analysed
        </span>
      </div>

      <SpendingCharts transactions={allTransactions} country={country} />
    </div>
  );
};

export default Spending;

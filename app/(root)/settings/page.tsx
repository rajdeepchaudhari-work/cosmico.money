import { getLoggedInUser, getBanks } from "@/lib/actions/user.actions";
import { getAccounts } from "@/lib/actions/bank.actions";
import SettingsForm from "@/components/SettingsForm";
import { redirect } from "next/navigation";

const Settings = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect("/sign-in");

  const banksResult = await getBanks({ userId: loggedIn.$id });
  const banks = banksResult ?? [];

  // Enrich with account names/masks from Plaid where available
  let enrichedBanks = banks;
  try {
    const accounts = await getAccounts({ userId: loggedIn.$id });
    if (accounts?.data?.length) {
      enrichedBanks = banks.map((bank: any) => {
        // account.appwriteItemId points back to the bank document's $id
        const match = accounts.data.find(
          (a: any) => a.appwriteItemId === bank.$id
        );
        return match
          ? {
              ...bank,
              officialName: match.officialName ?? match.name,
              mask: match.mask,
              name: match.name,
            }
          : bank;
      });
    }
  } catch {
    // Non-fatal — use unenriched banks
  }

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
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}>Settings</h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
          Manage your profile, address, tax residency and connected banks.
        </p>
      </div>

      <SettingsForm user={loggedIn} banks={enrichedBanks} />
    </div>
  );
};

export default Settings;

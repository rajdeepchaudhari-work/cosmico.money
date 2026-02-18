import RewardCard from "@/components/RewardCard";
import { getAccounts, getAccount } from "@/lib/actions/bank.actions";
import { getRewards, seedAIRewards } from "@/lib/actions/reward.actions";
import { calculateRewardProgress } from "@/lib/utils/rewards";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Rewards = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return null;

  const accounts = await getAccounts({ userId: loggedIn.$id });

  // Fetch transactions FIRST — the AI engine needs them to personalise challenges
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

  // Auto-seed AI-generated rewards if this user has none yet
  let rewards = await getRewards(loggedIn.$id);
  if (rewards.length === 0) {
    await seedAIRewards(allTransactions, loggedIn.$id);
    rewards = await getRewards(loggedIn.$id);
  }

  const rewardsWithProgress = calculateRewardProgress(rewards, allTransactions);

  const activeRewards = rewardsWithProgress.filter((r) => !r.isCompleted);
  const completedRewards = rewardsWithProgress.filter((r) => r.isCompleted);
  const totalRewardValue = rewardsWithProgress.reduce((sum, r) => sum + r.rewardAmount, 0);

  const country = loggedIn?.country || "UK";

  return (
    <div className="rewards">

      {/* Quest Board Header */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 16,
          padding: "24px 24px 20px",
          border: "1px solid #e8ecf0",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        {/* AI Badge */}
        <span
          style={{
            background: "rgba(252,92,58,0.08)",
            color: "#FC5C3A",
            border: "1px solid rgba(252,92,58,0.2)",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: 99,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            letterSpacing: "0.04em",
            marginBottom: 12,
          }}
        >
          ✦ Powered by Cosmico AI
        </span>

        {/* Title + subtitle */}
        <h1 style={{ color: "#111827", fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>
          Quest Board
        </h1>
        <p style={{ color: "#6b7280", fontSize: 14, marginTop: 6, marginBottom: 20 }}>
          Complete spending challenges at your favourite merchants to unlock rewards.
        </p>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[
            { label: "Active Quests", value: activeRewards.length, color: "#368DFF", bg: "rgba(54,141,255,0.07)", border: "rgba(54,141,255,0.15)" },
            { label: "Completed", value: completedRewards.length, color: "#059669", bg: "rgba(5,150,105,0.07)", border: "rgba(5,150,105,0.15)" },
            { label: "Total Prizes", value: `£${totalRewardValue}`, color: "#FC5C3A", bg: "rgba(252,92,58,0.07)", border: "rgba(252,92,58,0.15)" },
          ].map(({ label, value, color, bg, border }) => (
            <div
              key={label}
              style={{
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: 12,
                padding: "12px 10px",
                textAlign: "center",
              }}
            >
              <div style={{ color, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{value}</div>
              <div style={{ color: "#9ca3af", fontSize: 11, marginTop: 4, fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Quests */}
      {activeRewards.length > 0 && (
        <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🎯</span>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>Active Quests</h2>
            <span
              style={{
                background: "rgba(54,141,255,0.1)",
                color: "#368DFF",
                border: "1px solid rgba(54,141,255,0.2)",
                fontSize: 11,
                fontWeight: 700,
                padding: "2px 10px",
                borderRadius: 99,
              }}
            >
              {activeRewards.length}
            </span>
          </div>
          <div className="rewards-grid">
            {activeRewards.map((reward) => (
              <RewardCard key={reward.$id} reward={reward} country={country} />
            ))}
          </div>
        </section>
      )}

      {/* Completed */}
      {completedRewards.length > 0 && (
        <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🏆</span>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>Completed</h2>
            <span
              style={{
                background: "rgba(250,204,21,0.1)",
                color: "#d97706",
                border: "1px solid rgba(250,204,21,0.25)",
                fontSize: 11,
                fontWeight: 700,
                padding: "2px 10px",
                borderRadius: 99,
              }}
            >
              {completedRewards.length}
            </span>
          </div>
          <div className="rewards-grid">
            {completedRewards.map((reward) => (
              <RewardCard key={reward.$id} reward={reward} country={country} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {activeRewards.length === 0 && completedRewards.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "48px 24px",
            color: "#94a3b8",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎮</div>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#475569" }}>No quests yet</p>
          <p style={{ fontSize: 14, marginTop: 4 }}>Connect a bank account to unlock AI-generated challenges.</p>
        </div>
      )}

    </div>
  );
};

export default Rewards;

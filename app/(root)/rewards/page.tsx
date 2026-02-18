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

      {/* Quest Board Hero Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          borderRadius: 20,
          padding: "28px 28px 24px",
          border: "1px solid rgba(99,102,241,0.2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid decoration */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />

        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: 80,
            width: 120,
            height: 120,
            background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* AI Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                background: "rgba(99,102,241,0.2)",
                color: "#a5b4fc",
                border: "1px solid rgba(99,102,241,0.4)",
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: 99,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                letterSpacing: "0.04em",
              }}
            >
              ✦ Powered by Cosmico AI
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 style={{ color: "#f8fafc", fontSize: 28, fontWeight: 800, lineHeight: 1.1 }}>
              Quest Board
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 6 }}>
              Complete spending challenges at your favourite merchants to unlock rewards.
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 4 }}>
            {[
              { label: "Active Quests", value: activeRewards.length, color: "#818cf8" },
              { label: "Completed", value: completedRewards.length, color: "#4ade80" },
              { label: "Total Prizes", value: `£${totalRewardValue}`, color: "#fbbf24" },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  padding: "14px 12px",
                  textAlign: "center",
                }}
              >
                <div style={{ color, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{value}</div>
                <div style={{ color: "#64748b", fontSize: 11, marginTop: 4, fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>
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
                background: "rgba(99,102,241,0.1)",
                color: "#6366f1",
                border: "1px solid rgba(99,102,241,0.2)",
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

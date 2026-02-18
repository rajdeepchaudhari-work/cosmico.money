import { formatAmount } from "@/lib/utils";
import MerchantLogo from "./MerchantLogo";

// Per-category game colour themes
const CATEGORY_THEME: Record<string, {
  bg: string;
  stripe: string;
  accent: string;
  accentSoft: string;
  border: string;
  label: string;
  labelText: string;
  glow: string;
}> = {
  "Food and Drink": {
    bg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
    stripe: "linear-gradient(90deg, #6366f1, #818cf8)",
    accent: "#6366f1",
    accentSoft: "rgba(99,102,241,0.15)",
    border: "rgba(99,102,241,0.3)",
    label: "rgba(99,102,241,0.2)",
    labelText: "#a5b4fc",
    glow: "0 0 10px rgba(99,102,241,0.7)",
  },
  Travel: {
    bg: "linear-gradient(135deg, #052e16 0%, #134e4a 100%)",
    stripe: "linear-gradient(90deg, #10b981, #34d399)",
    accent: "#10b981",
    accentSoft: "rgba(16,185,129,0.15)",
    border: "rgba(16,185,129,0.3)",
    label: "rgba(16,185,129,0.2)",
    labelText: "#6ee7b7",
    glow: "0 0 10px rgba(16,185,129,0.7)",
  },
  Shopping: {
    bg: "linear-gradient(135deg, #1f0011 0%, #3b0764 100%)",
    stripe: "linear-gradient(90deg, #ec4899, #a855f7)",
    accent: "#ec4899",
    accentSoft: "rgba(236,72,153,0.15)",
    border: "rgba(236,72,153,0.3)",
    label: "rgba(236,72,153,0.2)",
    labelText: "#f9a8d4",
    glow: "0 0 10px rgba(236,72,153,0.7)",
  },
  default: {
    bg: "linear-gradient(135deg, #1c0f00 0%, #2d1a00 100%)",
    stripe: "linear-gradient(90deg, #f97316, #fbbf24)",
    accent: "#f97316",
    accentSoft: "rgba(249,115,22,0.15)",
    border: "rgba(249,115,22,0.3)",
    label: "rgba(249,115,22,0.2)",
    labelText: "#fed7aa",
    glow: "0 0 10px rgba(249,115,22,0.7)",
  },
};

const RewardCard = ({ reward, country = "UK" }: RewardCardProps) => {
  const theme =
    CATEGORY_THEME[reward.category] ?? CATEGORY_THEME.default;

  return (
    <div
      style={{
        background: theme.bg,
        border: `1px solid ${theme.border}`,
        borderRadius: 20,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        position: "relative",
      }}
    >
      {/* Glowing top stripe */}
      <div style={{ background: theme.stripe, height: 3 }} />

      <div style={{ padding: "18px 18px 20px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Top row: category badge + status */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              background: theme.label,
              color: theme.labelText,
              border: `1px solid ${theme.border}`,
              fontSize: 10,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 99,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {reward.category}
          </span>

          {reward.isCompleted ? (
            <span
              style={{
                background: "rgba(250,204,21,0.15)",
                color: "#fbbf24",
                border: "1px solid rgba(250,204,21,0.3)",
                fontSize: 10,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 99,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              🏆 Completed
            </span>
          ) : (
            <span
              style={{
                background: "rgba(74,222,128,0.1)",
                color: "#4ade80",
                border: "1px solid rgba(74,222,128,0.2)",
                fontSize: 10,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 99,
              }}
            >
              ● Active
            </span>
          )}
        </div>

        {/* Merchant row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <MerchantLogo name={reward.merchantName} size={46} />
          <div>
            <h3 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
              {reward.merchantName}
            </h3>
            <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>
              {reward.rewardLabel}
            </p>
          </div>
        </div>

        {/* XP Progress bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#64748b", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Progress
            </span>
            <span style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 700 }}>
              {reward.progressPercent}%
            </span>
          </div>

          {/* Track */}
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div
              style={{
                width: `${reward.progressPercent}%`,
                background: theme.stripe,
                borderRadius: 99,
                height: "100%",
                boxShadow: reward.progressPercent > 0 ? theme.glow : "none",
                transition: "width 0.6s ease",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b", fontSize: 11 }}>
              {formatAmount(reward.currentAmount, country)} spent
            </span>
            <span style={{ color: "#64748b", fontSize: 11 }}>
              {formatAmount(reward.targetAmount, country)} target
            </span>
          </div>
        </div>

        {/* Reward prize box */}
        <div
          style={{
            background: reward.isCompleted
              ? "rgba(250,204,21,0.1)"
              : theme.accentSoft,
            border: `1px solid ${reward.isCompleted ? "rgba(250,204,21,0.25)" : theme.border}`,
            borderRadius: 12,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "#64748b", fontSize: 12 }}>
            {reward.isCompleted ? "Reward earned" : "Unlock reward"}
          </span>
          <span
            style={{
              color: reward.isCompleted ? "#fbbf24" : theme.labelText,
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            {reward.isCompleted ? "🎁" : "🔒"} {reward.rewardLabel}
          </span>
        </div>

      </div>
    </div>
  );
};

export default RewardCard;

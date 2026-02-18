import { formatAmount } from "@/lib/utils";
import MerchantLogo from "./MerchantLogo";

// Per-category accents using the Cosmico brand palette
const CATEGORY_THEME: Record<string, {
  stripe: string;
  badge: string;
  badgeText: string;
  bar: string;
  prizeBox: string;
  prizeBoxBorder: string;
  prizeText: string;
}> = {
  "Food and Drink": {
    stripe: "linear-gradient(90deg, #FC5C3A, #ff7958)",
    badge: "rgba(252,92,58,0.1)",
    badgeText: "#FC5C3A",
    bar: "linear-gradient(90deg, #FC5C3A, #ff7958)",
    prizeBox: "rgba(252,92,58,0.06)",
    prizeBoxBorder: "rgba(252,92,58,0.2)",
    prizeText: "#FC5C3A",
  },
  Travel: {
    stripe: "linear-gradient(90deg, #368DFF, #60a5fa)",
    badge: "rgba(54,141,255,0.1)",
    badgeText: "#368DFF",
    bar: "linear-gradient(90deg, #368DFF, #60a5fa)",
    prizeBox: "rgba(54,141,255,0.06)",
    prizeBoxBorder: "rgba(54,141,255,0.2)",
    prizeText: "#368DFF",
  },
  Shopping: {
    stripe: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
    badge: "rgba(139,92,246,0.1)",
    badgeText: "#7c3aed",
    bar: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
    prizeBox: "rgba(139,92,246,0.06)",
    prizeBoxBorder: "rgba(139,92,246,0.2)",
    prizeText: "#7c3aed",
  },
  default: {
    stripe: "linear-gradient(90deg, #10b981, #34d399)",
    badge: "rgba(16,185,129,0.1)",
    badgeText: "#059669",
    bar: "linear-gradient(90deg, #10b981, #34d399)",
    prizeBox: "rgba(16,185,129,0.06)",
    prizeBoxBorder: "rgba(16,185,129,0.2)",
    prizeText: "#059669",
  },
};

const RewardCard = ({ reward, country = "UK" }: RewardCardProps) => {
  const theme = CATEGORY_THEME[reward.category] ?? CATEGORY_THEME.default;

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e8ecf0",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Category colour stripe */}
      <div style={{ background: theme.stripe, height: 4 }} />

      <div style={{ padding: "16px 16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Top row: category + status */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              background: theme.badge,
              color: theme.badgeText,
              fontSize: 10,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 99,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {reward.category}
          </span>

          {reward.isCompleted ? (
            <span
              style={{
                background: "rgba(5,150,105,0.08)",
                color: "#059669",
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
                background: "rgba(107,114,128,0.08)",
                color: "#6b7280",
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
          <MerchantLogo name={reward.merchantName} size={44} />
          <div>
            <h3 style={{ color: "#111827", fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
              {reward.merchantName}
            </h3>
            <p style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>
              {reward.rewardLabel}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#9ca3af", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Progress
            </span>
            <span style={{ color: "#374151", fontSize: 13, fontWeight: 700 }}>
              {reward.progressPercent}%
            </span>
          </div>

          {/* XP bar */}
          <div style={{ background: "#f1f5f9", borderRadius: 99, height: 7, overflow: "hidden" }}>
            <div
              style={{
                width: `${reward.progressPercent}%`,
                background: reward.isCompleted
                  ? "linear-gradient(90deg, #059669, #34d399)"
                  : theme.bar,
                borderRadius: 99,
                height: "100%",
                transition: "width 0.6s ease",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#9ca3af", fontSize: 11 }}>
              {formatAmount(reward.currentAmount, country)} spent
            </span>
            <span style={{ color: "#9ca3af", fontSize: 11 }}>
              {formatAmount(reward.targetAmount, country)} target
            </span>
          </div>
        </div>

        {/* Prize box */}
        <div
          style={{
            background: reward.isCompleted ? "rgba(5,150,105,0.06)" : theme.prizeBox,
            border: `1px solid ${reward.isCompleted ? "rgba(5,150,105,0.2)" : theme.prizeBoxBorder}`,
            borderRadius: 10,
            padding: "9px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "#9ca3af", fontSize: 11, fontWeight: 500 }}>
            {reward.isCompleted ? "Reward earned" : "Unlock reward"}
          </span>
          <span
            style={{
              color: reward.isCompleted ? "#059669" : theme.prizeText,
              fontSize: 12,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 4,
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

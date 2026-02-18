"use client";

import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { formatAmount } from "@/lib/utils";

ChartJS.register(
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, Filler
);

// ─── Brand colours ────────────────────────────────────────────────────────────
const PALETTE = [
  "#FC5C3A", "#368DFF", "#8b5cf6", "#10b981",
  "#f59e0b", "#ec4899", "#06b6d4", "#84cc16",
];

const CATEGORY_ICONS: Record<string, string> = {
  "Food and Drink": "🍔",
  "Travel": "✈️",
  "Shopping": "🛍️",
  "Recreation": "🎮",
  "Healthcare": "💊",
  "Transfer": "🔄",
  "Payment": "💳",
  "Service": "⚙️",
  "Community": "🏘️",
  "Other": "📦",
};

type Period = "1M" | "3M" | "6M" | "1Y";

const PERIODS: { label: string; value: Period }[] = [
  { label: "1 Month",  value: "1M" },
  { label: "3 Months", value: "3M" },
  { label: "6 Months", value: "6M" },
  { label: "1 Year",   value: "1Y" },
];

function monthsBack(n: number) {
  const d = new Date();
  d.setMonth(d.getMonth() - n + 1);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function periodStart(p: Period) {
  if (p === "1M") return monthsBack(1);
  if (p === "3M") return monthsBack(3);
  if (p === "6M") return monthsBack(6);
  return monthsBack(12);
}

function monthLabel(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-GB", { month: "short", year: "2-digit" });
}

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({
  icon, label, value, sub, color,
}: { icon: string; label: string; value: string; sub?: string; color: string }) => (
  <div style={{
    background: "#fff",
    border: "1px solid #e8ecf0",
    borderRadius: 14,
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{
        background: `${color}18`,
        borderRadius: 8, width: 32, height: 32,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16,
      }}>{icon}</span>
      <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>{label}</span>
    </div>
    <p style={{ fontSize: 22, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{value}</p>
    {sub && <p style={{ fontSize: 11, color: "#9ca3af" }}>{sub}</p>}
  </div>
);

// ─── Chart card wrapper ───────────────────────────────────────────────────────
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{
    background: "#fff",
    border: "1px solid #e8ecf0",
    borderRadius: 16,
    overflow: "hidden",
  }}>
    <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", background: "#fafbfc" }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>{title}</h3>
    </div>
    <div style={{ padding: 20 }}>{children}</div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export default function SpendingCharts({
  transactions,
  country = "UK",
}: {
  transactions: Transaction[];
  country?: string;
}) {
  const [period, setPeriod] = useState<Period>("1M");

  // Filter to debit transactions within the selected period
  const filtered = useMemo(() => {
    const start = periodStart(period);
    return transactions.filter(
      (t) => t.amount > 0 && new Date(t.date) >= start
    );
  }, [transactions, period]);

  // ── Category breakdown ───────────────────────────────────────────────────
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    for (const t of filtered) {
      const cat = t.category || "Other";
      map[cat] = (map[cat] || 0) + t.amount;
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  // ── Monthly spend bars ───────────────────────────────────────────────────
  const monthlyData = useMemo(() => {
    const map: Record<string, number> = {};
    const n = period === "1M" ? 1 : period === "3M" ? 3 : period === "6M" ? 6 : 12;
    // pre-fill months so empty months still show
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = d.toLocaleString("en-GB", { month: "short", year: "2-digit" });
      map[key] = 0;
    }
    for (const t of filtered) {
      const key = monthLabel(t.date);
      if (key in map) map[key] = (map[key] || 0) + t.amount;
    }
    return map;
  }, [filtered, period]);

  // ── Top merchants ────────────────────────────────────────────────────────
  const topMerchants = useMemo(() => {
    const map: Record<string, number> = {};
    for (const t of filtered) {
      if (t.name) map[t.name] = (map[t.name] || 0) + t.amount;
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [filtered]);

  // ── Daily spend line (current period) ────────────────────────────────────
  const dailyData = useMemo(() => {
    const map: Record<string, number> = {};
    for (const t of filtered) {
      const key = new Date(t.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
      map[key] = (map[key] || 0) + t.amount;
    }
    return map;
  }, [filtered]);

  // ── Stats ────────────────────────────────────────────────────────────────
  const totalSpend = filtered.reduce((s, t) => s + t.amount, 0);
  const avgPerDay = filtered.length
    ? totalSpend / (period === "1M" ? 30 : period === "3M" ? 90 : period === "6M" ? 180 : 365)
    : 0;
  const biggest = filtered.length
    ? filtered.reduce((max, t) => (t.amount > max.amount ? t : max), filtered[0])
    : null;
  const topCategory = categoryData[0]?.[0] ?? "—";

  const noData = filtered.length === 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Period selector */}
      <div style={{ display: "flex", gap: 8 }}>
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            style={{
              background: period === p.value
                ? "linear-gradient(135deg,#FC5C3A,#ff7958)"
                : "#ffffff",
              color: period === p.value ? "#ffffff" : "#6b7280",
              border: period === p.value ? "none" : "1px solid #e2e8f0",
              borderRadius: 10,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {noData ? (
        <div style={{
          background: "#fff", border: "1px solid #e8ecf0", borderRadius: 16,
          padding: "48px 24px", textAlign: "center",
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#475569" }}>No spending data yet</p>
          <p style={{ fontSize: 14, color: "#9ca3af", marginTop: 4 }}>
            Connect a bank account to see your spending breakdown.
          </p>
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 }}>
            <StatCard icon="💸" label="Total Spent" value={formatAmount(totalSpend, country)} color="#FC5C3A" />
            <StatCard icon="📅" label="Daily Average" value={formatAmount(avgPerDay, country)} sub="per day" color="#368DFF" />
            <StatCard
              icon="🏆"
              label="Biggest Purchase"
              value={biggest ? formatAmount(biggest.amount, country) : "—"}
              sub={biggest?.name?.slice(0, 22)}
              color="#8b5cf6"
            />
            <StatCard icon="📂" label="Top Category" value={topCategory} sub={`${categoryData.length} categories`} color="#10b981" />
          </div>

          {/* Row: Donut + Top Merchants */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Donut */}
            <Card title="Spending by Category">
              <div style={{ maxWidth: 240, margin: "0 auto" }}>
                <Doughnut
                  data={{
                    labels: categoryData.map(([k]) => k),
                    datasets: [{
                      data: categoryData.map(([, v]) => Math.round(v)),
                      backgroundColor: PALETTE.slice(0, categoryData.length),
                      borderWidth: 2,
                      borderColor: "#fff",
                      hoverOffset: 6,
                    }],
                  }}
                  options={{
                    cutout: "65%",
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (ctx) =>
                            ` ${ctx.label}: ${formatAmount(ctx.parsed, country)}`,
                        },
                      },
                    },
                  }}
                />
              </div>
              {/* Legend */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                {categoryData.slice(0, 6).map(([cat, amt], i) => (
                  <div key={cat} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: PALETTE[i] }} />
                      <span style={{ fontSize: 12, color: "#374151" }}>
                        {CATEGORY_ICONS[cat] ?? "📦"} {cat}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
                      {formatAmount(amt, country)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Merchants */}
            <Card title="Top Merchants">
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {topMerchants.map(([name, amt], i) => {
                  const pct = Math.round((amt / (topMerchants[0]?.[1] || 1)) * 100);
                  return (
                    <div key={name}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: "#374151", fontWeight: 600, maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {name}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
                          {formatAmount(amt, country)}
                        </span>
                      </div>
                      <div style={{ background: "#f1f5f9", borderRadius: 99, height: 5, overflow: "hidden" }}>
                        <div style={{
                          width: `${pct}%`,
                          background: i === 0
                            ? "linear-gradient(90deg,#FC5C3A,#ff7958)"
                            : `${PALETTE[i % PALETTE.length]}88`,
                          borderRadius: 99,
                          height: "100%",
                          transition: "width 0.6s ease",
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Monthly bar chart */}
          <Card title="Monthly Spending">
            <Bar
              data={{
                labels: Object.keys(monthlyData),
                datasets: [{
                  label: "Spent",
                  data: Object.values(monthlyData),
                  backgroundColor: Object.keys(monthlyData).map((_, i, arr) =>
                    i === arr.length - 1 ? "#FC5C3A" : "rgba(54,141,255,0.55)"
                  ),
                  borderRadius: 8,
                  borderSkipped: false,
                }],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (ctx) => ` ${formatAmount(ctx.parsed.y, country)}`,
                    },
                  },
                },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { size: 12 } } },
                  y: {
                    grid: { color: "#f1f5f9" },
                    ticks: {
                      font: { size: 11 },
                      callback: (v) => `£${(+v).toLocaleString()}`,
                    },
                  },
                },
              }}
            />
          </Card>

          {/* Daily spend line (hide if only 1 month with few days) */}
          {Object.keys(dailyData).length > 2 && (
            <Card title="Daily Spending Pattern">
              <Line
                data={{
                  labels: Object.keys(dailyData),
                  datasets: [{
                    label: "Daily spend",
                    data: Object.values(dailyData),
                    borderColor: "#FC5C3A",
                    backgroundColor: "rgba(252,92,58,0.08)",
                    borderWidth: 2,
                    pointRadius: 3,
                    pointBackgroundColor: "#FC5C3A",
                    tension: 0.35,
                    fill: true,
                  }],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (ctx) => ` ${formatAmount(ctx.parsed.y, country)}`,
                      },
                    },
                  },
                  scales: {
                    x: { grid: { display: false }, ticks: { font: { size: 10 }, maxTicksLimit: 10 } },
                    y: {
                      grid: { color: "#f1f5f9" },
                      ticks: { font: { size: 11 }, callback: (v) => `£${v}` },
                    },
                  },
                }}
              />
            </Card>
          )}
        </>
      )}
    </div>
  );
}

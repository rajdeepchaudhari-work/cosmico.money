"use client";

export default function SentryTestPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Sentry Test Page</h1>
      <p style={{ color: "#64748b" }}>
        Click the button below to throw a test error and verify Sentry is
        capturing it.
      </p>
      <button
        onClick={() => {
          throw new Error("Cosmico Bank — Sentry test error from browser");
        }}
        style={{
          background: "linear-gradient(135deg, #FC5C3A, #ff7958)",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "12px 24px",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Throw test error
      </button>
    </div>
  );
}

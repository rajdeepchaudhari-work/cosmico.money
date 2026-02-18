"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { chatWithAssistant, ChatMessage } from "@/lib/actions/ai.actions";

const SUGGESTIONS = [
  { icon: "💳", label: "Analyse my spending", prompt: "Can you analyse my spending habits and tell me where I spend the most?" },
  { icon: "🎯", label: "Explain rewards", prompt: "How does the rewards system work and how can I earn more?" },
  { icon: "💸", label: "Saving tips", prompt: "Based on my spending, what are some practical tips to save money?" },
  { icon: "🏦", label: "About Cosmico", prompt: "What features does Cosmico offer?" },
  { icon: "📊", label: "Top merchants", prompt: "Which merchants do I spend the most money at?" },
  { icon: "🔄", label: "Transfer money", prompt: "How do I transfer money between accounts on Cosmico?" },
];

const INITIAL: ChatMessage = {
  role: "assistant",
  content: "Hi! I'm Cosmico AI 👋\n\nI can help you understand your spending, explore Cosmico features, or give you personalised financial insights. What would you like to know?",
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: ChatMessage = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    const reply = await chatWithAssistant(next);
    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const showWelcome = messages.length === 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#f8fafc",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e8ecf0",
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, #FC5C3A 0%, #ff7958 100%)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Image src="/icons/logo.svg" width={22} height={22} alt="Cosmico AI" />
        </div>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>
            Cosmico AI
          </h1>
          <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 1 }}>
            Your personal banking assistant
          </p>
        </div>
        <span
          style={{
            marginLeft: "auto",
            background: "rgba(252,92,58,0.08)",
            color: "#FC5C3A",
            border: "1px solid rgba(252,92,58,0.2)",
            fontSize: 10,
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: 99,
            letterSpacing: "0.04em",
          }}
        >
          ✦ Powered by GPT-4o-mini
        </span>
      </div>

      {/* Messages area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: 760,
          width: "100%",
          margin: "0 auto",
          alignSelf: "stretch",
          boxSizing: "border-box",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              flexDirection: m.role === "user" ? "row-reverse" : "row",
              alignItems: "flex-end",
            }}
          >
            {/* Avatar */}
            {m.role === "assistant" ? (
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg, #FC5C3A, #ff7958)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Image src="/icons/logo.svg" width={16} height={16} alt="" />
              </div>
            ) : (
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "#e2e8f0",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 14,
                }}
              >
                👤
              </div>
            )}

            {/* Bubble */}
            <div
              style={{
                maxWidth: "72%",
                background:
                  m.role === "user"
                    ? "linear-gradient(135deg, #FC5C3A, #ff7958)"
                    : "#ffffff",
                color: m.role === "user" ? "#ffffff" : "#1e293b",
                borderRadius:
                  m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                padding: "12px 16px",
                fontSize: 14,
                lineHeight: 1.6,
                boxShadow:
                  m.role === "assistant" ? "0 1px 4px rgba(0,0,0,0.07)" : "none",
                border: m.role === "assistant" ? "1px solid #f1f5f9" : "none",
                whiteSpace: "pre-wrap",
              }}
            >
              {m.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
            <div
              style={{
                width: 32,
                height: 32,
                background: "linear-gradient(135deg, #FC5C3A, #ff7958)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Image src="/icons/logo.svg" width={16} height={16} alt="" />
            </div>
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #f1f5f9",
                borderRadius: "18px 18px 18px 4px",
                padding: "14px 18px",
                display: "flex",
                gap: 5,
                alignItems: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#cbd5e1",
                    display: "inline-block",
                    animation: `apBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Suggestion cards — only on welcome screen */}
        {showWelcome && !loading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 10,
              marginTop: 8,
            }}
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                onClick={() => send(s.prompt)}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e8ecf0",
                  borderRadius: 14,
                  padding: "14px 16px",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(252,92,58,0.4)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#e8ecf0")
                }
              >
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div
        style={{
          background: "#ffffff",
          borderTop: "1px solid #e8ecf0",
          padding: "16px 24px 20px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            display: "flex",
            gap: 10,
            alignItems: "flex-end",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Cosmico AI anything about your finances..."
            rows={1}
            style={{
              flex: 1,
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: "12px 16px",
              fontSize: 14,
              outline: "none",
              color: "#1e293b",
              resize: "none",
              lineHeight: 1.5,
              maxHeight: 120,
              overflowY: "auto",
              fontFamily: "inherit",
            }}
            onInput={(e) => {
              const t = e.currentTarget;
              t.style.height = "auto";
              t.style.height = `${Math.min(t.scrollHeight, 120)}px`;
            }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            style={{
              background:
                !input.trim() || loading
                  ? "#e2e8f0"
                  : "linear-gradient(135deg, #FC5C3A, #ff7958)",
              color: !input.trim() || loading ? "#94a3b8" : "#ffffff",
              border: "none",
              borderRadius: 12,
              width: 44,
              height: 44,
              cursor: !input.trim() || loading ? "default" : "pointer",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
          >
            ↑
          </button>
        </div>
        <p style={{ textAlign: "center", color: "#d1d5db", fontSize: 11, marginTop: 10 }}>
          Cosmico AI · Sandbox demo for educational purposes · Shift+Enter for new line
        </p>
      </div>

      <style>{`
        @keyframes apBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

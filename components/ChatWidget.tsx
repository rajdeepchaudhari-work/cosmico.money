"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { chatWithAssistant, ChatMessage } from "@/lib/actions/ai.actions";

const SUGGESTIONS = [
  "What can Cosmico do?",
  "Analyse my spending",
  "How do rewards work?",
  "How do I transfer money?",
];

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm Cosmico AI 👋 I can help you understand your account, analyse your spending, or answer any banking questions. What would you like to know?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

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
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 84,
            right: 16,
            width: "min(360px, calc(100vw - 32px))",
            maxHeight: "min(520px, 70vh)",
            background: "#ffffff",
            borderRadius: 20,
            boxShadow: "0 12px 48px rgba(0,0,0,0.16)",
            border: "1px solid #e8ecf0",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #FC5C3A 0%, #ff7958 100%)",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.25)",
                borderRadius: 10,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Image src="/icons/logo.svg" width={18} height={18} alt="Cosmico" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Cosmico AI</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>
                Your personal banking assistant
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                color: "rgba(255,255,255,0.8)",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: 8,
                width: 28,
                height: 28,
                cursor: "pointer",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 14px 6px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {m.role === "assistant" && (
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 8,
                      background: "linear-gradient(135deg, #FC5C3A, #ff7958)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginRight: 8,
                      alignSelf: "flex-end",
                    }}
                  >
                    <Image src="/icons/logo.svg" width={13} height={13} alt="" />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "78%",
                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg, #FC5C3A, #ff7958)"
                        : "#f1f5f9",
                    color: m.role === "user" ? "#fff" : "#1e293b",
                    borderRadius:
                      m.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    padding: "10px 13px",
                    fontSize: 13,
                    lineHeight: 1.55,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 8,
                    background: "linear-gradient(135deg, #FC5C3A, #ff7958)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Image src="/icons/logo.svg" width={13} height={13} alt="" />
                </div>
                <div
                  style={{
                    background: "#f1f5f9",
                    borderRadius: "16px 16px 16px 4px",
                    padding: "10px 14px",
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#94a3b8",
                        display: "inline-block",
                        animation: `cwBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions — only on first load */}
          {messages.length === 1 && !loading && (
            <div
              style={{
                padding: "6px 14px 10px",
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
              }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{
                    background: "rgba(252,92,58,0.07)",
                    color: "#FC5C3A",
                    border: "1px solid rgba(252,92,58,0.18)",
                    borderRadius: 99,
                    padding: "5px 11px",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: "10px 12px 12px",
              borderTop: "1px solid #f1f5f9",
              display: "flex",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Ask Cosmico AI..."
              style={{
                flex: 1,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                padding: "9px 12px",
                fontSize: 13,
                outline: "none",
                color: "#1e293b",
                minWidth: 0,
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
                color: !input.trim() || loading ? "#94a3b8" : "#fff",
                border: "none",
                borderRadius: 10,
                width: 38,
                height: 38,
                cursor: !input.trim() || loading ? "default" : "pointer",
                fontSize: 18,
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

          <style>{`
            @keyframes cwBounce {
              0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
              40% { transform: translateY(-5px); opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        title="Cosmico AI Assistant"
        style={{
          position: "fixed",
          bottom: 24,
          right: 16,
          width: 52,
          height: 52,
          background: open
            ? "#374151"
            : "linear-gradient(135deg, #FC5C3A 0%, #ff7958 100%)",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          boxShadow: open
            ? "0 4px 16px rgba(0,0,0,0.2)"
            : "0 4px 20px rgba(252,92,58,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          transition: "background 0.2s, box-shadow 0.2s",
        }}
      >
        {open ? (
          <span style={{ color: "#fff", fontSize: 18, lineHeight: 1 }}>✕</span>
        ) : (
          <Image src="/icons/logo.svg" width={26} height={26} alt="Cosmico AI" />
        )}
      </button>
    </>
  );
}

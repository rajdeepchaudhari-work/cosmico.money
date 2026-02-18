"use client";

import { useState, useEffect } from "react";

const PHRASES = [
  "thinks for you",
  "works for you",
  "grows with you",
  "saves for you",
  "fights for you",
  "earns for you",
];

export default function AnimatedTagline() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIndex];

    if (!isDeleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      return () => clearTimeout(t);
    }

    if (!isDeleting && displayed.length === current.length) {
      const t = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
    }
  }, [displayed, isDeleting, phraseIndex]);

  return (
    <span
      style={{
        background: "linear-gradient(135deg, #FC5C3A 0%, #368DFF 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {displayed}
      <span style={{ WebkitTextFillColor: "#FC5C3A" }} className="animate-pulse">
        |
      </span>
    </span>
  );
}

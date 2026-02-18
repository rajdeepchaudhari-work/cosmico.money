"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const TAGLINES = [
  "Teaching our AI the difference between Greggs and fine dining...",
  "Counting your lattes so you don't have to...",
  "Analysing whether that £4.50 coffee was worth it (it wasn't)...",
  "Finding the merchants you're secretly loyal to...",
  "Asking GPT if you really needed that ASOS haul...",
  "Calculating how many Pret sandwiches until you earn a free one...",
  "Converting your Uber Eats receipts into actionable insights...",
  "Brewing personalised challenges… like a good flat white...",
  "Our AI is judging your spending. Lovingly, of course...",
  "Negotiating with Tesco on your behalf. They said no...",
  "Training on British spending habits. Results may vary...",
  "Checking if TfL counts as a personality trait...",
  "Summoning the spending oracle. Please hold...",
];

export default function RewardsLoading() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % TAGLINES.length);
        setFade(true);
      }, 300);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-6">
      {/* Logo + name */}
      <div className="flex items-center gap-2">
        <Image src="/icons/logo.svg" width={32} height={32} alt="Cosmico" />
        <span className="text-20 font-ibm-plex-serif font-bold text-black-1">
          Cosmico
        </span>
      </div>

      {/* Animated dots */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-2.5 rounded-full bg-bankGradient"
              style={{
                animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        <p className="text-16 font-semibold text-gray-900">
          Cosmico AI is personalising your rewards
        </p>
      </div>

      {/* Rotating tagline */}
      <p
        className="text-14 text-gray-500 text-center max-w-sm transition-opacity duration-300"
        style={{ opacity: fade ? 1 : 0 }}
      >
        {TAGLINES[index]}
      </p>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

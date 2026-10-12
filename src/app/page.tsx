"use client";

import { useState } from "react";
import AmbientFloating from "@/components/ui/AmbientFloating";
import Gate from "@/components/sections/Gate";
import FunLoading from "@/components/sections/FunLoading";
import GiftBox from "@/components/sections/GiftBox";
import Timeline from "@/components/sections/Timeline";
import Quiz from "@/components/sections/Quiz";
import RunawayButton from "@/components/sections/RunawayButton";
import LoveLetter from "@/components/sections/LoveLetter";
import { siteConfig } from "@/data/site";

export default function Home() {
  // Status flow: "gate" | "loading" | "unlocked"
  const [appState, setAppState] = useState<"gate" | "loading" | "unlocked">(
    "gate"
  );

  const handleUnlockGate = () => {
    setAppState("loading");
  };

  const handleFinishLoading = () => {
    setAppState("unlocked");
  };

  const handleLockAgain = () => {
    setAppState("gate");
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-cream via-peach/30 to-cream text-ink selection:bg-pink/30">
      {/* Background Ambient Particles teranimasi Anime.js */}
      <AmbientFloating />

      {/* 1. Tahap Gate (Kunci / Gerbang Rahasia) */}
      {appState === "gate" && <Gate onUnlock={handleUnlockGate} />}

      {/* 2. Tahap FunLoading (Transisi Pesan Lucu) */}
      {appState === "loading" && (
        <FunLoading onComplete={handleFinishLoading} />
      )}

      {/* 3. Tahap Unlocked (Semua Section Terbuka) */}
      {appState === "unlocked" && (
        <div className="relative z-10">
          {/* Bar Kontrol Atas (Navigasi Ringkas) */}
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-blush/40 bg-cream/85 px-4 py-2.5 backdrop-blur-md">
            <span className="font-display text-sm font-bold text-rose">
              🎂 {siteConfig.recipientName}&apos;s Day
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-0.5">
              <a
                href="#giftbox"
                className="rounded-full bg-peach/60 px-2.5 py-1 text-xs font-semibold text-rose hover:bg-peach"
              >
                Kado 🎁
              </a>
              <a
                href="#timeline"
                className="rounded-full bg-peach/60 px-2.5 py-1 text-xs font-semibold text-rose hover:bg-peach"
              >
                Cerita 📖
              </a>
              <a
                href="#quiz"
                className="rounded-full bg-peach/60 px-2.5 py-1 text-xs font-semibold text-rose hover:bg-peach"
              >
                Kuis 🧩
              </a>
              <a
                href="#runaway"
                className="rounded-full bg-peach/60 px-2.5 py-1 text-xs font-semibold text-rose hover:bg-peach"
              >
                Janji 💖
              </a>
              <a
                href="#loveletter"
                className="rounded-full bg-peach/60 px-2.5 py-1 text-xs font-semibold text-rose hover:bg-peach"
              >
                Surat 💌
              </a>
              <button
                type="button"
                onClick={handleLockAgain}
                title="Kunci kembali gerbang"
                className="rounded-full border border-rose/30 px-2 py-1 text-xs font-medium text-ink/70 hover:bg-peach/30 cursor-pointer"
              >
                🔒
              </button>
            </div>
          </header>

          {/* Susunan Section Lengkap */}
          <div className="divide-y divide-peach/30">
            <GiftBox />
            <Timeline />
            <Quiz />
            <RunawayButton />
            <LoveLetter />
          </div>

          {/* Footer Manis */}
          <footer className="border-t border-peach/50 bg-cream/90 px-4 py-12 text-center">
            <p className="font-display text-base font-bold text-rose">
              Dibuat dengan segenap cinta untuk {siteConfig.recipientName} 💛
            </p>
            <p className="mt-1 text-xs text-ink/60">
              Oleh {siteConfig.senderName} • {new Date().getFullYear()}
            </p>
            <div className="mt-4">
              <a
                href="#giftbox"
                className="text-xs text-rose/80 underline decoration-rose/40 hover:text-rose"
              >
                Kembali ke Atas ⬆️
              </a>
            </div>
          </footer>
        </div>
      )}
    </main>
  );
}

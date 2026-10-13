"use client";

import { useState } from "react";
import AmbientFloating from "@/components/ui/AmbientFloating";
import MusicToggle from "@/components/ui/MusicToggle";
import Gate from "@/components/sections/Gate";
import FunLoading from "@/components/sections/FunLoading";
import GiftBox from "@/components/sections/GiftBox";
import Timeline from "@/components/sections/Timeline";
import Quiz from "@/components/sections/Quiz";
import FriendMessages from "@/components/sections/FriendMessages";
import LoveLetter from "@/components/sections/LoveLetter";
import Coupons from "@/components/sections/Coupons";
import Ending from "@/components/sections/Ending";
import { siteConfig } from "@/data/site";

export default function Home() {
  // Status flow alur: "gate" | "loading" | "unlocked"
  const [appState, setAppState] = useState<"gate" | "loading" | "unlocked">(
    "gate"
  );

  const handleUnlockGate = () => {
    setAppState("loading");
  };

  const handleFinishLoading = () => {
    setAppState("unlocked");
  };

  const handleReplay = () => {
    setAppState("gate");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-cream via-peach/30 to-cream text-ink selection:bg-pink/30">
      {/* Background Ambient Particles & Floating Hearts */}
      <AmbientFloating />

      {/* Floating Music Controller */}
      <MusicToggle />

      {/* 0. Tahap Gate: Verifikasi Orang Spesial + Runaway Button */}
      {appState === "gate" && <Gate onUnlock={handleUnlockGate} />}

      {/* 1. Tahap FunLoading: Progress bar dengan teks bergantian */}
      {appState === "loading" && (
        <FunLoading onComplete={handleFinishLoading} />
      )}

      {/* 2-8. Tahap Unlocked: Seluruh Section Terbuka Secara Berurutan */}
      {appState === "unlocked" && (
        <div className="relative z-10">
          {/* Header Navigasi Cepat */}
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-blush/40 bg-cream/85 px-4 py-2.5 backdrop-blur-md">
            <span className="font-display text-sm font-bold text-rose">
              🎂 {siteConfig.recipientName}&apos;s Special Day
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
                href="#messages"
                className="rounded-full bg-peach/60 px-2.5 py-1 text-xs font-semibold text-rose hover:bg-peach"
              >
                Pesan 📌
              </a>
              <a
                href="#loveletter"
                className="rounded-full bg-peach/60 px-2.5 py-1 text-xs font-semibold text-rose hover:bg-peach"
              >
                Surat 💌
              </a>
              <a
                href="#coupons"
                className="rounded-full bg-peach/60 px-2.5 py-1 text-xs font-semibold text-rose hover:bg-peach"
              >
                Kupon 🎟️
              </a>
              <button
                type="button"
                onClick={handleReplay}
                title="Kunci kembali gerbang / Replay"
                className="rounded-full border border-rose/30 px-2 py-1 text-xs font-medium text-ink/70 hover:bg-peach/30 cursor-pointer"
              >
                🔒
              </button>
            </div>
          </header>

          {/* Susunan Section Berurutan (Alur 2 s/d 8) */}
          <div className="divide-y divide-peach/30">
            {/* 2. GiftBox (Ketuk 3x, goyang, confetti & sound effect) */}
            <GiftBox />

            {/* 3. Timeline (6-8 momen kenangan) */}
            <Timeline />

            {/* 4. Quiz (5 soal, respons lucu, skor selalu lulus 100/100) */}
            <Quiz />

            {/* 5. FriendMessages (Sticky notes dari Supabase + form /kirim-ucapan) */}
            <FriendMessages />

            {/* 6. LoveLetter (Amplop terbuka, surat efek ketik pelan typewriter) */}
            <LoveLetter />

            {/* 7. Coupons (6-8 kupon klaim + notif Telegram + 1 kupon rahasia) */}
            <Coupons />

            {/* 8. Ending (Pesan terima kasih & tombol replay) */}
            <Ending onReplay={handleReplay} />
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

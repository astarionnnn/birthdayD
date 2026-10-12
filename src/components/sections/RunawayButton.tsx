"use client";

import { useState, useRef, useEffect } from "react";
import { animate } from "animejs";
import confetti from "canvas-confetti";
import { runawayConfig } from "@/data/runaway";

export default function RunawayButton() {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [taunt, setTaunt] = useState<string>("");
  const [isAccepted, setIsAccepted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const yesBtnRef = useRef<HTMLButtonElement>(null);
  const runawayBtnRef = useRef<HTMLButtonElement>(null);
  const successCardRef = useRef<HTMLDivElement>(null);

  // Animasi detak jantung halus (heartbeat pulse) pada tombol YES
  useEffect(() => {
    if (!isAccepted && yesBtnRef.current) {
      const pulseAnim = animate(yesBtnRef.current, {
        scale: [1, 1.05, 0.98, 1],
        duration: 1600,
        loop: true,
        ease: "inOutSine",
      });
      return () => {
        pulseAnim.pause();
      };
    }
  }, [isAccepted]);

  const handleDodge = () => {
    if (isAccepted) return;

    const newCount = dodgeCount + 1;
    setDodgeCount(newCount);

    const randomTaunt =
      runawayConfig.taunts[(newCount - 1) % runawayConfig.taunts.length];
    setTaunt(randomTaunt);

    // Hitung posisi acak kabur
    const maxX = 120;
    const maxY = 65;
    const randomX = (Math.random() - 0.5) * 2 * maxX;
    const randomY = (Math.random() - 0.5) * 2 * maxY;

    if (runawayBtnRef.current) {
      animate(runawayBtnRef.current, {
        translateX: randomX,
        translateY: randomY,
        rotate: (Math.random() - 0.5) * 30,
        duration: 280,
        ease: "outBack",
      });
    }

    // Tombol YES membesar sedikit tiap kali tombol lawan kabur
    if (yesBtnRef.current) {
      const baseScale = Math.min(1 + newCount * 0.06, 1.35);
      animate(yesBtnRef.current, {
        scale: [baseScale * 0.95, baseScale],
        duration: 200,
        ease: "outBack",
      });
    }
  };

  const handleAccept = () => {
    setIsAccepted(true);

    // Ledakan confetti meriah
    const end = Date.now() + 1500;
    const colors = ["#ff8fab", "#e5486f", "#ffd9c7", "#ffc2d1", "#ffb703"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Animasi kemunculan kartu sukses
    setTimeout(() => {
      if (successCardRef.current) {
        animate(successCardRef.current, {
          scale: [0.85, 1],
          opacity: [0, 1],
          duration: 600,
          ease: "outBack",
        });
      }
    }, 100);
  };

  return (
    <section
      id="runaway"
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 text-center overflow-hidden"
    >
      <div className="w-full max-w-xl">
        {/* Header Badge */}
        <div className="inline-block rounded-full bg-peach/70 px-4 py-1 text-xs font-bold uppercase tracking-widest text-rose mb-3">
          {runawayConfig.badge}
        </div>

        <h2 className="font-display text-3xl font-bold text-rose sm:text-4xl md:text-5xl">
          {runawayConfig.title}
        </h2>

        <p className="mt-2 text-sm text-ink/80 sm:text-base max-w-md mx-auto">
          {runawayConfig.subtitle}
        </p>

        {!isAccepted ? (
          <div
            ref={containerRef}
            className="relative mt-10 rounded-3xl border-2 border-blush/80 bg-white/90 p-8 shadow-xl backdrop-blur-md sm:p-12"
          >
            <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
              Maukah kamu disayang lebih banyak setiap hari? 🥺💖
            </h3>

            {/* Kalimat taunt jika tombol sudah pernah kabur */}
            <div className="min-h-[28px] mt-3">
              {taunt && (
                <p className="font-display text-xs sm:text-sm font-semibold text-rose animate-bounce">
                  {taunt}
                </p>
              )}
            </div>

            {/* Area Tombol Pilihan */}
            <div className="relative mt-8 flex min-h-[140px] flex-col sm:flex-row items-center justify-center gap-6">
              {/* Tombol YES (Iya) */}
              <button
                ref={yesBtnRef}
                type="button"
                onClick={handleAccept}
                className="z-10 rounded-full bg-rose px-8 py-3.5 font-display text-base font-bold text-white shadow-lg transition-transform hover:bg-rose/90 active:scale-95 cursor-pointer"
              >
                {runawayConfig.yesButtonText}
              </button>

              {/* Tombol NO (Runaway - Tombol Kabur) */}
              <button
                ref={runawayBtnRef}
                type="button"
                onMouseEnter={handleDodge}
                onTouchStart={handleDodge}
                onPointerDown={handleDodge}
                onClick={handleDodge}
                className="rounded-full border-2 border-gray-300 bg-gray-100 px-6 py-3 font-display text-sm font-semibold text-gray-500 shadow transition-colors hover:bg-gray-200 select-none cursor-pointer"
              >
                {dodgeCount > 4 ? "Ampun, gak bisa diklik! 🏃‍♂️" : runawayConfig.noButtonText}
              </button>
            </div>

            <p className="mt-4 text-xs text-ink/50">
              *Petunjuk: Tombol merah muda terlihat jauh lebih menarik untuk diklik! 🤭
            </p>
          </div>
        ) : (
          /* Kartu Sukses setelah memilih YES */
          <div
            ref={successCardRef}
            className="mt-10 rounded-3xl border-2 border-blush/80 bg-white/95 p-8 shadow-2xl backdrop-blur-md sm:p-10 text-center"
          >
            <div className="text-6xl mb-3">🥰💍✨</div>

            <h3 className="font-display text-2xl font-bold text-rose sm:text-3xl">
              {runawayConfig.successTitle}
            </h3>

            <p className="mt-4 text-sm text-ink/85 sm:text-base max-w-md mx-auto leading-relaxed">
              {runawayConfig.successMessage}
            </p>

            <div className="mt-8">
              <a
                href="#loveletter"
                className="inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3 font-display text-sm font-bold text-white shadow-md hover:bg-rose/90 transition-transform active:scale-95 cursor-pointer"
              >
                Baca Surat Cinta Spesial Kita 💌 👇
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

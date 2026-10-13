"use client";

import { useState, useRef, useEffect } from "react";
import { animate, stagger } from "animejs";
import confetti from "canvas-confetti";
import { giftConfig } from "@/data/gift";
import { siteConfig } from "@/data/site";
import { playPopSound, playChimeSound } from "@/lib/audio";

interface GiftBoxProps {
  onOpenNext?: () => void;
}

export default function GiftBox({ onOpenNext }: GiftBoxProps) {
  const [tapCount, setTapCount] = useState(0); // 0, 1, 2, 3 (terbuka)
  const [isOpen, setIsOpen] = useState(false);

  const boxWrapperRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const boxBodyRef = useRef<HTMLDivElement>(null);
  const contentCardRef = useRef<HTMLDivElement>(null);
  const wishCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sparkleLeftRef = useRef<HTMLDivElement>(null);
  const sparkleRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animasi idle floating kotak kado jika belum dibuka
    if (!isOpen && boxWrapperRef.current) {
      const floatAnim = animate(boxWrapperRef.current, {
        translateY: [-6, 6],
        duration: 1600,
        direction: "alternate",
        loop: true,
        ease: "inOutSine",
      });

      return () => {
        floatAnim.pause();
      };
    }
  }, [isOpen]);

  const fireConfettiExplosion = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.68 },
      colors: ["#ff8fab", "#e5486f", "#ffd9c7", "#ffc2d1", "#ffb703", "#70d6ff"],
    };

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.4),
      spread: 60,
      startVelocity: 45,
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.35),
      spread: 100,
      decay: 0.91,
      scalar: 1.1,
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.25),
      spread: 130,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
  };

  const handleTapBox = () => {
    if (isOpen) {
      // Jika sudah terbuka, ketukan menghasilkan confetti tambahan
      fireConfettiExplosion();
      playChimeSound();
      return;
    }

    const nextTap = tapCount + 1;
    setTapCount(nextTap);

    if (nextTap === 1) {
      // Ketukan 1: goyang ringan
      playPopSound(1);
      if (boxWrapperRef.current) {
        animate(boxWrapperRef.current, {
          rotate: [-4, 4, -2, 2, 0],
          scale: [1, 1.04, 1],
          duration: 350,
          ease: "outQuad",
        });
      }
    } else if (nextTap === 2) {
      // Ketukan 2: makin goyang kencang
      playPopSound(2);
      if (boxWrapperRef.current) {
        animate(boxWrapperRef.current, {
          rotate: [-9, 9, -6, 6, 0],
          scale: [1, 1.08, 0.96, 1],
          duration: 450,
          ease: "outElastic(1, 0.5)",
        });
      }
      // Munculkan sparkle efek
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
        colors: ["#ffd9c7", "#ff8fab", "#ffb703"],
      });
    } else if (nextTap >= 3) {
      // Ketukan 3: Kado Terbuka!
      setIsOpen(true);
      playChimeSound();
      fireConfettiExplosion();

      // Animasi tutup kado terlempar ke atas
      if (lidRef.current) {
        animate(lidRef.current, {
          translateY: -150,
          translateX: -25,
          rotate: -40,
          opacity: [1, 0],
          duration: 750,
          ease: "outBack",
        });
      }

      if (boxBodyRef.current) {
        animate(boxBodyRef.current, {
          scaleY: [1, 0.8, 1.08, 1],
          duration: 450,
          ease: "outElastic(1, 0.6)",
        });
      }

      // Animasi konten kado terbuka
      setTimeout(() => {
        if (contentCardRef.current) {
          animate(contentCardRef.current, {
            scale: [0.8, 1],
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 700,
            ease: "outBack",
          });
        }

        const validWishCards = wishCardsRef.current.filter(Boolean);
        if (validWishCards.length > 0) {
          animate(validWishCards, {
            opacity: [0, 1],
            translateY: [20, 0],
            scale: [0.92, 1],
            delay: stagger(100, { start: 200 }),
            duration: 600,
            ease: "outBack",
          });
        }
      }, 150);
    }
  };

  const handleRebox = () => {
    setIsOpen(false);
    setTapCount(0);
  };

  const getTapHint = () => {
    if (tapCount === 0) return "Ketuk kotak kado 3x untuk membukanya! 🎁";
    if (tapCount === 1) return "Wah mulai bergetar! Ketuk 2x lagi! ✨";
    if (tapCount === 2) return "Kotaknya mau meledak! Ketuk 1x lagi yang kencang! 💥";
    return "";
  };

  return (
    <section
      id="giftbox"
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 text-center"
    >
      <div className="w-full max-w-2xl">
        {/* Header Badge */}
        <div className="inline-block rounded-full bg-peach/70 px-4 py-1 text-xs font-bold uppercase tracking-widest text-rose mb-3">
          {giftConfig.badge}
        </div>

        <h2 className="font-display text-3xl font-bold text-rose sm:text-4xl md:text-5xl">
          {isOpen
            ? `Happy Birthday, ${siteConfig.recipientName}! 🎂`
            : giftConfig.boxTitle}
        </h2>

        <p className="mt-2 text-sm text-ink/80 sm:text-base max-w-lg mx-auto">
          {isOpen ? giftConfig.openedGreeting : giftConfig.boxSubtitle}
        </p>

        {/* Kotak Kado Interaktif */}
        {!isOpen ? (
          <div className="mt-10 flex flex-col items-center">
            <div
              ref={boxWrapperRef}
              onClick={handleTapBox}
              className="group relative cursor-pointer select-none transition-transform active:scale-95"
            >
              {/* Sparkle effects */}
              <div
                ref={sparkleLeftRef}
                className="absolute -top-7 -left-7 text-3xl select-none animate-bounce"
              >
                ✨
              </div>
              <div
                ref={sparkleRightRef}
                className="absolute -top-6 -right-7 text-3xl select-none animate-pulse"
              >
                🌟
              </div>

              {/* Tutup Kado (Lid) */}
              <div
                ref={lidRef}
                className="relative z-20 mx-auto h-12 w-48 rounded-t-xl bg-gradient-to-r from-pink to-rose shadow-lg border-2 border-white/80"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className="h-7 w-7 rounded-full border-4 border-amber-300 bg-amber-400 shadow-md"></div>
                  <div className="h-6 w-12 rounded-full border-4 border-amber-300 bg-amber-400 -ml-4 rotate-12"></div>
                </div>
                <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-amber-300 shadow-inner"></div>
              </div>

              {/* Badan Kotak (Box Body) */}
              <div
                ref={boxBodyRef}
                className="relative z-10 mx-auto -mt-1 h-36 w-44 rounded-b-2xl bg-gradient-to-b from-rose to-rose/90 shadow-2xl border-2 border-white/80 flex items-center justify-center overflow-hidden"
              >
                <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-amber-300 shadow-inner"></div>
                <div className="absolute top-1/2 left-0 w-full h-8 -translate-y-1/2 bg-amber-300 shadow-inner"></div>
              </div>
            </div>

            {/* Indikator Ketukan */}
            <div className="mt-6 flex items-center gap-2">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`h-3 w-8 rounded-full transition-all duration-300 ${
                    tapCount >= num
                      ? "bg-rose scale-110 shadow-md"
                      : "bg-peach/60 border border-blush"
                  }`}
                />
              ))}
            </div>

            <p className="mt-3 font-display text-sm font-semibold text-rose animate-pulse">
              👉 {getTapHint()} 👈
            </p>
          </div>
        ) : (
          /* Konten Saat Kado Sudah Dibuka */
          <div
            ref={contentCardRef}
            className="mt-8 rounded-3xl border-2 border-blush/80 bg-white/90 p-6 shadow-2xl backdrop-blur-md sm:p-8 text-left"
          >
            {/* Ucapan Spesial */}
            <div className="rounded-2xl bg-gradient-to-r from-peach/40 via-cream to-peach/40 p-5 border border-peach mb-6 text-center">
              <span className="text-4xl block mb-2">🎂🎉🎁</span>
              <h3 className="font-display text-2xl font-bold text-rose">
                Happy Birthday, {siteConfig.recipientName}!
              </h3>
              <p className="text-sm text-ink/80 mt-1">
                Semoga bertambahnya usia membawa ribuan berkah dan kebahagiaan!
              </p>
            </div>

            {/* Pesan Utama Kado */}
            <div className="rounded-2xl bg-cream/70 p-5 border border-peach/70 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💌</span>
                <span className="font-display font-bold text-rose text-lg">
                  Pesan Khusus Untukmu
                </span>
              </div>
              <p className="text-sm text-ink/90 sm:text-base leading-relaxed">
                {giftConfig.mainMessage}
              </p>
            </div>

            {/* Daftar Wishes / Doa */}
            <h3 className="font-display text-lg font-bold text-rose mb-3 flex items-center gap-2">
              <span>🌟</span> Doa & Harapan Buat Kamu:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              {giftConfig.wishes.map((wish, index) => (
                <div
                  key={wish.id}
                  ref={(el) => {
                    wishCardsRef.current[index] = el;
                  }}
                  className="rounded-2xl border border-blush/60 bg-cream/40 p-3.5 shadow-sm transition-shadow hover:shadow-md cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl select-none">{wish.emoji}</span>
                    <div>
                      <h4 className="font-display text-sm font-bold text-rose">
                        {wish.title}
                      </h4>
                      <p className="text-xs text-ink/80 mt-1 leading-snug">
                        {wish.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Petunjuk Kado Fisik */}
            {giftConfig.physicalGiftHint && (
              <div className="rounded-2xl border border-dashed border-rose/40 bg-peach/30 p-4 text-center mb-6">
                <p className="text-xs sm:text-sm font-semibold text-rose">
                  {giftConfig.physicalGiftHint}
                </p>
              </div>
            )}

            {/* Aksi Tambahan */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-peach/50">
              <button
                type="button"
                onClick={fireConfettiExplosion}
                className="w-full sm:w-auto rounded-full bg-peach px-5 py-2.5 font-display text-xs font-bold text-rose shadow hover:bg-blush transition-colors cursor-pointer"
              >
                🎉 Tambah Confetti
              </button>

              <button
                type="button"
                onClick={handleRebox}
                className="w-full sm:w-auto text-xs text-ink/60 hover:text-ink cursor-pointer py-1"
              >
                Bungkus kado lagi 🎁
              </button>
            </div>
          </div>
        )}

        {/* Tombol Lanjut ke Section Berikutnya */}
        <div className="mt-12">
          <a
            href="#timeline"
            className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white/70 px-6 py-2.5 font-display text-sm font-semibold text-rose shadow-sm hover:bg-white hover:shadow transition-all cursor-pointer"
          >
            Lihat Kenangan Perjalanan Kita 👇
          </a>
        </div>
      </div>
    </section>
  );
}

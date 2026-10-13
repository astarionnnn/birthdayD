"use client";

import { useState, useRef, useEffect } from "react";
import { animate } from "animejs";
import Typewriter from "typewriter-effect";
import { loveLetterData } from "@/data/letter";
import { siteConfig } from "@/data/site";
import { bgmManager, playChimeSound } from "@/lib/audio";

export default function LoveLetter() {
  const [isOpened, setIsOpened] = useState(false);
  const [hugCount, setHugCount] = useState(0);

  const envelopeRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const letterSheetRef = useRef<HTMLDivElement>(null);
  const heartsContainerRef = useRef<HTMLDivElement>(null);

  // Animasi denyut halus pada segel stempel amplop
  useEffect(() => {
    if (!isOpened && sealRef.current) {
      const sealAnim = animate(sealRef.current, {
        scale: [1, 1.1, 1],
        duration: 1400,
        loop: true,
        ease: "inOutSine",
      });
      return () => {
        sealAnim.pause();
      };
    }
  }, [isOpened]);

  const handleOpenEnvelope = () => {
    playChimeSound();
    // Nyalakan musik latar lembut jika belum berbunyi
    bgmManager.play();

    if (envelopeRef.current) {
      animate(envelopeRef.current, {
        scale: [1, 1.08, 0.95],
        duration: 350,
        ease: "inQuad",
      }).then(() => {
        setIsOpened(true);
        setTimeout(() => {
          if (letterSheetRef.current) {
            animate(letterSheetRef.current, {
              scaleY: [0.2, 1],
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 750,
              ease: "outBack",
            });
          }
        }, 80);
      });
    } else {
      setIsOpened(true);
    }
  };

  const handleSendVirtualHug = () => {
    setHugCount((prev) => prev + 1);
    playChimeSound();

    if (heartsContainerRef.current) {
      const burstCount = 4;
      const icons = ["❤️", "💖", "🥰", "✨", "💕", "🤗", "💌"];

      for (let i = 0; i < burstCount; i++) {
        const heart = document.createElement("div");
        heart.innerText = icons[Math.floor(Math.random() * icons.length)];
        heart.style.position = "absolute";
        heart.style.left = `${Math.random() * 70 + 15}%`;
        heart.style.bottom = "30px";
        heart.style.fontSize = `${Math.random() * 16 + 22}px`;
        heart.style.userSelect = "none";
        heart.style.pointerEvents = "none";
        heartsContainerRef.current.appendChild(heart);

        const driftX = (Math.random() - 0.5) * 140;
        const driftRotate = (Math.random() - 0.5) * 60;
        const duration = 1600 + Math.random() * 600;

        animate(heart, {
          translateY: -320 - Math.random() * 80,
          translateX: driftX,
          rotate: driftRotate,
          opacity: [1, 0],
          scale: [0.8, 1.5],
          duration,
          ease: "outQuad",
        }).then(() => {
          heart.remove();
        });
      }
    }
  };

  return (
    <section
      id="loveletter"
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 text-center overflow-hidden"
    >
      {/* Floating Hearts Container */}
      <div
        ref={heartsContainerRef}
        className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
      />

      <div className="w-full max-w-2xl">
        {/* Header Badge */}
        <div className="inline-block rounded-full bg-peach/70 px-4 py-1 text-xs font-bold uppercase tracking-widest text-rose mb-3">
          {loveLetterData.badge}
        </div>

        <h2 className="font-display text-3xl font-bold text-rose sm:text-4xl md:text-5xl">
          {loveLetterData.envelopeTitle}
        </h2>

        <p className="mt-2 text-sm text-ink/80 sm:text-base max-w-md mx-auto">
          {loveLetterData.envelopeHint}
        </p>

        {/* Amplop Tertutup */}
        {!isOpened ? (
          <div className="mt-12 flex flex-col items-center">
            <div
              ref={envelopeRef}
              onClick={handleOpenEnvelope}
              className="group relative h-56 w-72 sm:w-80 cursor-pointer rounded-2xl bg-gradient-to-br from-rose to-pink p-1 shadow-2xl transition-transform hover:scale-105 active:scale-95"
            >
              <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-white/90 p-6 border-2 border-blush/80">
                <span className="text-5xl select-none">💌</span>
                <span className="mt-3 font-display text-base font-bold text-rose">
                  Untuk {siteConfig.recipientName}
                </span>
                <span className="mt-1 text-xs text-ink/60">
                  Dari {siteConfig.senderName}
                </span>

                {/* Segel Stempel Lilin */}
                <div
                  ref={sealRef}
                  className="mt-4 rounded-full bg-rose px-4 py-1.5 font-display text-xs font-bold text-white shadow-md group-hover:bg-rose/90 transition-colors"
                >
                  {loveLetterData.sealText}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Kertas Surat Terbuka dengan Efek Ketik Pelan */
          <div
            ref={letterSheetRef}
            className="relative mt-8 rounded-3xl border-2 border-blush/70 bg-[#fffdfa] p-6 text-left shadow-2xl sm:p-10 origin-top"
            style={{
              backgroundImage:
                "radial-gradient(#ffd9c7 0.75px, transparent 0.75px)",
              backgroundSize: "18px 18px",
            }}
          >
            {/* Header Surat */}
            <div className="border-b border-peach/70 pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-rose">
                Sepucuk Surat Dari Lubuk Hati
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold text-rose sm:text-3xl">
                {loveLetterData.letterTitle}
              </h3>
              <p className="mt-2 font-display text-lg text-ink font-semibold">
                {loveLetterData.greeting}
              </p>
            </div>

            {/* Paragraf Surat dengan Typewriter Effect Pelan */}
            <div className="min-h-[220px] text-sm sm:text-base leading-relaxed text-ink/90 font-body">
              <Typewriter
                onInit={(typewriter) => {
                  let chain = typewriter.changeDelay(25);
                  loveLetterData.paragraphs.forEach((p, idx) => {
                    chain = chain.typeString(
                      `<p class="mb-4 leading-relaxed">${p}</p>`
                    );
                    if (idx < loveLetterData.paragraphs.length - 1) {
                      chain = chain.pauseFor(350);
                    }
                  });
                  chain.start();
                }}
                options={{
                  autoStart: true,
                  delay: 25,
                  cursor: "🖋️",
                }}
              />
            </div>

            {/* Penutup & Tanda Tangan */}
            <div className="mt-8 border-t border-peach/70 pt-6">
              <p className="text-sm italic text-ink/80">
                {loveLetterData.closing}
              </p>
              <p className="mt-2 font-display text-xl font-bold text-rose">
                {loveLetterData.senderSignature}
              </p>
            </div>

            {/* P.S. Catatan Kaki Lucu */}
            {loveLetterData.postScript && (
              <div className="mt-6 rounded-2xl bg-peach/40 p-4 border border-blush/50">
                <p className="text-xs sm:text-sm font-medium text-ink/80 italic">
                  {loveLetterData.postScript}
                </p>
              </div>
            )}

            {/* Catatan Musik Latar — dari data/letter.ts field musicNote */}
            {loveLetterData.musicNote && (
              <p className="mt-4 text-center text-[11px] text-ink/40 italic select-none">
                🎵 {loveLetterData.musicNote}
              </p>
            )}

            {/* Tombol Interaktif Pelukan */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={handleSendVirtualHug}
                className="w-full sm:w-auto rounded-full bg-rose px-6 py-3 font-display text-sm font-bold text-white shadow-md hover:bg-rose/90 transition-transform active:scale-95 cursor-pointer"
              >
                🤗 Kirim Pelukan Hangat {hugCount > 0 && `(${hugCount}x)`}
              </button>

              <button
                type="button"
                onClick={() => setIsOpened(false)}
                className="text-xs text-ink/60 hover:text-ink cursor-pointer py-1"
              >
                Lipat dan masukkan amplop lagi ✉️
              </button>
            </div>
          </div>
        )}

        {/* Tombol Lanjut ke Section Kupon Hadiah */}
        <div className="mt-16">
          <a
            href="#coupons"
            className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white/70 px-6 py-2.5 font-display text-sm font-semibold text-rose shadow-sm hover:bg-white hover:shadow transition-all cursor-pointer"
          >
            Klaim Kupon Hadiah Spesial 🎟️ 👇
          </a>
        </div>
      </div>
    </section>
  );
}

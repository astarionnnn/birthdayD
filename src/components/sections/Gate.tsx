"use client";

import { useState, useRef, useEffect } from "react";
import { animate, utils } from "animejs";
import { siteConfig } from "@/data/site";

interface GateProps {
  onUnlock: () => void;
}

export default function Gate({ onUnlock }: GateProps) {
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showHint, setShowHint] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Durasi animasi masuk kartu; semua animasi looping baru mulai setelah ini
    // supaya tidak bertumpuk dengan animasi masuk (penyebab tampilan "nge-refresh").
    const ENTRY = prefersReduced ? 0 : 750;

    const anims: ReturnType<typeof animate>[] = [];

    /* 1. Animasi masuk kartu (kartu sudah opacity 0 dari awal, jadi tidak ada flash) */
    if (cardRef.current) {
      if (prefersReduced) {
        utils.set(cardRef.current, { opacity: 1 });
      } else {
        anims.push(
          animate(cardRef.current, {
            opacity: [0, 1],
            scale: [0.92, 1],
            duration: ENTRY,
            ease: "outBack",
          })
        );
      }
    }

    if (!prefersReduced) {
      /* 2. Ikon gembok: keyframe mulai & berakhir di 0 -> loop mulus, tanpa lompatan */
      if (iconRef.current) {
        anims.push(
          animate(iconRef.current, {
            translateY: [0, -8, 0, 8, 0],
            rotate: [0, -8, 0, 8, 0],
            duration: 4000,
            delay: ENTRY,
            loop: true,
            ease: "inOutSine",
          })
        );
      }

      /* 3. Denyut halus tombol: 1 -> 1.025 -> 1, loop mulus */
      if (submitBtnRef.current) {
        anims.push(
          animate(submitBtnRef.current, {
            scale: [1, 1.025, 1],
            duration: 2000,
            delay: ENTRY,
            loop: true,
            ease: "inOutSine",
          })
        );
      }
    }

    /* 4. Teks sambutan melayang pelan (loop mulus: 0 -> -4 -> 0) */
    if (textRef.current && !prefersReduced) {
      anims.push(
        animate(textRef.current, {
          translateY: [0, -4, 0],
          duration: 3000,
          delay: ENTRY,
          loop: true,
          ease: "inOutSine",
        })
      );
    }

    return () => {
      anims.forEach((a) => a.revert());
    };
  }, []);

  const handleUnlock = (codeToCheck?: string) => {
    const code = (codeToCheck ?? passcode).trim();
    if (!siteConfig.gatePasscode || code === siteConfig.gatePasscode) {
      setErrorMsg("");
      if (cardRef.current) {
        animate(cardRef.current, {
          scale: [1, 1.05, 0.9],
          opacity: [1, 0],
          duration: 450,
          ease: "inQuad",
        }).then(() => {
          onUnlock();
        });
      } else {
        onUnlock();
      }
    } else {
      setErrorMsg("Ups, kodenya belum tepat nih sayang! Cek petunjuk ya 😉");
      if (cardRef.current) {
        animate(cardRef.current, {
          translateX: [-12, 12, -8, 8, -4, 4, 0],
          duration: 400,
          ease: "inOutQuad",
        });
      }
    }
  };

  const welcomeText =
    "Ada kejutan manis yang sudah disiapkan khusus buat kamu di hari spesial ini. Masukkan 4 digit passcode untuk membukanya!";

  /* Kata berganti warna ceria saat di-hover/disentuh; transisinya lewat CSS */
  const handleWordEnter = (e: React.PointerEvent<HTMLSpanElement>) => {
    e.currentTarget.style.color = utils.randomPick([
      "#e5486f",
      "#ff8fab",
      "#ffb703",
      "#fb8500",
      "#48cae4",
      "#57F695",
    ]) as string;
  };

  const handleDirectOpen = () => {
    handleUnlock(siteConfig.gatePasscode);
  };

  const handleInputChange = (val: string) => {
    setPasscode(val);
    if (errorMsg) setErrorMsg("");
    // Micro-bounce pada input saat mengetik
    if (inputRef.current) {
      animate(inputRef.current, {
        scale: [1, 1.02, 1],
        duration: 150,
        ease: "outQuad",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex min-h-dvh w-full items-center justify-center px-4 py-8"
    >
      <div
        ref={cardRef}
        style={{ opacity: 0 }}
        className="w-full max-w-md rounded-3xl border border-blush/60 bg-white/90 p-6 shadow-2xl backdrop-blur-md sm:p-8 text-center will-change-transform"
      >
        <div
          ref={iconRef}
          className="mx-auto mb-3 text-5xl select-none will-change-transform"
        >
          🔒
        </div>

        <div className="inline-block rounded-full bg-peach/70 px-4 py-1 text-xs font-bold tracking-wide text-rose mb-3">
          GERBANG RAHASIA
        </div>

        <h1 className="font-display text-3xl font-bold text-rose sm:text-4xl">
          Halo, {siteConfig.recipientName}! 💖
        </h1>

        {/* Teks melayang pelan, kata-katanya berubah warna saat di-hover */}
        <p
          ref={textRef}
          className="mt-3 text-sm text-ink/80 sm:text-base leading-relaxed select-none"
        >
          {welcomeText.split(" ").map((word, i) => (
            <span
              key={i}
              onPointerEnter={handleWordEnter}
              className="inline-block cursor-default transition-colors duration-300"
            >
              {word}
              {"\u00A0"}
            </span>
          ))}
        </p>

        {/* Input Passcode */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUnlock();
          }}
          className="mt-6 flex flex-col gap-4"
        >
          <div className="relative">
            <input
              ref={inputRef}
              type="password"
              inputMode="numeric"
              maxLength={8}
              value={passcode}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Ketik passcode di sini..."
              className="w-full rounded-2xl border-2 border-blush bg-cream/50 px-4 py-3 text-center font-display text-xl tracking-widest text-ink placeholder:font-body placeholder:text-sm placeholder:tracking-normal placeholder:text-ink/40 focus:border-rose focus:outline-none transition-colors"
            />
          </div>

          {errorMsg && (
            <p className="text-xs font-semibold text-rose animate-pulse">
              {errorMsg}
            </p>
          )}

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              ref={submitBtnRef}
              type="submit"
              className="w-full rounded-2xl bg-rose py-3.5 font-display text-lg font-bold text-white shadow-md hover:bg-rose/90 cursor-pointer"
            >
              Buka Kejutan 🎁
            </button>

            <button
              type="button"
              onClick={handleDirectOpen}
              className="text-xs font-semibold text-rose/80 underline decoration-rose/30 hover:text-rose cursor-pointer py-1"
            >
              Langsung Buka Saja (Bypass PIN) 🚀
            </button>
          </div>
        </form>

        {/* Clue Section */}
        <div className="mt-5 border-t border-peach/50 pt-3">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-ink/60 hover:text-ink cursor-pointer"
          >
            {showHint ? "Sembunyikan Petunjuk 🙈" : "Lupa kodenya? Lihat Petunjuk 💡"}
          </button>

          {showHint && (
            <div className="mt-2 rounded-xl bg-peach/40 p-3 text-xs text-ink/90">
              {siteConfig.gateHint}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

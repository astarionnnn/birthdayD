"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { animate } from "animejs";
import { loadingMessages } from "@/data/loading";

interface FunLoadingProps {
  onComplete: () => void;
}

export default function FunLoading({ onComplete }: FunLoadingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(10);

  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Simpan onComplete di ref supaya effect utama tidak ikut restart
  // (progress & animasi ikon tidak ke-reset) kalau parent re-render.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Animasi ikon dan proses loading (hanya dijalankan sekali)
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const animations: ReturnType<typeof animate>[] = [];
    let exitTimeout: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    let currentProgress = 10;

    // Fade-in halus saat komponen muncul (container mulai dari opacity 0)
    if (containerRef.current) {
      if (prefersReduced) {
        containerRef.current.style.opacity = "1";
      } else {
        animations.push(
          animate(containerRef.current, {
            opacity: [0, 1],
            duration: 400,
            ease: "outQuad",
          })
        );
      }
    }

    // Ikon: denyut + goyang. Keyframe mulai & berakhir di nilai yang sama,
    // jadi loop mulus tanpa perlu alternate.
    if (iconRef.current && !prefersReduced) {
      animations.push(
        animate(iconRef.current, {
          scale: [1, 1.15, 1],
          rotate: [0, -8, 0, 8, 0],
          duration: 2000,
          loop: true,
          ease: "inOutSine",
        })
      );
    }

    // Pergantian pesan loading
    const messageInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 800);

    // Progress bar: langkah kecil & sering supaya terasa mengalir
    const progressInterval = setInterval(() => {
      currentProgress = Math.min(
        currentProgress + Math.floor(Math.random() * 4) + 2,
        100
      );
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        clearInterval(messageInterval);

        // Jeda sebentar agar 100% sempat terlihat sebelum transisi keluar
        exitTimeout = setTimeout(() => {
          if (cancelled) return;

          if (containerRef.current) {
            const exitAnimation = animate(containerRef.current, {
              opacity: [1, 0],
              scale: [1, 1.05],
              duration: 500,
              ease: "outQuad",
            });
            animations.push(exitAnimation);
            exitAnimation.then(() => {
              if (!cancelled) onCompleteRef.current();
            });
          } else {
            onCompleteRef.current();
          }
        }, 450);
      }
    }, 120);

    return () => {
      cancelled = true;
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      if (exitTimeout !== undefined) clearTimeout(exitTimeout);
      animations.forEach((a) => a.revert());
    };
  }, []);

  // Animasi pesan & emoji tiap kali berganti.
  // useLayoutEffect: animasi dimulai sebelum browser menggambar frame baru,
  // jadi teks baru tidak sempat "berkedip" penuh dulu baru memudar.
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const anims: ReturnType<typeof animate>[] = [];

    if (textRef.current) {
      anims.push(
        animate(textRef.current, {
          opacity: [0, 1],
          translateY: [8, 0],
          duration: 350,
          ease: "outQuad",
        })
      );
    }

    if (emojiRef.current) {
      anims.push(
        animate(emojiRef.current, {
          opacity: [0, 1],
          scale: [0.6, 1],
          duration: 350,
          ease: "outBack",
        })
      );
    }

    return () => {
      anims.forEach((a) => a.revert());
    };
  }, [currentIndex]);

  const currentStep = loadingMessages[currentIndex] ?? loadingMessages[0];

  return (
    <div
      ref={containerRef}
      style={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream/95 px-6 backdrop-blur-md"
    >
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        {/* Ikon lucu: wrapper untuk loop goyang, span dalam untuk transisi ganti emoji */}
        <div
          ref={iconRef}
          className="mb-4 text-6xl select-none will-change-transform"
        >
          <span ref={emojiRef} className="inline-block">
            {currentStep.icon}
          </span>
        </div>

        {/* Progress bar container */}
        <div className="h-3 w-full overflow-hidden rounded-full border border-blush bg-peach/60 p-0.5 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink to-rose transition-[width] duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Persentase */}
        <div className="mt-2 text-xs font-bold tracking-wider text-rose tabular-nums">
          {progress}%
        </div>

        {/* Pesan loading */}
        <p
          ref={textRef}
          className="mt-4 min-h-[48px] font-display text-base leading-snug font-medium text-ink/90 sm:text-lg"
        >
          {currentStep.message}
        </p>

        {/* Pesan tambahan */}
        <p className="mt-4 text-xs text-ink/50">
          Mohon bersabar, orang spesial pantas dapat kejutan terbaik... 💛
        </p>
      </div>
    </div>
  );
}

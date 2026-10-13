"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, utils } from "animejs";

const HEART_EMOJIS = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🩷", "🤍"];

interface FloatingHeartsProps {
  /** Jumlah hati yang melayang sekaligus. Default: 12 */
  count?: number;
  /** Class tambahan untuk container */
  className?: string;
}

/**
 * Hati-hati kecil yang melayang di latar belakang halaman secara looping.
 * Dirender sebagai fixed overlay supaya bisa jadi global background.
 */
export default function FloatingHearts({
  count = 12,
  className = "",
}: FloatingHeartsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const anims: ReturnType<typeof animate>[] = [];

    // Buat elemen hati sebanyak `count`
    const hearts: HTMLSpanElement[] = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.textContent = utils.randomPick(HEART_EMOJIS) as string;
      el.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 14 + 10}px;
        left: ${Math.random() * 100}%;
        bottom: -40px;
        opacity: 0;
        pointer-events: none;
        user-select: none;
        will-change: transform, opacity;
      `;
      container.appendChild(el);
      hearts.push(el);
    }

    // Animasi melayang ke atas dengan stagger
    const anim = animate(hearts, {
      translateY: [0, -(window.innerHeight + 80)],
      translateX: () => `${(Math.random() - 0.5) * 120}px`,
      opacity: [
        { to: 0.7, duration: 400 },
        { to: 0.7, duration: 2600 },
        { to: 0, duration: 1000 },
      ],
      duration: () => Math.random() * 3000 + 4000,
      delay: stagger(400, { start: 0 }),
      loop: true,
      ease: "linear",
    });
    anims.push(anim);

    return () => {
      anims.forEach((a) => a.revert());
      hearts.forEach((h) => h.remove());
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
    />
  );
}


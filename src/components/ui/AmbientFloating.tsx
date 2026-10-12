"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface Particle {
  id: number;
  emoji: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

const EMOJIS = ["✨", "🌸", "💖", "⭐", "💕", "🧁", "🌷"];

export default function AmbientFloating() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // 12 partikel lembut di latar belakang
  const particles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    emoji: EMOJIS[i % EMOJIS.length],
    left: 5 + (i * 8.2) % 90,
    top: 10 + (i * 11) % 85,
    size: 14 + (i % 4) * 4,
    duration: 3500 + (i % 5) * 800,
    delay: (i % 6) * 400,
  }));

  useEffect(() => {
    // Animasi melayang melingkar / osilasi halus dengan Anime.js
    const anims = elementsRef.current.map((el, i) => {
      if (!el) return null;
      const duration = particles[i]?.duration ?? 4000;
      const delay = particles[i]?.delay ?? 0;

      return animate(el, {
        translateY: [-16, 16],
        translateX: [-10, 10],
        rotate: [-15, 15],
        opacity: [0.25, 0.65],
        duration,
        delay,
        direction: "alternate",
        loop: true,
        ease: "inOutSine",
      });
    });

    return () => {
      anims.forEach((anim) => anim?.pause());
    };
  }, [particles]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {particles.map((p, index) => (
        <span
          key={p.id}
          ref={(el) => {
            elementsRef.current[index] = el;
          }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}px`,
            opacity: 0.35,
            filter: "blur(0.4px)",
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}


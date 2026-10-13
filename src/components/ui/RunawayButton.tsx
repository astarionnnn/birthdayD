"use client";

import { useRef, useState, useCallback } from "react";
import { animate } from "animejs";

interface RunawayButtonProps {
  children: React.ReactNode;
  className?: string;
  /** Dipanggil setelah gagal kabur sebanyak maxEscapes kali */
  onCaught?: () => void;
  /** Berapa kali bisa kabur sebelum menyerah. Default: 5 */
  maxEscapes?: number;
  /** Radius pengintai (px). Kalau pointer dalam radius ini, tombol akan bersiap kabur. Default: 80 */
  triggerRadius?: number;
}

/**
 * Tombol yang lari saat didekati atau diklik.
 * Setelah maxEscapes kali, tombol "menyerah" dan onCaught dipanggil.
 */
export default function RunawayButton({
  children,
  className = "",
  onCaught,
  maxEscapes = 5,
  triggerRadius = 80,
}: RunawayButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const escapeCount = useRef(0);
  const [caught, setCaught] = useState(false);

  const runAway = useCallback(() => {
    const btn = btnRef.current;
    const wrap = wrapRef.current;
    if (!btn || !wrap || caught) return;

    escapeCount.current += 1;

    if (escapeCount.current >= maxEscapes) {
      setCaught(true);
      onCaught?.();
      return;
    }

    const rect = wrap.getBoundingClientRect();
    const parentRect =
      (wrap.parentElement?.getBoundingClientRect() ?? rect);

    // Tentukan ruang gerak relatif terhadap parent
    const maxX = parentRect.width - rect.width;
    const maxY = parentRect.height - rect.height;

    // Posisi acak di dalam container parent
    const newX = Math.random() * maxX - rect.left + parentRect.left;
    const newY = Math.random() * maxY - rect.top + parentRect.top;

    animate(wrap, {
      translateX: newX,
      translateY: newY,
      duration: 300,
      ease: "outQuart",
    });

    // Efek kejut pada tombol
    animate(btn, {
      scale: [1, 1.15, 0.9, 1],
      duration: 300,
      ease: "outElastic(1,0.5)",
    });
  }, [caught, maxEscapes, onCaught]);

  // Kabur saat pointer mendekat dalam radius triggerRadius
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const btn = btnRef.current;
      if (!btn || caught) return;

      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < triggerRadius) {
        runAway();
      }
    },
    [caught, triggerRadius, runAway]
  );

  if (caught) return null;

  return (
    // onPointerMove dipasang di wrapper agar bisa mendeteksi pendekatan sebelum hover penuh
    <div
      ref={wrapRef}
      className="absolute"
      onPointerMove={handlePointerMove}
      style={{ willChange: "transform" }}
    >
      <button
        ref={btnRef}
        type="button"
        onClick={runAway}
        className={`select-none cursor-pointer rounded-2xl px-6 py-3 font-display font-bold transition-colors will-change-transform ${className}`}
      >
        {children}
      </button>
    </div>
  );
}


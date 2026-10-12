"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { timelineData } from "@/data/timeline";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animasi kemunculan kartu-kartu linimasa
    const validItems = itemsRef.current.filter(Boolean);
    if (validItems.length > 0) {
      animate(validItems, {
        opacity: [0, 1],
        translateY: [35, 0],
        delay: stagger(150),
        duration: 700,
        ease: "outQuad",
      });
    }

    // Animasi denyut halus pin hati linimasa secara bergiliran
    const validDots = dotsRef.current.filter(Boolean);
    if (validDots.length > 0) {
      animate(validDots, {
        scale: [1, 1.22],
        delay: stagger(200),
        duration: 1200,
        direction: "alternate",
        loop: true,
        ease: "inOutSine",
      });
    }
  }, []);

  const handleCardMouseEnter = (index: number) => {
    const el = itemsRef.current[index];
    if (el) {
      animate(el, {
        translateX: 6,
        scale: 1.01,
        duration: 250,
        ease: "outQuad",
      });
    }
  };

  const handleCardMouseLeave = (index: number) => {
    const el = itemsRef.current[index];
    if (el) {
      animate(el, {
        translateX: 0,
        scale: 1,
        duration: 250,
        ease: "outQuad",
      });
    }
  };

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20"
    >
      <div className="w-full max-w-2xl text-center">
        {/* Header Badge */}
        <div className="inline-block rounded-full bg-peach/70 px-4 py-1 text-xs font-bold uppercase tracking-widest text-rose mb-3">
          JEJAK KISAH KITA 📖
        </div>

        <h2 className="font-display text-3xl font-bold text-rose sm:text-4xl md:text-5xl">
          Lembaran Cerita & Kenangan
        </h2>

        <p className="mt-2 text-sm text-ink/80 sm:text-base max-w-md mx-auto">
          Dari orang asing, jadi orang paling penting. Ini beberapa cuplikan memori
          manis (dan konyol) yang selalu bikin tersenyum.
        </p>

        {/* Linimasa Vertikal */}
        <div className="relative mt-12 pl-6 sm:pl-8 text-left">
          {/* Garis Vertikal Tengah/Kiri */}
          <div className="absolute left-2.5 sm:left-3.5 top-3 bottom-6 w-0.5 bg-gradient-to-b from-rose via-pink to-peach rounded-full" />

          <div className="flex flex-col gap-8">
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                onMouseEnter={() => handleCardMouseEnter(index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
                className="relative group transition-transform"
              >
                {/* Node Titik Garis (Dot Pin) */}
                <div
                  ref={(el) => {
                    dotsRef.current[index] = el;
                  }}
                  className="absolute -left-6 sm:-left-8 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-rose shadow-md"
                >
                  <span className="text-[10px] text-white select-none">❤️</span>
                </div>

                {/* Kartu Kenangan */}
                <div className="rounded-3xl border border-blush/80 bg-white/85 p-5 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl sm:p-6">
                  {/* Tanggal & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-rose">
                      {item.date}
                    </span>
                    <span className="rounded-full bg-peach/60 px-3 py-0.5 text-[11px] font-semibold text-ink/80">
                      {item.badge}
                    </span>
                  </div>

                  {/* Judul & Emoji */}
                  <h3 className="font-display text-lg font-bold text-ink sm:text-xl flex items-center gap-2">
                    <span className="text-2xl select-none">{item.emoji}</span>
                    <span>{item.title}</span>
                  </h3>

                  {/* Placeholder Frame Foto Polaroid jika ada path */}
                  {item.image && (
                    <div className="mt-3 overflow-hidden rounded-2xl border border-peach bg-cream/50 p-2">
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-peach/30 flex items-center justify-center text-ink/40 text-xs">
                        <span>Foto kenangan: {item.title}</span>
                      </div>
                    </div>
                  )}

                  {/* Cerita Kenangan */}
                  <p className="mt-3 text-sm text-ink/85 leading-relaxed sm:text-base">
                    {item.story}
                  </p>

                  {/* Lokasi */}
                  {item.location && (
                    <div className="mt-3.5 flex items-center gap-1.5 text-xs font-medium text-rose/80">
                      <span>📍</span>
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Lanjut ke Section Kuis */}
        <div className="mt-14">
          <a
            href="#quiz"
            className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white/70 px-6 py-2.5 font-display text-sm font-semibold text-rose shadow-sm hover:bg-white hover:shadow transition-all cursor-pointer"
          >
            Ikuti Ujian Kecocokan Kita 🧩 👇
          </a>
        </div>
      </div>
    </section>
  );
}

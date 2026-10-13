"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import { timelineData } from "@/data/timeline";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Langsung tampilkan semua item tanpa animasi
      itemsRef.current.forEach((el) => {
        if (el) el.style.opacity = "1";
      });
      return;
    }

    // Animasi kemunculan kartu dengan IntersectionObserver supaya
    // hanya animate saat kartu masuk viewport (scroll reveal)
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleItems = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLDivElement);

        if (visibleItems.length > 0) {
          animate(visibleItems, {
            opacity: [0, 1],
            translateY: [35, 0],
            delay: stagger(120),
            duration: 650,
            ease: "outQuart",
          });
          visibleItems.forEach((el) => observer.unobserve(el));
        }
      },
      { threshold: 0.12 }
    );

    itemsRef.current.forEach((el) => {
      if (el) {
        el.style.opacity = "0";
        observer.observe(el);
      }
    });

    // Denyut halus dot-pin secara bergiliran (loop)
    const validDots = dotsRef.current.filter(Boolean) as HTMLDivElement[];
    if (validDots.length > 0) {
      animate(validDots, {
        scale: [1, 1.25],
        delay: stagger(220),
        duration: 1100,
        direction: "alternate",
        loop: true,
        ease: "inOutSine",
      });
    }

    return () => observer.disconnect();
  }, []);

  const handleCardEnter = (index: number) => {
    const el = itemsRef.current[index];
    if (el) animate(el, { translateX: 6, scale: 1.01, duration: 220, ease: "outQuad" });
  };

  const handleCardLeave = (index: number) => {
    const el = itemsRef.current[index];
    if (el) animate(el, { translateX: 0, scale: 1, duration: 220, ease: "outQuad" });
  };

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20"
    >
      <div className="w-full max-w-2xl text-center">
        {/* Header */}
        <div className="badge-pill mb-3">JEJAK KISAH KITA 📖</div>

        <h2 className="font-display text-3xl font-bold text-rose sm:text-4xl md:text-5xl">
          Lembaran Cerita &amp; Kenangan
        </h2>

        <p className="mt-2 text-sm text-ink/80 sm:text-base max-w-md mx-auto leading-relaxed">
          Dari orang asing, jadi orang paling penting. Ini beberapa
          cuplikan memori manis (dan konyol) yang selalu bikin tersenyum.
        </p>

        {/* Linimasa Vertikal */}
        <div className="relative mt-12 pl-6 sm:pl-8 text-left">
          {/* Garis vertikal gradient */}
          <div className="absolute left-2.5 sm:left-3.5 top-3 bottom-6 w-0.5 bg-gradient-to-b from-rose via-pink to-peach rounded-full" />

          <div className="flex flex-col gap-8">
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => { itemsRef.current[index] = el; }}
                onMouseEnter={() => handleCardEnter(index)}
                onMouseLeave={() => handleCardLeave(index)}
                className="relative group will-change-transform"
              >
                {/* Dot pin */}
                <div
                  ref={(el) => { dotsRef.current[index] = el; }}
                  className="absolute -left-6 sm:-left-8 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-rose shadow-md will-change-transform"
                >
                  <span className="text-[10px] text-white select-none">❤️</span>
                </div>

                {/* Kartu Kenangan */}
                <div className="card-glass p-5 sm:p-6 transition-shadow hover:shadow-xl">
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

                  {/* Foto dengan next/image — lazy loading otomatis */}
                  {item.image && (
                    <div className="img-polaroid mt-3 aspect-video w-full">
                      <Image
                        src={item.image}
                        alt={`Foto kenangan: ${item.title}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 640px"
                        className="object-cover rounded-xl transition-transform duration-400 group-hover:scale-[1.04]"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZkOWM3Ii8+PC9zdmc+"
                      />
                    </div>
                  )}

                  {/* Placeholder frame saat image belum diisi */}
                  {!item.image && (
                    <div className="mt-3 overflow-hidden rounded-2xl border border-peach bg-cream-deep/60 p-2">
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl flex flex-col items-center justify-center gap-1 animate-shimmer">
                        <span className="text-2xl">📷</span>
                        <span className="text-[11px] text-ink/40">
                          Tambah foto di data/timeline.ts → field image
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Cerita */}
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

        {/* CTA */}
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

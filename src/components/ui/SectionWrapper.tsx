"use client";

import { useRef, useEffect, forwardRef } from "react";
import { animate } from "animejs";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  /** Jika true, animasi masuk hanya dipicu sekali (tidak diulang saat scroll balik). Default: true */
  once?: boolean;
  /** Ambang batas visibilitas untuk IntersectionObserver. Default: 0.15 */
  threshold?: number;
}

/**
 * Wrapper section dengan animasi scroll-reveal konsisten.
 * Saat section masuk viewport, elemen fade-in + slide-up via Anime.js.
 */
const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  function SectionWrapper(
    { id, className = "", children, once = true, threshold = 0.15 },
    forwardedRef
  ) {
    const localRef = useRef<HTMLElement>(null);
    // Gunakan forwardedRef kalau disediakan, jatuh ke localRef
    const sectionRef =
      (forwardedRef as React.RefObject<HTMLElement>) ?? localRef;

    const revealed = useRef(false);

    useEffect(() => {
      const el = sectionRef.current;
      if (!el) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        el.style.opacity = "1";
        return;
      }

      // Set kondisi awal tersembunyi
      el.style.opacity = "0";
      el.style.transform = "translateY(32px)";

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (once && revealed.current) return;
              revealed.current = true;

              animate(el, {
                opacity: [0, 1],
                translateY: [32, 0],
                duration: 600,
                ease: "outQuart",
              });

              if (once) observer.unobserve(el);
            } else if (!once) {
              // Reset saat keluar viewport agar bisa animate lagi
              el.style.opacity = "0";
              el.style.transform = "translateY(32px)";
              revealed.current = false;
            }
          });
        },
        { threshold }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, [once, threshold, sectionRef]);

    return (
      <section
        ref={sectionRef as React.Ref<HTMLElement>}
        id={id}
        className={`w-full ${className}`}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </section>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";
export default SectionWrapper;


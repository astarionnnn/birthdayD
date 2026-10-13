import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface UseScrollRevealOptions {
  /** Ambang visibilitas IntersectionObserver. Default: 0.15 */
  threshold?: number;
  /** Durasi animasi dalam ms. Default: 600 */
  duration?: number;
  /** Delay sebelum animasi mulai, dalam ms. Default: 0 */
  delay?: number;
  /** Offset translateY awal (px). Default: 32 */
  translateYFrom?: number;
  /** Jika true, animasi hanya dipicu sekali. Default: true */
  once?: boolean;
}

/**
 * Hook scroll-reveal: elemen fade-in + slide-up saat masuk viewport.
 *
 * @example
 * const ref = useScrollReveal<HTMLDivElement>();
 * return <div ref={ref}>...</div>;
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: UseScrollRevealOptions = {}
): React.RefObject<T | null> {
  const {
    threshold = 0.15,
    duration = 600,
    delay = 0,
    translateYFrom = 32,
    once = true,
  } = options;

  const ref = useRef<T>(null);
  const revealed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      el.style.opacity = "1";
      return;
    }

    // Kondisi tersembunyi awal
    el.style.opacity = "0";
    el.style.transform = `translateY(${translateYFrom}px)`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && revealed.current) return;
            revealed.current = true;

            animate(el, {
              opacity: [0, 1],
              translateY: [translateYFrom, 0],
              duration,
              delay,
              ease: "outQuart",
            });

            if (once) observer.unobserve(el);
          } else if (!once) {
            el.style.opacity = "0";
            el.style.transform = `translateY(${translateYFrom}px)`;
            revealed.current = false;
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, duration, delay, translateYFrom, once]);

  return ref;
}

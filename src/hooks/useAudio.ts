import { useEffect, useState, useCallback } from "react";
import type { bgmManager as BGMManagerType } from "@/lib/audio";

/**
 * Hook untuk mengontrol background music dan sound effects.
 * Import bgmManager secara dinamis supaya tidak crash di SSR.
 */
export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [manager, setManager] = useState<typeof BGMManagerType | null>(null);

  useEffect(() => {
    // Dynamic import agar tidak crash di server-side render
    let unsubscribe: (() => void) | undefined;

    import("@/lib/audio").then(({ bgmManager }) => {
      setManager(bgmManager);
      bgmManager.init();
      unsubscribe = bgmManager.subscribe((playing) => {
        setIsPlaying(playing);
      });
    });

    return () => {
      unsubscribe?.();
    };
  }, []);

  const play = useCallback(() => {
    manager?.play();
  }, [manager]);

  const pause = useCallback(() => {
    manager?.pause();
  }, [manager]);

  const toggle = useCallback(() => {
    manager?.toggle();
  }, [manager]);

  const playPop = useCallback((level?: number) => {
    import("@/lib/audio").then(({ playPopSound }) => playPopSound(level));
  }, []);

  const playChime = useCallback(() => {
    import("@/lib/audio").then(({ playChimeSound }) => playChimeSound());
  }, []);

  return { isPlaying, play, pause, toggle, playPop, playChime };
}


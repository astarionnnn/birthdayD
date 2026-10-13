"use client";

import { useAudio } from "@/hooks/useAudio";

export default function MusicToggle() {
  const { isPlaying, toggle } = useAudio();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? "Matikan musik latar" : "Nyalakan musik latar"}
      title={isPlaying ? "Musik Aktif (Klik untuk jeda)" : "Nyalakan Musik"}
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 bg-rose/90 text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer select-none"
    >
      {isPlaying ? (
        <span className="relative flex items-center justify-center">
          <span className="text-xl animate-spin" style={{ animationDuration: "3s" }}>
            💿
          </span>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </span>
        </span>
      ) : (
        <span className="text-lg opacity-85">🔇</span>
      )}
    </button>
  );
}


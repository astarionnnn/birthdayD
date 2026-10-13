"use client";

import confetti from "canvas-confetti";
import { siteConfig } from "@/data/site";
import { playChimeSound } from "@/lib/audio";

interface EndingProps {
  onReplay: () => void;
}

export default function Ending({ onReplay }: EndingProps) {
  const handleReplayClick = () => {
    playChimeSound();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    onReplay();
  };

  return (
    <section
      id="ending"
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 text-center"
    >
      <div className="w-full max-w-xl rounded-3xl border-2 border-blush/80 bg-white/90 p-8 shadow-2xl backdrop-blur-md sm:p-12">
        <div className="text-6xl mb-4 select-none animate-bounce">
          🌻💛✨
        </div>

        <div className="inline-block rounded-full bg-peach/70 px-4 py-1 text-xs font-bold uppercase tracking-widest text-rose mb-3">
          UNTUK KAMU SELAMANYA
        </div>

        {/* Teks Spesifikasi Alur 8 */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-rose leading-snug">
          Terima kasih sudah jadi kamu. Sampai jumpa di tahun depan 💛
        </h2>

        <p className="mt-4 text-sm sm:text-base text-ink/80 leading-relaxed max-w-md mx-auto">
          Semoga hari ini berkesan dan senyum manismu terus mekar setiap hari.
          Ingat, ada aku yang selalu mendukung dan menyayangimu di setiap langkah!
        </p>

        <div className="mt-8 pt-6 border-t border-peach/60 flex flex-col items-center gap-3">
          <p className="font-display text-base font-bold text-ink">
            Tertanda, {siteConfig.senderName} ✍️
          </p>
          <p className="text-xs text-ink/50">
            Dibuat dengan segenap cinta • {new Date().getFullYear()}
          </p>
        </div>

        {/* Tombol Replay */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleReplayClick}
            className="w-full sm:w-auto rounded-full bg-rose px-8 py-3.5 font-display text-sm font-bold text-white shadow-xl hover:bg-rose/90 transition-transform active:scale-95 cursor-pointer"
          >
            🔄 Putar Ulang Kejutan Dari Awal
          </button>

          <a
            href="#giftbox"
            className="w-full sm:w-auto rounded-full border border-rose/30 bg-white px-6 py-3 font-display text-xs font-semibold text-rose hover:bg-peach/30 transition-colors cursor-pointer"
          >
            Kembali ke Atas ⬆️
          </a>
        </div>
      </div>
    </section>
  );
}


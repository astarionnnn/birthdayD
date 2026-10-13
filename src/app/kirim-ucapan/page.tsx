"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/data/site";
import AmbientFloating from "@/components/ui/AmbientFloating";

const COLOR_OPTIONS = [
  { id: "bg-amber-100", name: "Kuning Pastel", border: "border-amber-300", tag: "bg-amber-200" },
  { id: "bg-pink-100", name: "Merah Muda", border: "border-pink-300", tag: "bg-pink-200" },
  { id: "bg-emerald-100", name: "Hijau Mint", border: "border-emerald-300", tag: "bg-emerald-200" },
  { id: "bg-sky-100", name: "Biru Langit", border: "border-sky-300", tag: "bg-sky-200" },
  { id: "bg-purple-100", name: "Lavender", border: "border-purple-300", tag: "bg-purple-200" },
];

export default function KirimUcapanPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-amber-100");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Nama kamu belum diisi nih!");
      return;
    }
    if (!message.trim()) {
      setErrorMsg("Tuliskan pesan ucapan doa terbaikmu ya!");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          color: selectedColor,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal mengirim ucapan.");
      }

      setIsSuccess(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ff8fab", "#e5486f", "#ffd9c7", "#48cae4", "#57F695"],
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setMessage("");
    setIsSuccess(false);
    setErrorMsg("");
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-cream via-peach/30 to-cream p-4 sm:p-8 flex flex-col items-center justify-center text-ink">
      <AmbientFloating />

      <div className="relative z-10 w-full max-w-xl">
        <div className="rounded-3xl border border-blush/70 bg-white/90 p-6 shadow-2xl backdrop-blur-md sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block rounded-full bg-peach/70 px-4 py-1 text-xs font-bold uppercase tracking-widest text-rose mb-2">
              KARTU UCAPAN TEMAN & KELUARGA 💌
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-rose">
              Kirim Doa & Pesan untuk {siteConfig.recipientName} 🎂
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-ink/70">
              Pesanmu akan ditempel sebagai *sticky note* kenangan di website ulang tahunnya.
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Nama Pengirim */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-rose mb-1.5">
                  Nama Kamu / Panggilan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={50}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Jessica, Budi kawan SMA, Tante Sari"
                  className="w-full rounded-2xl border-2 border-blush bg-cream/40 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-rose focus:outline-none"
                />
                <span className="block text-right text-[11px] text-ink/50 mt-1">
                  {name.length}/50
                </span>
              </div>

              {/* Isi Pesan */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-rose mb-1.5">
                  Pesan & Doa Ucapan <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  maxLength={300}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan ulang tahun terbaikmu, harapan manis, atau candaan seru..."
                  className="w-full rounded-2xl border-2 border-blush bg-cream/40 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-rose focus:outline-none resize-none"
                />
                <span className="block text-right text-[11px] text-ink/50 mt-1">
                  {message.length}/300
                </span>
              </div>

              {/* Pilihan Warna Sticky Note */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-rose mb-2">
                  Pilih Warna Sticky Note:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedColor(c.id)}
                      className={`flex items-center gap-1.5 rounded-full border-2 px-3.5 py-1.5 text-xs font-semibold cursor-pointer transition-transform ${
                        c.id
                      } ${c.border} ${
                        selectedColor === c.id
                          ? "ring-2 ring-rose scale-105"
                          : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      <span>📌</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview Sticky Note Realtime */}
              <div className="mt-2 rounded-2xl border border-dashed border-peach/80 bg-cream/30 p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50 block mb-2">
                  Pratinjau Sticky Note:
                </span>
                <div
                  className={`rounded-2xl p-4 shadow-md rotate-[-1deg] border border-black/10 transition-colors ${selectedColor}`}
                >
                  <div className="flex items-center justify-between border-b border-black/10 pb-1.5 mb-2">
                    <span className="font-display font-bold text-xs text-ink">
                      {name.trim() || "Nama Kamu"}
                    </span>
                    <span className="text-xs">📌</span>
                  </div>
                  <p className="text-xs text-ink/90 italic leading-relaxed min-h-[36px]">
                    &ldquo;{message.trim() || "Pesan ucapanmu akan tampil di sini..."}&rdquo;
                  </p>
                </div>
              </div>

              {errorMsg && (
                <div className="rounded-xl bg-rose/10 p-3 text-center text-xs font-semibold text-rose">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full rounded-2xl bg-rose py-3.5 font-display text-base font-bold text-white shadow-lg hover:bg-rose/90 transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? "Mengirim Ucapan..." : "Tempel Pesan Ucapan 💌"}
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="text-6xl mb-4 animate-bounce">🎉💌</div>
              <h2 className="font-display text-2xl font-bold text-rose">
                Pesan Berhasil Ditempel!
              </h2>
              <p className="mt-2 text-sm text-ink/80 max-w-sm mx-auto">
                Terima kasih banyak sudah meluangkan waktu mengirim doa dan ucapan manis untuk{" "}
                {siteConfig.recipientName}.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto rounded-full border border-rose/30 bg-white px-6 py-2.5 font-display text-xs font-bold text-rose shadow-sm hover:bg-peach/20 cursor-pointer"
                >
                  Tulis Pesan Lain ✍️
                </button>
                <a
                  href="/"
                  className="w-full sm:w-auto rounded-full bg-rose px-6 py-2.5 font-display text-xs font-bold text-white shadow hover:bg-rose/90 transition-transform active:scale-95 cursor-pointer"
                >
                  Buka Halaman Utama 🎂
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}


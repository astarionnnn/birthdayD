"use client";

import { useEffect, useState, useRef } from "react";
import { animate, stagger } from "animejs";
import Link from "next/link";
import { siteConfig } from "@/data/site";

interface MessageItem {
  id: string;
  name: string;
  message: string;
  color?: string;
  created_at: string;
}

export default function FriendMessages() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<(HTMLDivElement | null)[]>([]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/messages");
      const json = await res.json();
      if (json.success && json.data) {
        setMessages(json.data);
      }
    } catch (e) {
      console.error("Gagal memuat pesan:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const validNotes = notesRef.current.filter(Boolean);
      if (validNotes.length > 0) {
        animate(validNotes, {
          opacity: [0, 1],
          translateY: [25, 0],
          scale: [0.92, 1],
          delay: stagger(80),
          duration: 500,
          ease: "outBack",
        });
      }
    }
  }, [messages]);

  // Rotasi acak deterministik ringan (-3deg s/d 3deg)
  const getRotation = (index: number) => {
    const rots = [-2.5, 1.8, -1.2, 2.8, -3, 1.5, -2, 2.2];
    return rots[index % rots.length];
  };

  return (
    <section
      id="messages"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 text-center"
    >
      <div className="w-full max-w-4xl">
        {/* Header Badge */}
        <div className="inline-block rounded-full bg-peach/70 px-4 py-1 text-xs font-bold uppercase tracking-widest text-rose mb-3">
          UCAPAN & DOA TEMAN 📌
        </div>

        <h2 className="font-display text-3xl font-bold text-rose sm:text-4xl md:text-5xl">
          Papan Pesan Teman & Keluarga
        </h2>

        <p className="mt-2 text-sm text-ink/80 sm:text-base max-w-lg mx-auto">
          Kumpulan doa tulus dan ucapan penuh kehangatan dari orang-orang tersayang untuk{" "}
          {siteConfig.recipientName}.
        </p>

        {/* Tombol Aksi Tambah Pesan */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {/* <Link
            href="/kirim-ucapan"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full bg-rose px-6 py-2.5 font-display text-xs sm:text-sm font-bold text-white shadow-md hover:bg-rose/90 transition-transform active:scale-95 cursor-pointer"
          >
            ✍️ Buka Form /kirim-ucapan (Bagikan ke Teman)
          </Link> */}

          <button
            type="button"
            onClick={fetchMessages}
            className="inline-flex items-center gap-1.5 rounded-full border border-rose/30 bg-white/80 px-4 py-2 font-display text-xs font-semibold text-rose hover:bg-white shadow-sm cursor-pointer"
          >
            🔄 Muat Ulang Pesan
          </button>
        </div>

        {/* Papan Sticky Notes */}
        <div className="mt-12 min-h-[220px]">
          {isLoading && messages.length === 0 ? (
            <div className="py-12 text-sm text-ink/60">
              Sedang mengambil sticky notes ucapan... 📌
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {messages.map((item, index) => {
                const rot = getRotation(index);
                const colorClass = item.color || "bg-amber-100";

                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      notesRef.current[index] = el;
                    }}
                    style={{ transform: `rotate(${rot}deg)` }}
                    className={`relative rounded-2xl p-5 shadow-lg border border-black/10 transition-transform hover:scale-105 hover:z-20 cursor-default ${colorClass}`}
                  >
                    {/* Pin Emojii */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-base select-none">
                      📌
                    </div>

                    {/* Header Pengirim */}
                    <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-2">
                      <h4 className="font-display font-bold text-sm text-ink truncate">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-ink/50">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>

                    {/* Isi Pesan Ucapan */}
                    <p className="text-xs sm:text-sm text-ink/90 font-body leading-relaxed whitespace-pre-wrap">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Tombol Lanjut ke Section Surat Cinta */}
        <div className="mt-16">
          <a
            href="#loveletter"
            className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white/70 px-6 py-2.5 font-display text-sm font-semibold text-rose shadow-sm hover:bg-white hover:shadow transition-all cursor-pointer"
          >
            Buka Surat Spesial Dari Aku 💌 👇
          </a>
        </div>
      </div>
    </section>
  );
}


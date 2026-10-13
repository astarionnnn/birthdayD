"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { couponsData, CouponItem } from "@/data/coupons";
import { playChimeSound, playPopSound } from "@/lib/audio";

export default function Coupons() {
  const [claimedIds, setClaimedIds] = useState<string[]>([]);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState("");

  // Ambil data kupon yang sudah diklaim dari server / localStorage
  useEffect(() => {
    // 1. Muat dari localStorage
    try {
      const saved = localStorage.getItem("birthday_claimed_coupons");
      if (saved) {
        setClaimedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.log(e);
    }

    // 2. Muat dari Supabase API (endpoint baru)
    fetch("/api/coupons")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          const serverIds = json.data
            .filter((c: { isClaimed: boolean; id: string }) => c.isClaimed)
            .map((c: { id: string }) => c.id);
          setClaimedIds((prev) => {
            const merged = Array.from(new Set([...prev, ...serverIds]));
            localStorage.setItem("birthday_claimed_coupons", JSON.stringify(merged));
            return merged;
          });
        }
      })
      .catch((err) => console.log("Coupon fetch error:", err));
  }, []);

  const regularCoupons = couponsData.filter((c) => !c.isSecret);
  const secretCoupon = couponsData.find((c) => c.isSecret);

  // Kupon rahasia terbuka jika SEMUA kupon reguler sudah diklaim
  const isSecretUnlocked = regularCoupons.every((c) => claimedIds.includes(c.id));

  const handleClaim = async (coupon: CouponItem) => {
    if (claimedIds.includes(coupon.id) || claimingId) return;

    setClaimingId(coupon.id);
    playPopSound(2);

    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          couponId: coupon.id,
          couponTitle: coupon.title,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal mengklaim kupon.");
      }

      playChimeSound();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#ff8fab", "#e5486f", "#ffd9c7", "#48cae4", "#57F695"],
      });

      const nextClaimed = Array.from(new Set([...claimedIds, coupon.id]));
      setClaimedIds(nextClaimed);
      localStorage.setItem("birthday_claimed_coupons", JSON.stringify(nextClaimed));

      setToastMsg(`Kupon "${coupon.title}" berhasil diklaim & terkirim ke Telegram! 🎟️📲`);
      setTimeout(() => setToastMsg(""), 4500);
    } catch (err) {
      console.error("Gagal klaim kupon:", err);
      // Fallback lokal jika offline
      const nextClaimed = Array.from(new Set([...claimedIds, coupon.id]));
      setClaimedIds(nextClaimed);
      localStorage.setItem("birthday_claimed_coupons", JSON.stringify(nextClaimed));
      setToastMsg(`Kupon "${coupon.title}" berhasil diklaim secara lokal! 🎟️`);
      setTimeout(() => setToastMsg(""), 4500);
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <section
      id="coupons"
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 text-center"
    >
      <div className="w-full max-w-4xl">
        {/* Header Badge */}
        <div className="inline-block rounded-full bg-peach/70 px-4 py-1 text-xs font-bold uppercase tracking-widest text-rose mb-3">
          VOUCHER SPESIAL 🎟️
        </div>

        <h2 className="font-display text-3xl font-bold text-rose sm:text-4xl md:text-5xl">
          Kupon Cinta & Hadiah
        </h2>

        <p className="mt-2 text-sm text-ink/80 sm:text-base max-w-lg mx-auto">
          Setiap kupon hanya bisa diklaim 1x dan akan langsung ternotifikasi ke Telegramku.
          Klaim semuanya untuk membuka Kupon Rahasia!
        </p>

        {/* Status Progres Klaim */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blush bg-white/80 px-4 py-1.5 text-xs font-bold text-rose shadow-sm">
          <span>Kupon Terklaim:</span>
          <span>
            {claimedIds.filter((id) => id !== "coupon-secret").length} / {regularCoupons.length}
          </span>
          {isSecretUnlocked && <span>• 👑 KUPON RAHASIA TERBUKA!</span>}
        </div>

        {/* Notifikasi Toast */}
        {toastMsg && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-rose px-6 py-3 font-display text-xs sm:text-sm font-bold text-white shadow-2xl animate-bounce">
            {toastMsg}
          </div>
        )}

        {/* Grid Kupon Reguler */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {regularCoupons.map((coupon) => {
            const isClaimed = claimedIds.includes(coupon.id);
            const isBusy = claimingId === coupon.id;

            return (
              <div
                key={coupon.id}
                className={`relative flex flex-col justify-between rounded-3xl border-2 p-5 shadow-md transition-all ${
                  isClaimed
                    ? "border-emerald-300 bg-emerald-50/70 opacity-90"
                    : "border-blush/80 bg-white/90 hover:shadow-xl hover:scale-[1.02]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl select-none">{coupon.icon}</span>
                    <span className="rounded-full bg-peach/60 px-2.5 py-0.5 text-[10px] font-bold text-rose">
                      {coupon.code}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-ink">
                    {coupon.title}
                  </h3>

                  <p className="mt-2 text-xs text-ink/80 leading-relaxed">
                    {coupon.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-peach/50 pt-3">
                  <span className="text-[11px] text-ink/60 block italic">
                    ℹ️ {coupon.terms}
                  </span>
                  {coupon.expiresNote && (
                    <span className="text-[10px] text-rose/60 block mt-1 italic">
                      ⏳ {coupon.expiresNote}
                    </span>
                  )}

                  <button
                    type="button"
                    disabled={isClaimed || isBusy}
                    onClick={() => handleClaim(coupon)}
                    className={`w-full rounded-2xl py-2.5 font-display text-xs font-bold transition-transform active:scale-95 cursor-pointer disabled:cursor-not-allowed ${
                      isClaimed
                        ? "bg-emerald-600 text-white cursor-default"
                        : "bg-rose text-white shadow-md hover:bg-rose/90"
                    }`}
                  >
                    {isClaimed
                      ? "Terklaim ✅"
                      : isBusy
                      ? "Mengirim Notif... 📲"
                      : "Klaim Kupon Ini 🎁"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kupon Rahasia (Secret Coupon) */}
        {secretCoupon && (
          <div className="mt-10">
            <div
              className={`relative overflow-hidden rounded-3xl border-2 p-6 sm:p-8 text-center transition-all ${
                isSecretUnlocked
                  ? "border-amber-400 bg-gradient-to-r from-amber-100 via-rose/10 to-amber-100 shadow-2xl animate-pulse"
                  : "border-gray-300 bg-gray-100/80 opacity-70"
              }`}
            >
              <div className="text-5xl mb-2">
                {isSecretUnlocked ? "👑💍✨" : "🔒"}
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-rose">
                {isSecretUnlocked
                  ? secretCoupon.title
                  : "Kupon Rahasia Terkunci 🔒"}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-ink/80 max-w-md mx-auto">
                {isSecretUnlocked
                  ? secretCoupon.description
                  : "Klaim seluruh kupon di atas terlebih dahulu untuk membuka hadiah teristimewa ini!"}
              </p>

              {isSecretUnlocked && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    disabled={claimedIds.includes(secretCoupon.id)}
                    onClick={() => handleClaim(secretCoupon)}
                    className="rounded-full bg-gradient-to-r from-rose to-amber-500 px-8 py-3.5 font-display text-sm font-bold text-white shadow-xl hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-60"
                  >
                    {claimedIds.includes(secretCoupon.id)
                      ? "Kupon Rahasia Terklaim! 💖✅"
                      : "KLAIM KUPON RAHASIA SEKARANG! 💍✨"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tombol Lanjut ke Section Ending */}
        <div className="mt-16">
          <a
            href="#ending"
            className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white/70 px-6 py-2.5 font-display text-sm font-semibold text-rose shadow-sm hover:bg-white hover:shadow transition-all cursor-pointer"
          >
            Lihat Pesan Penutup 💛 👇
          </a>
        </div>
      </div>
    </section>
  );
}


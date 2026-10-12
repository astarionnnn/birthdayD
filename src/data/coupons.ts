// Konten untuk Kupon Cinta (Coupons).
// Disiapkan untuk Tahap 4. Bagian bertanda [GANTI] bisa disesuaikan.

export interface CouponItem {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  terms: string;
}

export const couponsData: CouponItem[] = [
  {
    id: "coupon-1",
    code: "PIJAT-30M",
    title: "Kupon Pijit Bahu 30 Menit 💆‍♀️", // [GANTI]
    description: "Berlaku kapan pun saat kamu ngerasa pegal atau capek setelah beraktivitas seharian.", // [GANTI]
    icon: "✨",
    terms: "Bisa diklaim langsung tanpa syarat!", // [GANTI]
  },
  {
    id: "coupon-2",
    code: "BEBAS-NGAMBEK",
    title: "Kupon Bebas Ngambek 1 Hari Penuh 😇", // [GANTI]
    description: "Aku wajib sabar, nurut, dan gak boleh bales ngambek seharian.", // [GANTI]
    icon: "🕊️",
    terms: "Hanya berlaku 1x pakai ya!", // [GANTI]
  },
  {
    id: "coupon-3",
    code: "TRAKTIR-JAJAN",
    title: "Kupon Traktir Makanan Apapun 🍜", // [GANTI]
    description: "Pilih menu apa aja yang lagi kamu pengenin, aku yang bayar tanpa tapi!", // [GANTI]
    icon: "🍕",
    terms: "Wajib dihabiskan berdua!", // [GANTI]
  },
];


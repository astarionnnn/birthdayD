// Konten untuk Section Coupons (6-8 kupon klaim + 1 kupon rahasia).
// Status klaim disimpan di Supabase, mengirim notifikasi Telegram ke pengirim saat diklaim.

export interface CouponItem {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  terms: string;
  isSecret?: boolean;
  expiresNote?: string; // Catatan masa berlaku informal & konyol — opsional
}

export const couponsData: CouponItem[] = [
  {
    id: "coupon-1",
    code: "PIJAT-BAHU",
    title: "Kupon Pijit Bahu 30 Menit 💆‍♀️", // [GANTI]
    description: "Berlaku kapan pun saat kamu ngerasa pegal atau capek setelah seharian beraktivitas.", // [GANTI]
    icon: "💆‍♀️",
    terms: "Bisa diklaim langsung tanpa syarat!", // [GANTI]
    expiresNote: "Kadaluarsa: Tidak pernah (janji!)", // [GANTI]
  },
  {
    id: "coupon-2",
    code: "BEBAS-NGAMBEK",
    title: "Kupon Bebas Ngambek Seharian 😇", // [GANTI]
    description: "Bebas ngambek satu hari aja si ya gausa lama lamaaa.", // [GANTI]
    icon: "🕊️",
    terms: "Masa berlaku 24 jam sejak klaim!", // [GANTI]
    expiresNote: "Berlaku selama masih ada rasa sayang (selamanya)", // [GANTI]
  },
  {
    id: "coupon-3",
    code: "TRAKTIR-JAJAN",
    title: "Kupon Traktir Kuliner Bebas 🍜", // [GANTI]
    description: "Ayoo kita kulineran apapun yang kamu mau akuu juga mau!", // [GANTI]
    icon: "🍕",
    terms: "Wajib dihabiskan berdua ya!", // [GANTI]
    expiresNote: "Berlaku sampai dompetku ada isinya (alias selamanya 😅)", // [GANTI]
  },
  {
    id: "coupon-4",
    code: "NONTON-FILM",
    title: "Kupon Penentu Film Kencan 🎬", // [GANTI]
    description: "Kamu bebas memilih film apa saja untuk ditonton bareng tanpa perdebatan.", // [GANTI]
    icon: "🍿",
    terms: "Lengkap dengan popcorn & camilan!", // [GANTI]
    expiresNote: "Tidak kadaluarsa, tapi makin lama makin sayang diklaim 😋", // [GANTI]
  },
  {
    id: "coupon-5",
    code: "PELUKAN-DARURAT",
    title: "Kupon Pelukan Hangat Tanpa Batas 🤗", // [GANTI]
    description: "Boleh minta dipeluk kapan pun saat butuh ketenangan atau tempat bersandar.", // [GANTI]
    icon: "🧸",
    terms: "Berlaku seumur hidup!", // [GANTI]
    expiresNote: "Kadaluarsa: Tidak pernah. Garansi resmi dari hati 💛", // [GANTI]
  },
  {
    id: "coupon-6",
    code: "ANTAR-JEMPUT",
    title: "Kupon Supir Pribadi Siaga 🚗", // [GANTI]
    description: "Layanan antar jemput ke mana pun dengan senyum ramah, sementara pake motor dulu soon pake jet.", // [GANTI]
    icon: "🚘",
    terms: "Cukup kabari 30 menit sebelumnya!", // [GANTI]
    expiresNote: "Berlaku selama SIM-ku masih aktif (duh dah ga aktif lagi wkwk)", // [GANTI]
  },
  {
    id: "coupon-7",
    code: "SATU-PERMINTAAN",
    title: "Kupon Permintaan Bebas (Genie Wish) 🧞‍♂️", // [GANTI]
    description: "Satu permintaan bebas apa saja selama masih dalam batas wajar", // [GANTI]
    icon: "✨",
    terms: "Gunakan dengan bijak!", // [GANTI]
    expiresNote: "Hati-hati dipakai, stoknya cuma 1 — tapi rasa sayangnya unlimited 🌈", // [GANTI]
  },
  // KUPON RAHASIA (Baru terbuka setelah semua kupon di atas diklaim)
  {
    id: "coupon-secret",
    code: "SECRET-ULTIMATE",
    title: "KUPON RAHASIA: Sayang Selamanya 👑💍", // [GANTI]
    description:
      "Kupon pamungkas! Janji untuk selalu menjaga, menemani, dan membahagiakanmu di setiap fase kehidupan.", // [GANTI]
    icon: "💖",
    terms: "Hanya terbuka setelah kamu mengklaim semua kupon lainnya!", // [GANTI]
    expiresNote: "Berlaku selamanya, tanpa pengecualian, tanpa syarat 💍", // [GANTI]
    isSecret: true,
  },
];

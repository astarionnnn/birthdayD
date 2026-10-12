// Konten untuk Section RunawayButton (Tombol Jahil yang Kabur).
// Ubah bagian bertanda [GANTI] dengan pertanyaan dan gombalan versimu.

export interface RunawayConfig {
  badge: string;
  title: string;
  subtitle: string;
  yesButtonText: string;
  noButtonText: string;
  taunts: string[];
  successTitle: string;
  successMessage: string;
}

export const runawayConfig: RunawayConfig = {
  badge: "PERTANYAAN PENTING 🚨", // [GANTI]
  title: "Pertanyaan Paling Krusial Hari Ini!", // [GANTI]
  subtitle: "Jawab dengan jujur dari lubuk hati yang paling dalam ya... 😉", // [GANTI]
  yesButtonText: "Sayang Banget Selamanya! 🥰💖", // [GANTI]
  noButtonText: "Nggak Dulu Deh 😜", // [GANTI]
  taunts: [
    "Eits! Gak kena, coba lagi! 😜", // [GANTI]
    "Tombol ini menolak dipencet! 🙅‍♀️", // [GANTI]
    "Jangan coba-coba kabur dari kenyataan ya! 🏃‍♂️💨", // [GANTI]
    "Masa gak sayang? Pencet yang hijau dong! 🥺", // [GANTI]
    "Hayo mau ngeklik kemana? Gabisa wlee 😝", // [GANTI]
    "Tombol ini auto-dodge level dewa! 🛡️", // [GANTI]
  ],
  successTitle: "Tuh Kan! Emang Gak Bisa Nolak! 🥳🎉", // [GANTI]
  successMessage:
    "Pilihan yang sangat bijak dan tepat 1000%! Mulai detik ini, kamu resmi terikat untuk disayang lebih banyak lagi setiap hari. Gak ada jalan keluar lagi ya! 💛✨", // [GANTI]
};


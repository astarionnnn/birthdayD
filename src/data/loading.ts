// Daftar pesan kocak & romantis saat FunLoading berlangsung.
// Bagian bertanda [GANTI] bisa disesuaikan dengan cerita/humor kalian berdua.

export interface LoadingStep {
  message: string;
  icon: string;
}

export const loadingMessages: LoadingStep[] = [
  {
    message: "Menghubungi satelit cinta untuk otorisasi akses... 🛰️", // [GANTI]
    icon: "📡",
  },
  {
    message: "Mengukur tingkat kegemasan hari ini... (Error: Overload 9999%!) 🥰", // [GANTI]
    icon: "💖",
  },
  {
    message: "Memanaskan oven virtual dan memanggang kue tart kesukaanmu... 🎂", // [GANTI]
    icon: "🍰",
  },
  {
    message: "Menyortir ribuan alasan kenapa kamu manusia paling gemesin... 📜", // [GANTI]
    icon: "✨",
  },
  {
    message: "Menyiapkan seember confetti dan pelukan paling erat... 🎉", // [GANTI]
    icon: "🎁",
  },
  {
    message: "Pintu kejutan hampir terbuka! Tarik napas dalam-dalam ya... 🥳", // [GANTI]
    icon: "🔓",
  },
];


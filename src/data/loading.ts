// Daftar pesan kocak & romantis saat FunLoading berlangsung.
// Ada 7 step loading — sesuaikan nada & isi pesan jika mau bertanda [GANTI].

export interface LoadingStep {
  message: string;
  icon: string;
}

export const loadingMessages: LoadingStep[] = [
  {
    message: "Memuat kenangan yang sudah terlipat rapi di sudut hati...", // [GANTI]
    icon: "💭",
  },
  {
    message: "Menghitung seberapa sayang aku... ERROR 404: Angka Tidak Ditemukan, terlalu besar 💘", // [GANTI]
    icon: "📈",
  },
  {
    message: "Membangunkan kupu-kupu di perut buat tampil lagi...", // [GANTI]
    icon: "🦋",
  },
  {
    message: "Memasang lampu hias dan glitter di setiap sudut halaman...", // [GANTI]
    icon: "✨",
  },
  {
    message: "Meminta izin ke bintang-bintang untuk meminjam cahayanya sebentar ⭐", // [GANTI]
    icon: "🌟",
  },
  {
    message: "Menyiapkan kejutan terakhir yang paling manis...", // [GANTI]
    icon: "🎂",
  },
  {
    message: "SELESAI! Bersiap ya, ini dia! 🥳", // [GANTI]
    icon: "🎉",
  },
];

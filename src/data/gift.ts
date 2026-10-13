// Konten untuk Section GiftBox (Kado Kejutan Virtual).
// Ubah bagian bertanda [GANTI] dengan doa dan hadiah versimu.

export interface WishItem {
  id: string;
  emoji: string;
  title: string;
  desc: string;
}

export interface GiftConfig {
  badge: string;
  boxTitle: string;
  boxSubtitle: string;
  tapHint: string;
  openedTitle: string;
  openedGreeting: string;
  mainMessage: string;
  wishes: WishItem[];
  physicalGiftHint: string;
}

export const giftConfig: GiftConfig = {
  badge: "KADO SPESIAL 🎁", // [GANTI]
  boxTitle: "Ada Paket Spesial Buat Kamu!", // [GANTI]
  boxSubtitle: "Khusus untuk yang hari ini lagi nambah umur jadi makin cakep & gemesin.", // [GANTI]
  tapHint: "Ketuk kotak kado di bawah untuk membukanya! ✨", // [GANTI]
  openedTitle: "SELAMAT ULANG TAHUN! 🥳🎂", // [GANTI]
  openedGreeting: "Horeee! Kado virtualnya berhasil dibuka! 🎉", // [GANTI]
  mainMessage:
    "Mungkin kado ini gak bisa langsung dibungkus pakai kertas kado berkilau, tapi semua doa terbaik, rasa sayang tulus, dan janji buat selalu ada di sampingmu ada di sini.", // [GANTI]
  wishes: [
    {
      id: "wish-1",
      emoji: "🥗", // [GANTI]
      title: "Sehat & Bahagia Selalu", // [GANTI]
      desc: "Semoga gak gampang masuk angin, makannya teratur, dan senyum terus tiap hari!", // [GANTI]
    },
    {
      id: "wish-2",
      emoji: "💸", // [GANTI]
      title: "Rezeki & Karier Mengalir Deras", // [GANTI]
      desc: "Biar wishlist belanjaannya checkout semua tanpa mikir dua kali!", // [GANTI]
    },
    {
      id: "wish-3",
      emoji: "🧘‍♀️", // [GANTI]
      title: "Bebas dari Overthinking", // [GANTI]
      desc: "Kalau lagi pusing atau capek, ingat selalu ada aku yang siap jadi tempat bersandar.", // [GANTI]
    },
    {
      id: "wish-4",
      emoji: "👩‍❤️‍👨", // [GANTI]
      title: "Makin Langgeng & Kompak", // [GANTI]
      desc: "Tetep jadi tim terbaik aku dalam berburu kuliner enak dan obrolan random tengah malam.", // [GANTI]
    },
    {
      id: "wish-5",
      emoji: "🌟", // [GANTI]
      title: "Mimpi yang Terus Bertumbuh", // [GANTI]
      desc: "Semoga setiap mimpi dan rencana yang kamu punya bisa terwujud satu per satu, dan aku bisa jadi bagian dari perjalanannya.", // [GANTI]
    },
  ],
  physicalGiftHint:
    "P.S. Kado aslinya coba cek di dekat kamu sekarang atau tanyakan langsung ke pengirimnya ya! 🤫📦", // [GANTI]
};

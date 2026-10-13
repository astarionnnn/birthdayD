// Konten untuk Section Timeline (6-8 momen kenangan bersama).
// Ganti foto, tanggal, dan cerita 1-2 kalimat bertanda [GANTI] sesuai kisah kalian berdua.
// Untuk field `image`: salin foto ke folder public/images/timeline/ lalu ganti path-nya.

export interface TimelineItem {
  id: string;
  date: string;
  badge: string;
  title: string;
  story: string;
  emoji: string;
  image?: string; // Path ke public/images/timeline/... atau kosongkan untuk frame placeholder
  location?: string;
}

export const timelineData: TimelineItem[] = [
  {
    id: "momen-1",
    date: "26 Juni 2025", // [GANTI]
    badge: "PDKT-PDKT", // [GANTI]
    emoji: "👀",
    title: "Awal perjalanan", // [GANTI]
    story:
      "Awalnya saling tatap canggung dan pasang muka jutek. Siapa sangka orang asing ini sekarang jadi rumah ternyaman buat pulang.", // [GANTI]
    location: "Jalan Sambo, Kalimantan", // [GANTI]
    image: "/images/timeline/foto-1.jpeg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
  },
  {
    id: "momen-2",
    date: "23 Agustus 2025", // [GANTI]
    badge: "Gelex Date(?)", // [GANTI]
    emoji: "🥤",
    title: "Kita melakukan Date tapi Gelex", // [GANTI]
    story:
      "Bisa dilihat, wajah wajah after dari kalimantan yang satu gelap yang satu abu abu wkwkw.", // [GANTI]
    location: "GSP", // [GANTI]
    image: "/images/timeline/foto-2.jpeg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
  },
  {
    id: "momen-3",
    date: "22 Oktober 2025", // [GANTI]
    badge: "First Photobox", // [GANTI]
    emoji: "🛵",
    title: "Photobox pertama kita nichhh", // [GANTI]
    story:
      "Aslinya si cuma mau ngemall yak, tapi coba deh kok menarik", // [GANTI]
    image: "/images/timeline/foto-3.jpeg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
  },
  {
    id: "momen-4",
    date: "14 Oktober 2025", // [GANTI]
    badge: "Divya Days", // [GANTI]
    emoji: "🌅🎂",
    title: "Harinya Divya Artha Zeinia ku", // [GANTI]
    story:
      "Setahun yang lalu, dan sekarang kembali lagi di tanggal 14 Oktober itu, Selamat Ulang Tahun Sayangg!", // [GANTI]
    image: "/images/timeline/foto-4.jpeg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
  },
  {
    id: "momen-5",
    date: "00 Random 2026", // [GANTI]
    badge: "Random Selfie", // [GANTI]
    emoji: "🌅",
    title: "Satu Tahun Perjalanan Cerita Kita", // [GANTI]
    story:
      "Memilih foto ini karena kamu cakep banget disinii buset gakuat aku pingsan", // [GANTI]
    location: "Semua tempat", // [GANTI]
    image: "/images/timeline/foto-5.jpeg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
  },
  {
    id: "momen-6",
    date: "11 Juni 2026", // [GANTI]
    badge: "Couple Days", // [GANTI]
    emoji: "🍲",
    title: "Kita terlalu lucu", // [GANTI]
    story:
      "Lucu banget sii couple couple gini, beso kita cari couple yang banyak lagi sayangg", // [GANTI]
    image: "/images/timeline/foto-6.jpeg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
  },
  {
    id: "momen-7",
    date: "Hari Ini & Seterusnya", // [GANTI]
    badge: "Hari Spesial", // [GANTI]
    emoji: "👑",
    title: "Selamat Ulang Tahun Kesayanganku!", // [GANTI]
    story:
      "Sekarang kamu bertambah usia satu tahun lagi. Tetap jadi sosok yang ceria, sehat selalu, dan mari buat ribuan kenangan baru lagi.", // [GANTI]
    location: "Di Hatiku Selamanya ❤️", // [GANTI]
    image: "/images/timeline/foto-7.jpeg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
  },
];

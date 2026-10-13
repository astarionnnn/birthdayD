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
    date: "14 Februari 2023", // [GANTI]
    badge: "Momen Awal", // [GANTI]
    emoji: "👀",
    title: "Hari Pertama Bertemu", // [GANTI]
    story:
      "Awalnya saling tatap canggung dan pasang muka jutek. Siapa sangka orang asing ini sekarang jadi rumah ternyaman buat pulang.", // [GANTI]
    location: "Sudut Kafe Kota", // [GANTI]
    image: "/images/timeline/foto-1.jpg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
  },
  {
    id: "momen-2",
    date: "25 Maret 2023", // [GANTI]
    badge: "First Date", // [GANTI]
    emoji: "🥤",
    title: "Kencan Pertama yang Penuh Grogi", // [GANTI]
    story:
      "Tanganku gemeteran sampai es teh tumpah di meja. Kamu malah ketawa manis banget dan bilang 'santai aja kali!'.", // [GANTI]
    location: "Tempat Makan Favorit", // [GANTI]
    image: "/images/timeline/foto-2.jpg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
  },
  {
    id: "momen-3",
    date: "10 Agustus 2023", // [GANTI]
    badge: "Momen Konyol", // [GANTI]
    emoji: "🛵",
    title: "Kehujanan Bareng di Emperan Toko", // [GANTI]
    story:
      "Sepatu basah kuyup karena jas hujan cuma satu. Tapi makan semangkuk mie instan panas berdua rasanya seru banget.", // [GANTI]
    location: "Depan Minimarket Pinggir Jalan", // [GANTI]
    image: "/images/timeline/foto-3.jpg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
  },
  {
    id: "momen-4",
    date: "24 Desember 2023", // [GANTI]
    badge: "Liburan Berdua", // [GANTI]
    emoji: "🌅",
    title: "Nyasar Bareng yang Berujung Indah", // [GANTI]
    story:
      "GPS ngaco sampai muter ke jalan buntu di puncak bukit. Bonusnya kita dapat pemandangan matahari terbenam paling cantik.", // [GANTI]
    location: "Bukit Angin Sejuk", // [GANTI]
    image: "/images/timeline/foto-4.jpg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
  },
  {
    id: "momen-5",
    date: "14 Februari 2024", // [GANTI]
    badge: "Anniversary", // [GANTI]
    emoji: "🎂",
    title: "Satu Tahun Perjalanan Cerita Kita", // [GANTI]
    story:
      "Merayakan 365 hari penuh tawa, obrolan larut malam, dan drama kecil yang selalu berakhir dengan pelukan hangat.", // [GANTI]
    location: "Taman Kota", // [GANTI]
    image: "/images/timeline/foto-5.jpg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
  },
  {
    id: "momen-6",
    date: "20 Juli 2024", // [GANTI]
    badge: "Hari Biasa yang Hangat", // [GANTI]
    emoji: "🍲",
    title: "Misi Berburu Kuliner Tengah Malam", // [GANTI]
    story:
      "Tiba-tiba lapar jam 11 malam dan keliling cari martabak manis. Hal sederhana yang selalu bikin bahagia saat bersamamu.", // [GANTI]
    location: "Kedai Kaki Lima", // [GANTI]
    image: "/images/timeline/foto-6.jpg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
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
    image: "/images/timeline/foto-7.jpg", // [GANTI] ganti dengan nama file foto kamu (taruh di public/images/timeline/)
  },
];

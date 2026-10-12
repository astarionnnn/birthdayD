// Konten untuk Section Timeline (Linimasa Kenangan Bersama).
// Ganti foto, tanggal, dan cerita lucu/romantis di bawah sesuai kisah kalian berdua.

export interface TimelineItem {
  id: string;
  date: string;
  badge: string;
  title: string;
  story: string;
  emoji: string;
  image?: string; // Path ke public/images/timeline/... atau kosongkan untuk icon emoji
  location?: string;
}

export const timelineData: TimelineItem[] = [
  {
    id: "momen-1",
    date: "14 Februari 2023", // [GANTI]
    badge: "Momen Awal", // [GANTI]
    emoji: "👀",
    title: "Hari Pertama Bertemu / Kenalan", // [GANTI]
    story:
      "Waktu pertama kali papasan, kamu masih pasang muka jutek tapi entah kenapa malah kelihatan lucu banget. Dari situ aku yakin: orang ini bakal bikin hidupku jauh lebih rame!", // [GANTI]
    location: "Kafe Sudut Kota", // [GANTI]
  },
  {
    id: "momen-2",
    date: "25 Maret 2023", // [GANTI]
    badge: "First Date", // [GANTI]
    emoji: "🥤",
    title: "Kencan Pertama yang Penuh Grogi", // [GANTI]
    story:
      "Ingat gak pas es tehnya tumpah karena tanganku gemeteran? Kamu bukannya ilfeel malah ketawa lepas sampai matanya menyipit. Itu detik pertama aku jatuh hati sedalam ini.", // [GANTI]
    location: "Tempat Makan Favorit", // [GANTI]
  },
  {
    id: "momen-3",
    date: "10 November 2023", // [GANTI]
    badge: "Momen Konyol", // [GANTI]
    emoji: "🛵",
    title: "Kehujanan Bareng & Neduh di Emperan", // [GANTI]
    story:
      "Jas hujan cuma satu, sepatu basah kuyup, tapi kita malah makan mie instan panas sambil ketawa-tawa kedinginan. Bikin sadar kalau sama orang yang tepat, apes pun rasanya seru.", // [GANTI]
    location: "Depan Minimarket Pinggir Jalan", // [GANTI]
  },
  {
    id: "momen-4",
    date: "1 Januari 2024", // [GANTI]
    badge: "Trip Bareng", // [GANTI]
    emoji: "🌅",
    title: "Nyasar Bareng tapi Pemandangannya Indah", // [GANTI]
    story:
      "Google Maps-nya ngaco sampai kita muter-muter ke jalan buntu, tapi bonusnya dapet sunset paling cantik berdua tanpa ada orang lain. Momen sederhana yang gak pernah kulupakan.", // [GANTI]
    location: "Bukit Puncak", // [GANTI]
  },
  {
    id: "momen-5",
    date: "Hari Ini & Seterusnya", // [GANTI]
    badge: "Hari Spesial", // [GANTI]
    emoji: "👑",
    title: "Kamu yang Makin Dewasa & Paling Kusayang", // [GANTI]
    story:
      "Dan sekarang kita sampai di hari ulang tahunmu! Terima kasih sudah tumbuh begitu hebat. Semoga lembaran cerita kita ke depan makin banyak petualangan seru dan tawa bahagia.", // [GANTI]
    location: "Di Hatiku Selamanya ❤️", // [GANTI]
  },
];


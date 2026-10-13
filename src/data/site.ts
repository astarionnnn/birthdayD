// Konfigurasi utama website kejutan.
// Ubah bagian bertanda [GANTI] sebelum deploy.

export interface SiteConfig {
  recipientName: string;
  senderName: string;
  birthday: string;
  anniversaryDate?: string;
  siteUrl: string;
  gatePasscode: string;
  gateHint: string;
  ogTitle: string;
  ogDescription: string;
}

export const siteConfig: SiteConfig = {
  recipientName: "Divya", // [GANTI] nama dia (yang akan muncul di mana-mana)
  senderName: "Daffa Maulana Putra.", // [GANTI] nama/sebutan kamu buat diri sendiri
  birthday: "2003-10-14", // [GANTI] format YYYY-MM-DD tanggal ulang tahun dia
  anniversaryDate: "2025-10-15", // [GANTI] format YYYY-MM-DD tanggal jadian / tanggal spesial pertama
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  gatePasscode: "1510", // [GANTI] PIN rahasia untuk membuka gate (misal: 4 digit tanggal lahir "2512" atau kode jadian)
  gateHint: "Clue: 4 angka rahasia (tanggal spesial kita ya! 😉)", // [GANTI] petunjuk sandi buat si penerima
  ogTitle: "Ada Kejutan Spesial Buat Divya 🎂💖", // [GANTI] judul Open Graph — ganti nama di sini juga
  ogDescription: "Buka pelan-pelan ya, ada sesuatu yang sudah disiapkan dengan sepenuh hati untukmu ❤️", // [GANTI] deskripsi singkat yang muncul saat link dibagikan
};

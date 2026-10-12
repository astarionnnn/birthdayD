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
}

export const siteConfig: SiteConfig = {
  recipientName: "Sayang", // [GANTI] nama panggilan dia (contoh: "Alya", "Beby", "Bubu")
  senderName: "Aku yang Paling Beruntung", // [GANTI] nama kamu (contoh: "Rian", "Mas Pacar")
  birthday: "2026-12-31", // [GANTI] format YYYY-MM-DD tanggal ulang tahun dia
  anniversaryDate: "2023-08-17", // [GANTI] format YYYY-MM-DD tanggal jadian / tanggal spesial pertama
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  gatePasscode: "1510", // [GANTI] PIN rahasia untuk membuka gate (misal: 4 digit tanggal lahir "2512" atau kode jadian)
  gateHint: "Clue: 4 angka rahasia (tanggal spesial kita ya! 😉)", // [GANTI] petunjuk sandi
};

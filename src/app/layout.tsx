import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { siteConfig } from "@/data/site";
import "./globals.css";

/* ─── Font ───────────────────────────────────────────────────────────────── */
const display = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const body = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* ─── Metadata & OG ─────────────────────────────────────────────────────── */
const pageTitle   = siteConfig.ogTitle   ?? `Untuk ${siteConfig.recipientName} 🎂💛`;
const pageDesc    = siteConfig.ogDescription ?? "Ada kejutan kecil yang sudah disiapkan dengan sepenuh hati. Buka pelan-pelan ya 💛";
const siteUrl     = siteConfig.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: pageTitle,
  description: pageDesc,

  /* ── Favicon: emoji 🎂 via SVG data URI (tampil di semua browser modern) */
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎂</text></svg>",
    shortcut: "/favicon.ico",         // fallback untuk browser lama
    apple: "/apple-touch-icon.png",   // opsional, tambah file 180x180 di /public
  },

  /* ── Open Graph — preview link WhatsApp / iMessage / Telegram */
  openGraph: {
    title:       pageTitle,
    description: pageDesc,
    type:        "website",
    locale:      "id_ID",
    url:         siteUrl,
    siteName:    `Kejutan untuk ${siteConfig.recipientName}`,
    /**
     * Aktifkan setelah menambah file public/og.png (1200×630 px).
     * WhatsApp membutuhkan gambar ≥ 300×200 px agar muncul thumbnail.
     * Buat di Canva/Figma dengan tulisan dan foto lucu kalian.
     */
    images: [
      {
        url:    "/og.png",
        width:  1200,
        height: 630,
        alt:    `Kejutan ulang tahun untuk ${siteConfig.recipientName} 🎂`,
      },
    ],
  },

  /* ── Twitter / X Card (opsional, support di beberapa platform) */
  twitter: {
    card:        "summary_large_image",
    title:       pageTitle,
    description: pageDesc,
    images:      ["/og.png"],
  },

  /* ── Jangan masuk indeks mesin pencari (website pribadi) */
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width:       "device-width",
  initialScale: 1,
  viewportFit: "cover",          // safe-area di HP layar penuh
  themeColor:  [
    { media: "(prefers-color-scheme: light)", color: "#fff7f0" },
    { media: "(prefers-color-scheme: dark)",  color: "#4a2c3a" },
  ],
};

/* ─── Root Layout ────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}

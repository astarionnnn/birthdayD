import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { siteConfig } from "@/data/site";
import "./globals.css";

const display = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const body = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const title = `Untuk ${siteConfig.recipientName}`;
const description = "Ada kejutan kecil buat kamu. Buka pelan-pelan ya 💛";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title,
  description,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎂</text></svg>",
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "id_ID",
    // Tahap 5: taruh gambar di public/og.png (1200x630) lalu aktifkan baris ini
    // images: ["/og.png"],
  },
  robots: { index: false, follow: false }, // website pribadi, jangan masuk Google
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // agar safe-area di HP bisa dipakai
  themeColor: "#fff7f0",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}

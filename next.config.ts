import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  /* ─── Tailwind v4 via Turbopack ─────────────────────────────────────── */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  /* ─── next/image — domain yang diizinkan ────────────────────────────── */
  images: {
    /**
     * Kalau foto dihosting di luar (mis. Supabase Storage, Cloudinary, S3),
     * tambahkan domain-nya di sini.
     * Foto lokal (public/images/...) otomatis didukung tanpa konfigurasi.
     */
    remotePatterns: [
      // Contoh Supabase Storage:
      // {
      //   protocol: "https",
      //   hostname: "*.supabase.co",
      //   pathname: "/storage/v1/object/public/**",
      // },
    ],
    // Format modern: AVIF lebih kecil, WebP fallback
    formats: ["image/avif", "image/webp"],
    // Placeholder blur lebih halus
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;

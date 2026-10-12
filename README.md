# Birthday Gift 🎂

Website kejutan ulang tahun. Next.js (App Router) + TypeScript + Tailwind CSS.

## Menjalankan di lokal

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Buka http://localhost:3000. Untuk tes di HP (satu Wi-Fi), buka `http://IP-LAPTOP:3000`.

## Struktur

- `src/app` : halaman dan API routes
- `src/components/sections` : section utama (Gate, GiftBox, dst)
- `src/components/ui` : komponen kecil reusable
- `src/data` : SEMUA konten yang bisa diedit (nama, tanggal, timeline, kupon, surat)
- `src/lib`, `src/hooks` : helper dan hooks
- `public/images`, `public/audio` : foto dan musik

Ubah nama dan tanggal ulang tahun di `src/data/site.ts`.

## Push ke GitHub

```bash
git add .
git commit -m "tahap 1: setup project"
git branch -M main
git remote add origin https://github.com/USERNAME/birthday-gift.git
git push -u origin main
```

Gunakan repo **private** supaya isi kejutan tidak bocor.

## Deploy ke Vercel

1. Masuk ke vercel.com dan login dengan GitHub.
2. Add New > Project > pilih repo `birthday-gift` > Deploy (setting default sudah benar).
3. Setelah deploy, buka Settings > Environment Variables dan isi semua variabel dari `.env.example`.
4. Isi `NEXT_PUBLIC_SITE_URL` dengan URL Vercel kamu, lalu Redeploy.
5. Setiap `git push` ke `main` akan otomatis deploy ulang.

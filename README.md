# 🎂 Birthday Gift Website

Website kejutan ulang tahun yang dibangun dengan **Next.js 16 + TypeScript + Tailwind CSS v4 + Anime.js**.

---

## 🚀 Cara Menjalankan Lokal

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Buka **http://localhost:3000**. Tes di HP (satu Wi-Fi): `http://IP-LAPTOP:3000`

---

## ✏️ Cara Mengedit Konten

**Semua konten teks, soal, kupon, dan surat ada di `src/data/` — kamu tidak perlu menyentuh komponen.**

| File | Isi |
|------|-----|
| [`src/data/site.ts`](src/data/site.ts) | Nama, tanggal lahir, passcode gate, OG title |
| [`src/data/timeline.ts`](src/data/timeline.ts) | 7 momen kenangan (tanggal, cerita, foto) |
| [`src/data/quiz.ts`](src/data/quiz.ts) | 5 soal kuis + respons salah lucu |
| [`src/data/letter.ts`](src/data/letter.ts) | Isi surat cinta digital |
| [`src/data/gift.ts`](src/data/gift.ts) | Pesan & doa di kotak hadiah |
| [`src/data/coupons.ts`](src/data/coupons.ts) | 7 kupon + 1 kupon rahasia |
| [`src/data/loading.ts`](src/data/loading.ts) | Pesan lucu saat loading screen |

Cari semua baris `// [GANTI]` — itu yang perlu kamu ubah dengan cerita asli.

---

## 🖼️ Menambah Foto Timeline

1. Taruh foto di `public/images/timeline/` (format `.jpg` atau `.webp`)
2. Edit `src/data/timeline.ts`, isi field `image` setiap item:
   ```ts
   image: "/images/timeline/foto-kenangan-1.jpg",
   ```
3. Foto akan tampil dengan lazy loading + blur placeholder otomatis.

> **Tips:** Resize foto ke lebar ≤ 1200px sebelum upload agar website tetap cepat.

---

## 🎵 Menambah Musik Latar

Taruh file audio di `public/audio/`:
- **`music.mp3`** — musik latar (BGM), putar loop. Rekomendasi: lagu lembut instrumental.
- **`pop.mp3`** — opsional, sound effect kotak hadiah.

> Musik baru mulai setelah interaksi pertama user (aturan autoplay browser).

---

## 📸 OG Image (Preview WhatsApp)

Agar link terlihat bagus saat dibagikan di WhatsApp/Telegram:

1. Buat gambar **1200 × 630 px** di Canva/Figma dengan foto & tulisan lucu
2. Export sebagai `og.png`
3. Taruh di `public/og.png`
4. Sudah aktif otomatis — tidak perlu ubah kode apapun

> File `public/og.svg` sudah ada sebagai placeholder. WhatsApp butuh PNG/JPG untuk thumbnail.

---

## 🛠️ Struktur Project

```
birthday/
├── public/
│   ├── images/timeline/   ← foto kenangan (tambah di sini)
│   ├── images/gift/       ← foto hadiah (opsional)
│   ├── audio/             ← music.mp3 dan pop.mp3
│   └── og.png             ← gambar preview WhatsApp (1200×630)
├── src/
│   ├── app/
│   │   ├── layout.tsx     ← metadata, font, OG
│   │   ├── page.tsx       ← orkestrasi semua section
│   │   ├── globals.css    ← token warna & komponen CSS
│   │   ├── api/
│   │   │   ├── coupons/route.ts    ← GET+POST kupon
│   │   │   ├── messages/route.ts   ← GET+POST ucapan
│   │   │   ├── quiz/route.ts       ← POST skor
│   │   │   └── notify/route.ts     ← POST Telegram
│   │   └── kirim-ucapan/page.tsx  ← form ucapan teman
│   ├── components/
│   │   ├── sections/      ← Gate, FunLoading, GiftBox, Timeline, Quiz, ...
│   │   └── ui/            ← RunawayButton, FloatingHearts, SectionWrapper, ...
│   ├── data/              ← SEMUA KONTEN YANG DIEDIT DI SINI
│   ├── hooks/             ← useAudio, useScrollReveal
│   └── lib/               ← supabase, supabase-server, telegram, audio, confetti
└── supabase-schema.sql    ← jalankan di Supabase SQL Editor
```

---

## 🗄️ Setup Supabase (Opsional)

Tanpa Supabase, website tetap berjalan dengan data mock.

1. Buat project di [supabase.com](https://supabase.com)
2. Jalankan `supabase-schema.sql` di **SQL Editor** Supabase
3. Isi `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...   ← JANGAN share key ini!
   ```

---

## 📱 Deploy ke Vercel

```bash
# 1. Push ke GitHub
git add .
git commit -m "siap deploy"
git push origin main

# 2. Import di vercel.com → Add New Project → pilih repo ini
# 3. Tambah Environment Variables di Vercel:
#    NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
#    SUPABASE_SERVICE_ROLE_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
# 4. Deploy!
```

Setelah deploy, isi `NEXT_PUBLIC_SITE_URL` di Vercel dengan URL produksi kamu.

---

## ✅ Checklist Sebelum Deploy

- [ ] Ubah semua `// [GANTI]` di `src/data/`
- [ ] Tambah foto di `public/images/timeline/`
- [ ] Tambah `public/audio/music.mp3`
- [ ] Buat & taruh `public/og.png` (1200×630)
- [ ] Isi `.env.local` dengan key Supabase & Telegram
- [ ] Jalankan `npm run build` — pastikan tidak ada error
- [ ] Test di HP (jalankan `npm run dev`, buka dari HP satu Wi-Fi)
- [ ] Test klaim kupon → cek notifikasi Telegram
- [ ] Test kirim ucapan di `/kirim-ucapan`

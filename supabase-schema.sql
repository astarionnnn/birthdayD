-- ============================================================
--  Supabase SQL Schema — Birthday Gift Website
--  Jalankan di: Supabase Dashboard → SQL Editor
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. MESSAGES — Ucapan dari teman & keluarga
-- ────────────────────────────────────────────────────────────
create table if not exists messages (
  id          uuid        default gen_random_uuid() primary key,
  name        text        not null check (char_length(name) between 1 and 50),
  message     text        not null check (char_length(message) between 1 and 300),
  color       text        not null default 'bg-amber-100'
                          check (color in (
                            'bg-amber-100','bg-pink-100','bg-sky-100',
                            'bg-emerald-100','bg-violet-100','bg-orange-100'
                          )),
  created_at  timestamptz default timezone('utc', now()) not null
);

-- Index untuk pengurutan terbaru
create index if not exists messages_created_at_idx on messages (created_at desc);

-- RLS: siapa saja bisa baca & insert (anon key cukup)
alter table messages enable row level security;

drop policy if exists "messages_select" on messages;
create policy "messages_select"
  on messages for select using (true);

drop policy if exists "messages_insert" on messages;
create policy "messages_insert"
  on messages for insert with check (true);


-- ────────────────────────────────────────────────────────────
-- 2. COUPON_CLAIMS — Status klaim kupon (service role dari server)
-- ────────────────────────────────────────────────────────────
create table if not exists coupon_claims (
  id            uuid        default gen_random_uuid() primary key,
  coupon_id     text        not null unique,          -- satu coupon_id hanya bisa diklaim 1x
  coupon_title  text        not null,
  claimed_at    timestamptz default timezone('utc', now()) not null
);

-- Index untuk lookup cepat per coupon_id
create index if not exists coupon_claims_coupon_id_idx on coupon_claims (coupon_id);

-- RLS: baca pakai anon key, insert hanya dari service role (server-side)
alter table coupon_claims enable row level security;

drop policy if exists "coupon_claims_select" on coupon_claims;
create policy "coupon_claims_select"
  on coupon_claims for select using (true);

-- INSERT hanya diizinkan dengan service role key (API route server-side)
-- Anon key TIDAK bisa insert langsung — lapisan proteksi tambahan
drop policy if exists "coupon_claims_insert_service" on coupon_claims;
create policy "coupon_claims_insert_service"
  on coupon_claims for insert
  with check (auth.role() = 'service_role');


-- ────────────────────────────────────────────────────────────
-- 3. QUIZ_RESULTS — Skor kuis (opsional, server-side only)
-- ────────────────────────────────────────────────────────────
create table if not exists quiz_results (
  id               uuid  default gen_random_uuid() primary key,
  recipient_name   text  not null default 'Anonim'
                         check (char_length(recipient_name) <= 50),
  score            int   not null check (score >= 0),
  total_questions  int   not null check (total_questions >= 1),
  created_at       timestamptz default timezone('utc', now()) not null
);

-- RLS: insert hanya dari service role; baca bebas
alter table quiz_results enable row level security;

drop policy if exists "quiz_results_select" on quiz_results;
create policy "quiz_results_select"
  on quiz_results for select using (true);

drop policy if exists "quiz_results_insert_service" on quiz_results;
create policy "quiz_results_insert_service"
  on quiz_results for insert
  with check (auth.role() = 'service_role');


-- ────────────────────────────────────────────────────────────
-- Selesai. Cek tabel:
--   select * from messages limit 5;
--   select * from coupon_claims limit 5;
--   select * from quiz_results limit 5;
-- ────────────────────────────────────────────────────────────

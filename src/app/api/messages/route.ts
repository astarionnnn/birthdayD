/**
 * GET  /api/messages  — ambil pesan teman/keluarga (50 terbaru)
 * POST /api/messages  — kirim pesan baru (sanitasi + rate limit sederhana)
 *
 * Rate limit: max 3 POST per IP per 10 menit (in-memory, reset saat server restart).
 * Sanitasi: strip tag HTML dari nama & pesan.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, isServerSupabaseConfigured } from "@/lib/supabase-server";

// ─── Sanitasi ─────────────────────────────────────────────────────────────────

/** Strip semua tag HTML dan karakter berbahaya */
function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")          // hapus tag HTML
    .replace(/[<>&"']/g, (c) =>       // encode karakter spesial
      ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" }[c] ?? c)
    )
    .trim();
}

// ─── Rate Limiter (In-Memory) ─────────────────────────────────────────────────

const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 menit
const RATE_MAX = 3;                     // max 3 POST per IP per window

interface RateEntry {
  count: number;
  resetAt: number;
}
const rateMap = new Map<string, RateEntry>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= RATE_MAX) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_MESSAGES = [
  {
    id: "mock-1",
    name: "Sahabat Terbaik 👯‍♀️",
    message: "Happy birthday cantik! Semoga makin sukses, langgeng terus, dan jangan lupa traktir seblak!",
    color: "bg-amber-100",
    created_at: new Date().toISOString(),
  },
  {
    id: "mock-2",
    name: "Teman Seperjuangan ☕",
    message: "Selamat bertambah umur! Semoga selalu dilancarkan segala urusannya dan bahagia selalu ya!",
    color: "bg-pink-100",
    created_at: new Date().toISOString(),
  },
  {
    id: "mock-3",
    name: "Keluarga Tercinta 🏡",
    message: "Selamat ulang tahun kesayangan! Sehat selalu, panjang umur, dan jadi kebanggaan kita semua.",
    color: "bg-emerald-100",
    created_at: new Date().toISOString(),
  },
];

const NOTE_COLORS = [
  "bg-amber-100",
  "bg-pink-100",
  "bg-sky-100",
  "bg-emerald-100",
  "bg-violet-100",
  "bg-orange-100",
];

// ─── GET /api/messages ────────────────────────────────────────────────────────

export async function GET() {
  if (!isServerSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ success: true, data: MOCK_MESSAGES, isMock: true });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("messages")
      .select("id, name, message, color, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("[GET /api/messages] Supabase error:", error.message);
      return NextResponse.json({ success: true, data: MOCK_MESSAGES, isMock: true });
    }

    return NextResponse.json({
      success: true,
      data: data && data.length > 0 ? data : MOCK_MESSAGES,
    });
  } catch (err) {
    console.error("[GET /api/messages] Unexpected error:", err);
    return NextResponse.json({ success: true, data: MOCK_MESSAGES, isMock: true });
  }
}

// ─── POST /api/messages ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // ── Rate Limiting ──────────────────────────────────────────────────────────
    const ip = getClientIp(req);
    const { allowed, retryAfterMs } = checkRateLimit(ip);

    if (!allowed) {
      const retryAfterSec = Math.ceil(retryAfterMs / 1000);
      return NextResponse.json(
        {
          success: false,
          error: `Terlalu banyak ucapan dari kamu! Coba lagi dalam ${Math.ceil(retryAfterSec / 60)} menit ya 😊`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfterSec) },
        }
      );
    }

    // ── Parse & Validasi ───────────────────────────────────────────────────────
    const body = await req.json();

    const rawName: string = typeof body?.name === "string" ? body.name : "";
    const rawMessage: string = typeof body?.message === "string" ? body.message : "";
    const rawColor: string = typeof body?.color === "string" ? body.color : "";

    if (!rawName || rawName.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Nama pengirim wajib diisi!" },
        { status: 400 }
      );
    }
    if (rawName.trim().length > 50) {
      return NextResponse.json(
        { success: false, error: "Nama maksimal 50 karakter." },
        { status: 400 }
      );
    }
    if (!rawMessage || rawMessage.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Pesan ucapan wajib diisi!" },
        { status: 400 }
      );
    }
    if (rawMessage.trim().length > 300) {
      return NextResponse.json(
        { success: false, error: "Pesan maksimal 300 karakter." },
        { status: 400 }
      );
    }

    // ── Sanitasi ───────────────────────────────────────────────────────────────
    const name = sanitize(rawName);
    const message = sanitize(rawMessage);
    // Validasi warna — hanya izinkan dari daftar aman
    const color = NOTE_COLORS.includes(rawColor) ? rawColor : NOTE_COLORS[0];

    const newMsg = { name, message, color };

    // ── Simpan ke Supabase ─────────────────────────────────────────────────────
    if (isServerSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from("messages")
        .insert([newMsg])
        .select()
        .single();

      if (error) {
        console.error("[POST /api/messages] Insert error:", error.message);
        return NextResponse.json(
          { success: false, error: "Gagal menyimpan pesan. Coba lagi!" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, data });
    }

    // Mock fallback
    return NextResponse.json({
      success: true,
      data: { id: `local-${Date.now()}`, ...newMsg, created_at: new Date().toISOString() },
      isMock: true,
    });
  } catch (err) {
    console.error("[POST /api/messages] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

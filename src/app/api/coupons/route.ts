/**
 * GET  /api/coupons  — daftar semua kupon + status klaim dari Supabase
 * POST /api/coupons  — klaim satu kupon (tolak jika sudah diklaim), kirim Telegram
 *
 * Key Supabase & Telegram hanya diakses di sisi server (supabase-server.ts).
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, isServerSupabaseConfigured } from "@/lib/supabase-server";
import { sendTelegramNotification } from "@/lib/telegram";
import { couponsData as couponData } from "@/data/coupons";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatWIB(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

// ─── GET /api/coupons ─────────────────────────────────────────────────────────

export async function GET() {
  // Ambil id yang sudah diklaim dari DB
  let claimedIds: string[] = [];

  if (isServerSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("coupon_claims")
      .select("coupon_id, claimed_at");

    if (error) {
      console.error("[GET /api/coupons] Supabase error:", error.message);
    } else {
      claimedIds = (data ?? []).map((row) => row.coupon_id);
    }
  }

  // Gabungkan data statis (src/data/coupons.ts) dengan status klaim live
  const result = couponData.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    icon: c.icon,
    isSecret: c.isSecret ?? false,
    isClaimed: claimedIds.includes(c.id),
  }));

  return NextResponse.json({ success: true, data: result, isMock: !isServerSupabaseConfigured });
}

// ─── POST /api/coupons ────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const couponId: string = typeof body?.couponId === "string" ? body.couponId.trim() : "";
    const couponTitle: string = typeof body?.couponTitle === "string" ? body.couponTitle.trim() : "";

    // Validasi input
    if (!couponId || !couponTitle) {
      return NextResponse.json(
        { success: false, error: "Field 'couponId' dan 'couponTitle' wajib diisi." },
        { status: 400 }
      );
    }

    // Pastikan kupon ada di data
    const exists = couponData.some((c) => c.id === couponId);
    if (!exists) {
      return NextResponse.json(
        { success: false, error: "Kupon tidak ditemukan." },
        { status: 404 }
      );
    }

    const claimedAt = new Date();

    // ── Simpan ke Supabase ────────────────────────────────────────────────────
    if (isServerSupabaseConfigured && supabaseAdmin) {
      // Cek duplikat terlebih dahulu (lebih eksplisit dari mengandalkan 23505)
      const { data: existing } = await supabaseAdmin
        .from("coupon_claims")
        .select("coupon_id")
        .eq("coupon_id", couponId)
        .maybeSingle();

      if (existing) {
        return NextResponse.json(
          { success: false, error: "Kupon ini sudah pernah diklaim sebelumnya.", alreadyClaimed: true },
          { status: 409 }
        );
      }

      const { error: insertError } = await supabaseAdmin
        .from("coupon_claims")
        .insert({ coupon_id: couponId, coupon_title: couponTitle, claimed_at: claimedAt.toISOString() });

      if (insertError) {
        // Tangkap race condition unique violation
        if (insertError.code === "23505") {
          return NextResponse.json(
            { success: false, error: "Kupon ini sudah diklaim (konflik).", alreadyClaimed: true },
            { status: 409 }
          );
        }
        console.error("[POST /api/coupons] Insert error:", insertError.message);
        return NextResponse.json(
          { success: false, error: "Gagal menyimpan klaim ke database." },
          { status: 500 }
        );
      }
    }

    // ── Kirim Notifikasi Telegram ─────────────────────────────────────────────
    const msg =
      `🎟️ *KUPON DIKLAIM!*\n\n` +
      `📌 *Kupon:* ${couponTitle}\n` +
      `🏷️ *Kode:* \`${couponId}\`\n` +
      `⏰ *Waktu:* ${formatWIB(claimedAt)}\n\n` +
      `_Jangan lupa ditepati janjinya ya! 😉_`;

    await sendTelegramNotification(msg);

    return NextResponse.json({
      success: true,
      data: { couponId, couponTitle, claimedAt: claimedAt.toISOString() },
      isMock: !isServerSupabaseConfigured,
    });
  } catch (err) {
    console.error("[POST /api/coupons] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

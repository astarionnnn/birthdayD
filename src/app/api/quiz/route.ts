/**
 * POST /api/quiz
 * Body: { recipientName?: string, score: number, totalQuestions: number }
 * Simpan skor kuis ke Supabase (opsional). Selalu return success.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, isServerSupabaseConfigured } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validasi tipe data
    const score = typeof body?.score === "number" ? body.score : null;
    const totalQuestions = typeof body?.totalQuestions === "number" ? body.totalQuestions : null;
    const recipientName =
      typeof body?.recipientName === "string" && body.recipientName.trim().length > 0
        ? body.recipientName.trim().slice(0, 50)
        : "Anonim";

    if (score === null || score < 0 || totalQuestions === null || totalQuestions < 1) {
      return NextResponse.json(
        { success: false, error: "Field 'score' dan 'totalQuestions' wajib berupa angka positif." },
        { status: 400 }
      );
    }

    if (isServerSupabaseConfigured && supabaseAdmin) {
      const { error } = await supabaseAdmin.from("quiz_results").insert([
        {
          recipient_name: recipientName,
          score,
          total_questions: totalQuestions,
        },
      ]);

      if (error) {
        // Skor bersifat opsional — jangan block user hanya karena DB error
        console.error("[POST /api/quiz] Insert error:", error.message);
      }
    }

    return NextResponse.json({ success: true, isMock: !isServerSupabaseConfigured });
  } catch (err) {
    console.error("[POST /api/quiz] Unexpected error:", err);
    // Tetap return 200 — skor adalah fitur opsional
    return NextResponse.json({ success: true, isMock: true });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";

/**
 * POST /api/notify
 * Body: { message: string }
 * Kirim pesan teks ke bot Telegram yang sudah dikonfigurasi.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { error: "Field 'message' wajib diisi dan tidak boleh kosong." },
        { status: 400 }
      );
    }

    const sent = await sendTelegramNotification(message);

    return NextResponse.json({
      success: true,
      sent,
      note: sent
        ? "Notifikasi Telegram berhasil dikirim."
        : "Telegram belum dikonfigurasi, notifikasi tidak terkirim (mode mock).",
    });
  } catch (err) {
    console.error("[API /notify]", err);
    return NextResponse.json(
      { error: "Gagal memproses permintaan notifikasi." },
      { status: 500 }
    );
  }
}


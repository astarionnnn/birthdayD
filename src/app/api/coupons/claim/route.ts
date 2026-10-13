/**
 * @deprecated Gunakan POST /api/coupons sebagai gantinya.
 * File ini dipertahankan untuk kompatibilitas mundur (backward compat).
 * Semua logika sudah dipindah ke /api/coupons/route.ts
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Forward ke endpoint baru
  const body = await req.json();
  const url = new URL("/api/coupons", req.url);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

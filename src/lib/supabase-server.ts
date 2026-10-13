/**
 * Supabase SERVER CLIENT — JANGAN diimpor dari komponen client ("use client").
 * Menggunakan SUPABASE_SERVICE_ROLE_KEY yang hanya tersedia di server.
 * Key ini TIDAK pernah terekspos ke browser.
 */
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
// Service role key: bypass RLS, hanya untuk API routes
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

export const isServerSupabaseConfigured = Boolean(supabaseUrl && serviceKey);

/**
 * Supabase dengan service role key — dipakai di API routes saja.
 * Bisa bypass RLS (Row Level Security).
 */
export const supabaseAdmin: SupabaseClient | null = isServerSupabaseConfigured
  ? createClient(supabaseUrl as string, serviceKey as string, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;


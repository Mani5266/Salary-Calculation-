/**
 * Supabase client singleton.
 * Falls back gracefully when Supabase is not configured.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  const url = process.env.SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_ANON_KEY ?? "";
  return Boolean(url && key && url !== "your_supabase_url_here");
}

export function getSupabaseClient(): SupabaseClient | null {
  if (client) return client;
  if (!isSupabaseConfigured()) return null;

  client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
  );
  return client;
}

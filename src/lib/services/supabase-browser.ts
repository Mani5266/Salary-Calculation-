/**
 * Browser-side Supabase client for authentication.
 * Uses NEXT_PUBLIC_ env vars so it works in client components.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (browserClient) return browserClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  if (!url || !key || url === "your_supabase_url_here") {
    return null;
  }

  browserClient = createClient(url, key);
  return browserClient;
}

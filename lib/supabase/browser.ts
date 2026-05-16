"use client";

import { createBrowserClient } from "@supabase/ssr";

import { env } from "@/lib/env";
import type { Database } from "@/types/database";

export function createBrowserSupabaseClient() {
  return createBrowserClient<Database>(env.supabaseUrl, env.supabaseAnonKey);
}

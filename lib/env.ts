const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const env = {
  appUrl,
  supabaseUrl,
  supabaseAnonKey
};

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

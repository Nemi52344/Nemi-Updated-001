import { createClient } from "@supabase/supabase-js";

// NEXT_PUBLIC_* values are baked into the browser bundle at build time, so
// hardcoded fallbacks are safe here (the anon key is designed to be public;
// all access control is enforced via Postgres Row-Level Security).
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://wrkfxtodkxhhlzmfpvgt.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_FT26jKZMRKO60vR85TLpyQ_QduuLLsu";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

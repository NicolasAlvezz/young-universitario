import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Singleton perezoso. No lanza error si faltan variables: devuelve null
 * para que la app pueda mostrar instrucciones sin romper el build.
 */
let cached: SupabaseClient | null | undefined

/**
 * Cliente de Supabase para lecturas con la anon key (NEXT_PUBLIC_*).
 */
export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) {
    return cached
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl?.trim() || !supabaseAnonKey?.trim()) {
    cached = null
    return null
  }

  cached = createClient(supabaseUrl, supabaseAnonKey)
  return cached
}

/** True solo cuando URL y anon key están definidas (no vacías). */
export function isSupabaseConfigured(): boolean {
  return getSupabase() !== null
}

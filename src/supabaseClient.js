import { createClient } from '@supabase/supabase-js'

// Try to load from environment variables first, or check localStorage for runtime settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('biocycle_supabase_url') || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('biocycle_supabase_anon_key') || ''

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null

export const isSupabaseConfigured = () => {
  return !!supabase
}

// Function to save keys at runtime for ease of setup
export const saveSupabaseKeys = (url, key) => {
  localStorage.setItem('biocycle_supabase_url', url)
  localStorage.setItem('biocycle_supabase_anon_key', key)
  window.location.reload()
}

// Function to clear keys
export const clearSupabaseKeys = () => {
  localStorage.removeItem('biocycle_supabase_url')
  localStorage.removeItem('biocycle_supabase_anon_key')
  window.location.reload()
}

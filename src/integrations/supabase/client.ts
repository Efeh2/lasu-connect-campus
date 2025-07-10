import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = "YOUR_SUPABASE_URL"
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
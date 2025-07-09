import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://fniivohryfgxlsdaqfld.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuaWl2aG9yeWZneGxzZGFxbGZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MDE4OTMsImV4cCI6MjA2Njk3Nzg5M30.U_j8DuXURujLu1TM151cyTOeaTcTHazOcNJ937KcI7M'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
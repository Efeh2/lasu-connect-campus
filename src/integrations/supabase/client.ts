
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fniivhoryfrxlsdaqlfd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuaWl2aG9yeWZnbmxzZGFxbGZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MDE4OTMsImV4cCI6MjA2Njk3Nzg5M30.U_j8DuXURujLu1TM151cyTOeaTcTHazOcNJ937KcI7M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

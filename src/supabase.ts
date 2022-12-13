import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://daxrvmzwgfifuornneda.supabase.co'
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRheHJ2bXp3Z2ZpZnVvcm5uZWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA4NTE5MzksImV4cCI6MTk4NjQyNzkzOX0.44-UbeBI4VU9484eKmAzAKDeH-Ufa1nd3qxRGl-yQV4'

export const supabase = createClient(supabaseUrl, supabaseKey)

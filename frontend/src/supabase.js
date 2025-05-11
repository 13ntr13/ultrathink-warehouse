import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://utafwirdhiextnxahftj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0YWZ3aXJkaGlleHRueGFoZnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2OTk5NDAsImV4cCI6MjA2MjI3NTk0MH0.1ca3rtKGHVCuvJ4Vxwj13kPpf9sLk1zwckftCj1MQLg'

export const supabase = createClient(supabaseUrl, supabaseKey) 
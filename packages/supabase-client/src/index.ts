/// <reference types="vite/client" />
import { createClient, SupabaseClient, AuthChangeEvent, Session } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: 'admin' | 'user';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      // Add other tables as needed
    };
  };
};

// Use Vite's env variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging
console.log('[Supabase] Initializing client...');

if (!supabaseUrl || !supabaseAnonKey) {
  const error = new Error(
    'Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
  console.error('[Supabase] Initialization failed:', error);
  throw error;
}

// Create client with error handling
let supabase: SupabaseClient<Database>;

try {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
  console.log('[Supabase] Client initialized successfully');
} catch (error) {
  console.error('[Supabase] Failed to create client:', error);
  throw error;
}

// Helper function to check if client is ready
export const isClientReady = () => {
  return !!supabase;
};

// Auth state change listener
supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
  console.log('[Supabase] Auth state changed:', event, session?.user?.email);
});

export const isAdmin = async (client: SupabaseClient<Database> = supabase) => {
  try {
    console.log('[Supabase] Checking admin status...');
    const { data: { user }, error: userError } = await client.auth.getUser();
    
    if (userError) throw userError;
    if (!user) {
      console.log('[Supabase] No user found');
      return false;
    }

    const { data, error: roleError } = await client
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (roleError) throw roleError;
    
    const isAdmin = data?.role === 'admin';
    console.log('[Supabase] Admin check result:', isAdmin);
    return isAdmin;
  } catch (error) {
    console.error('[Supabase] Error checking admin status:', error);
    return false;
  }
};

export const requireAdmin = async (client: SupabaseClient<Database> = supabase) => {
  const admin = await isAdmin(client);
  if (!admin) {
    console.warn('[Supabase] Admin access required but not granted');
    throw new Error('Unauthorized: Admin access required');
  }
  return true;
};

// Export the client
export { supabase }; 
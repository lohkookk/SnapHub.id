import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Buat client dummy jika env belum di-set agar app tidak crash
export const supabase = supabaseUrl 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({ select: () => Promise.resolve({ data: [] }), insert: () => Promise.resolve({ error: null }), delete: () => Promise.resolve({ error: null }) }),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: "Sistem belum dikonfigurasi (Supabase URL kosong). Silakan atur file .env terlebih dahulu." } }),
        signOut: () => Promise.resolve({ error: null })
      },
      supabaseUrl: '' // flag for checking
    };

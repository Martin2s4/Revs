import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnon) {
  console.error(
    'Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
  );
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnon || ''
);

// Database types and helpers
export interface DatabaseUser {
  id: string;
  email: string;
  user_type: 'admin' | 'officer' | 'citizen';
  created_at: string;
  updated_at: string;
}

export interface DatabasePayment {
  id: string;
  user_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  payment_method: string;
  reference_number: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface DatabaseLicense {
  id: string;
  user_id: string;
  license_number: string;
  license_type: string;
  status: 'active' | 'expired' | 'revoked';
  issue_date: string;
  expiry_date: string;
  created_at: string;
}

// Authentication helpers
export const signUp = (email: string, password: string) => {
  return supabase.auth.signUp({ email, password });
};

export const signIn = (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signOut = () => {
  return supabase.auth.signOut();
};

export const getSession = () => {
  return supabase.auth.getSession();
};

export const getCurrentUser = () => {
  return supabase.auth.getUser();
};

// Database query helpers
export const getUserProfile = (userId: string) => {
  return supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
};

export const getPayments = (userId: string) => {
  return supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
};

export const getNotifications = (userId: string) => {
  return supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
};

export const getLicenses = (userId: string) => {
  return supabase
    .from('licenses')
    .select('*')
    .eq('user_id', userId);
};

import { supabase } from '../lib/supabase';
import { Provider } from '@supabase/supabase-js';

export async function signInWithProvider(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) throw error;
  return data;
}

export async function handleAuthCallback() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) throw error;
  if (!session) throw new Error('No session found');

  return session;
}
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// Refresh 5 minutes before token expires
const REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;

    const refreshSession = async () => {
      const { data: { session: newSession }, error } = await supabase.auth.refreshSession();
      if (error) {
        console.error('Error refreshing session:', error);
        return;
      }
      setSession(newSession);
    };

    // Calculate time until token expires
    const expiresAt = new Date(session?.expires_at || '').getTime();
    const timeUntilExpiry = expiresAt - Date.now();

    // Schedule refresh before token expires
    const refreshTimeout = setTimeout(
      refreshSession,
      timeUntilExpiry - REFRESH_THRESHOLD
    );

    return () => clearTimeout(refreshTimeout);
  }, [session?.expires_at]);

  return { session, loading };
} 
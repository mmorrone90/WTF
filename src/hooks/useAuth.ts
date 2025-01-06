import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../types/auth';
import { fetchUserProfile } from '../services/auth/profileService';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: Error | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    async function loadUserProfile(user: User) {
      try {
        const profile = await fetchUserProfile(user.id, {
          maxAttempts: 3,
          delayMs: 1000
        });
        
        if (mounted) {
          setState(prev => ({
            ...prev,
            profile,
            loading: false,
            error: null
          }));
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        if (mounted) {
          setState(prev => ({
            ...prev,
            profile: null,
            loading: false,
            error: error as Error
          }));
        }
      }
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!mounted) return;

      if (error) {
        console.error('Session error:', error);
        setState(prev => ({ ...prev, error, loading: false }));
        return;
      }

      if (session?.user) {
        setState(prev => ({ ...prev, user: session.user }));
        loadUserProfile(session.user);
      } else {
        setState(prev => ({
          ...prev,
          user: null,
          profile: null,
          loading: false,
          error: null
        }));
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        if (session?.user) {
          setState(prev => ({ ...prev, user: session.user }));
          loadUserProfile(session.user);
        } else {
          setState({
            user: null,
            profile: null,
            loading: false,
            error: null
          });
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return state;
}

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

    async function initializeAuth() {
      try {
        // Get initial session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (sessionError) {
          console.error('Session error:', sessionError);
          setState(prev => ({ ...prev, error: sessionError, loading: false }));
          return;
        }

        if (session?.user) {
          setState(prev => ({ ...prev, user: session.user }));
          await loadUserProfile(session.user);
        } else {
          setState(prev => ({
            ...prev,
            user: null,
            profile: null,
            loading: false,
            error: null
          }));
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_event, session) => {
            if (!mounted) return;

            if (session?.user) {
              setState(prev => ({ ...prev, user: session.user }));
              await loadUserProfile(session.user);
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
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: error as Error
          }));
        }
      }
    }

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}

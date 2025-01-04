import { supabase } from '../../lib/supabase';
import { AuthResult } from './types';
import { AuthenticationError } from './errors';
import { fetchUserProfile } from './profileService';

export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      throw new AuthenticationError(
        'Invalid email or password',
        'INVALID_CREDENTIALS',
        signInError
      );
    }

    if (!authData.user) {
      throw new AuthenticationError(
        'No user data returned',
        'NO_USER_DATA'
      );
    }

    // Fetch user profile with retries
    const profile = await fetchUserProfile(authData.user.id);
    if (!profile) {
      throw new AuthenticationError(
        'Failed to load user profile',
        'PROFILE_ERROR'
      );
    }

    return {
      session: authData.session,
      user: authData.user,
      profile
    };
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new AuthenticationError(
      'An unexpected error occurred',
      'UNKNOWN_ERROR',
      error as Error
    );
  }
}
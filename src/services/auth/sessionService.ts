import { supabase } from '../../lib/supabase';
import { AuthenticationError } from './errors';

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new AuthenticationError(
        'Failed to sign out',
        'SIGNOUT_ERROR',
        error
      );
    }
  } catch (error) {
    throw new AuthenticationError(
      'Failed to sign out',
      'SIGNOUT_ERROR',
      error as Error
    );
  }
}

export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    throw new AuthenticationError(
      'Failed to get current session',
      'SESSION_ERROR',
      error
    );
  }
  return session;
}
import { supabase } from '../../lib/supabase';
import { AuthenticationError } from './errors';

export async function signOut() {
  try {
    // Try server-side logout
    const { error } = await supabase.auth.signOut();
    
    // If there was an error but it's just a 403, we can ignore it
    if (error && error.status !== 403) {
      throw new AuthenticationError(
        'Failed to sign out',
        'SIGNOUT_ERROR',
        error
      );
    }
  } catch (error) {
    // If it's not a 403 error, throw it
    if (error instanceof AuthenticationError && error.message.includes('403')) {
      return;
    }
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

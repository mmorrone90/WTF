import { supabase } from '../../lib/supabase';
import { UserProfile } from '../../types/auth';
import { ProfileFetchOptions } from './types';

const DEFAULT_OPTIONS: Required<ProfileFetchOptions> = {
  maxAttempts: 3,
  delayMs: 1000
};

export async function fetchUserProfile(
  userId: string, 
  options: ProfileFetchOptions = {}
): Promise<UserProfile | null> {
  const { maxAttempts, delayMs } = { ...DEFAULT_OPTIONS, ...options };
  let attempts = 0;

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  while (attempts < maxAttempts) {
    try {
      // First get the profile to determine user type
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_type, email')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        throw profileError;
      }

      if (!profile) {
        console.error('No profile found for user:', userId);
        throw new Error('Profile not found');
      }

      // Then get the specific profile data
      const table = profile.user_type === 'customer' ? 'customers' : 'partners';
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error(`${table} fetch error:`, error);
        throw error;
      }

      if (!data) {
        console.error(`No ${table} record found for user:`, userId);
        throw new Error(`${table} record not found`);
      }

      return {
        ...data,
        email: profile.email,
        user_type: profile.user_type
      } as UserProfile;
    } catch (error) {
      console.error(`Attempt ${attempts + 1} failed:`, error);
      
      if (attempts === maxAttempts - 1) {
        console.error('Failed to fetch profile after all retries');
        return null;
      }

      await delay(delayMs);
      attempts++;
    }
  }

  return null;
}
import { supabase } from '../../lib/supabase';
import { UserProfile } from '../../types/auth';

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    // First get the profile to determine user type
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_type, email')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return null;
    }

    if (!profile) {
      console.error('No profile found for user:', userId);
      return null;
    }

    // Then get the specific profile data based on user type
    const table = profile.user_type === 'customer' ? 'customers' : 'partners';
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error(`Error fetching ${table} profile:`, error);
      return null;
    }

    return {
      ...data,
      email: profile.email,
      user_type: profile.user_type
    } as UserProfile;
  } catch (error) {
    console.error('Unexpected error in getUserProfile:', error);
    return null;
  }
}

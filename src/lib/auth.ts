import { AuthError, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export async function signUp(
  email: string, 
  password: string, 
  userType: 'customer' | 'brand',
  userData: any
) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_type: userType,
        ...userData
      },
    },
  });

  if (authError) throw authError;

  // If user is a brand, create brand profile
  if (userType === 'brand' && authData.user) {
    const { error: profileError } = await supabase
      .from('brand_profiles')
      .insert({
        user_id: authData.user.id,
        ...userData
      });

    if (profileError) {
      // Cleanup: delete auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw profileError;
    }
  }

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function updateUserProfile(userId: string, updates: any) {
  const { error } = await supabase
    .from('auth_users')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
}

export async function updateBrandProfile(userId: string, updates: any) {
  const { error } = await supabase
    .from('brand_profiles')
    .update(updates)
    .eq('user_id', userId);

  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}
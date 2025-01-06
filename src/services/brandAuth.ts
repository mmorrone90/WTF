import { supabase } from '../lib/supabase';
import { AuthenticationError } from './auth/errors';

export interface BrandSignUpData {
  email: string;
  password: string;
  businessName: string;
  phone?: string;
  website?: string;
}

export async function signUpBrand(data: BrandSignUpData) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          user_type: 'partner',
          business_name: data.businessName,
          phone: data.phone,
          website_url: data.website
        }
      }
    });

    if (authError) {
      throw new AuthenticationError(
        'Failed to create account',
        'SIGNUP_ERROR',
        authError
      );
    }

    if (!authData.user) {
      throw new AuthenticationError(
        'No user data returned',
        'NO_USER_DATA'
      );
    }

    return authData;
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

export async function signInBrand({ 
  email, 
  password 
}: { 
  email: string; 
  password: string;
}) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      throw new AuthenticationError(
        'Invalid email or password',
        'INVALID_CREDENTIALS',
        authError
      );
    }

    if (!authData.user) {
      throw new AuthenticationError(
        'No user data returned',
        'NO_USER_DATA'
      );
    }

    // Verify this is a partner account
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile || profile.user_type !== 'partner') {
      await supabase.auth.signOut();
      throw new AuthenticationError(
        'Invalid partner account',
        'INVALID_ACCOUNT_TYPE'
      );
    }

    return authData;
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

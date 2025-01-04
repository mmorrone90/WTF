import { supabase } from '../lib/supabase';

export interface CustomerSignUpData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export async function signUpCustomer(data: CustomerSignUpData) {
  try {
    // Step 1: Create auth user with metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          user_type: 'customer',
          full_name: data.fullName,
          phone: data.phone
        }
      }
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user data returned');

    // Step 2: Wait for trigger to complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 3: Verify profile creation
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      // Clean up if profile creation failed
      await supabase.auth.signOut();
      throw new Error('Failed to create user profile');
    }

    // Step 4: Verify customer data
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (customerError || !customer) {
      // Clean up if customer creation failed
      await supabase.auth.signOut();
      throw new Error('Failed to create customer profile');
    }

    return authData;
  } catch (error) {
    // Clean up any partial data
    const user = await supabase.auth.getUser();
    if (user.data.user) {
      await supabase.auth.signOut();
    }
    throw error;
  }
}
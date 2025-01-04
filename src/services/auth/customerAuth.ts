import { supabase } from '../../lib/supabase';
import { CustomerProfile } from '../../types/auth';

interface CustomerSignUpData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export async function signUpCustomer(data: CustomerSignUpData) {
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
  return authData;
}

export async function getCustomerProfile(userId: string) {
  const { data, error } = await supabase
    .from('customers')
    .select(`
      id,
      profiles!inner(email, created_at),
      full_name,
      phone,
      shipping_address,
      preferences,
      created_at,
      updated_at
    `)
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data as CustomerProfile;
}

export async function updateCustomerProfile(
  userId: string,
  updates: Partial<CustomerProfile>
) {
  const { error } = await supabase
    .from('customers')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
}
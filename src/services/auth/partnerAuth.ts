import { supabase } from '../../lib/supabase';
import { PartnerProfile } from '../../types/auth';

interface PartnerSignUpData {
  email: string;
  password: string;
  businessName: string;
  businessType: string;
  contactPerson: string;
  businessAddress: string;
  phone: string;
  websiteUrl?: string;
}

export async function signUpPartner(data: PartnerSignUpData) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        user_type: 'partner',
        business_name: data.businessName,
        business_type: data.businessType,
        contact_person: data.contactPerson,
        business_address: data.businessAddress,
        phone: data.phone,
        website_url: data.websiteUrl
      }
    }
  });

  if (authError) throw authError;
  return authData;
}

export async function getPartnerProfile(userId: string) {
  const { data, error } = await supabase
    .from('partners')
    .select(`
      id,
      profiles!inner(email, created_at),
      business_name,
      business_type,
      contact_person,
      business_address,
      phone,
      website_url,
      social_links,
      business_details,
      verification_status,
      created_at,
      updated_at
    `)
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data as PartnerProfile;
}

export async function updatePartnerProfile(
  userId: string,
  updates: Partial<PartnerProfile>
) {
  const { error } = await supabase
    .from('partners')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
}

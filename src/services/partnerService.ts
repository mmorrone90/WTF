import { supabase } from '../lib/supabase';
import { Partner } from '../types/database';

export async function getFeaturedPartners(limit: number = 4): Promise<Partner[]> {
  try {
    // First get the count of active products per partner
    const { data: partners, error } = await supabase
      .from('partners')
      .select(`
        id,
        business_name,
        website_url,
        products:products!inner(*)
      `)
      .eq('products.status', 'active')
      .limit(limit);

    if (error) throw error;

    // Transform the response to include the count
    const partnersWithCount = partners?.map(partner => ({
      ...partner,
      products: {
        count: Array.isArray(partner.products) ? partner.products.length : 0
      }
    })) || [];

    // Sort by product count
    partnersWithCount.sort((a, b) => 
      (b.products?.count || 0) - (a.products?.count || 0)
    );

    return partnersWithCount;
  } catch (error) {
    console.error('Error fetching featured partners:', error);
    return [];
  }
} 
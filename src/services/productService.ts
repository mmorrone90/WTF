import { supabase } from '../lib/supabase';
import { Product } from '../types/product';

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

export async function getRelatedProducts(
  productId: string,
  limit: number = 4
): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .neq('id', productId)
    .limit(limit);

  if (error) {
    console.error('Error fetching related products:', error);
    return [];
  }

  return data || [];
}

export async function toggleWishlist(
  userId: string,
  productId: string
): Promise<boolean> {
  const { data: existing, error: checkError } = await supabase
    .from('wishlists')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking wishlist:', checkError);
    return false;
  }

  if (existing) {
    const { error: deleteError } = await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (deleteError) {
      console.error('Error removing from wishlist:', deleteError);
      return false;
    }
    return false;
  } else {
    const { error: insertError } = await supabase
      .from('wishlists')
      .insert([{ user_id: userId, product_id: productId }]);

    if (insertError) {
      console.error('Error adding to wishlist:', insertError);
      return false;
    }
    return true;
  }
} 
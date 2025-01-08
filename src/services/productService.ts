import { supabase } from '../lib/supabase';

interface ProductData {
  title: string;
  category: string;
  description: string;
  size: string[];
  price: number;
  currency: string;
  metadata: Record<string, string>;
  tags: string[];
  stock: number;
}

export async function createProduct(data: ProductData) {
  try {
    // Get the current user's ID
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error('Not authenticated');

    // Create the product with partner_id
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({
        name: data.title,
        description: data.description,
        size: data.size,
        price: data.price,
        currency: data.currency,
        metadata: data.metadata,
        tags: data.tags,
        stock: data.stock,
        partner_id: user.id // Add partner_id
      })
      .select()
      .single();

    if (productError) throw productError;
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function getProducts() {
  // Get the current user's ID
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (
        id,
        image_url,
        is_primary
      )
    `)
    .eq('partner_id', user.id) // Filter by partner_id
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// For now, we'll simulate the wishlist functionality with local storage
// Later, this will be replaced with actual API calls to Supabase

export async function toggleWishlist(userId: string, productId: string): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Get current wishlist from local storage
  const key = `wishlist_${userId}`;
  const currentWishlist = JSON.parse(localStorage.getItem(key) || '[]');

  // Check if product is already in wishlist
  const index = currentWishlist.indexOf(productId);
  const isAdded = index === -1;

  // Toggle product in wishlist
  if (isAdded) {
    currentWishlist.push(productId);
  } else {
    currentWishlist.splice(index, 1);
  }

  // Save updated wishlist
  localStorage.setItem(key, JSON.stringify(currentWishlist));

  return isAdded;
}
import { supabase } from '../lib/supabase';
import { Product as DbProduct, ProductImage, Partner } from '../types/database';
import { Product } from '../types/product';
import { getCurrentUser } from './auth/base';

export interface ProductData {
  title: string;
  category: string;
  description: string;
  size: string[];
  price: number;
  currency: string;
  metadata?: Record<string, any>;
  tags?: string[];
  stock: number;
  images?: string[];
}

interface GetProductsOptions {
  page?: number;
  limit?: number;
  category?: string;
  gender?: string;
  includeOutOfStock?: boolean;
  partnerId?: string;
}

// Transform database product to UI product
function transformProduct(
  dbProduct: DbProduct & { 
    product_images?: ProductImage[],
    partners?: Partner
  }
): Product {
  // Get primary image or first available image
  const primaryImage = dbProduct.product_images?.find(img => img.is_primary);
  const firstImage = dbProduct.product_images?.[0];
  const defaultImage = 'https://via.placeholder.com/400x400?text=No+Image'; // Fallback image
  
  // Convert tags to string format
  const tagsArray = typeof dbProduct.tags === 'string'
    ? dbProduct.tags.split(',')
    : dbProduct.tags || [];
  const tagsString = Array.isArray(tagsArray) ? tagsArray.join(',') : '';

  return {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description || '',
    size: dbProduct.size || '',
    price: dbProduct.price || 0,
    stock: dbProduct.stock || 0,
    tags: tagsString,
    metadata: dbProduct.metadata || {},
    brand: dbProduct.partners?.business_name || 'Unknown Brand',
    image: primaryImage?.image_url || firstImage?.image_url || defaultImage,
    partnerUrl: dbProduct.partners?.website_url || '',
    rating: 5, // Default rating
    currency: dbProduct.currency || 'USD',
    product_images: dbProduct.product_images || [],
    created_at: dbProduct.created_at,
    originalPrice: undefined
  };
}

export async function getRelatedProducts(productId: string, tags: string[], limit: number = 4) {
  try {
    // Convert tags to lowercase for case-insensitive comparison
    const lowerTags = tags.map(tag => tag.toLowerCase());
    
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images (
          id,
          image_url,
          is_primary
        ),
        partners (
          id,
          business_name,
          website_url
        )
      `)
      .neq('id', productId) // Exclude current product
      .contains('tags', lowerTags) // Find products with matching tags
      .limit(limit)
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];
    
    return data.map(transformProduct);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export async function createProduct(data: ProductData): Promise<Product> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      throw new Error('User not authenticated');
    }

    // Format arrays for PostgreSQL
    const formattedSize = Array.isArray(data.size) ? `{${data.size.join(',')}}` : data.size;
    const formattedTags = data.category ? `{${data.category}}` : '{}';

    // Create the product
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert([{
        name: data.title,
        description: data.description,
        size: formattedSize,
        price: data.price,
        currency: data.currency || 'USD',
        stock: data.stock,
        metadata: data.metadata || {},
        tags: formattedTags,
        partner_id: session.session.user.id,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (productError) throw productError;
    if (!product) throw new Error('Failed to create product');

    // If there are images, add them
    if (data.images?.length) {
      const imagePromises = data.images.map(async (imageUrl: string, index: number) => {
        const { error: imageError } = await supabase
          .from('product_images')
          .insert({
            product_id: product.id,
            image_url: imageUrl,
            is_primary: index === 0,
            created_at: new Date().toISOString()
          });

        if (imageError) throw imageError;
      });

      await Promise.all(imagePromises);
    }

    // Fetch the complete product with all relations
    const { data: completeProduct, error: fetchError } = await supabase
      .from('products')
      .select(`
        *,
        product_images (
          id,
          image_url,
          is_primary
        ),
        partners (
          id,
          business_name,
          website_url
        )
      `)
      .eq('id', product.id)
      .single();

    if (fetchError) throw fetchError;
    if (!completeProduct) throw new Error('Failed to fetch complete product');

    return transformProduct(completeProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function updateProduct(id: string, data: ProductData): Promise<Product> {
  try {
    // Format arrays for PostgreSQL
    const formattedSize = Array.isArray(data.size) ? `{${data.size.join(',')}}` : data.size;
    const formattedTags = Array.isArray(data.tags) ? `{${data.tags.join(',')}}` : data.tags;

    // Update the product
    const { data: product, error: productError } = await supabase
      .from('products')
      .update({
        name: data.title,
        description: data.description,
        size: formattedSize,
        price: data.price,
        currency: data.currency || 'USD',
        stock: data.stock,
        metadata: data.metadata || {},
        tags: formattedTags || ''
      })
      .eq('id', id)
      .select()
      .single();

    if (productError) throw productError;
    if (!product) throw new Error('Failed to update product');

    // If there are new images, update them
    if (data.images?.length) {
      // Delete existing images
      const { error: deleteError } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', id);

      if (deleteError) throw deleteError;

      // Add new images
      const imagePromises = data.images.map(async (imageUrl: string, index: number) => {
        const { error: imageError } = await supabase
          .from('product_images')
          .insert({
            product_id: id,
            image_url: imageUrl,
            is_primary: index === 0,
            created_at: new Date().toISOString()
          });

        if (imageError) throw imageError;
      });

      await Promise.all(imagePromises);
    }

    // Fetch the complete updated product with all relations
    const { data: completeProduct, error: fetchError } = await supabase
      .from('products')
      .select(`
        *,
        product_images (
          id,
          image_url,
          is_primary
        ),
        partners (
          id,
          business_name,
          website_url
        )
      `)
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!completeProduct) throw new Error('Failed to fetch complete product');

    return transformProduct(completeProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function getProducts({
  page = 1,
  limit = 12,
  category,
  gender,
  includeOutOfStock = true,
  partnerId
}: GetProductsOptions = {}) {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        product_images (
          id,
          image_url,
          is_primary
        ),
        partners (
          id,
          business_name,
          website_url
        )
      `, { count: 'exact' });

    // Apply filters
    if (!includeOutOfStock) {
      query = query.gt('stock', 0);
    }

    // If partnerId is provided (brand dashboard case), filter by partner_id
    if (partnerId) {
      query = query.eq('partner_id', partnerId);
    }

    if (category) {
      query = query.ilike('tags', `%${category.toLowerCase()}%`);
    }

    if (gender) {
      query = query.ilike('tags', `%${gender.toLowerCase()}%`);
    }

    // Calculate pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
    
    if (!data) {
      console.log('No data returned from Supabase');
      return { products: [], total: 0 };
    }
    
    const transformedProducts = data.map(transformProduct);
    
    return {
      products: transformedProducts,
      total: count || 0
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], total: 0 };
  }
}

export async function getProduct(id: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images (
          id,
          image_url,
          is_primary
        ),
        partners (
          id,
          business_name,
          website_url
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Product not found');
    
    return transformProduct(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

// For now, we'll simulate the wishlist functionality with local storage
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

export async function deleteProduct(id: string): Promise<void> {
  try {
    // Delete product images first (due to foreign key constraint)
    const { error: imagesError } = await supabase
      .from('product_images')
      .delete()
      .eq('product_id', id);

    if (imagesError) throw imagesError;

    // Delete the product
    const { error: productError } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (productError) throw productError;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

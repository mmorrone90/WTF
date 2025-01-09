import { supabase } from '../lib/supabase';
import { Product as DbProduct, ProductImage, Partner } from '../types/database';
import { Product } from '../types/product';

interface ProductData {
  title: string;
  category: string;
  description: string;
  size: string;
  price: number;
  currency: string;
  metadata?: Record<string, any>;
  tags?: string;
  stock: number;
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
  
  return {
    ...dbProduct,
    brand: dbProduct.partners?.business_name || '',
    image: primaryImage?.image_url || firstImage?.image_url || '',
    partnerUrl: dbProduct.partners?.website_url,
    // Keep other UI specific fields
    rating: 5, // Default rating
    currency: dbProduct.currency || 'USD',
    product_images: dbProduct.product_images
  };
}

export async function createProduct(data: ProductData) {
  try {
    // Create the product
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert([{
        name: data.title,
        description: data.description,
        size: data.size,
        price: data.price,
        currency: data.currency || 'USD',
        stock: data.stock,
        metadata: data.metadata || {},
        tags: data.tags || '',
        partner_id: partner.id,
        created_at: new Date().toISOString()
      }])
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

    if (productError) throw productError;
    if (!product) throw new Error('Failed to create product');

    return transformProduct(completeProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function getProducts() {
  try {
    console.log('Fetching products from Supabase...');
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
      .order('created_at');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Received data from Supabase:', data);
    if (!data) return [];
    
    // Transform database products to UI products
    const transformedProducts = data.map(product => transformProduct(product as DbProduct & { 
      product_images?: ProductImage[],
      partners?: Partner
    }));
    console.log('Transformed products:', transformedProducts);
    
    return transformedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array instead of throwing error for public queries
    return [];
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
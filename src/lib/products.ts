import { supabase } from './supabase';

export async function getProducts(partnerId: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name),
      images:product_images(image_url, is_primary)
    `)
    .eq('partner_id', partnerId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createProduct(partnerId: string, productData: any) {
  // Start a transaction
  const { data: product, error: productError } = await supabase
    .from('products')
    .insert({
      ...productData,
      partner_id: partnerId
    })
    .select()
    .single();

  if (productError) throw productError;

  // Upload images if any
  if (productData.images?.length) {
    const imagePromises = productData.images.map(async (imageUrl: string, index: number) => {
      const { error: imageError } = await supabase
        .from('product_images')
        .insert({
          product_id: product.id,
          image_url: imageUrl,
          is_primary: index === 0
        });

      if (imageError) throw imageError;
    });

    await Promise.all(imagePromises);
  }

  return product;
}

export async function updateProduct(productId: string, productData: any) {
  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', productId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(productId: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) throw error;
}
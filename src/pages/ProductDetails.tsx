import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductImageCarousel from '../components/product/ProductImageCarousel';
import ProductInfo from '../components/product/ProductInfo';
import RelatedProducts from '../components/product/RelatedProducts';
import { getProduct, getRelatedProducts } from '../services/productService';
import { Product } from '../types/product';
import { ProductDetailsSkeleton } from '../components/ui/Shimmer';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch the main product
        const productData = await getProduct(id);
        setProduct(productData);
        
        // Get product tags, ensuring we handle both array and string formats
        const productTags = Array.isArray(productData.tags) 
          ? productData.tags 
          : productData.tags?.toLowerCase().split(',') || [];

        // Fetch related products directly from Supabase
        const related = await getRelatedProducts(id, productTags);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err instanceof Error ? err : new Error('Failed to load product'));
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-500">Error loading product</h2>
          <p className="text-text-grey mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-xl font-bold">Product not found</h2>
        </div>
      </div>
    );
  }

  const productImages = product.product_images?.map(img => img.image_url) || [product.image];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductImageCarousel images={productImages} />
        <ProductInfo
          id={product.id}
          name={product.name}
          brand={product.brand}
          price={product.price}
          currency={product.currency || 'USD'}
          originalPrice={product.originalPrice}
          description={product.description || ''}
          material={product.metadata?.material}
          partnerUrl={product.partnerUrl}
          size={product.size}
          stock={product.stock}
        />
      </div>
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} currentProductId={id || ''} />
      )}
    </div>
  );
}

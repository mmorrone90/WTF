import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductImageCarousel from '../components/product/ProductImageCarousel';
import ProductInfo from '../components/product/ProductInfo';
import RelatedProducts from '../components/product/RelatedProducts';
import { getProduct, getProducts } from '../services/productService';
import { Product } from '../types/product';

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
        
        // Fetch the product
        const productData = await getProduct(id);
        setProduct(productData);
        
        // Get related products based on tags
        const allProducts = await getProducts();
        const productTags = productData.tags?.toLowerCase().split(',') || [];
        const related = allProducts
          .filter(p => {
            if (p.id === id) return false;
            const pTags = p.tags?.toLowerCase().split(',') || [];
            return productTags.some(tag => pTags.includes(tag));
          })
          .slice(0, 4);
        
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
    return (
      <div className="min-h-screen pt-20 pb-section">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-dark-grey rounded-xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-dark-grey rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-dark-grey rounded w-1/4 animate-pulse" />
              <div className="h-24 bg-dark-grey rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-20 pb-section">
        <div className="max-w-container mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold">
            {error ? error.message : 'Product not found'}
          </h1>
        </div>
      </div>
    );
  }

  // Get all product images
  const images = product.product_images?.map(img => img.image_url) || [product.image];

  return (
    <div className="min-h-screen pt-20 pb-section">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Image Carousel */}
          <div className="sticky top-24">
            <ProductImageCarousel images={images} />
          </div>

          {/* Right: Product Info */}
          <ProductInfo
            id={product.id}
            name={product.name}
            brand={product.brand}
            price={product.price}
            currency={product.currency}
            originalPrice={product.originalPrice}
            description={product.description || `Experience the future of fashion with this ${product.brand} ${product.name.toLowerCase()}. Perfect for both urban exploration and digital frontiers.`}
            material={product.metadata?.material || "Premium blend of sustainable materials"}
            partnerUrl={product.partnerUrl}
            deliveryDate="5-7 business days"
            size={product.size}
            stock={product.stock}
          />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts
            products={relatedProducts}
            currentProductId={product.id}
          />
        )}
      </div>
    </div>
  );
}

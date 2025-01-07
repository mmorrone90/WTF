import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductImageCarousel from '../components/product/ProductImageCarousel';
import ProductInfo from '../components/product/ProductInfo';
import RelatedProducts from '../components/product/RelatedProducts';
import { mockProducts } from '../data/mockProducts';

// Mock additional images for each product
const productImages: Record<string, string[]> = {
  '1': [
    'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
    'https://images.unsplash.com/photo-1543076447-215ad9ba6923',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    'https://images.unsplash.com/photo-1554412933-514a83d2f3c8'
  ],
  '2': [
    'https://images.unsplash.com/photo-1542280756-74b2f55e73ab',
    'https://images.unsplash.com/photo-1543076447-215ad9ba6923',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    'https://images.unsplash.com/photo-1554412933-514a83d2f3c8'
  ],
  '3': [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
    'https://images.unsplash.com/photo-1543076447-215ad9ba6923',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    'https://images.unsplash.com/photo-1554412933-514a83d2f3c8'
  ]
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<typeof mockProducts[0] | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<typeof mockProducts>([]);

  useEffect(() => {
    // Simulate API loading delay
    setIsLoading(true);
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        // Get related products from the same category
        const related = mockProducts
          .filter(p => p.category === foundProduct.category && p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      setIsLoading(false);
    }, 500);
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

  if (!product) {
    return (
      <div className="min-h-screen pt-20 pb-section">
        <div className="max-w-container mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
      </div>
    );
  }

  const images = productImages[product.id] || [product.image];

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
            originalPrice={product.originalPrice}
            description={`Experience the future of fashion with this ${product.brand} ${product.name.toLowerCase()}. Perfect for both urban exploration and digital frontiers.`}
            material="Premium blend of sustainable materials"
            partnerUrl={product.partnerUrl}
            deliveryDate="5-7 business days"
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

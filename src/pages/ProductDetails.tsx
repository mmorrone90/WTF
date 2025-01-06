import React from 'react';
import ProductImageCarousel from '../components/product/ProductImageCarousel';
import ProductInfo from '../components/product/ProductInfo';

const DEMO_IMAGES = [
  'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
  'https://images.unsplash.com/photo-1542280756-74b2f55e73ab',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
  'https://images.unsplash.com/photo-1554412933-514a83d2f3c8'
];

export default function ProductDetails() {
  return (
    <div className="min-h-screen pt-20 pb-section">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Image Carousel */}
          <div className="sticky top-24">
            <ProductImageCarousel images={DEMO_IMAGES} />
          </div>

          {/* Right: Product Info */}
          <ProductInfo
            name="Neon Dreams Jacket"
            price="$299"
            description="Elevate your style with this cyberpunk-inspired jacket. Features LED-reactive fabric, weather-adaptive thermal lining, and smart connectivity. Perfect for both urban exploration and digital frontiers."
            sizes={['XS', 'S', 'M', 'L', 'XL']}
            deliveryDate="March 15-20"
          />
        </div>
      </div>
    </div>
  );
}

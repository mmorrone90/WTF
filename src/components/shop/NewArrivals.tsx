import React from 'react';
import { Sparkles } from 'lucide-react';
import { Carousel } from '../ui/apple-cards-carousel';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../ProductCard';

export default function NewArrivals() {
  const { products, isLoading } = useProducts();

  // Get the 6 most recent products
  const newArrivals = products.slice(0, 6);

  if (isLoading || newArrivals.length === 0) {
    return null;
  }

  const carouselItems = newArrivals.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      brand={product.brand}
      image={product.image}
      price={product.price}
      currency={product.currency}
      originalPrice={product.originalPrice}
      rating={product.rating}
      partnerUrl={product.partnerUrl}
      product_url={product.product_url}
      discount={product.discount}
      sold={product.sold}
      variant="simple"
    />
  ));

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
        <Sparkles className="text-neon-yellow w-6 h-6" />
        New Arrivals
      </h2>
      <div className="w-full max-w-[1400px] mx-auto">
        <Carousel items={carouselItems} />
      </div>
    </div>
  );
} 
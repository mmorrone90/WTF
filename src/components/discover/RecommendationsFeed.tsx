import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import { Product } from '../../types/product';
import { ParallaxScroll } from '../ui/parallax-scroll';

export default function RecommendationsFeed() {
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(products => {
      setRecommended(products.slice(0, 9)); // Ensure at least 9 products for parallax
    });
  }, []);

  if (recommended.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Recommended for You
        </h2>
        <ParallaxScroll 
          images={recommended.map(product => product.image)}
          className="bg-[#0A0A0A]"
        />
      </div>
    </section>
  );
} 
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import ProductCard from '../ProductCard';

interface BestSellersProps {
  products: Product[];
  isLoading?: boolean;
  error?: Error | null;
}

export default function BestSellers({ 
  products, 
  isLoading = false,
  error = null 
}: BestSellersProps) {
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Best Sellers</h2>
        <Link 
          to="/shop/best-sellers"
          className="flex items-center gap-2 text-neon-yellow hover:text-neon-yellow/80 transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            variant="simple"
          />
        ))}
        {isLoading && (
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white/5 rounded-xl aspect-square mb-4" />
              <div className="bg-white/5 h-4 rounded mb-2 w-3/4" />
              <div className="bg-white/5 h-4 rounded w-1/4" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

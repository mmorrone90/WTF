import React from 'react';
import { Product } from '../../types/product';
import ProductCard from '../ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  error?: Error | null;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export default function ProductGrid({ 
  products, 
  isLoading = false,
  error = null,
  hasMore = false,
  onLoadMore 
}: ProductGridProps) {
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {isLoading && (
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white/5 rounded-xl aspect-[3/4] mb-4" />
              <div className="bg-white/5 h-4 rounded mb-2 w-3/4" />
              <div className="bg-white/5 h-4 rounded w-1/4" />
            </div>
          ))
        )}
      </div>
      
      {hasMore && !isLoading && (
        <div className="mt-8 text-center">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

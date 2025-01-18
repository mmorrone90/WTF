import React from 'react';
import { Product } from '../../types/product';
import ProductGrid from './ProductGrid';

interface NewArrivalsProps {
  initialProducts: Product[];
  isLoading?: boolean;
  error?: Error | null;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export default function NewArrivals({ 
  initialProducts, 
  isLoading = false,
  error = null,
  hasMore = false,
  onLoadMore
}: NewArrivalsProps) {
  return (
    <div>
      <ProductGrid 
        products={initialProducts}
        isLoading={isLoading}
        error={error}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
      />
    </div>
  );
} 
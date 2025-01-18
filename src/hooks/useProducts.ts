import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { getProducts } from '../services/productService';

export interface UseProductsOptions {
  category?: string;
  includeOutOfStock?: boolean;
  partnerId?: string;
  includeAllStatuses?: boolean;
}

export function useProducts({ 
  category, 
  includeOutOfStock = false,
  partnerId,
  includeAllStatuses = false
}: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { products: fetchedProducts } = await getProducts({ 
          category, 
          includeOutOfStock,
          partnerId,
          includeAllStatuses
        });
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, includeOutOfStock, partnerId, includeAllStatuses]);

  return { products, isLoading, error };
}

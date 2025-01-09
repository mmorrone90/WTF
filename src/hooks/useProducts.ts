import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { getProducts } from '../services/productService';

// Cache object to store products with their filter keys
const cache: {
  [key: string]: {
    data: Product[];
    timestamp: number;
  };
} = {};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

interface UseProductsOptions {
  category?: string;
  gender?: string;
  includeOutOfStock?: boolean;
}

export function useProducts({ category, gender, includeOutOfStock = false }: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Create a cache key based on filter parameters
  const cacheKey = JSON.stringify({ category, gender, includeOutOfStock });

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        
        // Check cache first
        const now = Date.now();
        const cached = cache[cacheKey];
        
        if (cached && (now - cached.timestamp) < CACHE_DURATION) {
          setProducts(cached.data);
          setIsLoading(false);
          return;
        }

        const allProducts = await getProducts();
        
        // Filter products based on tags and stock
        let filteredProducts = allProducts;
        
        if (!includeOutOfStock) {
          filteredProducts = filteredProducts.filter(product => product.stock > 0);
        }
        
        if (category || gender) {
          filteredProducts = filteredProducts.filter(product => {
            const tags = Array.isArray(product.tags) ? product.tags : product.tags?.toLowerCase().split(',') || [];
            const matchesCategory = !category || tags.includes(category.toLowerCase());
            const matchesGender = !gender || tags.includes(gender.toLowerCase());
            return matchesCategory && matchesGender;
          });
        }

        // Update cache
        cache[cacheKey] = {
          data: filteredProducts,
          timestamp: now
        };

        setProducts(filteredProducts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [cacheKey]);

  return { products, isLoading, error };
}

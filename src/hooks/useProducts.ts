import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { getProducts } from '../services/productService';

export interface UseProductsOptions {
  category?: string;
  includeOutOfStock?: boolean;
}

export function useProducts({ category, includeOutOfStock = false }: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Create a cache key based on the filter options
  const cacheKey = JSON.stringify({ category, includeOutOfStock });

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getProducts();
        let fetchedProducts = response.products;

        // Filter out of stock products if needed
        if (!includeOutOfStock) {
          fetchedProducts = fetchedProducts.filter((product: Product) => product.stock > 0);
        }

        // Apply category filter if specified
        if (category) {
          fetchedProducts = fetchedProducts.filter((product: Product) => {
            // Normalize tags to array of lowercase strings
            const productTags = typeof product.tags === 'string' 
              ? (product.tags as string).split(',').map(t => t.trim().toLowerCase())
              : Array.isArray(product.tags) 
                ? (product.tags as string[]).map(t => t.toLowerCase())
                : [];

            return productTags.includes(category.toLowerCase());
          });
        }

        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [cacheKey]);

  return { products, isLoading, error };
}

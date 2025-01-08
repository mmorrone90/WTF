import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { getProducts } from '../services/productService';

interface UseProductsOptions {
  category?: string;
  gender?: string;
}

export function useProducts({ category, gender }: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const allProducts = await getProducts();
        
        // Filter products based on tags
        let filteredProducts = allProducts;
        
        if (category || gender) {
          filteredProducts = allProducts.filter(product => {
            const tags = product.tags?.toLowerCase().split(',') || [];
            const matchesCategory = !category || tags.includes(category.toLowerCase());
            const matchesGender = !gender || tags.includes(gender.toLowerCase());
            return matchesCategory && matchesGender;
          });
        }

        setProducts(filteredProducts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [category, gender]);

  return { products, isLoading, error };
}

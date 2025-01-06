import { useState, useEffect, useMemo } from 'react';
import { mockProducts, MockProduct } from '../data/mockProducts';

interface UseProductsProps {
  category?: string;
  gender?: string;
}

export function useProducts({ category, gender }: UseProductsProps = {}) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter products based on category and gender
  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    if (gender) {
      filtered = filtered.filter(product => 
        product.gender === gender || product.gender === 'unisex'
      );
    }

    return filtered;
  }, [category, gender]);

  return {
    products: filteredProducts,
    isLoading
  };
}

import { useState, useEffect } from 'react';
import { Product } from '../types/product';

const DEMO_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cyber Runner Jacket',
    brand: 'TechWear Co.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3'
  },
  {
    id: '2',
    name: 'Digital Pulse Boots',
    brand: 'NeoTokyo',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1542280756-74b2f55e73ab'
  },
  // Add more demo products
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadProducts = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(DEMO_PRODUCTS);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  return { products, isLoading };
}
import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard';
import { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-square bg-dark-grey rounded-xl" />
            <div className="h-4 bg-dark-grey rounded w-2/3" />
            <div className="h-4 bg-dark-grey rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProductCard
            id={product.id}
            name={product.name}
            brand={product.brand}
            image={product.image}
            price={product.price}
            originalPrice={product.originalPrice}
            partnerUrl={product.partnerUrl}
            variant="detailed"
          />
        </motion.div>
      ))}
    </div>
  );
}

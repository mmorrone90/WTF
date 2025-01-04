import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group"
        >
          <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500
                       group-hover:scale-110"
            />
            <button className="absolute top-4 right-4 p-2 rounded-full
                           bg-black/50 backdrop-blur-sm
                           hover:bg-black/70 transition-colors">
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>
          
          <div>
            <p className="text-text-grey text-sm mb-1">{product.brand}</p>
            <h3 className="font-bold mb-2">{product.name}</h3>
            <p className="text-neon-yellow font-bold">${product.price}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
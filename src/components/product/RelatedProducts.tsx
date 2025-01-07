import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { MockProduct } from '../../data/mockProducts';

interface RelatedProductsProps {
  products: MockProduct[];
  currentProductId: string;
}

export default function RelatedProducts({
  products,
  currentProductId
}: RelatedProductsProps) {
  const navigate = useNavigate();

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-grey/30 rounded-xl overflow-hidden cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-neon-yellow font-bold">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-text-grey line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 
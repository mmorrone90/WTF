import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
}

export default function ProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  rating = 5
}: ProductCardProps) {
  return (
    <Link to={`/product/${id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="group"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500
                     group-hover:scale-110"
          />
          <button className="absolute bottom-4 left-1/2 -translate-x-1/2 
                         px-6 py-2 bg-black/80 backdrop-blur-sm rounded-full
                         text-white opacity-0 group-hover:opacity-100
                         transition-opacity duration-300">
            View Product
          </button>
          <div className="absolute bottom-0 inset-x-0 h-1/2 
                       bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-neon-yellow font-bold">${price.toFixed(2)} USD</span>
            {originalPrice && (
              <span className="ml-2 text-text-grey line-through">
                ${originalPrice.toFixed(2)} USD
              </span>
            )}
          </div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm ${i < rating ? 'text-neon-yellow' : 'text-text-grey'}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
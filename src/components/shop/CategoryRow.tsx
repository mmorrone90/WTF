import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface CategoryRowProps {
  category: string;
  products: Product[];
}

export default function CategoryRow({ category, products }: CategoryRowProps) {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">{category}</h3>
        <Link 
          to={`/category/${category.toLowerCase()}`}
          className="flex items-center gap-2 text-neon-yellow hover:text-neon-yellow/80 transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <Link to={`/product/${product.id}`}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <h4 className="font-bold mb-2">{product.name}</h4>
              <p className="text-neon-yellow">${product.price}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

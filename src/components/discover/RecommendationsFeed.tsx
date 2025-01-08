import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import { Product } from '../../types/product';
import ProductCard from '../ProductCard';

export default function RecommendationsFeed() {
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products and select a few for recommendations
    getProducts().then(products => {
      // For now, just take the first 5 products as recommendations
      // In a real app, this would use an algorithm to select relevant products
      setRecommended(products.slice(0, 5));
    });
  }, []);

  if (recommended.length === 0) {
    return null;
  }
  
  return (
    <section className="relative">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
        <Zap className="text-neon-yellow w-6 h-6" />
        Recommended for You
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommended.map((item) => (
          <motion.div 
            key={item.id}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-64 h-64 relative overflow-hidden rounded-full">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 flex items-center justify-center">
                <button 
                  className="bg-neon-yellow text-black px-4 py-2 rounded-full 
                  flex items-center gap-2 hover:bg-neon-yellow/80 transition"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <Eye className="w-5 h-5" />
                  View Details
                </button>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-neon-yellow">${item.price.toFixed(2)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 
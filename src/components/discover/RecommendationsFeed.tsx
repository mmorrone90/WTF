import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye } from 'lucide-react';
import { mockProducts } from '../../data/mockProducts';

export default function RecommendationsFeed() {
  // Simulated recommendations (in future, this will come from an API)
  const recommended = [
    mockProducts.find(p => p.id === '3'), // Neon Dreams Hoodie
    mockProducts.find(p => p.id === '1'), // Tech Wear Jacket
    mockProducts.find(p => p.id === '7'), // Tech Runner Sneakers
    mockProducts.find(p => p.id === '4'), // Cyber Punk Dress
    mockProducts.find(p => p.id === '6')  // Holographic Crop Top
  ].filter(Boolean) as typeof mockProducts;

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
                  onClick={() => {
                    // TODO: Implement navigation or modal for product details
                    console.log(`View details for ${item.name}`);
                  }}
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
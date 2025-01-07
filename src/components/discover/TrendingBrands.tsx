import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

// Mock brands data
const trendingBrands = [
  {
    id: '1',
    name: 'CyberStyle',
    logo: 'https://via.placeholder.com/150?text=CyberStyle',
    description: 'Cutting-edge urban fashion'
  },
  {
    id: '2',
    name: 'NeoTokyo',
    logo: 'https://via.placeholder.com/150?text=NeoTokyo',
    description: 'Futuristic streetwear'
  },
  {
    id: '3',
    name: 'Digital Couture',
    logo: 'https://via.placeholder.com/150?text=DigitalCouture',
    description: 'High-tech fashion design'
  },
  {
    id: '4',
    name: 'Synthwave',
    logo: 'https://via.placeholder.com/150?text=Synthwave',
    description: 'Retro-futuristic apparel'
  },
  {
    id: '5',
    name: 'Cyber Glam',
    logo: 'https://via.placeholder.com/150?text=CyberGlam',
    description: 'Glamorous tech wear'
  },
  {
    id: '6',
    name: 'Urban Nomad',
    logo: 'https://via.placeholder.com/150?text=UrbanNomad',
    description: 'Adaptive urban clothing'
  },
  {
    id: '7',
    name: 'Tech Fit',
    logo: 'https://via.placeholder.com/150?text=TechFit',
    description: 'Performance tech apparel'
  },
  {
    id: '8',
    name: 'Pixel Wear',
    logo: 'https://via.placeholder.com/150?text=PixelWear',
    description: 'Digital-inspired fashion'
  },
  {
    id: '9',
    name: 'Neon Tribe',
    logo: 'https://via.placeholder.com/150?text=NeonTribe',
    description: 'Vibrant street fashion'
  },
  {
    id: '10',
    name: 'Circuit Style',
    logo: 'https://via.placeholder.com/150?text=CircuitStyle',
    description: 'Tech-inspired clothing'
  },
  {
    id: '11',
    name: 'Quantum Wear',
    logo: 'https://via.placeholder.com/150?text=QuantumWear',
    description: 'Innovative fashion tech'
  },
  {
    id: '12',
    name: 'Cyber Pulse',
    logo: 'https://via.placeholder.com/150?text=CyberPulse',
    description: 'Dynamic urban wear'
  },
  {
    id: '13',
    name: 'Digital Nomad',
    logo: 'https://via.placeholder.com/150?text=DigitalNomad',
    description: 'Adaptive lifestyle clothing'
  },
  {
    id: '14',
    name: 'Techno Tribe',
    logo: 'https://via.placeholder.com/150?text=TechnoTribe',
    description: 'Underground tech fashion'
  },
  {
    id: '15',
    name: 'Cyber Fusion',
    logo: 'https://via.placeholder.com/150?text=CyberFusion',
    description: 'Fusion of tech and style'
  }
];

export default function TrendingBrands() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % Math.ceil(trendingBrands.length / 5)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate the brands to display in current view
  const getBrandsForCurrentView = () => {
    const startIndex = currentIndex * 5;
    return trendingBrands.slice(startIndex, startIndex + 5);
  };

  return (
    <section className="relative py-12">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
        <Zap className="text-neon-yellow w-6 h-6" />
        Trending Brands
      </h2>

      <div className="relative overflow-hidden">
        <motion.div 
          className="flex space-x-6 justify-center"
          animate={{ 
            x: -currentIndex * (window.innerWidth * 0.8),
          }}
          transition={{ 
            type: "tween",
            duration: 0.5 
          }}
        >
          {getBrandsForCurrentView().map((brand) => (
            <motion.div 
              key={brand.id}
              className="w-64 bg-dark-grey/30 rounded-xl p-6 text-center 
              hover:bg-dark-grey/50 transition-all duration-300 
              flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={brand.logo} 
                alt={`${brand.name} logo`} 
                className="w-32 h-32 object-contain mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
              <p className="text-sm text-neon-yellow">{brand.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: Math.ceil(trendingBrands.length / 5) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index 
                ? 'bg-neon-yellow' 
                : 'bg-dark-grey/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
} 
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import ScrollingText from './ScrollingText';

const leftImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
];

const rightImages = [
  'https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa',
  'https://images.unsplash.com/photo-1554412933-514a83d2f3c8',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b',
  'https://images.unsplash.com/photo-1517466787929-bc90951d0974',
];

export default function HeroGallery() {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0" />

      {/* Left Column */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '-50%' }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
          repeatType: "reverse"
        }}
        className="absolute left-0 top-0 w-1/3 space-y-4 p-4 z-10"
      >
        {[...leftImages, ...leftImages].map((image, index) => (
          <div
            key={index}
            className="relative aspect-[3/4] overflow-hidden rounded-xl"
          >
            <img
              src={image}
              alt="Fashion item"
              className="w-full h-full object-cover filter blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          </div>
        ))}
      </motion.div>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <div className="w-1/3 h-[60vh] overflow-hidden">
          <ScrollingText />
        </div>
        
        {/* Search Bar */}
        <div className="absolute bottom-12 w-full max-w-2xl px-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full bg-black/50 backdrop-blur-xl rounded-xl px-12 py-4
                       text-white placeholder-text-grey border-2 border-dark-grey
                       focus:border-neon-yellow focus:outline-none transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-grey" />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <motion.div
        initial={{ y: '-50%' }}
        animate={{ y: '0%' }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
          repeatType: "reverse"
        }}
        className="absolute right-0 top-0 w-1/3 space-y-4 p-4 z-10"
      >
        {[...rightImages, ...rightImages].map((image, index) => (
          <div
            key={index}
            className="relative aspect-[3/4] overflow-hidden rounded-xl"
          >
            <img
              src={image}
              alt="Fashion item"
              className="w-full h-full object-cover filter blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
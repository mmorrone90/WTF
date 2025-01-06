import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import ScrollingText from './ScrollingText';

// Optimized image URLs
const leftImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&w=400&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&w=400&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&w=400&q=80',
];

const rightImages = [
  'https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa?auto=format&w=400&q=80',
  'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&w=400&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&w=400&q=80',
];

export default function HeroGallery() {
  return (
    <div className="relative">
      {/* Main Gallery Section */}
      <section className="relative h-[calc(75vh-30px)] w-full overflow-hidden">
        {/* Background Blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black backdrop-blur-md z-0" />

        {/* Bottom Black Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-black to-transparent z-0" />

        {/* Left Column */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: '-25%' }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
            repeatType: "reverse"
          }}
          className="absolute left-0 top-0 w-1/3 space-y-4 p-4 z-10 will-change-transform opacity-90"
        >
          {[...leftImages, ...leftImages].map((image, index) => (
            <motion.div
              key={index}
              className="relative aspect-[3/4] overflow-hidden rounded-xl will-change-transform"
              style={{
                translateZ: 0,
                backfaceVisibility: 'hidden'
              }}
            >
              <img
                src={image}
                alt="Fashion item"
                className="w-full h-full object-cover filter blur-[2px] transform-gpu"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            </motion.div>
          ))}
        </motion.div>

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          {/* Search Bar */}
          <div className="w-full max-w-2xl px-6">
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

        {/* Scrolling Text Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <ScrollingText />
        </div>

        {/* Right Column */}
        <motion.div
          initial={{ y: '-25%' }}
          animate={{ y: '0%' }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
            repeatType: "reverse"
          }}
          className="absolute right-0 top-0 w-1/3 space-y-4 p-4 z-10 will-change-transform"
        >
          {[...rightImages, ...rightImages].map((image, index) => (
            <motion.div
              key={index}
              className="relative aspect-[3/4] overflow-hidden rounded-xl will-change-transform"
              style={{
                translateZ: 0,
                backfaceVisibility: 'hidden'
              }}
            >
              <img
                src={image}
                alt="Fashion item"
                className="w-full h-full object-cover filter blur-[2px] transform-gpu"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Gradient Transition */}
      <div className="absolute -bottom-32 left-0 right-0 h-64 bg-gradient-to-t from-black via-black to-transparent pointer-events-none" />
    </div>
  );
}

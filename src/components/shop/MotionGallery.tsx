import React from 'react';
import { motion } from 'framer-motion';

interface Image {
  url: string;
  alt: string;
}

const leftImages: Image[] = [
  { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f', alt: 'Fashion item 1' },
  { url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b', alt: 'Fashion item 2' },
  { url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c', alt: 'Fashion item 3' },
  { url: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8', alt: 'Fashion item 4' },
];

const rightImages: Image[] = [
  { url: 'https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa', alt: 'Fashion item 5' },
  { url: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8', alt: 'Fashion item 6' },
  { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f', alt: 'Fashion item 7' },
  { url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b', alt: 'Fashion item 8' },
];

export default function MotionGallery() {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Left Column */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-1000, 0] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear"
        }}
        className="absolute left-4 top-0 w-1/3 space-y-4"
      >
        {leftImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[3/4] overflow-hidden rounded-xl"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          </div>
        ))}
      </motion.div>

      {/* Right Column */}
      <motion.div
        initial={{ y: -1000 }}
        animate={{ y: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear"
        }}
        className="absolute right-4 top-0 w-1/3 space-y-4"
      >
        {rightImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[3/4] overflow-hidden rounded-xl"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

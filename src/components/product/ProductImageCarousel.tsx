import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Dialog } from '@headlessui/react';

interface ProductImageCarouselProps {
  images: string[];
}

export default function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div 
        className="relative aspect-square rounded-xl overflow-hidden bg-dark-grey"
        onMouseMove={handleMouseMove}
      >
        {/* Loading placeholder */}
        <div className="absolute inset-0 bg-dark-grey animate-pulse" />

        {/* Main image with parallax */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              x: mousePosition.x * 20 - 10,
              y: mousePosition.y * 20 - 10,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 0.3 },
              x: { type: "spring", stiffness: 300, damping: 30 },
              y: { type: "spring", stiffness: 300, damping: 30 }
            }}
            style={{ scale: 1.1 }}
          >
            <img
              src={images[currentIndex]}
              alt={`Product image ${currentIndex + 1}`}
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
              onLoad={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.opacity = '1';
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Zoom indicator */}
        <div className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 text-white">
          <ZoomIn className="w-5 h-5" />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative aspect-square rounded-lg overflow-hidden ${
              index === currentIndex ? 'ring-2 ring-neon-yellow' : 'opacity-70 hover:opacity-100'
            } transition-all`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Zoom modal */}
      <Dialog
        open={isZoomed}
        onClose={() => setIsZoomed(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black/90" />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`Product image ${currentIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 text-white hover:text-neon-yellow"
          >
            Close
          </button>
        </div>
      </Dialog>
    </div>
  );
}

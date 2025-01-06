import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/glow.css';

interface ProductImageCarouselProps {
  images: string[];
}

export default function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative aspect-square rounded-lg overflow-hidden">
      {/* Main Image */}
      <div className="relative h-full">
        <img
          src={images[currentIndex]}
          alt={`Product view ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Like Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm
                     hover:bg-black/70 transition-colors z-10"
        >
          <Heart
            className={`w-6 h-6 ${isLiked ? 'fill-neon-yellow text-neon-yellow' : 'text-white'}`}
          />
        </button>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm
                       hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm
                       hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-colors
                       ${index === currentIndex ? 'bg-neon-yellow' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

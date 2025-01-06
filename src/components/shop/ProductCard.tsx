import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ImageIcon } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  partnerUrl?: string;
}

export default function ProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  rating = 5,
  partnerUrl
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (partnerUrl) {
      window.open(partnerUrl, '_blank');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link to={`/product/${id}`}>
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl mb-4 group">
        {imageError ? (
          // Placeholder
          <div className="w-full h-full bg-dark-grey flex items-center justify-center">
            <div className="text-center text-text-grey">
              <ImageIcon className="w-12 h-12 mx-auto mb-2" />
              <span className="text-sm">Image not available</span>
            </div>
          </div>
        ) : (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 
                     group-hover:scale-110"
            onError={handleImageError}
          />
        )}
        
        {/* View Product Button */}
        <div className="absolute inset-0 flex items-center justify-center 
                     bg-black/60 backdrop-blur-sm opacity-0 
                     group-hover:opacity-100 transition-opacity">
          <span className="px-8 py-3 bg-black rounded-full text-white 
                        font-bold hover:bg-black/80 transition-colors">
            View Product
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold">{name}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-neon-yellow font-bold">
              ${price.toFixed(2)} USD
            </span>
            {originalPrice && (
              <span className="text-text-grey line-through">
                ${originalPrice.toFixed(2)} USD
              </span>
            )}
          </div>
        </div>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          className="w-full flex items-center justify-center gap-2 
                   bg-dark-grey hover:bg-dark-grey/80 
                   text-white font-bold px-6 py-3 rounded-lg
                   transition-colors"
        >
          <Plus className="w-5 h-5" />
          Buy it now
        </button>

        {/* Rating */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${i < rating ? 'text-neon-yellow' : 'text-text-grey'}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

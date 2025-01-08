import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ImageIcon, Tag } from 'lucide-react';
import Card from './ui/Card';

interface ProductCardProps {
  id: string;
  name: string;
  brand?: string;
  image: string;
  price: number;
  currency: string;
  originalPrice?: number;
  rating?: number;
  partnerUrl?: string;
  discount?: string;
  sold?: string;
  variant?: 'simple' | 'detailed';
}

export default function ProductCard({
  id,
  name,
  brand,
  image,
  price,
  currency = 'USD',
  originalPrice,
  rating = 5,
  partnerUrl,
  discount,
  sold,
  variant = 'detailed'
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (partnerUrl) {
      // Track click event
      if (window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'ecommerce',
          event_label: 'buy_now',
          value: price
        });
      }
      window.open(partnerUrl, '_blank');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  if (variant === 'simple') {
    return (
      <div onClick={handleCardClick} className="cursor-pointer">
        <Card>
          <div className="relative aspect-square overflow-hidden">
            {imageError ? (
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
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={handleImageError}
              />
            )}
            {discount && (
              <div className="absolute top-3 right-3 bg-neon-yellow text-black px-2 py-1 rounded-full text-sm font-bold">
                {discount}
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-bold mb-2">{name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-neon-yellow font-bold">
                ${price.toFixed(2)} {currency}
              </span>
              {sold && (
                <div className="flex items-center text-text-grey text-sm">
                  <Tag className="w-4 h-4 mr-1" />
                  {sold} sold
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl mb-4 group">
        {imageError ? (
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
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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

        {discount && (
          <div className="absolute top-3 right-3 bg-neon-yellow text-black px-2 py-1 rounded-full text-sm font-bold">
            {discount}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold">{name}</h3>
        {brand && <p className="text-text-grey">{brand}</p>}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-neon-yellow font-bold">
              ${price.toFixed(2)} {currency}
            </span>
            {originalPrice && (
              <span className="text-text-grey line-through">
                ${originalPrice.toFixed(2)} {currency}
              </span>
            )}
          </div>
          {sold && (
            <div className="flex items-center text-text-grey text-sm">
              <Tag className="w-4 h-4 mr-1" />
              {sold} sold
            </div>
          )}
        </div>

        {/* Buy Now Button */}
        {partnerUrl && (
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
        )}

        {/* Rating */}
        {rating && (
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
        )}
      </div>
    </div>
  );
}

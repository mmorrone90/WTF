import React, { useState } from 'react';
import { Heart, Truck, Loader2 } from 'lucide-react';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuthContext } from '../../contexts/AuthContext';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

interface ProductInfoProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  material?: string;
  partnerUrl: string;
  deliveryDate?: string;
}

export default function ProductInfo({
  id,
  name,
  brand,
  price,
  originalPrice,
  description,
  material,
  partnerUrl,
  deliveryDate
}: ProductInfoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { isInWishlist, toggleWishlistItem } = useWishlist();
  const { user } = useAuthContext();
  const isWishlisted = isInWishlist(id);

  const handleWishlistClick = async () => {
    if (!user) {
      // TODO: Show login modal
      return;
    }
    await toggleWishlistItem(id);
  };

  const handleBuyClick = () => {
    // Track click event
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'ecommerce',
        event_label: 'buy_now',
        value: price
      });
    }

    setIsLoading(true);

    // Trigger confetti animation and wait for it to finish
    const duration = 2000; // Animation duration in milliseconds
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D6FF00', '#FFFFFF', '#333333'],
      angle: 90,
      startVelocity: 45,
      gravity: 1.2,
      ticks: 200
    });

    // Wait for animation to finish before opening URL
    setTimeout(() => {
      setIsLoading(false);
      window.open(partnerUrl, '_blank');
    }, duration);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <p className="text-text-grey">{brand}</p>
        </div>
        <button
          onClick={handleWishlistClick}
          className="p-2 rounded-full hover:bg-dark-grey/50 transition-colors"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-6 h-6 transition-colors ${
              isWishlisted ? 'fill-neon-yellow text-neon-yellow' : 'text-text-grey'
            }`}
          />
        </button>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold text-neon-yellow">
          ${price.toFixed(2)}
        </span>
        {originalPrice && (
          <span className="text-lg text-text-grey line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-text-grey leading-relaxed">{description}</p>

      {/* Details */}
      <div className="space-y-4">
        {material && (
          <div>
            <h3 className="font-bold mb-2">Material</h3>
            <p className="text-text-grey">{material}</p>
          </div>
        )}

        {deliveryDate && (
          <div className="flex items-center gap-2 text-text-grey">
            <Truck className="w-5 h-5" />
            <span>Estimated delivery: {deliveryDate}</span>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="space-y-4">
        <motion.button
          onClick={handleBuyClick}
          disabled={isLoading}
          className="w-full py-4 bg-neon-yellow text-black font-bold rounded-lg
                   hover:bg-neon-yellow/90 transition-colors text-lg
                   disabled:opacity-75 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2"
          whileHover={isLoading ? {} : { scale: 1.02 }}
          whileTap={isLoading ? {} : { scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Redirecting to {brand}...
            </>
          ) : (
            `Shop Now on ${brand}`
          )}
        </motion.button>
        <p className="text-sm text-text-grey text-center">
          WTF may earn a commission from this link
        </p>
      </div>
    </div>
  );
}

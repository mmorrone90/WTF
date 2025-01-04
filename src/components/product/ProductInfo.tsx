import React from 'react';
import Button from '../ui/Button';
import { Tag, Truck } from 'lucide-react';

interface ProductInfoProps {
  name: string;
  price: string;
  description: string;
  sizes: string[];
  deliveryDate: string;
}

export default function ProductInfo({ 
  name, 
  price, 
  description, 
  sizes,
  deliveryDate 
}: ProductInfoProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-2xl font-bold text-neon-yellow">{price}</p>
      </div>

      {/* Description */}
      <p className="text-text-grey leading-relaxed">{description}</p>

      {/* Sizes */}
      <div>
        <h3 className="font-bold mb-3">Select Size</h3>
        <div className="flex gap-2 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size}
              className="px-4 py-2 border-2 border-dark-grey rounded-lg
                         hover:border-neon-yellow hover:text-neon-yellow
                         transition-colors"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Delivery Info */}
      <div className="flex items-center gap-2 text-text-grey">
        <Truck className="w-5 h-5" />
        <span>Estimated delivery: {deliveryDate}</span>
      </div>

      {/* Buy Button */}
      <Button className="w-full py-4 text-lg">
        Buy it now!
      </Button>
    </div>
  );
}
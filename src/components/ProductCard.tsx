import React from 'react';
import { Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from './ui/Card';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: string;
  discount?: string;
  sold?: string;
}

export default function ProductCard({ id, name, image, price, discount, sold }: ProductCardProps) {
  return (
    <Link to={`/product/${id}`}>
      <Card>
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {discount && (
            <div className="absolute top-3 right-3 bg-neon-yellow text-black px-2 py-1 rounded-full text-sm font-bold">
              {discount}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-2">{name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-neon-yellow font-bold">{price}</span>
            {sold && (
              <div className="flex items-center text-text-grey text-sm">
                <Tag className="w-4 h-4 mr-1" />
                {sold} sold
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
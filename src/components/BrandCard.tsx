import React from 'react';
import { ExternalLink } from 'lucide-react';

interface BrandCardProps {
  name: string;
  image: string;
  followers: string;
}

export default function BrandCard({ name, image, followers }: BrandCardProps) {
  return (
    <div className="product-card group cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{name}</h3>
          <ExternalLink className="w-5 h-5 text-neon-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-text-grey">{followers} followers</p>
      </div>
    </div>
  );
}

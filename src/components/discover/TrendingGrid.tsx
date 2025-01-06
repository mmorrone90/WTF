import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

interface GridItem {
  id: string;
  title: string;
  image: string;
  category: string;
  trending?: boolean;
  size?: 'large' | 'medium' | 'small';
}

const items: GridItem[] = [
  {
    id: '1',
    title: 'Cyberpunk Streetwear',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
    category: 'Trending',
    trending: true,
    size: 'large'
  },
  {
    id: '2',
    title: 'Neo Tokyo Vibes',
    image: 'https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa',
    category: 'Popular',
    size: 'medium'
  },
  {
    id: '3',
    title: 'Digital Nomad',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    category: 'New',
    size: 'small'
  }
  // Add more items as needed to fill the 4x3 grid
];

export default function TrendingGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
      {items.map((item) => (
        <Link
          key={item.id}
          to={`/product/${item.id}`}
          className={`group relative overflow-hidden rounded-xl
                     ${item.size === 'large' ? 'col-span-2 row-span-2' : ''}
                     ${item.size === 'medium' ? 'col-span-2' : ''}`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            {item.trending && (
              <div className="flex items-center gap-2 text-neon-yellow text-sm font-bold mb-2">
                <Sparkles className="w-4 h-4" />
                Trending Now
              </div>
            )}
            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
            <p className="text-text-grey">{item.category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

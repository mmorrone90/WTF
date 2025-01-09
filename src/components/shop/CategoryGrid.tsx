import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  size?: 'large' | 'medium' | 'small';
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Streetwear',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
    itemCount: 120,
    size: 'large'
  },
  {
    id: '2',
    name: 'Techwear',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    itemCount: 85,
    size: 'medium'
  },
  {
    id: '3',
    name: 'Avant-Garde',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
    itemCount: 65,
    size: 'medium'
  },
  {
    id: '4',
    name: 'Minimalist',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    itemCount: 95,
    size: 'small'
  },
  {
    id: '5',
    name: 'Cyberpunk',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    itemCount: 45,
    size: 'small'
  }
];

export default function CategoryGrid() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/shop?category=${category.name.toLowerCase()}`}
            className={`group relative overflow-hidden rounded-2xl
              ${category.size === 'large' ? 'col-span-2 row-span-2' : ''}
              ${category.size === 'medium' ? 'col-span-2' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-full"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-300">
                  {category.itemCount} items
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
} 
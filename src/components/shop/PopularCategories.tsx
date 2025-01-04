import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Category {
  name: string;
  image: string;
  link: string;
}

const categories: Category[] = [
  {
    name: 'Clothes',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    link: '/category/clothes'
  },
  {
    name: 'Sneakers',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    link: '/category/sneakers'
  },
  {
    name: 'Watches',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314',
    link: '/category/watches'
  },
  {
    name: 'Handbags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    link: '/category/handbags'
  }
];

export default function PopularCategories() {
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-8">Explore Popular Categories</h2>
      <div className="flex justify-between gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              to={category.link}
              className="group block"
            >
              <div className="relative w-[200px] h-[120px] overflow-hidden rounded-[30px]
                            before:absolute before:inset-0 before:bg-black/20 before:z-10
                            hover:shadow-lg transition-shadow duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500
                           group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 z-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-bold">{category.name}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
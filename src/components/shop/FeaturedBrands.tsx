import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  productCount: number;
}

const brands: Brand[] = [
  {
    id: '1',
    name: 'ACRONYM',
    logo: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    description: 'Technical apparel with uncompromising function',
    productCount: 45
  },
  {
    id: '2',
    name: 'Stone Island',
    logo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    description: 'Innovative materials and dyeing techniques',
    productCount: 78
  },
  {
    id: '3',
    name: 'Y-3',
    logo: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
    description: 'Sport-style with Yohji Yamamoto design',
    productCount: 62
  },
  {
    id: '4',
    name: 'Rick Owens',
    logo: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
    description: 'Avant-garde fashion with a dark aesthetic',
    productCount: 93
  }
];

export default function FeaturedBrands() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Featured Brands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link 
              to={`/shop?brand=${brand.name.toLowerCase()}`}
              className="group block bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{brand.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neon-yellow">{brand.productCount} Products</span>
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                  View Collection →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 
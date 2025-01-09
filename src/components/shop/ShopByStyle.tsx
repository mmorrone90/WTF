import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Style {
  id: string;
  name: string;
  image: string;
  description: string;
  itemCount: number;
}

const styles: Style[] = [
  {
    id: '1',
    name: 'Cyberpunk',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    description: 'High-tech meets street fashion',
    itemCount: 45
  },
  {
    id: '2',
    name: 'Minimalist',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    description: 'Clean lines and subtle details',
    itemCount: 78
  },
  {
    id: '3',
    name: 'Avant-Garde',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
    description: 'Push boundaries with bold designs',
    itemCount: 62
  }
];

export default function ShopByStyle() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Shop by Style</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {styles.map((style, index) => (
          <motion.div
            key={style.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link 
              to={`/shop?style=${style.name.toLowerCase()}`}
              className="group block"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-4">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {style.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {style.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neon-yellow">
                      {style.itemCount} Items
                    </span>
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 
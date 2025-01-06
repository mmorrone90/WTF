import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const bestSellers = [
  {
    id: 'bs1',
    name: 'Jeans Jacket',
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923',
    price: 34.00,
    originalPrice: 53.00,
    rating: 5,
    partnerUrl: 'https://example.com/jeans-jacket'
  },
  {
    id: 'bs2',
    name: 'Full Sleeve Top',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
    price: 40.00,
    originalPrice: 50.00,
    rating: 5,
    partnerUrl: 'https://example.com/full-sleeve-top'
  },
  {
    id: 'bs3',
    name: 'Winter Set',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    price: 35.00,
    originalPrice: 39.00,
    rating: 5,
    partnerUrl: 'https://example.com/winter-set'
  },
  {
    id: 'bs4',
    name: 'Jeans Shirt',
    image: 'https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa',
    price: 35.00,
    originalPrice: 39.00,
    rating: 5,
    partnerUrl: 'https://example.com/jeans-shirt'
  }
];

export default function BestSellers() {
  return (
    <section className="py-20 bg-dark-grey/20">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h2 className="text-5xl font-bold mb-4 md:mb-0">
            <span className="text-white">OUR BEST</span>{' '}
            <span className="text-text-grey">SELLERS</span>
          </h2>
          <p className="text-text-grey max-w-md text-lg">
            Explore our collection, where style meets comfort in trendy quality fabrics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

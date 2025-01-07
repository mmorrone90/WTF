import React from 'react';
import ProductCard from '../ProductCard';
import { motion } from 'framer-motion';
import { mockProducts, MockProduct } from '../../data/mockProducts';

// Select some products as best sellers
const bestSellers: MockProduct[] = [
  mockProducts.find(p => p.id === '1'), // Tech Wear Jacket
  mockProducts.find(p => p.id === '3'), // Neon Dreams Hoodie
  mockProducts.find(p => p.id === '7'), // Tech Runner Sneakers
  mockProducts.find(p => p.id === '8')  // Digital Camo Jacket
].filter((product): product is MockProduct => product !== undefined);

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
              <ProductCard
                id={product.id}
                name={product.name}
                brand={product.brand}
                image={product.image}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
                partnerUrl={product.partnerUrl}
                variant="detailed"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

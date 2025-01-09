import React from 'react';
import { motion } from 'framer-motion';
import AllProducts from '../components/shop/AllProducts';
import BestSellers from '../components/shop/BestSellers';
import { BottomNavigation } from '../components/Navigation';

export default function Shop() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-container mx-auto px-4 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* Page Title */}
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shop
        </motion.h1>

        {/* All Products Section */}
        <section>
          <AllProducts />
        </section>

        {/* Best Sellers Section */}
        <section>
          <BestSellers />
        </section>
      </main>

      {/* Mobile Navigation - Fixed at Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation />
      </div>
    </div>
  );
}

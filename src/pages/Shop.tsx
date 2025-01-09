import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AllProducts from '../components/shop/AllProducts';
import BestSellers from '../components/shop/BestSellers';
import { BottomNavigation } from '../components/Navigation';
import { getProducts } from '../services/productService';
import { Product } from '../types/product';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const { products: newProducts, total } = await getProducts({
          page: currentPage,
          limit: productsPerPage,
          includeOutOfStock: true
        });
        
        setProducts(prev => currentPage === 1 ? newProducts : [...prev, ...newProducts]);
        setTotalProducts(total);
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err instanceof Error ? err : new Error('Failed to load products'));
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [currentPage]);

  const loadMore = () => {
    if (!isLoading && products.length < totalProducts) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Get the first 4 products for the BestSellers section
  const bestSellers = products.slice(0, 4);

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

        {/* Best Sellers Section */}
        <section>
          <BestSellers 
            products={bestSellers} 
            isLoading={isLoading && currentPage === 1} 
            error={error} 
          />
        </section>

        {/* All Products Section */}
        <section>
          <AllProducts 
            initialProducts={products} 
            isLoading={isLoading} 
            error={error}
            hasMore={products.length < totalProducts}
            onLoadMore={loadMore}
          />
        </section>
      </main>

      {/* Mobile Navigation - Fixed at Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation />
      </div>
    </div>
  );
}

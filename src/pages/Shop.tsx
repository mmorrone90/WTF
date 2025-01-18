import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import AllProducts from '../components/shop/AllProducts';
import NewArrivals from '../components/shop/NewArrivals';
import { BottomNavigation } from '../components/Navigation';
import { getProducts } from '../services/productService';
import { Product } from '../types/product';
import { Partner } from '../types/database';
import { supabase } from '../lib/supabase';

interface ShopProps {
  view?: 'all-products' | 'best-sellers' | 'new-arrivals';
}

export default function Shop({ view }: ShopProps) {
  const { partnerId } = useParams<{ partnerId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [brand, setBrand] = useState<Partner | null>(null);
  const productsPerPage = 12;

  // Load brand details if partnerId is present
  useEffect(() => {
    if (!partnerId) {
      setBrand(null);
      return;
    }

    const loadBrand = async () => {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .eq('id', partnerId)
          .single();

        if (error) throw error;
        setBrand(data);
      } catch (err) {
        console.error('Error loading brand:', err);
        setError(err instanceof Error ? err : new Error('Failed to load brand'));
      }
    };

    void loadBrand();
  }, [partnerId]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const { products: newProducts, total } = await getProducts({
          page: currentPage,
          limit: productsPerPage,
          includeOutOfStock: true,
          partnerId,
          ...(view === 'best-sellers' && { sort: 'sales' }),
          ...(view === 'new-arrivals' && { sort: 'created_at' })
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
    // Reset to first page when partnerId changes
    if (partnerId) {
      setCurrentPage(1);
    }
  }, [currentPage, view, partnerId]);

  const loadMore = () => {
    if (!isLoading && products.length < totalProducts) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-container mx-auto px-4 py-8 sm:py-12">
        {/* Page Title */}
        {partnerId && brand ? (
          <div className="mb-12">
            <motion.div 
              className="flex flex-col items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white/5 p-4">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${brand.business_name}`}
                  alt={brand.business_name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold mb-2">{brand.business_name}</h1>
                {brand.website_url && (
                  <a 
                    href={brand.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-grey hover:text-neon-yellow transition-colors"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
              <div className="w-full max-w-2xl text-center text-text-grey">
                <p>Discover our curated collection of {totalProducts} products from {brand.business_name}.</p>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {view === 'best-sellers' ? 'Best Sellers' :
             view === 'new-arrivals' ? 'New Arrivals' :
             'Shop'}
          </motion.h1>
        )}

        {/* Products Section */}
        <section>
          {view === 'new-arrivals' ? (
            <NewArrivals 
              initialProducts={products} 
              isLoading={isLoading} 
              error={error}
              hasMore={products.length < totalProducts}
              onLoadMore={loadMore}
            />
          ) : (
            <AllProducts 
              initialProducts={products} 
              isLoading={isLoading} 
              error={error}
              hasMore={products.length < totalProducts}
              onLoadMore={loadMore}
            />
          )}
        </section>
      </main>

      {/* Mobile Navigation - Fixed at Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation />
      </div>
    </div>
  );
}

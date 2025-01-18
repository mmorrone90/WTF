import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Partner } from '../../types/database';
import { getFeaturedPartners } from '../../services/partnerService';

interface BrandWithProductCount extends Partner {
  products: { count: number };
}

export default function FeaturedBrands() {
  const [brands, setBrands] = useState<BrandWithProductCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      const partners = await getFeaturedPartners();
      setBrands(partners as BrandWithProductCount[]);
      setIsLoading(false);
    };

    loadBrands();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-8">Featured Brands</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white/5 rounded-xl p-6">
                <div className="aspect-square rounded-lg bg-white/10 mb-4" />
                <div className="h-6 bg-white/10 rounded mb-2 w-2/3" />
                <div className="h-4 bg-white/10 rounded mb-4 w-full" />
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-white/10 rounded w-1/3" />
                  <div className="h-4 bg-white/10 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (brands.length === 0) {
    return null;
  }

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
              to={`/shop/brand/${brand.id}`}
              className="group block bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${brand.business_name}`}
                  alt={brand.business_name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{brand.business_name}</h3>
              <p className="text-sm text-gray-400 mb-4">
                {brand.website_url ? (
                  <a 
                    href={brand.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-neon-yellow"
                  >
                    Visit Website →
                  </a>
                ) : 'Exclusive Collection'}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neon-yellow">{brand.products?.count || 0} Products</span>
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
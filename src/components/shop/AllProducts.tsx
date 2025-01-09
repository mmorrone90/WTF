import React, { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';
import { Product } from '../../types/product';
import { ProductGridSkeleton } from '../ui/Shimmer';

interface AllProductsProps {
  initialProducts: Product[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function AllProducts({ 
  initialProducts, 
  isLoading, 
  error,
  hasMore,
  onLoadMore 
}: AllProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter products locally instead of making API calls
  const filteredProducts = useMemo(() => {
    let result = initialProducts;

    if (selectedCategory || selectedGender) {
      result = result.filter(product => {
        const tags = Array.isArray(product.tags) ? product.tags : product.tags?.toLowerCase().split(',') || [];
        const matchesCategory = !selectedCategory || tags.includes(selectedCategory.toLowerCase());
        const matchesGender = !selectedGender || tags.includes(selectedGender.toLowerCase());
        return matchesCategory && matchesGender;
      });
    }

    return result;
  }, [initialProducts, selectedCategory, selectedGender]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender === selectedGender ? '' : gender);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">All Products</h2>
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="lg:hidden px-4 py-2 text-sm font-medium text-neon-yellow border border-neon-yellow rounded-lg hover:bg-neon-yellow/10"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Sidebar */}
        <div 
          className={`
            fixed inset-0 z-[100] lg:hidden bg-black/95 backdrop-blur-md transform transition-transform duration-300 overflow-y-auto
            ${isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="min-h-screen flex flex-col">
            <div className="sticky top-0 bg-black/95 z-50 flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 text-text-grey hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FilterSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                selectedGender={selectedGender}
                onGenderChange={handleGenderChange}
              />
            </div>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-64 flex-shrink-0">
          <h2 className="text-xl font-bold mb-6">Filter by category</h2>
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            selectedGender={selectedGender}
            onGenderChange={handleGenderChange}
          />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {error ? (
            <div className="text-center text-text-grey py-12">{error.message}</div>
          ) : (
            <div className="space-y-8">
              <ProductGrid 
                products={filteredProducts}
                isLoading={false}
              />
              {isLoading && <ProductGridSkeleton count={6} />}
              {!isLoading && hasMore && (
                <div className="text-center">
                  <button
                    onClick={onLoadMore}
                    className="px-6 py-3 bg-dark-grey/50 text-white rounded-lg hover:bg-dark-grey/70 transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
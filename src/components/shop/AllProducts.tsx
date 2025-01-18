import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';
import { Product } from '../../types/product';

interface AllProductsProps {
  initialProducts?: Product[];
  isLoading?: boolean;
  error?: Error | null;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export default function AllProducts({ 
  initialProducts = [], 
  isLoading = false, 
  error = null,
  hasMore = false,
  onLoadMore
}: AllProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowMobileFilters(true)}
        className="lg:hidden flex items-center gap-2 mb-4 text-text-grey hover:text-white transition-colors"
      >
        <Menu className="w-5 h-5" />
        <span>Filters</span>
      </button>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Mobile Sidebar */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 bg-black z-50">
            <div className="h-full overflow-auto">
              <FilterSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                isMobile
              />
            </div>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="absolute top-4 right-4 text-text-grey hover:text-white"
            >
              Close
            </button>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid 
            products={initialProducts} 
            isLoading={isLoading} 
            error={error}
            hasMore={hasMore}
            onLoadMore={onLoadMore}
          />
        </div>
      </div>
    </div>
  );
} 
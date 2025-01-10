import React from 'react';
import { PRODUCT_CATEGORIES } from '../../types/product-categories';

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isMobile?: boolean;
}

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  isMobile = false
}: FilterSidebarProps) {
  const categories = Object.values(PRODUCT_CATEGORIES);

  return (
    <div className={`space-y-8 ${isMobile ? 'p-4' : ''}`}>
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-neon-yellow/10 text-neon-yellow'
                  : 'text-text-grey hover:bg-dark-grey/50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

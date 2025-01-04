import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import HeroGallery from '../components/shop/HeroGallery';
import FilterSidebar from '../components/shop/FilterSidebar';
import ProductGrid from '../components/shop/ProductGrid';
import Button from '../components/ui/Button';
import { useProducts } from '../hooks/useProducts';

export default function Shop() {
  const { products, isLoading } = useProducts();
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const loadMore = () => {
    setVisibleProducts(prev => Math.min(prev + 8, products.length));
  };

  return (
    <div className="min-h-screen">
      <HeroGallery />
      
      <div className="max-w-container mx-auto px-6 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-2">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />
          </div>

          {/* Product Grid */}
          <div className="col-span-10">
            <ProductGrid 
              products={products.slice(0, visibleProducts)}
              isLoading={isLoading}
            />

            {/* Load More Button */}
            {visibleProducts < products.length && (
              <div className="text-center mt-8">
                <Button
                  onClick={loadMore}
                  variant="outline"
                  className="px-8 py-3"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
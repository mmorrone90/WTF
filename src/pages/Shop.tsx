import React, { useState } from 'react';
import FilterSidebar from '../components/shop/FilterSidebar';
import ProductGrid from '../components/shop/ProductGrid';
import HeroGallery from '../components/shop/HeroGallery';
import BestSellers from '../components/shop/BestSellers';
import { useProducts } from '../hooks/useProducts';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  
  const { products, isLoading } = useProducts({
    category: selectedCategory || undefined,
    gender: selectedGender || undefined
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender === selectedGender ? '' : gender);
  };

  return (
    <>
      {/* Hero Section */}
      <HeroGallery />
      
      {/* Products Section */}
      <section className="max-w-container mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-12">ALL PRODUCTS</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
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
            <ProductGrid 
              products={products}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <BestSellers />
    </>
  );
}

import React, { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import FeaturedCarousel from '../components/discover/FeaturedCarousel';
import FilterPanel from '../components/discover/FilterPanel';

// Lazy load components
const RecommendationsFeed = lazy(() => import('../components/discover/RecommendationsFeed'));
const TrendingBrandsFeed = lazy(() => import('../components/discover/TrendingBrandsFeed'));
const JustAddedFeed = lazy(() => import('../components/discover/JustAddedFeed'));

// Loading placeholder
const LoadingSection = () => (
  <div className="w-full h-[500px] bg-dark-grey/20 rounded-xl animate-pulse" />
);

export default function Discover() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const handleFilterChange = (type: string, value: string) => {
    switch (type) {
      case 'category':
        setSelectedCategory(value === selectedCategory ? '' : value);
        break;
      case 'price':
        setSelectedPrice(value === selectedPrice ? '' : value);
        break;
      case 'brand':
        setSelectedBrand(value === selectedBrand ? '' : value);
        break;
    }
    setIsMobileFiltersOpen(false);
  };

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    <div className="relative min-h-screen">
      {/* Static Header / Hero Section - Always visible */}
      <header className="relative mb-8 sm:mb-12">
        <FeaturedCarousel />
      </header>
        break;
      {/* Main Content Section */}
      <main className="max-w-container mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Main Feed Column */}
          <div className="lg:w-3/4 space-y-12 sm:space-y-16">
            {/* Wrap each feed in Suspense with loading fallback */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Suspense fallback={<LoadingSection />}>
                <RecommendationsFeed />
              </Suspense>
            </motion.section>
          minSize={0.6}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Suspense fallback={<LoadingSection />}>
                <TrendingBrandsFeed />
              </Suspense>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <Suspense fallback={<LoadingSection />}>
                <JustAddedFeed />
              </Suspense>
            </motion.section>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden sticky top-0 z-30 -mx-4 px-4 py-3 bg-black/80 backdrop-blur-lg border-b border-white/10">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="w-full px-4 py-2 text-sm font-medium text-neon-yellow border border-neon-yellow rounded-lg hover:bg-neon-yellow/10"
            >
              Filters & Categories
            </button>
          </div>
            <GlowingStarsTitle className="mb-4">AI Style Analysis</GlowingStarsTitle>
          {/* Mobile Filter Panel */}
          <div 
            className={`
              fixed inset-0 z-50 lg:hidden bg-black transform transition-transform duration-300
              ${isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-xl font-bold">Filters & Categories</h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 text-text-grey hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <FilterPanel 
                  selectedCategory={selectedCategory}
                  selectedPrice={selectedPrice}
                  selectedBrand={selectedBrand}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
          </div>

          {/* Desktop Sidebar - Filter Panel */}
          <div className="hidden lg:block lg:w-1/4 lg:sticky lg:top-4 lg:h-fit">
            <FilterPanel 
              selectedCategory={selectedCategory}
              selectedPrice={selectedPrice}
              selectedBrand={selectedBrand}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </main>
          </GlowingStarsBackgroundCard>
          
          <GlowingStarsBackgroundCard className="p-6 md:p-8">
            <GlowingStarsTitle className="mb-4">Style Evolution</GlowingStarsTitle>
            <GlowingStarsDescription>
              Watch your style evolve as our AI learns and grows with you
            </GlowingStarsDescription>
          </GlowingStarsBackgroundCard>
        </div>

        {/* Early Access */}
        <div className="text-center">
          <button className="px-10 py-5 bg-neon-yellow text-black rounded-full font-bold hover:bg-opacity-90 transition-all text-lg mb-4">
            Get Early Access
          </button>
          <p className="text-gray-400 text-lg">
            Be among the first to experience the future of fashion discovery
          </p>
        </div>
      </div>
    </div>
  );
}
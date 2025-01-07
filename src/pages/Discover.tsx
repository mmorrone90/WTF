import React, { Suspense, lazy } from 'react';
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
  return (
    <div className="relative min-h-screen">
      {/* Static Header / Hero Section - Always visible */}
      <header className="relative mb-12">
        <FeaturedCarousel />
      </header>

      {/* Main Content Section */}
      <main className="max-w-container mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Main Feed Column */}
          <div className="lg:w-3/4 space-y-16">
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

          {/* Sidebar - Filter Panel */}
          <div className="lg:w-1/4 lg:sticky lg:top-4 lg:h-fit">
            <FilterPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
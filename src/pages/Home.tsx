import React from 'react';
import Hero from '../components/Hero';
import WTFEliteCard from '../components/WTFEliteCard';
import { BottomNavigation } from '../components/Navigation';
import FeaturedBrands from '../components/shop/FeaturedBrands';
import ShopByStyle from '../components/shop/ShopByStyle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="mb-12">
        <Hero />
      </section>

      {/* Main Content - Mobile Responsive */}
      <main className="max-w-[1400px] mx-auto px-4">
        {/* Featured Brands */}
        <section className="mt-8">
          <FeaturedBrands />
        </section>

        {/* Shop By Style */}
        <section className="mt-12 sm:mt-16">
          <ShopByStyle />
        </section>

        {/* WTF Elite Card */}
        <section className="mt-12 sm:mt-16 flex justify-center w-full mb-24">
          <div className="w-full max-w-md sm:max-w-lg">
            <WTFEliteCard />
          </div>
        </section>
      </main>

      {/* Mobile Navigation - Fixed at Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation />
      </div>
    </div>
  );
}

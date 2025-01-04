import React from 'react';
import { motion } from 'framer-motion';
import TimelineSection from '../components/discover/TimelineSection';
import TrendMessage from '../components/discover/TrendMessage';
import ColorPalette from '../components/discover/ColorPalette';
import ProductCarousel from '../components/discover/ProductCarousel';
import CategoryStats from '../components/discover/CategoryStats';
import AISearchBar from '../components/discover/AISearchBar';

export default function Discover() {
  return (
    <div className="relative">
      {/* AI Search Section */}
      <section className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-container mx-auto px-6">
          <AISearchBar />
          <CategoryStats />
        </div>
      </section>

      {/* Intro Section */}
      <TimelineSection height="100vh">
        <TrendMessage
          title="Discover Tomorrow's Fashion Today"
          description="Explore the future of style through AI-powered curation and trending forecasts"
        />
      </TimelineSection>

      {/* Spring 2024 Trends */}
      <TimelineSection align="left">
        <TrendMessage
          title="Spring 2024"
          description="The season of digital renaissance meets sustainable fashion"
          align="left"
        />
      </TimelineSection>

      {/* Color Palette */}
      <TimelineSection>
        <div className="space-y-12">
          <TrendMessage
            title="Season's Palette"
            description="Colors that define the digital age"
          />
          <ColorPalette />
        </div>
      </TimelineSection>

      {/* Products Section */}
      <section className="min-h-screen bg-dark-grey">
        <div className="max-w-container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-20"
          >
            <TrendMessage
              title="Shop The Trends"
              description="Curated pieces that embody the season's vision"
            />
            <ProductCarousel />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
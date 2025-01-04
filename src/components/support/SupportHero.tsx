import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function SupportHero() {
  return (
    <div className="relative h-[40vh] mb-20">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-yellow/20 to-neon-cyan/20 blur-3xl" />
      <div className="relative h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">How can we help?</h1>
          <p className="text-xl text-text-grey mb-8">Find answers to your questions</p>
          
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full bg-dark-grey/50 backdrop-blur-sm rounded-xl py-4 px-12
                       text-white placeholder-text-grey
                       focus:outline-none focus:ring-2 focus:ring-neon-yellow"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-grey w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <div className="relative h-[40vh] mb-20">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-yellow/20 to-neon-cyan/20 blur-3xl" />
      <div className="relative h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-text-grey">We'd love to hear from you</p>
        </motion.div>
      </div>
    </div>
  );
}

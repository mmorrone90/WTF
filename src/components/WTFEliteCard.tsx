import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SparklesIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function WTFEliteCard() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Adjusted transformations for consistent visibility
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

  // Particle animations with more subtle movement
  const particles = [...Array(75)].map((_, i) => ({
    x: Math.random() * 300 - 150,
    y: Math.random() * 200 - 100,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 2
  }));

  return (
    <motion.div 
      ref={ref}
      style={{ 
        rotateX, 
        rotateY,
        scale, 
        opacity 
      }}
      className="w-full flex justify-center py-16"
    >
      <div className="w-[350px] h-[220px] bg-black/95 rounded-2xl shadow-2xl border border-neutral-800 relative overflow-hidden perspective-1000">
        {/* Mysterious Particle Background */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: particle.x, 
                y: particle.y,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                opacity: [0, 0.3, 0],
                scale: [0, 1, 0],
                x: [particle.x, particle.x + (Math.random() * 20 - 10), particle.x],
                y: [particle.y, particle.y + (Math.random() * 20 - 10), particle.y]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
              className="absolute w-[1px] h-[1px] bg-neon-yellow/40 rounded-full"
            />
          ))}
        </div>

        {/* Glitch Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20 mix-blend-overlay opacity-30 pointer-events-none"></div>

        {/* Card Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6">
          <LockClosedIcon className="w-12 h-12 text-neon-yellow mb-4 animate-pulse" />
          
          <h2 className="text-white text-2xl font-bold mb-2 tracking-wider">
            WTF ELITE
          </h2>
          
          <p className="text-gray-300 text-sm mb-4 max-w-[250px]">
            Something extraordinary is coming. Are you ready to redefine fashion?
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-neon-yellow/10 border border-neon-yellow text-neon-yellow 
            px-6 py-2 rounded-full text-sm font-bold 
            hover:bg-neon-yellow/20 transition-all 
            animate-pulse"
          >
            Join Waitlist
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
} 
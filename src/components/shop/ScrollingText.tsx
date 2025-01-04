import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function ScrollingText() {
  const text = Array(10).fill('WHERE TO FIND');

  return (
    <motion.div
      initial={{ y: '0%' }}
      animate={{ y: '-50%' }}
      transition={{
        repeat: Infinity,
        duration: 20,
        ease: "linear",
        repeatType: "reverse"
      }}
      className="flex flex-col items-center gap-8 whitespace-nowrap"
    >
      {text.map((item, index) => (
        <div key={index} className="flex items-center gap-3 text-4xl font-bold">
          <Zap className="w-8 h-8 text-neon-yellow" />
          <span className="text-white/80">{item}</span>
          <Zap className="w-8 h-8 text-neon-yellow" />
        </div>
      ))}
    </motion.div>
  );
}
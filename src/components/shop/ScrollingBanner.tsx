import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function ScrollingBanner() {
  const text = 'WHERE TO FIND';
  const repeatedText = Array(10).fill(text).join(' • ');

  return (
    <div className="relative w-full overflow-hidden bg-black/80 backdrop-blur-sm py-6">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="whitespace-nowrap"
      >
        <span className="inline-flex items-center text-4xl font-bold tracking-wider">
          {repeatedText.split('').map((char, index) => (
            <span
              key={index}
              className={char === '•' ? 'text-neon-yellow mx-4' : 'text-white/80'}
            >
              {char === '•' ? <Zap className="w-6 h-6" /> : char}
            </span>
          ))}
        </span>
      </motion.div>
    </div>
  );
}
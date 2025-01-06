import React from 'react';
import { motion } from 'framer-motion';

interface TrendMessageProps {
  title: string;
  description: string;
  align?: 'left' | 'right' | 'center';
}

export default function TrendMessage({ title, description, align = 'center' }: TrendMessageProps) {
  const titleWords = title.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
      className={`max-w-2xl mx-auto ${align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}`}
    >
      <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight flex flex-wrap gap-x-4 gap-y-2">
        {titleWords.map((word, i) => (
          <motion.span
            key={i}
            variants={child}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </h2>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { delay: 0.5 } }
        }}
        className="text-xl md:text-2xl text-text-grey"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

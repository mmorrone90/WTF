import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface TimelineSectionProps {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  height?: string;
}

export default function TimelineSection({ children, align = 'center', height = '100vh' }: TimelineSectionProps) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const alignmentClasses = {
    left: 'items-start text-left',
    right: 'items-end text-right',
    center: 'items-center text-center'
  };

  return (
    <section 
      ref={sectionRef} 
      className={`relative flex justify-center ${alignmentClasses[align]}`}
      style={{ height }}
    >
      <motion.div
        style={{ opacity, y }}
        className="w-full max-w-4xl px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}

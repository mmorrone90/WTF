import React from 'react';
import { motion } from 'framer-motion';

interface Color {
  name: string;
  hex: string;
  pantone: string;
}

const seasonColors: Color[] = [
  { name: 'Digital Lavender', hex: '#E6E6FA', pantone: '14-3204' },
  { name: 'Cyber Lime', hex: '#D7FF34', pantone: '13-0550' },
  { name: 'Quantum Blue', hex: '#00FFCA', pantone: '15-4421' },
  { name: 'Neo Pink', hex: '#FF006E', pantone: '17-1937' }
];

export default function ColorPalette() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {seasonColors.map((color, index) => (
        <motion.div
          key={color.hex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group cursor-pointer"
        >
          <div 
            className="aspect-square rounded-2xl mb-3 transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: color.hex }}
          />
          <p className="font-bold text-sm mb-1" style={{ color: color.hex }}>{color.name}</p>
          <p className="text-text-grey text-sm">PANTONE {color.pantone}</p>
        </motion.div>
      ))}
    </div>
  );
}

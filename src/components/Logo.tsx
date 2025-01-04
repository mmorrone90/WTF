import React from 'react';
import { Zap } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2 group">
      <div className="relative">
        <Zap className="w-6 h-6 text-neon-yellow transform group-hover:rotate-12 transition-transform duration-300" />
        <div className="absolute inset-0 bg-neon-yellow blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
      </div>
      <span className="text-2xl font-extrabold text-neon-yellow">WTF</span>
    </div>
  );
}
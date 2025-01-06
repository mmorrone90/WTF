import React from 'react';
import { Sparkles, Search } from 'lucide-react';
import '../styles/glow.css';

export default function SearchAI() {
  return (
    <div className="relative w-full max-w-4xl mx-auto mb-20">
      <div className="relative group glow-bg">
        <input
          type="text"
          placeholder="Describe your perfect style, e.g., 'Y2K streetwear with cyber elements'"
          className="w-full glow-input rounded-2xl py-6 px-8 pl-16 text-xl
                   text-white placeholder-text-grey
                   focus:outline-none transition-all duration-300"
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Search className="w-6 h-6 text-neon-yellow" />
          <Sparkles className="w-5 h-5 text-neon-cyan" />
        </div>
      </div>
    </div>
  );
}

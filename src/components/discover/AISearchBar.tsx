import React from 'react';
import { Search, Sparkles, Zap } from 'lucide-react';

export default function AISearchBar() {
  return (
    <div className="relative w-full max-w-4xl mx-auto mb-20">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-yellow/20 to-neon-cyan/20 rounded-2xl blur-xl opacity-75" />
        <div className="relative bg-dark-grey/80 backdrop-blur-sm rounded-2xl p-1">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Describe your perfect style, e.g., 'Techwear with neon accents'"
                className="w-full bg-black/50 rounded-xl py-6 px-8 pl-16 text-xl
                       text-white placeholder-text-grey/70
                       focus:outline-none focus:ring-2 focus:ring-neon-yellow/50"
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Search className="w-6 h-6 text-neon-yellow" />
                <Sparkles className="w-5 h-5 text-neon-cyan animate-pulse" />
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-4 ml-2
                           bg-neon-yellow/10 rounded-lg text-neon-yellow 
                           hover:bg-neon-yellow/20 transition-colors
                           whitespace-nowrap">
              <Zap className="w-5 h-5" />
              <span className="font-bold">AI Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <div className={`
        relative flex items-center w-full h-14 rounded-full
        bg-white/10 backdrop-blur-md border border-white/20
        transition-all duration-300
        ${isFocused ? 'ring-2 ring-neon-yellow/50' : ''}
      `}>
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 ml-4" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="What are you looking for today?"
          className="
            w-full h-full bg-transparent px-4 text-white
            placeholder-gray-400 focus:outline-none
          "
        />
      </div>

      {/* Search Suggestions - show only when focused and has input */}
      {isFocused && query && (
        <div className="
          absolute top-full left-0 right-0 mt-2
          bg-white/10 backdrop-blur-md border border-white/20
          rounded-lg overflow-hidden
          max-h-96 overflow-y-auto
        ">
          {/* Placeholder for dynamic suggestions */}
          <div className="p-2 text-sm text-gray-300">
            Loading suggestions...
          </div>
        </div>
      )}
    </div>
  );
} 
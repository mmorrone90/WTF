import React from 'react';
import { SparklesCore } from './ui/sparkles';

export default function Hero() {
  return (
    <div className="w-full min-h-[250px] relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full absolute inset-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#E6FB04"
          speed={1}
        />
      </div>
      <div className="relative z-10 text-center space-y-4 px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-neon-yellow">
          Discover Your Next Style
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Explore curated collections of unique streetwear and designer pieces
        </p>
      </div>
    </div>
  );
}

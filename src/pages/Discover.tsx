import React from 'react';
import { SparklesCore } from '../components/ui/sparkles';
import { GlowingStarsBackgroundCard, GlowingStarsTitle, GlowingStarsDescription } from '../components/ui/glowing-stars';

export default function Discover() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Sparkles */}
      <div className="absolute inset-0 w-full h-full">
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

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 md:p-8">
        {/* Coming Soon Text */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-yellow to-white">
            Something Epic<br />Is Coming
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We're crafting a revolutionary way to discover your perfect style. Get ready for an AI-powered fashion journey like never before.
          </p>
        </div>

        {/* Feature Teasers */}
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
          <GlowingStarsBackgroundCard className="p-6 md:p-8">
            <GlowingStarsTitle className="mb-4">AI Style Analysis</GlowingStarsTitle>
            <GlowingStarsDescription>
              Our advanced AI will understand your unique style DNA and curate the perfect pieces for you
            </GlowingStarsDescription>
          </GlowingStarsBackgroundCard>
          
          <GlowingStarsBackgroundCard className="p-6 md:p-8">
            <GlowingStarsTitle className="mb-4">Personalized Discovery</GlowingStarsTitle>
            <GlowingStarsDescription>
              Experience a shopping journey that adapts to your preferences in real-time
            </GlowingStarsDescription>
          </GlowingStarsBackgroundCard>
          
          <GlowingStarsBackgroundCard className="p-6 md:p-8">
            <GlowingStarsTitle className="mb-4">Style Evolution</GlowingStarsTitle>
            <GlowingStarsDescription>
              Watch your style evolve as our AI learns and grows with you
            </GlowingStarsDescription>
          </GlowingStarsBackgroundCard>
        </div>

        {/* Early Access */}
        <div className="text-center">
          <button className="px-10 py-5 bg-neon-yellow text-black rounded-full font-bold hover:bg-opacity-90 transition-all text-lg mb-4">
            Get Early Access
          </button>
          <p className="text-gray-400 text-lg">
            Be among the first to experience the future of fashion discovery
          </p>
        </div>
      </div>
    </div>
  );
}
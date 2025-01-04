import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import CountdownTimer from '../components/about/CountdownTimer';
import WaitlistCounter from '../components/about/WaitlistCounter';

export default function About() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle waitlist signup
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto px-6 text-center"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Zap className="w-16 h-16 text-neon-yellow" />
            <div className="absolute inset-0 bg-neon-yellow blur-2xl opacity-20" />
          </div>
        </div>

        {/* Release Badge */}
        <div className="inline-block bg-dark-grey/50 backdrop-blur-sm rounded-full px-4 py-1 mb-8">
          <span className="text-sm">AVAILABLE IN EARLY 2025</span>
        </div>

        {/* Main Content */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Get early access
        </h1>
        <p className="text-xl text-text-grey mb-8">
          Be amongst the first to experience WhereToFind.
          Sign up to be notified when we launch!
        </p>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-dark-grey/50 backdrop-blur-sm rounded-lg px-4 py-3
                       border border-dark-grey focus:border-neon-yellow
                       focus:outline-none transition-colors"
              required
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-neon-yellow text-black font-bold rounded-lg
                       hover:bg-neon-yellow/90 transition-colors"
            >
              Join waitlist
            </button>
          </div>
        </form>

        {/* Waitlist Counter */}
        <WaitlistCounter count={1000} />

        {/* Countdown Timer */}
        <div className="mt-16">
          <div className="text-text-grey mb-4">LEFT UNTIL FULL RELEASE</div>
          <CountdownTimer />
        </div>
      </motion.div>
    </div>
  );
}
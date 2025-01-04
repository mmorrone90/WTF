import React from 'react';
import { Send } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="bg-dark-grey py-20">
      <div className="max-w-container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to WTF</h2>
          <p className="text-text-grey mb-8">Get early access to drops and exclusive deals</p>
          
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-black/50 rounded-lg px-4 py-3 text-white
                       border border-dark-grey focus:border-neon-yellow
                       focus:outline-none transition-colors"
            />
            <button className="neon-button !px-4">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
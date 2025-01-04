import React from 'react';
import { Instagram, Twitter, Github } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-dark-grey">
      <div className="max-w-container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Logo />
            <p className="text-text-grey max-w-xs">
              Decoding fashion's future through AI-powered discovery
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="text-text-grey hover:text-neon-yellow transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-4">Platform</h3>
              <ul className="space-y-3">
                {['Shop', 'Discover', 'About', 'Contact'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-text-grey hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-3">
                {['Privacy', 'Terms', 'Support'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-text-grey hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-bold mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind', 'AI/ML'].map(tech => (
                <span key={tech} className="px-3 py-1 bg-dark-grey rounded-full text-sm text-text-grey">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export default function BrandHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-dark-grey z-50">
      <div className="max-w-container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/brand" className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-neon-yellow" />
            <span className="text-2xl font-bold">WhereToFind Brands</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/brand/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/brand/features" className="nav-link">Features</Link>
            <Link to="/brand/pricing" className="nav-link">Pricing</Link>
            <Link to="/brand/support" className="nav-link">Support</Link>
            <Link to="/brand/signup" className="neon-button">Get Started</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

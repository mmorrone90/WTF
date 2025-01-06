import React, { useState, useEffect } from 'react';
import { Search, Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { signOut } from '../lib/auth';
import Logo from './Logo';
import Breadcrumb from './Breadcrumb';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigationLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'Discover', path: '/discover' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Support', path: '/support' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/75 backdrop-blur-md z-50">
      <div className="max-w-container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="cursor-pointer">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="nav-link text-sm font-medium"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search brands or styles..."
                className="w-full bg-dark-grey/50 rounded-full py-1.5 px-4 pl-9 text-sm text-white placeholder-text-grey
                         focus:outline-none focus:ring-2 focus:ring-neon-yellow"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-grey w-3.5 h-3.5" />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-text-grey text-sm">
                  {user.email}
                </span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-white hover:text-neon-yellow transition-colors text-sm"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')} 
                  className="text-white hover:text-neon-yellow transition-colors text-sm"
                >
                  Log In
                </button>
                <button 
                  onClick={() => navigate('/signup')} 
                  className="neon-button text-sm py-1.5 px-4"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-transparent border-t border-white/5">
        <div className="max-w-container mx-auto px-6">
          <Breadcrumb />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-dark-grey/20">
          <div className="px-6 py-3 space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search brands or styles..."
                className="w-full bg-black/50 rounded-full py-1.5 px-4 pl-9 text-sm text-white placeholder-text-grey
                         focus:outline-none focus:ring-2 focus:ring-neon-yellow"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-grey w-3.5 h-3.5" />
            </div>
            {navigationLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-white hover:text-neon-yellow py-1.5 w-full text-left text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="flex flex-col space-y-2">
              {user ? (
                <>
                  <span className="text-text-grey text-sm">{user.email}</span>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 text-white hover:text-neon-yellow py-1.5 text-sm"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-white hover:text-neon-yellow py-1.5 text-left text-sm"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/signup');
                      setIsMenuOpen(false);
                    }} 
                    className="w-full neon-button text-sm py-1.5"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

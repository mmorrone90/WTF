import React, { useState } from 'react';
import { Search, Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { signOut } from '../lib/auth';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

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
    <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-dark-grey z-50">
      <div className="max-w-container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="cursor-pointer">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="nav-link"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search brands or styles..."
                className="w-full bg-dark-grey rounded-full py-2 px-4 pl-10 text-white placeholder-text-grey
                         focus:outline-none focus:ring-2 focus:ring-neon-yellow"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-grey w-4 h-4" />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-text-grey">
                  {user.email}
                </span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white hover:text-neon-yellow transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')} 
                  className="text-white hover:text-neon-yellow transition-colors"
                >
                  Log In
                </button>
                <button 
                  onClick={() => navigate('/signup')} 
                  className="neon-button"
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
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-grey">
          <div className="px-6 py-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search brands or styles..."
                className="w-full bg-black rounded-full py-2 px-4 pl-10 text-white placeholder-text-grey
                         focus:outline-none focus:ring-2 focus:ring-neon-yellow"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-grey w-4 h-4" />
            </div>
            {navigationLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-white hover:text-neon-yellow py-2 w-full text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="flex flex-col space-y-2">
              {user ? (
                <>
                  <span className="text-text-grey">{user.email}</span>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-white hover:text-neon-yellow py-2"
                  >
                    <LogOut className="w-4 h-4" />
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
                    className="w-full text-white hover:text-neon-yellow py-2 text-left"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/signup');
                      setIsMenuOpen(false);
                    }} 
                    className="w-full neon-button"
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

import React, { useState, useEffect } from 'react';
import { Search, Menu, X, LogOut, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { signOut } from '../lib/auth';
import Logo from './Logo';
import Breadcrumb from './Breadcrumb';
import Button from './ui/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, profile } = useAuthContext();

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

  const isPartner = profile?.user_type === 'partner';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-black/75 backdrop-blur-md z-50">
        <div className="max-w-container mx-auto px-4 sm:px-6">
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
                  {isPartner && (
                    <Button
                      variant="outline"
                      onClick={() => navigate('/brand/dashboard')}
                      className="flex items-center gap-1.5 h-8 px-3 text-sm"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      Dashboard
                    </Button>
                  )}
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
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/login')} 
                    className="flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Log In
                  </Button>
                  <Button 
                    onClick={() => navigate('/signup')} 
                    className="flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-transparent border-t border-white/5">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <Breadcrumb />
          </div>
        </div>
      </header>

      {/* Mobile Menu - Moved outside header */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-md overflow-y-auto overscroll-contain" style={{ zIndex: 99999 }}>
          <div className="px-4 py-6 space-y-6 min-h-screen flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-text-grey hover:text-white"
            >
              <X size={24} />
            </button>

            {/* Navigation Links */}
            <nav className="space-y-4 flex-grow">
              {navigationLinks.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="block text-lg font-medium text-white hover:text-neon-yellow py-2 border-b border-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="space-y-4">
              {user ? (
                <>
                  {isPartner && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigate('/brand/dashboard');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Go to Dashboard
                    </Button>
                  )}
                  <div className="text-text-grey text-sm mb-4">
                    Logged in as: {user.email}
                  </div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left text-white hover:text-neon-yellow py-2 border-b border-white/10 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Log In
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate('/signup');
                      setIsMenuOpen(false);
                    }} 
                    className="w-full mt-4 flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Search - Moved to bottom */}
            <div className="relative mt-6">
              <input
                type="text"
                placeholder="Search brands or styles..."
                className="w-full bg-dark-grey/50 rounded-full py-2 px-4 pl-10 text-sm text-white placeholder-text-grey
                         focus:outline-none focus:ring-2 focus:ring-neon-yellow"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-grey w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

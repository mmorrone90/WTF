import React from 'react';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
  { name: 'Home', icon: HomeIcon, path: '/' },
  { name: 'Search', icon: MagnifyingGlassIcon, path: '/search' },
  { name: 'Recommendations', icon: HeartIcon, path: '/recommendations' },
  { name: 'WTF Elite', icon: SparklesIcon, path: '/elite' },
  { name: 'Profile', icon: UserIcon, path: '/profile' },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="bg-black/80 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex flex-col items-center py-3 px-3
                  text-sm font-medium transition-colors
                  ${isActive ? 'text-neon-yellow' : 'text-gray-400 hover:text-white'}
                `}
              >
                <item.icon className="h-6 w-6" />
                <span className="mt-1 text-xs">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export function TopNavigation() {
  const location = useLocation();

  return (
    <nav className="hidden md:block bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1">
            <Link to="/" className="text-xl font-bold text-white">
              WTF
            </Link>
          </div>

          <div className="flex space-x-8">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    flex items-center space-x-1
                    text-sm font-medium transition-colors
                    ${isActive ? 'text-neon-yellow' : 'text-gray-400 hover:text-white'}
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex-1 flex justify-end">
            {/* Additional header elements can go here */}
          </div>
        </div>
      </div>
    </nav>
  );
} 
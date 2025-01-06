import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Create breadcrumb items with proper formatting
  const breadcrumbItems = pathnames.map(path => ({
    name: path.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    path: `/${path}`
  }));

  return (
    <nav>
      <ol className="flex items-center gap-2 text-sm py-2">
        <li>
          <Link 
            to="/" 
            className="flex items-center gap-1 text-text-grey/80 hover:text-neon-yellow transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-text-grey/60" />
            {index === breadcrumbItems.length - 1 ? (
              <span className="text-neon-yellow">{item.name}</span>
            ) : (
              <Link 
                to={item.path}
                className="text-text-grey/80 hover:text-neon-yellow transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

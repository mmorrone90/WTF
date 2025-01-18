import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home, ChevronDown } from 'lucide-react';
import { getProduct } from '../services/productService';
import { Product } from '../types/product';

interface SubRoute {
  name: string;
  path: string;
}

interface SpecialSections {
  [key: string]: SubRoute[];
}

const SPECIAL_SECTIONS: SpecialSections = {
  'shop': [
    { name: 'All Products', path: '/shop/all-products' },
    { name: 'Best Sellers', path: '/shop/best-sellers' },
    { name: 'New Arrivals', path: '/shop/new-arrivals' }
  ]
};

interface BreadcrumbItem {
  name: string;
  path: string;
  hasDropdown: boolean;
}

export default function Breadcrumb() {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const pathnames = location.pathname.split('/').filter(x => x);

  useEffect(() => {
    const isProductPage = pathnames[0] === 'product' && pathnames[1];
    if (!isProductPage) {
      setProduct(null);
      return;
    }

    getProduct(pathnames[1])
      .then(setProduct)
      .catch(err => console.error('Error loading product:', err));
  }, [pathnames]);

  const isProductPage = pathnames[0] === 'product' && pathnames[1];
  let breadcrumbItems: BreadcrumbItem[] = [];

  if (isProductPage && product) {
    const mainCategory = Array.isArray(product.tags) && product.tags.length > 0 
      ? product.tags[0] 
      : 'product';

    breadcrumbItems = [
      {
        name: 'Shop',
        path: '/shop',
        hasDropdown: true
      },
      {
        name: mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1),
        path: `/shop?category=${mainCategory}`,
        hasDropdown: false
      },
      {
        name: product.name,
        path: location.pathname,
        hasDropdown: false
      }
    ];
  } else if (pathnames.length > 0) {
    breadcrumbItems = pathnames.map(path => ({
      name: path.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      path: `/${pathnames.slice(0, pathnames.indexOf(path) + 1).join('/')}`,
      hasDropdown: SPECIAL_SECTIONS.hasOwnProperty(path)
    }));
  }

  return (
    <nav>
      <ol className="flex items-center gap-1.5 text-xs py-2.5">
        <li>
          <Link 
            to="/" 
            className="flex items-center gap-1 text-text-grey/70 hover:text-neon-yellow transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-text-grey/40" />
            <div className="relative group">
              <button 
                className={`flex items-center gap-1 ${item.hasDropdown ? 'cursor-pointer' : ''} ${
                  activeDropdown === item.path 
                    ? 'text-neon-yellow' 
                    : index === breadcrumbItems.length - 1 
                      ? 'text-neon-yellow font-medium'
                      : 'text-text-grey/70 hover:text-neon-yellow transition-colors'
                }`}
                onClick={() => {
                  if (item.hasDropdown) {
                    setActiveDropdown(activeDropdown === item.path ? null : item.path);
                  }
                }}
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${
                    activeDropdown === item.path ? 'rotate-180' : ''
                  }`} />
                )}
              </button>
              
              {item.hasDropdown && activeDropdown === item.path && (
                <div className="absolute top-full left-0 mt-1 py-1 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg min-w-[120px] z-50">
                  {SPECIAL_SECTIONS[item.name.toLowerCase()]?.map((subItem: SubRoute) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className="block px-3 py-1.5 text-text-grey/70 hover:text-neon-yellow hover:bg-white/5 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

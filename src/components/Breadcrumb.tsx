import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home, ChevronDown, Loader2 } from 'lucide-react';
import { getProduct } from '../services/productService';
import { Product } from '../types/product';

interface SubRoute {
  name: string;
  path: string;
}

interface SpecialSections {
  [key: string]: SubRoute[];
}

// Define special sections with their subroutes
const SPECIAL_SECTIONS: SpecialSections = {
  shop: [
    { name: 'All Products', path: '/shop/all-products' },
    { name: 'Best Sellers', path: '/shop/best-sellers' },
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

  // Load product data if on a product page
  useEffect(() => {
    const isProductPage = pathnames[0] === 'product' && pathnames[1];
    if (!isProductPage) {
      setProduct(null);
      return;
    }

    getProduct(pathnames[1])
      .then(productData => setProduct(productData))
      .catch(err => console.error('Error loading product:', err));
  }, [pathnames]);

  // Handle product detail pages
  const isProductPage = pathnames[0] === 'product' && pathnames[1];
  let breadcrumbItems: BreadcrumbItem[] = [];

  if (isProductPage) {
    if (product) {
      // Get category from tags
      const categories = product.tags?.split(',').map(tag => tag.trim()) || [];
      const mainCategory = categories[0] || 'product';

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
    } else {
      breadcrumbItems = [
        {
          name: 'Shop',
          path: '/shop',
          hasDropdown: true
        },
        {
          name: 'Product',
          path: location.pathname,
          hasDropdown: false
        }
      ];
    }
  } else if (pathnames.length > 0) {
    // Create breadcrumb items with proper formatting for other pages
    breadcrumbItems = pathnames.map(path => {
      if (!path) return null;
      return {
        name: path.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        path: `/${pathnames.slice(0, pathnames.indexOf(path) + 1).join('/')}`,
        hasDropdown: SPECIAL_SECTIONS.hasOwnProperty(path.toLowerCase())
      };
    }).filter(Boolean) as BreadcrumbItem[];
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
            {index === breadcrumbItems.length - 1 ? (
              <div className="relative group">
                <button 
                  className={`flex items-center gap-1 ${item.hasDropdown ? 'cursor-pointer' : ''} ${
                    activeDropdown === item.path 
                      ? 'text-neon-yellow' 
                      : 'text-neon-yellow font-medium'
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
                
                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.path && (
                  <div className="absolute top-full left-0 mt-1 py-1 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg min-w-[120px] z-50">
                    {SPECIAL_SECTIONS[item.path.slice(1).toLowerCase()]?.map((subItem: SubRoute) => (
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
            ) : (
              <Link 
                to={item.path}
                className="text-text-grey/70 hover:text-neon-yellow transition-colors"
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

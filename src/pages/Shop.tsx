import React, { useState, useRef, useEffect, useCallback } from 'react';
import FilterSidebar from '../components/shop/FilterSidebar';
import ProductGrid from '../components/shop/ProductGrid';
import HeroGallery from '../components/shop/HeroGallery';
import BestSellers from '../components/shop/BestSellers';
import { useProducts } from '../hooks/useProducts';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const allProductsRef = useRef<HTMLDivElement>(null);
  const bestSellersRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout>();

  const { products, isLoading } = useProducts({
    category: selectedCategory || undefined,
    gender: selectedGender || undefined
  });

  const updateRoute = useCallback((path: string) => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    navigationTimeoutRef.current = setTimeout(() => {
      if (!isScrollingRef.current) {
        navigate(path, { replace: true });
      }
    }, 100);
  }, [navigate]);

  // Handle scroll-based navigation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px',
      threshold: [0.4]
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target.getAttribute('data-section');
          if (!section) return;

          setActiveSection(section);
          if (section === 'hero') {
            updateRoute('/shop');
          } else if (section === 'all-products') {
            updateRoute('/shop/all-products');
          } else if (section === 'best-sellers') {
            updateRoute('/shop/best-sellers');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (allProductsRef.current) observer.observe(allProductsRef.current);
    if (bestSellersRef.current) observer.observe(bestSellersRef.current);

    return () => {
      observer.disconnect();
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [updateRoute]);

  // Handle direct navigation to sections
  useEffect(() => {
    const path = location.pathname;
    const scrollToSection = (ref: React.RefObject<HTMLElement>, section: string) => {
      if (ref.current) {
        isScrollingRef.current = true;
        setActiveSection(section);
        
        const headerOffset = 120;
        const elementPosition = ref.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Reset scrolling flag after animation
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    };

    if (path === '/shop/all-products') {
      scrollToSection(allProductsRef, 'all-products');
    } else if (path === '/shop/best-sellers') {
      scrollToSection(bestSellersRef, 'best-sellers');
    } else if (path === '/shop') {
      scrollToSection(heroRef, 'hero');
    }
  }, [location.pathname]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender === selectedGender ? '' : gender);
  };

  return (
    <>
      {/* Hero Section */}
      <div 
        ref={heroRef} 
        data-section="hero" 
        className={`relative z-10 h-[calc(75vh-30px)] transition-opacity duration-500 ${
          activeSection === 'hero' ? 'opacity-100' : 'opacity-90'
        }`}
      >
        <HeroGallery />
      </div>
      
      {/* Products Section */}
      <section 
        ref={allProductsRef} 
        data-section="all-products" 
        className={`relative z-20 -mt-32 max-w-container mx-auto transition-opacity duration-500 ${
          activeSection === 'all-products' ? 'opacity-100' : 'opacity-90'
        }`}
      >
        {/* Blurred Background Overlay */}
        <div className="absolute -top-32 -left-[100vw] -right-[100vw] h-[400px] bg-gradient-to-b from-transparent via-black/100 to-black backdrop-blur-xl z-0" />
        
        <div className="relative px-4 sm:px-6 z-30">
          <div className="flex items-center justify-between mb-8 pt-8">
            <h1 className="text-3xl sm:text-5xl font-bold">ALL PRODUCTS</h1>
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden px-4 py-2 text-sm font-medium text-neon-yellow border border-neon-yellow rounded-lg hover:bg-neon-yellow/10 z-40"
            >
              Filters
            </button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Sidebar */}
            <div 
              className={`
                fixed inset-0 z-[100] lg:hidden bg-black/95 backdrop-blur-md transform transition-transform duration-300 overflow-y-auto
                ${isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'}
              `}
            >
              <div className="min-h-screen flex flex-col">
                <div className="sticky top-0 bg-black/95 z-50 flex items-center justify-between p-4 border-b border-white/10">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-2 text-text-grey hover:text-white z-50"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <FilterSidebar
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    selectedGender={selectedGender}
                    onGenderChange={handleGenderChange}
                  />
                </div>
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-64 flex-shrink-0 z-30">
              <h2 className="text-xl font-bold mb-6">Filter by category</h2>
              <FilterSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                selectedGender={selectedGender}
                onGenderChange={handleGenderChange}
              />
            </div>

            {/* Product Grid */}
            <div className="flex-1 z-30">
              <ProductGrid 
                products={products}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section 
        ref={bestSellersRef} 
        data-section="best-sellers" 
        className={`relative z-10 bg-black min-h-screen transition-opacity duration-500 ${
          activeSection === 'best-sellers' ? 'opacity-100' : 'opacity-90'
        }`}
      >
        <BestSellers />
      </section>
    </>
  );
}

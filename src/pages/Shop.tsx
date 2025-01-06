import React, { useState, useRef, useEffect, useCallback } from 'react';
import FilterSidebar from '../components/shop/FilterSidebar';
import ProductGrid from '../components/shop/ProductGrid';
import HeroGallery from '../components/shop/HeroGallery';
import BestSellers from '../components/shop/BestSellers';
import { useProducts } from '../hooks/useProducts';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const allProductsRef = useRef<HTMLDivElement>(null);
  const bestSellersRef = useRef<HTMLDivElement>(null);
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
      navigate(path, { replace: true });
    }, 100); // Small delay to prevent rapid updates
  }, [navigate]);

  // Handle scroll-based navigation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px', // Reduced margin for more natural transitions
      threshold: [0.4, 0.6] // Multiple thresholds for smoother transitions
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return; // Skip if programmatic scrolling

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const section = entry.target.getAttribute('data-section');
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
  }, [updateRoute, isScrolling]);

  // Handle direct navigation to sections
  useEffect(() => {
    const path = location.pathname;
    const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
      if (ref.current) {
        setIsScrolling(true); // Prevent observer from firing during programmatic scroll
        const headerOffset = 120;
        const elementPosition = ref.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Reset scrolling flag after animation
        setTimeout(() => {
          setIsScrolling(false);
        }, 1000); // Typical smooth scroll duration
      }
    };

    if (path === '/shop/all-products') {
      scrollToSection(allProductsRef);
    } else if (path === '/shop/best-sellers') {
      scrollToSection(bestSellersRef);
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
      <div ref={heroRef} data-section="hero" className="min-h-[80vh]">
        <HeroGallery />
      </div>
      
      {/* Products Section */}
      <section ref={allProductsRef} data-section="all-products" className="max-w-container mx-auto px-6 py-20 min-h-screen">
        <h1 className="text-5xl font-bold mb-12">ALL PRODUCTS</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <h2 className="text-xl font-bold mb-6">Filter by category</h2>
            <FilterSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              selectedGender={selectedGender}
              onGenderChange={handleGenderChange}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid 
              products={products}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section ref={bestSellersRef} data-section="best-sellers" className="min-h-screen">
        <BestSellers />
      </section>
    </>
  );
}

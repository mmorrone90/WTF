import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  title: string;
  image: string;
  category: string;
  trending?: boolean;
}

const products: Product[] = [
  {
    id: '1',
    title: 'Cyberpunk Streetwear',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
    category: 'Trending',
    trending: true,
  },
  {
    id: '2',
    title: 'Neo Tokyo Vibes',
    image: 'https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa',
    category: 'Popular',
  },
  {
    id: '3',
    title: 'Digital Nomad',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    category: 'New',
  },
  {
    id: '4',
    title: 'Tech Ninja',
    image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8',
    category: 'Featured',
    trending: true,
  },
];

export default function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex-[0_0_300px] md:flex-[0_0_400px]">
              <Link
                to={`/product/${product.id}`}
                className="group block relative overflow-hidden rounded-xl aspect-[4/5]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  {product.trending && (
                    <div className="flex items-center gap-2 text-neon-yellow text-sm font-bold mb-2">
                      <Sparkles className="w-4 h-4" />
                      Trending Now
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-1">{product.title}</h3>
                  <p className="text-text-grey">{product.category}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full
                 bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full
                 bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const featuredItems = [
  {
    id: '1',
    title: 'Summer Spotlight',
    image: 'https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa'
  },
  {
    id: '2',
    title: 'Neon Nightlife',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b'
  },
  {
    id: '3',
    title: 'Urban Techwear',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8'
  }
];

export default function FeaturedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative h-[60vh] overflow-hidden rounded-xl">
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {featuredItems.map((item) => (
            <div key={item.id} className="flex-[0_0_100%] relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 p-6 text-white z-10">
                <h2 className="text-3xl font-bold">{item.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full backdrop-blur-md hover:bg-black/60 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full backdrop-blur-md hover:bg-black/60 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
} 
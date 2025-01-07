import React from 'react';
import { Flame } from 'lucide-react';

export default function TrendingBrandsFeed() {
  // Extended mock brands data with real images (showing only first 5)
  const brands = [
    {
      id: 'br1',
      name: 'FASHION LAB',
      logo: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475',
      description: 'Cutting-edge street style fashion line'
    },
    {
      id: 'br2',
      name: 'DRIP TECH',
      logo: 'https://images.unsplash.com/photo-1560243563-062bfc001d68',
      description: 'Tech-inspired clothing with advanced materials'
    },
    {
      id: 'br3',
      name: 'CYBER COUTURE',
      logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
      description: 'High-end cyberpunk fashion designs'
    },
    {
      id: 'br4',
      name: 'NEON TRIBE',
      logo: 'https://images.unsplash.com/photo-1606293926075-91acedf0f518',
      description: 'Vibrant streetwear with LED elements'
    },
    {
      id: 'br5',
      name: 'DIGITAL NOMAD',
      logo: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2',
      description: 'Adaptive clothing for modern lifestyles'
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
        <Flame className="text-neon-yellow w-6 h-6" />
        Trending Brands
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-dark-grey/50 rounded-xl p-4 flex items-center gap-4 hover:bg-dark-grey/80 transition-colors"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xl font-bold mb-1">{brand.name}</h3>
              <p className="text-text-grey">{brand.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 
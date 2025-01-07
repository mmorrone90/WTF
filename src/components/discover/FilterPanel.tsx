import React from 'react';

interface FilterPanelProps {
  selectedCategory: string;
  selectedPrice: string;
  selectedBrand: string;
  onFilterChange: (type: string, value: string) => void;
}

export default function FilterPanel({
  selectedCategory,
  selectedPrice,
  selectedBrand,
  onFilterChange
}: FilterPanelProps) {
  const categories = ['Techwear', 'Streetwear', 'Accessories', 'Footwear'];
  const brands = ['FuturaX', 'NeonLane', 'SkyShade', 'RunTech'];
  const priceRanges = ['Under $50', '$50-$100', '$100-$200', 'Over $200'];

  return (
    <div className="space-y-8 bg-dark-grey/50 rounded-xl p-6 border border-dark-grey">
      <div>
        <h3 className="font-bold mb-4">Category</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onFilterChange('category', cat)}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  selectedCategory === cat
                    ? 'bg-neon-yellow text-black'
                    : 'bg-black/20 hover:bg-dark-grey transition-colors'
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-4">Brand</h3>
        <ul className="space-y-2">
          {brands.map((brand) => (
            <li key={brand}>
              <button
                onClick={() => onFilterChange('brand', brand)}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  selectedBrand === brand
                    ? 'bg-neon-yellow text-black'
                    : 'bg-black/20 hover:bg-dark-grey transition-colors'
                }`}
              >
                {brand}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-4">Price Range</h3>
        <ul className="space-y-2">
          {priceRanges.map((range) => (
            <li key={range}>
              <button
                onClick={() => onFilterChange('price', range)}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  selectedPrice === range
                    ? 'bg-neon-yellow text-black'
                    : 'bg-black/20 hover:bg-dark-grey transition-colors'
                }`}
              >
                {range}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 
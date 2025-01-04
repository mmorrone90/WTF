import React from 'react';

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  selectedColor,
  onColorChange
}: FilterSidebarProps) {
  const categories = [
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'sneakers', label: 'Sneakers' },
    { id: 'tshirt', label: 'T-Shirt' },
    { id: 'shirt', label: 'Shirt' },
    { id: 'pant', label: 'Pant' },
    { id: 'sports', label: 'Sports' },
    { id: 'shortpant', label: 'Short Pant' },
  ];

  const colors = [
    { id: 'black', label: 'Black', class: 'bg-black' },
    { id: 'pink', label: 'Pink', class: 'bg-pink-400' },
    { id: 'white', label: 'White', class: 'bg-white' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-4">Filter by category</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {['Men', 'Women'].map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat.toLowerCase())}
              className={`px-6 py-2 rounded-full border-2 transition-colors
                ${selectedCategory === cat.toLowerCase()
                  ? 'border-neon-yellow text-neon-yellow'
                  : 'border-dark-grey text-text-grey hover:border-neon-yellow/50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {categories.slice(2).map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategory === cat.id}
                onChange={() => onCategoryChange(cat.id)}
                className="form-checkbox text-neon-yellow rounded border-dark-grey
                         focus:ring-neon-yellow focus:ring-offset-black"
              />
              <span className="text-text-grey group-hover:text-white transition-colors">
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Choose Color</h3>
        <div className="space-y-3">
          {colors.map((color) => (
            <label key={color.id} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="color"
                  value={color.id}
                  checked={selectedColor === color.id}
                  onChange={() => onColorChange(color.id)}
                  className="sr-only"
                />
                <div className={`w-6 h-6 rounded-full ${color.class} border border-dark-grey`} />
                {selectedColor === color.id && (
                  <div className="absolute inset-0 border-2 border-neon-yellow rounded-full" />
                )}
              </div>
              <span className="text-text-grey group-hover:text-white transition-colors">
                {color.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
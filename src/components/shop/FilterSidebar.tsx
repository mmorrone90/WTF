import React from 'react';

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedGender: string;
  onGenderChange: (gender: string) => void;
}

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  selectedGender,
  onGenderChange
}: FilterSidebarProps) {
  const genders = [
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' }
  ];

  const categories = [
    { id: 'sneakers', label: 'Sneakers' },
    { id: 't-shirt', label: 'T-Shirt' },
    { id: 'jacket', label: 'Jacket' },
    { id: 'pant', label: 'Pant' },
    { id: 'sports', label: 'Sports' },
    { id: 'dress', label: 'Dress' },
    { id: 'hoodie', label: 'Hoodie' }
  ];

  return (
    <div className="space-y-8">
      {/* Gender Filter */}
      <div className="flex gap-4 mb-8">
        {genders.map((gender) => (
          <button
            key={gender.id}
            onClick={() => onGenderChange(gender.id)}
            className={`px-8 py-3 rounded-full border-2 transition-colors
              ${selectedGender === gender.id
                ? 'border-neon-yellow text-neon-yellow'
                : 'border-dark-grey text-text-grey hover:border-neon-yellow/50'}`}
          >
            {gender.label}
          </button>
        ))}
      </div>

      {/* Category Filters */}
      <div className="space-y-4">
        {categories.map((cat) => (
          <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={selectedCategory === cat.id}
                onChange={() => onCategoryChange(cat.id)}
                className="appearance-none w-5 h-5 border-2 border-dark-grey rounded-full
                         checked:border-neon-yellow checked:bg-neon-yellow/10
                         group-hover:border-neon-yellow/50 transition-colors"
              />
              {selectedCategory === cat.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-neon-yellow rounded-full" />
                </div>
              )}
            </div>
            <span className="text-text-grey group-hover:text-white transition-colors">
              {cat.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

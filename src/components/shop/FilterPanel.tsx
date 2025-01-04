import React from 'react';
import { motion } from 'framer-motion';

const categories = ['All', 'Streetwear', 'Techwear', 'Accessories', 'Footwear'];
const brands = ['Nike', 'Adidas', 'Puma', 'New Balance'];
const prices = ['Under $50', '$50-$100', '$100-$200', 'Over $200'];

export default function FilterPanel() {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-bold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="form-checkbox text-neon-yellow" />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-bold mb-4">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="form-checkbox text-neon-yellow" />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-bold mb-4">Price Range</h3>
        <div className="space-y-2">
          {prices.map((price) => (
            <label key={price} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="form-checkbox text-neon-yellow" />
              <span>{price}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
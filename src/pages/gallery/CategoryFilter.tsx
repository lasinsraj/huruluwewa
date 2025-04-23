
import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, onSelect }) => (
  <div className="flex justify-center mb-12 overflow-x-auto pb-2">
    <div className="flex space-x-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full capitalize transition-colors ${
            activeCategory === category
              ? "bg-hurulu-teal text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

export default CategoryFilter;

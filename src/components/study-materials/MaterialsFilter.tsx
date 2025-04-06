
import React from 'react';
import { Search } from 'lucide-react';
import { categories, subjects } from '@/data/studyMaterialsData';

interface MaterialsFilterProps {
  activeCategory: string;
  activeSubject: string;
  searchQuery: string;
  setActiveCategory: (category: string) => void;
  setActiveSubject: (subject: string) => void;
  setSearchQuery: (query: string) => void;
}

const MaterialsFilter: React.FC<MaterialsFilterProps> = ({
  activeCategory,
  activeSubject,
  searchQuery,
  setActiveCategory,
  setActiveSubject,
  setSearchQuery
}) => {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <div className="w-full md:w-1/3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
            />
          </div>
        </div>
        
        <div className="flex gap-4 flex-wrap justify-center">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={activeSubject}
            onChange={(e) => setActiveSubject(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MaterialsFilter;

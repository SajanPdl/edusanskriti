
import React from 'react';
import { Search } from 'lucide-react';

interface MaterialsFilterProps {
  activeCategory: string;
  activeSubject: string;
  searchQuery: string;
  setActiveCategory: (category: string) => void;
  setActiveSubject: (subject: string) => void;
  setSearchQuery: (query: string) => void;
  availableCategories?: string[];
  availableSubjects?: string[];
}

const MaterialsFilter = ({
  activeCategory,
  activeSubject,
  searchQuery,
  setActiveCategory,
  setActiveSubject,
  setSearchQuery,
  availableCategories = [],
  availableSubjects = []
}: MaterialsFilterProps) => {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search study materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 py-2 px-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          />
        </div>
        
        {/* Category filter */}
        <div className="flex-shrink-0 w-full md:w-64">
          <select 
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full py-2 px-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="All">All Categories</option>
            {availableCategories
              .filter(cat => cat !== 'All')
              .map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
          </select>
        </div>
        
        {/* Subject filter */}
        <div className="flex-shrink-0 w-full md:w-64">
          <select 
            value={activeSubject}
            onChange={(e) => setActiveSubject(e.target.value)}
            className="w-full py-2 px-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="All">All Subjects</option>
            {availableSubjects
              .filter(sub => sub !== 'All')
              .map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MaterialsFilter;

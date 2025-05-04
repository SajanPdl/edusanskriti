
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Download, BookOpen } from 'lucide-react';
import { StudyMaterial } from '@/utils/queryUtils';

interface MaterialCardProps {
  material: StudyMaterial;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="relative">
        {material.image_url ? (
          <img 
            src={material.image_url} 
            alt={material.title} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <BookOpen className="h-16 w-16 text-indigo-500 dark:text-indigo-400" />
          </div>
        )}
        
        <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded">
          {material.category}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {material.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
          {material.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(material.date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center">
            <Download className="h-4 w-4 mr-1" />
            <span>{material.downloads} downloads</span>
          </div>
        </div>
        
        <Link to={`/content/${material.id}`}>
          <button className="mt-4 w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium py-2 rounded transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-indigo-400">
            View Material
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MaterialCard;

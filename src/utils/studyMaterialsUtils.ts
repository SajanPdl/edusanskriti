
import { StudyMaterial } from '@/data/studyMaterialsData';
import { 
  Book, 
  Calculator, 
  Flask, 
  Monitor, 
  Globe, 
  BookOpen, 
  PenTool, 
  Database, 
  FileText
} from 'lucide-react';
import React from 'react';

export const filterMaterials = (
  materials: StudyMaterial[],
  category: string,
  subject: string,
  searchQuery: string
): StudyMaterial[] => {
  return materials.filter(material => {
    // Category filter
    const categoryMatch = category === 'All' || material.category === category;
    
    // Subject filter
    const subjectMatch = subject === 'All' || material.subject === subject;
    
    // Search query filter
    const search = searchQuery.toLowerCase();
    const searchMatch = 
      !search || 
      material.title.toLowerCase().includes(search) || 
      material.description.toLowerCase().includes(search) || 
      material.subject.toLowerCase().includes(search) || 
      material.author.toLowerCase().includes(search) ||
      (material.tags && material.tags.some(tag => tag.toLowerCase().includes(search)));
    
    return categoryMatch && subjectMatch && searchMatch;
  });
};

export const getSubjectIcon = (subject: string): React.ReactNode => {
  const className = "h-12 w-12 text-edu-purple";
  
  switch (subject.toLowerCase()) {
    case 'mathematics':
      return React.createElement(Calculator, { className });
    case 'science':
      return React.createElement(Flask, { className });
    case 'physics':
      return React.createElement(Flask, { className });
    case 'chemistry':
      return React.createElement(Flask, { className });
    case 'biology':
      return React.createElement(BookOpen, { className });
    case 'computer science':
      return React.createElement(Monitor, { className });
    case 'literature':
      return React.createElement(PenTool, { className });
    case 'history':
      return React.createElement(Book, { className });
    case 'geography':
      return React.createElement(Globe, { className });
    case 'database':
      return React.createElement(Database, { className });
    default:
      return React.createElement(FileText, { className });
  }
};

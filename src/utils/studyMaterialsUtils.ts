
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
      return <Calculator className={className} />;
    case 'science':
      return <Flask className={className} />;
    case 'physics':
      return <Flask className={className} />;
    case 'chemistry':
      return <Flask className={className} />;
    case 'biology':
      return <BookOpen className={className} />;
    case 'computer science':
      return <Monitor className={className} />;
    case 'literature':
      return <PenTool className={className} />;
    case 'history':
      return <Book className={className} />;
    case 'geography':
      return <Globe className={className} />;
    case 'database':
      return <Database className={className} />;
    default:
      return <FileText className={className} />;
  }
};

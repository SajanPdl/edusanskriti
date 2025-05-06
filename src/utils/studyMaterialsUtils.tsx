
import { BookOpen, BookText, FileText } from 'lucide-react';
import { StudyMaterial as LocalStudyMaterial } from '@/data/studyMaterialsData';
import { StudyMaterial } from '@/utils/queryUtils';

export const getSubjectIcon = (subject: string) => {
  switch (subject) {
    case "Mathematics":
      return <BookText className="h-10 w-10 text-edu-purple" />;
    case "Physics":
    case "Chemistry":
    case "Biology":
      return <BookOpen className="h-10 w-10 text-edu-blue" />;
    default:
      return <FileText className="h-10 w-10 text-edu-orange" />;
  }
};

export const filterMaterials = (
  materials: LocalStudyMaterial[],
  activeCategory: string,
  activeSubject: string,
  searchQuery: string
): LocalStudyMaterial[] => {
  return materials.filter(material => {
    const matchesCategory = activeCategory === "All" || material.category === activeCategory;
    const matchesSubject = activeSubject === "All" || material.subject === activeSubject;
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        material.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        material.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSubject && matchesSearch;
  });
};


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MaterialCard from './study-materials/MaterialCard';
import MaterialsFilter from './study-materials/MaterialsFilter';
import { studyMaterialsData } from '@/data/studyMaterialsData';
import { filterMaterials } from '@/utils/studyMaterialsUtils';
import { StudyMaterial } from '@/utils/queryUtils';

const StudyMaterials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Make sure the filtered materials are compatible with the StudyMaterial type from queryUtils
  const filteredMaterials = filterMaterials(
    studyMaterialsData,
    selectedCategory,
    selectedSubject,
    searchTerm
  );
  
  // Filter options
  const filterOptions = {
    grades: ['All', 'Grade 10', 'Grade 11', 'Grade 12', "Bachelor's"],
    subjects: ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'],
    categories: ['All', 'Notes', 'Worksheets', 'Practice Tests', 'Guides']
  };

  return (
    <section id="study-materials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Study Materials</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Access comprehensive study materials organized by grade, subject, and topic to enhance your learning experience.
          </p>
        </div>

        <MaterialsFilter 
          options={filterOptions}
          searchTerm={searchTerm}
          selectedGrade={selectedGrade}
          selectedSubject={selectedSubject}
          selectedCategory={selectedCategory}
          onSearch={setSearchTerm}
          onGradeChange={setSelectedGrade}
          onSubjectChange={setSelectedSubject}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMaterials.map((material) => (
            <MaterialCard 
              key={material.id}
              material={material as unknown as StudyMaterial}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="btn-primary scale-on-hover" asChild>
            <Link to="/study-materials">Explore All Materials</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StudyMaterials;

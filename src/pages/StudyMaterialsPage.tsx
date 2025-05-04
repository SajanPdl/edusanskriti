
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MaterialCard from '@/components/study-materials/MaterialCard';
import MaterialsFilter from '@/components/study-materials/MaterialsFilter';
import { fetchStudyMaterials } from '@/utils/queryUtils';
import { Button } from '@/components/ui/button';
import { StudyMaterial } from '@/utils/queryUtils';

const StudyMaterialsPage = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  useEffect(() => {
    const loadMaterials = async () => {
      try {
        setLoading(true);
        const params: { grade?: string; subject?: string; category?: string; search?: string } = {};
        
        if (selectedGrade !== 'All') params.grade = selectedGrade;
        if (selectedSubject !== 'All') params.subject = selectedSubject;
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (searchTerm) params.search = searchTerm;
        
        const data = await fetchStudyMaterials(params);
        setMaterials(data);
      } catch (error) {
        console.error("Error loading study materials:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMaterials();
  }, [searchTerm, selectedGrade, selectedSubject, selectedCategory]);

  // Handle filter changes
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };
  
  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade);
  };
  
  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  // Filter options for the MaterialsFilter component
  const filterOptions = {
    grades: ['All', 'Grade 10', 'Grade 11', 'Grade 12', "Bachelor's"],
    subjects: ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'],
    categories: ['All', 'Notes', 'Worksheets', 'Practice Tests', 'Guides']
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2">Study Materials</h1>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Browse through our comprehensive collection of study materials to enhance your learning experience. 
            We offer various resources tailored to different subjects and educational levels.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <MaterialsFilter 
                options={filterOptions}
                onSearch={handleSearchChange}
                onGradeChange={handleGradeChange}
                onSubjectChange={handleSubjectChange}
                onCategoryChange={handleCategoryChange}
                selectedGrade={selectedGrade}
                selectedSubject={selectedSubject}
                selectedCategory={selectedCategory}
                searchTerm={searchTerm}
              />
            </div>
            
            <div className="lg:col-span-3">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-4 text-gray-600">Loading study materials...</p>
                </div>
              ) : materials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {materials.map((material) => (
                    <MaterialCard 
                      key={material.id} 
                      material={material} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Study Materials Found</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    We couldn't find any study materials matching your current filters. Try adjusting your search criteria or browse all materials.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedGrade('All');
                      setSelectedSubject('All');
                      setSelectedCategory('All');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudyMaterialsPage;

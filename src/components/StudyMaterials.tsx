
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MaterialCard from './study-materials/MaterialCard';
import MaterialsFilter from './study-materials/MaterialsFilter';
import { fetchStudyMaterials, getCategories, getSubjects } from '@/utils/studyMaterialsDbUtils';
import { filterMaterials } from '@/utils/studyMaterialsUtils';
import { StudyMaterial } from '@/data/studyMaterialsData';
import { useToast } from '@/hooks/use-toast';

const StudyMaterials = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubject, setActiveSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [materialsData, categoriesData, subjectsData] = await Promise.all([
          fetchStudyMaterials(),
          getCategories(),
          getSubjects()
        ]);
        
        setMaterials(materialsData);
        setCategories(categoriesData);
        setSubjects(subjectsData);
      } catch (error) {
        console.error("Error loading study materials data:", error);
        toast({
          title: "Error loading data",
          description: "Could not load study materials. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const toggleCardExpand = (id: number) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const filteredMaterials = filterMaterials(
    materials,
    activeCategory,
    activeSubject,
    searchQuery
  );

  return (
    <section id="study-materials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text font-playfair">Study Materials</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Access comprehensive study materials organized by grade, subject, and topic to enhance your learning experience.
          </p>
        </div>

        <MaterialsFilter 
          activeCategory={activeCategory}
          activeSubject={activeSubject}
          searchQuery={searchQuery}
          setActiveCategory={setActiveCategory}
          setActiveSubject={setActiveSubject}
          setSearchQuery={setSearchQuery}
          availableCategories={categories}
          availableSubjects={subjects}
        />

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-edu-purple"></div>
          </div>
        ) : filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMaterials.map((material) => (
              <MaterialCard 
                key={material.id}
                material={material}
                hoveredId={hoveredId}
                expandedCardId={expandedCardId}
                onHover={setHoveredId}
                onExpandToggle={toggleCardExpand}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No study materials found matching your criteria.</p>
            <Button variant="outline" onClick={() => {
              setActiveCategory("All");
              setActiveSubject("All");
              setSearchQuery("");
            }}>
              Reset Filters
            </Button>
          </div>
        )}

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

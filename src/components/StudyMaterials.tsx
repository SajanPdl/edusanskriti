
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MaterialCard from './study-materials/MaterialCard';
import MaterialsFilter from './study-materials/MaterialsFilter';
import { studyMaterialsData } from '@/data/studyMaterialsData';
import { filterMaterials } from '@/utils/studyMaterialsUtils';

const StudyMaterials = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubject, setActiveSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  const toggleCardExpand = (id: number) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const filteredMaterials = filterMaterials(
    studyMaterialsData,
    activeCategory,
    activeSubject,
    searchQuery
  );

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
          activeCategory={activeCategory}
          activeSubject={activeSubject}
          searchQuery={searchQuery}
          setActiveCategory={setActiveCategory}
          setActiveSubject={setActiveSubject}
          setSearchQuery={setSearchQuery}
        />

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

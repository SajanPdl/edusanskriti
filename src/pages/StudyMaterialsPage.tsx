
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MaterialCard from '@/components/study-materials/MaterialCard';
import MaterialsFilter from '@/components/study-materials/MaterialsFilter';
import { fetchStudyMaterials } from '@/utils/queryUtils';
import { Button } from '@/components/ui/button';
import { StudyMaterial } from '@/utils/queryUtils';
import { NepalAdsFloater } from '@/components/ads/NepalAdsFloater';
import PremiumSubscription from '@/components/PremiumSubscription';
import { CreditCard } from 'lucide-react';

const StudyMaterialsPage = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isPremium, setIsPremium] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  
  useEffect(() => {
    // Check if user has premium status
    const userSubscription = localStorage.getItem('userSubscription');
    setIsPremium(userSubscription === 'premium');
    
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
  
  // Mark premium content
  const processedMaterials = materials.map(material => {
    // Let's assume some materials are premium based on either:
    // 1. Having a "premium" tag (if that exists in your data)
    // 2. Or we can set some materials as premium based on ID or other criteria
    const isPremiumContent = material.id % 3 === 0; // Example: every 3rd item is premium
    return { ...material, isPremiumContent };
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Study Materials</h1>
              <p className="text-gray-600 max-w-3xl">
                Browse through our comprehensive collection of study materials to enhance your learning experience.
              </p>
            </div>
            
            {!isPremium && (
              <Button 
                onClick={() => setShowSubscription(true)}
                className="bg-gradient-to-r from-[#DC143C] to-[#003893] hover:opacity-90 flex items-center gap-2"
              >
                <CreditCard size={16} />
                Upgrade to Premium
              </Button>
            )}
            
            {isPremium && (
              <div className="bg-gradient-to-r from-[#DC143C] to-[#003893] p-0.5 rounded">
                <div className="bg-white dark:bg-gray-900 px-4 py-1 rounded-sm">
                  <span className="bg-gradient-to-r from-[#DC143C] to-[#003893] bg-clip-text text-transparent font-medium">
                    Premium Member
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {showSubscription ? (
            <div>
              <Button 
                variant="outline" 
                onClick={() => setShowSubscription(false)}
                className="mb-6"
              >
                Back to Study Materials
              </Button>
              <PremiumSubscription />
            </div>
          ) : (
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
                
                {!isPremium && (
                  <div className="mt-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <h3 className="text-lg font-medium mb-2">Premium Benefits</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Ad-free browsing experience</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Access to exclusive premium content</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Unlimited downloads</span>
                      </li>
                    </ul>
                    <Button 
                      onClick={() => setShowSubscription(true)}
                      className="w-full mt-4 bg-gradient-to-r from-[#DC143C] to-[#003893] hover:opacity-90"
                      size="sm"
                    >
                      Upgrade Now
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-3">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-4 text-gray-600">Loading study materials...</p>
                  </div>
                ) : processedMaterials.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {processedMaterials.map((material) => (
                      <Link to={`/content/${material.id}`} key={material.id}>
                        <div className="relative">
                          {material.isPremiumContent && !isPremium && (
                            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm z-10 rounded-lg flex flex-col items-center justify-center p-4">
                              <div className="bg-gradient-to-r from-[#DC143C] to-[#003893] text-white px-3 py-1 rounded text-sm font-bold mb-2">
                                Premium Content
                              </div>
                              <p className="text-white text-center mb-3">
                                Upgrade to access this premium study material
                              </p>
                              <Button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setShowSubscription(true);
                                }}
                                size="sm"
                                className="bg-white text-gray-900 hover:bg-gray-100"
                              >
                                Upgrade Now
                              </Button>
                            </div>
                          )}
                          <MaterialCard 
                            material={material} 
                            isPremium={material.isPremiumContent}
                          />
                        </div>
                      </Link>
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
          )}
        </div>
      </main>
      
      {!isPremium && !showSubscription && <NepalAdsFloater />}
      <Footer />
    </div>
  );
};

export default StudyMaterialsPage;

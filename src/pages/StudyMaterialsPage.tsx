import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { Book, Filter, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useQuery } from '@tanstack/react-query';
import { fetchStudyMaterials } from '@/utils/queryUtils';
import { Skeleton } from '@/components/ui/skeleton';

// These are the filter options available
const categories = [
  "Grade 7", "Grade 8", "Grade 9", "Grade 10", 
  "Grade 11", "Grade 12", "Bachelor's", "Engineering"
];

const subjects = [
  "Mathematics", "Science", "Physics", "Chemistry", "Biology", 
  "History", "Geography", "Computer Science", "Literature"
];

const resourceTypes = [
  "Notes", "Textbook", "Formula Sheet", "Lab Manual", "Practice Sheets", "Summary"
];

const StudyMaterialsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // React Query for fetching study materials
  const { data: materials, isLoading, refetch } = useQuery({
    queryKey: ['study-materials'],
    queryFn: () => fetchStudyMaterials(),
  });
  
  // Client-side filtering (in production, this would be done in the database query)
  const filteredMaterials = materials ? materials.filter(material => {
    const matchesGrade = selectedGrade ? material.grade === selectedGrade : true;
    const matchesSubject = selectedSubject ? material.subject === selectedSubject : true;
    const matchesType = selectedType ? (material as any).type === selectedType || material.category === selectedType : true;
    const matchesSearch = searchQuery 
      ? material.title.toLowerCase().includes(searchQuery.toLowerCase()) 
      : true;

    return matchesGrade && matchesSubject && matchesType && matchesSearch;
  }) : [];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtering is done reactively through the filteredMaterials computation
  };

  const resetFilters = () => {
    setSelectedGrade('');
    setSelectedSubject('');
    setSelectedType('');
    setSearchQuery('');
  };
  
  const handleCardClick = (materialId: number) => {
    navigate(`/content/${materialId}`);
  };
  
  const handleDownload = (e: React.MouseEvent, material: any) => {
    e.stopPropagation(); // Prevent navigation when clicking download
    toast({
      title: "Download Started",
      description: `${material.title} is being downloaded.`,
    });
    
    // In a real app, we would call an API to increment the download count
    // and maybe track the download in analytics
    
    // Open the actual file or sample PDF
    if (material.download_url) {
      window.open(material.download_url, '_blank');
    } else {
      // Fallback for sample
      window.open("https://www.africau.edu/images/default/sample.pdf", '_blank');
    }
  };
  
  const handlePreview = (e: React.MouseEvent, materialId: number) => {
    e.stopPropagation(); // Prevent card click when clicking preview
    navigate(`/content/${materialId}`);
  };

  // Use skeleton loaders while data is loading
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
          
          <Skeleton className="h-6 w-3/4 mb-4" />
          
          <div className="flex items-center mb-4">
            <Skeleton className="h-4 w-32" />
          </div>
          
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-edu-lightgray to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 gradient-text">Study Materials</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Access comprehensive study materials, notes, and resources to enhance your learning experience.
            Filter by grade, subject, or material type to find exactly what you need.
          </p>
          
          <form onSubmit={handleSearch} className="mb-10">
            <SearchBar 
              placeholder="Search study materials..." 
              className="max-w-3xl mx-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={(query) => setSearchQuery(query)}
            />
          </form>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-10">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 text-edu-purple mr-2" />
              <h2 className="text-xl font-bold">Filter Materials</h2>
              <button 
                onClick={resetFilters}
                className="ml-auto text-sm text-edu-purple hover:text-edu-indigo"
              >
                Reset Filters
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grade/Level</label>
                <select 
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-edu-purple focus:ring focus:ring-edu-purple/20 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Grades</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <select 
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-edu-purple focus:ring focus:ring-edu-purple/20 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resource Type</label>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-edu-purple focus:ring focus:ring-edu-purple/20 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Types</option>
                  {resourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button 
              onClick={handleSearch}
              className="mt-6 btn-primary w-full sm:w-auto"
              type="button"
            >
              Apply Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              renderSkeletons()
            ) : filteredMaterials.length > 0 ? (
              filteredMaterials.map(material => (
                <div 
                  key={material.id} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleCardClick(material.id)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-edu-purple/10 text-edu-purple mb-3">
                          {material.grade || material.level || 'All Grades'}
                        </span>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-edu-blue/10 text-edu-blue mb-3 ml-2">
                          {material.subject || 'General'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {(material as any).file_size || material.pages ? `${material.pages || ''} pages` : ''} 
                        {(material as any).file_type ? (material as any).file_type : 'PDF'}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{material.title}</h3>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Book className="h-4 w-4 mr-1" />
                      <span>{(material as any).type || material.category || 'Study Material'}</span>
                      <span className="mx-2">•</span>
                      <Download className="h-4 w-4 mr-1" />
                      <span>{(material as any).download_count || material.downloads || 0}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        className="flex items-center justify-center px-4 py-2 bg-edu-purple text-white rounded-lg hover:bg-edu-indigo transition-colors"
                        onClick={(e) => handleDownload(e, material)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                      <button 
                        className="flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        onClick={(e) => handlePreview(e, material.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-20">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No materials found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StudyMaterialsPage;

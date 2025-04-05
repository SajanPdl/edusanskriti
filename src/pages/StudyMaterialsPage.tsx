import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { BookOpen, Filter, Download, Calendar, Award } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data for study materials
const initialMaterials = [
  {
    id: 1,
    title: "Grade 10 Science Notes",
    description: "Comprehensive notes for Grade 10 Science covering all key topics.",
    category: "Science",
    grade: "Grade 10",
    subject: "Science",
    fileSize: "2.5 MB",
    fileType: "PDF",
    downloadCount: 3256,
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Engineering Mathematics",
    description: "Detailed notes on advanced mathematics for engineering students.",
    category: "Mathematics",
    grade: "Engineering",
    subject: "Mathematics",
    fileSize: "3.8 MB",
    fileType: "PDF",
    downloadCount: 2890,
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Grade 11 History Notes",
    description: "Key historical events and figures for Grade 11 History.",
    category: "History",
    grade: "Grade 11",
    subject: "History",
    fileSize: "1.9 MB",
    fileType: "PDF",
    downloadCount: 1987,
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Computer Science Fundamentals",
    description: "Introduction to basic concepts in computer science.",
    category: "Computer Science",
    grade: "Bachelor's",
    subject: "Computer Science",
    fileSize: "4.2 MB",
    fileType: "PDF",
    downloadCount: 4123,
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Physics Formula Sheet",
    description: "Essential physics formulas for quick reference.",
    category: "Physics",
    grade: "Grade 12",
    subject: "Physics",
    fileSize: "1.2 MB",
    fileType: "PDF",
    downloadCount: 2567,
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Chemistry Lab Manual",
    description: "Step-by-step guide for chemistry lab experiments.",
    category: "Chemistry",
    grade: "Grade 11",
    subject: "Chemistry",
    fileSize: "3.1 MB",
    fileType: "PDF",
    downloadCount: 1789,
    thumbnailUrl: "/placeholder.svg"
  }
];

const categories = [
  "Mathematics", "Science", "Physics", "Chemistry", "Biology", 
  "History", "Geography", "Computer Science", "Literature"
];

const grades = [
  "Grade 7", "Grade 8", "Grade 9", "Grade 10", 
  "Grade 11", "Grade 12", "Bachelor's", "Engineering"
];

const StudyMaterialsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState(initialMaterials);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filterMaterials = () => {
    return initialMaterials.filter(material => {
      const matchesCategory = selectedCategory ? material.category === selectedCategory : true;
      const matchesGrade = selectedGrade ? material.grade === selectedGrade : true;
      const matchesSearch = searchQuery 
        ? material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          material.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return matchesCategory && matchesGrade && matchesSearch;
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setMaterials(filterMaterials());
  };

  const handleApplyFilters = () => {
    setMaterials(filterMaterials());
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedGrade('');
    setSearchQuery('');
    setMaterials(initialMaterials);
  };

  const handleMaterialClick = (materialId: number) => {
    navigate(`/content/${materialId}`);
  };

  const handleDownload = (e: React.MouseEvent, material: any) => {
    e.stopPropagation();
    toast({
      title: `Download Started`,
      description: `${material.title} is being downloaded.`,
    });
    
    // Simulating download with example URL
    window.open("https://example.com/sample.pdf", '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-edu-lightgray to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 gradient-text">Study Materials</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Access a wide range of study materials to help you excel in your studies. 
            Filter by category or grade level to find the right materials for your needs.
          </p>
          
          <div className="mb-10">
            <SearchBar 
              placeholder="Search study materials..." 
              className="max-w-3xl mx-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
              category="materials"
            />
          </div>
          
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-edu-purple focus:ring focus:ring-edu-purple/20 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grade/Level</label>
                <select 
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-edu-purple focus:ring focus:ring-edu-purple/20 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Grades</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button 
              onClick={handleApplyFilters}
              className="mt-6 btn-primary w-full sm:w-auto"
              type="button"
            >
              Apply Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map(material => (
              <div 
                key={material.id} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleMaterialClick(material.id)}
              >
                <img 
                  src={material.thumbnailUrl} 
                  alt={material.title} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-edu-purple/10 text-edu-purple mb-3">
                        {material.category}
                      </span>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-edu-blue/10 text-edu-blue mb-3 ml-2">
                        {material.grade}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{material.fileSize} {material.fileType}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{material.title}</h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{material.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Uploaded on: Unknown</span>
                    <span className="mx-2">•</span>
                    <Award className="h-4 w-4 mr-1" />
                    <span>{material.subject}</span>
                  </div>
                  
                  <button 
                    className="flex items-center justify-center px-4 py-2 bg-edu-purple text-white rounded-lg hover:bg-edu-indigo transition-colors"
                    onClick={(e) => handleDownload(e, material)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Material
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StudyMaterialsPage;

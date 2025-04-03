
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { Book, Filter, Download, Eye } from 'lucide-react';

// Mock data for study materials
const initialMaterials = [
  {
    id: 1,
    title: "Grade 10 Science Notes",
    subject: "Science",
    grade: "Grade 10",
    type: "Notes",
    downloadCount: 1245,
    fileSize: "2.4 MB",
    fileType: "PDF",
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Engineering Mathematics",
    subject: "Mathematics",
    grade: "Engineering",
    type: "Textbook",
    downloadCount: 3210,
    fileSize: "5.8 MB",
    fileType: "PDF",
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Grade 11 History Notes",
    subject: "History",
    grade: "Grade 11",
    type: "Notes",
    downloadCount: 854,
    fileSize: "1.7 MB",
    fileType: "PDF",
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Computer Science Fundamentals",
    subject: "Computer Science",
    grade: "Bachelor's",
    type: "Textbook",
    downloadCount: 4567,
    fileSize: "8.2 MB",
    fileType: "PDF",
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Grade 9 Mathematics Formulas",
    subject: "Mathematics",
    grade: "Grade 9",
    type: "Formula Sheet",
    downloadCount: 2198,
    fileSize: "1.1 MB",
    fileType: "PDF",
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Bachelor's Physics Laboratory Manual",
    subject: "Physics",
    grade: "Bachelor's",
    type: "Lab Manual",
    downloadCount: 1782,
    fileSize: "3.9 MB",
    fileType: "PDF",
    thumbnailUrl: "/placeholder.svg"
  }
];

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
  const [materials, setMaterials] = useState(initialMaterials);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filterMaterials = () => {
    return initialMaterials.filter(material => {
      const matchesGrade = selectedGrade ? material.grade === selectedGrade : true;
      const matchesSubject = selectedSubject ? material.subject === selectedSubject : true;
      const matchesType = selectedType ? material.type === selectedType : true;
      const matchesSearch = searchQuery 
        ? material.title.toLowerCase().includes(searchQuery.toLowerCase()) 
        : true;

      return matchesGrade && matchesSubject && matchesType && matchesSearch;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setMaterials(filterMaterials());
  };

  const resetFilters = () => {
    setSelectedGrade('');
    setSelectedSubject('');
    setSelectedType('');
    setSearchQuery('');
    setMaterials(initialMaterials);
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
            {materials.map(material => (
              <div key={material.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-edu-purple/10 text-edu-purple mb-3">
                        {material.grade}
                      </span>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-edu-blue/10 text-edu-blue mb-3 ml-2">
                        {material.subject}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{material.fileSize} {material.fileType}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{material.title}</h3>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Book className="h-4 w-4 mr-1" />
                    <span>{material.type}</span>
                    <span className="mx-2">•</span>
                    <Download className="h-4 w-4 mr-1" />
                    <span>{material.downloadCount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex items-center justify-center px-4 py-2 bg-edu-purple text-white rounded-lg hover:bg-edu-indigo transition-colors">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </button>
                  </div>
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

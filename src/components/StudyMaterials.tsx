
import { useState } from 'react';
import { BookOpen, FileText, BookText, Search } from 'lucide-react';

// Sample data for study materials
const studyMaterialsData = [
  {
    id: 1,
    title: "Mathematics for Grade 10",
    category: "High School",
    subject: "Mathematics",
    downloads: 2458,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Physics Notes - Mechanics",
    category: "Bachelor's",
    subject: "Physics",
    downloads: 1879,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Chemistry Formulas Handbook",
    category: "High School",
    subject: "Chemistry",
    downloads: 3120,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Computer Science Algorithms",
    category: "Engineering",
    subject: "Computer Science",
    downloads: 1547,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 5,
    title: "English Grammar Guide",
    category: "High School",
    subject: "English",
    downloads: 4205,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 6,
    title: "Biology - Human Anatomy",
    category: "Medical",
    subject: "Biology",
    downloads: 2873,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 7,
    title: "History - Modern World",
    category: "Bachelor's",
    subject: "History",
    downloads: 1054,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 8,
    title: "Economics Principles",
    category: "Bachelor's",
    subject: "Economics",
    downloads: 1732,
    imageUrl: "/placeholder.svg",
  },
];

// Categories for filtering
const categories = ["All", "High School", "Bachelor's", "Engineering", "Medical"];
const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English", "History", "Economics"];

const StudyMaterials = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubject, setActiveSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMaterials = studyMaterialsData.filter(material => {
    const matchesCategory = activeCategory === "All" || material.category === activeCategory;
    const matchesSubject = activeSubject === "All" || material.subject === activeSubject;
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSubject && matchesSearch;
  });

  const getIcon = (subject: string) => {
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

  return (
    <section id="study-materials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Study Materials</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Access comprehensive study materials organized by grade, subject, and topic to enhance your learning experience.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            
            <div className="flex gap-4 flex-wrap justify-center">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={activeSubject}
                onChange={(e) => setActiveSubject(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMaterials.map(material => (
            <div key={material.id} className="glass-card group hover:shadow-neon transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  {getIcon(material.subject)}
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm px-3 py-1 rounded-full">
                    {material.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-edu-purple transition-colors duration-300">
                  {material.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Subject: {material.subject}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {material.downloads.toLocaleString()} downloads
                  </span>
                  <button className="bg-edu-purple/10 hover:bg-edu-purple/20 text-edu-purple px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-300">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center mt-12">
          <button className="btn-primary">
            Explore All Materials
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudyMaterials;

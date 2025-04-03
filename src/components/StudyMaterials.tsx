
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, BookText, Search, Download, Star, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

// Sample data for study materials
const studyMaterialsData = [
  {
    id: 1,
    title: "Mathematics for Grade 10",
    category: "High School",
    subject: "Mathematics",
    downloads: 2458,
    rating: 4.8,
    views: 5620,
    image: "/placeholder.svg",
    description: "Comprehensive notes covering all essential topics for Grade 10 Mathematics."
  },
  {
    id: 2,
    title: "Physics Notes - Mechanics",
    category: "Bachelor's",
    subject: "Physics",
    downloads: 1879,
    rating: 4.6,
    views: 3450,
    image: "/placeholder.svg",
    description: "Detailed notes on Classical Mechanics covering Newton's Laws, Conservation of Energy, and more."
  },
  {
    id: 3,
    title: "Chemistry Formulas Handbook",
    category: "High School",
    subject: "Chemistry",
    downloads: 3120,
    rating: 4.9,
    views: 7890,
    image: "/placeholder.svg",
    description: "A comprehensive handbook containing all essential chemistry formulas and equations."
  },
  {
    id: 4,
    title: "Computer Science Algorithms",
    category: "Engineering",
    subject: "Computer Science",
    downloads: 1547,
    rating: 4.5,
    views: 2980,
    image: "/placeholder.svg",
    description: "In-depth coverage of essential algorithms and data structures for CS students."
  },
  {
    id: 5,
    title: "English Grammar Guide",
    category: "High School",
    subject: "English",
    downloads: 4205,
    rating: 4.7,
    views: 8750,
    image: "/placeholder.svg",
    description: "Complete grammar guide with examples and practice exercises for students."
  },
  {
    id: 6,
    title: "Biology - Human Anatomy",
    category: "Medical",
    subject: "Biology",
    downloads: 2873,
    rating: 4.8,
    views: 5240,
    image: "/placeholder.svg",
    description: "Detailed diagrams and notes on human anatomical systems for medical students."
  },
  {
    id: 7,
    title: "History - Modern World",
    category: "Bachelor's",
    subject: "History",
    downloads: 1054,
    rating: 4.3,
    views: 2130,
    image: "/placeholder.svg",
    description: "Comprehensive notes on modern world history from 1900 to present."
  },
  {
    id: 8,
    title: "Economics Principles",
    category: "Bachelor's",
    subject: "Economics",
    downloads: 1732,
    rating: 4.6,
    views: 3650,
    image: "/placeholder.svg",
    description: "Fundamental economic principles explained with real-world case studies."
  },
];

// Categories for filtering
const categories = ["All", "High School", "Bachelor's", "Engineering", "Medical"];
const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English", "History", "Economics"];

const StudyMaterials = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubject, setActiveSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredMaterials = studyMaterialsData.filter(material => {
    const matchesCategory = activeCategory === "All" || material.category === activeCategory;
    const matchesSubject = activeSubject === "All" || material.subject === activeSubject;
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          material.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          material.description.toLowerCase().includes(searchQuery.toLowerCase());
    
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
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
                />
              </div>
            </div>
            
            <div className="flex gap-4 flex-wrap justify-center">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={activeSubject}
                onChange={(e) => setActiveSubject(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
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
            <Link 
              key={material.id} 
              to={`/content/${material.id}`}
              className="block"
              onMouseEnter={() => setHoveredId(material.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`glass-card interactive-card card-hover h-full ${hoveredId === material.id ? 'shadow-neon' : ''}`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    {getIcon(material.subject)}
                    <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-edu-purple/10 hover:text-edu-purple transition-colors">
                      {material.category}
                    </Badge>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 group-hover:text-edu-purple transition-colors duration-300 ${hoveredId === material.id ? 'text-edu-purple' : ''}`}>
                    {material.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {material.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Download className="h-4 w-4 mr-1" />
                        <span>{material.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        <span>{material.rating}</span>
                      </div>
                    </div>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                          <Eye className="h-4 w-4 text-edu-purple" />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">{material.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {material.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>{material.subject}</span>
                            <span>{material.views.toLocaleString()} views</span>
                          </div>
                          <Button size="sm" className="w-full mt-2">
                            View Material
                          </Button>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center mt-12">
          <Button className="btn-primary scale-on-hover">
            Explore All Materials
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StudyMaterials;

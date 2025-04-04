import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, FileText, BookText, Search, Download, Star, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

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
    description: "Comprehensive notes covering all essential topics for Grade 10 Mathematics.",
    keyPoints: [
      "Complete explanation of algebraic expressions and equations",
      "Geometric proofs and constructions with step-by-step solutions",
      "Trigonometric functions and their applications",
      "Statistics and probability concepts with real-world examples"
    ],
    importantFormulas: [
      "Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a",
      "Pythagorean Theorem: a² + b² = c²",
      "Area of a Circle: A = πr²",
      "Sine Law: a/sin(A) = b/sin(B) = c/sin(C)"
    ],
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf"
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
    description: "Detailed notes on Classical Mechanics covering Newton's Laws, Conservation of Energy, and more.",
    keyPoints: [
      "Vector analysis and Newton's three laws of motion",
      "Work, energy, and power principles",
      "Momentum and impulse concepts",
      "Rotational dynamics and angular momentum"
    ],
    importantFormulas: [
      "F = ma (Newton's Second Law)",
      "E = mc² (Einstein's Mass-Energy Equivalence)",
      "KE = ½mv² (Kinetic Energy)",
      "p = mv (Linear Momentum)"
    ],
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf"
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

const categories = ["All", "High School", "Bachelor's", "Engineering", "Medical"];
const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English", "History", "Economics"];

const StudyMaterials = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubject, setActiveSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  const toggleCardExpand = (id: number) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const handleDownload = (id: number, title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Download Started",
      description: `${title} is being downloaded.`,
    });
    
    console.log(`Downloading material ID: ${id}`);
    
    window.open("https://example.com/sample.pdf", '_blank');
  };

  const handlePreview = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/content/${id}`);
  };

  const handleCardClick = (id: number) => {
    navigate(`/content/${id}`);
  };

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMaterials.map((material) => (
            <div key={material.id} className="relative">
              <Card 
                className={`interactive-card h-full overflow-hidden transition-all ${hoveredId === material.id ? 'shadow-neon' : 'shadow-md'} cursor-pointer`}
                onMouseEnter={() => setHoveredId(material.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleCardClick(material.id)}
              >
                <div className="block h-full">
                  <CardHeader className="p-6">
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
                  </CardHeader>
                  
                  <CardFooter className="px-6 pb-6 pt-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Download 
                            className="h-4 w-4 mr-1 cursor-pointer hover:text-edu-purple" 
                            onClick={(e) => handleDownload(material.id, material.title, e)}
                          />
                          <span>{material.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Star className="h-4 w-4 mr-1 text-yellow-500" />
                          <span>{material.rating}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-8 w-8" onClick={(e) => handlePreview(material.id, e)}>
                        <Eye className="h-4 w-4 text-edu-purple" />
                      </Button>
                    </div>
                  </CardFooter>
                </div>
              </Card>
              
              {(material.subject === "Mathematics" || material.subject === "Physics") && (
                <Collapsible 
                  open={expandedCardId === material.id}
                  onOpenChange={() => toggleCardExpand(material.id)}
                  className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full flex items-center justify-between p-3 text-sm"
                    >
                      <span>Preview Key Points & Formulas</span>
                      {expandedCardId === material.id ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 space-y-4 border-t border-gray-100 dark:border-gray-700">
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-edu-purple">Key Points</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        {material.keyPoints?.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-edu-purple/70 mt-1.5 mr-2"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-edu-blue">Important Formulas</h4>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md space-y-2">
                        {material.importantFormulas?.map((formula, index) => (
                          <div key={index} className="text-sm text-gray-700 dark:text-gray-300">
                            {formula}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDownload(material.id, material.title, e);
                        }}
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-edu-purple to-edu-blue text-white hover:from-edu-blue hover:to-edu-purple transition-all duration-300 transform hover:scale-105" asChild>
                        <Link to={`/content/${material.id}`}>
                          View Full Material
                        </Link>
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
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

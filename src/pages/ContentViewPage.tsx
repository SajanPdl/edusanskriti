
import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Clock, 
  Download, 
  Share, 
  Heart, 
  Bookmark, 
  MessageSquare, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookText,
  Send,
  Bot,
  Calculator
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { toast } from 'sonner';
import PdfViewer from '@/components/PdfViewer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Sample material data
const MATERIALS_DATA = [
  {
    id: "1",
    title: "Mathematics for Grade 10",
    category: "High School",
    subject: "Mathematics",
    grade: "Grade 10",
    type: "Notes",
    dateAdded: "2023-05-15",
    fileSize: "2.4 MB",
    downloads: 2458,
    fileUrl: "https://www.africau.edu/images/default/sample.pdf",
    description: "Comprehensive notes covering all the essential topics for Grade 10 Mathematics including Algebra, Geometry, Trigonometry, and Statistics.",
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
    author: {
      name: "Anil Kumar",
      role: "Mathematics Professor",
      avatar: "/placeholder.svg"
    },
    relatedMaterials: [2, 5, 8],
    comments: [
      { id: 1, author: "Rahul S.", avatar: "/placeholder.svg", text: "These notes are excellent! They helped me prepare for my final exams.", date: "2023-06-10" },
      { id: 2, author: "Priya M.", avatar: "/placeholder.svg", text: "The explanations are very clear. Thank you for sharing these!", date: "2023-06-08" }
    ]
  },
  {
    id: "2",
    title: "Physics Notes - Mechanics",
    category: "Bachelor's",
    subject: "Physics",
    grade: "Bachelor's",
    type: "Notes",
    dateAdded: "2023-04-20",
    fileSize: "3.1 MB",
    downloads: 1879,
    fileUrl: "https://www.africau.edu/images/default/sample.pdf",
    description: "Detailed notes on Classical Mechanics covering Newton's Laws, Conservation of Energy, Momentum, and Rotational Dynamics perfect for undergraduate physics students.",
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
    author: {
      name: "Dr. Sarita Patel",
      role: "Physics Professor",
      avatar: "/placeholder.svg"
    },
    relatedMaterials: [3, 6],
    comments: [
      { id: 3, author: "Vikas G.", avatar: "/placeholder.svg", text: "These notes are incredibly helpful for understanding complex mechanics concepts.", date: "2023-05-15" }
    ]
  },
  {
    id: "3",
    title: "Chemistry Formulas Handbook",
    category: "High School",
    subject: "Chemistry",
    grade: "Grade 11-12",
    type: "Formula Sheet",
    dateAdded: "2023-06-02",
    fileSize: "1.7 MB",
    downloads: 3120,
    fileUrl: "https://www.africau.edu/images/default/sample.pdf",
    description: "A comprehensive handbook containing all essential chemistry formulas and equations for high school students preparing for board exams and competitive tests.",
    keyPoints: [
      "Periodic table with detailed element properties",
      "Chemical bonding and molecular structure",
      "Thermodynamics and chemical equilibrium",
      "Organic chemistry reactions and mechanisms"
    ],
    importantFormulas: [
      "PV = nRT (Ideal Gas Law)",
      "pH = -log[H⁺] (pH Formula)",
      "ΔG = ΔH - TΔS (Gibbs Free Energy)",
      "K = [C]ᶜ[D]ᵈ/[A]ᵃ[B]ᵇ (Equilibrium Constant)"
    ],
    author: {
      name: "Dr. Mohit Sharma",
      role: "Chemistry Educator",
      avatar: "/placeholder.svg"
    },
    relatedMaterials: [4, 7],
    comments: [
      { id: 4, author: "Anjali T.", avatar: "/placeholder.svg", text: "This handbook saved me during exam preparation. All formulas in one place!", date: "2023-06-25" },
      { id: 5, author: "Kartik P.", avatar: "/placeholder.svg", text: "Very well organized. The periodic table section is especially helpful.", date: "2023-06-20" }
    ]
  }
];

// Sample suggested materials data
const SUGGESTED_MATERIALS = [
  {
    id: "4",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    type: "Tutorial",
    downloads: 1245,
    fileUrl: "/placeholder.svg"
  },
  {
    id: "5",
    title: "Trigonometry Practice Problems",
    subject: "Mathematics",
    type: "Worksheet",
    downloads: 987,
    fileUrl: "/placeholder.svg"
  },
  {
    id: "6",
    title: "Statistics Made Easy",
    subject: "Mathematics",
    type: "Guide",
    downloads: 1532,
    fileUrl: "/placeholder.svg"
  }
];

// Sample ad data
const ADS_DATA = [
  {
    id: 1,
    title: "Premium Math Courses",
    platform: "adsterra",
    image: "/placeholder.svg",
    link: "https://example.com/ad1"
  },
  {
    id: 2,
    title: "Online Tutoring Services",
    platform: "adsterra",
    image: "/placeholder.svg",
    link: "https://example.com/ad2"
  }
];

const ContentViewPage = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const [material, setMaterial] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [commentText, setCommentText] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{sender: 'user' | 'bot', text: string}[]>([
    {sender: 'bot', text: 'Hello! I\'m your AI study assistant. Ask me anything about this study material!'}
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isKeyPointsOpen, setIsKeyPointsOpen] = useState(true);
  const [isFormulasOpen, setIsFormulasOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  useEffect(() => {
    // Simulate API call to get material
    setIsLoading(true);
    
    setTimeout(() => {
      const foundMaterial = MATERIALS_DATA.find(m => m.id === id);
      if (foundMaterial) {
        setMaterial(foundMaterial);
      }
      setIsLoading(false);
    }, 800);
    
    // Reset scroll position
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    // Scroll to bottom of chat when messages change
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDownload = () => {
    if (material) {
      // In a real app, this would be an actual download
      window.open(material.fileUrl, '_blank');
      toast.success('Download started!');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: material?.title || 'Study Material',
        text: material?.description || 'Check out this study material',
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Like removed' : 'You liked this material');
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    // In a real app, this would save to a database
    if (material) {
      const newComment = {
        id: Math.random(),
        author: "You",
        avatar: "/placeholder.svg",
        text: commentText,
        date: new Date().toISOString().split('T')[0]
      };
      
      material.comments = [newComment, ...material.comments];
      setMaterial({...material});
      setCommentText('');
      toast.success('Comment added successfully!');
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, {sender: 'user', text: chatInput}]);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      // Simple pattern matching for demo purposes
      if (chatInput.toLowerCase().includes("formula") || chatInput.toLowerCase().includes("equation")) {
        response = material?.importantFormulas 
          ? `Here are some important formulas: ${material.importantFormulas.join(", ")}`
          : "I don't have specific formulas for this material.";
      } else if (chatInput.toLowerCase().includes("example") || chatInput.toLowerCase().includes("problem")) {
        response = "Let me show you an example problem. Consider a right triangle with sides of length 3 and 4. What is the length of the hypotenuse? Using the Pythagorean theorem (a² + b² = c²), we get c = √(3² + 4²) = √(9 + 16) = √25 = 5.";
      } else if (chatInput.toLowerCase().includes("explain")) {
        response = `The ${material?.subject} material covers ${material?.keyPoints?.join(", ")}. Would you like me to explain any specific concept in more detail?`;
      } else {
        response = "I'm here to help you understand the material better. You can ask me about specific concepts, formulas, or example problems related to this study material.";
      }
      
      setChatMessages(prev => [...prev, {sender: 'bot', text: response}]);
    }, 1000);
    
    setChatInput('');
  };

  const getIcon = (subject: string) => {
    switch (subject) {
      case "Mathematics":
        return <BookText className="h-5 w-5 text-edu-purple" />;
      case "Physics":
      case "Chemistry":
      case "Biology":
        return <BookOpen className="h-5 w-5 text-edu-blue" />;
      default:
        return <FileText className="h-5 w-5 text-edu-orange" />;
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 min-h-screen">
          <div className="animate-pulse space-y-6">
            <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-[600px] bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!material) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
          <div className="text-center">
            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Material Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The study material you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={handleBack}>Go Back</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const getSuggestedMaterials = () => {
    // In a real app, this would come from an API based on the current material
    return SUGGESTED_MATERIALS;
  };

  const getRelatedMaterials = () => {
    if (!material.relatedMaterials) return [];
    return MATERIALS_DATA.filter(m => material.relatedMaterials.includes(parseInt(m.id)));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6 min-h-screen animate-fade-in">
        {/* Breadcrumb and back button */}
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack} className="hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Study Materials
          </Button>
        </div>
        
        {/* Material Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{material.title}</h1>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-edu-purple border-edu-purple/20">
              {material.subject}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-edu-blue border-edu-blue/20">
              {material.grade}
            </Badge>
            <Badge variant="outline" className="bg-orange-50 dark:bg-orange-900/20 text-edu-orange border-edu-orange/20">
              {material.type}
            </Badge>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center hover:text-edu-purple cursor-pointer">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={material.author.avatar} alt={material.author.name} />
                      <AvatarFallback>{material.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{material.author.name}</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src={material.author.avatar} />
                      <AvatarFallback>{material.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{material.author.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {material.author.role}
                      </p>
                      <div className="flex items-center pt-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Added on {material.dateAdded}</span>
            </div>
            
            <div className="flex items-center">
              <Download className="h-4 w-4 mr-1" />
              <span>{material.downloads.toLocaleString()} downloads</span>
            </div>
            
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              <span>{material.fileSize}</span>
            </div>
          </div>
        </div>
        
        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs for different sections */}
            <Tabs defaultValue="content" className="mb-8" onValueChange={setActiveTab}>
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
                <TabsTrigger value="content" className="text-sm">Content</TabsTrigger>
                <TabsTrigger value="details" className="text-sm">Details</TabsTrigger>
                <TabsTrigger value="comments" className="text-sm">Comments ({material.comments.length})</TabsTrigger>
              </TabsList>
              
              {/* Content Tab */}
              <TabsContent value="content" className="pt-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <PdfViewer fileUrl={material.fileUrl} title={material.title} />
                </div>
              </TabsContent>
              
              {/* Details Tab */}
              <TabsContent value="details" className="pt-6">
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-4">Description</h3>
                    <p className="text-gray-700 dark:text-gray-300">{material.description}</p>
                  </div>
                  
                  {getRelatedMaterials().length > 0 && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                      <h3 className="text-lg font-bold mb-4">Related Materials</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {getRelatedMaterials().map((related: any) => (
                          <Link 
                            key={related.id} 
                            to={`/content/${related.id}`}
                            className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex-shrink-0 mr-3">
                              {related.type === 'Notes' ? (
                                <BookOpen className="h-6 w-6 text-edu-purple" />
                              ) : (
                                <FileText className="h-6 w-6 text-edu-blue" />
                              )}
                            </div>
                            <div>
                              <h4 className="text-sm font-medium hover:text-edu-purple">{related.title}</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{related.subject} • {related.grade}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Comments Tab */}
              <TabsContent value="comments" className="pt-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-bold mb-4">Discussion</h3>
                  
                  {/* Comment Form */}
                  <form onSubmit={handleSubmitComment} className="mb-8">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <textarea
                          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-edu-purple/50 dark:bg-gray-700 dark:text-white"
                          placeholder="Add a comment..."
                          rows={3}
                          value={commentText}
                          onChange={e => setCommentText(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end mt-2">
                          <Button type="submit" disabled={!commentText.trim()}>
                            Post Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                  
                  {/* Comments List */}
                  <div className="space-y-6">
                    {material.comments.length > 0 ? (
                      material.comments.map((comment: any) => (
                        <div key={comment.id} className="flex gap-4 pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0 animate-fade-in">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{comment.author}</h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h4 className="text-lg font-medium mb-2">No comments yet</h4>
                        <p className="text-gray-600 dark:text-gray-400">Be the first to share your thoughts on this material!</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Key Points & Important Formulas Section */}
            <div className="space-y-4">
              {/* Key Points */}
              <Collapsible open={isKeyPointsOpen} onOpenChange={setIsKeyPointsOpen} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-edu-purple" />
                      <h3 className="text-lg font-medium">Key Points</h3>
                    </div>
                    {isKeyPointsOpen ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border-t border-gray-100 dark:border-gray-700">
                  <ul className="space-y-2">
                    {material.keyPoints?.map((point: string, index: number) => (
                      <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                        <span className="inline-block h-2 w-2 rounded-full bg-edu-purple mt-2 mr-3"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
              
              {/* Important Formulas */}
              {material.importantFormulas && (
                <Collapsible open={isFormulasOpen} onOpenChange={setIsFormulasOpen} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <div className="flex items-center">
                        <Calculator className="h-5 w-5 mr-2 text-edu-blue" />
                        <h3 className="text-lg font-medium">Important Formulas</h3>
                      </div>
                      {isFormulasOpen ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="border-t border-gray-100 dark:border-gray-700">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-5 m-4 rounded-md space-y-3">
                      {material.importantFormulas?.map((formula: string, index: number) => (
                        <div key={index} className="text-gray-700 dark:text-gray-300 font-medium">
                          {formula}
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
            
            {/* Large Download Button */}
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleDownload} 
                size="lg"
                className="bg-gradient-to-r from-edu-purple to-edu-blue hover:from-edu-blue hover:to-edu-purple text-white w-full md:w-auto md:px-12 py-6 md:py-8 text-lg md:text-xl rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <Download className="h-6 w-6" />
                Download Now
              </Button>
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Actions Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Actions</h3>
              <div className="space-y-3">
                <Button onClick={handleDownload} className="w-full justify-start" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button onClick={handleShare} className="w-full justify-start" variant="outline">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button onClick={handleSave} className="w-full justify-start" variant="outline">
                  <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? 'fill-edu-purple text-edu-purple' : ''}`} />
                  {isSaved ? 'Saved' : 'Save for Later'}
                </Button>
                <Button onClick={handleLike} className="w-full justify-start" variant="outline">
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Information Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Format:</span>
                  <span className="font-medium">PDF Document</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Pages:</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Language:</span>
                  <span className="font-medium">English</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Publication:</span>
                  <span className="font-medium">2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">ISBN:</span>
                  <span className="font-medium">N/A</span>
                </div>
              </div>
            </div>
            
            {/* Suggested Materials */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Suggested Materials</h3>
              <div className="space-y-4">
                {getSuggestedMaterials().map((suggested) => (
                  <Link 
                    key={suggested.id} 
                    to={`/content/${suggested.id}`}
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex-shrink-0 mr-3">
                      {getIcon(suggested.subject)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium hover:text-edu-purple">{suggested.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {suggested.subject} • {suggested.type}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <Download className="h-3 w-3 mr-1" />
                        <span>{suggested.downloads.toLocaleString()} downloads</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Advertisements */}
            <div className="space-y-4">
              {ADS_DATA.map((ad) => (
                <a 
                  key={ad.id} 
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img src={ad.image} alt={ad.title} className="w-full h-40 object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-gray-800/70 text-white text-xs">
                        Ad
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium">{ad.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Sponsored • {ad.platform}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* AI Chat Bot - Fixed Position */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {isChatBotOpen ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full max-w-sm md:max-w-md animate-scale-in">
              <div className="bg-edu-purple text-white p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">AI Study Assistant</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsChatBotOpen(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="h-80 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'user' 
                          ? 'bg-edu-purple text-white rounded-tr-none' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              
              <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 flex">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask something about this material..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-edu-purple dark:bg-gray-800 dark:text-white"
                />
                <Button 
                  type="submit" 
                  disabled={!chatInput.trim()}
                  className="rounded-l-none bg-edu-purple hover:bg-edu-purple/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          ) : (
            <Button 
              onClick={() => setIsChatBotOpen(true)} 
              className="rounded-full h-14 w-14 shadow-lg bg-edu-purple hover:bg-edu-purple/90 text-white flex items-center justify-center"
              size="icon"
            >
              <Bot className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContentViewPage;

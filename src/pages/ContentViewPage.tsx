
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText, Clock, Download, Share, Heart, Bookmark, MessageSquare, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { toast } from 'sonner';
import PdfViewer from '@/components/PdfViewer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const ContentViewPage = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const [material, setMaterial] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [commentText, setCommentText] = useState('');

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
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
              
              <div className="space-y-6">
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
              </div>
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
      </div>
      <Footer />
    </>
  );
};

export default ContentViewPage;


import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Download, 
  Share, 
  MessageSquare, 
  ThumbsUp, 
  Calendar,
  Book,
  BookOpen,
  Award,
  Star,
  User,
  FileText,
  CheckCircle,
  // Replace Formula with another icon since it doesn't exist in lucide-react
  Functions, // Using Functions icon instead
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import PdfViewer from './PdfViewer';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { getSubjectIcon } from '@/utils/studyMaterialsUtils';
import { fetchStudyMaterials } from '@/utils/studyMaterialsDbUtils';
import { StudyMaterial } from '@/data/studyMaterialsData';
import { PastPaper } from '@/utils/pastPapersDbUtils';
import { useToast } from '@/hooks/use-toast';

interface ContentDetailViewProps {
  content: StudyMaterial | PastPaper;
  type: 'material' | 'paper';
}

const ContentDetailView = ({ content, type }: ContentDetailViewProps) => {
  const [activeTab, setActiveTab] = useState('pdf');
  const [relatedMaterials, setRelatedMaterials] = useState<StudyMaterial[]>([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('key-points');
  const { toast } = useToast();
  
  // Sample data for the view (in a real app, this would come from the backend)
  const keyPoints = [
    'Understanding basic algebraic expressions',
    'Solving quadratic equations using various methods',
    'Working with logarithms and exponential functions',
    'Analyzing functions and their properties',
    'Trigonometric functions and their applications'
  ];
  
  const importantFormulas = [
    { formula: '\\[ a^2 + b^2 = c^2 \\]', name: 'Pythagorean Theorem' },
    { formula: '\\[ E = mc^2 \\]', name: 'Einstein\'s Mass-Energy Equivalence' },
    { formula: '\\[ F = ma \\]', name: 'Newton\'s Second Law' },
    { formula: '\\[ PV = nRT \\]', name: 'Ideal Gas Law' }
  ];
  
  const chapters = [
    'Introduction to Linear Algebra',
    'Vector Spaces and Subspaces',
    'Orthogonality',
    'Determinants',
    'Eigenvalues and Eigenvectors',
    'Linear Transformations',
    'Complex Vectors and Matrices'
  ];

  useEffect(() => {
    const fetchRelatedContent = async () => {
      try {
        // Get the subject from the current content
        const subject = 'subject' in content ? content.subject : '';
        
        if (subject) {
          // Fetch materials with the same subject
          const materials = await fetchStudyMaterials();
          const filtered = materials.filter(m => 
            m.subject === subject && 
            m.id !== content.id
          ).slice(0, 3);
          
          setRelatedMaterials(filtered);
        }
      } catch (error) {
        console.error("Error fetching related content:", error);
      }
    };
    
    fetchRelatedContent();
  }, [content]);
  
  const handleDownload = () => {
    // In a real application, this would trigger a download
    toast({
      title: "Download Started",
      description: "Your download will begin shortly.",
    });
  };
  
  const handleShare = () => {
    // In a real application, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "The link has been copied to your clipboard.",
    });
  };
  
  const toggleExpand = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  // Extract needed properties depending on content type
  const title = content.title;
  const subject = 'subject' in content ? content.subject : '';
  const author = 'author' in content ? content.author : '';
  const description = 'description' in content ? content.description : '';
  const category = 'category' in content ? content.category : '';
  const date = 'date' in content ? content.date : ('created_at' in content ? content.created_at : new Date().toISOString());
  const rating = 'rating' in content ? content.rating : 4.5;
  const downloads = 'downloads' in content ? content.downloads : 0;
  const pdfUrl = 'download_url' in content ? content.download_url : ('file_url' in content ? content.file_url : '');
  
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content - 2/3 width on large screens */}
      <div className="lg:col-span-2 space-y-8">
        {/* Header Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {subject && (
              <Badge variant="outline" className="font-normal">
                {subject}
              </Badge>
            )}
            {category && (
              <Badge variant="outline" className="font-normal">
                {category}
              </Badge>
            )}
            <div className="flex items-center ml-auto text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-3">{title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{author || 'Unknown Author'}</span>
            </div>
            <div className="flex items-center">
              <Download className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{downloads} downloads</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">10 min read</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" onClick={handleShare} className="gap-2">
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        
        {/* Tabs Section with PDF Viewer and Details */}
        <Tabs defaultValue="pdf" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="pdf">PDF View</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pdf" className="border rounded-lg overflow-hidden">
            {pdfUrl ? (
              <div className="h-[70vh]">
                {/* Fix the prop name from url to fileUrl */}
                <PdfViewer fileUrl={pdfUrl} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[50vh] bg-gray-50 dark:bg-gray-800">
                <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">PDF preview not available</p>
                <Button onClick={handleDownload} className="mt-4 gap-2">
                  <Download className="h-4 w-4" />
                  Download to View
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="details">
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h2 className="text-xl font-bold mb-3">Description</h2>
                <div className="prose dark:prose-invert max-w-none">
                  {description && (
                    <>
                      <p>
                        {showFullDescription 
                          ? description 
                          : `${description.substring(0, 300)}${description.length > 300 ? '...' : ''}`
                        }
                      </p>
                      {description.length > 300 && (
                        <Button 
                          variant="link" 
                          className="p-0 h-auto" 
                          onClick={() => setShowFullDescription(!showFullDescription)}
                        >
                          {showFullDescription ? 'Show Less' : 'Read More'}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              {/* Key Points Section */}
              <Collapsible 
                open={expandedSection === 'key-points'} 
                onOpenChange={() => toggleExpand('key-points')}
                className="border rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-edu-purple" />
                    <h3 className="text-lg font-semibold">Key Points</h3>
                  </div>
                  {expandedSection === 'key-points' ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4">
                  <ul className="space-y-2 list-disc list-inside">
                    {keyPoints.map((point, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">
                        {point}
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
              
              {/* Important Formulas Section */}
              <Collapsible 
                open={expandedSection === 'formulas'} 
                onOpenChange={() => toggleExpand('formulas')}
                className="border rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center">
                    <Functions className="h-5 w-5 mr-2 text-edu-purple" />
                    <h3 className="text-lg font-semibold">Important Formulas</h3>
                  </div>
                  {expandedSection === 'formulas' ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4">
                  <div className="space-y-4">
                    {importantFormulas.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm font-medium mb-2">{item.name}</p>
                        <div 
                          className="flex justify-center"
                          dangerouslySetInnerHTML={{ __html: item.formula }}
                        />
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              {/* Chapters Section */}
              <Collapsible 
                open={expandedSection === 'chapters'} 
                onOpenChange={() => toggleExpand('chapters')}
                className="border rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-edu-purple" />
                    <h3 className="text-lg font-semibold">Chapters & Topics</h3>
                  </div>
                  {expandedSection === 'chapters' ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4">
                  <ol className="space-y-2 list-decimal list-inside">
                    {chapters.map((chapter, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">
                        {chapter}
                      </li>
                    ))}
                  </ol>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </TabsContent>
          
          <TabsContent value="related">
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-3">Related Materials</h2>
              {relatedMaterials.length > 0 ? (
                <div className="grid gap-4">
                  {relatedMaterials.map((material) => (
                    <Card key={material.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                            {getSubjectIcon(material.subject)}
                          </div>
                          <div className="p-4 flex-1">
                            <h3 className="font-semibold line-clamp-1">{material.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                              {material.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm">
                                <Download className="h-3 w-3 mr-1 text-gray-400" />
                                <span className="text-gray-500">{material.downloads || 0}</span>
                              </div>
                              <Button variant="link" size="sm" asChild className="p-0 h-auto">
                                <a href={`/content/${material.id}`}>View Material</a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No related materials found.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Sidebar - 1/3 width on large screens */}
      <div className="space-y-6">
        {/* Material Details Card */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-edu-purple" />
              Material Details
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Category</span>
                <span className="text-sm font-medium">{category || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Subject</span>
                <span className="text-sm font-medium">{subject || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Author</span>
                <span className="text-sm font-medium">{author || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Published</span>
                <span className="text-sm font-medium">{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Format</span>
                <span className="text-sm font-medium">PDF</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Size</span>
                <span className="text-sm font-medium">2.3 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Pages</span>
                <span className="text-sm font-medium">42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Downloads</span>
                <span className="text-sm font-medium">{downloads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Rating</span>
                <div className="flex items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star 
                        key={index} 
                        className={`h-4 w-4 ${
                          index < Math.floor(rating) 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : index < rating 
                            ? 'text-yellow-500 fill-yellow-500 opacity-50' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm ml-1">{rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Author Card */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-edu-purple" />
              About the Author
            </h2>
            
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <div>
                <h3 className="font-medium">{author || 'Unknown Author'}</h3>
                <p className="text-sm text-gray-500">Professor of {subject || 'Education'}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Expert in {subject || 'this field'} with over 10 years of teaching experience. Published numerous educational materials and research papers.
            </p>
            
            <Button variant="outline" className="w-full">View Profile</Button>
          </CardContent>
        </Card>
        
        {/* Help Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-edu-purple" />
              Need Help?
            </h2>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Having trouble with this material or have questions? Our support team is here to help.
            </p>
            
            <Button className="w-full">Contact Support</Button>
          </CardContent>
        </Card>
        
        {/* Sponsored Content */}
        <Card className="bg-gray-50 dark:bg-gray-800 border-dashed">
          <CardContent className="p-6">
            <div className="text-xs text-gray-500 mb-2">Sponsored</div>
            <h3 className="font-medium mb-2">Premium Learning Resources</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Unlock advanced study materials and personalized tutoring services.
            </p>
            <Button variant="outline" className="w-full">Learn More</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentDetailView;

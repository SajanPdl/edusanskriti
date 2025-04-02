
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, ThumbsUp, Share2, Bookmark, ChevronLeft, BookOpen } from 'lucide-react';
import Advertisement from '@/components/Advertisement';

const ContentViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(358);
  const [hasLiked, setHasLiked] = useState(false);
  
  // Mock data for the selected content
  // In a real app, you would fetch this based on the ID
  const content = {
    id: id || '1',
    title: "Grade 10 Science Notes (Complete Edition)",
    category: "high-school",
    subject: "physics",
    description: "Comprehensive science notes covering physics, chemistry and biology for grade 10 students. Includes diagrams, example problems, and practice questions for better understanding.",
    content: `
      <h2>Introduction to Grade 10 Science</h2>
      <p>This comprehensive guide covers the essential topics in Grade 10 Science, following the national curriculum standards.</p>
      <h3>What You'll Learn</h3>
      <ul>
        <li>Core principles of Physics, Chemistry, and Biology</li>
        <li>How to solve scientific problems step-by-step</li>
        <li>Preparation techniques for exams and assessments</li>
      </ul>
      <h2>Physics Section</h2>
      <p>The physics section covers mechanics, energy, electricity, and waves in detail with practical examples and problems.</p>
      <h2>Chemistry Section</h2>
      <p>The chemistry section explores atomic structure, periodic table, chemical bonding, and reactions with visual representations.</p>
      <h2>Biology Section</h2>
      <p>The biology section examines life processes, ecology, genetics, and human biology with detailed diagrams and classifications.</p>
    `,
    author: "Dr. Priya Sharma",
    downloadCount: 1250,
    viewCount: 4782,
    pageCount: 45,
    fileSize: "3.2 MB",
    fileType: "pdf",
    datePublished: "June 15, 2023",
    previewImages: [
      "https://placehold.co/800x500/f5f5f5/6A26A9?text=Science+Notes+Preview+1",
      "https://placehold.co/800x500/f5f5f5/6A26A9?text=Science+Notes+Preview+2",
      "https://placehold.co/800x500/f5f5f5/6A26A9?text=Science+Notes+Preview+3",
    ],
    relatedContent: [
      {
        id: "2",
        title: "Physics Formula Sheet",
        subject: "physics",
        downloads: 985,
        pages: 12,
        type: "pdf"
      },
      {
        id: "3",
        title: "Biology Diagrams Collection",
        subject: "biology",
        downloads: 756,
        pages: 20,
        type: "pdf"
      },
      {
        id: "4",
        title: "Chemistry Quick Reference",
        subject: "chemistry",
        downloads: 1120,
        pages: 15,
        type: "pdf"
      }
    ]
  };
  
  const handleLike = () => {
    if (hasLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setHasLiked(!hasLiked);
  };
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const handleShare = () => {
    // In a real app, implement sharing functionality
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link 
              to="/study-materials" 
              className="inline-flex items-center text-gray-600 hover:text-edu-purple transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Study Materials
            </Link>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="glass-card p-8 mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-edu-purple/10 text-edu-purple">
                    {content.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-edu-blue/10 text-edu-blue">
                    {content.category}
                  </Badge>
                  <Badge variant="outline" className="bg-edu-orange/10 text-edu-orange">
                    {content.fileType.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.description}
                </p>
                
                <div className="flex flex-wrap justify-between items-center mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-6">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {content.pageCount} pages
                    </span>
                    <span className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {content.downloadCount} downloads
                    </span>
                    <span>
                      {content.fileSize}
                    </span>
                  </div>
                  <div>
                    Published: {content.datePublished}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  <Button className="bg-edu-purple hover:bg-edu-indigo text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download {content.fileType.toUpperCase()}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className={hasLiked ? "text-edu-purple border-edu-purple" : ""}
                    onClick={handleLike}
                  >
                    <ThumbsUp className={`mr-2 h-4 w-4 ${hasLiked ? "fill-edu-purple" : ""}`} />
                    {likeCount}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className={isBookmarked ? "text-edu-orange border-edu-orange" : ""}
                    onClick={handleBookmark}
                  >
                    <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-edu-orange" : ""}`} />
                    {isBookmarked ? "Saved" : "Save"}
                  </Button>
                  
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="preview" className="mb-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="related">Related Materials</TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview" className="space-y-4">
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold mb-4">Document Preview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {content.previewImages.map((image, index) => (
                        <div key={index} className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                          <img 
                            src={image} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="prose dark:prose-invert max-w-none" 
                         dangerouslySetInnerHTML={{ __html: content.content }}>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-500 mb-4">This is just a preview. Download the full document to access all the content.</p>
                    <Button className="bg-edu-purple hover:bg-edu-indigo text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download Full Document
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="details">
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold mb-4">Document Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      <div>
                        <p className="text-gray-500 mb-1">Author</p>
                        <p className="font-medium">{content.author}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Subject</p>
                        <p className="font-medium capitalize">{content.subject}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Category</p>
                        <p className="font-medium capitalize">{content.category.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">File Format</p>
                        <p className="font-medium uppercase">{content.fileType}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Pages</p>
                        <p className="font-medium">{content.pageCount}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">File Size</p>
                        <p className="font-medium">{content.fileSize}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Published</p>
                        <p className="font-medium">{content.datePublished}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Downloads</p>
                        <p className="font-medium">{content.downloadCount}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="related">
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold mb-4">Related Study Materials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.relatedContent.map((item) => (
                        <Link to={`/content/${item.id}`} key={item.id}>
                          <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <h4 className="font-medium hover:text-edu-purple transition-colors">{item.title}</h4>
                              <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                                <span className="capitalize">{item.subject}</span>
                                <span>
                                  <Download className="h-3 w-3 inline mr-1" />
                                  {item.downloads}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Advertisement 
                network="google" 
                size="banner" 
                id="content-view-bottom-ad"
                className="mb-8"
              />
            </div>
            
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-6">
                <Card className="glass-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-edu-purple to-edu-blue p-4 text-white">
                      <h3 className="text-lg font-semibold">Download Options</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button variant="outline" className="w-full">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Preview Online
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Advertisement 
                  network="adsterra" 
                  size="sidebar" 
                  id="content-view-sidebar-ad"
                  className="mb-6"
                />
                
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">You May Also Like</h3>
                    <ul className="space-y-4">
                      <li>
                        <Link to="#" className="flex items-start hover:text-edu-purple transition-colors">
                          <BookOpen className="h-5 w-5 mt-0.5 mr-2 text-edu-purple" />
                          <div>
                            <h4 className="font-medium">Chemistry Quick Review Sheets</h4>
                            <p className="text-sm text-gray-500">2,380 downloads</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="flex items-start hover:text-edu-purple transition-colors">
                          <BookOpen className="h-5 w-5 mt-0.5 mr-2 text-edu-purple" />
                          <div>
                            <h4 className="font-medium">Biology Illustrated Guide</h4>
                            <p className="text-sm text-gray-500">1,925 downloads</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="flex items-start hover:text-edu-purple transition-colors">
                          <BookOpen className="h-5 w-5 mt-0.5 mr-2 text-edu-purple" />
                          <div>
                            <h4 className="font-medium">Science Exam Preparation Kit</h4>
                            <p className="text-sm text-gray-500">3,150 downloads</p>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Having issues with downloading or viewing this document? Our support team is ready to help.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/contact">Contact Support</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContentViewPage;

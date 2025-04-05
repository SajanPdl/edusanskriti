
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  BookOpen, 
  Download, 
  Save, 
  Share2, 
  ChevronRight,
  ChevronDown, 
  FileText,
  Check,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchStudyMaterialById } from '@/utils/studyMaterialsDbUtils';
import { StudyMaterial } from '@/data/studyMaterialsData';
import { getSubjectIcon } from '@/utils/studyMaterialsUtils';
import { toast } from 'sonner';
import PdfViewer from './PdfViewer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ContentDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const [material, setMaterial] = useState<StudyMaterial | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadStudyMaterial = async () => {
      if (id) {
        try {
          setLoading(true);
          const materialData = await fetchStudyMaterialById(Number(id));
          setMaterial(materialData);
        } catch (error) {
          console.error("Error loading study material:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadStudyMaterial();
  }, [id]);

  const handleDownload = () => {
    // In a real app, this would initiate a download from your storage
    toast("Download started", {
      description: `${material?.title} is being downloaded.`,
    });
    
    // Simulate download with timeout
    setTimeout(() => {
      toast("Download complete", {
        description: `${material?.title} has been downloaded successfully.`,
      });
    }, 2000);
  };

  const handleSave = () => {
    toast("Material saved", {
      description: "This study material has been saved to your library.",
    });
  };

  const handleShare = () => {
    // Copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied", {
      description: "The link has been copied to your clipboard.",
    });
  };

  const keyPoints = [
    "Complete explanation of algebraic expressions and equations",
    "Geometric proofs and constructions with step-by-step solutions",
    "Trigonometric functions and their applications",
    "Statistics and probability concepts with real-world examples",
    "Practice problems with solutions for exam preparation",
    "Tips and tricks for solving complex problems quickly",
    "Memory aids for important formulas and theorems"
  ];

  const importantFormulas = [
    "Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a",
    "Pythagorean Theorem: a² + b² = c²",
    "Area of a Circle: A = πr²",
    "Slope of a Line: m = (y₂ - y₁) / (x₂ - x₁)",
    "Distance Formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]",
    "Trigonometric Identities: sin²θ + cos²θ = 1"
  ];

  const chapters = [
    "Chapter 1: Foundations of Algebra",
    "Chapter 2: Linear Equations and Inequalities",
    "Chapter 3: Functions and Graphs",
    "Chapter 4: Quadratic Equations",
    "Chapter 5: Coordinate Geometry",
    "Chapter 6: Trigonometry",
    "Chapter 7: Statistics and Probability"
  ];

  const recommendedMaterials = [
    { title: "Physics Notes - Mechanics", subject: "Physics", size: "1.2 MB" },
    { title: "Chemistry Formulas Handbook", subject: "Chemistry", size: "2 MB" },
    { title: "English Grammar Guide", subject: "English", size: "4.1 MB" }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-edu-purple"></div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4 font-playfair">
          Study Material Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The study material you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  // Use material properties when available, otherwise use demo data
  const title = material.title || "Mathematics for Grade 10";
  const author = material.author || "Dr. Rajesh Sharma";
  const subject = material.subject || "Mathematics";
  const category = material.category || "High School";
  const fileSize = "4.3 MB";
  const pages = material.pages || 148;
  const language = "English";
  const format = "PDF";
  const views = material.downloads || 5620;
  const downloads = 2458;
  const rating = material.rating || 4.8;
  const date = material.date ? new Date(material.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "July 15, 2022";

  return (
    <div className="max-w-6xl mx-auto font-['Nunito_Sans',_sans-serif]">
      {/* Back Button - already in ContentViewPage */}
      
      {/* Material Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            {material.category}
          </Badge>
          <Badge variant="outline" className="text-gray-600 dark:text-gray-300">
            {material.subject}
          </Badge>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white font-playfair">
          {title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>{views.toLocaleString()} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>{downloads.toLocaleString()} downloads</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span>{rating}/5 ({399} ratings)</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={handleDownload} 
            className="bg-edu-purple hover:bg-edu-indigo flex gap-2 items-center"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSave}
            className="flex gap-2 items-center"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button 
            variant="outline" 
            onClick={handleShare}
            className="flex gap-2 items-center"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      
      {/* Material Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          {/* About This Study Material */}
          <div className="mb-8 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 font-playfair">
              About This Study Material
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {material.description || `These comprehensive mathematics notes are designed specifically for Grade 10 students following the CBSE curriculum, though they're equally valuable for students in other boards as the fundamental concepts remain the same. The material is structured to build a solid foundation in algebra, geometry, trigonometry, and statistics – all crucial areas for higher studies in mathematics and science. What makes these notes exceptional:
              
• Concept explanations using everyday examples that make abstract ideas concrete
• Step-by-step solutions that show the complete working process
• Highlighting of common mistakes and multiple options
• Detailed progression from basic to advanced problems
• Special focus on board examination patterns
              
These notes have been compiled by experienced educators with over 15 years of teaching experience and have helped thousands of students achieve excellent results in their examinations.`}
            </p>
          </div>
          
          {/* PDF Viewer */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 font-playfair">
              Preview Material
            </h2>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <PdfViewer 
                fileUrl="https://www.africau.edu/images/default/sample.pdf" 
                title={title}
                height={500}
              />
            </div>
            <div className="flex justify-center mt-6">
              <Button 
                onClick={handleDownload} 
                className="bg-edu-purple hover:bg-edu-indigo flex gap-2 items-center"
              >
                <Download className="h-4 w-4" />
                Download Full Material
              </Button>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-2">
              Downloaded {downloads.toLocaleString()} times by students
            </p>
          </div>
          
          {/* Key Points and Important Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Key Points Covered */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
              <h2 className="flex items-center text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 font-playfair">
                <span className="text-edu-purple mr-2">✦</span> Key Points Covered
              </h2>
              <ul className="space-y-3">
                {keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-edu-purple mr-2 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Important Formulas */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="formulas" className="border-none">
                  <AccordionTrigger className="py-0 hover:no-underline">
                    <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 font-playfair">
                      <span className="text-edu-purple mr-2">◆</span> Important Formulas
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 mt-3">
                      {importantFormulas.map((formula, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300 text-sm font-mono border-l-2 border-edu-purple pl-3 py-1">
                          {formula}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          {/* Chapters & Topics */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 mb-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="chapters" className="border-none">
                <AccordionTrigger className="py-0 hover:no-underline">
                  <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 font-playfair">
                    <span className="text-edu-purple mr-2">📑</span> Chapters & Topics
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 mt-3">
                    {chapters.map((chapter, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">
                        {chapter}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div>
          {/* Material Details Card */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">File Size</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{fileSize}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Pages</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{pages}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Language</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{language}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Format</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{format}</p>
              </div>
            </div>
          </div>
          
          {/* Recommended Materials */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Recommended Materials</h3>
            
            <div className="space-y-4">
              {recommendedMaterials.map((item, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{item.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{item.subject}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{item.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" className="w-full mt-3 text-edu-purple">
              Browse All Materials
            </Button>
          </div>
          
          {/* Sponsored Content */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 mb-6">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Sponsored</p>
            <div className="rounded bg-gray-100 dark:bg-gray-700 h-48 w-full flex items-center justify-center">
              <p className="text-gray-400 dark:text-gray-500">Advertisement</p>
            </div>
            <div className="mt-3">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Online Tutoring - First Session Free!</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Connect with top tutors for personalized help with this subject.</p>
              <Button variant="outline" className="w-full mt-3 text-edu-purple">Learn More</Button>
            </div>
          </div>
          
          {/* Created By */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Created by</h3>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-edu-purple rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{author}</h4>
                <Button variant="link" className="p-0 h-auto text-edu-purple">View all materials</Button>
              </div>
            </div>
          </div>
          
          {/* Need Help With This Topic? */}
          <div className="bg-edu-purple text-white rounded-lg p-5">
            <h3 className="font-semibold text-xl mb-3">Need Help With This Topic?</h3>
            <p className="text-sm text-purple-100 mb-4">Our AI tutoring assistant can answer your questions about this material.</p>
            <Button className="w-full bg-white text-edu-purple hover:bg-purple-100">Ask AI Tutor</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetailView;

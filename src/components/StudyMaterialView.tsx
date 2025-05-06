import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Download, 
  Calendar, 
  Award, 
  FileText, 
  Book, 
  Clock, 
  User, 
  Tag, 
  Info
} from 'lucide-react';
import { StudyMaterial, PastPaper } from '@/utils/queryUtils';

interface StudyMaterialViewProps {
  material: StudyMaterial;
  type?: 'study_material' | 'past_paper';
}

const StudyMaterialView = ({ material, type = 'study_material' }: StudyMaterialViewProps) => {
  const { toast } = useToast();
  
  if (!material) return null;
  
  const isPastPaper = type === 'past_paper';
  
  const handleDownload = () => {
    // Track download count in Supabase (would implement in production)
    toast({
      title: "Download Started",
      description: `${material.title} is being downloaded.`,
    });
    
    // Open the file URL in a new tab
    if (material.download_url) {
      window.open(material.download_url, '_blank');
    } else {
      // Fallback for demo
      window.open("https://www.africau.edu/images/default/sample.pdf", '_blank');
    }
  };
  
  const handleSolutionDownload = () => {
    toast({
      title: "Solution Download Started",
      description: `Solution for ${material.title} is being downloaded.`,
    });
    
    // In real app, this would be a separate URL
    window.open("https://www.africau.edu/images/default/sample.pdf", '_blank');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{material.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {isPastPaper ? (
            <>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-purple/10 text-edu-purple">
                <Award className="h-4 w-4 mr-2" />
                {material.difficulty || 'Medium'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-blue/10 text-edu-blue">
                <Calendar className="h-4 w-4 mr-2" />
                {(material as PastPaper).year || new Date().getFullYear()}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-green/10 text-edu-green">
                <FileText className="h-4 w-4 mr-2" />
                {material.subject || 'General'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-orange/10 text-edu-orange">
                <Info className="h-4 w-4 mr-2" />
                {material.grade || 'All Grades'}
              </span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-purple/10 text-edu-purple">
                <Book className="h-4 w-4 mr-2" />
                {material.category || 'Study Material'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-blue/10 text-edu-blue">
                <FileText className="h-4 w-4 mr-2" />
                {material.subject || 'General'}
              </span>
              {material.level || material.grade ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-green/10 text-edu-green">
                  <Info className="h-4 w-4 mr-2" />
                  {material.level || material.grade || 'All Levels'}
                </span>
              ) : null}
              {material.author ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-orange/10 text-edu-orange">
                  <User className="h-4 w-4 mr-2" />
                  {material.author}
                </span>
              ) : null}
              {material.read_time ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  <Clock className="h-4 w-4 mr-2" />
                  {material.read_time}
                </span>
              ) : null}
            </>
          )}
        </div>
      </div>
      
      <Card className="p-6 mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Document Information</h3>
            <div className="flex flex-col space-y-1 text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                <span>{material.downloads || 0} downloads</span>
              </div>
              {isPastPaper ? (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Duration: {(material as PastPaper).duration || 'Not specified'}</span>
                </div>
              ) : (
                <>
                  {material.pages && (
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>{material.pages} pages</span>
                    </div>
                  )}
                  {material.rating && (
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      <span>Rating: {material.rating}/5</span>
                    </div>
                  )}
                </>
              )}
              {material.date && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Published: {new Date(material.date).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={handleDownload}
              className="flex items-center justify-center px-4 py-2 bg-edu-purple text-white rounded-lg hover:bg-edu-indigo transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Download {isPastPaper ? 'Paper' : 'Material'}
            </Button>
            
            {isPastPaper && (
              <Button 
                onClick={handleSolutionDownload}
                className="flex items-center justify-center px-4 py-2 bg-edu-orange text-white rounded-lg hover:bg-edu-gold transition-colors"
              >
                <FileText className="h-4 w-4 mr-2" />
                Download Solution
              </Button>
            )}
          </div>
        </div>
        
        {material.description && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <div className="prose dark:prose-invert max-w-none">
              <p>{material.description}</p>
            </div>
          </div>
        )}
        
        {material.content && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Content</h3>
            <div className="prose dark:prose-invert max-w-none">
              <p>{material.content}</p>
            </div>
          </div>
        )}
        
        {material.tags && material.tags.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {material.tags.map((tag: string, index: number) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>
      
      {/* Add PDF preview component here if relevant */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            PDF preview would be displayed here in the full version.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialView;

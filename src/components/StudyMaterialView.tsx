
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

interface StudyMaterialViewProps {
  data: any;
  type: 'study_material' | 'past_paper';
  title: string;
}

const StudyMaterialView = ({ data, type, title }: StudyMaterialViewProps) => {
  const { toast } = useToast();
  
  if (!data) return null;
  
  const isPastPaper = type === 'past_paper';
  
  const handleDownload = () => {
    // Track download count in Supabase (would implement in production)
    toast({
      title: "Download Started",
      description: `${data.title} is being downloaded.`,
    });
    
    // Open the file URL in a new tab
    if (data.file_url || data.download_url) {
      window.open(data.file_url || data.download_url, '_blank');
    } else {
      // Fallback for demo
      window.open("https://www.africau.edu/images/default/sample.pdf", '_blank');
    }
  };
  
  const handleSolutionDownload = () => {
    toast({
      title: "Solution Download Started",
      description: `Solution for ${data.title} is being downloaded.`,
    });
    
    // In real app, this would be a separate URL
    window.open("https://www.africau.edu/images/default/sample.pdf", '_blank');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{data.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {isPastPaper ? (
            <>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-purple/10 text-edu-purple">
                <Award className="h-4 w-4 mr-2" />
                {data.difficulty || 'Medium'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-blue/10 text-edu-blue">
                <Calendar className="h-4 w-4 mr-2" />
                {data.year || new Date().getFullYear()}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-green/10 text-edu-green">
                <FileText className="h-4 w-4 mr-2" />
                {data.subject || 'General'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-orange/10 text-edu-orange">
                <Info className="h-4 w-4 mr-2" />
                {data.grade || 'All Grades'}
              </span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-purple/10 text-edu-purple">
                <Book className="h-4 w-4 mr-2" />
                {data.category || 'Study Material'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-blue/10 text-edu-blue">
                <FileText className="h-4 w-4 mr-2" />
                {data.subject || 'General'}
              </span>
              {data.level || data.grade ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-green/10 text-edu-green">
                  <Info className="h-4 w-4 mr-2" />
                  {data.level || data.grade || 'All Levels'}
                </span>
              ) : null}
              {data.author ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-edu-orange/10 text-edu-orange">
                  <User className="h-4 w-4 mr-2" />
                  {data.author}
                </span>
              ) : null}
              {data.read_time ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  <Clock className="h-4 w-4 mr-2" />
                  {data.read_time}
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
                <span>{data.downloads || 0} downloads</span>
              </div>
              {isPastPaper ? (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Duration: {data.duration || 'Not specified'}</span>
                </div>
              ) : (
                <>
                  {data.pages && (
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>{data.pages} pages</span>
                    </div>
                  )}
                  {data.rating && (
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      <span>Rating: {data.rating}/5</span>
                    </div>
                  )}
                </>
              )}
              {data.date && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Published: {new Date(data.date).toLocaleDateString()}</span>
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
            
            {isPastPaper && data.hasSolution && (
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
        
        {data.description && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <div className="prose dark:prose-invert max-w-none">
              <p>{data.description}</p>
            </div>
          </div>
        )}
        
        {data.content && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Content</h3>
            <div className="prose dark:prose-invert max-w-none">
              <p>{data.content}</p>
            </div>
          </div>
        )}
        
        {data.tags && data.tags.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag: string, index: number) => (
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

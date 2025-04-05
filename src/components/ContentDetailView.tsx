import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  ChevronDown,
  ChevronUp,
  Share,
  Check,
  MessageSquare,
  Webhook,
  PenSquare
} from 'lucide-react';
import PdfViewer from './PdfViewer';
import { useToast } from "@/hooks/use-toast";

interface ContentDetailViewProps {
  content: any;
  type: 'material' | 'paper';
}

const ContentDetailView: React.FC<ContentDetailViewProps> = ({ content, type }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const { toast } = useToast();

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const toggleComments = () => {
    setIsCommentsExpanded(!isCommentsExpanded);
  };

  const handleDownload = (isSolution: boolean = false) => {
    toast({
      title: `Download Started`,
      description: `${isSolution ? 'Solution for ' : ''}${content.title} is being downloaded.`,
    });
    
    // Simulating download with example URL
    window.open("https://example.com/sample.pdf", '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: content.title,
        text: content.description,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      alert("Web Share API not supported, please manually copy the link.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 bg-gray-200 dark:bg-gray-700">
          <PdfViewer pdfUrl={content.fileUrl && typeof content.fileUrl === 'string' ? content.fileUrl : "/sample.pdf"} />
        </div>
        <div className="p-8 md:w-1/2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-edu-purple/10 text-edu-purple mb-3">
                {content.category || content.grade}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-edu-blue/10 text-edu-blue mb-3 ml-2">
                {content.subject}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{content.fileSize}</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{content.title}</h2>

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{content.year}</span>
            <span className="mx-2">•</span>
            <User className="h-4 w-4 mr-1" />
            <span>{content.author || 'Admin'}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{content.duration || '30 min'}</span>
            <span className="mx-2">•</span>
            <Share2 className="h-4 w-4 mr-1" />
            <button onClick={handleShare} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              Share
            </button>
          </div>

          <div className="mb-6">
            <div className="text-gray-600 dark:text-gray-300" style={{ maxHeight: isDescriptionExpanded ? 'none' : '100px', overflow: 'hidden', position: 'relative' }}>
              {content.description}
              {!isDescriptionExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white dark:from-gray-800"></div>
              )}
            </div>
            <button onClick={toggleDescription} className="text-edu-purple hover:text-edu-indigo focus:outline-none">
              {isDescriptionExpanded ? (
                <>
                  Show Less <ChevronUp className="inline-block w-4 h-4 ml-1 align-top" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="inline-block w-4 h-4 ml-1 align-top" />
                </>
              )}
            </button>
          </div>

          <div className="flex space-x-2 mb-6">
            <button 
              className="flex items-center justify-center px-4 py-2 bg-edu-purple text-white rounded-lg hover:bg-edu-indigo transition-colors"
              onClick={() => handleDownload()}
            >
              <FileText className="h-4 w-4 mr-2" />
              Download {type === 'material' ? 'Material' : 'Paper'}
            </button>
            {content.hasSolution && (
              <button 
                className="flex items-center justify-center px-4 py-2 bg-edu-orange text-white rounded-lg hover:bg-edu-gold transition-colors"
                onClick={() => handleDownload(true)}
              >
                <Download className="h-4 w-4 mr-2" />
                Solution
              </button>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Comments <MessageSquare className="inline-block w-5 h-5 ml-1 align-text-top" />
            </h3>
            <div style={{ maxHeight: isCommentsExpanded ? 'none' : '200px', overflow: 'hidden', position: 'relative' }} className="mb-4">
              <div className="text-gray-500 dark:text-gray-400">
                This section is for user comments and discussions related to the content. Share your thoughts, ask questions, or provide helpful insights.
                <ul className="mt-2">
                  <li className="mb-2">
                    <div className="flex items-center">
                      <img src="/user-avatar.svg" alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                      <div className="text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-200">Sarah L.</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">3 days ago</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-1 ml-10">
                      Great explanation of the topic! Really helped me understand the concepts better.
                    </p>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-center">
                      <img src="/user-avatar.svg" alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                      <div className="text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-200">John D.</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">1 week ago</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-1 ml-10">
                      Could you provide more examples for practical applications?
                    </p>
                  </li>
                </ul>
              </div>
              {!isCommentsExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white dark:from-gray-800"></div>
              )}
            </div>
            <button onClick={toggleComments} className="text-edu-purple hover:text-edu-indigo focus:outline-none">
              {isCommentsExpanded ? (
                <>
                  Show Less <ChevronUp className="inline-block w-4 h-4 ml-1 align-top" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="inline-block w-4 h-4 ml-1 align-top" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetailView;

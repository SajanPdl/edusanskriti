
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, Star, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from "@/hooks/use-toast";
import { StudyMaterial } from '@/data/studyMaterialsData';
import { getSubjectIcon } from '@/utils/studyMaterialsUtils';

interface MaterialCardProps {
  material: StudyMaterial;
  hoveredId: number | null;
  expandedCardId: number | null;
  onHover: (id: number | null) => void;
  onExpandToggle: (id: number) => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ 
  material, 
  hoveredId, 
  expandedCardId,
  onHover,
  onExpandToggle
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

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
  
  return (
    <div className="relative">
      <Card 
        className={`interactive-card h-full overflow-hidden transition-all ${hoveredId === material.id ? 'shadow-neon' : 'shadow-md'} cursor-pointer`}
        onMouseEnter={() => onHover(material.id)}
        onMouseLeave={() => onHover(null)}
        onClick={() => handleCardClick(material.id)}
      >
        <div className="block h-full">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between mb-4">
              {getSubjectIcon(material.subject)}
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
          onOpenChange={() => onExpandToggle(material.id)}
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
  );
};

export default MaterialCard;

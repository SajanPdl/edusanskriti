
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { StudyMaterial } from '@/data/studyMaterialsData';
import { getSubjectIcon } from '@/utils/studyMaterialsUtils';
import { Badge } from '@/components/ui/badge';

interface MaterialCardProps {
  material: StudyMaterial;
  hoveredId: number | null;
  expandedCardId: number | null;
  onHover: (id: number | null) => void;
  onExpandToggle: (id: number) => void;
}

const MaterialCard = ({
  material,
  hoveredId,
  expandedCardId,
  onHover,
  onExpandToggle,
}: MaterialCardProps) => {
  const navigate = useNavigate();
  const isHovered = hoveredId === material.id;
  const isExpanded = expandedCardId === material.id;

  const handleCardClick = (e: React.MouseEvent) => {
    // Navigate to the content view page
    navigate(`/content/${material.id}`);
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation
    onExpandToggle(material.id);
  };

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 h-full cursor-pointer ${
        isHovered ? 'shadow-neon' : 'hover:shadow-md'
      }`}
      onMouseEnter={() => onHover(material.id)}
      onMouseLeave={() => onHover(null)}
      onClick={handleCardClick}
    >
      <div className="flex flex-col h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg mb-2">
              {getSubjectIcon(material.subject)}
            </div>
            <Badge variant="outline">{material.grade} Grade</Badge>
          </div>
          <CardTitle className="text-xl hover:text-primary transition-colors">
            {material.title}
          </CardTitle>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            <Badge className="mr-2 bg-edu-purple/20 text-edu-purple">
              {material.category}
            </Badge>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{material.updatedAt}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-0">
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
            {material.description}
          </p>
        </CardContent>

        <CardFooter className="mt-auto pt-4">
          <div className="w-full">
            <button
              className="flex items-center justify-between w-full text-sm text-gray-600 dark:text-gray-400 hover:text-edu-purple transition-colors"
              onClick={handleExpandClick}
            >
              <span>
                {isExpanded ? 'Show less' : 'Show more'}
              </span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-2 text-sm">Topics covered:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc pl-5 mb-4">
                  {material.topics?.slice(0, 3).map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                  {material.topics && material.topics.length > 3 && (
                    <li>And more...</li>
                  )}
                </ul>
                <div 
                  className="flex items-center text-edu-purple hover:text-edu-indigo font-medium transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/content/${material.id}`);
                  }}
                >
                  View Material
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default MaterialCard;

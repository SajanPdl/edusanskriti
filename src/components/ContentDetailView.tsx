
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Calendar, BookOpen, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchStudyMaterialById } from '@/utils/studyMaterialsDbUtils';
import { StudyMaterial } from '@/data/studyMaterialsData';
import { getSubjectIcon } from '@/utils/studyMaterialsUtils';
import { toast } from 'sonner';

const ContentDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const [material, setMaterial] = useState<StudyMaterial | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-start gap-6 mb-10">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          {getSubjectIcon(material.subject)}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Badge>{material.category}</Badge>
            <Badge variant="outline">{material.subject}</Badge>
            <Badge variant="secondary">{material.grade}</Badge>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white font-playfair">
            {material.title}
          </h1>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Updated: {new Date(material.updated_at || material.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{material.read_time}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{material.pages} pages</span>
            </div>
          </div>
          
          <Button 
            onClick={handleDownload} 
            className="bg-edu-purple hover:bg-edu-indigo"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Material
          </Button>
        </div>
      </div>
      
      <div className="mb-8 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 font-playfair">
          Description
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {material.description}
        </p>
      </div>
      
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h2 className="font-playfair">Content Overview</h2>
        <ul>
          {material.topics && material.topics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
        
        <h2 className="font-playfair">Learning Objectives</h2>
        <p>After studying this material, students will be able to:</p>
        <ul>
          <li>Understand key concepts in {material.subject}</li>
          <li>Apply learned principles to solve problems</li>
          <li>Analyze and evaluate related topics in {material.subject}</li>
        </ul>
      </div>
    </div>
  );
};

export default ContentDetailView;

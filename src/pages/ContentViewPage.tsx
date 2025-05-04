
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentDetailView from '@/components/ContentDetailView';
import { fetchStudyMaterialById, fetchPastPaperById } from '@/utils/queryUtils';
import { Tables } from '@/integrations/supabase/types';

// Define the content types
type ContentType = Tables<'study_materials'> | Tables<'past_papers'>;

const ContentViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ContentType | null>(null);
  const [contentType, setContentType] = useState<'study-material' | 'past-paper'>('study-material');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        if (!id) {
          throw new Error('Content ID is required');
        }
        
        // Try to fetch as study material first
        try {
          const data = await fetchStudyMaterialById(id);
          setContent(data);
          setContentType('study-material');
          setError(null);
        } catch (studyMaterialError) {
          // If not found as study material, try as past paper
          try {
            const data = await fetchPastPaperById(id);
            setContent(data);
            setContentType('past-paper');
            setError(null);
          } catch (pastPaperError) {
            throw new Error('Content not found');
          }
        }
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content. Please try again later.');
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {loading ? (
          <div className="container mx-auto px-4 py-10 text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-600">Loading content...</p>
          </div>
        ) : error ? (
          <div className="container mx-auto px-4 py-10 text-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              <p>{error}</p>
            </div>
          </div>
        ) : content ? (
          <ContentDetailView 
            content={content} 
            contentType={contentType}
          />
        ) : (
          <div className="container mx-auto px-4 py-10 text-center">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
              <p>Content not found.</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ContentViewPage;

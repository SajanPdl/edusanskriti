
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentDetailView from '@/components/ContentDetailView';
import BlogPostView from '@/components/BlogPostView';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const ContentViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [contentTitle, setContentTitle] = useState('');
  
  // Determine content type based on URL
  const isBlogPost = location.pathname.includes('/blog/');
  const isPastPaper = location.pathname.includes('type=paper') || new URLSearchParams(location.search).get('type') === 'paper';
  const isStudyMaterial = !isBlogPost && !isPastPaper;
  
  // Fetch the appropriate content based on ID and type
  const { data, isLoading, error } = useQuery({
    queryKey: [isPastPaper ? 'past_paper' : isStudyMaterial ? 'study_material' : 'blog_post', id],
    queryFn: async () => {
      if (isPastPaper) {
        const { data, error } = await supabase
          .from('past_papers')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setContentTitle(data.title);
        return data;
      } else if (isStudyMaterial) {
        const { data, error } = await supabase
          .from('study_materials')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setContentTitle(data.title);
        return data;
      }
      
      // Default case is blog post or other content from static data
      return null;
    },
    enabled: !!id && (isPastPaper || isStudyMaterial),
  });

  useEffect(() => {
    // If it's a blog post and we don't have a content query running,
    // verify the content exists in static data or redirect
    if (isBlogPost || (!isPastPaper && !isStudyMaterial)) {
      // For blog posts, we'll rely on the BlogPostView component to handle its own data
    }
  }, [id, isBlogPost, isPastPaper, isStudyMaterial, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="flex items-center text-gray-600 hover:text-edu-purple">
            <Link to={isBlogPost ? "/blog" : isPastPaper ? "/past-papers" : "/study-materials"}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {isBlogPost ? "Blog" : isPastPaper ? "Past Papers" : "Study Materials"}
            </Link>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-edu-purple"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Content Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The content you're looking for doesn't exist or has been removed.</p>
            <Button variant="default" onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        ) : (
          <>
            {isBlogPost ? (
              <BlogPostView />
            ) : isPastPaper ? (
              <StudyMaterialView data={data} type="past_paper" title={contentTitle} />
            ) : (
              <StudyMaterialView data={data} type="study_material" title={contentTitle} />
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ContentViewPage;

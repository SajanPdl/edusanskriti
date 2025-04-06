
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentDetailView from '@/components/ContentDetailView';
import BlogPostView from '@/components/BlogPostView';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { studyMaterialsData } from '@/data/studyMaterialsData';

const ContentViewPage = () => {
  const { id, type } = useParams<{ id: string, type?: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Determine if this is a blog post or study material
  const isBlogPost = type === 'blog' || window.location.pathname.includes('/blog/');
  
  useEffect(() => {
    // Verify that the content exists
    if (id && !isBlogPost) {
      const contentExists = studyMaterialsData.some(material => material.id === Number(id));
      if (!contentExists) {
        navigate('/not-found');
      }
    }
    
    // Simulate loading content
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id, isBlogPost, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="flex items-center text-gray-600 hover:text-edu-purple">
            <Link to={isBlogPost ? "/blog" : "/study-materials"}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {isBlogPost ? "Blog" : "Study Materials"}
            </Link>
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-edu-purple"></div>
          </div>
        ) : (
          <>
            {isBlogPost ? (
              <BlogPostView />
            ) : (
              <ContentDetailView />
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ContentViewPage;

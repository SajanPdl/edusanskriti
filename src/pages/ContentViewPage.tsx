
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentDetailView from '@/components/ContentDetailView';
import BlogPostView from '@/components/BlogPostView';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchStudyMaterialById } from '@/utils/studyMaterialsDbUtils';
import { fetchPastPaperById } from '@/utils/pastPapersDbUtils';
import { fetchBlogPostById } from '@/utils/blogUtils';
import { useToast } from '@/hooks/use-toast';

const ContentViewPage = () => {
  const { id, type } = useParams<{ id: string, type?: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contentType, setContentType] = useState<'blog' | 'material' | 'paper' | null>(null);
  const [content, setContent] = useState<any>(null);
  const { toast } = useToast();
  
  // Determine if this is a blog post, study material, or past paper
  const isBlogPost = type === 'blog' || window.location.pathname.includes('/blog/');
  const isPastPaper = type === 'paper' || window.location.pathname.includes('/past-papers/');
  
  useEffect(() => {
    // Fetch the appropriate content
    const fetchContent = async () => {
      if (!id) {
        navigate('/not-found');
        return;
      }
      
      try {
        setLoading(true);
        
        if (isBlogPost) {
          const blogPost = await fetchBlogPostById(Number(id));
          if (blogPost) {
            setContent(blogPost);
            setContentType('blog');
          } else {
            navigate('/not-found');
          }
        } else if (isPastPaper) {
          const pastPaper = await fetchPastPaperById(Number(id));
          if (pastPaper) {
            setContent(pastPaper);
            setContentType('paper');
          } else {
            navigate('/not-found');
          }
        } else {
          const material = await fetchStudyMaterialById(Number(id));
          if (material) {
            setContent(material);
            setContentType('material');
          } else {
            navigate('/not-found');
          }
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        toast({
          title: "Error",
          description: "Failed to load content. Please try again later.",
          variant: "destructive"
        });
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [id, isBlogPost, isPastPaper, navigate, toast]);

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
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-edu-purple"></div>
          </div>
        ) : (
          <>
            {contentType === 'blog' && <BlogPostView post={content} />}
            {(contentType === 'material' || contentType === 'paper') && (
              <ContentDetailView content={content} type={contentType} />
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ContentViewPage;

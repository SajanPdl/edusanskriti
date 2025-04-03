
import React from 'react';
import { useParams } from 'react-router-dom';
import ContentDetailView from '@/components/ContentDetailView';
import BlogPostView from '@/components/BlogPostView';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ContentViewPage = () => {
  const { id, type } = useParams<{ id: string, type?: string }>();

  // Determine if this is a blog post or study material
  const isBlogPost = type === 'blog' || window.location.pathname.includes('/blog/');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isBlogPost ? (
        <BlogPostView />
      ) : (
        <ContentDetailView />
      )}
    </div>
  );
};

export default ContentViewPage;

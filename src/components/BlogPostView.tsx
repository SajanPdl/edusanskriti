
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, User, Tag, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { fetchBlogPostById, BlogPost } from '@/utils/blogUtils';

const BlogPostView = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPost = async () => {
      if (id) {
        try {
          const postData = await fetchBlogPostById(Number(id));
          setPost(postData);
        } catch (error) {
          console.error("Error loading blog post:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadBlogPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-edu-purple"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
          Blog Post Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center mb-4 gap-3 flex-wrap">
          <Badge className="bg-edu-purple/20 text-edu-purple hover:bg-edu-purple/30">
            {post.category}
          </Badge>
          {post.tags && post.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-gray-100 dark:bg-gray-800">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          {post.title}
        </h1>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
      
      {post.image && (
        <div className="rounded-lg overflow-hidden mb-10 bg-gray-100 dark:bg-gray-800">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-auto object-cover max-h-[500px]" 
          />
        </div>
      )}
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {post.content.split('\n').map((paragraph, index) => (
          paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
        ))}
      </div>
    </article>
  );
};

export default BlogPostView;

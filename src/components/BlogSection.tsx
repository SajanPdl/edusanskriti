
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ChevronRight, Eye } from 'lucide-react';
import CounterAnimation from './CounterAnimation';
import Advertisement from './Advertisement';

const BlogSection = () => {
  const blogs = [
    {
      title: "10 Effective Study Techniques for Exam Success",
      excerpt: "Learn proven strategies to maximize your study sessions and retain information more effectively.",
      author: "Dr. Ananya Sharma",
      date: "June 15, 2023",
      views: 5280,
      image: "https://source.unsplash.com/random/600x400/?study"
    },
    {
      title: "How to Prepare for Engineering Entrance Exams",
      excerpt: "A comprehensive guide to tackling the most challenging engineering entrance examinations.",
      author: "Prof. Rajesh Kumar",
      date: "May 22, 2023",
      views: 3750,
      image: "https://source.unsplash.com/random/600x400/?engineering"
    },
    {
      title: "Digital Learning Tools Every Student Should Know",
      excerpt: "Discover the latest digital tools and applications that can revolutionize your learning experience.",
      author: "Priya Mishra",
      date: "July 3, 2023",
      views: 4120,
      image: "https://source.unsplash.com/random/600x400/?digital"
    }
  ];

  return (
    <section id="blog" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Educational Blog</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore articles, tips and guidance to enhance your academic journey and career prospects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog, index) => (
            <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="h-48 overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 hover:text-edu-purple transition-colors">
                  <Link to="/blog">{blog.title}</Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{blog.author}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="h-4 w-4 mr-1" />
                    <CounterAnimation 
                      end={blog.views} 
                      duration={1500}
                      className="text-sm"
                    /> <span className="ml-1">views</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-edu-purple hover:text-edu-indigo" asChild>
                    <Link to="/blog">View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Advertisement 
          network="google" 
          size="large-rectangle" 
          id="blog-ad"
          className="mb-12"
        />
        
        <div className="text-center">
          <Button asChild className="bg-edu-purple hover:bg-edu-indigo text-white px-6 py-3 rounded-full inline-flex items-center group">
            <Link to="/blog">
              Read More Articles
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

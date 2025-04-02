
import { Calendar, User, ArrowRight } from 'lucide-react';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "10 Effective Study Techniques for Better Retention",
    excerpt: "Discover scientifically-proven study methods that can help you remember information longer and perform better in exams.",
    author: "Dr. Ananya Sharma",
    date: "May 15, 2023",
    category: "Study Tips",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "How to Prepare for Competitive Exams While in School",
    excerpt: "Balance your school studies with competitive exam preparation using these time-management and productivity strategies.",
    author: "Rajat Verma",
    date: "Jun 2, 2023",
    category: "Exam Preparation",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Choosing Your College Major",
    excerpt: "Confused about which subject to pursue in college? This comprehensive guide will help you make an informed decision.",
    author: "Priya Malhotra",
    date: "Apr 12, 2023",
    category: "Career Guidance",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Digital Tools Every Student Should Use in 2023",
    excerpt: "Enhance your productivity and learning with these cutting-edge digital tools and applications designed for students.",
    author: "Vikram Aditya",
    date: "Jul 8, 2023",
    category: "Technology",
    image: "/placeholder.svg",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Educational Articles & Tips</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest educational insights, study techniques, and career guidance through our informative articles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogPosts.map(post => (
            <article key={post.id} className="glass-card overflow-hidden group hover:shadow-neon transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-edu-purple/90 text-white text-xs font-medium px-2.5 py-1 rounded">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-edu-purple transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <a href="#" className="inline-flex items-center text-edu-purple hover:text-edu-indigo font-medium transition-colors duration-300">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="btn-primary">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

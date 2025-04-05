import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { Calendar, User, Tag, ArrowRight, Clock } from 'lucide-react';
import { fetchBlogPosts, BlogPost } from '@/utils/blogUtils';

const BlogPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const allPosts = await fetchBlogPosts();
        setPosts(allPosts);
        
        // Extract unique categories
        const uniqueCategories = ['All Categories', ...new Set(allPosts.map(post => post.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading blog posts:", error);
        setLoading(false);
      }
    };
    
    loadBlogPosts();
  }, []);

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  const filterPosts = () => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory === 'All Categories' ? true : post.category === selectedCategory;
      const matchesSearch = searchQuery 
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return matchesCategory && matchesSearch;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = filterPosts();
    console.info('Search query:', searchQuery);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handlePostClick = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  const filteredPosts = filterPosts();
  const filteredFeaturedPost = filteredPosts.find(post => post.featured);
  const filteredRegularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-edu-lightgray to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 gradient-text">Educational Blog</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Explore insightful articles on exam preparation, study techniques, career guidance, and educational trends to help you excel in your academic journey.
          </p>
          
          <form onSubmit={handleSearch} className="mb-10">
            <SearchBar 
              placeholder="Search articles..." 
              className="max-w-3xl mx-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-edu-purple text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-edu-purple"></div>
            </div>
          ) : (
            <>
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No posts found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try changing your search criteria or checking back later for new content.
                  </p>
                </div>
              ) : (
                <>
                  {filteredFeaturedPost && (
                    <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={() => handlePostClick(filteredFeaturedPost.id)}>
                      <div className="md:flex">
                        <div className="md:w-1/2 bg-gray-200 dark:bg-gray-700">
                          <img 
                            src={filteredFeaturedPost.image || "/placeholder.svg"} 
                            alt={filteredFeaturedPost.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="p-8 md:w-1/2">
                          <div className="flex items-center mb-4">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-edu-purple/10 text-edu-purple">
                              Featured
                            </span>
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-edu-blue/10 text-edu-blue ml-2">
                              {filteredFeaturedPost.category}
                            </span>
                          </div>
                          
                          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                            {filteredFeaturedPost.title}
                          </h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {filteredFeaturedPost.excerpt}
                          </p>
                          
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                            <User className="h-4 w-4 mr-1" />
                            <span>{filteredFeaturedPost.author}</span>
                            <span className="mx-2">•</span>
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{filteredFeaturedPost.date}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{filteredFeaturedPost.readTime}</span>
                          </div>
                          
                          <button className="flex items-center text-edu-purple hover:text-edu-indigo transition-colors">
                            Read Article
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRegularPosts.map(post => (
                      <div 
                        key={post.id} 
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        onClick={() => handlePostClick(post.id)}
                      >
                        <img 
                          src={post.image || "/placeholder.svg"} 
                          alt={post.title} 
                          className="w-full h-48 object-cover" 
                        />
                        <div className="p-6">
                          <div className="flex items-center mb-3">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-edu-blue/10 text-edu-blue">
                              {post.category}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <User className="h-4 w-4 mr-1" />
                            <span>{post.author}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                          
                          <button className="flex items-center text-edu-purple hover:text-edu-indigo transition-colors">
                            Read Article
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPage;

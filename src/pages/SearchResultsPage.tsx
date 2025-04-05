
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, BookText, FileText, Newspaper } from 'lucide-react';
import { fetchStudyMaterials } from '@/utils/studyMaterialsDbUtils';
import { fetchPastPapers } from '@/utils/pastPapersDbUtils';
import { fetchBlogPosts } from '@/utils/blogUtils';
import { getSubjectIcon } from '@/utils/studyMaterialsUtils';

type SearchResult = {
  id: number;
  title: string;
  type: 'material' | 'paper' | 'blog';
  description?: string;
  category?: string;
  subject?: string;
  author?: string;
  date?: string;
};

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestedResults, setSuggestedResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        navigate('/');
        return;
      }

      try {
        setLoading(true);
        
        // Fetch all content types
        const [materials, papers, blogs] = await Promise.all([
          fetchStudyMaterials(),
          fetchPastPapers(),
          fetchBlogPosts()
        ]);
        
        // Process study materials
        const materialResults = materials
          .filter(m => 
            m.title.toLowerCase().includes(query.toLowerCase()) || 
            m.description.toLowerCase().includes(query.toLowerCase()) ||
            (m.subject && m.subject.toLowerCase().includes(query.toLowerCase())) || 
            (m.author && m.author.toLowerCase().includes(query.toLowerCase())) ||
            (m.tags && m.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
          )
          .map(m => ({
            id: m.id!,
            title: m.title,
            description: m.description,
            category: m.category,
            subject: m.subject,
            author: m.author,
            type: 'material' as const
          }));
        
        // Process past papers
        const paperResults = papers
          .filter(p => 
            p.title.toLowerCase().includes(query.toLowerCase()) || 
            p.subject.toLowerCase().includes(query.toLowerCase())
          )
          .map(p => ({
            id: p.id,
            title: p.title,
            subject: p.subject,
            type: 'paper' as const
          }));
        
        // Process blog posts
        const blogResults = blogs
          .filter(b => 
            b.title.toLowerCase().includes(query.toLowerCase()) || 
            (b.content && b.content.toLowerCase().includes(query.toLowerCase())) ||
            (b.category && b.category.toLowerCase().includes(query.toLowerCase())) ||
            (b.author && b.author.toLowerCase().includes(query.toLowerCase()))
          )
          .map(b => ({
            id: b.id,
            title: b.title,
            category: b.category,
            author: b.author,
            date: b.date,
            type: 'blog' as const
          }));
        
        // Combine all results
        const allResults = [...materialResults, ...paperResults, ...blogResults];
        setResults(allResults);
        
        // If no direct results, find similar content for suggestions
        if (allResults.length === 0) {
          // For simplicity, just get some random content as "suggested"
          const randomSuggestions = [
            ...materials.slice(0, 3).map(m => ({
              id: m.id!,
              title: m.title,
              description: m.description,
              category: m.category,
              subject: m.subject,
              author: m.author,
              type: 'material' as const
            })),
            ...papers.slice(0, 2).map(p => ({
              id: p.id,
              title: p.title,
              subject: p.subject,
              type: 'paper' as const
            })),
            ...blogs.slice(0, 2).map(b => ({
              id: b.id,
              title: b.title,
              category: b.category,
              author: b.author,
              date: b.date,
              type: 'blog' as const
            }))
          ];
          
          // Shuffle the suggestions
          setSuggestedResults(randomSuggestions.sort(() => 0.5 - Math.random()));
        }
      } catch (error) {
        console.error("Error performing search:", error);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query, navigate]);

  const handleResultClick = (result: SearchResult) => {
    switch (result.type) {
      case 'material':
        navigate(`/content/${result.id}`);
        break;
      case 'paper':
        navigate(`/past-papers/${result.id}`);
        break;
      case 'blog':
        navigate(`/blog/${result.id}`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Search className="h-4 w-4 mr-2" />
              <p>
                Showing results for: <span className="font-semibold">"{query}"</span>
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-edu-purple"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {results.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                      Found {results.length} result{results.length !== 1 ? 's' : ''}
                    </h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Sort by Relevance
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {results.map((result) => (
                      <Card 
                        key={`${result.type}-${result.id}`} 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleResultClick(result)}
                      >
                        <CardContent className="p-5">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
                              {result.type === 'material' ? (
                                result.subject ? getSubjectIcon(result.subject) : <BookText className="h-6 w-6 text-edu-purple" />
                              ) : result.type === 'paper' ? (
                                <FileText className="h-6 w-6 text-cyan-500" />
                              ) : (
                                <Newspaper className="h-6 w-6 text-amber-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-1">{result.title}</h3>
                              {result.description && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                                  {result.description}
                                </p>
                              )}
                              <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 gap-x-4">
                                {result.subject && <span>{result.subject}</span>}
                                {result.category && <span>{result.category}</span>}
                                {result.author && <span>By {result.author}</span>}
                                {result.date && <span>{new Date(result.date).toLocaleDateString()}</span>}
                                <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                                  {result.type === 'material' ? 'Study Material' : 
                                   result.type === 'paper' ? 'Past Paper' : 'Blog Post'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No results found</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    We couldn't find any content matching "{query}". Try different keywords or check out our suggestions below.
                  </p>
                  <Button onClick={() => navigate('/study-materials')}>
                    Browse All Materials
                  </Button>
                </div>
              )}

              {results.length === 0 && suggestedResults.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-4">You might be interested in</h2>
                  <div className="grid gap-4">
                    {suggestedResults.map((result) => (
                      <Card 
                        key={`suggested-${result.type}-${result.id}`} 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleResultClick(result)}
                      >
                        <CardContent className="p-5">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
                              {result.type === 'material' ? (
                                result.subject ? getSubjectIcon(result.subject) : <BookText className="h-6 w-6 text-edu-purple" />
                              ) : result.type === 'paper' ? (
                                <FileText className="h-6 w-6 text-cyan-500" />
                              ) : (
                                <Newspaper className="h-6 w-6 text-amber-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-1">{result.title}</h3>
                              {result.description && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                                  {result.description}
                                </p>
                              )}
                              <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 gap-x-4">
                                {result.subject && <span>{result.subject}</span>}
                                {result.category && <span>{result.category}</span>}
                                {result.author && <span>By {result.author}</span>}
                                {result.date && <span>{new Date(result.date).toLocaleDateString()}</span>}
                                <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                                  {result.type === 'material' ? 'Study Material' : 
                                   result.type === 'paper' ? 'Past Paper' : 'Blog Post'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;

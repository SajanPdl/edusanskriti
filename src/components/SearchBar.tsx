
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useSearchSuggestions from '@/hooks/use-search-suggestions';
import { fetchStudyMaterials } from '@/utils/studyMaterialsDbUtils';
import { fetchPastPapers } from '@/utils/pastPapersDbUtils';
import { fetchBlogPosts } from '@/utils/blogUtils';
import { StudyMaterial } from '@/data/studyMaterialsData';
import { PastPaper } from '@/utils/pastPapersDbUtils';
import { useToast } from '@/hooks/use-toast';

type SearchResult = {
  id: number;
  title: string;
  type: 'material' | 'paper' | 'blog';
  description?: string;
  category?: string;
  subject?: string;
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestedMaterials, setSuggestedMaterials] = useState<StudyMaterial[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const { suggestions, isLoading } = useSearchSuggestions(query);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchBar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadSuggestedMaterials = async () => {
      if (query.length < 3) return;
      
      try {
        setIsSearching(true);
        
        // Fetch all types of content
        const [materials, papers, blogs] = await Promise.all([
          fetchStudyMaterials(),
          fetchPastPapers(),
          fetchBlogPosts()
        ]);
        
        // Convert to unified search results
        const materialResults = materials.filter(m => 
          m.title.toLowerCase().includes(query.toLowerCase()) || 
          m.description.toLowerCase().includes(query.toLowerCase()) ||
          (m.subject && m.subject.toLowerCase().includes(query.toLowerCase()))
        ).map(m => ({
          id: m.id!,
          title: m.title,
          description: m.description,
          category: m.category,
          subject: m.subject,
          type: 'material' as const
        }));
        
        const paperResults = papers.filter(p => 
          p.title.toLowerCase().includes(query.toLowerCase()) || 
          p.subject.toLowerCase().includes(query.toLowerCase())
        ).map(p => ({
          id: p.id,
          title: p.title,
          subject: p.subject,
          type: 'paper' as const
        }));
        
        const blogResults = blogs.filter(b => 
          b.title.toLowerCase().includes(query.toLowerCase()) || 
          b.content.toLowerCase().includes(query.toLowerCase()) ||
          (b.category && b.category.toLowerCase().includes(query.toLowerCase()))
        ).map(b => ({
          id: b.id,
          title: b.title,
          category: b.category,
          type: 'blog' as const
        }));
        
        // Combine results
        const allResults = [...materialResults, ...paperResults, ...blogResults];
        setSearchResults(allResults);
        
        // Set suggested materials when no direct results found
        if (allResults.length === 0) {
          const allMaterials = materials;
          // Get random suggestions if no direct matches
          const randomSuggestions = allMaterials
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          setSuggestedMaterials(randomSuggestions);
        }
      } catch (error) {
        console.error("Error performing search:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      if (query.length >= 3) {
        loadSuggestedMaterials();
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim() === '') return;
    
    if (searchResults.length > 0) {
      // Navigate to the first result
      const firstResult = searchResults[0];
      switch (firstResult.type) {
        case 'material':
          navigate(`/content/${firstResult.id}`);
          break;
        case 'paper':
          navigate(`/past-papers/${firstResult.id}`);
          break;
        case 'blog':
          navigate(`/blog/${firstResult.id}`);
          break;
      }
      
      toast({
        title: "Search Result Found",
        description: `Redirecting to "${firstResult.title}"`,
      });
    } else {
      // Navigate to search results page with query
      navigate(`/search?q=${encodeURIComponent(query)}`);
      
      if (suggestedMaterials.length > 0) {
        toast({
          title: "No Direct Matches Found",
          description: "We've suggested some related materials for you.",
        });
      } else {
        toast({
          title: "No Results Found",
          description: "Try a different search term or browse our categories.",
        });
      }
    }
    
    setShowSearchBar(false);
    setQuery('');
  };

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
    
    setShowSearchBar(false);
    setQuery('');
  };

  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={() => setShowSearchBar(!showSearchBar)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-edu-purple"
        aria-label="Search"
      >
        <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </button>

      {showSearchBar && (
        <div className="absolute right-0 top-12 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for materials, papers, blogs..."
              className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-edu-purple"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </form>

          {query.length >= 3 && (
            <div className="mt-3">
              {isSearching ? (
                <div className="py-2 text-sm text-gray-500 dark:text-gray-400 flex justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-edu-purple mr-2"></div>
                  Searching...
                </div>
              ) : (
                <>
                  {searchResults.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 font-medium">Search Results</p>
                      {searchResults.slice(0, 5).map((result) => (
                        <div
                          key={`${result.type}-${result.id}`}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                          onClick={() => handleResultClick(result)}
                        >
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              result.type === 'material' ? 'bg-edu-purple' : 
                              result.type === 'paper' ? 'bg-cyan-500' : 'bg-amber-500'
                            }`}></div>
                            <span className="font-medium">{result.title}</span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                            {result.subject || result.category} • {result.type === 'material' ? 'Study Material' : result.type === 'paper' ? 'Past Paper' : 'Blog Post'}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : suggestedMaterials.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 font-medium">No direct matches. You might be interested in:</p>
                      {suggestedMaterials.map((material) => (
                        <div
                          key={material.id}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                          onClick={() => navigate(`/content/${material.id}`)}
                        >
                          <div className="font-medium">{material.title}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {material.subject} • Study Material
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : query.length >= 3 && (
                    <p className="py-2 text-sm text-gray-500 dark:text-gray-400">
                      No results found. Try a different search term.
                    </p>
                  )}

                  {!isLoading && suggestions.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 font-medium">Search Suggestions</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                            onClick={() => setQuery(suggestion)}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

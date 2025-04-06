
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { FileText, Filter, Download, Calendar, Award } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useQuery } from '@tanstack/react-query';
import { fetchPastPapers } from '@/utils/queryUtils';
import { Skeleton } from '@/components/ui/skeleton';

const categories = [
  "Grade 7", "Grade 8", "Grade 9", "Grade 10", 
  "Grade 11", "Grade 12", "Bachelor's", "Engineering"
];

const subjects = [
  "Mathematics", "Science", "Physics", "Chemistry", "Biology", 
  "History", "Geography", "Computer Science", "Literature"
];

const years = [2023, 2022, 2021, 2020, 2019, 2018];

const difficulties = ["Easy", "Medium", "Hard"];

const PastPapersPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [onlySolutions, setOnlySolutions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // React Query for fetching past papers
  const { data: papers, isLoading } = useQuery({
    queryKey: ['past-papers'],
    queryFn: () => fetchPastPapers(),
  });
  
  // Client-side filtering (in production, this would be done in the database query)
  const filteredPapers = papers ? papers.filter(paper => {
    const matchesGrade = selectedGrade ? paper.grade === selectedGrade : true;
    const matchesSubject = selectedSubject ? paper.subject === selectedSubject : true;
    const matchesYear = selectedYear ? paper.year === parseInt(selectedYear) : true;
    const matchesDifficulty = selectedDifficulty ? paper.difficulty === selectedDifficulty : true;
    const matchesSolution = onlySolutions ? paper.has_solution === true : true;
    const matchesSearch = searchQuery 
      ? paper.title.toLowerCase().includes(searchQuery.toLowerCase()) 
      : true;

    return matchesGrade && matchesSubject && matchesYear && matchesDifficulty && matchesSolution && matchesSearch;
  }) : [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleApplyFilters = () => {
    // Filtering is handled reactively through the filteredPapers computation
  };

  const resetFilters = () => {
    setSelectedGrade('');
    setSelectedSubject('');
    setSelectedYear('');
    setSelectedDifficulty('');
    setOnlySolutions(false);
    setSearchQuery('');
  };

  const handlePaperClick = (paperId: number) => {
    navigate(`/content/${paperId}?type=paper`);
  };

  const handleDownload = (e: React.MouseEvent, paper: any, isSolution: boolean = false) => {
    e.stopPropagation();
    toast({
      title: `Download Started`,
      description: `${isSolution ? 'Solution for ' : ''}${paper.title} is being downloaded.`,
    });
    
    // In a real app, we would call an API to increment the download count
    
    // Open the actual file or sample PDF
    if (paper.file_url) {
      window.open(paper.file_url, '_blank');
    } else {
      // Fallback for sample
      window.open("https://www.africau.edu/images/default/sample.pdf", '_blank');
    }
  };

  // Use skeleton loaders while data is loading
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
          
          <Skeleton className="h-6 w-3/4 mb-4" />
          
          <div className="flex items-center mb-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24 ml-4" />
            <Skeleton className="h-4 w-16 ml-4" />
          </div>
          
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-edu-lightgray to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 gradient-text">Past Papers & Solutions</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Access past examination papers and their solutions to help you prepare for upcoming exams. 
            Filter by grade, subject, year, or difficulty level to find the right papers for your needs.
          </p>
          
          <div className="mb-10">
            <SearchBar 
              placeholder="Search past papers..." 
              className="max-w-3xl mx-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
              category="papers"
            />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-10">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 text-edu-purple mr-2" />
              <h2 className="text-xl font-bold">Filter Papers</h2>
              <button 
                onClick={resetFilters}
                className="ml-auto text-sm text-edu-purple hover:text-edu-indigo"
              >
                Reset Filters
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grade/Level</label>
                <select 
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-edu-purple focus:ring focus:ring-edu-purple/20 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Grades</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <select 
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-edu-purple focus:ring focus:ring-edu-purple/20 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year</label>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-edu-purple focus:ring focus:ring-edu-purple/20 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                <select 
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-edu-purple focus:ring focus:ring-edu-purple/20 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Difficulties</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex items-center">
              <input 
                type="checkbox" 
                id="onlySolutions" 
                checked={onlySolutions}
                onChange={(e) => setOnlySolutions(e.target.checked)}
                className="rounded border-gray-300 text-edu-purple focus:ring-edu-purple"
              />
              <label htmlFor="onlySolutions" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Only show papers with solutions
              </label>
            </div>
            
            <button 
              onClick={handleApplyFilters}
              className="mt-6 btn-primary w-full sm:w-auto"
              type="button"
            >
              Apply Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              renderSkeletons()
            ) : filteredPapers.length > 0 ? (
              filteredPapers.map(paper => (
                <div 
                  key={paper.id} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handlePaperClick(paper.id)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-edu-purple/10 text-edu-purple mb-3">
                          {paper.grade}
                        </span>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-edu-blue/10 text-edu-blue mb-3 ml-2">
                          {paper.subject}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {paper.file_size} {paper.file_type || 'PDF'}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{paper.title}</h3>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{paper.year}</span>
                      <span className="mx-2">•</span>
                      <Award className="h-4 w-4 mr-1" />
                      <span>{paper.difficulty}</span>
                      <span className="mx-2">•</span>
                      <Download className="h-4 w-4 mr-1" />
                      <span>{paper.downloads || 0}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        className="flex items-center justify-center px-4 py-2 bg-edu-purple text-white rounded-lg hover:bg-edu-indigo transition-colors"
                        onClick={(e) => handleDownload(e, paper)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Download Paper
                      </button>
                      {paper.has_solution && (
                        <button 
                          className="flex items-center justify-center px-4 py-2 bg-edu-orange text-white rounded-lg hover:bg-edu-gold transition-colors"
                          onClick={(e) => handleDownload(e, paper, true)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Solution
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-20">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No papers found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PastPapersPage;

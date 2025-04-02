
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { FileText, Filter, Download, Calendar, Award } from 'lucide-react';

// Mock data for past papers
const initialPapers = [
  {
    id: 1,
    title: "Grade 10 Mathematics Final Exam 2023",
    subject: "Mathematics",
    grade: "Grade 10",
    year: 2023,
    difficulty: "Medium",
    hasSolution: true,
    downloadCount: 2145,
    fileSize: "1.8 MB",
    fileType: "PDF",
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Engineering Physics Mid-Term 2022",
    subject: "Physics",
    grade: "Engineering",
    year: 2022,
    difficulty: "Hard",
    hasSolution: true,
    downloadCount: 1570,
    fileSize: "2.2 MB",
    fileType: "PDF",
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Grade 12 Chemistry Final Exam 2023",
    subject: "Chemistry",
    grade: "Grade 12",
    year: 2023,
    difficulty: "Medium",
    hasSolution: false,
    downloadCount: 987,
    fileSize: "1.5 MB",
    fileType: "PDF",
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Bachelor's Computer Science Algorithm Test 2021",
    subject: "Computer Science",
    grade: "Bachelor's",
    year: 2021,
    difficulty: "Hard",
    hasSolution: true,
    downloadCount: 2356,
    fileSize: "3.1 MB",
    fileType: "PDF",
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Grade 11 Biology Mid-Term 2022",
    subject: "Biology",
    grade: "Grade 11",
    year: 2022,
    difficulty: "Easy",
    hasSolution: true,
    downloadCount: 1122,
    fileSize: "1.3 MB",
    fileType: "PDF",
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Grade 9 History Final Exam 2023",
    subject: "History",
    grade: "Grade 9",
    year: 2023,
    difficulty: "Medium",
    hasSolution: false,
    downloadCount: 856,
    fileSize: "2.0 MB",
    fileType: "PDF",
    thumbnailUrl: "/placeholder.svg"
  }
];

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
  const [papers, setPapers] = useState(initialPapers);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [onlySolutions, setOnlySolutions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filterPapers = () => {
    return initialPapers.filter(paper => {
      const matchesGrade = selectedGrade ? paper.grade === selectedGrade : true;
      const matchesSubject = selectedSubject ? paper.subject === selectedSubject : true;
      const matchesYear = selectedYear ? paper.year === parseInt(selectedYear) : true;
      const matchesDifficulty = selectedDifficulty ? paper.difficulty === selectedDifficulty : true;
      const matchesSolution = onlySolutions ? paper.hasSolution : true;
      const matchesSearch = searchQuery 
        ? paper.title.toLowerCase().includes(searchQuery.toLowerCase()) 
        : true;

      return matchesGrade && matchesSubject && matchesYear && matchesDifficulty && matchesSolution && matchesSearch;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPapers(filterPapers());
  };

  const resetFilters = () => {
    setSelectedGrade('');
    setSelectedSubject('');
    setSelectedYear('');
    setSelectedDifficulty('');
    setOnlySolutions(false);
    setSearchQuery('');
    setPapers(initialPapers);
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
          
          <form onSubmit={handleSearch} className="mb-10">
            <SearchBar 
              placeholder="Search past papers..." 
              className="max-w-3xl mx-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
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
              onClick={handleSearch}
              className="mt-6 btn-primary w-full sm:w-auto"
              type="button"
            >
              Apply Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map(paper => (
              <div key={paper.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                    <span className="text-sm text-gray-500 dark:text-gray-400">{paper.fileSize} {paper.fileType}</span>
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
                    <span>{paper.downloadCount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex items-center justify-center px-4 py-2 bg-edu-purple text-white rounded-lg hover:bg-edu-indigo transition-colors">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Paper
                    </button>
                    {paper.hasSolution && (
                      <button className="flex items-center justify-center px-4 py-2 bg-edu-orange text-white rounded-lg hover:bg-edu-gold transition-colors">
                        <Download className="h-4 w-4 mr-2" />
                        Solution
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PastPapersPage;

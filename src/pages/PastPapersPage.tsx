
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchPastPapers } from '@/utils/queryUtils';
import { PastPaper } from '@/utils/queryUtils';
import { Button } from '@/components/ui/button';

const PastPapersPage = () => {
  const [papers, setPapers] = useState<PastPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);

  useEffect(() => {
    const loadPapers = async () => {
      try {
        setLoading(true);
        const params: { grade?: string; subject?: string; year?: number; search?: string } = {};
        
        if (selectedGrade !== 'All') params.grade = selectedGrade;
        if (selectedSubject !== 'All') params.subject = selectedSubject;
        if (selectedYear) params.year = selectedYear;
        if (searchTerm) params.search = searchTerm;
        
        const data = await fetchPastPapers(params);
        setPapers(data);
      } catch (error) {
        console.error("Error loading past papers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPapers();
  }, [searchTerm, selectedGrade, selectedSubject, selectedYear]);

  // Filter options
  const grades = ['All', 'Grade 10', 'Grade 11', 'Grade 12'];
  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'];
  const years = [2023, 2022, 2021, 2020, 2019];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2">Past Examination Papers</h1>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Access previous years' examination papers to help with your test preparation.
            Filter by subject, grade, and year to find exactly what you need.
          </p>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search papers..."
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grade</label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                <select
                  value={selectedYear || ''}
                  onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGrade('All');
                  setSelectedSubject('All');
                  setSelectedYear(undefined);
                }}
                variant="outline"
                className="mr-2"
              >
                Reset Filters
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading past papers...</p>
            </div>
          ) : papers.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Grade</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Year</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Difficulty</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {papers.map((paper) => (
                      <tr key={paper.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{paper.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{paper.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{paper.grade}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{paper.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{paper.difficulty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <a 
                            href={`/content/${paper.id}`}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Past Papers Found</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4">
                We couldn't find any past papers matching your current filters. Try adjusting your search criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGrade('All');
                  setSelectedSubject('All');
                  setSelectedYear(undefined);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PastPapersPage;


import { useState, useEffect } from 'react';
import { FileText, Calendar, Clock, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { fetchPastPapers } from '@/utils/pastPapersDbUtils';
import { PastPaper } from '@/utils/pastPapersDbUtils';
import { fetchSubjects } from '@/utils/adminDbUtils';

const PastPapers = () => {
  const [pastPapers, setPastPapers] = useState<PastPaper[]>([]);
  const [filteredPapers, setFilteredPapers] = useState<PastPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const { toast } = useToast();

  // Calculate available years from papers
  const years = Array.from(
    new Set(pastPapers.map(paper => paper.year))
  ).sort((a, b) => b - a);

  // Get unique difficulties
  const difficulties = Array.from(
    new Set(pastPapers.map(paper => paper.difficulty))
  );

  useEffect(() => {
    const loadPastPapers = async () => {
      try {
        setLoading(true);
        const [papersData, subjectsData] = await Promise.all([
          fetchPastPapers(),
          fetchSubjects()
        ]);
        
        setPastPapers(papersData);
        setFilteredPapers(papersData);
        setSubjects(subjectsData.map(subject => subject.name));
      } catch (error) {
        console.error("Error loading past papers:", error);
        toast({
          title: "Error loading data",
          description: "Could not load past papers. Please try again later."
        });
      } finally {
        setLoading(false);
      }
    };

    loadPastPapers();
  }, [toast]);

  useEffect(() => {
    // Filter papers based on selections
    let filtered = [...pastPapers];
    
    if (selectedYear) {
      filtered = filtered.filter(paper => paper.year === parseInt(selectedYear));
    }
    
    if (selectedSubject && selectedSubject !== 'All') {
      filtered = filtered.filter(paper => paper.subject === selectedSubject);
    }
    
    if (selectedDifficulty) {
      filtered = filtered.filter(paper => paper.difficulty === selectedDifficulty);
    }
    
    setFilteredPapers(filtered);
  }, [selectedYear, selectedSubject, selectedDifficulty, pastPapers]);

  const handleDownload = (paperId: number, paperTitle: string) => {
    // In a real application, this would trigger a file download
    // For now, we'll just show a toast notification
    toast({
      title: "Download Started",
      description: `${paperTitle} is being downloaded.`,
    });
    console.log(`Downloading paper ID: ${paperId}`);
  };

  return (
    <section id="past-papers" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text font-playfair">Past Papers & Solutions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Prepare for your exams with our comprehensive collection of past papers, solutions, and model answers.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <select 
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          <select 
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
          
          <select 
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-edu-purple dark:focus:border-edu-purple focus:ring-1 focus:ring-edu-purple/20 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">All Difficulties</option>
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-edu-purple"></div>
          </div>
        ) : (
          <>
            {/* Past Papers Table */}
            <div className="overflow-x-auto">
              <table className="w-full glass-card">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Title</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">Year</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">Subject</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 hidden lg:table-cell">Difficulty</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 hidden lg:table-cell">Duration</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPapers.length > 0 ? (
                    filteredPapers.map((paper, index) => (
                      <tr 
                        key={paper.id} 
                        className={`${
                          index % 2 === 0 ? 'bg-white dark:bg-gray-900/50' : 'bg-gray-50 dark:bg-gray-800/30'
                        } hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-150`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <FileText className="h-5 w-5 text-edu-blue mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200">{paper.title}</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 md:hidden">{paper.subject} • {paper.year}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{paper.year}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{paper.subject}</span>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            paper.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            paper.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {paper.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{paper.duration}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            className="inline-flex items-center gap-1 bg-edu-blue/10 hover:bg-edu-blue/20 text-edu-blue px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-300"
                            onClick={() => handleDownload(paper.id, paper.title)}
                          >
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Download</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                        No past papers found matching your criteria. Try adjusting the filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination - Simple version for now */}
            {filteredPapers.length > 0 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    &laquo;
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-edu-purple text-white">
                    1
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    &raquo;
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PastPapers;

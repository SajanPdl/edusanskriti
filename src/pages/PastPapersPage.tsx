
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Download, Search } from 'lucide-react';
import { fetchPastPapers } from '@/utils/queryUtils';
import { Tables } from '@/integrations/supabase/types';

type PastPaper = Tables<'past_papers'>;

const PastPapersPage = () => {
  const [pastPapers, setPastPapers] = useState<PastPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  
  useEffect(() => {
    const loadPastPapers = async () => {
      try {
        setLoading(true);
        const params: { grade?: string; subject?: string; year?: number; search?: string } = {};
        
        if (selectedGrade !== 'All') params.grade = selectedGrade;
        if (selectedSubject !== 'All') params.subject = selectedSubject;
        if (selectedYear) params.year = selectedYear;
        if (searchTerm) params.search = searchTerm;
        
        const data = await fetchPastPapers(params);
        setPastPapers(data);
      } catch (error) {
        console.error("Error loading past papers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPastPapers();
  }, [searchTerm, selectedGrade, selectedSubject, selectedYear]);
  
  const handleDownload = (paper: PastPaper) => {
    if (paper.file_url) {
      window.open(paper.file_url, '_blank');
    } else {
      alert('Download link unavailable');
    }
  };

  // Filter options
  const grades = ['All', 'Grade 10', 'Grade 11', 'Grade 12', "Bachelor's"];
  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'];
  const years = [2023, 2022, 2021, 2020, 2019, 2018];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Past Examination Papers</h1>
            <p className="text-gray-600 text-center mb-10">
              Access previous years' examination papers to practice and prepare for your upcoming exams.
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    type="search" 
                    placeholder="Search papers..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div>
                  <select 
                    className="w-full border border-gray-300 rounded p-2"
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                  >
                    {grades.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <select 
                    className="w-full border border-gray-300 rounded p-2"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <select 
                    className="w-full border border-gray-300 rounded p-2"
                    value={selectedYear || ''}
                    onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-2 text-gray-600">Loading papers...</p>
                </div>
              ) : pastPapers.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {pastPapers.map((paper) => (
                    <Card key={paper.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center p-4">
                          <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center mr-4 flex-shrink-0">
                            <FileText className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold text-gray-800">{paper.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {paper.grade}
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {paper.subject}
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {paper.year}
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {paper.difficulty}
                              </span>
                            </div>
                          </div>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="ml-4 flex-shrink-0"
                            onClick={() => handleDownload(paper)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No past papers found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PastPapersPage;

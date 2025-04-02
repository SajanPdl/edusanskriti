
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import CounterAnimation from './CounterAnimation';
import Advertisement from './Advertisement';

const PastPapers = () => {
  const papers = [
    {
      title: "School & College",
      description: "Past exam papers for grades 8-12 and undergraduate courses",
      icon: <FileText className="h-8 w-8 text-edu-blue" />,
      count: 3500
    },
    {
      title: "Model Solutions",
      description: "Step-by-step solutions for complex problems and exam papers",
      icon: <CheckCircle className="h-8 w-8 text-edu-purple" />,
      count: 2800
    },
    {
      title: "Previous Year Papers",
      description: "Chronological collection of papers from last 10 years",
      icon: <Clock className="h-8 w-8 text-edu-orange" />,
      count: 5200
    }
  ];

  return (
    <section id="past-papers" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Past Papers</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Practice with thousands of previous year papers and solutions to master your exam preparation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {papers.map((paper, index) => (
            <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
                    {paper.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{paper.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  {paper.description}
                </p>
                <div className="text-center text-2xl font-bold text-edu-purple mb-4">
                  <CounterAnimation 
                    end={paper.count} 
                    suffix="+" 
                    className="text-2xl font-bold text-edu-purple"
                  />
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/past-papers">View Papers</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Advertisement 
          network="adsterra" 
          size="banner" 
          id="past-papers-ad"
        />
        
        <div className="text-center mt-10">
          <Button asChild className="bg-edu-purple hover:bg-edu-indigo text-white px-6 py-3 rounded-full inline-flex items-center group">
            <Link to="/past-papers">
              Browse All Past Papers
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PastPapers;

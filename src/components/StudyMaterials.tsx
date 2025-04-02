
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Download, ChevronRight } from 'lucide-react';
import CounterAnimation from './CounterAnimation';
import Advertisement from './Advertisement';

const StudyMaterials = () => {
  const categories = [
    {
      title: "High School Notes",
      description: "Comprehensive notes for grades 7-12 covering all major subjects",
      icon: <BookOpen className="h-8 w-8 text-edu-purple" />,
      count: 1200
    },
    {
      title: "Bachelor's Degree",
      description: "Study materials for undergraduate courses in Science, Arts, Commerce & Engineering",
      icon: <FileText className="h-8 w-8 text-edu-blue" />,
      count: 850
    },
    {
      title: "Engineering & Medical",
      description: "Specialized notes for competitive exams and technical subjects",
      icon: <Download className="h-8 w-8 text-edu-orange" />,
      count: 740
    }
  ];

  return (
    <section id="study-materials" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Study Materials</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Access thousands of carefully crafted notes, guides and study materials to excel in your academic journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => (
            <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  {category.description}
                </p>
                <div className="text-center text-2xl font-bold text-edu-purple mb-4">
                  <CounterAnimation 
                    end={category.count} 
                    suffix="+" 
                    className="text-2xl font-bold text-edu-purple"
                  />
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/study-materials">View Materials</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Advertisement 
          network="google" 
          size="banner" 
          id="study-materials-ad"
        />
        
        <div className="text-center mt-10">
          <Button asChild className="bg-edu-purple hover:bg-edu-indigo text-white px-6 py-3 rounded-full inline-flex items-center group">
            <Link to="/study-materials">
              Explore All Materials
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StudyMaterials;

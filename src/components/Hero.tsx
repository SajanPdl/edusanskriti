
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Download, BookOpen, FileText } from 'lucide-react';
import Advertisement from './Advertisement';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAppScreen, setCurrentAppScreen] = useState(0);
  
  // Example placeholder image URLs for sponsor ads
  const sponsorImage = "https://placehold.co/600x100/f5f5f5/6A26A9?text=EduSanskriti+Sponsor";
  const sponsorUrl = "#sponsor";
  const sponsorName = "Learning Partner";
  
  // Mobile app preview screens
  const appScreens = [
    "https://placehold.co/280x560/f5f5f5/6A26A9?text=Home+Screen",
    "https://placehold.co/280x560/f5f5f5/2D46B9?text=Study+Materials",
    "https://placehold.co/280x560/f5f5f5/F97316?text=Past+Papers",
    "https://placehold.co/280x560/f5f5f5/6A26A9?text=Reading+Mode",
    "https://placehold.co/280x560/f5f5f5/2D46B9?text=Profile"
  ];
  
  // Auto-rotate app screens
  useState(() => {
    const interval = setInterval(() => {
      setCurrentAppScreen((prev) => (prev + 1) % appScreens.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20 px-4 bg-gradient-to-br from-white via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Your <span className="gradient-text">Educational</span> Success Journey Starts Here
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Access thousands of study materials, past papers, and educational resources all in one place
            </p>
            
            <div className="relative max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-20 py-4 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-edu-purple"
                  placeholder="Search for notes, papers or subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="absolute right-2 top-2 px-4 py-2 bg-edu-purple text-white rounded-full hover:bg-edu-indigo transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <Button asChild className="btn-primary">
                <Link to="/study-materials">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Resources
                </Link>
              </Button>
              <Button asChild className="btn-secondary">
                <Link to="#app-promotion">
                  <Download className="mr-2 h-5 w-5" />
                  Download App
                </Link>
              </Button>
            </div>
            
            <Advertisement 
              network="sponsor" 
              size="banner" 
              sponsorImage={sponsorImage}
              sponsorUrl={sponsorUrl}
              sponsorName={sponsorName}
              className="mt-8 animate-fade-in lg:max-w-xl"
              style={{ animationDelay: "0.8s" }}
            />
          </div>
          
          <div className="hidden lg:flex justify-center lg:justify-end items-center relative animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {/* Phone frame with animated app screens */}
            <div className="relative">
              {/* Phone frame */}
              <div className="w-[320px] h-[650px] bg-black rounded-[40px] p-4 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[30px] bg-black rounded-t-[40px] flex justify-center items-end pb-1">
                  <div className="w-[150px] h-[25px] bg-black rounded-b-xl"></div>
                </div>
                {/* Screen */}
                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
                  {/* App screens */}
                  {appScreens.map((screen, index) => (
                    <img 
                      key={index}
                      src={screen}
                      alt={`App Screen ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                      style={{ 
                        opacity: currentAppScreen === index ? 1 : 0,
                        zIndex: currentAppScreen === index ? 10 : 1
                      }}
                    />
                  ))}
                </div>
                {/* Home button */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[40px] h-[40px] border-2 border-gray-400 rounded-full"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-[100px] h-[100px] bg-gradient-to-br from-edu-purple to-edu-blue rounded-full opacity-30 animate-pulse-slow"></div>
              <div className="absolute -bottom-5 -left-5 w-[80px] h-[80px] bg-gradient-to-br from-edu-orange to-edu-gold rounded-full opacity-30 animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
            </div>
            
            {/* Floating educational elements */}
            <div className="absolute -top-10 -right-20 text-purple-200 dark:text-purple-900 opacity-70 animate-float">
              <BookOpen size={40} />
            </div>
            <div className="absolute top-1/4 -left-10 text-blue-200 dark:text-blue-900 opacity-70 animate-float" style={{ animationDelay: "0.5s" }}>
              <FileText size={30} />
            </div>
            <div className="absolute bottom-1/4 -right-10 text-orange-200 dark:text-orange-900 opacity-70 animate-float" style={{ animationDelay: "1s" }}>
              <FileText size={50} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

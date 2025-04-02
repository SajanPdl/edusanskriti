
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Download, BookOpen, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Advertisement from './Advertisement';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Example placeholder image URLs for sponsor ads
  const sponsorImage = "https://placehold.co/600x100/f5f5f5/6A26A9?text=EduSanskriti+Sponsor";
  const sponsorUrl = "#sponsor";
  const sponsorName = "Learning Partner";
  
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20 px-4 bg-gradient-to-br from-white via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto flex flex-col items-center">
        {/* Floating educational icons animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute text-purple-200 dark:text-purple-900 opacity-70"
            style={{ top: '15%', left: '10%' }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <BookOpen size={40} />
          </motion.div>
          <motion.div
            className="absolute text-blue-200 dark:text-blue-900 opacity-70"
            style={{ top: '25%', right: '15%' }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <FileText size={30} />
          </motion.div>
          <motion.div
            className="absolute text-orange-200 dark:text-orange-900 opacity-70"
            style={{ bottom: '30%', left: '20%' }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <FileText size={50} />
          </motion.div>
        </div>
        
        <div className="text-center max-w-4xl mx-auto z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your <span className="gradient-text">Educational</span> Success Journey Starts Here
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Access thousands of study materials, past papers, and educational resources all in one place
          </motion.p>
          
          <motion.div 
            className="mb-8 relative max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
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
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
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
          </motion.div>
          
          <Advertisement 
            network="sponsor" 
            size="banner" 
            sponsorImage={sponsorImage}
            sponsorUrl={sponsorUrl}
            sponsorName={sponsorName}
            className="mt-8"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

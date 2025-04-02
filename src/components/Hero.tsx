
import SearchBar from './SearchBar';
import { BookOpen, FileText, GraduationCap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-40 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-pattern animate-bg-shift opacity-30"></div>
      
      {/* Floating icons decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/5 animate-float opacity-20">
          <BookOpen size={72} className="text-edu-purple" />
        </div>
        <div className="absolute top-2/3 left-3/4 animate-float opacity-20" style={{animationDelay: '1s'}}>
          <FileText size={48} className="text-edu-blue" />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-float opacity-20" style={{animationDelay: '1.5s'}}>
          <GraduationCap size={64} className="text-edu-orange" />
        </div>
        {/* More floating elements */}
        <div className="absolute top-1/3 right-1/4 animate-float opacity-20" style={{animationDelay: '2s'}}>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-edu-purple to-edu-blue animate-pulse-slow" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-float opacity-20" style={{animationDelay: '0.5s'}}>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-edu-orange to-edu-gold animate-pulse-slow" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text leading-tight">
            Your Gateway to Educational Excellence
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Access comprehensive study materials, past papers, notes, and educational resources to excel in your academic journey.
          </p>
          
          <div className="mb-10">
            <SearchBar className="max-w-2xl mx-auto" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Explore Resources
            </button>
            <button className="btn-secondary">
              Download App
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats/featured numbers */}
      <div className="container mx-auto px-4 mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="glass-card p-6 text-center transform hover:scale-105 transition-transform">
            <h3 className="text-3xl md:text-4xl font-bold text-edu-purple mb-2">10K+</h3>
            <p className="text-gray-600 dark:text-gray-400">Study Materials</p>
          </div>
          
          <div className="glass-card p-6 text-center transform hover:scale-105 transition-transform">
            <h3 className="text-3xl md:text-4xl font-bold text-edu-blue mb-2">5K+</h3>
            <p className="text-gray-600 dark:text-gray-400">Past Papers</p>
          </div>
          
          <div className="glass-card p-6 text-center transform hover:scale-105 transition-transform">
            <h3 className="text-3xl md:text-4xl font-bold text-edu-orange mb-2">100+</h3>
            <p className="text-gray-600 dark:text-gray-400">Subjects</p>
          </div>
          
          <div className="glass-card p-6 text-center transform hover:scale-105 transition-transform">
            <h3 className="text-3xl md:text-4xl font-bold text-edu-gold mb-2">50K+</h3>
            <p className="text-gray-600 dark:text-gray-400">Students</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

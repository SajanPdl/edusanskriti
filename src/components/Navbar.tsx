
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-edu-purple" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-edu-purple to-edu-blue">
              EduSanskriti
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-edu-purple dark:hover:text-edu-purple transition-colors">
                Home
              </Link>
              <Link to="#study-materials" className="text-gray-700 dark:text-gray-200 hover:text-edu-purple dark:hover:text-edu-purple transition-colors">
                Study Materials
              </Link>
              <Link to="#past-papers" className="text-gray-700 dark:text-gray-200 hover:text-edu-purple dark:hover:text-edu-purple transition-colors">
                Past Papers
              </Link>
              <Link to="#blog" className="text-gray-700 dark:text-gray-200 hover:text-edu-purple dark:hover:text-edu-purple transition-colors">
                Blog
              </Link>
              <Link to="#contact" className="text-gray-700 dark:text-gray-200 hover:text-edu-purple dark:hover:text-edu-purple transition-colors">
                Contact
              </Link>
            </nav>
            
            <Link to="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <Search className="h-5 w-5" />
            </Link>
            
            <button className="btn-primary">
              Download App
            </button>
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-gray-700 dark:text-gray-200"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white dark:bg-gray-900 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 py-3 space-y-3">
          <Link to="/" className="block text-gray-700 dark:text-gray-200 hover:text-edu-purple dark:hover:text-edu-purple">
            Home
          </Link>
          <Link to="#study-materials" className="block text-gray-700 dark:text-gray-200 hover:text-edu-purple dark:hover:text-edu-purple">
            Study Materials
          </Link>
          <Link to="#past-papers" className="block text-gray-700 dark:text-gray-200 hover:text-edu-purple dark:hover:text-edu-purple">
            Past Papers
          </Link>
          <Link to="#blog" className="block text-gray-700 dark:text-gray-200 hover:text-edu-purple dark:hover:text-edu-purple">
            Blog
          </Link>
          <Link to="#contact" className="block text-gray-700 dark:text-gray-200 hover:text-edu-purple dark:hover:text-edu-purple">
            Contact
          </Link>
          
          <button className="w-full btn-primary">
            Download App
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

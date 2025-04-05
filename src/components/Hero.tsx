import React from 'react';
import { Rocket } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-edu-purple to-edu-blue text-white py-20 rounded-3xl shadow-lg overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Unlock Your Potential with Expertly Crafted Learning Resources
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Explore a vast library of study materials, past papers, and blog posts designed to help you excel in your academic journey.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <button className="btn-primary">
            Get Started <Rocket className="ml-2 h-5 w-5" />
          </button>
          <button className="btn-secondary">
            Explore Resources
          </button>
        </div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-edu-purple to-edu-blue opacity-20"></div>
      
      {/* Animated Background Bubbles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute bg-white opacity-10 rounded-full animate-bubble" style={{ top: '10%', left: '20%', width: '80px', height: '80px' }}></div>
        <div className="absolute bg-white opacity-10 rounded-full animate-bubble" style={{ top: '30%', right: '10%', width: '60px', height: '60px' }}></div>
        <div className="absolute bg-white opacity-10 rounded-full animate-bubble" style={{ bottom: '20%', left: '30%', width: '100px', height: '100px' }}></div>
        <div className="absolute bg-white opacity-10 rounded-full animate-bubble" style={{ bottom: '10%', right: '20%', width: '40px', height: '40px' }}></div>
      </div>
    </section>
  );
};

export default Hero;

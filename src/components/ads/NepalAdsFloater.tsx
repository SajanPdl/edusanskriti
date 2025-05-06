
import React, { useState, useEffect } from 'react';
import { X, Flag, Mountain } from 'lucide-react';

export const NepalAdsFloater = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 320, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Show ad after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    
    // Add event listeners for dragging
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Constrain to viewport
      const maxX = window.innerWidth - 300;
      const maxY = window.innerHeight - 250;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed z-50 select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '280px'
      }}
    >
      <div 
        className="rounded-lg overflow-hidden shadow-lg border border-white/20 backdrop-blur-sm"
        onMouseDown={handleMouseDown}
      >
        {/* Nepali-style header with flag colors */}
        <div 
          className="cursor-move p-2 flex justify-between items-center" 
          style={{ 
            background: 'linear-gradient(135deg, #DC143C 0%, #003893 100%)',
            borderBottom: '3px solid #FFF'
          }}
        >
          <div className="flex items-center">
            <div className="mr-2 text-white">
              <Flag size={18} />
            </div>
            <span className="font-bold text-white">Nepal Study Resources</span>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Ad content with Nepal theme */}
        <div className="bg-white/90 dark:bg-gray-800/90 p-4">
          <div className="mb-3 text-center relative">
            {/* Mountain icon for Nepal theme */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-10">
              <Mountain size={100} className="text-[#003893]" />
            </div>
            
            <div className="inline-block p-1 rounded bg-gradient-to-r from-[#DC143C] to-[#003893]">
              <span className="text-sm font-bold text-white">SPECIAL OFFER</span>
            </div>
          </div>

          <div className="text-center mb-3">
            <h3 className="text-lg font-bold text-[#003893]">Complete SEE Preparation Pack</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">Exclusive materials from top Nepal educators</p>
          </div>

          <div className="text-center p-2 mb-3 border border-dashed border-[#DC143C] rounded bg-white dark:bg-gray-700">
            <span className="text-2xl font-bold text-[#DC143C]">50% OFF</span>
            <p className="text-xs text-gray-700 dark:text-gray-300">Limited time offer - Expires soon!</p>
          </div>

          <button
            className="w-full py-2 px-4 bg-gradient-to-r from-[#DC143C] to-[#003893] hover:opacity-90 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Download Now
          </button>
        </div>
        
        {/* Nepali pattern footer - triangle pattern inspired by flag */}
        <div className="h-6 relative overflow-hidden" 
             style={{ background: 'linear-gradient(to right, #DC143C, #003893)' }}>
          <div className="absolute inset-0 flex">
            {[...Array(14)].map((_, i) => (
              <div key={i} className="h-full w-4" 
                   style={{
                     borderRight: i % 2 === 0 ? '8px solid transparent' : 'none',
                     borderLeft: i % 2 !== 0 ? '8px solid transparent' : 'none',
                     borderBottom: `6px solid ${i % 2 === 0 ? 'white' : 'transparent'}`
                   }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

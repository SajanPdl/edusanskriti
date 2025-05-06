
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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
        className="rounded-lg overflow-hidden shadow-lg"
        onMouseDown={handleMouseDown}
      >
        {/* Nepalese-style header */}
        <div 
          className="cursor-move p-2 flex justify-between items-center" 
          style={{ 
            background: 'linear-gradient(135deg, #9b87f5 0%, #7E69AB 100%)',
            borderBottom: '3px solid #FEC6A1'
          }}
        >
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2 bg-white rounded-full p-1">
              <div className="w-full h-full bg-red-600 rounded-full"></div>
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
        
        {/* Ad content */}
        <div className="bg-gray-50 p-4">
          <div className="mb-3 text-center">
            <div className="inline-block p-1 rounded bg-gradient-to-r from-[#FEC6A1] to-[#F97316]">
              <span className="text-sm font-bold text-white">SPECIAL OFFER</span>
            </div>
          </div>

          <div className="text-center mb-3">
            <h3 className="text-lg font-bold text-[#7E69AB]">Complete Class 10 SEE Prep Pack</h3>
            <p className="text-sm text-gray-700">Exclusive materials from top Nepal educators</p>
          </div>

          <div className="text-center p-2 mb-3 border border-dashed border-[#9b87f5] rounded bg-white">
            <span className="text-2xl font-bold text-[#F97316]">50% OFF</span>
            <p className="text-xs text-gray-700">Offer valid until this week</p>
          </div>

          <button
            className="w-full py-2 px-4 bg-[#F97316] hover:bg-[#E45800] text-white font-bold rounded-full transition-colors duration-300"
          >
            Download Now
          </button>
        </div>
        
        {/* Nepali pattern footer */}
        <div 
          className="h-6" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, #9b87f5, #9b87f5 10px, #7E69AB 10px, #7E69AB 20px)'
          }}
        ></div>
      </div>
    </div>
  );
};

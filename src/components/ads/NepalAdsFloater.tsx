
import React, { useState, useEffect } from 'react';
import { X, Flag, Mountain, Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NepalAdsFloaterProps {
  premium?: boolean;
}

export const NepalAdsFloater = ({ premium = false }: NepalAdsFloaterProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 320, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [adFrequency, setAdFrequency] = useState<'low' | 'medium' | 'high'>('medium');
  
  // If premium, don't show ads
  useEffect(() => {
    if (premium) {
      setIsVisible(false);
      return;
    }
    
    // Show ad after a delay based on frequency
    const delays = {
      low: 5000,
      medium: 2000,
      high: 1000
    };
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delays[adFrequency]);
    
    return () => clearTimeout(timer);
  }, [premium, adFrequency]);

  // Handle dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (settingsOpen) return; // Don't allow dragging when settings are open
    
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
    
    // Store in localStorage that the user closed the ad
    localStorage.setItem('adsClosedTime', Date.now().toString());
  };
  
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
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
      >
        {/* Nepali-style header with flag colors */}
        <div 
          className="cursor-move p-2 flex justify-between items-center" 
          style={{ 
            background: 'linear-gradient(135deg, #DC143C 0%, #003893 100%)',
            borderBottom: '3px solid #FFF'
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center">
            <div className="mr-2 text-white">
              <Flag size={18} />
            </div>
            <span className="font-bold text-white">Nepal Study Resources</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleSettings}
              className="text-white hover:text-gray-200 focus:outline-none mr-1"
            >
              <Settings size={16} />
            </button>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        {settingsOpen ? (
          <div className="bg-white/90 dark:bg-gray-800/90 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
                <ArrowLeft size={16} className="mr-1 cursor-pointer" onClick={toggleSettings} />
                Ad Settings
              </h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                  Ad Frequency
                </label>
                <select
                  value={adFrequency}
                  onChange={(e) => setAdFrequency(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Upgrade to premium to remove all advertisements
                </p>
                <Button size="sm" className="w-full bg-gradient-to-r from-[#DC143C] to-[#003893] hover:opacity-90">
                  Upgrade to Premium
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

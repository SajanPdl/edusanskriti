
import React, { useEffect, useRef } from 'react';

type AdSize = 'banner' | 'sidebar' | 'large-rectangle';
type AdNetwork = 'google' | 'adsterra' | 'sponsor';

interface AdvertisementProps {
  size: AdSize;
  network: AdNetwork;
  id?: string;
  className?: string;
  sponsorImage?: string;
  sponsorUrl?: string;
  sponsorName?: string;
}

const Advertisement = ({ 
  size, 
  network, 
  id = 'ad-container', 
  className = '',
  sponsorImage,
  sponsorUrl,
  sponsorName
}: AdvertisementProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This is where we would initialize different ad networks
    if (network === 'google') {
      // Google AdSense implementation would go here
      console.log('Google AdSense ad initialized');
      // In a real implementation, you would include the Google AdSense script
      // and configure it to display ads in the container
    } else if (network === 'adsterra') {
      // AdsTerra implementation would go here
      console.log('AdsTerra ad initialized');
      // In a real implementation, you would include the AdsTerra script
      // and configure it to display ads in the container
    }
    // Sponsor ads are handled directly in the JSX
  }, [network]);
  
  const getSizeClass = () => {
    switch (size) {
      case 'banner':
        return 'w-full h-[90px] md:h-[90px]';
      case 'sidebar':
        return 'w-full h-[250px] md:h-[600px]';
      case 'large-rectangle':
        return 'w-full h-[250px] md:h-[250px]';
      default:
        return 'w-full h-[90px]';
    }
  };
  
  const getContainerClass = () => {
    return size === 'sidebar' 
      ? 'ad-container-sidebar' 
      : 'ad-container';
  };
  
  // For sponsor ads, we display an image with a link
  if (network === 'sponsor' && sponsorImage && sponsorUrl) {
    return (
      <div className={`${getContainerClass()} ${getSizeClass()} ${className}`}>
        <a 
          href={sponsorUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <img 
              src={sponsorImage} 
              alt={`${sponsorName || 'Sponsor'} Advertisement`} 
              className="max-w-full max-h-full object-contain"
            />
            {sponsorName && (
              <p className="text-xs text-gray-500 mt-1">Sponsored by {sponsorName}</p>
            )}
          </div>
        </a>
      </div>
    );
  }
  
  // For ad networks (Google, AdsTerra)
  return (
    <div 
      id={id}
      ref={adContainerRef}
      className={`${getContainerClass()} ${getSizeClass()} ${className}`}
    >
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        <p>Advertisement</p>
      </div>
    </div>
  );
};

export default Advertisement;


import React, { createContext, useState, useContext, useEffect } from 'react';

// Types for our ads configuration
type AdType = 'sponsor' | 'adsterra' | 'adsense';
type AdPosition = 'sidebar' | 'content' | 'footer' | 'header';

interface AdConfig {
  id: string;
  type: AdType;
  position: AdPosition;
  adCode: string;
  active: boolean;
}

interface AdsContextType {
  ads: AdConfig[];
  toggleAd: (id: string) => void;
  addAd: (ad: Omit<AdConfig, 'id'>) => void;
  removeAd: (id: string) => void;
  getAdsByPosition: (position: AdPosition) => AdConfig[];
  isUserPremium: boolean;
  setIsUserPremium: (isPremium: boolean) => void;
}

const AdsContext = createContext<AdsContextType | undefined>(undefined);

// Sample initial ads
const initialAds: AdConfig[] = [
  {
    id: 'sidebar-sponsor-1',
    type: 'sponsor',
    position: 'sidebar',
    adCode: '<div class="text-center p-4"><img src="https://placehold.co/300x250/f5f5f5/6A26A9?text=Study+Material+Ad" alt="Study Material Ad" class="mx-auto" /><p class="mt-2 font-medium">Premium Study Materials</p><a href="/study-materials" class="text-indigo-600 text-sm">Explore Now</a></div>',
    active: true
  },
  {
    id: 'content-adsense-1',
    type: 'adsense',
    position: 'content',
    adCode: '<!-- Replace with actual AdSense code --><div class="p-4 border border-gray-200 dark:border-gray-700 rounded text-center"><span class="text-gray-500">Google AdSense Placeholder</span></div>',
    active: true
  },
  {
    id: 'footer-adsterra-1',
    type: 'adsterra',
    position: 'footer',
    adCode: '<!-- Replace with actual Adsterra code --><div class="p-4 border border-gray-200 dark:border-gray-700 rounded text-center"><span class="text-gray-500">Adsterra Placeholder</span></div>',
    active: true
  }
];

export const AdsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ads, setAds] = useState<AdConfig[]>(initialAds);
  const [isUserPremium, setIsUserPremium] = useState(false);

  // Load ads from localStorage on mount
  useEffect(() => {
    const storedAds = localStorage.getItem('site_ads');
    if (storedAds) {
      try {
        setAds(JSON.parse(storedAds));
      } catch (e) {
        console.error('Failed to parse stored ads', e);
      }
    }
    
    const premiumStatus = localStorage.getItem('user_premium') === 'true';
    setIsUserPremium(premiumStatus);
  }, []);

  // Save ads to localStorage when they change
  useEffect(() => {
    localStorage.setItem('site_ads', JSON.stringify(ads));
  }, [ads]);

  // Toggle an ad's active status
  const toggleAd = (id: string) => {
    setAds(currentAds => 
      currentAds.map(ad => 
        ad.id === id ? { ...ad, active: !ad.active } : ad
      )
    );
  };

  // Add a new ad
  const addAd = (ad: Omit<AdConfig, 'id'>) => {
    const newAd: AdConfig = {
      ...ad,
      id: `${ad.position}-${ad.type}-${Date.now()}`
    };
    setAds(currentAds => [...currentAds, newAd]);
  };

  // Remove an ad
  const removeAd = (id: string) => {
    setAds(currentAds => currentAds.filter(ad => ad.id !== id));
  };

  // Get ads by position
  const getAdsByPosition = (position: AdPosition) => {
    // Don't show ads to premium users
    if (isUserPremium) return [];
    return ads.filter(ad => ad.position === position && ad.active);
  };

  // Set user premium status
  const handleSetPremium = (isPremium: boolean) => {
    setIsUserPremium(isPremium);
    localStorage.setItem('user_premium', isPremium.toString());
  };

  return (
    <AdsContext.Provider 
      value={{ 
        ads, 
        toggleAd, 
        addAd, 
        removeAd, 
        getAdsByPosition,
        isUserPremium,
        setIsUserPremium: handleSetPremium
      }}
    >
      {children}
    </AdsContext.Provider>
  );
};

// Custom hook to use the ads context
export const useAds = () => {
  const context = useContext(AdsContext);
  if (context === undefined) {
    throw new Error('useAds must be used within an AdsProvider');
  }
  return context;
};

export default AdsProvider;

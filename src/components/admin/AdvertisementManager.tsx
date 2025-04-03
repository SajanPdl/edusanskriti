
import { useState } from 'react';
import { 
  DollarSign, 
  Info, 
  PlusCircle, 
  Trash2, 
  Edit, 
  EyeOff, 
  Eye, 
  BarChart2, 
  ExternalLink,
  RefreshCcw,
  Image as ImageIcon,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

// Mock ad data
const adsMockData = [
  {
    id: 1,
    name: 'Premium Sidebar Banner',
    advertiser: 'XYZ Education',
    platform: 'direct',
    status: 'active',
    type: 'image',
    location: 'sidebar',
    size: '300x600',
    impressions: 5420,
    clicks: 132,
    ctr: 2.43,
    revenue: 324.50,
    startDate: '2023-05-10',
    endDate: '2023-08-10',
    imageUrl: 'https://placehold.co/300x600/f5f5f5/6A26A9?text=XYZ+Education',
    targetUrl: 'https://example.com/xyz-education'
  },
  {
    id: 2,
    name: 'Header Banner',
    advertiser: 'ABC Learning',
    platform: 'adsense',
    status: 'active',
    type: 'adsense',
    location: 'header',
    size: '728x90',
    impressions: 12540,
    clicks: 215,
    ctr: 1.71,
    revenue: 215.80,
    startDate: '2023-06-01',
    endDate: '2023-09-01',
    adsenseCode: '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>',
    adsenseSlot: 'ca-pub-1234567890123456'
  },
  {
    id: 3,
    name: 'In-Content Banner',
    advertiser: 'Test Prep Pro',
    platform: 'direct',
    status: 'paused',
    type: 'image',
    location: 'content',
    size: '468x60',
    impressions: 3210,
    clicks: 89,
    ctr: 2.77,
    revenue: 156.75,
    startDate: '2023-04-15',
    endDate: '2023-07-15',
    imageUrl: 'https://placehold.co/468x60/f5f5f5/6A26A9?text=Test+Prep+Pro',
    targetUrl: 'https://example.com/test-prep-pro'
  },
  {
    id: 4,
    name: 'Footer Banner',
    advertiser: 'Google Ads',
    platform: 'adsterra',
    status: 'active',
    type: 'adsterra',
    location: 'footer',
    size: '970x250',
    impressions: 8760,
    clicks: 143,
    ctr: 1.63,
    revenue: 189.20,
    startDate: '2023-06-15',
    endDate: '2023-09-15',
    adsterraCode: 'atOptions = { key: "value" };',
    advertiserImage: 'https://placehold.co/50x50/f5f5f5/6A26A9?text=Adsterra'
  }
];

interface Ad {
  id: number;
  name: string;
  advertiser: string;
  platform: 'direct' | 'adsense' | 'adsterra';
  status: 'active' | 'paused' | 'expired';
  type: 'image' | 'adsense' | 'adsterra';
  location: 'sidebar' | 'header' | 'content' | 'footer';
  size: string;
  impressions: number;
  clicks: number;
  ctr: number;
  revenue: number;
  startDate: string;
  endDate: string;
  imageUrl?: string;
  targetUrl?: string;
  adsenseCode?: string;
  adsenseSlot?: string;
  adsterraCode?: string;
  advertiserImage?: string;
}

const AdvertisementManager = () => {
  const [ads, setAds] = useState<Ad[]>(adsMockData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAd, setNewAd] = useState<Partial<Ad>>({
    platform: 'direct',
    type: 'image',
    location: 'sidebar',
    size: '300x600',
    status: 'active',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
    impressions: 0,
    clicks: 0,
    ctr: 0,
    revenue: 0
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAd(prev => ({...prev, [name]: value}));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewAd(prev => ({...prev, [name]: value}));
  };
  
  const handleSaveAd = () => {
    if (!newAd.name || !newAd.advertiser) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (isEditMode && editingId) {
      // Update existing ad
      setAds(prev => prev.map(ad => ad.id === editingId ? {...ad, ...newAd} as Ad : ad));
      toast.success('Advertisement updated successfully');
    } else {
      // Add new ad
      const id = Math.max(0, ...ads.map(ad => ad.id)) + 1;
      setAds(prev => [...prev, {...newAd, id} as Ad]);
      toast.success('Advertisement added successfully');
    }
    
    // Reset and close dialog
    setIsAddDialogOpen(false);
    setIsEditMode(false);
    setEditingId(null);
    setNewAd({
      platform: 'direct',
      type: 'image',
      location: 'sidebar',
      size: '300x600',
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      impressions: 0,
      clicks: 0,
      ctr: 0,
      revenue: 0
    });
  };
  
  const handleEdit = (ad: Ad) => {
    setNewAd(ad);
    setIsEditMode(true);
    setEditingId(ad.id);
    setIsAddDialogOpen(true);
  };
  
  const handleToggleStatus = (id: number) => {
    setAds(prev => prev.map(ad => {
      if (ad.id === id) {
        const newStatus = ad.status === 'active' ? 'paused' : 'active';
        return {...ad, status: newStatus};
      }
      return ad;
    }));
    
    toast.success(`Advertisement ${ads.find(ad => ad.id === id)?.status === 'active' ? 'paused' : 'activated'}`);
  };
  
  const handleDelete = (id: number) => {
    setAds(prev => prev.filter(ad => ad.id !== id));
    toast.success('Advertisement deleted successfully');
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };
  
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'direct': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'adsense': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'adsterra': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };
  
  const getLocationColor = (location: string) => {
    switch (location) {
      case 'sidebar': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400';
      case 'header': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
      case 'content': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400';
      case 'footer': return 'bg-lime-100 text-lime-800 dark:bg-lime-900/20 dark:text-lime-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };
  
  const totalRevenue = ads.reduce((sum, ad) => sum + ad.revenue, 0);
  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);
  const totalImpressions = ads.reduce((sum, ad) => sum + ad.impressions, 0);
  const overallCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Advertisement Manager</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setIsEditMode(false);
              setEditingId(null);
              setNewAd({
                platform: 'direct',
                type: 'image',
                location: 'sidebar',
                size: '300x600',
                status: 'active',
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
                impressions: 0,
                clicks: 0,
                ctr: 0,
                revenue: 0
              });
            }}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Advertisement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Advertisement' : 'Add New Advertisement'}</DialogTitle>
              <DialogDescription>
                {isEditMode ? 'Update the details of an existing advertisement' : 'Create a new advertisement to display on your platform'}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="basic">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="display">Display Options</TabsTrigger>
                <TabsTrigger value="adcode">Ad Code</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="name" className="text-right">
                      Ad Name*
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newAd.name || ''}
                      onChange={handleInputChange}
                      placeholder="e.g., Premium Sidebar Banner"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="advertiser" className="text-right">
                      Advertiser*
                    </Label>
                    <Input
                      id="advertiser"
                      name="advertiser"
                      value={newAd.advertiser || ''}
                      onChange={handleInputChange}
                      placeholder="e.g., XYZ Education"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="platform" className="text-right">
                      Platform
                    </Label>
                    <Select 
                      value={newAd.platform} 
                      onValueChange={(value) => handleSelectChange('platform', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="direct">Direct</SelectItem>
                        <SelectItem value="adsense">Google AdSense</SelectItem>
                        <SelectItem value="adsterra">Adsterra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select 
                      value={newAd.status} 
                      onValueChange={(value: any) => handleSelectChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="startDate" className="text-right">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={newAd.startDate || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="endDate" className="text-right">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={newAd.endDate || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="display" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="text-right">
                      Ad Location
                    </Label>
                    <Select 
                      value={newAd.location} 
                      onValueChange={(value: any) => handleSelectChange('location', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                        <SelectItem value="header">Header</SelectItem>
                        <SelectItem value="content">In-Content</SelectItem>
                        <SelectItem value="footer">Footer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="size" className="text-right">
                      Ad Size
                    </Label>
                    <Select 
                      value={newAd.size} 
                      onValueChange={(value) => handleSelectChange('size', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300x250">Medium Rectangle (300x250)</SelectItem>
                        <SelectItem value="300x600">Half Page (300x600)</SelectItem>
                        <SelectItem value="728x90">Leaderboard (728x90)</SelectItem>
                        <SelectItem value="970x250">Billboard (970x250)</SelectItem>
                        <SelectItem value="468x60">Banner (468x60)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {newAd.platform === 'direct' && (
                    <>
                      <div className="col-span-2">
                        <Label htmlFor="imageUrl" className="text-right">
                          Image URL
                        </Label>
                        <Input
                          id="imageUrl"
                          name="imageUrl"
                          value={newAd.imageUrl || ''}
                          onChange={handleInputChange}
                          placeholder="https://example.com/ad-image.jpg"
                        />
                        {newAd.imageUrl && (
                          <div className="mt-2 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img 
                              src={newAd.imageUrl} 
                              alt="Ad preview" 
                              className="max-w-full h-auto"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor="targetUrl" className="text-right">
                          Target URL
                        </Label>
                        <Input
                          id="targetUrl"
                          name="targetUrl"
                          value={newAd.targetUrl || ''}
                          onChange={handleInputChange}
                          placeholder="https://example.com/landing-page"
                        />
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="adcode" className="space-y-4 pt-4">
                {newAd.platform === 'adsense' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="adsenseSlot" className="text-right">
                        AdSense Ad Slot ID
                      </Label>
                      <Input
                        id="adsenseSlot"
                        name="adsenseSlot"
                        value={newAd.adsenseSlot || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., ca-pub-1234567890123456"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="adsenseCode" className="text-right">
                        AdSense Code
                      </Label>
                      <Textarea
                        id="adsenseCode"
                        name="adsenseCode"
                        value={newAd.adsenseCode || ''}
                        onChange={handleInputChange}
                        placeholder="Paste your AdSense code here"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
                
                {newAd.platform === 'adsterra' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="adsterraCode" className="text-right">
                        Adsterra Code
                      </Label>
                      <Textarea
                        id="adsterraCode"
                        name="adsterraCode"
                        value={newAd.adsterraCode || ''}
                        onChange={handleInputChange}
                        placeholder="Paste your Adsterra code here"
                        rows={6}
                      />
                    </div>
                  </div>
                )}
                
                {newAd.platform === 'direct' && (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Direct Advertisement</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      For direct advertisements, simply provide the image URL and target URL in the Display Options tab.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAd}>
                {isEditMode ? 'Update Advertisement' : 'Add Advertisement'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold">${totalRevenue.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Clicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">{totalClicks.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Impressions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Eye className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-2xl font-bold">{totalImpressions.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Average CTR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <RefreshCcw className="h-5 w-5 text-orange-500 mr-2" />
              <span className="text-2xl font-bold">{overallCTR.toFixed(2)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Advertisements Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Advertisement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Location & Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {ads.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={ad.advertiserImage || '/placeholder.svg'} />
                        <AvatarFallback>{ad.advertiser.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{ad.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{ad.advertiser}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getPlatformColor(ad.platform)} variant="outline">
                      {ad.platform.charAt(0).toUpperCase() + ad.platform.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white flex flex-col">
                      <Badge className={getLocationColor(ad.location)} variant="outline">
                        {ad.location.charAt(0).toUpperCase() + ad.location.slice(1)}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{ad.size}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {ad.impressions.toLocaleString()} impressions
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {ad.clicks.toLocaleString()} clicks ({ad.ctr.toFixed(2)}%)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600 dark:text-green-400">
                      ${ad.revenue.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStatusColor(ad.status)} variant="outline">
                      {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                    </Badge>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {new Date(ad.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleToggleStatus(ad.id)}>
                        {ad.status === 'active' ? (
                          <EyeOff className="h-4 w-4 text-amber-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-green-500" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(ad)}>
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(ad.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {ads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center">
                      <Info className="h-8 w-8 mb-2" />
                      <p className="text-lg font-medium mb-1">No advertisements found</p>
                      <p className="text-sm">Click "Add Advertisement" to create your first ad</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementManager;

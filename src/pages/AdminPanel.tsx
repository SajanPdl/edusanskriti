
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  BookText, 
  FileText, 
  Users, 
  BellRing, 
  Settings,
  Tag,
  GraduationCap,
  BarChart,
  PieChart,
  LineChart,
  TrendingUp,
  ListChecks,
  MessageSquare,
  HelpCircle,
  Globe,
  Mail
} from 'lucide-react';
import UserManagement from '@/components/admin/UserManagement';
import BlogEditor from '@/components/admin/BlogEditor';
import AdvertisementManager from '@/components/admin/AdvertisementManager';
import StudyMaterialEditor from '@/components/admin/StudyMaterialEditor';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import CategoriesManager from '@/components/admin/CategoriesManager';
import GradesManager from '@/components/admin/GradesManager';
import PastPapersManager from '@/components/admin/PastPapersManager';
import AdminSettings from '@/components/admin/AdminSettings';
import { fetchWebsiteStats, fetchUserQueries, updateQueryStatus } from '@/utils/adminDbUtils';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<any[]>([]);
  const [userQueries, setUserQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, queriesData] = await Promise.all([
          fetchWebsiteStats(),
          fetchUserQueries()
        ]);
        
        setStats(statsData);
        setUserQueries(queriesData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (activeTab === 'dashboard') {
      loadDashboardData();
    }
  }, [activeTab]);
  
  const handleQueryStatusChange = async (id: number, status: string) => {
    const success = await updateQueryStatus(id, status);
    if (success) {
      setUserQueries(userQueries.map(query => 
        query.id === id ? { ...query, status } : query
      ));
    }
  };
  
  // Calculate summary stats
  const totalUsers = 2845; // In a real app, this would come from the backend
  const totalStudyMaterials = stats.reduce((acc, stat) => acc + stat.downloads, 0);
  const totalQueries = userQueries.length;
  const openQueries = userQueries.filter(q => q.status === 'Open').length;
  
  return (
    <div className="h-screen flex flex-col">
      <AdminHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold font-playfair">Dashboard Overview</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                  <Button size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-edu-purple"></div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-white dark:bg-gray-800">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</p>
                            <h3 className="text-2xl font-bold mt-1">{totalUsers.toLocaleString()}</h3>
                            <div className="mt-2">
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                +12% from last month
                              </span>
                            </div>
                          </div>
                          <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
                            <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Progress value={75} className="h-1" />
                          <p className="text-xs text-gray-500 mt-1">75% towards the goal of 3,500</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white dark:bg-gray-800">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Study Materials</p>
                            <h3 className="text-2xl font-bold mt-1">246</h3>
                            <div className="mt-2">
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                +8% from last month
                              </span>
                            </div>
                          </div>
                          <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900">
                            <BookText className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Progress value={68} className="h-1" />
                          <p className="text-xs text-gray-500 mt-1">68% towards the goal of 350</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white dark:bg-gray-800">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Past Papers</p>
                            <h3 className="text-2xl font-bold mt-1">118</h3>
                            <div className="mt-2">
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                +15% from last month
                              </span>
                            </div>
                          </div>
                          <div className="p-3 bg-amber-100 rounded-full dark:bg-amber-900">
                            <FileText className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Progress value={59} className="h-1" />
                          <p className="text-xs text-gray-500 mt-1">59% towards the goal of 200</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white dark:bg-gray-800">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Downloads</p>
                            <h3 className="text-2xl font-bold mt-1">{totalStudyMaterials.toLocaleString()}</h3>
                            <div className="mt-2">
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                +23% from last month
                              </span>
                            </div>
                          </div>
                          <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
                            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-300" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Progress value={85} className="h-1" />
                          <p className="text-xs text-gray-500 mt-1">85% towards the goal of 10,000</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                    <Card className="bg-white dark:bg-gray-800 lg:col-span-4">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold flex items-center">
                            <TrendingUp className="h-5 w-5 mr-2 text-edu-purple" />
                            Website Performance
                          </h3>
                          <Tabs defaultValue="visits">
                            <TabsList className="bg-gray-100 dark:bg-gray-700">
                              <TabsTrigger value="visits">Visits</TabsTrigger>
                              <TabsTrigger value="downloads">Downloads</TabsTrigger>
                              <TabsTrigger value="queries">Queries</TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>
                        <div className="h-64 flex items-center justify-center">
                          {stats.length > 0 ? (
                            <div className="w-full h-full">
                              {/* Here you would use Recharts to display the data */}
                              <div className="flex h-full items-end justify-between px-2">
                                {stats.map((stat, index) => (
                                  <div key={index} className="flex flex-col items-center">
                                    <div 
                                      style={{ height: `${(stat.visits / 5000) * 100}%` }}
                                      className="w-8 bg-edu-purple/80 rounded-t-sm"
                                    ></div>
                                    <span className="text-xs mt-2 text-gray-500">{stat.month}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="text-gray-400 flex flex-col items-center">
                              <BarChart className="h-10 w-10 mb-2" />
                              <span>No data available</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white dark:bg-gray-800 lg:col-span-3">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center">
                          <PieChart className="h-5 w-5 mr-2 text-edu-purple" />
                          Content Distribution
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                              <span className="text-sm">Mathematics</span>
                            </div>
                            <span className="text-sm font-medium">42 items</span>
                            <div className="w-1/3">
                              <Progress value={42} className="h-1" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                              <span className="text-sm">Science</span>
                            </div>
                            <span className="text-sm font-medium">38 items</span>
                            <div className="w-1/3">
                              <Progress value={38} className="h-1" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                              <span className="text-sm">Computer Science</span>
                            </div>
                            <span className="text-sm font-medium">27 items</span>
                            <div className="w-1/3">
                              <Progress value={27} className="h-1" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                              <span className="text-sm">Physics</span>
                            </div>
                            <span className="text-sm font-medium">25 items</span>
                            <div className="w-1/3">
                              <Progress value={25} className="h-1" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                              <span className="text-sm">Others</span>
                            </div>
                            <span className="text-sm font-medium">18 items</span>
                            <div className="w-1/3">
                              <Progress value={18} className="h-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-white dark:bg-gray-800">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold">User Queries ({openQueries} new)</h3>
                          <Button variant="outline" size="sm">View All</Button>
                        </div>
                        <div className="space-y-4">
                          {userQueries.length > 0 ? (
                            userQueries.slice(0, 4).map((query) => (
                              <div key={query.id} className="flex items-start gap-4 pb-4 border-b last:border-0 border-gray-100 dark:border-gray-700">
                                <div className={`p-2 rounded-full ${
                                  query.status === 'Open' 
                                    ? 'bg-red-100 dark:bg-red-900'
                                    : query.status === 'Responded'
                                    ? 'bg-yellow-100 dark:bg-yellow-900'
                                    : 'bg-green-100 dark:bg-green-900'
                                }`}>
                                  <MessageSquare className={`h-4 w-4 ${
                                    query.status === 'Open' 
                                      ? 'text-red-600 dark:text-red-300'
                                      : query.status === 'Responded'
                                      ? 'text-yellow-600 dark:text-yellow-300'
                                      : 'text-green-600 dark:text-green-300'
                                  }`} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className="font-medium">{query.user_name}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                      query.status === 'Open' 
                                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                        : query.status === 'Responded'
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    }`}>
                                      {query.status}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{query.query_text}</p>
                                  <div className="flex items-center justify-between mt-2">
                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                      {new Date(query.created_at).toLocaleDateString()}
                                    </p>
                                    <div className="flex gap-1">
                                      {query.status === 'Open' && (
                                        <Button 
                                          variant="ghost" 
                                          size="sm" 
                                          className="h-7 px-2 text-xs"
                                          onClick={() => handleQueryStatusChange(query.id, 'Responded')}
                                        >
                                          Mark as Responded
                                        </Button>
                                      )}
                                      {query.status !== 'Resolved' && (
                                        <Button 
                                          variant="ghost" 
                                          size="sm" 
                                          className="h-7 px-2 text-xs"
                                          onClick={() => handleQueryStatusChange(query.id, 'Resolved')}
                                        >
                                          Resolve
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="py-4 text-center text-gray-500">
                              No queries to display
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white dark:bg-gray-800">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <Button 
                            variant="outline" 
                            className="h-auto py-3 flex flex-col items-center justify-center gap-2"
                            onClick={() => setActiveTab('materials')}
                          >
                            <BookText className="h-5 w-5" />
                            <span>Add Study Material</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            className="h-auto py-3 flex flex-col items-center justify-center gap-2"
                            onClick={() => setActiveTab('papers')}
                          >
                            <FileText className="h-5 w-5" />
                            <span>Add Past Paper</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            className="h-auto py-3 flex flex-col items-center justify-center gap-2"
                            onClick={() => setActiveTab('blogs')}
                          >
                            <FileText className="h-5 w-5" />
                            <span>Create Blog Post</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            className="h-auto py-3 flex flex-col items-center justify-center gap-2"
                            onClick={() => setActiveTab('categories')}
                          >
                            <Tag className="h-5 w-5" />
                            <span>Manage Categories</span>
                          </Button>
                        </div>
                        
                        <div className="mt-6 bg-gray-50 dark:bg-gray-800/70 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                              <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Need Help?</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Check our extensive documentation or contact support for assistance.
                              </p>
                              <div className="mt-3 flex gap-2">
                                <Button variant="outline" size="sm" className="h-8">
                                  <Globe className="h-3 w-3 mr-1" /> 
                                  Documentation
                                </Button>
                                <Button size="sm" className="h-8">
                                  <Mail className="h-3 w-3 mr-1" /> 
                                  Contact Support
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </div>
          )}
          
          {activeTab === 'materials' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold font-playfair">Study Materials</h1>
              <StudyMaterialEditor />
            </div>
          )}
          
          {activeTab === 'papers' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold font-playfair">Past Papers</h1>
              <PastPapersManager />
            </div>
          )}
          
          {activeTab === 'blogs' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold font-playfair">Blog Posts</h1>
              <BlogEditor />
            </div>
          )}
          
          {activeTab === 'ads' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold font-playfair">Advertisements</h1>
              <AdvertisementManager />
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold font-playfair">User Management</h1>
              <UserManagement />
            </div>
          )}
          
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold font-playfair">Categories Management</h1>
              <CategoriesManager />
            </div>
          )}
          
          {activeTab === 'grades' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold font-playfair">Grades Management</h1>
              <GradesManager />
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold font-playfair">Settings</h1>
              <AdminSettings />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

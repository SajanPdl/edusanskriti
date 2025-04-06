
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Users, 
  BookText, 
  FileText, 
  MessageSquare, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UserManagement from '@/components/admin/UserManagement';
import BlogEditor from '@/components/admin/BlogEditor';
import AdvertisementManager from '@/components/admin/AdvertisementManager';
import StudyMaterialsManager from '@/components/admin/StudyMaterialsManager';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import CategoriesManager from '@/components/admin/CategoriesManager';
import GradesManager from '@/components/admin/GradesManager';
import PastPapersManager from '@/components/admin/PastPapersManager';
import AdminSettings from '@/components/admin/AdminSettings';
import AnalyticsPage from '@/components/admin/AnalyticsPage';
import QueriesManager from '@/components/admin/QueriesManager';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats, fetchRecentUploads, fetchRecentQueries } from '@/utils/queryUtils';

const AdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  
  // Determine active tab based on URL path
  const getActiveTabFromPath = (path: string) => {
    if (path === '/admin' || path === '/admin/') return 'dashboard';
    const segments = path.split('/');
    return segments.length > 2 ? segments[2] : 'dashboard';
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTabFromPath(pathname));
  
  useEffect(() => {
    setActiveTab(getActiveTabFromPath(pathname));
  }, [pathname]);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'dashboard') {
      navigate('/admin');
    } else {
      navigate(`/admin/${tab}`);
    }
  };
  
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['dashboard_stats'],
    queryFn: fetchDashboardStats,
    enabled: activeTab === 'dashboard'
  });
  
  const { data: recentUploads, isLoading: isUploadsLoading } = useQuery({
    queryKey: ['recent_uploads'],
    queryFn: () => fetchRecentUploads(3),
    enabled: activeTab === 'dashboard'
  });
  
  const { data: recentQueries, isLoading: isQueriesLoading } = useQuery({
    queryKey: ['recent_queries'],
    queryFn: () => fetchRecentQueries(3),
    enabled: activeTab === 'dashboard'
  });

  return (
    <div className="h-screen flex flex-col">
      <AdminHeader />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed position for AdminSidebar with fixed width to prevent disappearing */}
        <div className="h-full w-64 flex-shrink-0 bg-indigo-900 overflow-y-auto">
          <AdminSidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>
        
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          {/* Dashboard content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">Welcome, Admin</h1>
                  <p className="text-gray-500 dark:text-gray-400">Here's what's happening today.</p>
                </div>
                <Button 
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => navigate('/admin/materials')}
                >
                  Add New Content
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                        <h3 className="text-3xl font-bold mt-1">{isStatsLoading ? "..." : stats?.totalUsers.toLocaleString()}</h3>
                        <p className="text-xs font-medium text-green-600 mt-1">{stats?.userGrowth || '+12%'} this month</p>
                      </div>
                      <div className="p-3 bg-indigo-100 rounded-full">
                        <Users className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Downloads</p>
                        <h3 className="text-3xl font-bold mt-1">{isStatsLoading ? "..." : stats?.totalDownloads.toLocaleString()}</h3>
                        <p className="text-xs font-medium text-green-600 mt-1">{stats?.downloadGrowth || '+8%'} this month</p>
                      </div>
                      <div className="p-3 bg-indigo-100 rounded-full">
                        <FileText className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Study Materials</p>
                        <h3 className="text-3xl font-bold mt-1">{isStatsLoading ? "..." : stats?.totalStudyMaterials.toLocaleString()}</h3>
                        <p className="text-xs font-medium text-green-600 mt-1">{stats?.materialsGrowth || '+15%'} this month</p>
                      </div>
                      <div className="p-3 bg-indigo-100 rounded-full">
                        <BookText className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Open Queries</p>
                        <h3 className="text-3xl font-bold mt-1">{isStatsLoading ? "..." : stats?.openQueries}</h3>
                        <p className="text-xs font-medium text-red-600 mt-1">{stats?.queriesGrowth || '+4%'} this month</p>
                      </div>
                      <div className="p-3 bg-indigo-100 rounded-full">
                        <MessageSquare className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle>Website Analytics</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {isStatsLoading ? (
                    <div className="h-80 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                  ) : (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats?.analytics || []}>
                          <defs>
                            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="visits" stroke="#8884d8" fillOpacity={1} fill="url(#colorVisits)" name="visits" />
                          <Area type="monotone" dataKey="downloads" stroke="#82ca9d" fillOpacity={1} fill="url(#colorDownloads)" name="downloads" />
                          <Area type="monotone" dataKey="queries" stroke="#ffc658" fillOpacity={1} fill="url(#colorQueries)" name="queries" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Uploads</CardTitle>
                      <Button 
                        variant="ghost" 
                        className="text-indigo-600 hover:text-indigo-800 p-0 flex items-center"
                        onClick={() => navigate('/admin/materials')}
                      >
                        View All <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    {isUploadsLoading ? (
                      <div className="py-10 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                      </div>
                    ) : recentUploads?.length ? (
                      <div className="space-y-4">
                        {recentUploads.map((upload) => (
                          <div key={upload.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-indigo-100 rounded-md">
                                <BookText className="h-5 w-5 text-indigo-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">{upload.title}</h4>
                                <p className="text-sm text-gray-500">{upload.category} • {upload.downloads} downloads</p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => navigate(`/content/${upload.id}`)}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-10 text-center text-gray-500">
                        No recent uploads found.
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Queries</CardTitle>
                      <Button 
                        variant="ghost" 
                        className="text-indigo-600 hover:text-indigo-800 p-0 flex items-center"
                        onClick={() => navigate('/admin/queries')}
                      >
                        View All <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    {isQueriesLoading ? (
                      <div className="py-10 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                      </div>
                    ) : recentQueries?.length ? (
                      <div className="space-y-4">
                        {recentQueries.map((query) => (
                          <div key={query.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-indigo-100 rounded-md">
                                <MessageSquare className="h-5 w-5 text-indigo-600" />
                              </div>
                              <div>
                                <h4 className="font-medium line-clamp-1">{query.query_text}</h4>
                                <p className="text-sm text-gray-500">{query.user_name} • <span className={query.status === 'Open' ? 'text-red-500' : 'text-green-500'}>{query.status}</span></p>
                              </div>
                            </div>
                            <Button 
                              className="bg-indigo-600 hover:bg-indigo-700 text-xs py-1 px-3 h-auto"
                              onClick={() => navigate('/admin/queries')}
                            >
                              Reply
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-10 text-center text-gray-500">
                        No recent queries found.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'materials' && <StudyMaterialsManager />}
          {activeTab === 'papers' && <PastPapersManager />}
          {activeTab === 'blogs' && <BlogEditor />}
          {activeTab === 'ads' && <AdvertisementManager />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'categories' && <CategoriesManager />}
          {activeTab === 'grades' && <GradesManager />}
          {activeTab === 'settings' && <AdminSettings />}
          {activeTab === 'analytics' && <AnalyticsPage />}
          {activeTab === 'queries' && <QueriesManager />}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

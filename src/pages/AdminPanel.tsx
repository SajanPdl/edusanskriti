
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Users, 
  BookText, 
  FileText, 
  MessageSquare, 
  Calendar,
  Plus,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample data for the charts
  const analyticsData = [
    { month: 'Jan', visits: 4000, downloads: 2400, queries: 1200 },
    { month: 'Feb', visits: 3000, downloads: 1500, queries: 900 },
    { month: 'Mar', visits: 2000, downloads: 3800, queries: 1800 },
    { month: 'Apr', visits: 2780, downloads: 3908, queries: 2200 },
    { month: 'May', visits: 4890, downloads: 4800, queries: 2500 },
    { month: 'Jun', visits: 3390, downloads: 3800, queries: 2000 },
    { month: 'Jul', visits: 4490, downloads: 4300, queries: 2100 },
  ];

  // Sample data for recent uploads
  const recentUploads = [
    { title: 'Advanced Calculus Notes', category: 'Engineering', downloads: 346 },
    { title: 'Chemistry Lab Manual', category: 'Science', downloads: 258 },
    { title: 'Java Programming Basics', category: 'Computer Science', downloads: 214 },
  ];

  // Sample data for recent queries
  const recentQueries = [
    { title: 'Unable to download PDF', user: 'Mohit Singh', status: 'Open' },
    { title: 'Question about Physics formulas', user: 'Sneha Patel', status: 'Open' },
    { title: 'Need help with Math problems', user: 'Raj Kumar', status: 'Closed' },
  ];

  return (
    <div className="h-screen flex flex-col">
      <AdminHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">Welcome, Admin</h1>
                  <p className="text-gray-500 dark:text-gray-400">Here's what's happening today.</p>
                </div>
                <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="h-4 w-4" /> Add New Content
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                        <h3 className="text-3xl font-bold mt-1">24,367</h3>
                        <p className="text-xs font-medium text-green-600 mt-1">+12% this month</p>
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
                        <h3 className="text-3xl font-bold mt-1">532,891</h3>
                        <p className="text-xs font-medium text-green-600 mt-1">+8% this month</p>
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
                        <h3 className="text-3xl font-bold mt-1">12,845</h3>
                        <p className="text-xs font-medium text-green-600 mt-1">+15% this month</p>
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
                        <h3 className="text-3xl font-bold mt-1">124</h3>
                        <p className="text-xs font-medium text-red-600 mt-1">+4% this month</p>
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
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData}>
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
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Uploads</CardTitle>
                      <Button variant="ghost" className="text-indigo-600 hover:text-indigo-800 p-0 flex items-center">
                        View All <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-4">
                      {recentUploads.map((upload, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-100 rounded-md">
                              <BookText className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{upload.title}</h4>
                              <p className="text-sm text-gray-500">{upload.category} • {upload.downloads} downloads</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Queries</CardTitle>
                      <Button variant="ghost" className="text-indigo-600 hover:text-indigo-800 p-0 flex items-center">
                        View All <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-4">
                      {recentQueries.map((query, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-100 rounded-md">
                              <MessageSquare className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{query.title}</h4>
                              <p className="text-sm text-gray-500">{query.user} • <span className={query.status === 'Open' ? 'text-red-500' : 'text-green-500'}>{query.status}</span></p>
                            </div>
                          </div>
                          <Button className="bg-indigo-600 hover:bg-indigo-700 text-xs py-1 px-3 h-auto">Reply</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'materials' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Study Materials</h1>
              <StudyMaterialEditor />
            </div>
          )}
          
          {activeTab === 'papers' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Past Papers</h1>
              <PastPapersManager />
            </div>
          )}
          
          {activeTab === 'blogs' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Blog Posts</h1>
              <BlogEditor />
            </div>
          )}
          
          {activeTab === 'ads' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Advertisements</h1>
              <AdvertisementManager />
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">User Management</h1>
              <UserManagement />
            </div>
          )}
          
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Categories Management</h1>
              <CategoriesManager />
            </div>
          )}
          
          {activeTab === 'grades' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Grades Management</h1>
              <GradesManager />
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Settings</h1>
              <AdminSettings />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

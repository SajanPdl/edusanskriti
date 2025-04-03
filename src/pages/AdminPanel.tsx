
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  GraduationCap
} from 'lucide-react';
import UserManagement from '@/components/admin/UserManagement';
import BlogEditor from '@/components/admin/BlogEditor';
import AdvertisementManager from '@/components/admin/AdvertisementManager';
import StudyMaterialEditor from '@/components/admin/StudyMaterialEditor';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import CategoriesManager from '@/components/admin/CategoriesManager';
import GradesManager from '@/components/admin/GradesManager';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="h-screen flex flex-col">
      <AdminHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Dashboard Overview</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</p>
                        <h3 className="text-2xl font-bold mt-1">2,845</h3>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Study Materials</p>
                        <h3 className="text-2xl font-bold mt-1">246</h3>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900">
                        <BookText className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Past Papers</p>
                        <h3 className="text-2xl font-bold mt-1">118</h3>
                      </div>
                      <div className="p-3 bg-amber-100 rounded-full dark:bg-amber-900">
                        <FileText className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Blog Posts</p>
                        <h3 className="text-2xl font-bold mt-1">32</h3>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
                        <FileText className="h-6 w-6 text-green-600 dark:text-green-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-start gap-4 pb-4 border-b last:border-0 border-gray-100 dark:border-gray-700">
                          <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                            <BellRing className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <p className="font-medium">New study material uploaded</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Grade 10 Mathematics Notes</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 hours ago</p>
                          </div>
                        </div>
                      ))}
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
              <p className="text-gray-500 dark:text-gray-400">Manage past papers content here.</p>
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
              <p className="text-gray-500 dark:text-gray-400">Manage system settings here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

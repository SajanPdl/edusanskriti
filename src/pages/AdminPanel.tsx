
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import {
  Upload,
  Plus,
  FileText,
  Users,
  Book,
  Edit,
  Trash2,
  LogOut,
  BarChart2,
  Download,
  MessageSquare,
  Bell,
  Search,
  LayoutDashboard,
  Settings,
  BrainCircuit,
  Newspaper,
  ImageIcon,
  Moon,
  Sun,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import BlogEditor from '@/components/admin/BlogEditor';
import AdvertisementManager from '@/components/admin/AdvertisementManager';
import UserManagement from '@/components/admin/UserManagement';

// Mock data for dashboard
const visitData = [
  { name: 'Jan', visits: 4000 },
  { name: 'Feb', visits: 3000 },
  { name: 'Mar', visits: 2000 },
  { name: 'Apr', visits: 2780 },
  { name: 'May', visits: 1890 },
  { name: 'Jun', visits: 2390 },
  { name: 'Jul', visits: 3490 }
];

const downloadData = [
  { name: 'Notes', downloads: 4200 },
  { name: 'Past Papers', downloads: 3800 },
  { name: 'Textbooks', downloads: 2900 },
  { name: 'Summaries', downloads: 2400 },
  { name: 'Lab Manuals', downloads: 1800 }
];

const pieData = [
  { name: 'Mathematics', value: 35 },
  { name: 'Physics', value: 25 },
  { name: 'Chemistry', value: 20 },
  { name: 'Biology', value: 15 },
  { name: 'Computer Science', value: 5 }
];

const COLORS = ['#6A26A9', '#2D46B9', '#F97316', '#F59E0B', '#60A5FA'];

// Mock data for study materials
const initialMaterials = [
  {
    id: 1,
    title: "Grade 10 Science Notes",
    subject: "Science",
    grade: "Grade 10",
    type: "Notes",
    downloadCount: 1245,
    fileSize: "2.4 MB",
    dateAdded: "2023-05-15"
  },
  {
    id: 2,
    title: "Engineering Mathematics",
    subject: "Mathematics",
    grade: "Engineering",
    type: "Textbook",
    downloadCount: 3210,
    fileSize: "5.8 MB",
    dateAdded: "2023-04-20"
  },
  {
    id: 3,
    title: "Grade 11 History Notes",
    subject: "History",
    grade: "Grade 11",
    type: "Notes",
    downloadCount: 854,
    fileSize: "1.7 MB",
    dateAdded: "2023-06-02"
  }
];

// Mock data for feedback messages
const initialFeedback = [
  {
    id: 1,
    name: "Aditya Sharma",
    email: "aditya.s@example.com",
    message: "I found the Physics notes very helpful for my JEE preparation. Could you add more practice problems?",
    date: "2023-06-15",
    read: true
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.p@example.com",
    message: "The website is amazing but I'm having trouble downloading files on my mobile device. Can you look into this?",
    date: "2023-06-14",
    read: false
  },
  {
    id: 3,
    name: "Rahul Gupta",
    email: "rahul.g@example.com",
    message: "Thank you for creating such a helpful resource! I'd like to request study material for NEET preparation.",
    date: "2023-06-10",
    read: false
  }
];

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [materials, setMaterials] = useState(initialMaterials);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  // New material form state
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    subject: '',
    grade: '',
    type: '',
    file: null as File | null
  });
  
  // Edit mode state
  const [editingId, setEditingId] = useState<number | null>(null);
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Check if user is logged in and is admin
    const userStr = localStorage.getItem('eduUser');
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);
      
      if (userData.role !== 'admin') {
        // Redirect non-admin users
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin panel.",
          variant: "destructive"
        });
        navigate('/');
      }
    } else {
      // Create a mock admin user for demo purposes
      const mockAdmin = {
        name: 'Admin User',
        email: 'admin@edusanskriti.com',
        role: 'admin'
      };
      localStorage.setItem('eduUser', JSON.stringify(mockAdmin));
      setUser(mockAdmin);
    }
    
    return () => clearTimeout(timer);
  }, [navigate, toast]);
  
  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  const handleLogout = () => {
    localStorage.removeItem('eduUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };
  
  const handleNewMaterialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMaterial(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewMaterial(prev => ({
        ...prev,
        file: e.target.files![0]
      }));
    }
  };
  
  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId !== null) {
      // Update existing material
      setMaterials(prev => prev.map(item => 
        item.id === editingId ? {
          ...item,
          title: newMaterial.title,
          subject: newMaterial.subject,
          grade: newMaterial.grade,
          type: newMaterial.type
        } : item
      ));
      
      toast({
        title: "Material Updated",
        description: "The study material has been updated successfully.",
      });
      
      setEditingId(null);
    } else {
      // Add new material
      const newId = Math.max(0, ...materials.map(item => item.id)) + 1;
      const today = new Date().toISOString().split('T')[0];
      const fileSize = newMaterial.file ? `${(newMaterial.file.size / (1024 * 1024)).toFixed(1)} MB` : "0 MB";
      
      setMaterials(prev => [
        ...prev,
        {
          id: newId,
          title: newMaterial.title,
          subject: newMaterial.subject,
          grade: newMaterial.grade,
          type: newMaterial.type,
          downloadCount: 0,
          fileSize,
          dateAdded: today
        }
      ]);
      
      toast({
        title: "Material Added",
        description: "New study material has been added successfully.",
      });
    }
    
    // Reset form
    setNewMaterial({
      title: '',
      subject: '',
      grade: '',
      type: '',
      file: null
    });
  };
  
  const handleEditMaterial = (id: number) => {
    const material = materials.find(item => item.id === id);
    if (material) {
      setNewMaterial({
        title: material.title,
        subject: material.subject,
        grade: material.grade,
        type: material.type,
        file: null
      });
      setEditingId(id);
      setActiveTab('upload');
    }
  };
  
  const handleDeleteMaterial = (id: number) => {
    setMaterials(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Material Deleted",
      description: "The study material has been deleted successfully.",
    });
  };
  
  const handleMarkAsRead = (id: number) => {
    setFeedback(prev => prev.map(item => 
      item.id === id ? { ...item, read: true } : item
    ));
  };
  
  const handleDeleteFeedback = (id: number) => {
    setFeedback(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Feedback Deleted",
      description: "The feedback message has been deleted.",
    });
  };
  
  const filteredMaterials = materials.filter(material => 
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const unreadCount = feedback.filter(item => !item.read).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
        {/* Sidebar Skeleton */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-md fixed inset-y-0 left-0 z-30">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {Array(6).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Main content skeleton */}
        <div className="flex-1 ml-64 p-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array(2).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md fixed inset-y-0 left-0 z-30 overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-edu-purple/90 flex items-center justify-center text-white font-bold">
              {user?.name.charAt(0) || 'A'}
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-800 dark:text-white">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'admin@edusanskriti.com'}</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-edu-purple text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('upload')}
                className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'upload' 
                    ? 'bg-edu-purple text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Upload className="w-5 h-5 mr-3" />
                Upload Materials
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('materials')}
                className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'materials' 
                    ? 'bg-edu-purple text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Book className="w-5 h-5 mr-3" />
                Manage Materials
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('blog')}
                className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'blog' 
                    ? 'bg-edu-purple text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Newspaper className="w-5 h-5 mr-3" />
                Blog Management
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'users' 
                    ? 'bg-edu-purple text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                User Management
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('ads')}
                className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'ads' 
                    ? 'bg-edu-purple text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <ImageIcon className="w-5 h-5 mr-3" />
                Advertisements
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('feedback')}
                className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'feedback' 
                    ? 'bg-edu-purple text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                User Feedback
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'settings' 
                    ? 'bg-edu-purple text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
            </li>
            
            <li className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 ml-64 p-8">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Total Materials</CardTitle>
                  <CardDescription>Across all categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-edu-purple/10 flex items-center justify-center text-edu-purple">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-3xl font-bold">{materials.length}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="text-green-500">+12%</span> from last month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Total Downloads</CardTitle>
                  <CardDescription>All resource downloads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-edu-blue/10 flex items-center justify-center text-edu-blue">
                      <Download className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-3xl font-bold">{materials.reduce((sum, item) => sum + item.downloadCount, 0).toLocaleString()}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="text-green-500">+18%</span> from last month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">User Feedback</CardTitle>
                  <CardDescription>Messages from users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-edu-orange/10 flex items-center justify-center text-edu-orange">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-3xl font-bold">{feedback.length}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="text-green-500">{unreadCount}</span> unread messages
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <Card className="col-span-1 xl:col-span-2 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Website Visits</CardTitle>
                  <CardDescription>Past 7 months traffic analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={visitData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="visits" stroke="#6A26A9" activeDot={{ r: 8 }} strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Popular Subjects</CardTitle>
                  <CardDescription>Downloaded by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1 xl:col-span-2 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Downloads by Category</CardTitle>
                  <CardDescription>Distribution across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={downloadData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="downloads" fill="#2D46B9" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Latest Feedback</CardTitle>
                  <CardDescription>Recent user messages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {feedback.slice(0, 3).map((item) => (
                      <div key={item.id} className={`p-3 rounded-lg ${item.read ? 'bg-gray-50 dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'}`}>
                        <div className="flex justify-between mb-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.date}</div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{item.message}</p>
                      </div>
                    ))}
                    
                    {feedback.length > 3 && (
                      <Button variant="link" className="w-full" onClick={() => setActiveTab('feedback')}>
                        View all feedback
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {/* Upload Materials */}
        {activeTab === 'upload' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">
              {editingId !== null ? 'Edit Study Material' : 'Upload New Study Material'}
            </h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <form onSubmit={handleAddMaterial}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title" className="block text-sm font-medium mb-2">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={newMaterial.title}
                      onChange={handleNewMaterialChange}
                      required
                      className="w-full shadow-sm"
                      placeholder="e.g., Grade 10 Science Notes"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={newMaterial.subject}
                      onChange={handleNewMaterialChange}
                      required
                      className="w-full shadow-sm"
                      placeholder="e.g., Science, Mathematics"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="grade" className="block text-sm font-medium mb-2">
                      Grade/Level
                    </Label>
                    <select
                      id="grade"
                      name="grade"
                      value={newMaterial.grade}
                      onChange={handleNewMaterialChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-edu-purple focus:border-edu-purple shadow-sm bg-white dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select Grade/Level</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                      <option value="Bachelor's">Bachelor's</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="type" className="block text-sm font-medium mb-2">
                      Material Type
                    </Label>
                    <select
                      id="type"
                      name="type"
                      value={newMaterial.type}
                      onChange={handleNewMaterialChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-edu-purple focus:border-edu-purple shadow-sm bg-white dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select Type</option>
                      <option value="Notes">Notes</option>
                      <option value="Textbook">Textbook</option>
                      <option value="Formula Sheet">Formula Sheet</option>
                      <option value="Lab Manual">Lab Manual</option>
                      <option value="Practice Sheets">Practice Sheets</option>
                      <option value="Summary">Summary</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="fileUpload" className="block text-sm font-medium mb-2">
                      File Upload
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                      <input
                        type="file"
                        id="fileUpload"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                      />
                      <label
                        htmlFor="fileUpload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {newMaterial.file ? newMaterial.file.name : 'Click to upload or drag and drop'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          PDF, DOC, DOCX, PPT, PPTX (Max 10MB)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  {editingId !== null && (
                    <Button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setNewMaterial({
                          title: '',
                          subject: '',
                          grade: '',
                          type: '',
                          file: null
                        });
                      }}
                      variant="outline"
                      className="mr-4"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="btn-primary"
                  >
                    {editingId !== null ? 'Update Material' : 'Upload Material'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Manage Materials */}
        {activeTab === 'materials' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Manage Study Materials</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search materials..."
                    className="pl-10 pr-4 py-2 w-full md:w-auto min-w-[250px]"
                  />
                </div>
                <Button
                  onClick={() => {
                    setActiveTab('upload');
                    setEditingId(null);
                    setNewMaterial({
                      title: '',
                      subject: '',
                      grade: '',
                      type: '',
                      file: null
                    });
                  }}
                  className="btn-primary flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New
                </Button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Grade/Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Downloads
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date Added
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredMaterials.length > 0 ? (
                      filteredMaterials.map(material => (
                        <tr key={material.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900 dark:text-white">{material.title}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{material.fileSize}</div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-edu-purple border-edu-purple/20">
                              {material.subject}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-edu-blue border-edu-blue/20">
                              {material.grade}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className="bg-orange-50 dark:bg-orange-900/20 text-edu-orange border-edu-orange/20">
                              {material.type}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            {material.downloadCount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            {material.dateAdded}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                onClick={() => handleEditMaterial(material.id)}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-edu-blue hover:text-edu-purple hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={() => handleDeleteMaterial(material.id)}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                          No materials found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Blog Management */}
        {activeTab === 'blog' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Blog Management</h1>
            <BlogEditor />
          </div>
        )}
        
        {/* User Management */}
        {activeTab === 'users' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">User Management</h1>
            <UserManagement />
          </div>
        )}
        
        {/* Advertisement Management */}
        {activeTab === 'ads' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Advertisement Management</h1>
            <AdvertisementManager />
          </div>
        )}
        
        {/* User Feedback */}
        {activeTab === 'feedback' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">User Feedback</h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              {feedback.length > 0 ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {feedback.map(item => (
                    <div 
                      key={item.id} 
                      className={`p-6 ${!item.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
                            {item.name}
                            {!item.read && (
                              <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                New
                              </Badge>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.email} • {item.date}
                          </p>
                        </div>
                        <div className="flex">
                          {!item.read && (
                            <Button
                              onClick={() => handleMarkAsRead(item.id)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-edu-blue hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              title="Mark as read"
                            >
                              <Bell className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDeleteFeedback(item.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">
                        {item.message}
                      </p>
                      
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">Reply</Button>
                        {item.read && (
                          <Button variant="outline" size="sm" className="text-gray-500">Archive</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium mb-2">No feedback messages yet</h4>
                  <p>When users send feedback, it will appear here.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Settings */}
        {activeTab === 'settings' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how the site looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Switch between light and dark theme
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="dark-mode"
                        checked={darkMode}
                        onCheckedChange={setDarkMode}
                      />
                      {darkMode ? (
                        <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {['#6A26A9', '#2D46B9', '#F97316', '#10B981', '#7C3AED'].map((color) => (
                        <button
                          key={color}
                          className="w-full aspect-square rounded-full border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-edu-purple"
                          style={{ backgroundColor: color }}
                          aria-label={`Select ${color} as primary color`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="font-size">Font Size</Label>
                    <select
                      id="font-size"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-edu-purple focus:border-edu-purple shadow-sm bg-white dark:bg-gray-700 dark:text-white"
                    >
                      <option value="small">Small</option>
                      <option value="medium" selected>Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Appearance Settings</Button>
                </CardFooter>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Receive emails for important updates
                      </div>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-materials">New Materials</Label>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Get notified when new materials are uploaded
                      </div>
                    </div>
                    <Switch id="new-materials" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="user-feedback">User Feedback</Label>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Get notified when users submit feedback
                      </div>
                    </div>
                    <Switch id="user-feedback" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Notification Settings</Button>
                </CardFooter>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>API Integrations</CardTitle>
                  <CardDescription>Connect with third-party services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="google-analytics">Google Analytics</Label>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Track website performance
                      </div>
                    </div>
                    <Switch id="google-analytics" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="analytics-id">Analytics ID</Label>
                    <Input id="analytics-id" placeholder="UA-XXXXXXXXX-X" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="adsense">Google AdSense</Label>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Connect your AdSense account
                      </div>
                    </div>
                    <Switch id="adsense" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Integration Settings</Button>
                </CardFooter>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>AI Features</CardTitle>
                  <CardDescription>Enhanced features using artificial intelligence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="smart-search">Smart Search Recommendations</Label>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        AI-powered search suggestions for users
                      </div>
                    </div>
                    <Switch id="smart-search" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="content-summary">Content Summarization</Label>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Automatically generate summaries for study materials
                      </div>
                    </div>
                    <Switch id="content-summary" defaultChecked />
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-start">
                      <BrainCircuit className="h-5 w-5 text-edu-purple mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-edu-purple">AI Integration</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          Connect your OpenAI API key to enable advanced AI features for your educational platform.
                        </p>
                        <Button variant="outline" className="mt-3 border-edu-purple/30 text-edu-purple hover:bg-edu-purple/10">
                          Configure AI Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save AI Settings</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Need Help?</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Check out our documentation or contact support
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Documentation
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

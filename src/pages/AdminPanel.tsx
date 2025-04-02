
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar 
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
  Search
} from 'lucide-react';

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
      // Redirect to login if not logged in
      toast({
        title: "Authentication Required",
        description: "Please log in to access the admin panel.",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [navigate, toast]);
  
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md fixed inset-y-0 left-0 z-30 overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-edu-purple flex items-center justify-center text-white font-bold">
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
                <BarChart2 className="w-5 h-5 mr-3" />
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
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-edu-purple/10 flex items-center justify-center text-edu-purple">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Materials</h3>
                    <p className="text-2xl font-bold">{materials.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-edu-blue/10 flex items-center justify-center text-edu-blue">
                    <Download className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Downloads</h3>
                    <p className="text-2xl font-bold">{materials.reduce((sum, item) => sum + item.downloadCount, 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-edu-orange/10 flex items-center justify-center text-edu-orange">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">User Feedback</h3>
                    <p className="text-2xl font-bold">{feedback.length}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-lg font-bold mb-4">Website Visits</h2>
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
                      <Line type="monotone" dataKey="visits" stroke="#6A26A9" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-lg font-bold mb-4">Downloads by Category</h2>
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
              </div>
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newMaterial.title}
                      onChange={handleNewMaterialChange}
                      required
                      className="w-full border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-edu-purple focus:ring focus:ring-edu-purple/20 bg-white dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Grade 10 Science Notes"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={newMaterial.subject}
                      onChange={handleNewMaterialChange}
                      required
                      className="w-full border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-edu-purple focus:ring focus:ring-edu-purple/20 bg-white dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Science, Mathematics"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Grade/Level
                    </label>
                    <select
                      name="grade"
                      value={newMaterial.grade}
                      onChange={handleNewMaterialChange}
                      required
                      className="w-full border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-edu-purple focus:ring focus:ring-edu-purple/20 bg-white dark:bg-gray-700 dark:text-white"
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Material Type
                    </label>
                    <select
                      name="type"
                      value={newMaterial.type}
                      onChange={handleNewMaterialChange}
                      required
                      className="w-full border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-edu-purple focus:ring focus:ring-edu-purple/20 bg-white dark:bg-gray-700 dark:text-white"
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      File Upload
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
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
                    <button
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
                      className="mr-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    {editingId !== null ? 'Update Material' : 'Upload Material'}
                  </button>
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
              <div className="flex">
                <div className="relative mr-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search materials..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-edu-purple/50 bg-white dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <button
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
                </button>
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
                        <tr key={material.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900 dark:text-white">{material.title}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{material.fileSize}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {material.subject}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {material.grade}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {material.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {material.downloadCount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {material.dateAdded}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEditMaterial(material.id)}
                              className="text-edu-blue hover:text-edu-indigo mr-3"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteMaterial(material.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
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
                              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                New
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.email} • {item.date}
                          </p>
                        </div>
                        <div className="flex">
                          {!item.read && (
                            <button
                              onClick={() => handleMarkAsRead(item.id)}
                              className="text-edu-blue hover:text-edu-indigo mr-2"
                              title="Mark as read"
                            >
                              <Bell className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteFeedback(item.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  No feedback messages yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

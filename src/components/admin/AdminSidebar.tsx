
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  BookText, 
  FileText, 
  Users, 
  Bell, 
  Settings,
  Tag,
  GraduationCap,
  ChevronRight,
  User,
  LogOut,
  BarChart2,
  MessageSquare,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const [contentOpen, setContentOpen] = React.useState(true);
  const { toast } = useToast();
  
  const sidebarItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      id: 'dashboard'
    },
    {
      name: 'Study Materials',
      icon: BookText,
      id: 'materials'
    },
    {
      name: 'Past Papers',
      icon: FileText,
      id: 'papers'
    },
    {
      name: 'Users',
      icon: Users,
      id: 'users'
    },
    {
      name: 'Queries',
      icon: MessageSquare,
      id: 'queries'
    },
    {
      name: 'Advertisement',
      icon: Bell,
      id: 'ads'
    },
    {
      name: 'Analytics',
      icon: BarChart2,
      id: 'analytics'
    },
    {
      name: 'Settings',
      icon: Settings,
      id: 'settings'
    }
  ];
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out of the admin panel.",
    });
  };
  
  return (
    <aside className="w-64 h-full bg-indigo-900 text-white flex flex-col">
      <div className="p-6 border-b border-indigo-800">
        <h2 className="text-xl font-bold">EduSanskriti</h2>
        <p className="text-indigo-300 text-sm">Admin Dashboard</p>
      </div>
      
      <div className="p-4 border-b border-indigo-800">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-indigo-300" />
          <div>
            <p className="text-xs text-indigo-300">4/6/2025</p>
            <p className="text-sm font-medium">01:23 PM</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-indigo-100 hover:text-white hover:bg-indigo-800",
                activeTab === item.id && "bg-indigo-700 text-white"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
            </Button>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-indigo-800">
        <div className="flex items-center p-2 rounded-md bg-indigo-800">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
            <User className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-indigo-300">admin@edusanskriti.com</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full mt-2 justify-start text-red-300 hover:text-red-200 hover:bg-indigo-800"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

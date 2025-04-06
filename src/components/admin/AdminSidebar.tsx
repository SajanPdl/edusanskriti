
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
  LogOut
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
      name: 'Content',
      icon: FileText,
      id: 'content',
      subItems: [
        {
          name: 'Study Materials',
          id: 'materials',
          icon: BookText
        },
        {
          name: 'Past Papers',
          id: 'papers',
          icon: FileText
        },
        {
          name: 'Blog Posts',
          id: 'blogs',
          icon: FileText
        },
        {
          name: 'Advertisements',
          id: 'ads',
          icon: Bell
        }
      ]
    },
    {
      name: 'Categories',
      icon: Tag,
      id: 'categories'
    },
    {
      name: 'Grades',
      icon: GraduationCap,
      id: 'grades'
    },
    {
      name: 'Users',
      icon: Users,
      id: 'users'
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
    <aside className="w-64 h-full bg-gray-900 text-white flex flex-col">
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            if (item.subItems) {
              return (
                <Collapsible 
                  key={item.id}
                  open={contentOpen}
                  onOpenChange={setContentOpen}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "w-full justify-between text-gray-300 hover:text-white hover:bg-gray-800",
                        (activeTab === 'materials' || activeTab === 'papers' || activeTab === 'blogs' || activeTab === 'ads') && "bg-gray-800 text-white"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className={cn(
                        "h-4 w-4 transition-transform",
                        contentOpen && "rotate-90"
                      )} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-9 space-y-1 mt-1">
                    {item.subItems.map((subItem) => (
                      <Button
                        key={subItem.id}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800",
                          activeTab === subItem.id && "bg-gray-800 text-white"
                        )}
                        onClick={() => setActiveTab(subItem.id)}
                      >
                        <subItem.icon className="h-4 w-4 mr-2" />
                        <span>{subItem.name}</span>
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            }
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800",
                  activeTab === item.id && "bg-gray-800 text-white"
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </Button>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
            <User className="h-4 w-4 text-gray-300" />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <button 
              className="text-xs text-gray-400 hover:text-gray-300"
              onClick={handleLogout}
            >
              <span className="flex items-center">
                <LogOut className="h-3 w-3 mr-1" />
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;

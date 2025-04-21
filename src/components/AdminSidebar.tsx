
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from '@/components/ui/sidebar';
import { Home, MapPin, Image, MessageSquare, Settings } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { title: 'Dashboard', icon: Home, path: '/admin' },
    { title: 'Destinations', icon: MapPin, path: '/admin/destinations' },
    { title: 'Gallery', icon: Image, path: '/admin/gallery' },
    { title: 'Reviews', icon: MessageSquare, path: '/admin/reviews' },
    { title: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-2">
          <h2 className="text-xl font-bold text-hurulu-teal">
            Hurulu <span className="text-hurulu-brown">Admin</span>
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={isActive(item.path)}
                tooltip={item.title}
              >
                <Link to={item.path}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2 text-sm text-gray-500">
          <Link to="/" className="flex items-center hover:text-hurulu-teal transition-colors">
            <span>← Return to website</span>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;


import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarRail, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/AdminSidebar';

const AdminLayout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarRail />
        
        <div className="flex-1">
          <div className="flex h-12 items-center border-b px-4">
            <SidebarTrigger />
            <h1 className="ml-4 text-lg font-medium">Admin Dashboard</h1>
          </div>
          
          <SidebarInset className="p-4">
            <Outlet />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;

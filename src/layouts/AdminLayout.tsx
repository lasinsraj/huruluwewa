
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const allowedAdmins = ['lasinsraj@gmail.com'];

const AdminLayout = () => {
  const { user, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // If not authenticated, redirect to login
      if (!user) {
        navigate('/admin/login');
        return;
      }
      
      // Check if user is an allowed admin
      const userIsAdmin = user.email && allowedAdmins.includes(user.email);
      setIsAdmin(userIsAdmin);
      
      if (!userIsAdmin) {
        // User is logged in but not an admin
        console.log('Not an admin:', user.email);
      }
    }
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-hurulu-teal"></div>
      </div>
    );
  }

  // If not an admin but authenticated, show access denied
  if (!isAdmin && user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Alert variant="destructive" className="max-w-lg mb-4">
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to access the admin area.
            Currently logged in as {user.email}.
          </AlertDescription>
        </Alert>
        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-3">
              {user && (
                <span className="text-sm text-gray-500">
                  Logged in as {user.email}
                </span>
              )}
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

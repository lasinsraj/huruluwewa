
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';

const AdminNotFound = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-6">The admin page you are looking for does not exist.</p>
      
      {!user && (
        <Alert variant="destructive" className="max-w-lg mb-6">
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You must be logged in to access admin pages.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex gap-4">
        <Link to="/admin">
          <Button>Return to Dashboard</Button>
        </Link>
        
        {!user && (
          <Link to="/admin/login">
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AdminNotFound;

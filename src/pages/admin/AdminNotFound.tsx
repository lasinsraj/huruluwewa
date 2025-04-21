
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-6">The admin page you are looking for does not exist.</p>
      <Link to="/admin">
        <Button>Return to Dashboard</Button>
      </Link>
    </div>
  );
};

export default AdminNotFound;

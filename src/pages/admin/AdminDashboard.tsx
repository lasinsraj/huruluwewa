
import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-lg mb-2">Destinations</h3>
          <p className="text-3xl font-bold text-hurulu-teal">1</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-lg mb-2">Gallery Images</h3>
          <p className="text-3xl font-bold text-hurulu-teal">0</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-lg mb-2">Reviews</h3>
          <p className="text-3xl font-bold text-hurulu-teal">0</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <a href="/admin/destinations/add" className="bg-hurulu-teal text-white px-4 py-2 rounded-md hover:bg-hurulu-teal/90 transition-colors">
            Add Destination
          </a>
          <a href="/admin/gallery/add" className="bg-hurulu-brown text-white px-4 py-2 rounded-md hover:bg-hurulu-brown/90 transition-colors">
            Upload Image
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

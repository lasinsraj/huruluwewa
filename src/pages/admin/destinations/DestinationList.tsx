
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';

// Mock data for destination
const mockDestinations = [
  {
    id: '1',
    name: 'Hurulu Wewa',
    location: 'North Central Province, Sri Lanka',
    shortDescription: 'A paradise for wildlife enthusiasts and nature lovers.',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e'
  }
];

const DestinationList = () => {
  const [destinations, setDestinations] = useState(mockDestinations);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      setDestinations(prev => prev.filter(dest => dest.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Destinations</h2>
        <Link to="/admin/destinations/add">
          <Button>
            <Plus size={16} />
            Add Destination
          </Button>
        </Link>
      </div>

      {destinations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No destinations found</h3>
          <p className="mt-1 text-gray-500">Get started by creating a new destination.</p>
          <div className="mt-6">
            <Link to="/admin/destinations/add">
              <Button>
                <Plus size={16} />
                Add Destination
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {destinations.map((destination) => (
                <tr key={destination.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img 
                          className="h-10 w-10 rounded-md object-cover" 
                          src={destination.imageUrl} 
                          alt={destination.name} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{destination.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {destination.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {destination.shortDescription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link to={`/admin/destinations/edit/${destination.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit size={16} />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(destination.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DestinationList;


import React from 'react';
import { MapPin, Calendar, Star, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Destination = {
  id: string;
  name: string;
  location: string;
  short_description: string;
  image_url?: string;
};

type DestinationSidebarProps = {
  currentDestinationId: string;
  otherDestinations: Destination[];
};

const DestinationSidebar = ({ currentDestinationId, otherDestinations }: DestinationSidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-hurulu-light rounded-lg p-6 shadow-md border border-gray-100 sticky top-24">
      <h3 className="text-xl font-semibold text-hurulu-dark mb-4">Essential Information</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-hurulu-teal mt-1 mr-3" />
          <div>
            <h4 className="font-medium text-hurulu-dark">Location</h4>
            <p className="text-gray-600">Hurulu Forest Reserve, Sri Lanka</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Calendar className="w-5 h-5 text-hurulu-teal mt-1 mr-3" />
          <div>
            <h4 className="font-medium text-hurulu-dark">Best Time to Visit</h4>
            <p className="text-gray-600">May to September (dry season) for optimal wildlife viewing</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Star className="w-5 h-5 text-hurulu-teal mt-1 mr-3" />
          <div>
            <h4 className="font-medium text-hurulu-dark">Highlights</h4>
            <ul className="text-gray-600 list-disc pl-4 mt-1">
              <li>Elephant herds</li>
              <li>Bird watching</li>
              <li>Safari experiences</li>
              <li>Camping opportunities</li>
              <li>Photography</li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-start">
          <Info className="w-5 h-5 text-hurulu-teal mt-1 mr-3" />
          <div>
            <h4 className="font-medium text-hurulu-dark">Travel Tips</h4>
            <ul className="text-gray-600 list-disc pl-4 mt-1">
              <li>Bring binoculars for wildlife viewing</li>
              <li>Wear neutral-colored clothing</li>
              <li>Early morning safaris offer the best wildlife sightings</li>
              <li>Pack sunscreen and insect repellent</li>
              <li>Carry sufficient water</li>
              <li>Respect wildlife and follow guide instructions</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          {otherDestinations.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-hurulu-dark mb-2">Other Destinations</h4>
              <div className="space-y-2">
                {otherDestinations
                  .filter(d => d.id !== currentDestinationId)
                  .slice(0, 3)
                  .map(dest => (
                    <div 
                      key={dest.id}
                      className="flex items-center p-2 rounded hover:bg-white transition-colors cursor-pointer"
                      onClick={() => navigate(`/destination/${dest.id}`)}
                    >
                      <div className="h-10 w-10 rounded overflow-hidden mr-2">
                        <img 
                          src={dest.image_url || "https://via.placeholder.com/40"} 
                          alt={dest.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-hurulu-dark">{dest.name}</p>
                        <p className="text-xs text-gray-500">{dest.location}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <button className="btn-primary w-full">Plan Your Visit</button>
        </div>
      </div>
    </div>
  );
};

export default DestinationSidebar;

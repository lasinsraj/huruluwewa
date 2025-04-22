
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type Destination = {
  id: string;
  name: string;
  location: string;
  short_description: string;
  image_url?: string;
};

const DestinationHighlights = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('destinations')
          .select('id, name, location, short_description, image_url')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        
        setDestinations(data || []);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-hurulu-dark">Popular Destinations</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our handpicked selection of the most breathtaking locations in Sri Lanka, each offering unique experiences and unforgettable memories.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-hurulu-teal" />
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No destinations available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Link 
                to={`/destination/${destination.id}`} 
                key={destination.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={destination.image_url || 'https://via.placeholder.com/640x360'} 
                    alt={destination.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-hurulu-dark mb-2">{destination.name}</h3>
                  <p className="text-hurulu-sand mb-4">{destination.location}</p>
                  <p className="text-gray-600 mb-4 line-clamp-3">{destination.short_description}</p>
                  <div className="flex justify-end">
                    <span className="text-hurulu-teal font-medium">Explore →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/destination" className="btn-secondary">
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationHighlights;

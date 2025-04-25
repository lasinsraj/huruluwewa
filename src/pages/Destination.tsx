import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useParams, useNavigate } from 'react-router-dom';
import DestinationHero from '@/components/destination/DestinationHero';
import DestinationItineraries from '@/components/destination/DestinationItineraries';
import DestinationSidebar from '@/components/destination/DestinationSidebar';
import DestinationMap from '@/components/destination/DestinationMap';
import DestinationAbout from '@/components/destination/DestinationAbout';

type Destination = {
  id: string;
  name: string;
  location: string;
  short_description: string;
  full_description: string;
  image_url?: string;
  map_url?: string;
  created_at?: string;
  updated_at?: string;
};

const itineraries = [
  {
    title: "1-Day Safari Adventure",
    description: "Perfect for a quick visit to experience the wildlife of Hurulu Wewa.",
    activities: [
      "Early morning safari ride to spot elephants and other wildlife",
      "Picnic lunch by the reservoir",
      "Bird watching in the evening",
      "Sunset viewing point"
    ],
    price: "$50-100 per person"
  },
  {
    title: "2-Day Nature Immersion",
    description: "A more comprehensive experience with overnight camping.",
    activities: [
      "Day 1: Morning safari, nature walk, and afternoon relaxation",
      "Day 1 Evening: Campfire dinner and stargazing",
      "Day 2: Sunrise photography, second safari ride, local village visit",
      "Day 2 Evening: Cultural performance and farewell dinner"
    ],
    price: "$150-250 per person"
  },
  {
    title: "5-Day Complete Adventure",
    description: "The ultimate Hurulu Wewa experience with nearby attractions.",
    activities: [
      "Days 1-2: Comprehensive Hurulu Wewa exploration with multiple safaris",
      "Day 3: Visit to Ritigala Ancient Monastery and nature walks",
      "Day 4: Minneriya or Kaudulla National Park excursion",
      "Day 5: Cultural sites visit and local cuisine experience",
      "Optional add-ons: Sigiriya Rock Fortress, Dambulla Cave Temple"
    ],
    price: "$400-650 per person"
  }
];

const Destination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    console.log("Current ID param:", id);
    fetchDestinations();
  }, []);

  useEffect(() => {
    if (id) {
      console.log("Fetching specific destination with ID:", id);
      fetchDestination(id);
    }
  }, [id]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      console.log("All destinations fetched:", data);
      setAllDestinations(data || []);
      
      if (data && data.length > 0 && !id) {
        console.log("No ID provided, using first destination:", data[0]);
        setDestination(data[0]);
        navigate(`/destination/${data[0].id}`, { replace: true });
      } else if (data && data.length === 0) {
        toast({
          title: "No destinations found",
          description: "Please add some destinations in the admin panel.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Error fetching destinations:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load destinations",
        variant: "destructive"
      });
    } finally {
      if (!id) {
        setLoading(false);
      }
    }
  };

  const fetchDestination = async (destinationId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', destinationId)
        .single();
      
      if (error) {
        console.error("Error fetching destination:", error);
        throw error;
      }
      
      console.log("Specific destination fetched:", data);
      setDestination(data);
    } catch (error: any) {
      console.error('Error fetching destination:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load destination",
        variant: "destructive"
      });
      
      navigate('/destination');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-10 w-10 animate-spin text-hurulu-teal mr-2" />
          <p>Loading destination...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!destination && !loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <h1 className="heading-1 text-hurulu-dark mb-4">No Destination Found</h1>
          <p className="text-lg text-gray-600 mb-6">
            We couldn't find the destination you're looking for.
          </p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/')}
          >
            Return to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {destination && (
          <>
            <DestinationHero
              name={destination.name}
              shortDescription={destination.short_description}
              imageUrl={destination.image_url}
            />
            
            <section className="section-spacing bg-white">
              <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <DestinationAbout 
                      name={destination.name}
                      description={destination.full_description}
                    />
                    
                    <DestinationItineraries itineraries={itineraries} />
                  </div>
                  
                  <div className="lg:col-span-1">
                    <DestinationSidebar
                      currentDestinationId={destination.id}
                      otherDestinations={allDestinations}
                    />
                  </div>
                </div>
              </div>
            </section>
            
            <DestinationMap name={destination.name} mapUrl={destination.map_url} />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Destination;

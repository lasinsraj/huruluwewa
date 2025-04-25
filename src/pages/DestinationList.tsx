
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DestinationCard from "@/components/DestinationCard";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

type Destination = {
  id: string;
  name: string;
  location: string;
  short_description: string;
  image_url?: string;
  category?: "restaurants" | "hotel" | "activity";
  featured?: boolean;
  price?: string;
  reviews_count?: number;
  rating?: number;
  address?: string;
  avatar_url?: string;
};

const DUMMY_CATEGORIES = ["restaurants", "activity", "hotel"];

const getMockedDestination = (d: any, i: number): Destination => ({
  ...d,
  category: DUMMY_CATEGORIES[i % DUMMY_CATEGORIES.length],
  featured: i % 2 === 0,
  price: "$500/month",
  reviews_count: (i + 2) % 4,
  rating: [5, 4.5, 3.9, 0][i % 4],
  address: d.location,
  avatar_url: "https://randomuser.me/api/portraits/men/" + (10 + i) + ".jpg"
});

const DestinationList = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("destinations")
        .select("id, name, location, short_description, image_url");
      if (error) {
        setDestinations([]);
        setLoading(false);
        return;
      }
      const cards = (data || []).map((d, i) => getMockedDestination(d, i));
      setDestinations(cards);
      setLoading(false);
    };
    fetchDestinations();
  }, []);

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="font-semibold text-xl md:text-2xl text-hurulu-dark mb-6">
          {destinations.length > 0 ? `${destinations.length} Places` : "Destinations"}
        </div>
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-hurulu-teal" />
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No destinations found.</p>
          </div>
        ) : (
          <div className={isMobile ? "flex flex-col gap-4" : "grid md:grid-cols-2 lg:grid-cols-3 gap-6"}>
            {destinations.map((dest) => (
              <Link key={dest.id} to={`/destination/${dest.id}`} className="block">
                <DestinationCard destination={dest} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DestinationList;

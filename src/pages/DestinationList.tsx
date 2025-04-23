
import React, { useEffect, useState } from "react";
import { Loader2, Grid2x2, List } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DestinationCard from "@/components/DestinationCard";
import { Link } from "react-router-dom";

type Destination = {
  id: string;
  name: string;
  location: string;
  short_description: string;
  image_url?: string;
  // Extra/placeholder fields for demo
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
  address: d.location, // use location as address for now
  // For avata, simulate
  avatar_url: "https://randomuser.me/api/portraits/men/" + (10 + i) + ".jpg"
});

const DestinationList = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");

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
      // Add mock data for category, price, etc for demo
      const cards = (data || []).map((d, i) => getMockedDestination(d, i));
      setDestinations(cards);
      setLoading(false);
    };
    fetchDestinations();
  }, []);

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div className="font-semibold text-xl text-hurulu-dark">
            {destinations.length > 0 ? `${destinations.length} Places` : "Destinations"}
          </div>
          <div className="flex items-center gap-3">
            <button
              className={`p-2 rounded-full ${view === "grid" ? "bg-hurulu-teal text-white" : "bg-gray-100 text-hurulu-dark"}`}
              onClick={() => setView("grid")}
              aria-label="Grid View"
            >
              <Grid2x2 />
            </button>
            <button
              className={`p-2 rounded-full ${view === "list" ? "bg-hurulu-teal text-white" : "bg-gray-100 text-hurulu-dark"}`}
              onClick={() => setView("list")}
              aria-label="List View"
            >
              <List />
            </button>
            <div className="ml-4 text-sm text-gray-700 font-medium">Sort by ▾</div>
          </div>
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
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "flex flex-col gap-6"
            }
          >
            {destinations.map((dest) => (
              <Link key={dest.id} to={`/destination/${dest.id}`}>
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

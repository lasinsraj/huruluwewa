
import React from "react";
import { Bookmark, MapPin, Star, Utensils, Bed, Activity } from "lucide-react";

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

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case "restaurants":
      return <Utensils className="h-5 w-5 text-white" />;
    case "hotel":
      return <Bed className="h-5 w-5 text-white" />;
    case "activity":
      return <Activity className="h-5 w-5 text-white" />;
    default:
      return <MapPin className="h-5 w-5 text-white" />;
  }
};

const DestinationCard: React.FC<{ destination: Destination }> = ({ destination }) => {
  return (
    <div className="flex flex-col rounded-2xl bg-white shadow-md hover:shadow-lg transition-all cursor-pointer relative overflow-hidden group">
      {/* Top Row: category icon, bookmark */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="bg-hurulu-teal rounded-full p-2 shadow">
          {getCategoryIcon(destination.category)}
        </div>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <button className="bg-white rounded-full p-1 shadow hover:bg-hurulu-sand transition">
          <Bookmark className="h-5 w-5 text-hurulu-teal" />
        </button>
      </div>

      {/* Image */}
      <div className="h-48 w-full bg-gray-100 relative">
        <img
          src={destination.image_url || "https://via.placeholder.com/400x280"}
          alt={destination.name}
          className="w-full h-full object-cover rounded-t-2xl"
        />
        {destination.featured && (
          <span className="absolute bottom-2 left-2 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            Featured
          </span>
        )}
        {/* Avatar for demo */}
        {destination.avatar_url && (
          <img
            src={destination.avatar_url}
            alt="User"
            className="absolute bottom-2 right-2 h-8 w-8 rounded-full border-2 border-white shadow"
          />
        )}
      </div>

      {/* Card content */}
      <div className="flex-1 flex flex-col px-5 pt-4 pb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <span className="capitalize">{destination.category || "Activity"}</span>
          <span>·</span>
          <span>{destination.location || "Sri Lanka"}</span>
        </div>
        <h3 className="font-bold text-lg text-hurulu-dark mb-1 line-clamp-2">
          {destination.name}
        </h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-2 text-hurulu-teal" />
          <span>{destination.address || "Address, Sri Lanka"}</span>
        </div>
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="font-semibold text-hurulu-dark">{destination.rating?.toFixed(1) || "0.0"}</span>
          <span className="text-gray-400 text-xs">
            ({destination.reviews_count || 0} {destination.reviews_count === 1 ? "review" : "reviews"})
          </span>
        </div>
        {/* Price */}
        <div className="flex-1 flex items-end mt-auto">
          <span className="text-hurulu-teal font-bold text-base">
            {destination.price || "Contact"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;

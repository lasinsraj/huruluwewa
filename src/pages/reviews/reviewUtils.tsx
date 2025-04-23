
import React from "react";
import { Star, StarHalf, StarOff } from "lucide-react";

// Helper for rendering stars
export function renderStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<StarHalf key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
    } else {
      stars.push(<StarOff key={i} className="h-5 w-5 text-gray-300" />);
    }
  }
  return stars;
}

// Helper for selector UI in form
export function renderRatingSelector(currentRating: number, onClick: (v: number) => void) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onClick(star)}
          className="p-1"
          aria-label={`Rate ${star} stars`}
        >
          <Star
            className={`h-6 w-6 ${
              star <= currentRating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

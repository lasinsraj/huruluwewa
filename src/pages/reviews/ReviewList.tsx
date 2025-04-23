
import React from 'react';
import ReviewCard from "./ReviewCard";

interface Review {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  image?: string;
}

interface ReviewListProps {
  reviews: Review[];
  currentPage: number;
  totalPages: number;
  onPaginate: (page: number) => void;
  renderStars: (rating: number) => React.ReactNode[];
}

import { ChevronLeft, ChevronRight } from "lucide-react";

const ReviewList: React.FC<ReviewListProps> = ({ reviews, currentPage, totalPages, onPaginate, renderStars }) => {
  return (
    <>
      {reviews.length > 0 ? (
        <div className="space-y-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} renderStars={renderStars} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No reviews found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPaginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-hurulu-teal hover:bg-hurulu-light'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onPaginate(idx + 1)}
                className={`h-10 w-10 rounded-md ${
                  currentPage === idx + 1
                    ? 'bg-hurulu-teal text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => onPaginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-hurulu-teal hover:bg-hurulu-light'
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewList;

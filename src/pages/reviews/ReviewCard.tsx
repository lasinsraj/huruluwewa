
import { Star, StarHalf, StarOff } from 'lucide-react';

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

interface ReviewCardProps {
  review: Review;
  renderStars: (rating: number) => React.ReactNode[];
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, renderStars }) => (
  <div className="bg-hurulu-light rounded-lg p-6 shadow-md border border-gray-100">
    <div className="flex items-start">
      <img
        src={review.avatar}
        alt={review.name}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div className="flex-1">
        <div className="flex flex-wrap justify-between items-start">
          <div>
            <h3 className="font-semibold text-hurulu-dark">{review.name}</h3>
            <p className="text-sm text-gray-600">{review.location}</p>
          </div>
          <div className="text-sm text-gray-500">{review.date}</div>
        </div>
        <div className="flex mt-2">{renderStars(review.rating)}</div>
        <h4 className="font-medium text-lg mt-3 mb-2">{review.title}</h4>
        <p className="text-gray-700">{review.text}</p>
        {review.image && (
          <div className="mt-4">
            <img
              src={review.image}
              alt="Review photo"
              className="rounded-lg max-h-52 object-cover"
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ReviewCard;

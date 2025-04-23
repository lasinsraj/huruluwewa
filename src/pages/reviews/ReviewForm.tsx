
import React from 'react';

interface ReviewFormProps {
  formData: {
    name: string;
    location: string;
    rating: number;
    title: string;
    text: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onRatingChange: (rating: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  renderRatingSelector: () => React.ReactNode;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  formData,
  onChange,
  onRatingChange,
  onSubmit,
  renderRatingSelector,
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
        Your Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        required
        value={formData.name}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hurulu-teal focus:border-transparent"
      />
    </div>

    <div>
      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
        Location
      </label>
      <input
        type="text"
        id="location"
        name="location"
        required
        value={formData.location}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hurulu-teal focus:border-transparent"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Rating
      </label>
      {renderRatingSelector()}
    </div>

    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
        Review Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        required
        value={formData.title}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hurulu-teal focus:border-transparent"
      />
    </div>

    <div>
      <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
        Your Review
      </label>
      <textarea
        id="text"
        name="text"
        rows={5}
        required
        value={formData.text}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hurulu-teal focus:border-transparent"
      />
    </div>

    <div>
      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
        Add a Photo (Optional)
      </label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hurulu-teal focus:border-transparent"
      />
    </div>

    <div className="pt-2">
      <button type="submit" className="btn-primary w-full">
        Submit Review
      </button>
    </div>
  </form>
);

export default ReviewForm;

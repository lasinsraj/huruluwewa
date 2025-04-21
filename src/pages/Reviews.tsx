
import { useState } from 'react';
import { Star, StarHalf, StarOff, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

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

const Reviews = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewFormData, setReviewFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    title: '',
    text: '',
  });
  
  const reviewsPerPage = 3;
  
  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "United Kingdom",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      title: "Unforgettable Wildlife Experience",
      text: "Our safari experience at Hurulu Wewa was absolutely incredible! We saw so many elephants in their natural habitat. The guides were knowledgeable and passionate about wildlife conservation. Definitely a highlight of our Sri Lanka trip!",
      date: "April 15, 2023",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Singapore",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 4,
      title: "Beautiful Landscapes",
      text: "The landscape around Hurulu Wewa is breathtaking, especially during sunset. I got some amazing photographs that captured the essence of Sri Lankan wilderness. The camping facilities were good, but bring mosquito repellent!",
      date: "March 3, 2023"
    },
    {
      id: 3,
      name: "Priya Sharma",
      location: "India",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      title: "Amazing Biodiversity",
      text: "As a wildlife enthusiast, Hurulu Wewa exceeded my expectations. The biodiversity is amazing, and we were lucky enough to spot rare bird species. The local guides have incredible knowledge about the ecosystem. A must-visit for nature lovers!",
      date: "February 19, 2023",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
    },
    {
      id: 4,
      name: "John Smith",
      location: "USA",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      rating: 4,
      title: "Great Safari Experience",
      text: "We had a wonderful time on our safari at Hurulu Wewa. The elephant herds were majestic, and our guide was very informative. The only downside was the bumpy roads, but that's part of the adventure!",
      date: "January 7, 2023"
    },
    {
      id: 5,
      name: "Emma Wilson",
      location: "Australia",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
      rating: 3,
      title: "Mixed Experience",
      text: "While the wildlife and scenery were beautiful, I found the facilities somewhat lacking. The safari was wonderful, but our accommodation was basic. If you're expecting luxury, this might not be for you, but the natural beauty makes up for it.",
      date: "December 12, 2022"
    }
  ];
  
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRatingChange = (rating: number) => {
    setReviewFormData(prev => ({ ...prev, rating }));
  };
  
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Review Submitted!",
      description: "Thank you for sharing your experience. Your review will be published after moderation.",
    });
    
    setReviewFormData({
      name: '',
      location: '',
      rating: 5,
      title: '',
      text: '',
    });
  };
  
  const renderStars = (rating: number) => {
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
  };
  
  const renderRatingSelector = () => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(star)}
            className="p-1"
            aria-label={`Rate ${star} stars`}
          >
            <Star 
              className={`h-6 w-6 ${
                star <= reviewFormData.rating 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        <section className="section-spacing bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="heading-1 text-hurulu-dark mb-4">Visitor Reviews</h1>
              <p className="text-lg text-gray-600">
                Read about the experiences of travelers who have explored Hurulu Wewa or share your own adventure.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="heading-3 text-hurulu-dark mb-6">Recent Reviews</h2>
                
                {currentReviews.length > 0 ? (
                  <div className="space-y-8">
                    {currentReviews.map((review) => (
                      <div 
                        key={review.id} 
                        className="bg-hurulu-light rounded-lg p-6 shadow-md border border-gray-100"
                      >
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
                            
                            <div className="flex mt-2">
                              {renderStars(review.rating)}
                            </div>
                            
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
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
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
                      
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => paginate(index + 1)}
                          className={`h-10 w-10 rounded-md ${
                            currentPage === index + 1
                              ? 'bg-hurulu-teal text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
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
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 sticky top-24">
                  <h2 className="heading-3 text-hurulu-dark mb-6">Share Your Experience</h2>
                  
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={reviewFormData.name}
                        onChange={handleReviewChange}
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
                        value={reviewFormData.location}
                        onChange={handleReviewChange}
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
                        value={reviewFormData.title}
                        onChange={handleReviewChange}
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
                        value={reviewFormData.text}
                        onChange={handleReviewChange}
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reviews;

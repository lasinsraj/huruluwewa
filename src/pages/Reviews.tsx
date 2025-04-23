import { useState } from 'react';
import { Star, StarHalf, StarOff, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import ReviewList from './reviews/ReviewList';
import ReviewForm from './reviews/ReviewForm';
import { renderStars, renderRatingSelector } from './reviews/reviewUtils';

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
                <ReviewList
                  reviews={currentReviews}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPaginate={paginate}
                  renderStars={renderStars}
                />
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 sticky top-24">
                  <h2 className="heading-3 text-hurulu-dark mb-6">Share Your Experience</h2>
                  <ReviewForm
                    formData={reviewFormData}
                    onChange={handleReviewChange}
                    onRatingChange={handleRatingChange}
                    onSubmit={handleReviewSubmit}
                    renderRatingSelector={() =>
                      renderRatingSelector(reviewFormData.rating, handleRatingChange)
                    }
                  />
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

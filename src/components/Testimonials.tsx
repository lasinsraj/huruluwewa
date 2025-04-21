
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "United Kingdom",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      text: "Our safari experience at Hurulu Wewa was absolutely incredible! We saw so many elephants in their natural habitat. The guides were knowledgeable and passionate about wildlife conservation. Definitely a highlight of our Sri Lanka trip!"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Singapore",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 4,
      text: "The landscape around Hurulu Wewa is breathtaking, especially during sunset. I got some amazing photographs that captured the essence of Sri Lankan wilderness. The camping facilities were good, but bring mosquito repellent!"
    },
    {
      id: 3,
      name: "Priya Sharma",
      location: "India",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      text: "As a wildlife enthusiast, Hurulu Wewa exceeded my expectations. The biodiversity is amazing, and we were lucky enough to spot rare bird species. The local guides have incredible knowledge about the ecosystem. A must-visit for nature lovers!"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 text-hurulu-dark mb-4">What Our Visitors Say</h2>
          <p className="text-lg text-gray-600">
            Discover the experiences of travelers who have explored the natural wonders of Hurulu Wewa.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-hurulu-light rounded-lg p-8 shadow-md">
                    <div className="flex items-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <blockquote className="text-lg italic text-gray-700 mb-6">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4" 
                      />
                      <div>
                        <h4 className="font-semibold text-hurulu-dark">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-hurulu-teal' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

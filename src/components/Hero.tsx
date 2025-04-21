
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen">
      {/* Hero Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1472396961693-142e6e269027"
          alt="Hurulu Wewa Wildlife Sanctuary"
          className="w-full h-full object-cover animate-image-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="container-custom relative h-full flex flex-col justify-center text-white">
        <div className="max-w-2xl mt-24 animate-fade-in">
          <h1 className="heading-1 mb-4 leading-tight">Discover the Natural Wonders of Hurulu Wewa</h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Experience the breathtaking landscapes, vibrant wildlife, and rich cultural heritage of Sri Lanka's hidden gem.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">
              Plan Your Visit
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="btn-secondary">
              Explore Gallery
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-12 w-8 rounded-full border-2 border-white flex items-start justify-center pt-2">
          <div className="h-2 w-1 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

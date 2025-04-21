
import { useState } from 'react';
import { X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);

  const categories = ["all", "wildlife", "landscape", "water", "culture", "nature"];

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      alt: "Wildlife at Hurulu Wewa",
      category: "wildlife"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      alt: "Scenic landscape of Hurulu Wewa",
      category: "landscape"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      alt: "Forest surrounding Hurulu Wewa",
      category: "nature"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
      alt: "Trees in Hurulu forest reserve",
      category: "nature"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      alt: "Sunrise at Hurulu Wewa",
      category: "landscape"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      alt: "Waterways in Hurulu Wewa",
      category: "water"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
      alt: "Mountain view near Hurulu Wewa",
      category: "landscape"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      alt: "Elephants in natural habitat",
      category: "wildlife"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      alt: "River running through Hurulu Wewa",
      category: "water"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      alt: "Dense forest vegetation",
      category: "nature"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
      alt: "Ancient trees in the reserve",
      category: "nature"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      alt: "Sunset over Hurulu Wewa",
      category: "landscape"
    }
  ];

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeCategory);

  const openLightbox = (image: GalleryImage) => {
    setCurrentImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (!currentImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === currentImage.id);
    let newIndex;
    
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    setCurrentImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        <section className="section-spacing bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="heading-1 text-hurulu-dark mb-4">Photo Gallery</h1>
              <p className="text-lg text-gray-600">
                Explore the breathtaking beauty of Hurulu Wewa through our collection of stunning photographs.
              </p>
            </div>
            
            {/* Category Filter */}
            <div className="flex justify-center mb-12 overflow-x-auto pb-2">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full capitalize transition-colors ${
                      activeCategory === category
                        ? "bg-hurulu-teal text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square overflow-hidden rounded-lg shadow-md image-hover-zoom cursor-pointer"
                  onClick={() => openLightbox(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-hurulu-teal/80 mb-2 inline-block capitalize">
                        {image.category}
                      </span>
                      <p className="font-medium">{image.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 rounded-full p-3 text-white hover:bg-white/20 transition-colors"
            onClick={() => navigateImage("prev")}
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 rounded-full p-3 text-white hover:bg-white/20 transition-colors"
            onClick={() => navigateImage("next")}
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          
          <img 
            src={currentImage.src} 
            alt={currentImage.alt} 
            className="max-w-full max-h-[80vh] object-contain"
          />
          
          <div className="absolute bottom-6 left-0 right-0 text-center text-white">
            <p className="font-medium">{currentImage.alt}</p>
            <p className="text-sm text-gray-300 capitalize">Category: {currentImage.category}</p>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Gallery;

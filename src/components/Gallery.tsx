
import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      alt: "Wildlife at Hurulu Wewa",
      category: "Wildlife"
    },
    {
      src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      alt: "Scenic landscape of Hurulu Wewa",
      category: "Landscape"
    },
    {
      src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      alt: "Forest surrounding Hurulu Wewa",
      category: "Nature"
    },
    {
      src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
      alt: "Trees in Hurulu forest reserve",
      category: "Nature"
    },
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      alt: "Sunrise at Hurulu Wewa",
      category: "Landscape"
    },
    {
      src: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      alt: "Waterways in Hurulu Wewa",
      category: "Water"
    }
  ];

  const openLightbox = (imageSrc: string) => {
    setCurrentImage(imageSrc);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <section className="section-spacing bg-hurulu-light">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="heading-2 text-hurulu-dark mb-4">Explore Our Gallery</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Get inspired by the breathtaking landscapes and wildlife of Hurulu Wewa through our carefully curated photo gallery.
            </p>
          </div>
          <Link to="/gallery" className="flex items-center text-hurulu-teal font-medium mt-4 md:mt-0 group">
            View All Photos
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="relative image-hover-zoom rounded-lg overflow-hidden shadow-md aspect-[4/3] cursor-pointer"
              onClick={() => openLightbox(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <span className="text-xs font-medium px-2 py-1 rounded bg-hurulu-teal/80 mb-2 inline-block">
                    {image.category}
                  </span>
                  <p className="font-medium">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          <img 
            src={currentImage} 
            alt="Enlarged view" 
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;

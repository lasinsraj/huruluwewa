
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalleryHeader from './gallery/GalleryHeader';
import CategoryFilter from './gallery/CategoryFilter';
import GalleryGrid from './gallery/GalleryGrid';
import GalleryLightbox from './gallery/GalleryLightbox';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

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

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter(image => image.category === activeCategory);

  const openLightbox = (image: GalleryImage) => {
    setCurrentImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

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
            <GalleryHeader />

            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />

            <GalleryGrid
              images={filteredImages}
              onImageClick={openLightbox}
            />
          </div>
        </section>
      </main>

      {lightboxOpen && currentImage && (
        <GalleryLightbox
          currentImage={currentImage}
          onClose={closeLightbox}
          onPrev={() => navigateImage("prev")}
          onNext={() => navigateImage("next")}
        />
      )}

      <Footer />
    </div>
  );
};

export default Gallery;


import React from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

interface GalleryLightboxProps {
  currentImage: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  currentImage,
  onClose,
  onPrev,
  onNext
}) => (
  <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
    <button
      className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
      onClick={onClose}
      aria-label="Close"
    >
      <X size={32} />
    </button>

    <button
      className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 rounded-full p-3 text-white hover:bg-white/20 transition-colors"
      onClick={onPrev}
      aria-label="Previous image"
    >
      <ArrowLeft size={24} />
    </button>

    <button
      className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 rounded-full p-3 text-white hover:bg-white/20 transition-colors"
      onClick={onNext}
      aria-label="Next image"
    >
      <ArrowRight size={24} />
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
);

export default GalleryLightbox;

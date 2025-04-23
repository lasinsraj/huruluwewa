
import React from 'react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {images.map((image) => (
      <div
        key={image.id}
        className="relative aspect-square overflow-hidden rounded-lg shadow-md image-hover-zoom cursor-pointer"
        onClick={() => onImageClick(image)}
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
);

export default GalleryGrid;

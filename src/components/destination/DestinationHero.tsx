
import React from 'react';

type DestinationHeroProps = {
  name: string;
  shortDescription: string;
  imageUrl: string;
};

const DestinationHero = ({ name, shortDescription, imageUrl }: DestinationHeroProps) => {
  return (
    <section className="relative h-[60vh]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1469474968028-56623f02e42e"}
          alt={`${name} landscape`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
      </div>
      
      <div className="container-custom relative h-full flex flex-col justify-center text-white">
        <div className="max-w-2xl">
          <h1 className="heading-1 mb-4">{name}</h1>
          <p className="text-lg md:text-xl text-white/90">
            {shortDescription}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DestinationHero;

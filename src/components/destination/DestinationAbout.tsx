
import React from 'react';

type DestinationAboutProps = {
  name: string;
  description: string;
};

const DestinationAbout = ({ name, description }: DestinationAboutProps) => {
  return (
    <div>
      <h2 className="heading-2 text-hurulu-dark mb-6">About {name}</h2>
      <div className="prose max-w-none text-gray-700">
        <p className="mb-4">{description}</p>
      </div>
    </div>
  );
};

export default DestinationAbout;

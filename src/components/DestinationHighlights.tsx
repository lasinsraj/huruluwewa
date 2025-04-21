
import { MapPin, Camera, Tent, Users } from 'lucide-react';

const DestinationHighlights = () => {
  const highlights = [
    {
      title: "Wildlife Safari",
      description: "Encounter elephants, leopards, and various bird species in their natural habitat during exciting safari adventures.",
      icon: <MapPin className="h-8 w-8 text-hurulu-teal" />,
    },
    {
      title: "Nature Photography",
      description: "Capture stunning landscapes, rare wildlife moments, and breathtaking sunsets in this photographer's paradise.",
      icon: <Camera className="h-8 w-8 text-hurulu-teal" />,
    },
    {
      title: "Camping Experience",
      description: "Immerse yourself in nature with camping options that let you experience the wilderness up close and personal.",
      icon: <Tent className="h-8 w-8 text-hurulu-teal" />,
    },
    {
      title: "Cultural Immersion",
      description: "Connect with local communities and experience authentic Sri Lankan hospitality, traditions, and cuisine.",
      icon: <Users className="h-8 w-8 text-hurulu-teal" />,
    },
  ];

  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 text-hurulu-dark mb-4">Why Visit Hurulu Wewa?</h2>
          <p className="text-lg text-gray-600">
            Hurulu Wewa offers a unique blend of natural beauty, wildlife encounters, and cultural experiences that make it a must-visit destination for nature lovers and adventure seekers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="mb-4">{highlight.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-hurulu-dark">{highlight.title}</h3>
              <p className="text-gray-600">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationHighlights;

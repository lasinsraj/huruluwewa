
import React from 'react';

type DestinationMapProps = {
  name: string;
  mapUrl?: string;
};

const DestinationMap = ({ name, mapUrl }: DestinationMapProps) => {
  return (
    <section className="bg-hurulu-light py-12">
      <div className="container-custom">
        <h2 className="heading-2 text-hurulu-dark mb-6 text-center">Location & Map</h2>
        <div className="rounded-lg overflow-hidden shadow-lg h-96">
          <iframe
            title={`${name} Map`}
            src={mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.55024608219!2d80.54768226729283!3d8.130713918878696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcd5bf70cac095%3A0xd8b2f035f7ef4921!2sHurulu%20Eco%20Park!5e0!3m2!1sen!2sus!4v1713760323457!5m2!1sen!2sus"}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default DestinationMap;


import React from 'react';
import { Tab } from '@headlessui/react';

type Itinerary = {
  title: string;
  description: string;
  activities: string[];
  price: string;
};

type DestinationItinerariesProps = {
  itineraries: Itinerary[];
};

const DestinationItineraries = ({ itineraries }: DestinationItinerariesProps) => {
  return (
    <div className="mt-12">
      <h3 className="heading-3 text-hurulu-dark mb-6">Travel Itineraries</h3>
      
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-hurulu-light p-1">
          {itineraries.map((itinerary, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
                ${
                  selected
                    ? 'bg-hurulu-teal text-white shadow'
                    : 'text-hurulu-dark hover:bg-hurulu-sand/[0.12]'
                }`
              }
            >
              {itinerary.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          {itineraries.map((itinerary, index) => (
            <Tab.Panel
              key={index}
              className="rounded-xl bg-white p-6 shadow-md border border-gray-100"
            >
              <h4 className="text-xl font-bold text-hurulu-dark mb-2">{itinerary.title}</h4>
              <p className="text-gray-600 mb-4">{itinerary.description}</p>
              
              <div className="mb-4">
                <h5 className="font-semibold text-hurulu-dark mb-2">Activities Include:</h5>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {itinerary.activities.map((activity, actIndex) => (
                    <li key={actIndex}>{activity}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-hurulu-dark">Estimated Cost:</span>
                  <span className="ml-2 text-hurulu-teal">{itinerary.price}</span>
                </div>
                <button className="btn-primary">Book Now</button>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default DestinationItineraries;

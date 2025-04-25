
import React from 'react';
import { ArrowRight, Calendar, Clock, Lightbulb } from 'lucide-react';

type DestinationAboutProps = {
  name: string;
  description: string;
};

const DestinationAbout = ({ name, description }: DestinationAboutProps) => {
  // Parse description text and format paragraphs properly
  const formattedDescription = description
    .split('\n')
    .filter(paragraph => paragraph.trim().length > 0)
    .map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));

  // Generate AI-recommended activities based on destination name
  const aiRecommendations = generateRecommendations(name);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="heading-2 text-hurulu-dark mb-6">About {name}</h2>
        <div className="prose max-w-none text-gray-700">
          {formattedDescription.length > 0 ? (
            formattedDescription
          ) : (
            <p className="mb-4 italic text-gray-500">No detailed description available for this destination.</p>
          )}
        </div>
      </div>

      {/* AI Recommendations Section */}
      <div className="bg-hurulu-sand/20 p-6 rounded-lg border border-hurulu-sand">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-hurulu-teal" />
          <h3 className="text-lg font-semibold text-hurulu-dark">AI-Recommended Activities</h3>
        </div>
        <ul className="space-y-3">
          {aiRecommendations.map((rec, index) => (
            <li key={index} className="flex gap-2">
              <div className="mt-1 text-hurulu-teal">
                {rec.icon === 'calendar' && <Calendar className="h-4 w-4" />}
                {rec.icon === 'clock' && <Clock className="h-4 w-4" />}
                {rec.icon === 'arrow' && <ArrowRight className="h-4 w-4" />}
              </div>
              <span>{rec.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Function to generate AI-style recommendations based on destination name
function generateRecommendations(destinationName: string): Array<{icon: string, text: string}> {
  // Generic recommendations that work for any destination
  const genericRecommendations = [
    {
      icon: 'calendar',
      text: `Best time to visit ${destinationName} is during the dry season from November to April.`
    },
    {
      icon: 'clock', 
      text: `Spend at least 2-3 days in ${destinationName} to fully experience its natural beauty.`
    },
    {
      icon: 'arrow',
      text: `Don't miss the sunrise views at ${destinationName} - they're spectacular!`
    },
    {
      icon: 'arrow',
      text: 'Make sure to bring appropriate clothing for outdoor activities and changing weather.'
    }
  ];

  // Pick 3-4 recommendations randomly
  const numberOfRecs = Math.floor(Math.random() * 2) + 3; // 3 or 4
  const shuffled = [...genericRecommendations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfRecs);
}

export default DestinationAbout;


import { Tab } from '@headlessui/react';
import { MapPin, Calendar, Star, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Destination = () => {
  const itineraries = [
    {
      title: "1-Day Safari Adventure",
      description: "Perfect for a quick visit to experience the wildlife of Hurulu Wewa.",
      activities: [
        "Early morning safari ride to spot elephants and other wildlife",
        "Picnic lunch by the reservoir",
        "Bird watching in the evening",
        "Sunset viewing point"
      ],
      price: "$50-100 per person"
    },
    {
      title: "2-Day Nature Immersion",
      description: "A more comprehensive experience with overnight camping.",
      activities: [
        "Day 1: Morning safari, nature walk, and afternoon relaxation",
        "Day 1 Evening: Campfire dinner and stargazing",
        "Day 2: Sunrise photography, second safari ride, local village visit",
        "Day 2 Evening: Cultural performance and farewell dinner"
      ],
      price: "$150-250 per person"
    },
    {
      title: "5-Day Complete Adventure",
      description: "The ultimate Hurulu Wewa experience with nearby attractions.",
      activities: [
        "Days 1-2: Comprehensive Hurulu Wewa exploration with multiple safaris",
        "Day 3: Visit to Ritigala Ancient Monastery and nature walks",
        "Day 4: Minneriya or Kaudulla National Park excursion",
        "Day 5: Cultural sites visit and local cuisine experience",
        "Optional add-ons: Sigiriya Rock Fortress, Dambulla Cave Temple"
      ],
      price: "$400-650 per person"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[60vh]">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
              alt="Hurulu Wewa landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          </div>
          
          <div className="container-custom relative h-full flex flex-col justify-center text-white">
            <div className="max-w-2xl">
              <h1 className="heading-1 mb-4">Hurulu Wewa</h1>
              <p className="text-lg md:text-xl text-white/90">
                A paradise for wildlife enthusiasts and nature lovers in the heart of Sri Lanka.
              </p>
            </div>
          </div>
        </section>
        
        {/* Overview Section */}
        <section className="section-spacing bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="heading-2 text-hurulu-dark mb-6">About Hurulu Wewa</h2>
                
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    Hurulu Wewa is a man-made reservoir located in the North Central Province of Sri Lanka, surrounded by the Hurulu Forest Reserve. This remarkable ecosystem is designated as a biosphere reserve by UNESCO, recognized for its exceptional biodiversity and ecological significance.
                  </p>
                  
                  <p className="mb-4">
                    The area is famous for its large elephant population, making it a prime destination for wildlife safaris. Beyond elephants, lucky visitors might spot leopards, sloth bears, deer, and numerous bird species that call this diverse habitat home.
                  </p>
                  
                  <p className="mb-4">
                    The landscape features a mix of dry zone forest, grasslands, and wetlands, creating a picturesque setting that's particularly stunning during sunrise and sunset. Professional and amateur photographers alike find endless inspiration in the natural beauty of Hurulu Wewa.
                  </p>
                  
                  <p>
                    In addition to its natural attractions, Hurulu Wewa is located near several historically and culturally significant sites, making it an excellent base for exploring the Cultural Triangle of Sri Lanka.
                  </p>
                </div>
                
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
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-hurulu-light rounded-lg p-6 shadow-md border border-gray-100 sticky top-24">
                  <h3 className="text-xl font-semibold text-hurulu-dark mb-4">Essential Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-hurulu-teal mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium text-hurulu-dark">Location</h4>
                        <p className="text-gray-600">North Central Province, Sri Lanka, approximately 220 km from Colombo</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-hurulu-teal mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium text-hurulu-dark">Best Time to Visit</h4>
                        <p className="text-gray-600">May to September (dry season) for optimal wildlife viewing</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-hurulu-teal mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium text-hurulu-dark">Highlights</h4>
                        <ul className="text-gray-600 list-disc pl-4 mt-1">
                          <li>Elephant herds</li>
                          <li>Bird watching</li>
                          <li>Safari experiences</li>
                          <li>Camping opportunities</li>
                          <li>Photography</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Info className="w-5 h-5 text-hurulu-teal mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium text-hurulu-dark">Travel Tips</h4>
                        <ul className="text-gray-600 list-disc pl-4 mt-1">
                          <li>Bring binoculars for wildlife viewing</li>
                          <li>Wear neutral-colored clothing</li>
                          <li>Early morning safaris offer the best wildlife sightings</li>
                          <li>Pack sunscreen and insect repellent</li>
                          <li>Carry sufficient water</li>
                          <li>Respect wildlife and follow guide instructions</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <button className="btn-primary w-full">Plan Your Visit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="bg-hurulu-light py-12">
          <div className="container-custom">
            <h2 className="heading-2 text-hurulu-dark mb-6 text-center">Location & Map</h2>
            <div className="rounded-lg overflow-hidden shadow-lg h-96">
              <iframe
                title="Hurulu Wewa Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.55024608219!2d80.54768226729283!3d8.130713918878696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcd5bf70cac095%3A0xd8b2f035f7ef4921!2sHurulu%20Eco%20Park!5e0!3m2!1sen!2sus!4v1713760323457!5m2!1sen!2sus"
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Destination;

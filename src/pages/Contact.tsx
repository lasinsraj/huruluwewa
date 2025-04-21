
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        <section className="relative h-[40vh]">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
              alt="Hurulu Wewa landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          </div>
          
          <div className="container-custom relative h-full flex flex-col justify-center text-white">
            <div className="max-w-2xl">
              <h1 className="heading-1 mb-4">Contact Us</h1>
              <p className="text-lg md:text-xl text-white/90">
                Get in touch with our team for more information about Hurulu Wewa and plan your perfect trip.
              </p>
            </div>
          </div>
        </section>
        
        <ContactForm />
        
        <section className="bg-hurulu-light py-16">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="heading-2 text-hurulu-dark mb-6">Frequently Asked Questions</h2>
              <div className="mt-8 space-y-6 text-left">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-hurulu-dark mb-2">What is the best time to visit Hurulu Wewa?</h3>
                  <p className="text-gray-700">
                    The best time to visit Hurulu Wewa is during the dry season from May to September, when wildlife sightings are more frequent as animals gather around water sources.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-hurulu-dark mb-2">How do I book a safari at Hurulu Wewa?</h3>
                  <p className="text-gray-700">
                    You can book a safari through our website, by contacting us directly, or through partnered tour operators. We recommend booking in advance, especially during peak tourist seasons.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-hurulu-dark mb-2">Are there accommodation options near Hurulu Wewa?</h3>
                  <p className="text-gray-700">
                    Yes, there are various accommodation options ranging from luxury eco-lodges to budget-friendly guesthouses in nearby towns like Habarana. Some tours also offer camping experiences within designated areas.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-hurulu-dark mb-2">What should I bring for a safari tour?</h3>
                  <p className="text-gray-700">
                    We recommend bringing binoculars, a camera, sun protection (hat, sunglasses, sunscreen), insect repellent, comfortable clothing in neutral colors, and sufficient water. Early morning and evening safaris may require a light jacket.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;

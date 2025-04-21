
import { Link } from 'react-router-dom';
import { ArrowRight, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hurulu-dark text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Hurulu Wewa</h3>
            <p className="text-gray-300 mb-4">
              Discover the natural beauty and wildlife of Hurulu Wewa, 
              Sri Lanka's hidden gem for nature enthusiasts and adventure seekers.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/destination" className="text-gray-300 hover:text-white transition-colors">Destination</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-300 hover:text-white transition-colors">Reviews</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Popular Attractions Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Popular Attractions</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Hurulu Forest Reserve</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Ritigala Ancient Monastery</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Kaudulla National Park</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Minneriya National Park</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Sigiriya Rock Fortress</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter to receive the latest updates and special offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 text-gray-900 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-hurulu-teal hover:bg-hurulu-teal/90 px-4 py-2 rounded-r-md transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={20} />
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-400">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} Hurulu Wewa Explorer. All rights reserved.</p>
            <div className="flex mt-4 md:mt-0 space-x-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

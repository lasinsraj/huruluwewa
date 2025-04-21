
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-hurulu-teal">
            Hurulu <span className="text-hurulu-brown">Wewa</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/destination" className={`nav-link ${isActive('/destination') ? 'active' : ''}`}>
            Destination
          </Link>
          <Link to="/gallery" className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}>
            Gallery
          </Link>
          <Link to="/reviews" className={`nav-link ${isActive('/reviews') ? 'active' : ''}`}>
            Reviews
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            Contact
          </Link>
          <button className="btn-primary">Plan Your Visit</button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-hurulu-dark p-2" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 animate-fade-in">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''} py-2`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/destination" 
              className={`nav-link ${isActive('/destination') ? 'active' : ''} py-2`}
              onClick={closeMenu}
            >
              Destination
            </Link>
            <Link 
              to="/gallery" 
              className={`nav-link ${isActive('/gallery') ? 'active' : ''} py-2`}
              onClick={closeMenu}
            >
              Gallery
            </Link>
            <Link 
              to="/reviews" 
              className={`nav-link ${isActive('/reviews') ? 'active' : ''} py-2`}
              onClick={closeMenu}
            >
              Reviews
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''} py-2`}
              onClick={closeMenu}
            >
              Contact
            </Link>
            <button className="btn-primary w-full py-2">Plan Your Visit</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Contact' },
    { path: '/admin', label: 'Admin' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-black bg-white transition-all duration-300 ${
      scrolled ? 'shadow-lg' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 md:py-6">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-bold tracking-tight hover:opacity-60 transition-all duration-300 hover:scale-105"
          >
            Portfolio
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 lg:gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wide transition-all duration-300 relative group ${
                  isActive(link.path) 
                    ? 'opacity-100 font-medium' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ${
                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5 hover:opacity-60 transition-opacity"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col gap-4 pb-4 border-t border-black pt-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wide transition-all duration-300 py-2 ${
                  isActive(link.path) 
                    ? 'opacity-100 font-medium pl-4 border-l-2 border-black' 
                    : 'opacity-60 hover:opacity-100 hover:pl-4'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

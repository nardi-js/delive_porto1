import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button when scrolling
      setIsVisible(true);

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Hide after 2 seconds of no scrolling (tapi menu tetap open jika sudah dibuka)
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      setScrollTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={menuRef}
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
        isVisible || isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24 pointer-events-none'
      }`}
    >
      {/* Menu Items */}
      <div
        className={`absolute bottom-20 right-0 flex flex-col gap-3 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Link
          to="/admin"
          className="bg-white border-2 border-black shadow-lg px-6 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-all duration-200 whitespace-nowrap tracking-wide uppercase"
        >
          Edit Website
        </Link>
        <a
          href="https://www.delive.online/templates"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border-2 border-black shadow-lg px-6 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-all duration-200 whitespace-nowrap tracking-wide uppercase"
        >
          Buy
        </a>
        <a
          href="https://www.delive.online/templates"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border-2 border-black shadow-lg px-6 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-all duration-200 whitespace-nowrap tracking-wide uppercase"
        >
          All Template
        </a>
      </div>

      {/* Floating Button with Pulse Animation */}
      <div className="relative">
        {/* Animated Rings - hanya muncul saat belum dibuka */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full">
            <div className="absolute inset-0 rounded-full bg-black animate-ping opacity-20"></div>
            <div className="absolute inset-0 rounded-full bg-black animate-pulse opacity-30"></div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={toggleMenu}
          className="relative w-16 h-16 bg-black text-white shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 border-2 border-black hover:bg-white hover:text-black"
          aria-label="Toggle menu"
        >
          <svg
            className={`w-8 h-8 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FloatingMenu;

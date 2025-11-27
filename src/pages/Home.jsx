import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../services/dataService';
import Particles from '../components/Particles';

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadData();
    
    const handleStorageChange = () => {
      loadData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('dataUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('dataUpdated', handleStorageChange);
    };
  }, []);

  // Typing animation effect - full text
  useEffect(() => {
    if (!homeData || !homeData.typingWords || homeData.typingWords.length === 0) return;
    
    const words = homeData.typingWords;
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseEnd = 2000;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseEnd);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, wordIndex, homeData]);

  const loadData = () => {
    const data = getData('home');
    setHomeData(data);
  };

  if (!homeData) return null;

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center overflow-hidden bg-white">
      <Particles count={80} opacity={0.4} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        {/* Animated title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 tracking-tight leading-none animate-fade-in">
          {homeData.title}
        </h1>
        
        {/* Typing animation subtitle */}
        <div className="text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-12 tracking-wide flex items-center justify-center">
          <span className="font-bold relative inline-flex items-baseline animate-fade-in-delay-1">
            <span>{displayedText}</span>
            <span className="animate-blink ml-1">|</span>
          </span>
        </div>
        
        {/* Description with stagger animation */}
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto opacity-80 leading-relaxed animate-fade-in-delay-2 mb-12">
          {homeData.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-delay-3">
          <Link
            to="/about"
            className="px-8 py-4 bg-black text-white hover:opacity-80 transition-all duration-300 text-sm tracking-wide uppercase font-medium"
          >
            About Me
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 text-sm tracking-wide uppercase font-medium"
          >
            Get In Touch
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;

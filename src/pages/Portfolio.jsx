import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../services/dataService';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const loadData = () => {
    const data = getData('portfolio') || [];
    setPortfolioData(data.sort((a, b) => (a.order || 0) - (b.order || 0)));
  };

  const categories = ['All', ...new Set(portfolioData.map(item => item.category).filter(Boolean))];
  
  const filteredPortfolio = selectedCategory === 'All' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === selectedCategory);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-12 sm:mb-16 tracking-tight animate-fade-in">
          Portfolio
        </h1>
      
        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-16 pb-6 sm:pb-8 border-b border-black animate-fade-in-delay">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs sm:text-sm tracking-wide transition-all duration-300 px-4 py-2 border border-black hover:bg-black hover:text-white ${
                  selectedCategory === category 
                    ? 'bg-black text-white font-medium' 
                    : 'bg-white text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        
        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPortfolio.length === 0 ? (
            <p className="col-span-full text-center opacity-60 py-20">No portfolio items yet.</p>
          ) : (
            filteredPortfolio.map((item, index) => (
              <Link
                key={item.id}
                to={`/portfolio/${item.id}`}
                className="group animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="border border-black overflow-hidden bg-white hover:shadow-2xl transition-all duration-300">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-3">
                    {item.category && (
                      <p className="text-xs tracking-wider uppercase opacity-60">
                        {item.category}
                      </p>
                    )}
                    
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:opacity-60 transition-opacity">
                      {item.title}
                    </h2>
                    
                    <p className="text-sm sm:text-base opacity-80 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Tech Stack Preview */}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.techStack.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 border border-black/20 opacity-60"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.techStack.length > 3 && (
                          <span className="text-xs px-2 py-1 opacity-40">
                            +{item.techStack.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* View Details Arrow */}
                    <div className="flex items-center gap-2 pt-2 text-sm font-medium group-hover:gap-4 transition-all">
                      <span>View Details</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-20 pt-12 border-t border-black">
          <Link
            to="/about"
            className="px-8 py-4 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 text-sm tracking-wide uppercase font-medium"
          >
            Learn About Me
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 bg-black text-white hover:opacity-80 transition-all duration-300 text-sm tracking-wide uppercase font-medium"
          >
            Start a Project
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

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;

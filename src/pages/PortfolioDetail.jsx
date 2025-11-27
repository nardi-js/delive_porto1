import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getData } from '../services/dataService';

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadProject();
    
    const handleStorageChange = () => {
      loadProject();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('dataUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('dataUpdated', handleStorageChange);
    };
  }, [id]);

  const loadProject = () => {
    const portfolioData = getData('portfolio') || [];
    const foundProject = portfolioData.find(p => p.id === parseInt(id));
    
    if (foundProject) {
      setProject(foundProject);
    } else {
      navigate('/portfolio');
    }
  };

  if (!project) return null;

  const images = project.images && project.images.length > 0 ? project.images : [project.image];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Back Button */}
      <Link 
        to="/portfolio"
        className="inline-flex items-center gap-2 mb-8 opacity-60 hover:opacity-100 transition-opacity"
      >
        <span>←</span>
        <span>Back to Portfolio</span>
      </Link>

      {/* Project Header */}
      <div className="mb-12 animate-fade-in">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            {project.category && (
              <p className="text-sm opacity-60 tracking-wider uppercase mb-3">
                {project.category}
              </p>
            )}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              {project.title}
            </h1>
          </div>
          
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black text-white hover:opacity-80 transition-opacity text-sm tracking-wide"
              >
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors text-sm tracking-wide"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        <p className="text-xl opacity-80 leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </div>

      {/* Image Gallery */}
      <div className="mb-16 animate-fade-in-delay">
        <div className="relative aspect-video bg-gray-100 border border-black overflow-hidden group">
          <img
            src={images[currentImageIndex]}
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white border border-black flex items-center justify-center transition-all"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white border border-black flex items-center justify-center transition-all"
              >
                →
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-24 h-16 border-2 transition-all ${
                  currentImageIndex === index ? 'border-black' : 'border-gray-300 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Project Details Grid */}
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-12">
          {/* Full Description */}
          <div className="animate-slide-in">
            <h2 className="text-2xl font-bold mb-4 tracking-tight">About This Project</h2>
            <p className="text-lg opacity-80 leading-relaxed whitespace-pre-line">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-bold mb-4 tracking-tight">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 border border-black text-sm font-medium hover:bg-black hover:text-white transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8 animate-slide-in-right">
          {project.client && (
            <div className="border-l-2 border-black pl-6">
              <h3 className="text-sm opacity-60 tracking-wider uppercase mb-2">Client</h3>
              <p className="text-lg font-medium">{project.client}</p>
            </div>
          )}

          {project.role && (
            <div className="border-l-2 border-black pl-6">
              <h3 className="text-sm opacity-60 tracking-wider uppercase mb-2">Role</h3>
              <p className="text-lg font-medium">{project.role}</p>
            </div>
          )}

          {project.duration && (
            <div className="border-l-2 border-black pl-6">
              <h3 className="text-sm opacity-60 tracking-wider uppercase mb-2">Duration</h3>
              <p className="text-lg font-medium">{project.duration}</p>
            </div>
          )}

          {project.year && (
            <div className="border-l-2 border-black pl-6">
              <h3 className="text-sm opacity-60 tracking-wider uppercase mb-2">Year</h3>
              <p className="text-lg font-medium">{project.year}</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-20 pt-12 border-t border-black">
        <Link
          to="/portfolio"
          className="px-8 py-4 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 text-sm tracking-wide uppercase font-medium"
        >
          View All Projects
        </Link>
        <Link
          to="/contact"
          className="px-8 py-4 bg-black text-white hover:opacity-80 transition-all duration-300 text-sm tracking-wide uppercase font-medium"
        >
          Start Similar Project
        </Link>
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

        @keyframes fade-in-delay {
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

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
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
          animation: fade-in-delay 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default PortfolioDetail;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../services/dataService';

const About = () => {
  const [aboutData, setAboutData] = useState(null);

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
    const data = getData('about');
    setAboutData(data);
  };

  if (!aboutData) return null;

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Header Section */}
      <div className="relative z-10 mb-20 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 tracking-tight">
          {aboutData.title}
        </h1>
        
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-1">
            {aboutData.profileImage && (
              <img 
                src={aboutData.profileImage} 
                alt="Profile" 
                className="w-full aspect-square object-cover border border-black"
              />
            )}
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <p className="text-xl leading-relaxed opacity-80">
              {aboutData.description}
            </p>
            
            {aboutData.bio && (
              <p className="text-lg leading-relaxed opacity-60">
                {aboutData.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Experience Section */}
      {aboutData.experience && aboutData.experience.length > 0 && (
        <section className="relative z-10 mb-20 border-t border-black pt-12 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 tracking-tight">Experience</h2>
          <div className="space-y-8">
            {aboutData.experience.sort((a, b) => (a.order || 0) - (b.order || 0)).map((exp) => (
              <div key={exp.id} className="border-l-2 border-black pl-6">
                <h3 className="text-xl font-bold">{exp.position}</h3>
                <p className="text-lg opacity-80 mt-1">{exp.company}</p>
                <p className="text-sm opacity-60 mt-1">
                  {exp.location} • {exp.startDate} - {exp.endDate}
                </p>
                <p className="mt-3 opacity-80 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {aboutData.education && aboutData.education.length > 0 && (
        <section className="mb-20 border-t border-black pt-12">
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Education</h2>
          <div className="space-y-8">
            {aboutData.education.sort((a, b) => (a.order || 0) - (b.order || 0)).map((edu) => (
              <div key={edu.id} className="border-l-2 border-black pl-6">
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <p className="text-lg opacity-80 mt-1">{edu.institution}</p>
                <p className="text-sm opacity-60 mt-1">
                  {edu.location} • {edu.startDate} - {edu.endDate}
                </p>
                {edu.description && (
                  <p className="mt-3 opacity-80 leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {aboutData.skills && aboutData.skills.length > 0 && (
        <section className="mb-20 border-t border-black pt-12">
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {aboutData.skills.sort((a, b) => (a.order || 0) - (b.order || 0)).map((skill) => (
              <div key={skill.id}>
                <h3 className="text-lg font-bold mb-3">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items && skill.items.map((item, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 border border-black text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certificates Section */}
      {aboutData.certificates && aboutData.certificates.length > 0 && (
        <section className="mb-20 border-t border-black pt-12">
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Certificates</h2>
          <div className="space-y-6">
            {aboutData.certificates.sort((a, b) => (a.order || 0) - (b.order || 0)).map((cert) => (
              <div key={cert.id} className="border border-black p-6">
                <h3 className="text-xl font-bold">{cert.title}</h3>
                <p className="text-lg opacity-80 mt-1">{cert.issuer}</p>
                <p className="text-sm opacity-60 mt-1">
                  Issued: {cert.date} {cert.credentialId && `• ID: ${cert.credentialId}`}
                </p>
                {cert.url && (
                  <a 
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm underline opacity-60 hover:opacity-100"
                  >
                    View Certificate →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages Section */}
      {aboutData.languages && aboutData.languages.length > 0 && (
        <section className="mb-20 border-t border-black pt-12">
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Languages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {aboutData.languages.sort((a, b) => (a.order || 0) - (b.order || 0)).map((lang) => (
              <div key={lang.id} className="border border-black p-4">
                <h3 className="text-lg font-bold">{lang.language}</h3>
                <p className="text-sm opacity-60 mt-1">{lang.proficiency}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {aboutData.achievements && aboutData.achievements.length > 0 && (
        <section className="mb-20 border-t border-black pt-12">
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Achievements</h2>
          <div className="space-y-6">
            {aboutData.achievements.sort((a, b) => (a.order || 0) - (b.order || 0)).map((achievement) => (
              <div key={achievement.id} className="border-l-2 border-black pl-6">
                <h3 className="text-xl font-bold">{achievement.title}</h3>
                <p className="text-sm opacity-60 mt-1">{achievement.date}</p>
                <p className="mt-2 opacity-80 leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-20 pt-12 border-t border-black">
        <Link
          to="/portfolio"
          className="px-8 py-4 bg-black text-white hover:opacity-80 transition-all duration-300 text-sm tracking-wide uppercase font-medium"
        >
          View My Work
        </Link>
        <Link
          to="/contact"
          className="px-8 py-4 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 text-sm tracking-wide uppercase font-medium"
        >
          Let's Work Together
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

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default About;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData, addContactMessage } from '../services/dataService';

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

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
    const data = getData('contact');
    setContactData(data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addContactMessage(formData);
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (!contactData) return null;

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-12 sm:mb-16 tracking-tight animate-fade-in">
          Contact
        </h1>
      
        <div className="grid md:grid-cols-2 gap-12 sm:gap-16">
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8 animate-slide-in-left">
          <div>
            <h3 className="text-sm opacity-60 tracking-wider uppercase mb-2">Email</h3>
            <p className="text-xl">{contactData.email}</p>
          </div>
          
          {contactData.phone && (
            <div>
              <h3 className="text-sm opacity-60 tracking-wider uppercase mb-2">Phone</h3>
              <p className="text-xl">{contactData.phone}</p>
            </div>
          )}
          
          {contactData.location && (
            <div>
              <h3 className="text-sm opacity-60 tracking-wider uppercase mb-2">Location</h3>
              <p className="text-xl">{contactData.location}</p>
            </div>
          )}
          
          {contactData.social && (
            <div>
              <h3 className="text-sm opacity-60 tracking-wider uppercase mb-4">Social</h3>
              <div className="flex gap-4">
                {Object.entries(contactData.social).map(([platform, url]) => (
                  <a 
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        
          {/* Contact Form */}
          <div className="animate-slide-in-right">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm opacity-60 tracking-wider uppercase mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            
            <div>
              <label className="block text-sm opacity-60 tracking-wider uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            
            <div>
              <label className="block text-sm opacity-60 tracking-wider uppercase mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-black text-white py-4 hover:opacity-80 transition-opacity tracking-wider uppercase text-sm"
            >
              Send Message
            </button>
            
            {submitted && (
              <p className="text-center opacity-60">Message sent successfully!</p>
            )}
            </form>
          </div>
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

        @keyframes slide-in-left {
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

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Contact;

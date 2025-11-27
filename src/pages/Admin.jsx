import { useState, useEffect } from 'react';
import {
  getAllData,
  updateData,
  addItem,
  updateItem,
  deleteItem,
  resetData,
  deleteContactMessage
} from '../services/dataService';
import AboutEditorNew from '../components/admin/AboutEditorNew';
import PortfolioEditorNew from '../components/admin/PortfolioEditorNew';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [data, setData] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    const allData = getAllData();
    setData(allData);
  };

  const notifyDataUpdate = () => {
    window.dispatchEvent(new Event('dataUpdated'));
    loadAllData();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to default?')) {
      resetData();
      notifyDataUpdate();
      alert('Data has been reset to default!');
    }
  };

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white border border-black p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold tracking-tight">Admin Panel</h1>
            <button
              onClick={handleReset}
              className="px-6 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors text-sm tracking-wide"
            >
              Reset to Default
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-black mb-8">
          <div className="flex border-b border-black overflow-x-auto">
            {['home', 'about', 'portfolio', 'contact', 'messages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm tracking-wide uppercase transition-colors border-r border-black last:border-r-0 ${
                  activeTab === tab
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'home' && <HomeEditor data={data.home} onUpdate={notifyDataUpdate} />}
            {activeTab === 'about' && <AboutEditorNew data={data.about} onUpdate={notifyDataUpdate} />}
            {activeTab === 'portfolio' && <PortfolioEditorNew data={data.portfolio} onUpdate={notifyDataUpdate} />}
            {activeTab === 'contact' && <ContactEditor data={data.contact} onUpdate={notifyDataUpdate} />}
            {activeTab === 'messages' && <MessagesViewer data={data.contactMessages} onUpdate={notifyDataUpdate} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Editor Component
const HomeEditor = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process typing words from textarea
    const processedData = {
      ...formData,
      typingWords: formData.typingWordsText 
        ? formData.typingWordsText.split('\n').map(w => w.trim()).filter(Boolean)
        : formData.typingWords || []
    };
    
    updateData('home', processedData);
    onUpdate();
    alert('Home page updated!');
  };

  // Initialize typingWordsText from typingWords array
  useEffect(() => {
    if (formData.typingWords && !formData.typingWordsText) {
      setFormData({
        ...formData,
        typingWordsText: formData.typingWords.join('\n')
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Edit Home Page</h2>
      
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Subtitle</label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="4"
          className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Typing Animation Words (one per line)</label>
        <textarea
          value={formData.typingWordsText || (formData.typingWords ? formData.typingWords.join('\n') : '')}
          onChange={(e) => setFormData({ ...formData, typingWordsText: e.target.value })}
          rows="6"
          placeholder="Full Stack Developer&#10;UI/UX Designer&#10;Creative Thinker&#10;Problem Solver"
          className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black font-mono"
        />
        <p className="text-xs opacity-60 mt-1">Enter each phrase on a new line. These will appear in the typing animation.</p>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 hover:opacity-80 transition-opacity"
      >
        Save Changes
      </button>
    </form>
  );
};

// Contact Editor Component
const ContactEditor = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData('contact', formData);
    onUpdate();
    alert('Contact info updated!');
  };

  const handleSocialChange = (platform, value) => {
    setFormData({
      ...formData,
      social: {
        ...formData.social,
        [platform]: value
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Edit Contact Information</h2>
      
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Phone</label>
        <input
          type="text"
          value={formData.phone || ''}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Location</label>
        <input
          type="text"
          value={formData.location || ''}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="border-t border-black pt-6">
        <h3 className="text-lg font-bold mb-4">Social Media Links</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Twitter</label>
            <input
              type="url"
              value={formData.social?.twitter || ''}
              onChange={(e) => handleSocialChange('twitter', e.target.value)}
              className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">LinkedIn</label>
            <input
              type="url"
              value={formData.social?.linkedin || ''}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
              className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">GitHub</label>
            <input
              type="url"
              value={formData.social?.github || ''}
              onChange={(e) => handleSocialChange('github', e.target.value)}
              className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Instagram</label>
            <input
              type="url"
              value={formData.social?.instagram || ''}
              onChange={(e) => handleSocialChange('instagram', e.target.value)}
              className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 hover:opacity-80 transition-opacity"
      >
        Save Changes
      </button>
    </form>
  );
};

// Messages Viewer Component
const MessagesViewer = ({ data, onUpdate }) => {
  const messages = data || [];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteContactMessage(id);
      onUpdate();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Messages</h2>
      
      {messages.length === 0 ? (
        <p className="text-center opacity-60 py-8">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="border border-black p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{message.name}</h3>
                  <p className="text-sm opacity-60">{message.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-60">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="mt-2 px-3 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-3 opacity-80">{message.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;

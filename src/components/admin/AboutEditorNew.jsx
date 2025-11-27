import { useState } from 'react';
import {
  updateAboutBasicInfo,
  addAboutItem,
  updateAboutItem,
  deleteAboutItem
} from '../../services/dataService';

const AboutEditorNew = ({ data, onUpdate }) => {
  const [activeSection, setActiveSection] = useState('basic');

  const sections = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'languages', label: 'Languages' },
    { id: 'achievements', label: 'Achievements' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage About Page</h2>
      
      {/* Sub-tabs */}
      <div className="flex gap-2 mb-8 border-b border-black pb-4 overflow-x-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 text-sm whitespace-nowrap ${
              activeSection === section.id
                ? 'bg-black text-white'
                : 'border border-black hover:bg-gray-100'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeSection === 'basic' && <BasicInfoEditor data={data} onUpdate={onUpdate} />}
      {activeSection === 'experience' && <ExperienceEditor data={data.experience || []} onUpdate={onUpdate} />}
      {activeSection === 'education' && <EducationEditor data={data.education || []} onUpdate={onUpdate} />}
      {activeSection === 'skills' && <SkillsEditor data={data.skills || []} onUpdate={onUpdate} />}
      {activeSection === 'certificates' && <CertificatesEditor data={data.certificates || []} onUpdate={onUpdate} />}
      {activeSection === 'languages' && <LanguagesEditor data={data.languages || []} onUpdate={onUpdate} />}
      {activeSection === 'achievements' && <AchievementsEditor data={data.achievements || []} onUpdate={onUpdate} />}
    </div>
  );
};

// Basic Info Editor
const BasicInfoEditor = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: data.title || '',
    description: data.description || '',
    bio: data.bio || '',
    profileImage: data.profileImage || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAboutBasicInfo(formData);
    onUpdate();
    alert('Basic info updated!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="4"
          className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows="4"
          className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Profile Image URL</label>
        <input
          type="url"
          value={formData.profileImage}
          onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
          className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
        />
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

// Experience Editor
const ExperienceEditor = ({ data, onUpdate }) => {
  const [items, setItems] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    order: 0
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ position: '', company: '', location: '', startDate: '', endDate: '', description: '', order: items.length + 1 });
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateAboutItem('experience', editingItem.id, formData);
    } else {
      addAboutItem('experience', formData);
    }
    setShowForm(false);
    onUpdate();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this experience?')) {
      deleteAboutItem('experience', id);
      onUpdate();
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={handleAdd}
        className="px-6 py-2 bg-black text-white hover:opacity-80"
      >
        Add Experience
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-black p-6 space-y-4">
          <h3 className="text-xl font-bold">{editingItem ? 'Edit' : 'Add'} Experience</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Position *</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company *</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                placeholder="e.g., Jan 2022"
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                placeholder="e.g., Present"
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-black text-white py-2 hover:opacity-80">
              {editingItem ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-black py-2 hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-center opacity-60 py-8">No experience added yet.</p>
        ) : (
          items.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item) => (
            <div key={item.id} className="border border-black p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.position}</h3>
                  <p className="opacity-80">{item.company}</p>
                  <p className="text-sm opacity-60">{item.location} • {item.startDate} - {item.endDate}</p>
                  <p className="mt-2 opacity-80">{item.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => handleEdit(item)} className="px-4 py-1 border border-black hover:bg-black hover:text-white text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="px-4 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Similar pattern for other editors - Education, Skills, Certificates, Languages, Achievements
// I'll create simplified versions for brevity

const EducationEditor = ({ data, onUpdate }) => {
  const [items, setItems] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ degree: '', institution: '', location: '', startDate: '', endDate: '', description: '' });
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateAboutItem('education', editingItem.id, formData);
    } else {
      addAboutItem('education', formData);
    }
    setShowForm(false);
    onUpdate();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this education?')) {
      deleteAboutItem('education', id);
      onUpdate();
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={handleAdd} className="px-6 py-2 bg-black text-white hover:opacity-80">
        Add Education
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-black p-6 space-y-4">
          <h3 className="text-xl font-bold">{editingItem ? 'Edit' : 'Add'} Education</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Degree *</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                required
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Institution *</label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                required
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Start Year</label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Year</label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-black text-white py-2 hover:opacity-80">
              {editingItem ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-black py-2 hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-center opacity-60 py-8">No education added yet.</p>
        ) : (
          items.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item) => (
            <div key={item.id} className="border border-black p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.degree}</h3>
                  <p className="opacity-80">{item.institution}</p>
                  <p className="text-sm opacity-60">{item.location} • {item.startDate} - {item.endDate}</p>
                  {item.description && <p className="mt-2 opacity-80">{item.description}</p>}
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => handleEdit(item)} className="px-4 py-1 border border-black hover:bg-black hover:text-white text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="px-4 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Skills Editor - handles array of items
const SkillsEditor = ({ data, onUpdate }) => {
  const [items, setItems] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    items: ''
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ category: '', items: '' });
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      ...item,
      items: Array.isArray(item.items) ? item.items.join(', ') : ''
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemsArray = formData.items.split(',').map(s => s.trim()).filter(Boolean);
    const dataToSave = {
      category: formData.category,
      items: itemsArray
    };
    
    if (editingItem) {
      updateAboutItem('skills', editingItem.id, dataToSave);
    } else {
      addAboutItem('skills', dataToSave);
    }
    setShowForm(false);
    onUpdate();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this skill category?')) {
      deleteAboutItem('skills', id);
      onUpdate();
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={handleAdd} className="px-6 py-2 bg-black text-white hover:opacity-80">
        Add Skill Category
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-black p-6 space-y-4">
          <h3 className="text-xl font-bold">{editingItem ? 'Edit' : 'Add'} Skill Category</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Category Name *</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              placeholder="e.g., Frontend, Backend, Tools"
              className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Skills (comma-separated) *</label>
            <textarea
              value={formData.items}
              onChange={(e) => setFormData({ ...formData, items: e.target.value })}
              required
              rows="3"
              placeholder="e.g., React, Vue.js, TypeScript, HTML5"
              className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <p className="text-xs opacity-60 mt-1">Separate each skill with a comma</p>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-black text-white py-2 hover:opacity-80">
              {editingItem ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-black py-2 hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-center opacity-60 py-8">No skills added yet.</p>
        ) : (
          items.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item) => (
            <div key={item.id} className="border border-black p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{item.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.items && item.items.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 border border-black text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => handleEdit(item)} className="px-4 py-1 border border-black hover:bg-black hover:text-white text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="px-4 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Certificates, Languages, and Achievements editors follow similar patterns
// For brevity, I'll create simplified versions

const CertificatesEditor = ({ data, onUpdate }) => {
  const [items, setItems] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    credentialId: '',
    url: ''
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', issuer: '', date: '', credentialId: '', url: '' });
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateAboutItem('certificates', editingItem.id, formData);
    } else {
      addAboutItem('certificates', formData);
    }
    setShowForm(false);
    onUpdate();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this certificate?')) {
      deleteAboutItem('certificates', id);
      onUpdate();
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={handleAdd} className="px-6 py-2 bg-black text-white hover:opacity-80">
        Add Certificate
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-black p-6 space-y-4">
          <h3 className="text-xl font-bold">{editingItem ? 'Edit' : 'Add'} Certificate</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Issuer *</label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                required
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="e.g., 2023"
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Credential ID</label>
              <input
                type="text"
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Certificate URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-black text-white py-2 hover:opacity-80">
              {editingItem ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-black py-2 hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-center opacity-60 py-8">No certificates added yet.</p>
        ) : (
          items.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item) => (
            <div key={item.id} className="border border-black p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="opacity-80">{item.issuer}</p>
                  <p className="text-sm opacity-60">
                    {item.date} {item.credentialId && `• ID: ${item.credentialId}`}
                  </p>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm underline opacity-60 hover:opacity-100">
                      View Certificate →
                    </a>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => handleEdit(item)} className="px-4 py-1 border border-black hover:bg-black hover:text-white text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="px-4 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const LanguagesEditor = ({ data, onUpdate }) => {
  const [items, setItems] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    language: '',
    proficiency: ''
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ language: '', proficiency: '' });
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateAboutItem('languages', editingItem.id, formData);
    } else {
      addAboutItem('languages', formData);
    }
    setShowForm(false);
    onUpdate();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this language?')) {
      deleteAboutItem('languages', id);
      onUpdate();
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={handleAdd} className="px-6 py-2 bg-black text-white hover:opacity-80">
        Add Language
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-black p-6 space-y-4">
          <h3 className="text-xl font-bold">{editingItem ? 'Edit' : 'Add'} Language</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Language *</label>
              <input
                type="text"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                required
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Proficiency *</label>
              <input
                type="text"
                value={formData.proficiency}
                onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                required
                placeholder="e.g., Native, Professional, Elementary"
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-black text-white py-2 hover:opacity-80">
              {editingItem ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-black py-2 hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {items.length === 0 ? (
          <p className="col-span-full text-center opacity-60 py-8">No languages added yet.</p>
        ) : (
          items.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item) => (
            <div key={item.id} className="border border-black p-4">
              <h3 className="font-bold">{item.language}</h3>
              <p className="text-sm opacity-60 mt-1">{item.proficiency}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(item)} className="flex-1 px-2 py-1 border border-black hover:bg-black hover:text-white text-xs">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="flex-1 px-2 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-xs">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const AchievementsEditor = ({ data, onUpdate }) => {
  const [items, setItems] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: ''
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '', date: '' });
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateAboutItem('achievements', editingItem.id, formData);
    } else {
      addAboutItem('achievements', formData);
    }
    setShowForm(false);
    onUpdate();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this achievement?')) {
      deleteAboutItem('achievements', id);
      onUpdate();
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={handleAdd} className="px-6 py-2 bg-black text-white hover:opacity-80">
        Add Achievement
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-black p-6 space-y-4">
          <h3 className="text-xl font-bold">{editingItem ? 'Edit' : 'Add'} Achievement</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="e.g., 2023 or 2021-Present"
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-black text-white py-2 hover:opacity-80">
              {editingItem ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-black py-2 hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-center opacity-60 py-8">No achievements added yet.</p>
        ) : (
          items.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item) => (
            <div key={item.id} className="border border-black p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm opacity-60 mt-1">{item.date}</p>
                  <p className="mt-2 opacity-80">{item.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => handleEdit(item)} className="px-4 py-1 border border-black hover:bg-black hover:text-white text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="px-4 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AboutEditorNew;

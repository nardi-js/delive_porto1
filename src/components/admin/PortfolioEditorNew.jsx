import { useState, useEffect } from 'react';
import { addItem, updateItem, deleteItem } from '../../services/dataService';

const PortfolioEditorNew = ({ data, onUpdate }) => {
  const [items, setItems] = useState(data || []);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    category: '',
    image: '',
    images: '',
    techStack: '',
    liveUrl: '',
    githubUrl: '',
    client: '',
    duration: '',
    year: '',
    role: '',
    order: 0
  });

  useEffect(() => {
    setItems(data || []);
  }, [data]);

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      fullDescription: '',
      category: '',
      image: '',
      images: '',
      techStack: '',
      liveUrl: '',
      githubUrl: '',
      client: '',
      duration: '',
      year: '',
      role: '',
      order: items.length + 1
    });
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      ...item,
      images: Array.isArray(item.images) ? item.images.join('\n') : '',
      techStack: Array.isArray(item.techStack) ? item.techStack.join(', ') : ''
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process arrays
    const dataToSave = {
      ...formData,
      images: formData.images ? formData.images.split('\n').map(s => s.trim()).filter(Boolean) : [],
      techStack: formData.techStack ? formData.techStack.split(',').map(s => s.trim()).filter(Boolean) : []
    };
    
    if (editingItem) {
      updateItem('portfolio', editingItem.id, dataToSave);
    } else {
      addItem('portfolio', dataToSave);
    }
    setShowForm(false);
    onUpdate();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this portfolio item?')) {
      deleteItem('portfolio', id);
      onUpdate();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Portfolio</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-black text-white hover:opacity-80 transition-opacity"
        >
          Add New Project
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-black p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold sticky top-0 bg-white pb-4">
            {editingItem ? 'Edit Project' : 'Add New Project'}
          </h3>
          
          {/* Basic Info */}
          <div className="space-y-4 border-b border-gray-300 pb-6">
            <h4 className="font-bold text-lg">Basic Information</h4>
            
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
              <label className="block text-sm font-medium mb-2">Short Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows="2"
                placeholder="Brief description for card preview"
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Full Description</label>
              <textarea
                value={formData.fullDescription || ''}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                rows="5"
                placeholder="Detailed description for detail page"
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Web Development, UI/UX Design"
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4 border-b border-gray-300 pb-6">
            <h4 className="font-bold text-lg">Images</h4>
            
            <div>
              <label className="block text-sm font-medium mb-2">Main Image URL *</label>
              <input
                type="url"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gallery Images (one per line)</label>
              <textarea
                value={formData.images || ''}
                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                rows="4"
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p className="text-xs opacity-60 mt-1">Enter each image URL on a new line</p>
            </div>
          </div>

          {/* Tech & Links */}
          <div className="space-y-4 border-b border-gray-300 pb-6">
            <h4 className="font-bold text-lg">Technologies & Links</h4>
            
            <div>
              <label className="block text-sm font-medium mb-2">Tech Stack (comma-separated)</label>
              <textarea
                value={formData.techStack || ''}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                rows="2"
                placeholder="React, Node.js, MongoDB, Tailwind CSS"
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p className="text-xs opacity-60 mt-1">Separate each technology with a comma</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Live URL</label>
                <input
                  type="url"
                  value={formData.liveUrl || ''}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://project-demo.com"
                  className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl || ''}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/user/repo"
                  className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4 border-b border-gray-300 pb-6">
            <h4 className="font-bold text-lg">Project Details</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Client</label>
                <input
                  type="text"
                  value={formData.client || ''}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="Company or Client Name"
                  className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <input
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Full Stack Developer"
                  className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <input
                  type="text"
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 3 months"
                  className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <input
                  type="text"
                  value={formData.year || ''}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="e.g., 2024"
                  className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Order</label>
              <input
                type="number"
                value={formData.order || 0}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="flex gap-4 sticky bottom-0 bg-white pt-4">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-3 hover:opacity-80 transition-opacity"
            >
              {editingItem ? 'Update Project' : 'Add Project'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 border border-black py-3 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-center opacity-60 py-8">No portfolio items yet.</p>
        ) : (
          items.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item) => (
            <div key={item.id} className="border border-black p-4">
              <div className="flex gap-4">
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-32 h-20 object-cover border border-black flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate">{item.title}</h3>
                  {item.category && <p className="text-sm opacity-60">{item.category}</p>}
                  <p className="mt-2 opacity-80 text-sm line-clamp-2">{item.description}</p>
                  {item.techStack && item.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.techStack.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 border border-black/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-4 py-1 border border-black hover:bg-black hover:text-white transition-colors text-sm whitespace-nowrap"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors text-sm whitespace-nowrap"
                  >
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

export default PortfolioEditorNew;

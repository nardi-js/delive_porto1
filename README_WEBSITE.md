# Minimalist Portfolio Website

A fully dynamic, minimalist multi-page portfolio website built with React + Vite + Tailwind CDN. All content is managed through an admin panel and stored in localStorage.

## 🎨 Design Philosophy

- **Minimalist aesthetic**: Clean, simple, elegant
- **Black & white color scheme**: Focus on typography and whitespace
- **Highly readable**: Clear hierarchy and generous spacing
- **Fully responsive**: Works on all devices

## 📄 Pages

### Public Pages
1. **Home** - Hero section with title, subtitle, and description
2. **About** - Profile image, bio, and detailed description
3. **Portfolio** - Project showcase with category filtering
4. **Contact** - Contact form and information display

### Admin Panel
5. **Admin** - Comprehensive content management system

## ✨ Key Features

### 🔄 Fully Dynamic Content System
All content can be added, edited, and deleted through the Admin Page without touching code:

- **Home Page Content**: Title, subtitle, description, hero image
- **About Page Content**: Title, description, bio, profile image
- **Portfolio Items**: Title, description, category, image, order
- **Gallery Items**: Title, image, category, order
- **Contact Information**: Email, phone, location, social media links
- **Contact Messages**: View and delete submitted messages
- **Site Settings**: Theme, colors, typography (foundation for future enhancements)

### 🛠 Admin Panel Functions

#### Content Management Tabs:
1. **Home Tab** - Edit hero section content
2. **About Tab** - Edit about page content
3. **Portfolio Tab** - Full CRUD operations for portfolio items
4. **Gallery Tab** - Full CRUD operations for gallery items
5. **Contact Tab** - Edit contact information and social links
6. **Messages Tab** - View and delete contact form submissions
7. **Settings Tab** - Configure site-wide settings

#### CRUD Operations:
- ✅ **Create**: Add new items with forms
- ✅ **Read**: View all existing content
- ✅ **Update**: Edit existing items
- ✅ **Delete**: Remove items with confirmation
- ✅ **Reset**: Restore default data

### 📦 Data Structure

All data is stored in localStorage under the key `portfolioData`:

```javascript
{
  home: {
    title: string,
    subtitle: string,
    description: string,
    heroImage: string (URL)
  },
  about: {
    title: string,
    description: string,
    bio: string,
    profileImage: string (URL)
  },
  portfolio: [
    {
      id: number,
      title: string,
      description: string,
      category: string,
      image: string (URL),
      order: number
    }
  ],
  gallery: [
    {
      id: number,
      title: string,
      image: string (URL),
      category: string,
      order: number
    }
  ],
  contact: {
    email: string,
    phone: string,
    location: string,
    social: {
      twitter: string (URL),
      linkedin: string (URL),
      github: string (URL)
    }
  },
  contactMessages: [
    {
      id: number,
      name: string,
      email: string,
      message: string,
      timestamp: string (ISO date)
    }
  ],
  settings: {
    theme: 'light' | 'dark',
    primaryColor: string (hex),
    typography: 'sans' | 'serif' | 'mono'
  }
}
```

### 🔄 Real-time Updates

Changes made in the Admin Panel are immediately reflected on public pages through:
- Custom event dispatching (`dataUpdated`)
- Event listeners on all public pages
- Automatic re-rendering when data changes

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎯 How to Use the Admin Panel

1. Navigate to `/admin` in your browser
2. Use the tabs to switch between different content sections
3. Click "Add New Item" to create new portfolio/gallery items
4. Click "Edit" on any item to modify it
5. Click "Delete" to remove items (with confirmation)
6. Click "Reset to Default" to restore original content

## 📝 Adding Content

### Adding Portfolio Items
1. Go to Admin → Portfolio tab
2. Click "Add New Item"
3. Fill in:
   - Title (required)
   - Description
   - Category (for filtering)
   - Image URL
   - Order (for sorting)
4. Click "Add"

### Adding Gallery Items
1. Go to Admin → Gallery tab
2. Click "Add New Item"
3. Fill in:
   - Title (required)
   - Image URL (required)
   - Category
   - Order
4. Click "Add"

### Editing Contact Information
1. Go to Admin → Contact tab
2. Update email, phone, location
3. Add/edit social media links
4. Click "Save Changes"

### Viewing Contact Messages
1. Go to Admin → Messages tab
2. View all submitted messages
3. Delete messages as needed

## 🎨 Customization

The website uses Tailwind CDN for styling. The design is intentionally minimal with:
- Clean typography
- Generous whitespace
- Black borders for definition
- Smooth transitions
- Focus on content over decoration

## 📱 Responsive Design

All pages are fully responsive:
- Mobile-first approach
- Adaptive layouts
- Touch-friendly buttons
- Readable on all screen sizes

## 🔒 Data Persistence

- All data is stored in browser localStorage
- Data persists across sessions
- No backend required
- Can be exported/imported via browser dev tools

## 🌟 Future Enhancements

Potential additions:
- Image upload functionality (currently uses URLs)
- Export/import data as JSON
- Multiple theme presets
- Blog section
- Search functionality
- Analytics integration

## 📄 License

This project is open source and available for personal and commercial use.

---

Built with ❤️ using React, Vite, and Tailwind CSS

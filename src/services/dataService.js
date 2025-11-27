// Default data structure
const defaultData = {
  home: {
    title: "John Doe",
    subtitle: "Full Stack Developer & UI/UX Designer",
    description: "Crafting beautiful and functional digital experiences with clean code and minimalist design principles.",
    typingWords: [
      "Full Stack Developer",
      "UI/UX Designer",
      "Creative Thinker",
      "Problem Solver"
    ]
  },
  about: {
    title: "About Me",
    description: "I'm a passionate Full Stack Developer and UI/UX Designer with 5+ years of experience creating elegant digital solutions. I believe in the power of simplicity and clean design.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Based in Jakarta, Indonesia. I specialize in building modern web applications with React, Node.js, and creating intuitive user interfaces. My approach combines technical expertise with design thinking to deliver exceptional user experiences.",
    
    // Resume sections
    experience: [
      {
        id: 1,
        position: "Senior Full Stack Developer",
        company: "Tech Innovations Inc.",
        location: "Jakarta, Indonesia",
        startDate: "Jan 2022",
        endDate: "Present",
        description: "Leading development of enterprise web applications using React, Node.js, and PostgreSQL. Mentoring junior developers and implementing best practices.",
        order: 1
      },
      {
        id: 2,
        position: "Full Stack Developer",
        company: "Digital Solutions Co.",
        location: "Jakarta, Indonesia",
        startDate: "Jun 2020",
        endDate: "Dec 2021",
        description: "Developed and maintained multiple client projects. Built RESTful APIs and responsive front-end interfaces. Collaborated with design team to implement UI/UX improvements.",
        order: 2
      },
      {
        id: 3,
        position: "Junior Web Developer",
        company: "StartUp Studio",
        location: "Bandung, Indonesia",
        startDate: "Jan 2019",
        endDate: "May 2020",
        description: "Assisted in building web applications using JavaScript, HTML, and CSS. Learned modern frameworks and development workflows.",
        order: 3
      }
    ],
    
    education: [
      {
        id: 1,
        degree: "Bachelor of Computer Science",
        institution: "University of Indonesia",
        location: "Depok, Indonesia",
        startDate: "2015",
        endDate: "2019",
        description: "Graduated with honors. Focus on Software Engineering and Web Development. GPA: 3.8/4.0",
        order: 1
      },
      {
        id: 2,
        degree: "High School Diploma",
        institution: "SMA Negeri 1 Jakarta",
        location: "Jakarta, Indonesia",
        startDate: "2012",
        endDate: "2015",
        description: "Science major. Active in computer club and programming competitions.",
        order: 2
      }
    ],
    
    skills: [
      {
        id: 1,
        category: "Frontend",
        items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
        order: 1
      },
      {
        id: 2,
        category: "Backend",
        items: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB", "REST API"],
        order: 2
      },
      {
        id: 3,
        category: "Tools & Others",
        items: ["Git", "Docker", "AWS", "Figma", "Adobe XD", "Agile/Scrum"],
        order: 3
      },
      {
        id: 4,
        category: "Soft Skills",
        items: ["Team Leadership", "Problem Solving", "Communication", "Project Management"],
        order: 4
      }
    ],
    
    certificates: [
      {
        id: 1,
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023",
        credentialId: "AWS-SA-2023-12345",
        url: "https://aws.amazon.com/certification/",
        order: 1
      },
      {
        id: 2,
        title: "Professional Scrum Master I",
        issuer: "Scrum.org",
        date: "2022",
        credentialId: "PSM-2022-67890",
        url: "https://scrum.org",
        order: 2
      },
      {
        id: 3,
        title: "React Developer Certification",
        issuer: "Meta (Facebook)",
        date: "2021",
        credentialId: "META-REACT-2021-54321",
        url: "https://www.coursera.org/professional-certificates/meta-react-native",
        order: 3
      }
    ],
    
    languages: [
      {
        id: 1,
        language: "Indonesian",
        proficiency: "Native",
        order: 1
      },
      {
        id: 2,
        language: "English",
        proficiency: "Professional Working Proficiency",
        order: 2
      },
      {
        id: 3,
        language: "Japanese",
        proficiency: "Elementary",
        order: 3
      }
    ],
    
    achievements: [
      {
        id: 1,
        title: "Best Developer Award 2023",
        description: "Recognized for outstanding contribution to company's flagship product",
        date: "2023",
        order: 1
      },
      {
        id: 2,
        title: "Hackathon Winner",
        description: "First place in Jakarta Tech Hackathon 2022 - Built AI-powered chatbot",
        date: "2022",
        order: 2
      },
      {
        id: 3,
        title: "Open Source Contributor",
        description: "Active contributor to React and Node.js open source projects",
        date: "2021-Present",
        order: 3
      }
    ]
  },
  portfolio: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration.",
      fullDescription: "A comprehensive e-commerce platform built from scratch with modern technologies. Features include product management, shopping cart functionality, secure payment processing with Stripe, user authentication, order tracking, and admin dashboard. The platform is fully responsive and optimized for performance.",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
      ],
      techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Tailwind CSS"],
      liveUrl: "https://example.com/ecommerce",
      githubUrl: "https://github.com/example/ecommerce",
      client: "Tech Startup Inc.",
      duration: "3 months",
      year: "2024",
      role: "Full Stack Developer",
      order: 1
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates using Socket.io.",
      fullDescription: "A powerful task management tool designed for teams. Features real-time collaboration, drag-and-drop task boards, deadline tracking, file attachments, team chat, and detailed analytics. Built with modern web technologies for optimal performance and user experience.",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop"
      ],
      techStack: ["React", "Socket.io", "Node.js", "MongoDB", "Redux"],
      liveUrl: "https://example.com/taskapp",
      githubUrl: "https://github.com/example/taskapp",
      client: "Remote Team Co.",
      duration: "2 months",
      year: "2024",
      role: "Lead Developer",
      order: 2
    },
    {
      id: 3,
      title: "Portfolio Website Redesign",
      description: "Modern portfolio website for creative agency with smooth animations.",
      fullDescription: "Complete redesign of a creative agency's portfolio website. Focus on minimalist design, smooth scroll animations, and showcasing work in an elegant manner. Implemented custom cursor effects, parallax scrolling, and optimized image loading for fast performance.",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop"
      ],
      techStack: ["React", "Framer Motion", "Next.js", "Tailwind CSS"],
      liveUrl: "https://example.com/agency",
      githubUrl: "",
      client: "Creative Studio",
      duration: "1 month",
      year: "2023",
      role: "UI/UX Designer & Developer",
      order: 3
    },
    {
      id: 4,
      title: "Mobile Banking App UI",
      description: "Clean and intuitive mobile banking interface design.",
      fullDescription: "Designed a modern mobile banking application interface with focus on security, accessibility, and ease of use. Features include biometric authentication, quick transfers, bill payments, transaction history, and financial insights. All designs follow banking industry standards and accessibility guidelines.",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop"
      ],
      techStack: ["Figma", "Adobe XD", "Prototyping"],
      liveUrl: "",
      githubUrl: "",
      client: "FinTech Solutions",
      duration: "2 months",
      year: "2023",
      role: "UI/UX Designer",
      order: 4
    },
    {
      id: 5,
      title: "Restaurant Booking System",
      description: "Online reservation system for restaurants with table management.",
      fullDescription: "Comprehensive restaurant booking platform with table management, menu display, customer reviews, and reservation system. Includes admin dashboard for restaurant owners to manage bookings, update menus, and view analytics. Integrated with payment gateway for deposits.",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
      ],
      techStack: ["Next.js", "PostgreSQL", "Prisma", "TypeScript", "Stripe"],
      liveUrl: "https://example.com/restaurant",
      githubUrl: "https://github.com/example/restaurant",
      client: "Restaurant Chain",
      duration: "4 months",
      year: "2024",
      role: "Full Stack Developer",
      order: 5
    },
    {
      id: 6,
      title: "Fitness Tracking Dashboard",
      description: "Analytics dashboard for fitness tracking with charts and progress visualization.",
      fullDescription: "Interactive fitness tracking dashboard with real-time data visualization, workout planning, nutrition tracking, and progress analytics. Features include custom workout builder, meal planner, progress photos, and social features to connect with friends. Built with performance in mind for handling large datasets.",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      ],
      techStack: ["React", "Chart.js", "Firebase", "Material-UI"],
      liveUrl: "https://example.com/fitness",
      githubUrl: "https://github.com/example/fitness",
      client: "Fitness App Startup",
      duration: "3 months",
      year: "2024",
      role: "Frontend Developer",
      order: 6
    }
  ],
  contact: {
    email: "john.doe@example.com",
    phone: "+62 812 3456 7890",
    location: "Jakarta, Indonesia",
    social: {
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      instagram: "https://instagram.com/johndoe"
    }
  },
  contactMessages: []
};

// Initialize localStorage with default data if empty
export const initializeData = () => {
  const existingData = localStorage.getItem('portfolioData');
  if (!existingData) {
    localStorage.setItem('portfolioData', JSON.stringify(defaultData));
  }
};

// Get all data
export const getAllData = () => {
  const data = localStorage.getItem('portfolioData');
  return data ? JSON.parse(data) : defaultData;
};

// Get specific section
export const getData = (section) => {
  const allData = getAllData();
  return allData[section] || null;
};

// Update specific section
export const updateData = (section, data) => {
  const allData = getAllData();
  allData[section] = data;
  localStorage.setItem('portfolioData', JSON.stringify(allData));
};

// Add item to array section (portfolio, gallery, etc.)
export const addItem = (section, item) => {
  const allData = getAllData();
  if (!Array.isArray(allData[section])) {
    allData[section] = [];
  }
  
  // Generate new ID
  const maxId = allData[section].length > 0 
    ? Math.max(...allData[section].map(i => i.id || 0))
    : 0;
  
  const newItem = {
    ...item,
    id: maxId + 1,
    order: allData[section].length + 1
  };
  
  allData[section].push(newItem);
  localStorage.setItem('portfolioData', JSON.stringify(allData));
  return newItem;
};

// Update item in array section
export const updateItem = (section, itemId, updatedItem) => {
  const allData = getAllData();
  if (!Array.isArray(allData[section])) return;
  
  const index = allData[section].findIndex(item => item.id === itemId);
  if (index !== -1) {
    allData[section][index] = { ...allData[section][index], ...updatedItem };
    localStorage.setItem('portfolioData', JSON.stringify(allData));
  }
};

// Delete item from array section
export const deleteItem = (section, itemId) => {
  const allData = getAllData();
  if (!Array.isArray(allData[section])) return;
  
  allData[section] = allData[section].filter(item => item.id !== itemId);
  localStorage.setItem('portfolioData', JSON.stringify(allData));
};

// Reset to default data
export const resetData = () => {
  localStorage.setItem('portfolioData', JSON.stringify(defaultData));
};

// Add contact message
export const addContactMessage = (message) => {
  const allData = getAllData();
  if (!Array.isArray(allData.contactMessages)) {
    allData.contactMessages = [];
  }
  
  const newMessage = {
    id: Date.now(),
    ...message,
    timestamp: new Date().toISOString()
  };
  
  allData.contactMessages.push(newMessage);
  localStorage.setItem('portfolioData', JSON.stringify(allData));
  return newMessage;
};

// Delete contact message
export const deleteContactMessage = (messageId) => {
  const allData = getAllData();
  if (!Array.isArray(allData.contactMessages)) return;
  
  allData.contactMessages = allData.contactMessages.filter(msg => msg.id !== messageId);
  localStorage.setItem('portfolioData', JSON.stringify(allData));
};

// Helper functions for About subsections (experience, education, skills, etc.)
export const addAboutItem = (subsection, item) => {
  const allData = getAllData();
  if (!allData.about[subsection]) {
    allData.about[subsection] = [];
  }
  
  const maxId = allData.about[subsection].length > 0 
    ? Math.max(...allData.about[subsection].map(i => i.id || 0))
    : 0;
  
  const newItem = {
    ...item,
    id: maxId + 1,
    order: allData.about[subsection].length + 1
  };
  
  allData.about[subsection].push(newItem);
  localStorage.setItem('portfolioData', JSON.stringify(allData));
  return newItem;
};

export const updateAboutItem = (subsection, itemId, updatedItem) => {
  const allData = getAllData();
  if (!Array.isArray(allData.about[subsection])) return;
  
  const index = allData.about[subsection].findIndex(item => item.id === itemId);
  if (index !== -1) {
    allData.about[subsection][index] = { ...allData.about[subsection][index], ...updatedItem };
    localStorage.setItem('portfolioData', JSON.stringify(allData));
  }
};

export const deleteAboutItem = (subsection, itemId) => {
  const allData = getAllData();
  if (!Array.isArray(allData.about[subsection])) return;
  
  allData.about[subsection] = allData.about[subsection].filter(item => item.id !== itemId);
  localStorage.setItem('portfolioData', JSON.stringify(allData));
};

export const updateAboutBasicInfo = (basicInfo) => {
  const allData = getAllData();
  allData.about = {
    ...allData.about,
    ...basicInfo
  };
  localStorage.setItem('portfolioData', JSON.stringify(allData));
};

// projectShowcase.tsx
import React, { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  dates: string;
  liveUrl?: string;
  githubUrl?: string;
  codeSnippet?: string;
  previewImage?: string;
  category: string[]; // Added category
}

const projects: Project[] = [
  {
    id: 'portfolio-chatbot',
    title: 'AI-Powered Portfolio Chatbot (Full-Stack)',
    description: 'A full-stack project showcasing my ability to integrate AI/LLMs into web applications. The backend is a Python/Flask service that processes natural language queries about my resume and projects, while the frontend provides a seamless, interactive chat interface.',
    technologies: ['Python', 'Flask', 'LLM Integration', 'React', 'TypeScript', 'WebSockets'],
    dates: 'Ongoing',
    liveUrl: '#hello', // Link to the live chat feature on the portfolio itself
    githubUrl: 'https://github.com/adiyakumar9/portfolio-chatbot-backend',
    codeSnippet: `
# Python/Flask Backend Snippet
@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    # Logic to process message with LLM and return response
    response = process_with_llm(user_message)
    return jsonify({'response': response})
    `,
    category: ['full-stack', 'python', 'react'],
  },
  {
    id: 'tdx-launchpad',
    title: 'TDX Launchpad - Real-time Trading Platform',
    description: 'Built the frontend infrastructure for a sophisticated cryptocurrency trading platform. Key features include a WebSocket-based real-time price feed handling **1,000+ updates per second**, advanced trading interface with order book visualization (D3.js), and a caching strategy that reduced API calls by **70%**.',
    technologies: ['Angular', 'TypeScript', 'WebSockets', 'D3.js', 'IndexedDB'],
    dates: 'Mar 2023 – Aug 2023',
    liveUrl: 'https://tdx.biz/',
    // githubUrl: '', Add if available
    codeSnippet: `
// TypeScript/Angular Snippet for WebSocket connection
const ws = new WebSocket('wss://api.tdx.com/realtime');
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Update order book and price charts
};
    `,
    category: ['angular', 'real-time', 'frontend'],
  },
  {
    id: 'oshodhara',
    title: 'Oshodhara - Enterprise Event Management Platform',
    description: 'Architected a comprehensive admin panel for an event booking platform processing **10,000+ monthly bookings**. Implemented a complex multi-step booking workflow with real-time seat availability, a sophisticated **role-based access control system** (5 user levels), and a dynamic pricing engine.',
    technologies: ['Angular', 'Node.js', 'PostgreSQL', 'RBAC', 'Chart.js'],
    dates: 'Mar 2022 – Aug 2022',
    liveUrl: 'https://samarthgurusiddharth.org/',
    // githubUrl: '', Add if available
    codeSnippet: `
// Node.js/Express Snippet for RBAC middleware
const checkPermission = (requiredRole) => (req, res, next) => {
  if (req.user && req.user.role === requiredRole) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};
    `,
    category: ['angular', 'full-stack', 'backend'],
  },
  {
    id: 't-pro',
    title: 'T-Pro - Project Management System',
    description: 'Led frontend development for T-Pro, a comprehensive team and project management system. Implemented secure routing authentication, seamless form integration using React Query and Formik, and integrated data visualization graphs for real-time analytics.',
    technologies: ['React', 'React Query', 'Formik', 'Yup'],
    dates: 'Feb 2024 - Present',
    liveUrl: 'https://pms.recru.in/',
    // githubUrl: '', Add if available
    category: ['react', 'frontend'],
  },
  {
    id: 'social-collider',
    title: 'Social Collider - Task-based Social Media Platform',
    description: 'Developed the frontend for Social Collider, a task-based social media platform that incentivizes users to engage with content on Twitter, Telegram, and YouTube. Implemented user interface using HTML, CSS, JavaScript, and Angular, and integrated APIs for seamless cross-platform functionality.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Angular', 'RESTful APIs'],
    dates: 'Sep 2023 - Jan 2024',
    liveUrl: 'https://bizthon.com/',
    // githubUrl: '', Add if available
    category: ['angular', 'frontend'],
  },
];

interface ProjectShowcaseProps {
  selectedCategory: string;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ selectedCategory }) => {
    
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projects;
    } else {
      return projects.filter(project => project.category.includes(selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredProjects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectCard
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            dates={project.dates}
            liveUrl={project.liveUrl || ''}
            githubUrl={project.githubUrl || ''}
            // previewImage={project.previewImage || ''}
            // codeSnippet={project.codeSnippet || ''}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectShowcase;

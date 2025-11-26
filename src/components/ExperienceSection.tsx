import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Terminal, Code, GitBranch, Radio, Boxes, Shield, Zap, Lock, Activity } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  type: 'full-time' | 'internship';
  icon: JSX.Element;
  color: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

const experiences: Experience[] = [
  {
    id: 'devtrust',
    title: "Software Development Engineer (SDE)",
    company: "DEVtrust - DevTech Enterprises Pvt. Ltd.",
    period: "Apr 2025 - Present",
    type: 'full-time',
    icon: <Shield className="w-6 h-6" />,
    color: "#10B981",
    description: "Leading full-stack development of MediaIntercept, a sophisticated media analytics and tracking platform serving 10,000+ daily active users. My work focuses on architecting scalable, high-performance systems with a strong emphasis on data integrity, security, and real-time processing.",
    technologies: ['Next.js', 'Node.js', 'GraphQL', 'PostgreSQL', 'Microservices', 'Fraud Detection'],
    highlights: [
      "Architected and implemented an advanced link tracking system with **fraud detection capabilities**, reducing invalid traffic by **40%** through bot detection algorithms and duplicate click filtering.",
      "Designed and built a complex **multi-tenant role-based access control system** (RBAC) supporting multiple-to-multiple role assignments, enabling granular permission management across 50+ different user actions.",
      "Implemented **GraphQL API** architecture with query optimization, reducing API response times by **60%** and network overhead by **45%**.",
      "Developed a dynamic multi-destination URL routing system with intelligent load balancing, handling **100,000+ redirects daily** with sub-100ms response times.",
      "Built real-time analytics dashboard using Next.js and WebSockets for live tracking of media campaign performance metrics."
    ]
  },
  {
    id: 'ith-sde',
    title: "Software Development Engineer (SDE-1)",
    company: "ITH Technologies Pvt. Ltd",
    period: "Aug 2022 – Jan 2024",
    type: 'full-time',
    icon: <Zap className="w-6 h-6" />,
    color: "#3B82F6",
    description: "Focused on building scalable Angular applications and optimizing performance for high-traffic enterprise systems. Key contributions involved developing robust authentication and state management solutions.",
    technologies: ['Angular', 'RxJS', 'JWT', 'TypeScript', 'Node.js'],
    highlights: [
      "Architected scalable Angular applications with complex state management using RxJS, serving **5,000+ concurrent users**.",
      "Developed sophisticated authentication system with **JWT token management**, refresh token rotation, and multi-factor authentication.",
      "Optimized application performance achieving **95+ Lighthouse score** through code splitting, lazy loading, and strategic caching.",
      "Built reusable component library with **40+ components**, reducing development time by **35%** across multiple projects."
    ]
  },
  {
    id: 'ith-trainee',
    title: "Software Engineer Trainee",
    company: "ITH Technologies Pvt. Ltd",
    period: "Feb 2022 – Aug 2022",
    type: 'internship',
    icon: <Code className="w-6 h-6" />,
    color: "#F59E0B",
    description: "Gained foundational experience in full-stack development by contributing to the enterprise booking management system, focusing on real-time data synchronization and automated testing.",
    technologies: ['Angular', 'WebSocket', 'Jasmine', 'Karma'],
    highlights: [
      "Developed complex Angular components for enterprise booking management system handling **1,000+ daily transactions**.",
      "Implemented **real-time data synchronization** using WebSocket connections for live booking updates.",
      "Created automated testing suite with **85% code coverage** using Jasmine and Karma."
    ]
  }
];

const ExperienceCard: React.FC<{ 
  experience: Experience;
  isActive: boolean;
  onClick: () => void;
  index: number;
}> = ({ experience, isActive, onClick, index }) => {
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 10,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const expandedContentVariants = {
    hidden: { 
      opacity: 0,
      height: 0
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const getIconForHighlight = (index: number) => {
    const icons = [GitBranch, Radio, Boxes, Lock, Activity];
    const Icon = icons[index % icons.length];
    return <Icon className="w-4 h-4" />;
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
      className={`
        relative rounded-xl transition-all duration-500 ease-out
        ${isActive ? 'col-span-2 row-span-2' : 'col-span-1'}
      `}
    >
      <div
        className={`
          h-full p-6 rounded-xl border backdrop-blur-sm transition-all duration-500 cursor-pointer
          ${isActive 
            ? 'bg-gray-900/40 border-emerald-500/30 shadow-lg' 
            : 'bg-gray-900/20 border-gray-800/30 hover:border-emerald-500/20 hover:bg-gray-900/30'}
        `}
        onClick={onClick}
      >
        {/* Timeline Node */}
        <div
          className={`
            absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center
            transition-colors duration-300
            ${isActive ? 'bg-emerald-500' : 'bg-gray-800'}
            border-4 ${isActive ? 'border-emerald-500/20' : 'border-gray-900'}
          `}
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>

        {/* Content */}
        <div className="ml-4">
          {/* Header - Always visible */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className={`
                  p-2 rounded-lg transition-colors duration-300
                  ${experience.type === 'full-time' ? 'bg-emerald-500/20' : 'bg-blue-500/20'}
                `}>
                  {experience.icon}
                </span>
                {experience.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-emerald-400">{experience.company}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">{experience.period}</span>
              </div>
            </div>

            <motion.div
              animate={{ rotate: isActive ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-emerald-400"
            >
              →
            </motion.div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-4">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-emerald-500/5 text-emerald-400 
                         border border-emerald-500/20 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                variants={expandedContentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="mt-6 overflow-hidden"
              >
                <p className="text-gray-300 mb-4">{experience.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experience.highlights.map((highlight, index) => (
                    <div
                      key={highlight}
                      className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50
                               hover:border-emerald-500/20 transition-all duration-300"
                    >
                      <div className="text-emerald-400 mb-2">
                        {getIconForHighlight(index)}
                      </div>
                      <p className="text-sm text-gray-300">{highlight}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(experiences[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]),
    springConfig
  );

  
  
  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent" />
      </div>

      <motion.div
        className="max-w-6xl mx-auto px-4"
        style={{ opacity }}
      >
        {/* Section Header */}
        <div className="mb-16 relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            // className="absolute -left-4 top-1/2 h-px bg-gradient-to-r from-emerald-500/50 to-transparent"
          />
          <h2 className="text-4xl font-mono font-bold relative inline-flex items-center">
            <span className="text-emerald-400 mr-2">{">"}</span>
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              experience
            </span>
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent" />

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-8">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                isActive={activeId === exp.id}
                onClick={() => setActiveId(exp.id)}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default React.memo(ExperienceSection);

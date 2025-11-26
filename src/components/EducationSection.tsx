import React, { useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, Building2, Book, Award, Sparkles, Code, Database, Globe } from 'lucide-react';

interface Course {
  name: string;
  icon: JSX.Element;
  description: string;
  technologies: string[];
}

interface Education {
  degree: string;
  field: string;
  institution: string;
  period: string;
  courses: Course[];
}

const educationData: Education[] = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    institution: "Amity University Lucknow",
    period: "Aug 2018 – May 2022",
    courses: [
      {
        name: "Data Structures & Algorithms",
        icon: <Code className="w-5 h-5" />,
        description: "Mastered advanced problem-solving techniques and optimization strategies for complex computational challenges",
        technologies: ["C++", "Java", "Python"]
      },
      {
        name: "Distributed Systems",
        icon: <Globe className="w-5 h-5" />,
        description: "Built distributed task scheduler using message queues for scalable, fault-tolerant architectures",
        technologies: ["Message Queues", "Concurrency", "Networking"]
      },
      {
        name: "Database Management",
        icon: <Database className="w-5 h-5" />,
        description: "Comprehensive study of relational and non-relational database design and optimization",
        technologies: ["PostgreSQL", "MongoDB", "SQL"]
      },
      {
        name: "Software Architecture",
        icon: <Code className="w-5 h-5" />,
        description: "Designed real-time collaboration tools with focus on scalable system design patterns",
        technologies: ["Microservices", "Design Patterns", "SOLID"]
      }
    ]
  }
];

const certificationsData = [
  {
    title: "Angular Certification - HackerRank",
    achievement: "Top 5% Score",
    date: "Valid from Nov 2022",
    icon: <Award className="w-5 h-5" />
  },
  {
    title: "Python (Basic) - HackerRank",
    achievement: "Certified",
    date: "Verified",
    icon: <Award className="w-5 h-5" />
  }
];

// Particle animation component
const ParticleEffect: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full"
              initial={{ 
                scale: 0,
                x: "50%",
                y: "50%",
                opacity: 1
              }}
              animate={{
                scale: [0, 1, 0.5],
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                opacity: [1, 0.8, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Course card component
const CourseCard: React.FC<{ course: Course; index: number }> = ({ course, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full" // Ensure full height
    >
      <div
        className="relative p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm
                   hover:border-emerald-500/30 transition-all duration-300 h-full flex flex-col"
      >
        <div className="flex-1"> {/* This will make all cards the same height */}
          {/* Course icon and name */}
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              {course.icon}
            </div>
            <h4 className="text-lg font-semibold text-white">{course.name}</h4>
          </div>

          {/* Description with fixed height and ellipsis */}
          <p className="text-gray-400 mb-4 line-clamp-2 h-12">{course.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {course.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400
                         border border-emerald-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Certification card component
const CertificationCard: React.FC<{ cert: typeof certificationsData[0]; index: number }> = ({ cert, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
      className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0">
          {cert.icon}
        </div>
        <div className="flex-1">
          <h4 className="text-white font-semibold">{cert.title}</h4>
          <p className="text-emerald-400 text-sm">{cert.achievement}</p>
          <p className="text-gray-400 text-xs mt-1">{cert.date}</p>
        </div>
      </div>
    </motion.div>
  );
};

const EducationSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section 
      ref={ref}
      id="education" 
      className="relative min-h-screen py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 relative"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: "100%" } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            // className="absolute -left-4 top-1/2 h-px bg-gradient-to-r  to-transparent"
          />
          
          <h2 className="text-4xl font-mono font-bold relative inline-flex items-center gap-4">
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-emerald-400"
            >
              <GraduationCap className="w-10 h-10" />
            </motion.span>
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              education & certifications
            </span>
          </h2>
        </motion.div>

        {/* Education Content */}
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Degree Info */}
            <div className="rounded-xl p-6 bg-gray-800/20 border border-gray-700/50 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                  <p className="text-emerald-400 flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    {edu.field}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 flex items-center gap-2 justify-end">
                    <Building2 className="w-4 h-4" />
                    {edu.institution}
                  </p>
                  <p className="text-gray-400 flex items-center gap-2 justify-end mt-2">
                    <Calendar className="w-4 h-4" />
                    {edu.period}
                  </p>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div>
              <h4 className="text-lg font-semibold text-emerald-400 mb-4">Relevant Coursework</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {edu.courses.map((course, i) => (
                  <CourseCard key={i} course={course} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16 space-y-6"
        >
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            Professional Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {certificationsData.map((cert, i) => (
              <CertificationCard key={i} cert={cert} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(EducationSection);

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Terminal from './Terminal';

const AboutMe = () => {
  const [isHovered, setIsHovered] = useState(false);

  const skills = [
    'Next.js', 'React.js', 'Angular', 'Node.js', 'GraphQL', 'PostgreSQL', 'Microservices', 'Fraud Detection'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 w-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-white mb-16 font-mono flex items-center group">
          <span className="text-emerald-400 mr-2 opacity-70 group-hover:opacity-100 transition-opacity">
            &gt;
          </span>
          <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            about-me
          </span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div 
            className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800/50 hover:border-emerald-500/50 transition-all duration-300 min-h-[400px] flex flex-col justify-between"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I am a **Full-stack Software Engineer** with **3+ years of experience** in architecting complex web applications and distributed systems. My focus is on building highly **scalable frontend architectures** using Next.js, React.js, and Angular, seamlessly integrated with robust backends built on Node.js and GraphQL.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I have a proven track record of implementing sophisticated, high-impact features, including **real-time trading systems**, **fraud detection mechanisms**, and **multi-tenant Role-Based Access Control (RBAC)** systems. I thrive on solving challenging technical problems that require deep understanding of system architecture and performance optimization.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Currently, I am driving full-stack development of enterprise-grade media technology platforms at **DEVtrust**, focusing on delivering high-performance, secure, and data-intensive applications.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-8">
              {skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-gray-800/30 rounded-full text-emerald-400 text-sm border border-gray-700/50 hover:border-emerald-500/30 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative min-h-[400px]"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative h-full">
            <Terminal  />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;

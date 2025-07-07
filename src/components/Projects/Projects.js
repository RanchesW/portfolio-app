import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = ({ user }) => {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A modern React-based e-commerce platform with advanced filtering, shopping cart, and payment integration.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "Completed",
      year: "2024"
    },
    {
      id: 2,
      title: "Design System",
      description: "Comprehensive design system with reusable components, guidelines, and documentation for a SaaS product.",
      tech: ["Figma", "React", "Storybook", "CSS"],
      status: "Completed",
      year: "2024"
    },
    {
      id: 3,
      title: "Mobile Banking App",
      description: "User-friendly mobile banking application with intuitive UX and robust security features.",
      tech: ["React Native", "TypeScript", "Firebase"],
      status: "In Progress",
      year: "2025"
    },
    {
      id: 4,
      title: "Brand Identity Package",
      description: "Complete brand identity design including logo, typography, color palette, and brand guidelines.",
      tech: ["Adobe Illustrator", "Photoshop", "InDesign"],
      status: "Completed",
      year: "2023"
    }
  ];

  return (
    <motion.div 
      className="projects-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="projects-container">
        <motion.h1 
          className="projects-title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Projects
        </motion.h1>
        
        <motion.div 
          className="projects-grid"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <div className="project-year">{project.year}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
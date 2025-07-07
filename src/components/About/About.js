import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = ({ user }) => {
  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="about-container">
        <motion.div 
          className="about-content"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="about-title">About Me</h1>
          
          <div className="about-text">
            <p>
              I'm a passionate designer and developer who believes in the power of 
              clean design and meaningful user experiences. With a background in both 
              visual design and front-end development, I bridge the gap between 
              aesthetics and functionality.
            </p>
            
            <p>
              My approach combines minimalist design principles with modern web 
              technologies to create digital experiences that are both beautiful 
              and purposeful. I specialize in creating brand identities, user 
              interfaces, and web applications that tell compelling stories.
            </p>
            
            <p>
              When I'm not designing or coding, you can find me exploring new 
              creative techniques, reading about emerging technologies, or 
              enjoying a good cup of coffee while sketching new ideas.
            </p>
          </div>

          <div className="skills-section">
            <h2>Skills & Expertise</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Design</h3>
                <ul>
                  <li>Brand Identity</li>
                  <li>UI/UX Design</li>
                  <li>Typography</li>
                  <li>Illustration</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h3>Development</h3>
                <ul>
                  <li>React.js</li>
                  <li>JavaScript</li>
                  <li>CSS/SCSS</li>
                  <li>Node.js</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h3>Tools</h3>
                <ul>
                  <li>Figma</li>
                  <li>Adobe Creative Suite</li>
                  <li>VS Code</li>
                  <li>Git</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
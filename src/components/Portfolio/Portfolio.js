import React from 'react';
import { motion } from 'framer-motion';
import './Portfolio.css';

const Portfolio = ({ user }) => {
  return (
    <motion.div 
      className="portfolio-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
    >
      <div className="portfolio-container">
        <motion.div 
          className="hero-section"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hey, I'm <span className="accent-text">Alikhan</span>
            <br />
            But you can call me <span className="accent-text">RanchesW</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I'm a <span className="profession">graphic designer</span>, <span className="profession">UX/UI designer</span>
            <br />
            & <span className="profession">front-end web developer</span>
          </motion.p>

          <motion.div 
            className="loading-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Materializing creativity...
          </motion.div>
        </motion.div>

        <motion.div 
          className="featured-work"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Featured Work
          </motion.h2>
          <div className="work-grid">
            {[
              { title: "Web Development", desc: "Modern React applications with clean, responsive design" },
              { title: "UI/UX Design", desc: "User-centered design solutions for digital products" },
              { title: "Brand Identity", desc: "Creative branding solutions for modern businesses" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="work-item"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + (index * 0.2) }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="work-image">
                  <div className="placeholder-image">Project {index + 1}</div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Portfolio;
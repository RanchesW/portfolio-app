import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = ({ user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <motion.div 
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="contact-container">
        <motion.div 
          className="contact-header"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="contact-title">Let's Work Together</h1>
          <p className="contact-subtitle">
            I'm always interested in new opportunities and creative projects. 
            Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-form-section"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  required
                ></textarea>
              </div>

              <motion.button 
                type="submit" 
                className="submit-btn"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div 
            className="contact-info"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="contact-item">
              <h3>Email</h3>
              <p>{user?.email || 'hello@yourportfolio.com'}</p>
            </div>

            <div className="contact-item">
              <h3>Location</h3>
              <p>Available worldwide</p>
            </div>

            <div className="contact-item">
              <h3>Response Time</h3>
              <p>Usually within 24 hours</p>
            </div>

            <div className="social-links">
              <h3>Find Me Online</h3>
              <div className="social-grid">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="social-link">Dribbble</a>
                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="social-link">Behance</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
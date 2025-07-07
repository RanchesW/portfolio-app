import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Navigation.css';

const Navigation = ({ currentView, onNavigate, onLogout, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const menuItems = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <motion.nav 
      className="navigation"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-container">
        <motion.div 
          className="logo"
          onClick={() => onNavigate('portfolio')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {user?.username}
        </motion.div>

        <div className="nav-menu">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item.label}
            </motion.button>
          ))}
          
          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </motion.button>

          <motion.button
            className="logout-btn"
            onClick={onLogout}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Logout
          </motion.button>
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {isMenuOpen && (
        <motion.div 
          className="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`mobile-nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => {
                onNavigate(item.id);
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            className="mobile-theme-toggle"
            onClick={() => {
              toggleTheme();
              setIsMenuOpen(false);
            }}
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
          <button
            className="mobile-logout-btn"
            onClick={() => {
              onLogout();
              setIsMenuOpen(false);
            }}
          >
            Logout
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
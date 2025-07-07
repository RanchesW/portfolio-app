import React from 'react';
import { motion } from 'framer-motion';
import './MinimalBackground.css';

const MinimalBackground = () => {
  return (
    <div className="minimal-background">
      <motion.div 
        className="bg-dot dot1"
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="bg-dot dot2"
        animate={{ 
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default MinimalBackground;

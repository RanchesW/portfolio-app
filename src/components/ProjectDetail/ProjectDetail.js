import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectDetail.css';

const ProjectDetail = ({ project, onClose }) => {
  const [readme, setReadme] = useState('');
  const [languages, setLanguages] = useState({});

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        // Fetch README
        try {
          const readmeResponse = await fetch(
            `https://api.github.com/repos/${project.full_name}/readme`,
            {
              headers: {
                Accept: 'application/vnd.github.v3.raw',
              },
            }
          );
          if (readmeResponse.ok) {
            const readmeText = await readmeResponse.text();
            setReadme(readmeText.substring(0, 1000)); // First 1000 chars
          }
        } catch (err) {
          console.log('No README available');
        }

        // Fetch languages
        try {
          const languagesResponse = await fetch(project.languages_url);
          if (languagesResponse.ok) {
            const languagesData = await languagesResponse.json();
            setLanguages(languagesData);
          }
        } catch (err) {
          console.log('No languages data available');
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [project]);

  const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    HTML: '#e34c26',
    CSS: '#563d7c',
  };

  const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="project-detail-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        <motion.div
          className="project-detail-container"
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="project-detail-content">
            {/* Hero Section */}
            <motion.div
              className="detail-hero"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.h1
                className="detail-title"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.name}
              </motion.h1>

              <motion.p
                className="detail-description"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.description || 'No description available'}
              </motion.p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="detail-stats"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { label: 'Stars', value: project.stargazers_count, icon: '⭐' },
                { label: 'Forks', value: project.forks_count, icon: '🔱' },
                { label: 'Watchers', value: project.watchers_count, icon: '👁' },
                { label: 'Open Issues', value: project.open_issues_count, icon: '📋' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <span className="stat-icon">{stat.icon}</span>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Languages Bar */}
            {Object.keys(languages).length > 0 && (
              <motion.div
                className="languages-section"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="section-title">Languages</h3>
                <div className="languages-bar">
                  {Object.entries(languages).map(([lang, bytes], index) => (
                    <motion.div
                      key={lang}
                      className="language-segment"
                      style={{
                        width: `${(bytes / totalBytes) * 100}%`,
                        backgroundColor: languageColors[lang] || '#8b949e',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(bytes / totalBytes) * 100}%` }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                    />
                  ))}
                </div>
                <div className="languages-legend">
                  {Object.entries(languages).map(([lang, bytes]) => (
                    <motion.div
                      key={lang}
                      className="language-item"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <span
                        className="language-color"
                        style={{
                          backgroundColor: languageColors[lang] || '#8b949e',
                        }}
                      />
                      <span className="language-name">{lang}</span>
                      <span className="language-percent">
                        {((bytes / totalBytes) * 100).toFixed(1)}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Topics */}
            {project.topics && project.topics.length > 0 && (
              <motion.div
                className="topics-section"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="section-title">Topics</h3>
                <div className="topics-container">
                  {project.topics.map((topic, index) => (
                    <motion.span
                      key={topic}
                      className="topic-tag"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                    >
                      {topic}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* README Preview */}
            {readme && (
              <motion.div
                className="readme-section"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="section-title">README Preview</h3>
                <motion.div
                  className="readme-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  {readme}
                  {readme.length >= 1000 && '...'}
                </motion.div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              className="action-buttons"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button primary"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </motion.a>

              {project.homepage && (
                <motion.a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button secondary"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </motion.a>
              )}
            </motion.div>

            {/* Meta Info */}
            <motion.div
              className="meta-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
              <span>•</span>
              <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
              <span>•</span>
              <span>Size: {(project.size / 1024).toFixed(2)} MB</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetail;

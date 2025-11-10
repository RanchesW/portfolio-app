import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import './Projects.css';

const Projects = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${user.username}/repos?sort=updated&per_page=100`);

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const repos = await response.json();

        // Filter out forks and sort by stars
        const filteredRepos = repos
          .filter(repo => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);

        setProjects(filteredRepos);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub projects:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, [user.username]);

  if (loading) {
    return (
      <motion.div
        className="projects-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="projects-container">
          <h1 className="projects-title">Projects</h1>
          <div className="loading-message">Loading projects from GitHub...</div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="projects-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="projects-container">
          <h1 className="projects-title">Projects</h1>
          <div className="error-message">Error loading projects: {error}</div>
        </div>
      </motion.div>
    );
  }

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

        <motion.p
          className="projects-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {projects.length} repositories from GitHub
        </motion.p>

        <motion.div
          className="projects-grid"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="project-card"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="project-header">
                <h3 className="project-title">{project.name}</h3>
                {project.stargazers_count > 0 && (
                  <span className="project-stars">
                    ⭐ {project.stargazers_count}
                  </span>
                )}
              </div>

              <p className="project-description">
                {project.description || 'No description available'}
              </p>

              <div className="project-tech">
                {project.language && (
                  <span className="tech-tag">{project.language}</span>
                )}
                {project.topics && project.topics.slice(0, 4).map((topic, i) => (
                  <span key={i} className="tech-tag topic">{topic}</span>
                ))}
              </div>

              <div className="project-footer">
                <span className="project-updated">
                  Updated {new Date(project.updated_at).toLocaleDateString()}
                </span>
                {project.homepage && (
                  <span className="project-link">🔗 Live Demo</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </motion.div>
  );
};

export default Projects;
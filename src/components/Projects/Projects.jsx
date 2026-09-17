import { useState } from 'react';
import { projectsData } from '../../data/portfolioData';
import styles from './Projects.module.css';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Mobile Apps', value: 'mobile' },
  { label: 'Web Design', value: 'design' },
  { label: 'Development', value: 'development' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <div className="section-heading">
          <span className="subtitle">My Projects</span>
          <h2>Some of My Best Work</h2>
          <p>Here are a few of my favorite projects that showcase my skills in design and development.</p>
        </div>

        {/* Filter Buttons */}
        <div className={styles.filterButtons}>
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`${styles.filterBtn} ${activeFilter === filter.value ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={styles.projectCard}
              data-category={project.category}
            >
              <div className={styles.imageWrapper}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.projectImage}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.comingSoonPlaceholder}>
                    <span>Coming Soon</span>
                  </div>
                )}
                <div className={styles.imageOverlay}>
                  <a
                    href={project.github}
                    className={`${styles.overlayBtn} ${styles.githubBtn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    className={`${styles.overlayBtn} ${styles.liveBtn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 Live Demo
                  </a>
                </div>
              </div>

              <div className={styles.projectContent}>
                <h4 className={styles.projectTitle}>{project.title}</h4>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.projectTags}>
                  {project.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { projectsData } from '../../data/portfolioData';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.css';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Mobile Apps', value: 'mobile' },
  { label: 'Web Design', value: 'design' },
  { label: 'Development', value: 'development' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

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
          <p>Click on any project to explore its full architecture, features, and deep overview.</p>
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

        {/* Projects Grid with Interactive Magnetic 3D Cards */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Case Study Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

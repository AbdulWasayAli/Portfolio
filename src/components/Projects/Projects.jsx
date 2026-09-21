import { useState } from 'react';
import { projectsData } from '../../data/portfolioData';
import ProjectCard from './ProjectCard';
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

        {/* Projects Grid with Interactive Magnetic 3D Cards */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef, useState, useCallback } from 'react';
import styles from './Projects.module.css';

export default function ProjectCard({ project, onSelect }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Percentage coords (0 to 1)
    const px = x / rect.width;
    const py = y / rect.height;

    // Calculate rotation (-10deg to +10deg)
    const rx = (py - 0.5) * -16;
    const ry = (px - 0.5) * 16;

    setCoords({ x, y, rx, ry });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0, rx: 0, ry: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${styles.projectCard} ${isHovered ? styles.projectCardActive : ''}`}
      data-category={project.category}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect && onSelect(project)}
      style={{
        cursor: 'pointer',
        transform: isHovered
          ? `perspective(1000px) rotateX(${coords.rx}deg) rotateY(${coords.ry}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)',
      }}
    >
      {/* Interactive Torch Spotlight Reflection */}
      <div
        className={styles.spotlightGlow}
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(108, 99, 255, 0.22), transparent 70%)`,
        }}
      />

      {/* Border Spotlight Glow */}
      <div
        className={styles.spotlightBorder}
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(0, 212, 170, 0.45), transparent 60%)`,
        }}
      />

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
          <button
            type="button"
            className={`${styles.overlayBtn} ${styles.liveBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect && onSelect(project);
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>Overview</span>
          </button>
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              className={`${styles.overlayBtn} ${styles.githubBtn}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>

      <div className={styles.projectContent}>
        <div className={styles.titleRow}>
          <h4 className={styles.projectTitle}>{project.title}</h4>
          <span className={styles.detailHint} title="Click to view full case study">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </span>
        </div>
        <p className={styles.projectDesc}>{project.description}</p>
        <div className={styles.projectTags}>
          {project.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

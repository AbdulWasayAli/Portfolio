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

        {/* Option A: Futuristic Circular Glass Orb Action Nodes */}
        <div className={styles.orbOverlay}>
          <div className={styles.orbDock}>
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                className={`${styles.orbNode} ${styles.orbLive}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Live Demo"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className={styles.orbTooltip}>Live Demo</span>
              </a>
            )}
            <button
              type="button"
              className={`${styles.orbNode} ${styles.orbCase}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect && onSelect(project);
              }}
              aria-label="Case Study"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span className={styles.orbTooltip}>Case Study</span>
            </button>
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                className={`${styles.orbNode} ${styles.orbGit}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="GitHub Repository"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className={styles.orbTooltip}>GitHub</span>
              </a>
            )}
          </div>
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

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectModal.module.css';

export default function ProjectModal({ project, onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className={styles.modalOverlay} onClick={onClose}>
        {/* Backdrop Ambient Light */}
        <div className={styles.ambientBackdrop} />

        <motion.div
          ref={containerRef}
          className={styles.modalContainer}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          {/* Close Button */}
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Hero Image / Banner Showcase */}
          <div className={styles.modalHero} data-category={project.category}>
            <div className={styles.imageFrame}>
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.modalImage}
                />
              ) : (
                <div className={styles.placeholderBanner}>
                  <span>Project Showcase</span>
                </div>
              )}
            </div>
            <div className={styles.heroContent}>
              <span className={styles.categoryBadge}>{project.category}</span>
              <h2 className={styles.modalTitle}>{project.title}</h2>
              {project.subtitle && (
                <p className={styles.modalSubtitle}>{project.subtitle}</p>
              )}
            </div>
          </div>

          {/* Modal Body Info */}
          <div className={styles.modalBody}>
            {/* Action Bar */}
            <div className={styles.actionBar}>
              <div className={styles.tagsRow}>
                {project.tags.map((tag, idx) => (
                  <span key={idx} className={styles.tagPill}>{tag}</span>
                ))}
              </div>
              <div className={styles.actionBtns}>
                {project.github && project.github !== '#' && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>View Repository</span>
                  </a>
                )}
                {project.live && project.live !== '#' && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <span>Live Preview</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Overview Section */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.titleIcon}>📖</span>
                <span>Project Overview</span>
              </h3>
              <p className={styles.sectionText}>
                {project.overview || project.description}
              </p>
            </div>

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className={styles.sectionBlock}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.titleIcon}>⚡</span>
                  <span>Key Features & Capabilities</span>
                </h3>
                <ul className={styles.featuresList}>
                  {project.keyFeatures.map((feat, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <span className={styles.featureCheck}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Visual Showcase Gallery */}
            <div className={styles.sectionBlock}>
              <div className={styles.galleryHeader}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.titleIcon}>📸</span>
                  <span>Visual Showcase & Screenshots</span>
                </h3>
                <span className={styles.galleryBadge}>High-Res Previews</span>
              </div>

              {project.gallery && project.gallery.length > 0 ? (
                <div className={styles.galleryGrid}>
                  {project.gallery.map((imgUrl, i) => (
                    <div key={i} className={styles.galleryItem}>
                      <img src={imgUrl} alt={`${project.title} screenshot ${i + 1}`} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.galleryTeaserGrid}>
                  <div className={styles.teaserCard}>
                    <div className={styles.teaserIcon}>🖥️</div>
                    <span className={styles.teaserTitle}>Core Workflow Preview</span>
                    <span className={styles.teaserStatus}>Coming Soon</span>
                  </div>
                  <div className={styles.teaserCard}>
                    <div className={styles.teaserIcon}>📱</div>
                    <span className={styles.teaserTitle}>Responsive Views</span>
                    <span className={styles.teaserStatus}>Coming Soon</span>
                  </div>
                  <div className={styles.teaserCard}>
                    <div className={styles.teaserIcon}>✨</div>
                    <span className={styles.teaserTitle}>Component Breakdown</span>
                    <span className={styles.teaserStatus}>Coming Soon</span>
                  </div>
                </div>
              )}
            </div>

            {/* Architecture & Engineering */}
            {project.architecture && (
              <div className={styles.sectionBlock}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.titleIcon}>🛠️</span>
                  <span>Architecture & Stack</span>
                </h3>
                <div className={styles.architectureCard}>
                  <p>{project.architecture}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

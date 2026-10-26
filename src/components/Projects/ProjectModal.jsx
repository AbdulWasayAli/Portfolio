import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectModal.module.css';

export default function ProjectModal({ project, onClose }) {
  const containerRef = useRef(null);
  const [activeScreenTab, setActiveScreenTab] = useState(0);
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    // Dynamic Island live time
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [onClose, project]);

  if (!project) return null;

  const isMobile = project.category === 'mobile';

  // Screen mock states for interactive demo
  const mobileScreens = [
    { id: 'main', label: 'Primary View', title: 'Main Dashboard & Flow' },
    { id: 'features', label: 'Live Features', title: 'Feature Walkthrough' },
    { id: 'arch', label: 'Architecture', title: 'Tech Stack & Engine' }
  ];

  return (
    <AnimatePresence>
      <div className={styles.modalOverlay} onClick={onClose}>
        {/* Backdrop Ambient Light */}
        <div className={styles.ambientBackdrop} />

        <motion.div
          ref={containerRef}
          className={`${styles.modalContainer} ${isMobile ? styles.mobileModalMode : ''}`}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          {/* Close Button */}
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Interactive Device Showcase Header */}
          <div className={styles.showcaseStage} data-category={project.category}>
            {isMobile ? (
              /* ================== PHONE SIMULATOR (iPhone 16 Pro) ================== */
              <div className={styles.simulatorDeck}>
                <div className={styles.phoneSimulatorWrapper}>
                  {/* Titanium Ring Reflection */}
                  <div className={styles.phoneChassis}>
                    {/* Volume & Power buttons */}
                    <div className={styles.btnVolumeUp} />
                    <div className={styles.btnVolumeDown} />
                    <div className={styles.btnAction} />
                    <div className={styles.btnPower} />

                    {/* Phone Inner Bezel & Screen */}
                    <div className={styles.phoneScreen}>
                      {/* Dynamic Island & Status Bar */}
                      <div className={styles.phoneStatusBar}>
                        <span className={styles.phoneClock}>{currentTime}</span>
                        <div className={styles.dynamicIsland}>
                          <div className={styles.dynamicDot} />
                          <span className={styles.islandAppLabel}>
                            {project.title}
                          </span>
                          <div className={styles.islandWave}>
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                        <div className={styles.phoneIcons}>
                          <svg className={styles.statusSvg} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.23 19.57 10.56 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                          </svg>
                          <svg className={styles.statusSvg} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2 17h20v2H2zm1.15-4.05L4 11.85c3.27-3.27 8.57-3.27 11.84 0l.85 1.1-1.42 1.42-.85-1.1c-2.49-2.49-6.52-2.49-9.01 0l-.85 1.1-1.41-1.42z"/>
                          </svg>
                          <div className={styles.batteryIcon}>
                            <div className={styles.batteryFill} />
                          </div>
                        </div>
                      </div>

                      {/* Screen Content Viewport */}
                      <div className={styles.phoneViewport}>
                        {activeScreenTab === 0 ? (
                          <div className={styles.viewportImageWrap}>
                            {project.image ? (
                              <img
                                src={project.image}
                                alt={project.title}
                                className={styles.phoneAppImage}
                              />
                            ) : (
                              <div className={styles.simulatorPlaceholder}>
                                <span>No Screen Available</span>
                              </div>
                            )}
                            <div className={styles.screenGlassGlow} />
                          </div>
                        ) : activeScreenTab === 1 ? (
                          <div className={styles.simulatorFeatureView}>
                            <div className={styles.simAppHeader}>
                              <span className={styles.simAppTag}>Live Features</span>
                              <h4 className={styles.simAppTitle}>{project.title}</h4>
                            </div>
                            <div className={styles.simFeatureList}>
                              {project.keyFeatures?.slice(0, 4).map((feat, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.08 }}
                                  className={styles.simFeatureCard}
                                >
                                  <div className={styles.simCheckDot}>✓</div>
                                  <p>{feat}</p>
                                </motion.div>
                              ))}
                            </div>
                            <div className={styles.simInteractiveNotice}>
                              <span>● Live Client Simulator Active</span>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.simulatorTechView}>
                            <div className={styles.simAppHeader}>
                              <span className={styles.simAppTag}>Architecture</span>
                              <h4 className={styles.simAppTitle}>Tech Stack</h4>
                            </div>
                            <div className={styles.simTechPills}>
                              {project.tags.map((t, idx) => (
                                <span key={idx} className={styles.simTechChip}>{t}</span>
                              ))}
                            </div>
                            <div className={styles.simArchDetail}>
                              <p>{project.architecture || project.description}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Home Indicator Bar */}
                      <div className={styles.homeIndicator} />
                    </div>
                  </div>
                </div>

                {/* Simulator Switcher Controls */}
                <div className={styles.simulatorControls}>
                  <div className={styles.simPillSwitcher}>
                    {mobileScreens.map((screen, idx) => (
                      <button
                        key={screen.id}
                        onClick={() => setActiveScreenTab(idx)}
                        className={`${styles.simTabBtn} ${activeScreenTab === idx ? styles.activeTab : ''}`}
                      >
                        <span className={styles.tabDot} />
                        <span>{screen.label}</span>
                      </button>
                    ))}
                  </div>
                  <span className={styles.simHintText}>
                    Click tabs above to interact with the simulated iPhone display
                  </span>
                </div>
              </div>
            ) : (
              /* ================== MACOS CYBER BROWSER (Web Projects) ================== */
              <div className={styles.browserShowcase}>
                <div className={styles.browserWindow}>
                  {/* Browser Bar */}
                  <div className={styles.browserTitleBar}>
                    <div className={styles.trafficLights}>
                      <span className={styles.lightClose} />
                      <span className={styles.lightMin} />
                      <span className={styles.lightMax} />
                    </div>
                    <div className={styles.browserUrlBar}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>https://{project.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.wasay.dev</span>
                    </div>
                    <div className={styles.browserSpacer} />
                  </div>

                  {/* Browser Canvas Viewport */}
                  <div className={styles.browserViewport}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className={styles.browserImage}
                      />
                    ) : (
                      <div className={styles.placeholderBanner}>
                        <span>Web Platform Showcase</span>
                      </div>
                    )}
                    <div className={styles.screenGlassGlow} />
                  </div>
                </div>
              </div>
            )}

            {/* Showcase Header Info */}
            <div className={styles.heroContent}>
              <div className={styles.categoryMetaRow}>
                <span className={styles.categoryBadge}>{project.category}</span>
                <span className={styles.engineBadge}>
                  {isMobile ? 'Cross-Platform Flutter Engine' : 'Production Web System'}
                </span>
              </div>
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
              <div className={styles.sectionHeadingRow}>
                <div className={styles.titleIconBadge}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <h3 className={styles.sectionTitle}>Project Overview</h3>
              </div>
              <p className={styles.sectionText}>
                {project.overview || project.description}
              </p>
            </div>

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeadingRow}>
                  <div className={styles.titleIconBadge}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <h3 className={styles.sectionTitle}>Key Features & Engineering Capabilities</h3>
                </div>
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

            {/* Architecture & Engineering */}
            {project.architecture && (
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeadingRow}>
                  <div className={styles.titleIconBadge}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                      <line x1="6" y1="6" x2="6.01" y2="6" />
                      <line x1="6" y1="18" x2="6.01" y2="18" />
                    </svg>
                  </div>
                  <h3 className={styles.sectionTitle}>System Architecture & Stack</h3>
                </div>
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

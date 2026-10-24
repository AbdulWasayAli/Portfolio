import { useState, useRef, useCallback } from 'react';
import styles from './InteractiveBrandBanner.module.css';

export default function InteractiveBrandBanner() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 50, y: 50 });
  };

  return (
    <section
      ref={containerRef}
      className={styles.bannerSection}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Abdul Wasay Ali Signature Showcase"
    >
      <div className={styles.topBeam} />

      <div className={styles.bannerInner}>
        {/* Layer 1: Base Hollow Outline Text */}
        <h2 className={`${styles.brandText} ${styles.baseOutlineText}`}>
          ABDUL WASAY ALI
        </h2>

        {/* Layer 2: Glowing Dynamic Spotlight Reveal Text */}
        <h2
          className={`${styles.brandText} ${styles.spotlightText} ${isHovered ? styles.activeSpotlight : ''}`}
          style={{
            '--mouse-x': `${mousePos.x}%`,
            '--mouse-y': `${mousePos.y}%`,
          }}
          aria-hidden="true"
        >
          ABDUL WASAY ALI
        </h2>

        {/* Ambient Cursor Flare Halo */}
        <div
          className={`${styles.cursorHalo} ${isHovered ? styles.haloVisible : ''}`}
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
          }}
          aria-hidden="true"
        />

        {/* Bottom micro branding tag line */}
        <div className={styles.bottomTechBar}>
          <span className={styles.techBadge}>SOFTWARE ENGINEER</span>
          <span className={styles.dotDivider} />
          <span className={styles.techBadge}>FULL-STACK & MOBILE</span>
          <span className={styles.dotDivider} />
          <span className={styles.techBadge}>BASED IN KARACHI</span>
        </div>
      </div>

      <div className={styles.bottomBeam} />
    </section>
  );
}

import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './InteractiveBrandBanner.module.css';

export default function InteractiveBrandBanner() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const xPercent = (clientX / rect.width) * 100;
    const yPercent = (clientY / rect.height) * 100;
    setMousePos({ x: xPercent, y: yPercent });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((clientX - centerX) / centerX) * 8;
    const rotateX = -((clientY - centerY) / centerY) * 8;
    setTilt({ rotateX, rotateY });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
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

      <div 
        className={styles.bannerInner}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
      >
        {/* Base Always-Visible Luxury Metallic Text */}
        <h2 className={`${styles.brandText} ${styles.baseText}`}>
          ABDUL WASAY ALI
        </h2>

        {/* Interactive Luminous Spotlight Glow Overlay */}
        <h2
          className={`${styles.brandText} ${styles.spotlightText} ${isHovered ? styles.activeSpotlight : styles.idleSpotlight}`}
          style={{
            '--mouse-x': `${mousePos.x}%`,
            '--mouse-y': `${mousePos.y}%`,
          }}
          aria-hidden="true"
        >
          ABDUL WASAY ALI
        </h2>

        {/* Soft Reactive Cursor Halo */}
        <div
          className={`${styles.cursorHalo} ${isHovered ? styles.haloVisible : ''}`}
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
          }}
          aria-hidden="true"
        />

        {/* Bottom Technical Identity Bar */}
        <div className={styles.bottomTechBar}>
          <span className={styles.techBadge}>SOFTWARE ENGINEER</span>
          <span className={styles.dotDivider} />
          <span className={styles.techBadge}>FULL-STACK &amp; MOBILE</span>
          <span className={styles.dotDivider} />
          <span className={styles.techBadge}>BASED IN KARACHI</span>
        </div>
      </div>

      <div className={styles.bottomBeam} />
    </section>
  );
}

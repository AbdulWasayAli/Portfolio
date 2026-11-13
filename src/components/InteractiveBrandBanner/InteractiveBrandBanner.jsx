import { useState, useEffect, useRef } from 'react';
import styles from './InteractiveBrandBanner.module.css';

const STATEMENT = "Turning ideas into high-performance software & mobile apps.";

export default function InteractiveBrandBanner() {
  const containerRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Trigger typing once when user scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.35 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Smooth, calm typing — types once and stays still
  useEffect(() => {
    if (!hasStarted || isFinished) return;

    if (displayText.length < STATEMENT.length) {
      const timer = setTimeout(() => {
        setDisplayText(STATEMENT.substring(0, displayText.length + 1));
      }, 35);
      return () => clearTimeout(timer);
    } else {
      setIsFinished(true);
    }
  }, [hasStarted, displayText, isFinished]);

  return (
    <section
      ref={containerRef}
      className={styles.bannerSection}
      aria-label="Abdul Wasay Ali Signature"
    >
      <div className={styles.topBeam} />
      <div className={styles.ambientGlow} />

      <div className={styles.bannerInner}>
        {/* Subtle Luxury Status Pill */}
        <div className={styles.statusPill}>
          <span className={styles.statusDot} />
          <span className={styles.statusLabel}>SOFTWARE ENGINEER // ARCHITECT</span>
        </div>

        {/* Stable, Grand, Luxury Name */}
        <h2 className={styles.brandTitle}>
          <span className={styles.brandText}>ABDUL WASAY ALI</span>
        </h2>

        {/* Calm Typewriter Subtitle — types once and stays still */}
        <div className={styles.typingBox}>
          <span className={styles.promptSymbol}>$&gt;</span>
          <span className={styles.statementText}>{displayText}</span>
          <span className={`${styles.cursor} ${isFinished ? styles.cursorIdle : ''}`}>|</span>
        </div>

        {/* Minimal Professional Badges */}
        <div className={styles.badgeRow}>
          <span className={styles.badge}>FULL-STACK WEB</span>
          <span className={styles.badgeDot} />
          <span className={styles.badge}>MOBILE APPS</span>
          <span className={styles.badgeDot} />
          <span className={styles.badge}>SCALABLE ARCHITECTURE</span>
          <span className={styles.badgeDot} />
          <span className={styles.badge}>KARACHI, PK</span>
        </div>
      </div>

      <div className={styles.bottomBeam} />
    </section>
  );
}

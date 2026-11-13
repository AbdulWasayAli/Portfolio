import { useState, useRef, useEffect } from 'react';
import styles from './InteractiveBrandBanner.module.css';

export default function InteractiveBrandBanner() {
  const containerRef = useRef(null);

  // Mouse & Glow state with organic slow-bloom physics
  const mouse = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    // Slow, luxurious glow bloom
    currentAlpha: 0,
    targetAlpha: 0,
    currentRadius: 80,
    targetRadius: 80,
  });

  const [glowState, setGlowState] = useState({
    x: 0,
    y: 0,
    alpha: 0,
    radius: 80,
  });

  useEffect(() => {
    let animId;

    const update = () => {
      const m = mouse.current;

      // Smooth position gliding (liquid tracking)
      m.currentX += (m.targetX - m.currentX) * 0.09;
      m.currentY += (m.targetY - m.currentY) * 0.09;

      // Gradual, slow-blooming glow fade-in
      m.currentAlpha += (m.targetAlpha - m.currentAlpha) * 0.042;

      // Organic radius blooming (expands gently like waking light)
      m.currentRadius += (m.targetRadius - m.currentRadius) * 0.048;

      setGlowState({
        x: m.currentX,
        y: m.currentY,
        alpha: m.currentAlpha,
        radius: m.currentRadius,
      });

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouse.current.targetX = x;
    mouse.current.targetY = y;
    mouse.current.targetAlpha = 1;
    mouse.current.targetRadius = 260;
  };

  const handleMouseEnter = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Initialize position at entrance point
    mouse.current.currentX = x;
    mouse.current.currentY = y;
    mouse.current.targetX = x;
    mouse.current.targetY = y;

    // Start bloom from soft center
    mouse.current.currentRadius = 90;
    mouse.current.targetRadius = 260;
    mouse.current.targetAlpha = 1;
  };

  const handleMouseLeave = () => {
    // Graceful fade down
    mouse.current.targetAlpha = 0;
    mouse.current.targetRadius = 80;
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
      <div className={styles.bannerInner}>
        <div className={styles.textWrapper}>
          {/* Base Clean Titanium Text */}
          <h2 className={`${styles.brandText} ${styles.baseOutlineText}`}>
            ABDUL WASAY ALI
          </h2>

          {/* Slow Blooming Ambient Backlight */}
          <div
            className={styles.ambientBacklight}
            style={{
              left: `${glowState.x}px`,
              top: `${glowState.y}px`,
              width: `${glowState.radius * 2.2}px`,
              height: `${glowState.radius * 1.8}px`,
              opacity: glowState.alpha * 0.45,
            }}
            aria-hidden="true"
          />

          {/* Smooth Slow-Glow Fluid Spotlight */}
          <h2
            className={`${styles.brandText} ${styles.spotlightText}`}
            style={{
              '--spotlight-x': `${glowState.x}px`,
              '--spotlight-y': `${glowState.y}px`,
              '--spotlight-radius': `${glowState.radius}px`,
              opacity: glowState.alpha,
            }}
            aria-hidden="true"
          >
            ABDUL WASAY ALI
          </h2>
        </div>
      </div>
    </section>
  );
}

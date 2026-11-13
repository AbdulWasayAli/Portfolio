import { useState, useRef, useEffect } from 'react';
import styles from './InteractiveBrandBanner.module.css';

export default function InteractiveBrandBanner() {
  const containerRef = useRef(null);

  // Mouse & Glow state with calm, slow liquid physics
  const mouse = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    currentAlpha: 0,
    targetAlpha: 0,
  });

  const [glowState, setGlowState] = useState({
    x: 0,
    y: 0,
    alpha: 0,
  });

  useEffect(() => {
    let animId;

    const update = () => {
      const m = mouse.current;

      // Slow, graceful liquid tracking (calm & gentle)
      m.currentX += (m.targetX - m.currentX) * 0.055;
      m.currentY += (m.targetY - m.currentY) * 0.055;

      // Smooth slow fade in / fade out
      m.currentAlpha += (m.targetAlpha - m.currentAlpha) * 0.04;

      setGlowState({
        x: m.currentX,
        y: m.currentY,
        alpha: m.currentAlpha,
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
  };

  const handleMouseEnter = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouse.current.currentX = x;
    mouse.current.currentY = y;
    mouse.current.targetX = x;
    mouse.current.targetY = y;
    mouse.current.targetAlpha = 1;
  };

  const handleMouseLeave = () => {
    mouse.current.targetAlpha = 0;
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
          {/* Base Clean Outlined Text (Filled with bg color so no internal contour seams) */}
          <h2 className={`${styles.brandText} ${styles.baseOutlineText}`}>
            ABDUL WASAY ALI
          </h2>

          {/* Color STRICTLY inside the letters only — zero bleed into background */}
          <h2
            className={`${styles.brandText} ${styles.spotlightText}`}
            style={{
              '--spotlight-x': `${glowState.x}px`,
              '--spotlight-y': `${glowState.y}px`,
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

import { useState, useRef, useEffect } from 'react';
import styles from './InteractiveBrandBanner.module.css';

export default function InteractiveBrandBanner() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  // Mouse coordinates with smooth lerp interpolation
  const mouse = useRef({
    currentX: 50,
    currentY: 50,
    targetX: 50,
    targetY: 50,
    isHovered: false,
    alpha: 0,
    targetAlpha: 0,
  });

  const [mousePos, setMousePos] = useState({ x: 50, y: 50, alpha: 0 });

  useEffect(() => {
    let animId;

    const update = () => {
      const m = mouse.current;
      // Butter-smooth lerp (fluid liquid tracking like Sheryians)
      m.currentX += (m.targetX - m.currentX) * 0.12;
      m.currentY += (m.targetY - m.currentY) * 0.12;
      m.alpha += (m.targetAlpha - m.alpha) * 0.1;

      setMousePos({
        x: m.currentX,
        y: m.currentY,
        alpha: m.alpha,
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

  const handleMouseEnter = () => {
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
      <div className={styles.topBeam} />

      <div className={styles.bannerInner}>
        {/* Modern Flat Spotlight Typography (Sheryians Style) */}
        <div ref={textRef} className={styles.textWrapper}>
          {/* Base Clean Outlined Text */}
          <h2 className={`${styles.brandText} ${styles.baseOutlineText}`}>
            ABDUL WASAY ALI
          </h2>

          {/* Smooth Cursor-Following Fluid Gradient Spotlight */}
          <h2
            className={`${styles.brandText} ${styles.spotlightText}`}
            style={{
              '--spotlight-x': `${mousePos.x}px`,
              '--spotlight-y': `${mousePos.y}px`,
              opacity: mousePos.alpha,
            }}
            aria-hidden="true"
          >
            ABDUL WASAY ALI
          </h2>
        </div>
      </div>

      <div className={styles.bottomBeam} />
    </section>
  );
}

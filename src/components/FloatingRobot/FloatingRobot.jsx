import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './FloatingRobot.module.css';

export default function FloatingRobot() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const robotRef = useRef(null);

  // Smooth mouse tracking
  const handleMouseMove = useCallback((e) => {
    if (!robotRef.current) return;
    const rect = robotRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // 3D rotation based on mouse
    const rotY = Math.max(-18, Math.min(18, (deltaX / window.innerWidth) * 36));
    const rotX = Math.max(-18, Math.min(18, -(deltaY / window.innerHeight) * 36));
    setRotation({ x: rotX, y: rotY });

    // Independent pupil tracking
    const angle = Math.atan2(deltaY, deltaX);
    const dist = Math.min(3.2, Math.hypot(deltaX, deltaY) / 55);
    setEyePos({
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <aside aria-label="Visual Cyber Companion" className={styles.companionContainer}>
      {/* Pure Visual Ambient 3D Robot */}
      <div
        ref={robotRef}
        className={styles.robotStage}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow */}
        <div className={styles.glow} />

        {/* Orbit Ring */}
        <div className={styles.orbitRing} />

        {/* 3D Mesh Body */}
        <div
          className={styles.robotMesh}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {/* Antenna */}
          <div className={styles.antenna}>
            <div className={styles.antennaBall} />
            <div className={styles.antennaStem} />
          </div>

          {/* Head */}
          <div className={styles.head}>
            <div className={styles.visor}>
              <div className={styles.scanLine} />

              {/* Eyes tracking cursor */}
              <div className={styles.eyeRow}>
                <div className={styles.eyeSocket}>
                  <div
                    className={`${styles.eye} ${isHovered ? styles.blink : ''}`}
                    style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
                  />
                </div>
                <div className={styles.eyeSocket}>
                  <div
                    className={`${styles.eye} ${isHovered ? styles.blink : ''}`}
                    style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
                  />
                </div>
              </div>

              {/* Visor Grill */}
              <div className={styles.mouth}>
                <span /><span /><span />
              </div>
            </div>

            {/* Ears */}
            <div className={`${styles.ear} ${styles.earLeft}`}>
              <div className={styles.earDot} />
            </div>
            <div className={`${styles.ear} ${styles.earRight}`}>
              <div className={styles.earDot} />
            </div>
          </div>

          {/* Neck */}
          <div className={styles.neck} />

          {/* Chest */}
          <div className={styles.chest}>
            <div className={styles.coreReactor} />
            <div className={styles.chestLines}>
              <span /><span /><span />
            </div>
          </div>

          {/* Arms */}
          <div className={`${styles.arm} ${styles.armLeft}`}>
            <div className={styles.shoulder} />
            <div className={styles.forearm} />
          </div>
          <div className={`${styles.arm} ${styles.armRight}`}>
            <div className={styles.shoulder} />
            <div className={styles.forearm} />
          </div>
        </div>

        {/* Mascot Status Label */}
        <div className={styles.statusPill}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>Wasay Bot</span>
        </div>
      </div>
    </aside>
  );
}

import { useEffect, useState, useRef } from 'react';
import styles from './CyberCursor.module.css';

export default function CyberCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth lerp coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only enable on pointer fine devices (desktop/laptop with mouse)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Direct placement of central neon dot for instant responsiveness
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovered element is interactive
      const target = e.target;
      const isInteractive = Boolean(
        target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]') ||
        target.closest('.btn') ||
        target.closest('[class*="Card"]')
      );
      setIsPointer(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth fluid physics animation loop for trailing ring
    const render = () => {
      // Linear interpolation (lerp) for trailing magnetic ring
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  return (
    <div
      className={`${styles.cursorContainer} ${isVisible ? styles.visible : ''} ${
        isPointer ? styles.pointerMode : ''
      } ${isClicking ? styles.clickingMode : ''}`}
      aria-hidden="true"
    >
      {/* Trailing Fluid Magnetic Ring */}
      <div ref={ringRef} className={styles.cursorRing}>
        <div className={styles.ringGlow} />
      </div>

      {/* Instant Central Neon Core */}
      <div ref={dotRef} className={styles.cursorDot} />
    </div>
  );
}

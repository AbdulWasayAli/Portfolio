import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only enable on non-touch devices with precision pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Mouse coordinates
    let mouseX = -100;
    let mouseY = -100;

    // Smooth ring interpolated coordinates
    let ringX = -100;
    let ringY = -100;

    let isVisible = false;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        ringX = mouseX;
        ringY = mouseY;
      }

      // Instant 0ms hardware transform for the dot (Zero lag)
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    // Smooth 60/120fps lerp loop for the outer ring
    const render = () => {
      // 0.25 easing factor gives a tight, snappy, yet fluid trailing motion without feeling delayed
      ringX += (mouseX - ringX) * 0.28;
      ringY += (mouseY - ringY) * 0.28;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    // Hover detection without heavy re-renders
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isClickable =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (isClickable) {
        dot.classList.add(styles.dotHovering);
        ring.classList.add(styles.ringHovering);
      } else {
        dot.classList.remove(styles.dotHovering);
        ring.classList.remove(styles.ringHovering);
      }
    };

    const handleMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      isVisible = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.cursorDot} />
      <div ref={ringRef} className={styles.cursorRing} />
    </>
  );
}

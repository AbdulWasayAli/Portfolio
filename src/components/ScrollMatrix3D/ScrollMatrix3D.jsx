import { useEffect, useRef } from 'react';
import styles from './ScrollMatrix3D.module.css';

export default function ScrollMatrix3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Scroll state tracking with smooth lerp interpolation
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Interactive mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 3D Particles Matrix Generation
    const PARTICLE_COUNT = 90;
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2200,
        y: (Math.random() - 0.5) * 2200,
        z: Math.random() * 1800 + 100,
        baseX: (Math.random() - 0.5) * 2200,
        baseY: (Math.random() - 0.5) * 2200,
        radius: Math.random() * 1.8 + 1,
        colorType: Math.random() > 0.4 ? 'cyan' : 'violet', // Signature brand palette
      });
    }

    // 3D Floating Geometry Nodes (Hexagons & Cyber Rings)
    const floatingNodes = [
      { x: -350, y: -200, z: 600, rotX: 0, rotY: 0, size: 90 },
      { x: 380, y: 150, z: 800, rotX: 0, rotY: 0, size: 120 },
      { x: -280, y: 400, z: 1100, rotX: 0, rotY: 0, size: 100 },
      { x: 300, y: -450, z: 1400, rotX: 0, rotY: 0, size: 130 },
    ];

    let time = 0;

    // Render Loop
    const render = () => {
      time += 0.015;

      // Smooth lerp for scroll and mouse
      currentScroll += (targetScroll - currentScroll) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const fov = 420;
      const cx = width / 2;
      const cy = height / 2;

      // Scroll speed calculation for warp effect
      const scrollDelta = (targetScroll - currentScroll);
      const warpSpeed = Math.abs(scrollDelta) * 0.25;

      // Camera Z-Position driven by scroll
      const cameraZ = currentScroll * 0.85;

      // Render 3D Floating Geometry Nodes
      floatingNodes.forEach((node) => {
        // Continuous rotation driven by time + scroll
        node.rotX = time * 0.3 + currentScroll * 0.0015;
        node.rotY = time * 0.5 + currentScroll * 0.002;

        const relZ = ((node.z - cameraZ) % 1800 + 1800) % 1800 + 100;
        const scale = fov / (fov + relZ);
        const screenX = cx + (node.x + mouseX * 60) * scale;
        const screenY = cy + (node.y + mouseY * 60) * scale;

        if (relZ > 50 && scale > 0.05) {
          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.rotate(node.rotY);

          const alpha = Math.min(0.45, Math.max(0.12, (1 - relZ / 1800) * 0.65));
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
          ctx.lineWidth = 1.8 * scale;

          // Draw 3D Wireframe Hexagon
          ctx.beginPath();
          for (let s = 0; s < 6; s++) {
            const angle = (s * Math.PI) / 3;
            const hx = Math.cos(angle) * (node.size * scale);
            const hy = Math.sin(angle) * (node.size * scale) * Math.cos(node.rotX);
            if (s === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();

          // Subtle inner core point with glowing neon
          ctx.fillStyle = `rgba(108, 99, 255, ${alpha * 1.8})`;
          ctx.beginPath();
          ctx.arc(0, 0, 3.5 * scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      });

      // Render 3D Space Matrix Particles
      particles.forEach((p) => {
        // Z motion driven by scroll fly-through
        let effectiveZ = ((p.z - cameraZ - (warpSpeed * 2.5)) % 1800 + 1800) % 1800;
        if (effectiveZ < 10) effectiveZ = 1800;

        const scale = fov / (fov + effectiveZ);
        const parallaxX = mouseX * 55 * scale;
        const parallaxY = mouseY * 55 * scale;

        const screenX = cx + (p.x * scale) + parallaxX;
        const screenY = cy + (p.y * scale) + parallaxY;

        // Depth-based opacity - significantly boosted
        const depthAlpha = Math.max(0, Math.min(0.75, (1 - effectiveZ / 1800) * 0.95));

        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height && depthAlpha > 0.05) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, Math.max(1.2, p.radius * scale * 1.5), 0, Math.PI * 2);

          if (p.colorType === 'cyan') {
            ctx.fillStyle = `rgba(0, 229, 255, ${depthAlpha})`;
          } else {
            ctx.fillStyle = `rgba(108, 99, 255, ${depthAlpha})`;
          }
          ctx.fill();

          // If warp speed is active (scrolling fast), draw subtle velocity streaks
          if (warpSpeed > 1.2) {
            const streakLen = Math.min(35, warpSpeed * 3 * scale);
            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(screenX, screenY - streakLen);
            ctx.strokeStyle = `rgba(0, 229, 255, ${depthAlpha * 0.4})`;
            ctx.lineWidth = 1 * scale;
            ctx.stroke();
          }
        }
      });

      // Subtle dynamic perspective cyber lines near edges
      const edgeAlpha = Math.min(0.08, 0.03 + (warpSpeed * 0.01));
      ctx.strokeStyle = `rgba(0, 229, 255, ${edgeAlpha})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      // Left guide perspective
      ctx.moveTo(cx - 200 * (1 + warpSpeed * 0.05), cy + 250);
      ctx.lineTo(0, height);
      // Right guide perspective
      ctx.moveTo(cx + 200 * (1 + warpSpeed * 0.05), cy + 250);
      ctx.lineTo(width, height);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.scroll3DWrapper}>
      <canvas ref={canvasRef} className={styles.canvas3D} />
    </div>
  );
}

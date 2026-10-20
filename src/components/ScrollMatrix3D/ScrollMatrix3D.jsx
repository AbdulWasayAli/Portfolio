import { useEffect, useRef } from 'react';
import styles from './ScrollMatrix3D.module.css';

export default function ScrollMatrix3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use alpha: true and desynchronized for highest possible GPU framerate
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Optimized smooth scroll tracking
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Interactive cursor with dampening
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, isHovered: false };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // ========================================================
    // HIGH-PERFORMANCE 3D NEURAL MESH (Zero Lag & 60-120 FPS)
    // ========================================================
    const NODE_COUNT = 48; // Optimized for silky-smooth 60-120fps rendering
    const BOUNDS_X = 1400;
    const BOUNDS_Y = 1000;
    const BOUNDS_Z = 1500;

    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * BOUNDS_X,
        y: (Math.random() - 0.5) * BOUNDS_Y,
        z: Math.random() * BOUNDS_Z,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2 + 1.2,
        pulseOffset: Math.random() * Math.PI * 2,
        isHub: i % 7 === 0, // Evenly spaced energy hubs
      });
    }

    // Pre-calculated synaptic connections for O(N) rendering instead of O(N^2)
    // Nodes maintain consistent connections instead of checking distance every frame
    const neighbors = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const neighborList = [];
      for (let j = 0; j < NODE_COUNT; j++) {
        if (i !== j && (Math.abs(i - j) <= 3 || (i % 5 === 0 && j % 5 === 0))) {
          neighborList.push(j);
        }
      }
      neighbors.push(neighborList);
    }

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.016;

      // Smooth camera interpolation
      currentScroll += (targetScroll - currentScroll) * 0.08;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const fov = 480;
      const cx = width / 2;
      const cy = height / 2;

      // Camera 3D coordinates influenced by scroll elevation and mouse tilt
      const scrollProgress = currentScroll * 0.75;
      const rotY = ((mouse.x - cx) / width) * 0.3;
      const rotX = ((mouse.y - cy) / height) * 0.2;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // 1. Update & Project Nodes
      const projected = new Array(NODE_COUNT);

      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];

        // Kinetic drift
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;

        // Boundary wrap
        if (n.x < -BOUNDS_X / 2) n.x = BOUNDS_X / 2;
        if (n.x > BOUNDS_X / 2) n.x = -BOUNDS_X / 2;
        if (n.y < -BOUNDS_Y / 2) n.y = BOUNDS_Y / 2;
        if (n.y > BOUNDS_Y / 2) n.y = -BOUNDS_Y / 2;
        if (n.z < 0) n.z = BOUNDS_Z;
        if (n.z > BOUNDS_Z) n.z = 0;

        // Camera scroll translation (Continuous 3D fly-through)
        let relZ = ((n.z - scrollProgress) % BOUNDS_Z + BOUNDS_Z) % BOUNDS_Z + 60;

        // 3D Rotation
        let x1 = n.x * cosY + relZ * sinY;
        let z1 = -n.x * sinY + relZ * cosY;
        let y1 = n.y * cosX - z1 * sinX;
        let z2 = n.y * sinX + z1 * cosX;

        if (z2 <= 20) {
          projected[i] = null;
          continue;
        }

        const scale = fov / (fov + z2);
        const screenX = cx + x1 * scale;
        const screenY = cy + y1 * scale;

        // Mouse Gravitational Interaction
        if (mouse.isHovered) {
          const dx = screenX - mouse.x;
          const dy = screenY - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 40000 && distSq > 1) { // 200px radius
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 200) * 1.4;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }

        const depthAlpha = Math.max(0, Math.min(1, (1 - z2 / BOUNDS_Z) * 1.15));
        const pulse = Math.sin(time * 2.5 + n.pulseOffset) * 0.3 + 0.7;

        projected[i] = {
          screenX,
          screenY,
          z: z2,
          scale,
          depthAlpha,
          pulse,
          isHub: n.isHub,
          radius: n.radius,
        };
      }

      // 2. High-Performance Batched Synaptic Connections
      ctx.lineWidth = 1;
      for (let i = 0; i < NODE_COUNT; i++) {
        const p1 = projected[i];
        if (!p1) continue;

        const neighborList = neighbors[i];
        for (let k = 0; k < neighborList.length; k++) {
          const j = neighborList[k];
          if (j <= i) continue; // avoid double drawing

          const p2 = projected[j];
          if (!p2) continue;

          const dx = p1.screenX - p2.screenX;
          const dy = p1.screenY - p2.screenY;
          const distSq = dx * dx + dy * dy;

          // Only connect if within 190px screen space
          if (distSq < 36100) {
            const dist = Math.sqrt(distSq);
            const connAlpha = (1 - dist / 190) * p1.depthAlpha * p2.depthAlpha * 0.45;

            ctx.strokeStyle = `rgba(0, 229, 255, ${connAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.stroke();
          }
        }
      }

      // 3. High-Performance Batched Node Rendering
      for (let i = 0; i < NODE_COUNT; i++) {
        const p = projected[i];
        if (!p) continue;

        const r = Math.max(1.2, p.radius * p.scale * (p.isHub ? 1.6 : 1.1));
        const alpha = Math.min(0.9, p.depthAlpha * p.pulse);

        // Core dot
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, r, 0, Math.PI * 2);

        if (p.isHub) {
          ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
          ctx.fill();

          // Ambient halo ring without expensive shadowBlur
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, r * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 229, 255, ${alpha * 0.15})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, r * 1.8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.4})`;
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(165, 180, 252, ${alpha * 0.8})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.scroll3DWrapper}>
      <canvas ref={canvasRef} className={styles.canvas3D} />
    </div>
  );
}

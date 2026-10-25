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
    // 3D CYBER WARP SPEED & CONSTELLATION TUNNEL (BUTTERY 60-120 FPS)
    // ========================================================
    const STAR_COUNT = 90;     // Optimized star count for zero-lag silky smooth scrolling
    const NODE_COUNT = 38;     // Geometric constellation nodes
    const BOUNDS_X = 1600;
    const BOUNDS_Y = 1100;
    const BOUNDS_Z = 1800;

    // Stars for warp-speed hyperspace streaks
    const stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * BOUNDS_X * 1.4,
        y: (Math.random() - 0.5) * BOUNDS_Y * 1.4,
        z: Math.random() * BOUNDS_Z,
        pz: 0,
        speed: 1.2 + Math.random() * 2.2,
        brightness: 0.35 + Math.random() * 0.65,
        size: Math.random() * 1.6 + 0.8,
        hue: Math.random() > 0.5 ? 260 : 195, // Violet / Cyan
      });
    }

    // Constellation geometric nodes
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * BOUNDS_X,
        y: (Math.random() - 0.5) * BOUNDS_Y,
        z: Math.random() * BOUNDS_Z,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1.2,
        pulseOffset: Math.random() * Math.PI * 2,
        isHub: i % 5 === 0,
        isCyan: i % 2 === 0,
      });
    }

    // Lightweight fixed synaptic connections
    const connections = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (j - i <= 2) {
          connections.push([i, j]);
        }
      }
    }

    let time = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    // Render loop
    const render = () => {
      time += 0.016;

      // Track scroll delta & velocity for dynamic hyperspace plunge
      const scrollDelta = targetScroll - currentScroll;
      currentScroll += scrollDelta * 0.09;

      const rawVel = Math.abs(currentScroll - lastScrollY);
      lastScrollY = currentScroll;
      scrollVelocity += (rawVel - scrollVelocity) * 0.12;

      // Dynamic warp factor based on scroll velocity (boosts speed and streaking)
      const warpSpeed = Math.min(22, 1.2 + scrollVelocity * 0.95);

      // Smooth mouse interaction
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const fov = 420;
      const cx = width / 2;
      const cy = height / 2;

      // Interactive 3D camera angles
      const rotY = ((mouse.x - cx) / width) * 0.35;
      const rotX = ((mouse.y - cy) / height) * 0.25;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // ========================================================
      // 1. RENDER 3D WARP SPEED STARFIELD STREAKS
      // ========================================================
      for (let i = 0; i < STAR_COUNT; i++) {
        const s = stars[i];
        s.pz = s.z;

        // Plunge through 3D space
        s.z -= s.speed * warpSpeed;
        if (s.z <= 10) {
          s.z = BOUNDS_Z;
          s.pz = BOUNDS_Z;
          s.x = (Math.random() - 0.5) * BOUNDS_X * 1.5;
          s.y = (Math.random() - 0.5) * BOUNDS_Y * 1.5;
        }

        // Camera rotation
        const x1 = s.x * cosY + s.z * sinY;
        const z1 = -s.x * sinY + s.z * cosY;
        const y1 = s.y * cosX - z1 * sinX;
        const z2 = s.y * sinX + z1 * cosX;

        // Previous point for motion vector streak
        const px1 = s.x * cosY + s.pz * sinY;
        const pz1 = -s.x * sinY + s.pz * cosY;
        const py1 = s.y * cosX - pz1 * sinX;
        const pz2 = s.y * sinX + pz1 * cosX;

        if (z2 <= 20 || pz2 <= 20) continue;

        const scale = fov / (fov + z2);
        const sx = cx + x1 * scale;
        const sy = cy + y1 * scale;

        const pscale = fov / (fov + pz2);
        const psx = cx + px1 * pscale;
        const psy = cy + py1 * pscale;

        const depthFade = Math.max(0, Math.min(1, (1 - z2 / BOUNDS_Z) * 1.2));
        const alpha = depthFade * s.brightness * (0.35 + Math.min(0.65, scrollVelocity * 0.08));

        // Draw warp streak when moving fast, or soft glowing star point when stationary
        ctx.beginPath();
        if (scrollVelocity > 0.8) {
          ctx.strokeStyle = `hsla(${s.hue}, 90%, 75%, ${alpha})`;
          ctx.lineWidth = Math.max(1, s.size * scale * (1 + scrollVelocity * 0.08));
          ctx.moveTo(psx, psy);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        } else {
          ctx.fillStyle = `hsla(${s.hue}, 85%, 75%, ${alpha * 0.9})`;
          ctx.arc(sx, sy, Math.max(1, s.size * scale), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ========================================================
      // 2. PROJECT 3D CONSTELLATION NODES & MESH
      // ========================================================
      const projected = new Array(NODE_COUNT);

      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];

        // Kinetic orbital drift
        n.x += n.vx;
        n.y += n.vy;
        n.z -= warpSpeed * 0.45; // Move towards camera along with scroll

        // Boundary wrap
        if (n.x < -BOUNDS_X / 2) n.x = BOUNDS_X / 2;
        if (n.x > BOUNDS_X / 2) n.x = -BOUNDS_X / 2;
        if (n.y < -BOUNDS_Y / 2) n.y = BOUNDS_Y / 2;
        if (n.y > BOUNDS_Y / 2) n.y = -BOUNDS_Y / 2;
        if (n.z < 20) n.z = BOUNDS_Z;

        // 3D Matrix Rotation
        const x1 = n.x * cosY + n.z * sinY;
        const z1 = -n.x * sinY + n.z * cosY;
        const y1 = n.y * cosX - z1 * sinX;
        const z2 = n.y * sinX + z1 * cosX;

        if (z2 <= 20) {
          projected[i] = null;
          continue;
        }

        const scale = fov / (fov + z2);
        const screenX = cx + x1 * scale;
        const screenY = cy + y1 * scale;

        // Interactive mouse deflection
        if (mouse.isHovered) {
          const dx = screenX - mouse.x;
          const dy = screenY - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 48400 && distSq > 1) { // 220px radius
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 220) * 1.8;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }

        const depthAlpha = Math.max(0, Math.min(1, (1 - z2 / BOUNDS_Z) * 1.25));
        const pulse = Math.sin(time * 3 + n.pulseOffset) * 0.35 + 0.65;

        projected[i] = {
          screenX,
          screenY,
          scale,
          depthAlpha,
          pulse,
          isHub: n.isHub,
          radius: n.radius,
          isCyan: n.isCyan,
        };
      }

      // ========================================================
      // 3. DRAW SYNAPTIC CONSTELLATION WEB LINES
      // ========================================================
      ctx.lineWidth = 1;
      for (let k = 0; k < connections.length; k++) {
        const [i, j] = connections[k];
        const p1 = projected[i];
        const p2 = projected[j];
        if (!p1 || !p2) continue;

        const dx = p1.screenX - p2.screenX;
        const dy = p1.screenY - p2.screenY;
        const distSq = dx * dx + dy * dy;

        // 220px distance threshold
        if (distSq < 48400) {
          const dist = Math.sqrt(distSq);
          const connAlpha = (1 - dist / 220) * p1.depthAlpha * p2.depthAlpha * (0.35 + Math.min(0.3, scrollVelocity * 0.05));

          if (i % 2 === 0) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${connAlpha})`;
          } else {
            ctx.strokeStyle = `rgba(168, 85, 247, ${connAlpha * 0.9})`;
          }

          ctx.beginPath();
          ctx.moveTo(p1.screenX, p1.screenY);
          ctx.lineTo(p2.screenX, p2.screenY);
          ctx.stroke();
        }
      }

      // ========================================================
      // 4. DRAW 3D GLOWING QUANTUM NODES & CORES
      // ========================================================
      for (let i = 0; i < NODE_COUNT; i++) {
        const p = projected[i];
        if (!p) continue;

        const r = Math.max(1.4, p.radius * p.scale * (p.isHub ? 1.6 : 1.1));
        const alpha = Math.min(0.85, p.depthAlpha * p.pulse);

        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, r, 0, Math.PI * 2);

        if (p.isHub) {
          // Major quantum hub with double orbital ring
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(168, 85, 247, ${alpha * 0.16})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, r * 1.8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.45})`;
          ctx.stroke();
        } else {
          ctx.fillStyle = p.isCyan ? `rgba(56, 189, 248, ${alpha * 0.7})` : `rgba(168, 85, 247, ${alpha * 0.7})`;
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

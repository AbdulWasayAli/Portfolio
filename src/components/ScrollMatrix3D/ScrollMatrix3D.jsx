import { useEffect, useRef } from 'react';
import styles from './ScrollMatrix3D.module.css';

export default function ScrollMatrix3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Scroll interpolation
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Interactive mouse tracking with spring mechanics
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.isHovered = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // ========================================================
    // 1. COSMIC CHROMATIC AURORA NEBULAS (4 Dynamic Emitters)
    // ========================================================
    const AURORAS = [
      { x: 0.2, y: 0.25, r: 520, hue: 260, baseAlpha: 0.16, speed: 0.0006 },
      { x: 0.8, y: 0.75, r: 560, hue: 185, baseAlpha: 0.14, speed: -0.0005 },
      { x: 0.5, y: 0.50, r: 440, hue: 285, baseAlpha: 0.10, speed: 0.0004 },
      { x: 0.75, y: 0.20, r: 420, hue: 215, baseAlpha: 0.12, speed: -0.0004 }
    ];

    // ========================================================
    // 2. QUANTUM HORIZON GRID (Infinite Perspective Plane)
    // ========================================================
    const GRID_COLS = isTouchDevice ? 12 : 20;
    const GRID_ROWS = isTouchDevice ? 7 : 10;
    const GRID_DEPTH = 1800;
    const GRID_WIDTH = 2200;
    const GRID_Y = 460;

    // ========================================================
    // 3. SYNAPTIC NEURAL CLOUD & DATA PULSES
    // ========================================================
    const NODE_COUNT = isTouchDevice ? 24 : 45;
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1100,
        z: Math.random() * 1600,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.2 + 1.2,
        isCoreBeacon: i % 4 === 0,
        hue: i % 2 === 0 ? 185 : 270, // Electric Cyan vs Violet
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const connections = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (j - i <= 2 || (i % 6 === 0 && j % 6 === 0)) {
          connections.push({
            from: i,
            to: j,
            pulseProgress: Math.random(),
            pulseSpeed: 0.008 + Math.random() * 0.012,
          });
        }
      }
    }

    // ========================================================
    // 4. FLOATING QUANTUM DUST & AMBIENT SPARKLES
    // ========================================================
    const DUST_COUNT = isTouchDevice ? 30 : 60;
    const dustParticles = [];
    for (let i = 0; i < DUST_COUNT; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.6 + 0.2,
        hue: Math.random() > 0.5 ? 185 : 265,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        pulseVal: Math.random() * Math.PI * 2,
      });
    }

    const projectedNodes = new Array(NODE_COUNT);
    let time = 0;

    // Render Engine
    const render = () => {
      time += 0.016;

      // Scroll physics
      const scrollDelta = targetScroll - currentScroll;
      currentScroll += scrollDelta * 0.085;

      const rawVel = Math.abs(currentScroll - lastScrollY);
      lastScrollY = currentScroll;
      scrollVelocity += (rawVel - scrollVelocity) * 0.12;

      // Mouse smooth interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.055;
      mouse.y += (mouse.targetY - mouse.y) * 0.055;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 460;

      // 3D Camera Angles with organic breathing sway
      const rotY = ((mouse.x - cx) / width) * 0.26 + Math.sin(time * 0.35) * 0.02;
      const rotX = ((mouse.y - cy) / height) * 0.18 + Math.cos(time * 0.3) * 0.018;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      // ========================================================
      // LAYER 1: CHROMATIC AURORA BLOBS
      // ========================================================
      for (let i = 0; i < AURORAS.length; i++) {
        const a = AURORAS[i];
        const blobX = (a.x + Math.sin(time * 0.5 + i * 1.5) * 0.09) * width;
        const blobY = (a.y + Math.cos(time * 0.45 + i * 1.5) * 0.09) * height;
        const blobRadius = a.r * (1 + Math.sin(time * 0.7 + i) * 0.12);

        const grad = ctx.createRadialGradient(blobX, blobY, 0, blobX, blobY, blobRadius);
        const alphaMul = isLight ? 0.6 : 1;
        grad.addColorStop(0, `hsla(${a.hue}, 88%, ${isLight ? '68%' : '62%'}, ${a.baseAlpha * alphaMul})`);
        grad.addColorStop(0.5, `hsla(${a.hue + 20}, 80%, ${isLight ? '65%' : '55%'}, ${a.baseAlpha * 0.4 * alphaMul})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blobX, blobY, blobRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ========================================================
      // LAYER 2: 3D CYBER HORIZON WAVE GRID (Infinitely Moving)
      // ========================================================
      const groundScroll = (currentScroll * 0.4 + time * 65) % (GRID_DEPTH / GRID_ROWS);

      ctx.lineWidth = 0.8;
      ctx.strokeStyle = isLight ? 'rgba(14, 165, 233, 0.18)' : 'rgba(0, 229, 255, 0.12)';
      ctx.beginPath();

      // Horizontal ground lines
      for (let r = 0; r <= GRID_ROWS; r++) {
        let worldZ = r * (GRID_DEPTH / GRID_ROWS) - groundScroll + 80;
        if (worldZ < 30) continue;

        const wave = Math.sin(time * 2.2 + r * 0.5) * 20;
        const worldY = GRID_Y + wave;

        let started = false;
        for (let c = 0; c <= GRID_COLS; c++) {
          const worldX = (c - GRID_COLS / 2) * (GRID_WIDTH / GRID_COLS);

          // 3D Matrix Rotation
          const x1 = worldX * cosY + worldZ * sinY;
          const z1 = -worldX * sinY + worldZ * cosY;
          const y1 = worldY * cosX - z1 * sinX;
          const z2 = worldY * sinX + z1 * cosX;

          if (z2 <= 20) continue;

          const scale = fov / (fov + z2);
          const screenX = cx + x1 * scale;
          const screenY = cy + y1 * scale;

          if (!started) {
            ctx.moveTo(screenX, screenY);
            started = true;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
      }
      ctx.stroke();

      // Vertical depth ground rays
      ctx.strokeStyle = isLight ? 'rgba(124, 58, 237, 0.15)' : 'rgba(168, 85, 247, 0.10)';
      ctx.beginPath();
      for (let c = 0; c <= GRID_COLS; c++) {
        const worldX = (c - GRID_COLS / 2) * (GRID_WIDTH / GRID_COLS);
        let started = false;

        for (let r = 0; r <= GRID_ROWS; r++) {
          let worldZ = r * (GRID_DEPTH / GRID_ROWS) - groundScroll + 80;
          if (worldZ < 30) continue;

          const wave = Math.sin(time * 2.2 + r * 0.5) * 20;
          const worldY = GRID_Y + wave;

          const x1 = worldX * cosY + worldZ * sinY;
          const z1 = -worldX * sinY + worldZ * cosY;
          const y1 = worldY * cosX - z1 * sinX;
          const z2 = worldY * sinX + z1 * cosX;

          if (z2 <= 20) continue;

          const scale = fov / (fov + z2);
          const screenX = cx + x1 * scale;
          const screenY = cy + y1 * scale;

          if (!started) {
            ctx.moveTo(screenX, screenY);
            started = true;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
      }
      ctx.stroke();

      // ========================================================
      // LAYER 3: 3D SYNAPTIC NODES & RUNNING DATA PULSES
      // ========================================================
      const scrollWarp = scrollVelocity * 0.9;

      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.z -= 0.7 + scrollWarp;

        // Boundary wrap
        if (n.x < -850) n.x = 850;
        if (n.x > 850) n.x = -850;
        if (n.y < -550) n.y = 550;
        if (n.y > 550) n.y = -550;
        if (n.z < 20) n.z = 1600;

        const x1 = n.x * cosY + n.z * sinY;
        const z1 = -n.x * sinY + n.z * cosY;
        const y1 = n.y * cosX - z1 * sinX;
        const z2 = n.y * sinX + z1 * cosX;

        if (z2 <= 20) {
          projectedNodes[i] = null;
          continue;
        }

        const scale = fov / (fov + z2);
        let screenX = cx + x1 * scale;
        let screenY = cy + y1 * scale;

        // Organic magnetic pull toward cursor
        if (mouse.isHovered) {
          const dx = screenX - mouse.x;
          const dy = screenY - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 57600 && distSq > 4) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 240) * 2.0;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }

        const depthAlpha = Math.max(0.15, Math.min(1, (1 - z2 / 1600) * 1.5));
        const pulse = Math.sin(time * 3.2 + n.pulseOffset) * 0.35 + 0.75;

        projectedNodes[i] = {
          screenX,
          screenY,
          scale,
          depthAlpha,
          pulse,
          isCoreBeacon: n.isCoreBeacon,
          radius: n.radius,
          hue: n.hue,
        };
      }

      // Draw Synaptic Beams with rich glowing laser visibility
      ctx.lineWidth = 1.3;
      for (let k = 0; k < connections.length; k++) {
        const c = connections[k];
        const p1 = projectedNodes[c.from];
        const p2 = projectedNodes[c.to];
        if (!p1 || !p2) continue;

        const dx = p1.screenX - p2.screenX;
        const dy = p1.screenY - p2.screenY;
        const distSq = dx * dx + dy * dy;

        if (distSq < 67600) {
          const dist = Math.sqrt(distSq);
          const connAlpha = (1 - dist / 260) * p1.depthAlpha * p2.depthAlpha * 0.58;

          // Vibrant laser beam
          ctx.strokeStyle = c.from % 2 === 0
            ? `rgba(0, 229, 255, ${connAlpha})`
            : `rgba(168, 85, 247, ${connAlpha})`;

          ctx.beginPath();
          ctx.moveTo(p1.screenX, p1.screenY);
          ctx.lineTo(p2.screenX, p2.screenY);
          ctx.stroke();

          // ⚡ RACING DATA BEACON (Bright neon energy packets)
          c.pulseProgress += c.pulseSpeed * (1 + scrollVelocity * 0.15);
          if (c.pulseProgress > 1) c.pulseProgress = 0;

          const packetX = p1.screenX + (p2.screenX - p1.screenX) * c.pulseProgress;
          const packetY = p1.screenY + (p2.screenY - p1.screenY) * c.pulseProgress;
          const packetAlpha = Math.min(1, connAlpha * 2.8);

          // Outer beacon glow
          ctx.fillStyle = c.from % 2 === 0
            ? `rgba(0, 229, 255, ${packetAlpha * 0.45})`
            : `rgba(216, 180, 254, ${packetAlpha * 0.45})`;
          ctx.beginPath();
          ctx.arc(packetX, packetY, 4.5, 0, Math.PI * 2);
          ctx.fill();

          // Bright beacon core
          ctx.fillStyle = c.from % 2 === 0
            ? `rgba(255, 255, 255, ${packetAlpha})`
            : `rgba(240, 220, 255, ${packetAlpha})`;
          ctx.beginPath();
          ctx.arc(packetX, packetY, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw Highly Luminescent Neon Quantum Nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        const p = projectedNodes[i];
        if (!p) continue;

        const baseR = Math.max(1.8, p.radius * p.scale * (p.isCoreBeacon ? 1.8 : 1.3));
        const alpha = Math.min(1, p.depthAlpha * p.pulse * 1.2);

        // 1. Soft Ambient Outer Halo Glow
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, baseR * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === 185
          ? `rgba(0, 229, 255, ${alpha * 0.22})`
          : `rgba(168, 85, 247, ${alpha * 0.22})`;
        ctx.fill();

        // 2. Middle Vibrant Neon Layer
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, baseR * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === 185
          ? `rgba(0, 229, 255, ${alpha * 0.85})`
          : `rgba(168, 85, 247, ${alpha * 0.85})`;
        ctx.fill();

        // 3. Ultra-Bright Star Core (Solid white/cyan hotspot)
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, Math.max(1.2, baseR * 0.7), 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // 4. Pulsating Beacon Orbit Ring on Core Hubs
        if (p.isCoreBeacon) {
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, baseR * 3.8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // ========================================================
      // LAYER 4: FLOATING QUANTUM DUST & AMBIENT SPARKLES
      // ========================================================
      for (let i = 0; i < dustParticles.length; i++) {
        const d = dustParticles[i];
        d.x += d.vx;
        d.y += d.vy;
        d.pulseVal += d.pulseSpeed;

        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        const currentAlpha = Math.min(0.9, d.alpha * (0.8 + Math.sin(d.pulseVal) * 0.5));
        
        ctx.fillStyle = d.hue === 185
          ? `rgba(0, 229, 255, ${currentAlpha})`
          : `rgba(192, 132, 252, ${currentAlpha})`;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.scroll3DWrapper}>
      <canvas ref={canvasRef} className={styles.canvas3D} />
    </div>
  );
}

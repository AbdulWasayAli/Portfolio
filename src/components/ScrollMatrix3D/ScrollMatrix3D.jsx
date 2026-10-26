import { useEffect, useRef } from 'react';
import styles from './ScrollMatrix3D.module.css';

export default function ScrollMatrix3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // High performance hardware-accelerated context
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

    // Smooth Scroll tracking with velocity lerp
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Interactive mouse tracking with fluid gravity physics
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

    // On mobile touch: touch coordinates gently drift the aurora & matrix
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
    // 1. HOLOGRAPHIC NEURAL AURORA CONFIGURATION
    // ========================================================
    const AURORA_BLOBS = [
      { x: 0.25, y: 0.25, r: 420, hue: 250, vx: 0.0004, vy: 0.0003, phase: 0 },
      { x: 0.75, y: 0.70, r: 460, hue: 190, vx: -0.0003, vy: -0.0004, phase: 2 },
      { x: 0.50, y: 0.45, r: 380, hue: 275, vx: 0.0002, vy: -0.0003, phase: 4 },
      { x: 0.80, y: 0.20, r: 350, hue: 215, vx: -0.0003, vy: 0.0002, phase: 1 },
    ];

    // ========================================================
    // 2. 3D KINETIC SYNAPSE MATRIX (Fixed bounds + depth buffer)
    // ========================================================
    const NODE_COUNT = isTouchDevice ? 26 : 42; // Perfect balance for mobile & desktop
    const BOUNDS_X = 1400;
    const BOUNDS_Y = 1000;
    const BOUNDS_Z = 1600;

    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        origX: (Math.random() - 0.5) * BOUNDS_X,
        origY: (Math.random() - 0.5) * BOUNDS_Y,
        origZ: Math.random() * BOUNDS_Z,
        x: 0,
        y: 0,
        z: 0,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.2 + 1.2,
        isCoreHub: i % 5 === 0,
        colorType: i % 3, // 0 = Electric Cyan, 1 = Royal Violet, 2 = Indigo Luminary
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.025,
      });
      // Initial pos
      nodes[i].x = nodes[i].origX;
      nodes[i].y = nodes[i].origY;
      nodes[i].z = nodes[i].origZ;
    }

    // Fixed Pre-allocated Synaptic Connections
    const connections = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        // Connect nearby indices to keep calculation deterministic & zero GC
        if (j - i <= 3 || (i % 7 === 0 && j % 7 === 0)) {
          connections.push({
            from: i,
            to: j,
            pulsePos: Math.random(), // Running data pulse position (0 to 1)
            pulseSpeed: 0.006 + Math.random() * 0.012,
            active: Math.random() > 0.15,
          });
        }
      }
    }

    // Fast projected arrays
    const projectedNodes = new Array(NODE_COUNT);

    let time = 0;

    // Render Engine
    const render = () => {
      time += 0.015;

      // Smooth scroll lerp
      const scrollDelta = targetScroll - currentScroll;
      currentScroll += scrollDelta * 0.085;

      const rawVel = Math.abs(currentScroll - lastScrollY);
      lastScrollY = currentScroll;
      scrollVelocity += (rawVel - scrollVelocity) * 0.15;

      // Mouse smooth interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // ========================================================
      // STAGE 1: HOLOGRAPHIC NEURAL AURORA (Slow-motion liquid nebulas)
      // ========================================================
      ctx.save();
      for (let i = 0; i < AURORA_BLOBS.length; i++) {
        const b = AURORA_BLOBS[i];
        const cx = (b.x + Math.sin(time * 0.4 + b.phase) * 0.08) * width;
        const cy = (b.y + Math.cos(time * 0.35 + b.phase) * 0.08) * height;
        const radius = b.r * (1 + Math.sin(time * 0.6 + b.phase) * 0.12);

        const auraGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        // Rich high-end luminescence
        auraGrad.addColorStop(0, `hsla(${b.hue}, 85%, 62%, 0.13)`);
        auraGrad.addColorStop(0.45, `hsla(${b.hue + 15}, 80%, 55%, 0.06)`);
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // ========================================================
      // STAGE 2: 3D KINETIC SYNAPSE PROJECTIONS
      // ========================================================
      const fov = 450;
      const screenCenterX = width / 2;
      const screenCenterY = height / 2;

      // Camera tilt with natural breathing sway
      const rotY = ((mouse.x - screenCenterX) / width) * 0.3 + Math.sin(time * 0.3) * 0.02;
      const rotX = ((mouse.y - screenCenterY) / height) * 0.22 + Math.cos(time * 0.25) * 0.02;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const scrollWarp = scrollVelocity * 0.8;

      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];

        // Orbit drift
        n.x += n.vx;
        n.y += n.vy;
        n.z -= 0.6 + scrollWarp;

        // Wrap around boundaries smoothly
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
          projectedNodes[i] = null;
          continue;
        }

        const scale = fov / (fov + z2);
        let screenX = screenCenterX + x1 * scale;
        let screenY = screenCenterY + y1 * scale;

        // Interactive Magnetic Cursor Attraction / Deflection
        if (mouse.isHovered) {
          const dx = screenX - mouse.x;
          const dy = screenY - mouse.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 240;

          if (distSq < maxDist * maxDist && distSq > 4) {
            const dist = Math.sqrt(distSq);
            // Gentle organic pull into cursor gravity field
            const force = (1 - dist / maxDist) * 1.6;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }

        const depthAlpha = Math.max(0, Math.min(1, (1 - z2 / BOUNDS_Z) * 1.35));
        const pulse = Math.sin(time * 3 + n.pulsePhase) * 0.3 + 0.7;

        projectedNodes[i] = {
          screenX,
          screenY,
          scale,
          depthAlpha,
          pulse,
          isCoreHub: n.isCoreHub,
          radius: n.radius,
          colorType: n.colorType,
        };
      }

      // ========================================================
      // STAGE 3: SYNAPSE FIBERS & RUNNING DATA BEACONS
      // ========================================================
      ctx.lineWidth = 1;
      for (let k = 0; k < connections.length; k++) {
        const c = connections[k];
        if (!c.active) continue;

        const p1 = projectedNodes[c.from];
        const p2 = projectedNodes[c.to];
        if (!p1 || !p2) continue;

        const dx = p1.screenX - p2.screenX;
        const dy = p1.screenY - p2.screenY;
        const distSq = dx * dx + dy * dy;
        const maxDist = 260;

        if (distSq < maxDist * maxDist) {
          const dist = Math.sqrt(distSq);
          const connAlpha = (1 - dist / maxDist) * p1.depthAlpha * p2.depthAlpha * 0.32;

          // Electric Synapse Line
          ctx.strokeStyle = c.from % 2 === 0
            ? `rgba(0, 229, 255, ${connAlpha})`
            : `rgba(167, 139, 250, ${connAlpha * 0.9})`;

          ctx.beginPath();
          ctx.moveTo(p1.screenX, p1.screenY);
          ctx.lineTo(p2.screenX, p2.screenY);
          ctx.stroke();

          // ⚡ RUNNING DATA PULSE (Energy packet racing across the wire)
          c.pulsePos += c.pulseSpeed * (1 + scrollVelocity * 0.15);
          if (c.pulsePos > 1) c.pulsePos = 0;

          const packetX = p1.screenX + (p2.screenX - p1.screenX) * c.pulsePos;
          const packetY = p1.screenY + (p2.screenY - p1.screenY) * c.pulsePos;
          const packetAlpha = connAlpha * 2.2;

          ctx.fillStyle = c.from % 2 === 0 ? `rgba(0, 229, 255, ${packetAlpha})` : `rgba(192, 132, 252, ${packetAlpha})`;
          ctx.beginPath();
          ctx.arc(packetX, packetY, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ========================================================
      // STAGE 4: LUMINESCENT NEURAL NODES & HALOS
      // ========================================================
      for (let i = 0; i < NODE_COUNT; i++) {
        const p = projectedNodes[i];
        if (!p) continue;

        const nodeRadius = Math.max(1.3, p.radius * p.scale * (p.isCoreHub ? 1.6 : 1.1));
        const alpha = Math.min(0.95, p.depthAlpha * p.pulse);

        // Core fill
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, nodeRadius, 0, Math.PI * 2);

        if (p.colorType === 0) {
          // Electric Cyan
          ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
        } else if (p.colorType === 1) {
          // Royal Violet
          ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
        } else {
          // Stellar White / Indigo
          ctx.fillStyle = `rgba(224, 231, 255, ${alpha})`;
        }
        ctx.fill();

        // Core Hub outer pulsating halo
        if (p.isCoreHub) {
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, nodeRadius * 2.4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.38})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
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

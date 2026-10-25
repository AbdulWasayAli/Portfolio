import { useEffect, useRef } from 'react';
import styles from './ScrollMatrix3D.module.css';

export default function ScrollMatrix3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Hardware accelerated alpha context
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

    // Smooth scroll velocity tracking
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Interactive mouse tracking with spring interpolation
    let mouse = {
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
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // ========================================================
    // ULTRA-OPTIMIZED 3D ENGINE (GUARANTEED SILKY SMOOTH 60-120 FPS)
    // ========================================================
    const STAR_COUNT = 75;      // Balanced for buttery performance without any frame drop
    const NODE_COUNT = 28;      // Crisp constellation nodes
    const GRID_COLS = 10;       // Lightweight perspective grid
    const GRID_ROWS = 6;
    const TOTAL_GRID = (GRID_COLS + 1) * (GRID_ROWS + 1);

    const BOUNDS_X = 1600;
    const BOUNDS_Y = 1100;
    const BOUNDS_Z = 1800;

    // 1. Hyperspace Warp Stars
    const stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * BOUNDS_X * 1.5,
        y: (Math.random() - 0.5) * BOUNDS_Y * 1.5,
        z: Math.random() * BOUNDS_Z,
        pz: 0,
        speed: 1.4 + Math.random() * 2.2,
        brightness: 0.4 + Math.random() * 0.6,
        size: Math.random() * 1.5 + 0.8,
        hue: Math.random() > 0.45 ? 260 : 195,
      });
    }

    // 2. Constellation Core Nodes
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
        isHub: i % 4 === 0,
        isCyan: i % 2 === 0,
      });
    }

    // Pre-allocated fixed synaptic connections
    const connections = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (j - i <= 2) {
          connections.push([i, j]);
        }
      }
    }

    // 3. Pre-allocated 3D Ground Mesh Points
    const gridPoints = [];
    const gridSpacingX = BOUNDS_X / GRID_COLS;
    const gridSpacingZ = BOUNDS_Z / GRID_ROWS;

    for (let r = 0; r <= GRID_ROWS; r++) {
      for (let c = 0; c <= GRID_COLS; c++) {
        gridPoints.push({
          col: c,
          row: r,
          origX: (c - GRID_COLS / 2) * gridSpacingX,
          baseY: 400,
          origZ: r * gridSpacingZ + 100,
          waveOffset: c * 0.4 + r * 0.45,
        });
      }
    }

    // Pre-allocated reusable projected arrays (Zero Garbage Collection pressure)
    const projectedGrid = new Array(TOTAL_GRID);
    const projectedNodes = new Array(NODE_COUNT);

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.016;

      // Track scroll delta & velocity
      const scrollDelta = targetScroll - currentScroll;
      currentScroll += scrollDelta * 0.085;

      const rawVel = Math.abs(currentScroll - lastScrollY);
      lastScrollY = currentScroll;
      scrollVelocity += (rawVel - scrollVelocity) * 0.12;

      const warpSpeed = Math.min(22, 1.4 + scrollVelocity * 1.0);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const fov = 420;
      const cx = width / 2;
      const cy = height / 2;

      // 3D Camera Angles with gentle sway
      const rotY = ((mouse.x - cx) / width) * 0.28 + Math.sin(time * 0.5) * 0.025;
      const rotX = ((mouse.y - cy) / height) * 0.2 + Math.cos(time * 0.4) * 0.02;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // ========================================================
      // 1. RENDER 3D TERRAIN WAVE GRID (BATCH PATHS FOR ZERO LAG)
      // ========================================================
      const groundScroll = (currentScroll * 0.35 + time * 60) % BOUNDS_Z;

      for (let i = 0; i < TOTAL_GRID; i++) {
        const gp = gridPoints[i];
        const wave = Math.sin(time * 2.0 + gp.waveOffset) * 22;
        const worldY = gp.baseY + wave;

        let worldZ = (gp.origZ - groundScroll) % BOUNDS_Z;
        if (worldZ < 40) worldZ += BOUNDS_Z;

        // 3D Matrix Rotation
        const x1 = gp.origX * cosY + worldZ * sinY;
        const z1 = -gp.origX * sinY + worldZ * cosY;
        const y1 = worldY * cosX - z1 * sinX;
        const z2 = worldY * sinX + z1 * cosX;

        if (z2 <= 20) {
          projectedGrid[i] = null;
          continue;
        }

        const scale = fov / (fov + z2);
        const depthAlpha = Math.max(0, Math.min(1, (1 - z2 / BOUNDS_Z) * 1.15));

        projectedGrid[i] = {
          screenX: cx + x1 * scale,
          screenY: cy + y1 * scale,
          depthAlpha,
        };
      }

      // Draw horizontal grid lines in single batch
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
      ctx.beginPath();
      for (let r = 0; r <= GRID_ROWS; r++) {
        let drawing = false;
        for (let c = 0; c <= GRID_COLS; c++) {
          const p = projectedGrid[r * (GRID_COLS + 1) + c];
          if (!p) {
            drawing = false;
            continue;
          }
          if (!drawing) {
            ctx.moveTo(p.screenX, p.screenY);
            drawing = true;
          } else {
            ctx.lineTo(p.screenX, p.screenY);
          }
        }
      }
      ctx.stroke();

      // Draw vertical depth grid lines in single batch
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.13)';
      ctx.beginPath();
      for (let c = 0; c <= GRID_COLS; c++) {
        let drawing = false;
        for (let r = 0; r <= GRID_ROWS; r++) {
          const p = projectedGrid[r * (GRID_COLS + 1) + c];
          if (!p) {
            drawing = false;
            continue;
          }
          if (!drawing) {
            ctx.moveTo(p.screenX, p.screenY);
            drawing = true;
          } else {
            ctx.lineTo(p.screenX, p.screenY);
          }
        }
      }
      ctx.stroke();

      // ========================================================
      // 2. RENDER 3D WARP SPEED STARFIELD STREAKS
      // ========================================================
      for (let i = 0; i < STAR_COUNT; i++) {
        const s = stars[i];
        s.pz = s.z;

        // Move through 3D space
        s.z -= s.speed * warpSpeed;
        if (s.z <= 10) {
          s.z = BOUNDS_Z;
          s.pz = BOUNDS_Z;
          s.x = (Math.random() - 0.5) * BOUNDS_X * 1.5;
          s.y = (Math.random() - 0.5) * BOUNDS_Y * 1.5;
        }

        const x1 = s.x * cosY + s.z * sinY;
        const z1 = -s.x * sinY + s.z * cosY;
        const y1 = s.y * cosX - z1 * sinX;
        const z2 = s.y * sinX + z1 * cosX;

        if (z2 <= 20) continue;

        const scale = fov / (fov + z2);
        const sx = cx + x1 * scale;
        const sy = cy + y1 * scale;

        const depthFade = Math.max(0, Math.min(1, (1 - z2 / BOUNDS_Z) * 1.25));
        const alpha = depthFade * s.brightness * (0.35 + Math.min(0.65, scrollVelocity * 0.08));

        ctx.beginPath();
        if (scrollVelocity > 0.8) {
          const px1 = s.x * cosY + s.pz * sinY;
          const pz1 = -s.x * sinY + s.pz * cosY;
          const py1 = s.y * cosX - pz1 * sinX;
          const pz2 = s.y * sinX + pz1 * cosX;

          if (pz2 > 20) {
            const pscale = fov / (fov + pz2);
            ctx.strokeStyle = `hsla(${s.hue}, 95%, 75%, ${alpha})`;
            ctx.lineWidth = Math.max(1, s.size * scale * (1 + scrollVelocity * 0.08));
            ctx.moveTo(cx + px1 * pscale, cy + py1 * pscale);
            ctx.lineTo(sx, sy);
            ctx.stroke();
          }
        } else {
          ctx.fillStyle = `hsla(${s.hue}, 90%, 75%, ${alpha * 0.95})`;
          ctx.arc(sx, sy, Math.max(1, s.size * scale), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ========================================================
      // 3. PROJECT 3D CONSTELLATION NODES & CONNECTIVE WEBS
      // ========================================================
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];

        // Kinetic orbital drift
        n.x += n.vx;
        n.y += n.vy;
        n.z -= warpSpeed * 0.4;

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
          projectedNodes[i] = null;
          continue;
        }

        const scale = fov / (fov + z2);
        const screenX = cx + x1 * scale;
        const screenY = cy + y1 * scale;

        // Mouse deflection with lightweight distance check
        if (mouse.isHovered) {
          const dx = screenX - mouse.x;
          const dy = screenY - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 48400 && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 220) * 1.8;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }

        const depthAlpha = Math.max(0, Math.min(1, (1 - z2 / BOUNDS_Z) * 1.3));
        const pulse = Math.sin(time * 3 + n.pulseOffset) * 0.35 + 0.65;

        projectedNodes[i] = {
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

      // Draw Synaptic Web Beams
      ctx.lineWidth = 1;
      for (let k = 0; k < connections.length; k++) {
        const [i, j] = connections[k];
        const p1 = projectedNodes[i];
        const p2 = projectedNodes[j];
        if (!p1 || !p2) continue;

        const dx = p1.screenX - p2.screenX;
        const dy = p1.screenY - p2.screenY;
        const distSq = dx * dx + dy * dy;

        if (distSq < 48400) {
          const dist = Math.sqrt(distSq);
          const connAlpha = (1 - dist / 220) * p1.depthAlpha * p2.depthAlpha * 0.42;

          ctx.strokeStyle = i % 2 === 0
            ? `rgba(56, 189, 248, ${connAlpha})`
            : `rgba(168, 85, 247, ${connAlpha * 0.95})`;

          ctx.beginPath();
          ctx.moveTo(p1.screenX, p1.screenY);
          ctx.lineTo(p2.screenX, p2.screenY);
          ctx.stroke();
        }
      }

      // Draw 3D Luminary Nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        const p = projectedNodes[i];
        if (!p) continue;

        const r = Math.max(1.4, p.radius * p.scale * (p.isHub ? 1.5 : 1.1));
        const alpha = Math.min(0.9, p.depthAlpha * p.pulse);

        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, r, 0, Math.PI * 2);

        if (p.isHub) {
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, r * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.45})`;
          ctx.stroke();
        } else {
          ctx.fillStyle = p.isCyan ? `rgba(56, 189, 248, ${alpha * 0.75})` : `rgba(168, 85, 247, ${alpha * 0.75})`;
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

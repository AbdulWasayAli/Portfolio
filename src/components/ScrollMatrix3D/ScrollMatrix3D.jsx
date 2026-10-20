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

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Scroll state with smooth damping
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cursor interactive gravity
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
    // 3D NEURAL NODES ARCHITECTURE
    // ========================================================
    const NODE_COUNT = 75;
    const BOUNDS_X = 1400;
    const BOUNDS_Y = 1100;
    const BOUNDS_Z = 1600;

    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * BOUNDS_X,
        y: (Math.random() - 0.5) * BOUNDS_Y,
        z: Math.random() * BOUNDS_Z,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        vz: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.2 + 1.2,
        pulseOffset: Math.random() * Math.PI * 2,
        isHub: Math.random() > 0.82, // High-energy central neuron
      });
    }

    // Energy pulses traveling along synaptic connections
    const pulses = [];
    const MAX_PULSES = 16;

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.016;

      // Smooth camera interpolation
      currentScroll += (targetScroll - currentScroll) * 0.065;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const fov = 460;
      const cx = width / 2;
      const cy = height / 2;

      // Camera 3D coordinates influenced by scroll elevation and mouse tilt
      const scrollProgress = currentScroll * 0.75;
      const rotY = ((mouse.x - cx) / width) * 0.35;
      const rotX = ((mouse.y - cy) / height) * 0.25;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // 1. Update & Project Nodes into 2D Screen Space
      const projectedNodes = [];

      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];

        // Autonomous kinetic drift
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;

        // Soft boundary wraps
        if (n.x < -BOUNDS_X / 2) n.x = BOUNDS_X / 2;
        if (n.x > BOUNDS_X / 2) n.x = -BOUNDS_X / 2;
        if (n.y < -BOUNDS_Y / 2) n.y = BOUNDS_Y / 2;
        if (n.y > BOUNDS_Y / 2) n.y = -BOUNDS_Y / 2;
        if (n.z < 0) n.z = BOUNDS_Z;
        if (n.z > BOUNDS_Z) n.z = 0;

        // Camera scroll translation (Continuous 3D fly-through)
        let relZ = ((n.z - scrollProgress) % BOUNDS_Z + BOUNDS_Z) % BOUNDS_Z + 60;

        // 3D Rotation matrix
        let x1 = n.x * cosY + relZ * sinY;
        let z1 = -n.x * sinY + relZ * cosY;
        let y1 = n.y * cosX - z1 * sinX;
        let z2 = n.y * sinX + z1 * cosX;

        if (z2 <= 20) continue;

        const scale = fov / (fov + z2);
        const screenX = cx + x1 * scale;
        const screenY = cy + y1 * scale;

        // Cursor Gravitational Repel/Attract
        let dx = screenX - mouse.x;
        let dy = screenY - mouse.y;
        let distMouse = Math.sqrt(dx * dx + dy * dy);
        let mouseInfluence = 0;

        if (distMouse < 220 && mouse.isHovered) {
          mouseInfluence = (1 - distMouse / 220);
          n.x += (dx / distMouse) * mouseInfluence * 1.8;
          n.y += (dy / distMouse) * mouseInfluence * 1.8;
        }

        // Depth & Pulse Opacity
        const depthAlpha = Math.max(0, Math.min(1, (1 - z2 / BOUNDS_Z) * 1.2));
        const pulse = Math.sin(time * 3 + n.pulseOffset) * 0.35 + 0.65;

        projectedNodes.push({
          idx: i,
          screenX,
          screenY,
          z: z2,
          scale,
          depthAlpha,
          pulse,
          isHub: n.isHub,
          radius: n.radius,
        });
      }

      // Sort by depth (painters algorithm)
      projectedNodes.sort((a, b) => b.z - a.z);

      // 2. Draw Synaptic Energy Filaments (Neural Connections)
      const MAX_CONNECT_DIST = 175;

      for (let i = 0; i < projectedNodes.length; i++) {
        const p1 = projectedNodes[i];
        if (p1.screenX < -100 || p1.screenX > width + 100 || p1.screenY < -100 || p1.screenY > height + 100) continue;

        let connections = 0;

        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p2 = projectedNodes[j];
          if (p2.screenX < -100 || p2.screenX > width + 100 || p2.screenY < -100 || p2.screenY > height + 100) continue;

          const dx = p1.screenX - p2.screenX;
          const dy = p1.screenY - p2.screenY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_CONNECT_DIST) {
            connections++;
            const connAlpha = (1 - dist / MAX_CONNECT_DIST) * p1.depthAlpha * p2.depthAlpha * 0.45;

            // Gradient synaptic beam between cyan and violet
            const beamGrad = ctx.createLinearGradient(p1.screenX, p1.screenY, p2.screenX, p2.screenY);
            beamGrad.addColorStop(0, `rgba(0, 229, 255, ${connAlpha * 1.2})`);
            beamGrad.addColorStop(0.5, `rgba(108, 99, 255, ${connAlpha * 0.9})`);
            beamGrad.addColorStop(1, `rgba(0, 255, 163, ${connAlpha * 1.1})`);

            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.strokeStyle = beamGrad;
            ctx.lineWidth = (p1.isHub || p2.isHub ? 1.6 : 0.9) * Math.min(p1.scale, p2.scale);
            ctx.stroke();

            // Randomly trigger travelling neural action potential pulses
            if (Math.random() < 0.0018 && pulses.length < MAX_PULSES) {
              pulses.push({
                x1: p1.screenX,
                y1: p1.screenY,
                x2: p2.screenX,
                y2: p2.screenY,
                progress: 0,
                speed: 0.035 + Math.random() * 0.02,
                alpha: Math.min(0.9, connAlpha * 2.5),
              });
            }

            if (connections >= 4) break; // Keep lattice clean and readable
          }
        }
      }

      // 3. Render Synaptic Action Potential Pulses (Glowing traveling sparks)
      for (let k = pulses.length - 1; k >= 0; k--) {
        const pulse = pulses[k];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(k, 1);
          continue;
        }

        const px = pulse.x1 + (pulse.x2 - pulse.x1) * pulse.progress;
        const py = pulse.y1 + (pulse.y2 - pulse.y1) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pulse.alpha})`;
        ctx.shadowColor = '#00E5FF';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      }

      // 4. Draw Neural Nodes & Hub Beacons
      projectedNodes.forEach((p) => {
        const r = Math.max(1, p.radius * p.scale * (p.isHub ? 1.8 : 1.2));
        const alpha = Math.min(0.95, p.depthAlpha * p.pulse);

        // Ambient glow ring around Hub Neurons
        if (p.isHub) {
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, r * 3.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 229, 255, ${alpha * 0.14})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, r * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.45})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Core neuron bead
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, r, 0, Math.PI * 2);

        if (p.isHub) {
          ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
          ctx.shadowColor = '#00E5FF';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = `rgba(165, 180, 252, ${alpha * 0.85})`;
          ctx.shadowColor = '#6C63FF';
          ctx.shadowBlur = 4;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

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

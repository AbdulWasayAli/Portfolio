import { useEffect, useRef } from 'react';

export default function CyberSphere() {
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
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      rebuildParticles();
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracker
    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
      radius: 200,
      isHovering: false,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.targetX = width * 0.5;
      mouse.targetY = height * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // === OPTIMIZED PARTICLE SYSTEMS FOR 60FPS+ SILKY SMOOTHNESS ===
    // 1. Main Sphere Particles
    const SPHERE_PARTICLE_COUNT = 220;
    let SPHERE_RADIUS;
    let sphereParticles = [];

    // 2. Orbiting Ring Particles
    const RING_PARTICLE_COUNT = 60;
    let ringParticles1 = [];
    let ringParticles2 = [];
    let RING_RADIUS_1;
    let RING_RADIUS_2;

    // 3. Floating Ambient Particles
    const AMBIENT_COUNT = 25;
    let ambientParticles = [];

    // Colors
    const COLORS = ['#6c63ff', '#00d4aa', '#38bdf8', '#a78bfa', '#22d3ee', '#818cf8'];

    function rebuildParticles() {
      // Sphere covers most of the screen
      SPHERE_RADIUS = Math.min(width, height) * 0.42;
      RING_RADIUS_1 = SPHERE_RADIUS * 1.25;
      RING_RADIUS_2 = SPHERE_RADIUS * 1.55;

      // === Main Sphere (Fibonacci distribution) ===
      sphereParticles = [];
      const phi = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < SPHERE_PARTICLE_COUNT; i++) {
        const y = 1 - (i / (SPHERE_PARTICLE_COUNT - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        sphereParticles.push({
          origX: x * SPHERE_RADIUS,
          origY: y * SPHERE_RADIUS,
          origZ: z * SPHERE_RADIUS,
          size: Math.random() * 2.2 + 1,
          color: COLORS[i % COLORS.length],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.02,
        });
      }

      // === Orbital Ring 1 (tilted 30 deg) ===
      ringParticles1 = [];
      for (let i = 0; i < RING_PARTICLE_COUNT; i++) {
        const angle = (i / RING_PARTICLE_COUNT) * Math.PI * 2;
        ringParticles1.push({
          angle,
          radius: RING_RADIUS_1 + (Math.random() - 0.5) * 15,
          speed: 0.0008 + Math.random() * 0.0004,
          tiltX: 0.5,
          tiltZ: 0.2,
          size: Math.random() * 1.6 + 0.8,
          color: COLORS[(i + 2) % COLORS.length],
        });
      }

      // === Orbital Ring 2 (tilted -40 deg, opposite direction) ===
      ringParticles2 = [];
      for (let i = 0; i < RING_PARTICLE_COUNT; i++) {
        const angle = (i / RING_PARTICLE_COUNT) * Math.PI * 2;
        ringParticles2.push({
          angle,
          radius: RING_RADIUS_2 + (Math.random() - 0.5) * 20,
          speed: -(0.0005 + Math.random() * 0.0003),
          tiltX: -0.65,
          tiltZ: 0.35,
          size: Math.random() * 1.4 + 0.6,
          color: COLORS[(i + 4) % COLORS.length],
        });
      }

      // === Ambient Floating Particles ===
      ambientParticles = [];
      for (let i = 0; i < AMBIENT_COUNT; i++) {
        ambientParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 0.8,
          color: COLORS[i % COLORS.length],
          alpha: Math.random() * 0.5 + 0.15,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    rebuildParticles();

    // Rotation angles
    let angleX = 0;
    let angleY = 0;
    let time = 0;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Base rotation + subtle mouse influence
      angleY += 0.003 + (mouse.x - width * 0.5) * 0.000015;
      angleX += 0.002 + (mouse.y - height * 0.5) * 0.000015;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Center of sphere: ALWAYS center of viewport (Grand Background)
      const centerX = width * 0.5;
      const centerY = height * 0.48;

      // ========== 1. DRAW PULSING ENERGY CORE ==========
      const coreRadius = SPHERE_RADIUS * 0.08;
      const coreAlpha = 0.06 + Math.sin(time * 1.5) * 0.03;
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, SPHERE_RADIUS * 0.6);
      coreGrad.addColorStop(0, `rgba(108, 99, 255, ${coreAlpha * 2})`);
      coreGrad.addColorStop(0.3, `rgba(0, 212, 170, ${coreAlpha})`);
      coreGrad.addColorStop(0.6, `rgba(56, 189, 248, ${coreAlpha * 0.5})`);
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, SPHERE_RADIUS * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // ========== 2. DRAW AMBIENT FLOATING PARTICLES ==========
      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        // Wrap around screen
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          p.x += dx * 0.002;
          p.y += dy * 0.002;
        }

        const alpha = p.alpha * (0.7 + Math.sin(p.pulse) * 0.3);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // ========== 3. MAIN SPHERE PARTICLES ==========
      const projected = [];

      for (let i = 0; i < sphereParticles.length; i++) {
        const p = sphereParticles[i];
        p.pulse += p.pulseSpeed;

        // 3D Rotation
        let x1 = p.origX * cosY - p.origZ * sinY;
        let z1 = p.origZ * cosY + p.origX * sinY;
        let y1 = p.origY * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.origY * sinX;

        // Perspective Projection
        const fov = 600;
        const scale = fov / (fov + z2 + SPHERE_RADIUS * 1.2);

        let screenX = centerX + x1 * scale;
        let screenY = centerY + y1 * scale;

        // Mouse Dispersion
        const dx = screenX - mouse.x;
        const dy = screenY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 40;
          screenX += (dx / dist) * force;
          screenY += (dy / dist) * force;
        }

        const pulseSize = p.size * (0.85 + Math.sin(p.pulse) * 0.15);

        projected.push({
          x: screenX,
          y: screenY,
          scale,
          z: z2,
          color: p.color,
          size: pulseSize * scale,
          type: 'sphere',
        });
      }

      // ========== 4. ORBITAL RING PARTICLES ==========
      const drawRingParticles = (ringArr) => {
        for (let i = 0; i < ringArr.length; i++) {
          const p = ringArr[i];
          p.angle += p.speed;

          const x0 = Math.cos(p.angle) * p.radius;
          const z0 = Math.sin(p.angle) * p.radius;
          const y0 = 0;

          // Apply ring tilt
          const cosT = Math.cos(p.tiltX);
          const sinT = Math.sin(p.tiltX);
          const y1 = y0 * cosT - z0 * sinT;
          const z1 = z0 * cosT + y0 * sinT;

          // Then global rotation
          let x2 = x0 * cosY - z1 * sinY;
          let z2 = z1 * cosY + x0 * sinY;
          let y2 = y1 * cosX - z2 * sinX;
          let z3 = z2 * cosX + y1 * sinX;

          const fov = 600;
          const scale = fov / (fov + z3 + SPHERE_RADIUS * 1.5);
          const screenX = centerX + x2 * scale;
          const screenY = centerY + y2 * scale;

          projected.push({
            x: screenX,
            y: screenY,
            scale,
            z: z3,
            color: p.color,
            size: p.size * scale,
            type: 'ring',
          });
        }
      };

      drawRingParticles(ringParticles1);
      drawRingParticles(ringParticles2);

      // ========== 5. CONSTELLATION LINES (Optimized with distSquared) ==========
      ctx.lineWidth = 0.5;
      const MAX_DIST_SPHERE = 45;
      const MAX_DIST_SQ_SPHERE = MAX_DIST_SPHERE * MAX_DIST_SPHERE;
      const MAX_DIST_OTHER = 32;
      const MAX_DIST_SQ_OTHER = MAX_DIST_OTHER * MAX_DIST_OTHER;

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        // Only check a subset of neighbours or nearby indices to keep frame rate high
        const checkLimit = Math.min(projected.length, i + 40);
        for (let j = i + 1; j < checkLimit; j++) {
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          const isBothSphere = p1.type === 'sphere' && p2.type === 'sphere';
          const maxSq = isBothSphere ? MAX_DIST_SQ_SPHERE : MAX_DIST_SQ_OTHER;

          if (distSq < maxSq) {
            const dist = Math.sqrt(distSq);
            const maxD = isBothSphere ? MAX_DIST_SPHERE : MAX_DIST_OTHER;
            const alpha = (1 - dist / maxD) * 0.16 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle = `rgba(108, 99, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // ========== 6. DRAW ALL PARTICLES ==========
      // Avoid expensive shadowBlur on canvas per frame for huge FPS gains
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depthAlpha = Math.max(0.15, Math.min(0.9, (p.z + SPHERE_RADIUS * 1.5) / (SPHERE_RADIUS * 3)));

        ctx.globalAlpha = depthAlpha;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, p.size), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      if (isVisibleOnScreen) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    let isVisibleOnScreen = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleOnScreen;
        isVisibleOnScreen = entry.isIntersecting;
        if (isVisibleOnScreen && !wasVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.92,
      }}
    />
  );
}

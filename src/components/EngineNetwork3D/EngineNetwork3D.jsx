import { useEffect, useRef } from 'react';
import styles from './EngineNetwork3D.module.css';

export default function EngineNetwork3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    // Responsive Canvas Resizing with Retina Support
    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // ========================================================
    // SCROLL PHYSICS (Scroll reacts to page depth & velocity)
    // ========================================================
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let lastScroll = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ========================================================
    // INTERACTIVE MOUSE SPRING & CLICK SHOCKWAVES
    // ========================================================
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

    // Click interactive ripple shockwaves
    const shockwaves = [];
    const handleClick = (e) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: Math.min(width, height) * 0.45,
        alpha: 0.85,
        speed: 8 + scrollVelocity * 0.5,
      });
      // Limit to 4 shockwaves max
      if (shockwaves.length > 4) shockwaves.shift();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    // ========================================================
    // 1. COSMIC CHROMATIC AURORA NEBULAE
    // ========================================================
    const AURORAS = [
      { x: 0.15, y: 0.2, r: 520, hue: 255, baseAlpha: 0.16, speed: 0.0005 },
      { x: 0.82, y: 0.78, r: 560, hue: 185, baseAlpha: 0.14, speed: -0.0004 },
      { x: 0.5, y: 0.5, r: 460, hue: 280, baseAlpha: 0.1, speed: 0.0003 },
      { x: 0.78, y: 0.22, r: 420, hue: 215, baseAlpha: 0.12, speed: -0.0003 },
    ];

    // ========================================================
    // 2. SOFTWARE ENGINEERING CODE DNA GLYPHS (Story Elements)
    // ========================================================
    const CODE_GLYPHS = [
      '{ ... }',
      '<Code />',
      'async/await',
      'git:main',
      'const logic',
      '() => API',
      '010110',
      'SQL::SELECT',
      'return state',
      'class Engine',
      'λ => deploy',
      '#include',
      'def execute',
      'npm build',
      '{ key: val }',
      'docker:run',
    ];

    const glyphCount = isTouch ? 12 : 22;
    const glyphs = [];
    for (let i = 0; i < glyphCount; i++) {
      glyphs.push({
        text: CODE_GLYPHS[i % CODE_GLYPHS.length],
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        z: Math.random() * 1.5 + 0.5, // Parallax depth
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.2 - Math.random() * 0.35, // Floating upward like smoke
        size: Math.floor(10 + Math.random() * 5),
        alpha: 0.12 + Math.random() * 0.22,
        color: i % 2 === 0 ? 'rgba(56, 189, 248,' : 'rgba(167, 139, 250,',
        phase: Math.random() * Math.PI * 2,
      });
    }

    // ========================================================
    // 3. ARCHITECTURE BUS / CIRCUIT HIGHWAYS (PCB Data Traces)
    // ========================================================
    const BUS_COUNT = isTouch ? 3 : 5;
    const buses = [];
    for (let i = 0; i < BUS_COUNT; i++) {
      const relX = (i + 1) / (BUS_COUNT + 1);
      buses.push({
        xRatio: relX,
        packets: [
          { progress: 0.1, speed: 0.004 + Math.random() * 0.004, length: 30, color: '#38bdf8' },
          { progress: 0.55, speed: 0.003 + Math.random() * 0.003, length: 45, color: '#a78bfa' },
        ],
      });
    }

    // ========================================================
    // 4. NEURAL SYSTEM ARCHITECTURE NODES & CONNECTIONS
    // ========================================================
    const NODE_COUNT = isTouch ? 22 : 42;
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        isHub: i % 5 === 0, // Core architectural hubs
        hue: i % 2 === 0 ? 185 : 265, // Cyan vs Violet
        pulseVal: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      });
    }

    let time = 0;

    // ========================================================
    // MAIN RENDER LOOP (60FPS Native Canvas Engine)
    // ========================================================
    const render = () => {
      time += 0.016;

      // Scroll physics interpolation
      const scrollDiff = targetScroll - currentScroll;
      currentScroll += scrollDiff * 0.085;
      const rawVelocity = Math.abs(currentScroll - lastScroll);
      lastScroll = currentScroll;
      scrollVelocity += (rawVelocity - scrollVelocity) * 0.12;

      // Mouse smooth spring interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      // --------------------------------------------------------
      // LAYER 1: CHROMATIC NEBULA AURORAS
      // --------------------------------------------------------
      for (let i = 0; i < AURORAS.length; i++) {
        const a = AURORAS[i];
        const blobX = (a.x + Math.sin(time * 0.5 + i * 1.6) * 0.08) * width;
        const blobY = (a.y + Math.cos(time * 0.45 + i * 1.6) * 0.08) * height;
        const blobR = a.r * (1 + Math.sin(time * 0.7 + i) * 0.12);

        const grad = ctx.createRadialGradient(blobX, blobY, 0, blobX, blobY, blobR);
        const alphaMul = isLight ? 0.5 : 1;
        grad.addColorStop(0, `hsla(${a.hue}, 88%, ${isLight ? '65%' : '60%'}, ${a.baseAlpha * alphaMul})`);
        grad.addColorStop(0.5, `hsla(${a.hue + 20}, 80%, ${isLight ? '62%' : '52%'}, ${a.baseAlpha * 0.35 * alphaMul})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blobX, blobY, blobR, 0, Math.PI * 2);
        ctx.fill();
      }

      // --------------------------------------------------------
      // LAYER 2: SHOCKWAVE RIPPLES (from clicks)
      // --------------------------------------------------------
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed;
        sw.alpha *= 0.95;

        if (sw.alpha < 0.02 || sw.radius > sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${sw.alpha * 0.55})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, Math.max(0, sw.radius - 8), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(167, 139, 250, ${sw.alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // --------------------------------------------------------
      // LAYER 3: VERTICAL ARCHITECTURE BUS TRACES & HIGH-SPEED PACKETS
      // --------------------------------------------------------
      ctx.lineWidth = 1;
      for (let b = 0; b < buses.length; b++) {
        const bus = buses[b];
        const busX = bus.xRatio * width;

        // Faint circuit rail line
        ctx.strokeStyle = isLight
          ? 'rgba(99, 102, 241, 0.08)'
          : 'rgba(56, 189, 248, 0.07)';
        ctx.beginPath();
        ctx.moveTo(busX, 0);
        ctx.lineTo(busX, height);
        ctx.stroke();

        // Data Packets moving down the bus
        for (let p = 0; p < bus.packets.length; p++) {
          const pkt = bus.packets[p];
          // Scrolling speeds up packet transfer
          pkt.progress += pkt.speed * (1 + scrollVelocity * 0.12);
          if (pkt.progress > 1.2) pkt.progress = -0.1;

          const packetY = pkt.progress * height;

          // Glowing packet trace
          const pGrad = ctx.createLinearGradient(busX, packetY - pkt.length, busX, packetY);
          pGrad.addColorStop(0, 'rgba(0,0,0,0)');
          pGrad.addColorStop(0.7, pkt.color + '44');
          pGrad.addColorStop(1, pkt.color + 'ee');

          ctx.strokeStyle = pGrad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(busX, packetY - pkt.length);
          ctx.lineTo(busX, packetY);
          ctx.stroke();

          // Packet head beacon
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(busX, packetY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --------------------------------------------------------
      // LAYER 4: FLOATING SOFTWARE CODE DNA GLYPHS (The Engineer's Story)
      // --------------------------------------------------------
      ctx.font = '600 12px "JetBrains Mono", "Fira Code", monospace';
      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];

        // Organic floating with scroll parallax
        g.y += g.vy - scrollVelocity * 0.15 * g.z;
        g.x += g.vx + Math.sin(time + g.phase) * 0.25;

        // Wrap around borders
        if (g.y < -30) g.y = height + 30;
        if (g.y > height + 30) g.y = -30;
        if (g.x < -60) g.x = width + 60;
        if (g.x > width + 60) g.x = -60;

        // Proximity to mouse increases glow
        const dx = g.x - mouse.x;
        const dy = g.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        let dynamicAlpha = g.alpha;

        if (distSq < 40000) {
          const dist = Math.sqrt(distSq);
          dynamicAlpha = Math.min(0.75, g.alpha + (1 - dist / 200) * 0.5);
        }

        ctx.fillStyle = `${g.color} ${dynamicAlpha * (isLight ? 0.6 : 1)})`;
        ctx.fillText(g.text, g.x, g.y);
      }

      // --------------------------------------------------------
      // LAYER 5: NEURAL INTERCONNECTED NODES & LASER SYNAPSES
      // --------------------------------------------------------
      // Update nodes position
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulseVal += n.pulseSpeed;

        // Border bounce with soft margin
        if (n.x < 10 || n.x > width - 10) n.vx *= -1;
        if (n.y < 10 || n.y > height - 10) n.vy *= -1;

        // Magnetic attraction to cursor
        if (mouse.isHovered) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 40000 && distSq > 9) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 200) * 0.8;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }

        // Push away from shockwaves
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const sdx = n.x - sw.x;
          const sdy = n.y - sw.y;
          const sDist = Math.sqrt(sdx * sdx + sdy * sdy);
          if (Math.abs(sDist - sw.radius) < 35 && sDist > 1) {
            const push = (1 - Math.abs(sDist - sw.radius) / 35) * 4;
            n.x += (sdx / sDist) * push;
            n.y += (sdy / sDist) * push;
          }
        }
      }

      // Draw Proximity Synapse Lines
      ctx.lineWidth = 1;
      const MAX_DIST = isTouch ? 110 : 155;
      const MAX_DIST_SQ = MAX_DIST * MAX_DIST;

      for (let i = 0; i < NODE_COUNT; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < MAX_DIST_SQ) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / MAX_DIST) * 0.22;

            ctx.strokeStyle = n1.hue === 185
              ? `rgba(56, 189, 248, ${lineAlpha})`
              : `rgba(167, 139, 250, ${lineAlpha})`;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Cursor dynamic connection
        if (mouse.isHovered) {
          const cdx = n1.x - mouse.x;
          const cdy = n1.y - mouse.y;
          const cDistSq = cdx * cdx + cdy * cdy;
          if (cDistSq < 22500) {
            const cDist = Math.sqrt(cDistSq);
            const cAlpha = (1 - cDist / 150) * 0.45;
            ctx.strokeStyle = `rgba(56, 189, 248, ${cAlpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes (Glowing Beacons & Star Cores)
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];
        const pulse = Math.sin(n.pulseVal) * 0.35 + 0.65;
        const r = n.radius * pulse;

        // Outer glow halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * (n.isHub ? 3.6 : 2.4), 0, Math.PI * 2);
        ctx.fillStyle = n.hue === 185
          ? 'rgba(56, 189, 248, 0.22)'
          : 'rgba(167, 139, 250, 0.22)';
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.isHub ? '#ffffff' : (n.hue === 185 ? '#38bdf8' : '#c084fc');
        ctx.fill();

        // Architectural Radar Ring on Hubs
        if (n.isHub) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 4.2 * pulse, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
          ctx.lineWidth = 1;
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
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.canvasWrapper}>
      <canvas ref={canvasRef} className={styles.engineCanvas} />
    </div>
  );
}

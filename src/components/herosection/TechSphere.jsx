import React, { useRef, useEffect } from 'react';

// Skills shown as orbiting nodes on the sphere surface.
// Edit this array to add/remove what's displayed.
const SKILLS = [
  'React', 'Django', 'GraphQL', 'Supabase',
  'PostgreSQL', 'Tailwind', 'Vite', 'Python',
  'REST API', 'Strawberry', 'Git', 'JavaScript',
  'Vercel', 'Leaflet', 'Framer Motion', 'Node.js',
];

const TechSphere = ({ size = 280 }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.34;

    const N = SKILLS.length;
    // Fibonacci sphere distribution -> even coverage across the WHOLE surface,
    // not clustered at the bottom.
    const nodes = Array.from({ length: N }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return { phi, theta0: theta, label: SKILLS[i] };
    });

    let t = 0;
    let mounted = true;

    const accentColor = () => {
      const styles = getComputedStyle(document.documentElement);
      return styles.getPropertyValue('--accent').trim() || '#00A8E8';
    };

    function spherePoint(phi, theta) {
      return {
        x: cx + R * Math.sin(phi) * Math.cos(theta),
        y: cy + R * Math.cos(phi),
        z: R * Math.sin(phi) * Math.sin(theta),
      };
    }

    function draw() {
      if (!mounted) return;
      ctx.clearRect(0, 0, size, size);
      t += 0.0045;

      const accent = accentColor();

      const pts = nodes.map((n) => {
        const theta = n.theta0 + t;
        const p = spherePoint(n.phi, theta);
        return { ...p, label: n.label };
      });

      pts.sort((a, b) => a.z - b.z);

      // connection lines between nearby nodes
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const threshold = R * 0.85;
          if (dist < threshold) {
            const depth = (a.z + b.z) / (2 * R) * 0.5 + 0.5;
            const alpha = (1 - dist / threshold) * 0.22 * depth;
            if (alpha > 0.01) {
              ctx.globalAlpha = alpha;
              ctx.strokeStyle = accent;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
      ctx.globalAlpha = 1;

      // faint wireframe outline of the sphere itself
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // nodes + labels
      for (const p of pts) {
        const depth = (p.z / R) * 0.5 + 0.5; // 0 (back) -> 1 (front)
        const nodeAlpha = Math.max(0.18, depth);
        const radius = 3 + depth * 1.5;

        ctx.globalAlpha = nodeAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.fill();

        if (depth > 0.5) {
          ctx.globalAlpha = Math.min(1, (depth - 0.5) * 2.2);
          ctx.font = '500 10px "Josefin Sans", sans-serif';
          ctx.fillStyle = accent;
          ctx.textAlign = 'center';
          ctx.fillText(p.label, p.x, p.y - 8);
        }
      }
      ctx.globalAlpha = 1;

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      mounted = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ display: 'block' }}
    />
  );
};

export default TechSphere;

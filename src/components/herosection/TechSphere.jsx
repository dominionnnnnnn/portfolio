import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Skills shown as orbiting nodes on the sphere surface.
// Edit this array to add/remove what's displayed.
const SKILLS = [
  'React', 'Django', 'GraphQL', 'Supabase',
  'PostgreSQL', 'Tailwind', 'Vite', 'Python',
  'REST API', 'Strawberry', 'Git', 'JavaScript',
  'Vercel', 'Leaflet', 'Framer Motion', 'Node.js',
];

const RADIUS = 2.1;

// Fibonacci sphere distribution -> even coverage across the WHOLE surface,
// not clustered at the bottom or poles. Same logic as the original
// Canvas2D version, just emitting 3D vectors instead of a 2D projection.
function fibonacciSpherePoints(count, radius) {
  return Array.from({ length: count }, (_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  });
}

// Latitude/longitude great-circle wireframe so the connections actually read
// as "sphere structure" rather than a sparse random dot-to-dot scatter.
function buildWireframeCircles(radius, latCount = 5, lonCount = 8, segments = 64) {
  const circles = [];

  // latitude rings (horizontal)
  for (let i = 1; i < latCount; i++) {
    const phi = (Math.PI * i) / latCount;
    const r = radius * Math.sin(phi);
    const y = radius * Math.cos(phi);
    const pts = [];
    for (let s = 0; s <= segments; s++) {
      const t = (s / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(r * Math.cos(t), y, r * Math.sin(t)));
    }
    circles.push(pts);
  }

  // longitude rings (vertical, full great circles through the poles)
  for (let i = 0; i < lonCount; i++) {
    const theta = (Math.PI * i) / lonCount;
    const pts = [];
    for (let s = 0; s <= segments; s++) {
      const phi = (s / segments) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        )
      );
    }
    circles.push(pts);
  }

  return circles;
}

function useAccentColor() {
  const [color, setColor] = useState('#00A8E8');

  useEffect(() => {
    const read = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim();
      if (v) setColor(v);
    };
    read();
    // re-read when the theme toggles (class change on <html>)
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return color;
}

function SkillNode({ position, label, accent }) {
  const groupRef = useRef(null);
  const [labelOpacity, setLabelOpacity] = useState(1);
  const { camera } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    const worldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPos);
    // normal: direction from sphere center to this node (since the sphere
    // is centered at the origin, the node's world position IS the normal).
    const normal = worldPos.clone().normalize();
    const toCam = new THREE.Vector3().subVectors(camera.position, worldPos).normalize();
    // facing: 1 = node faces the camera (front of sphere), -1 = faces away (back)
    const facing = normal.dot(toCam);
    const opacity = THREE.MathUtils.clamp((facing + 0.15) / 0.5, 0, 1);
    setLabelOpacity(opacity);
    // Node mesh size is intentionally constant — perspective projection
    // already makes nearer nodes render larger on screen. Scaling on top
    // of that (by facing) compounds with perspective and makes the
    // front-most node balloon, reading as if it's floating off the
    // sphere's surface instead of sitting on it.
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.6}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
      <Html center style={{ pointerEvents: 'none' }}>
        <span
          style={{
            opacity: labelOpacity,
            color: accent,
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            textShadow: '0 0 6px var(--bg-page, #0c0c0f)',
            transition: 'opacity 0.15s linear',
            transform: 'translateY(-14px)',
            display: 'inline-block',
          }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

function Wireframe({ radius, accent }) {
  const circles = useMemo(() => buildWireframeCircles(radius), [radius]);
  return (
    <>
      {circles.map((pts, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z])),
                3,
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={accent} transparent opacity={0.1} />
        </line>
      ))}
    </>
  );
}

function SphereScene({ accent }) {
  const groupRef = useRef(null);
  const nodes = useMemo(
    () => fibonacciSpherePoints(SKILLS.length, RADIUS),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 4, 5]} intensity={60} color={accent} />
      <pointLight position={[-5, -3, -5]} intensity={20} color="#ffffff" />
      <group ref={groupRef}>
        <Wireframe radius={RADIUS} accent={accent} />
        {nodes.map((pos, i) => (
          <SkillNode key={SKILLS[i]} position={pos} label={SKILLS[i]} accent={accent} />
        ))}
      </group>
    </>
  );
}

function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isDesktop;
}

const TechSphere = () => {
  const accent = useAccentColor();
  // Drag-to-orbit only on desktop: on mobile, a finger landing on the
  // sphere would otherwise hijack the page-scroll gesture instead of
  // scrolling past it.
  const isDesktop = useIsDesktop();

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{ width: '100%', height: '100%' }} aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 5.4], fov: 45 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <SphereScene accent={accent} />
          {isDesktop && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={false}
              enableDamping
              dampingFactor={0.08}
              rotateSpeed={0.5}
            />
          )}
        </Canvas>
      </div>
      {/* Screen-reader-only fallback: the canvas above is aria-hidden since
          WebGL content + floating 3D labels aren't a meaningful AT experience. */}
      <span className="sr-only">
        Core skills: {SKILLS.join(', ')}.
      </span>
    </div>
  );
};

export default TechSphere;
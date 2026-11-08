import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MousePointer2, Info, ArrowRight } from 'lucide-react';

// --- Types ---

export interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  angle: number; // For organic oscillation
}

export interface BackgroundParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

export interface MouseState {
  x: number;
  y: number;
  isActive: boolean;
}

// --- Configuration Constants ---

const PARTICLE_DENSITY = 0.00015; // Particles per pixel squared
const BG_PARTICLE_DENSITY = 0.00007; // Background stars/dust density
const MOUSE_RADIUS = 180; // Radius of mouse influence
const RETURN_SPEED = 0.08; // Spring return force
const DAMPING = 0.90; // Velocity friction decay
const REPULSION_STRENGTH = 1.2; // Mouse push multiplier

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

const hexToRgba = (hex: string, alpha: number) => {
  if (hex.startsWith('rgba')) return hex;
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) || 255;
  const g = parseInt(c.substring(2, 4), 16) || 255;
  const b = parseInt(c.substring(4, 6), 16) || 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// --- AntiGravity / ZeroGravity Canvas Component ---

export const AntiGravityCanvas: React.FC<{
  className?: string;
  isBackground?: boolean;
}> = ({ className = '', isBackground = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [debugInfo, setDebugInfo] = useState({ count: 0, fps: 0 });

  const particlesRef = useRef<Particle[]>([]);
  const backgroundParticlesRef = useRef<BackgroundParticle[]>([]);
  const mouseRef = useRef<MouseState>({ x: -2000, y: -2000, isActive: false });
  const frameIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  // Initialize Particles
  const initParticles = useCallback((width: number, height: number) => {
    dimensionsRef.current = { width, height };

    // Responsive density cap
    const isMobile = width < 768;
    const baseParticleDensity = isMobile ? 0.00006 : PARTICLE_DENSITY;
    const baseBgDensity = isMobile ? 0.00004 : BG_PARTICLE_DENSITY;

    // 1. Main Interactive Foreground Particles
    const maxInteractive = isMobile ? 35 : 220;
    const particleCount = Math.min(Math.floor(width * height * baseParticleDensity), maxInteractive);
    const newParticles: Particle[] = [];

    // Astrovue + HackIgnite color distribution (White, Electric Cyan, Ice Blue, Tech Blue)
    const colorPalette = ['#ffffff', '#00C8E8', '#8DEBFF', '#4285F4'];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      const roll = Math.random();
      let color = '#ffffff';
      if (roll > 0.70) color = '#00C8E8'; // Electric Cyan
      else if (roll > 0.55) color = '#8DEBFF'; // Ice Blue
      else if (roll > 0.45) color = '#4285F4'; // Tech Blue

      newParticles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        size: randomRange(1.2, 2.6),
        color,
        angle: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = newParticles;

    // 2. Background Ambient Particles (Drifting Stars/Dust)
    const maxBg = isMobile ? 35 : 100;
    const bgCount = Math.min(Math.floor(width * height * baseBgDensity), maxBg);
    const newBgParticles: BackgroundParticle[] = [];

    for (let i = 0; i < bgCount; i++) {
      newBgParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: randomRange(0.6, 1.5),
        alpha: randomRange(0.15, 0.5),
        phase: Math.random() * Math.PI * 2,
      });
    }
    backgroundParticlesRef.current = newBgParticles;

    setDebugInfo((prev) => ({ ...prev, count: particleCount + bgCount }));
  }, []);

  // Animation Loop
  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensionsRef.current;
    if (width === 0 || height === 0) return;

    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;
    if (delta > 0 && !isBackground) {
      setDebugInfo((prev) => ({ ...prev, fps: Math.round(1000 / delta) }));
    }

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // --- Background Effects ---

    // 1. Pulsating Radial Glow (Atmospheric Space Lighting)
    const centerX = width / 2;
    const centerY = height / 2;
    const pulseSpeed = 0.0008;
    const pulseOpacity = Math.sin(time * pulseSpeed) * 0.035 + 0.075;

    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      Math.max(width, height) * 0.72
    );
    gradient.addColorStop(0, `rgba(0, 200, 232, ${pulseOpacity})`);
    gradient.addColorStop(0.5, `rgba(66, 133, 244, ${pulseOpacity * 0.55})`);
    gradient.addColorStop(1, 'rgba(5, 7, 8, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Background Particles (Drifting Stars)
    const bgParticles = backgroundParticlesRef.current;
    for (let i = 0; i < bgParticles.length; i++) {
      const p = bgParticles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around screen
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Twinkle effect
      const twinkle = Math.sin(time * 0.002 + p.phase) * 0.5 + 0.5;
      const currentAlpha = p.alpha * (0.3 + 0.7 * twinkle);

      ctx.globalAlpha = currentAlpha;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // --- Main Foreground Physics ---

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Phase 1: Apply Forces (Mouse Repulsion & Spring Return)
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Subtle organic zero-g orbital float
      const idleOffsetX = Math.sin(time * 0.001 + p.angle) * 0.35;
      const idleOffsetY = Math.cos(time * 0.001 + p.angle) * 0.35;
      const targetX = p.originX + idleOffsetX;
      const targetY = p.originY + idleOffsetY;

      // Mouse Distance
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distSq = dx * dx + dy * dy;

      if (mouse.isActive && distSq < MOUSE_RADIUS * MOUSE_RADIUS && distSq > 0.01) {
        const distance = Math.sqrt(distSq);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
        const repulsion = force * REPULSION_STRENGTH;

        p.vx -= forceDirectionX * repulsion * 5;
        p.vy -= forceDirectionY * repulsion * 5;
      }

      // Spring Force (Return to Origin)
      const springDx = targetX - p.x;
      const springDy = targetY - p.y;
      p.vx += springDx * RETURN_SPEED;
      p.vy += springDy * RETURN_SPEED;
    }

    // Phase 2: Resolve Collisions (Elastic Spheres)
    const len = particles.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distSq = dx * dx + dy * dy;
        const minDist = p1.size + p2.size;

        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);
          if (dist > 0.01) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;
            const pushX = nx * overlap * 0.5;
            const pushY = ny * overlap * 0.5;

            p1.x -= pushX;
            p1.y -= pushY;
            p2.x += pushX;
            p2.y += pushY;

            const dvx = p1.vx - p2.vx;
            const dvy = p1.vy - p2.vy;
            const velocityAlongNormal = dvx * nx + dvy * ny;

            if (velocityAlongNormal > 0) {
              const m1 = p1.size;
              const m2 = p2.size;
              const restitution = 0.85;
              const impulseMagnitude =
                (-(1 + restitution) * velocityAlongNormal) / (1 / m1 + 1 / m2);

              const impulseX = impulseMagnitude * nx;
              const impulseY = impulseMagnitude * ny;

              p1.vx += impulseX / m1;
              p1.vy += impulseY / m1;
              p2.vx -= impulseX / m2;
              p2.vy -= impulseY / m2;
            }
          }
        }
      }
    }

    // Phase 3: Integration & Drawing
    for (let i = 0; i < len; i++) {
      const p = particles[i];

      p.vx *= DAMPING;
      p.vy *= DAMPING;

      p.x += p.vx;
      p.y += p.vy;

      const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const opacity = Math.min(0.4 + velocity * 0.12, 1);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

      if (velocity > 0.5) {
        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = Math.min(velocity * 3.5, 9);
        ctx.fillStyle = hexToRgba(p.color, opacity);
        ctx.fill();
        ctx.restore();
      } else {
        ctx.fillStyle = hexToRgba(p.color, opacity);
        ctx.fill();
      }
    }

    frameIdRef.current = requestAnimationFrame(animate);
  }, [isBackground]);

  // Resize Handler with High-DPI support
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const width = isBackground ? window.innerWidth : (containerRef.current?.getBoundingClientRect().width || window.innerWidth);
      const height = isBackground ? window.innerHeight : (containerRef.current?.getBoundingClientRect().height || window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [initParticles, isBackground]);

  // Start Animation
  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [animate]);

  // Global Mouse tracking across whole window
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isActive: true,
      };
    };

    const handleWindowMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleWindowMouseLeave);
    window.addEventListener('blur', handleWindowMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      document.removeEventListener('mouseleave', handleWindowMouseLeave);
      window.removeEventListener('blur', handleWindowMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={
        isBackground
          ? `fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`
          : `absolute inset-0 z-0 overflow-hidden bg-black cursor-crosshair ${className}`
      }
      aria-hidden={isBackground}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Debug Info Overlay (Only shown in standalone demo mode) */}
      {!isBackground && (
        <div className="absolute bottom-4 right-4 pointer-events-none text-xs text-white/20 font-mono text-right">
          <p>{debugInfo.count} entities</p>
          <p>{debugInfo.fps} FPS</p>
        </div>
      )}
    </div>
  );
};

// --- Reusable Global Background Export ---

export const ZeroGravityBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <AntiGravityCanvas isBackground={true} className={className} />;
};

// --- Navigation for Demo ---

export const Navigation: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-6 md:p-8">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="font-bold text-black text-lg">G</span>
        </div>
        <span className="text-white font-medium tracking-wide text-lg">Antigravity</span>
      </div>
      <div className="hidden md:flex space-x-8 text-sm font-medium text-white/70">
        <a href="#experiments" className="hover:text-white transition-colors">
          Experiments
        </a>
        <a href="#case-studies" className="hover:text-white transition-colors">
          Case Studies
        </a>
        <a href="#about" className="hover:text-white transition-colors">
          About
        </a>
      </div>
      <button className="text-white/80 hover:text-white transition-colors" aria-label="Information">
        <Info size={24} />
      </button>
    </nav>
  );
};

// --- HeroContent for Demo ---

export const HeroContent: React.FC = () => {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="inline-block">
          <span className="py-1 px-3 border border-white/20 rounded-full text-xs font-mono text-white/60 tracking-widest uppercase bg-white/5 backdrop-blur-sm">
            Experimental Interaction
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter mix-blend-difference">
          Zero<br />Gravity
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-light leading-relaxed">
          Experience the fluidity of data. A WebGL-inspired particle simulation running entirely on 2D Canvas for maximum compatibility and performance.
        </p>

        <div className="pt-8 pointer-events-auto">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold tracking-wide overflow-hidden transition-transform hover:scale-105 active:scale-95">
            <span className="relative z-10">Start Experience</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out opacity-10"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App / Demo Component ---

export default function App() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden selection:bg-blue-500 selection:text-white">
      <AntiGravityCanvas />
      <Navigation />
      <HeroContent />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-pulse pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.2em]">Interact</span>
        <MousePointer2 size={16} />
      </div>
    </div>
  );
}

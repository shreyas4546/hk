import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Trophy,
  Sparkles,
  Zap,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  Award,
  Shield,
  CheckCircle2,
  Flame,
} from "lucide-react";
import { EVENT_DETAILS } from "../data/eventData";
import { soundEffects } from "../utils/soundEffects";
import NorrisHeadline from "./ui/norris-headline";

interface ShatterablePrizeRevealProps {
  onOpenRegister: () => void;
}

interface CrackPoint {
  x: number;
  y: number;
  path: string;
}

interface Shard {
  cx: number;
  cy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  opacity: number;
  points: { x: number; y: number }[];
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  decay: number;
}

export default function ShatterablePrizeReveal({ onOpenRegister }: ShatterablePrizeRevealProps) {
  // Crack / Shatter state: 0 = Pristine, 1 = First crack, 2 = Critical crack, 3 = Shattered / Revealed
  const [crackLevel, setCrackLevel] = useState<number>(0);
  const [cracks, setCracks] = useState<CrackPoint[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [displayAmount, setDisplayAmount] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Smooth odometer count-up animation when shattered
  useEffect(() => {
    if (crackLevel >= 3) {
      let start = 0;
      const target = 40000;
      const duration = 1800; // ms
      const startTime = performance.now();

      const animateCounter = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out expo for dramatic snap at the end
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeProgress * target);
        setDisplayAmount(current);

        if (progress < 1) {
          requestAnimationFrame(animateCounter);
        } else {
          setDisplayAmount(target);
        }
      };

      requestAnimationFrame(animateCounter);
    } else {
      setDisplayAmount(0);
    }
  }, [crackLevel]);

  // Generate jagged procedural lightning-like crack SVG paths from an origin
  const generateCrackBranch = (ox: number, oy: number, length: number, baseAngle: number): string => {
    let d = `M ${ox} ${oy}`;
    let currX = ox;
    let currY = oy;
    const steps = 6 + Math.floor(Math.random() * 4);
    const stepLen = length / steps;

    for (let i = 0; i < steps; i++) {
      const angle = baseAngle + (Math.random() - 0.5) * 0.9;
      currX += Math.cos(angle) * stepLen;
      currY += Math.sin(angle) * stepLen;
      d += ` L ${currX.toFixed(1)} ${currY.toFixed(1)}`;

      // Child offshoot branch
      if (i > 1 && Math.random() > 0.5) {
        const forkAngle = angle + (Math.random() > 0.5 ? 0.7 : -0.7);
        const forkX = currX + Math.cos(forkAngle) * (stepLen * 1.5);
        const forkY = currY + Math.sin(forkAngle) * (stepLen * 1.5);
        d += ` M ${currX.toFixed(1)} ${currY.toFixed(1)} L ${forkX.toFixed(1)} ${forkY.toFixed(1)} M ${currX.toFixed(1)} ${currY.toFixed(1)}`;
      }
    }
    return d;
  };

  // Launch Voronoi-like Canvas Glass Explosion
  const triggerCanvasShatter = useCallback((originX: number, originY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Build realistic radial & concentric glass shards
    const shards: Shard[] = [];
    const numSlices = 16;
    const rings = [0, 45, 110, 190, 310, Math.hypot(width, height)];

    for (let s = 0; s < numSlices; s++) {
      const a1 = (s / numSlices) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
      const a2 = ((s + 1) / numSlices) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;

      for (let r = 0; r < rings.length - 1; r++) {
        const r1 = rings[r] * (0.85 + Math.random() * 0.3);
        const r2 = rings[r + 1] * (0.85 + Math.random() * 0.3);

        const p0 = { x: originX + Math.cos(a1) * r1, y: originY + Math.sin(a1) * r1 };
        const p1 = { x: originX + Math.cos(a2) * r1, y: originY + Math.sin(a2) * r1 };
        const p2 = { x: originX + Math.cos(a2) * r2, y: originY + Math.sin(a2) * r2 };
        const p3 = { x: originX + Math.cos(a1) * r2, y: originY + Math.sin(a1) * r2 };

        // Shard centroid
        const cx = (p0.x + p1.x + p2.x + p3.x) / 4;
        const cy = (p0.y + p1.y + p2.y + p3.y) / 4;

        // Skip shards completely outside canvas
        if (cx < -100 || cx > width + 100 || cy < -100 || cy > height + 100) continue;

        const dx = cx - originX;
        const dy = cy - originY;
        const dist = Math.hypot(dx, dy) || 1;
        const speed = 4 + Math.random() * 10 + (1 - Math.min(dist, 500) / 500) * 8;

        shards.push({
          cx,
          cy,
          x: cx,
          y: cy,
          vx: (dx / dist) * speed + (Math.random() - 0.5) * 4,
          vy: (dy / dist) * speed - (4 + Math.random() * 6), // Explosive vertical lift
          rot: 0,
          vrot: (Math.random() - 0.5) * 0.3,
          opacity: 1,
          points: [
            { x: p0.x - cx, y: p0.y - cy },
            { x: p1.x - cx, y: p1.y - cy },
            { x: p2.x - cx, y: p2.y - cy },
            { x: p3.x - cx, y: p3.y - cy },
          ],
          color: Math.random() > 0.4 ? "rgba(0, 200, 232, 0.35)" : "rgba(255, 215, 0, 0.3)",
        });
      }
    }

    // Sparkle & ember particles
    const particles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 12;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 1.5 + Math.random() * 3,
        color: Math.random() > 0.5 ? "#00C8E8" : "#FFD700",
        opacity: 1,
        decay: 0.015 + Math.random() * 0.02,
      });
    }

    let startTime = performance.now();

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      let alive = false;

      // Draw and update shards
      for (const shard of shards) {
        if (shard.opacity <= 0.01) continue;
        alive = true;

        shard.x += shard.vx;
        shard.y += shard.vy;
        shard.vy += 0.45; // Gravity
        shard.vx *= 0.985; // Air drag
        shard.rot += shard.vrot;
        shard.opacity = Math.max(0, shard.opacity - 0.018);

        ctx.save();
        ctx.translate(shard.x, shard.y);
        ctx.rotate(shard.rot);

        ctx.beginPath();
        shard.points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();

        // Translucent refractive glass fill
        ctx.fillStyle = shard.color.replace(/[\d.]+\)$/, `${(shard.opacity * 0.4).toFixed(3)})`);
        ctx.fill();

        // Glistening edge stroke
        ctx.strokeStyle = `rgba(255, 255, 255, ${(shard.opacity * 0.85).toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.restore();
      }

      // Draw and update sparkle particles
      for (const p of particles) {
        if (p.opacity <= 0.01) continue;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.opacity = Math.max(0, p.opacity - p.decay);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (alive && time - startTime < 2500) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
  }, []);

  // Handle user clicks on the security glass
  const handleGlassClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (crackLevel >= 3) return; // Already revealed

    const rect = containerRef.current?.getBoundingClientRect();
    const clickX = rect ? e.clientX - rect.left : 250;
    const clickY = rect ? e.clientY - rect.top : 180;

    // Trigger Screen Shake
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);

    const nextLevel = crackLevel + 1;

    if (nextLevel === 1) {
      // First hit: Single origin with 5 radiating branches
      soundEffects.playCrack(1.0);
      const branches: string[] = [];
      const numBranches = 5;
      for (let i = 0; i < numBranches; i++) {
        const angle = (i / numBranches) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        branches.push(generateCrackBranch(clickX, clickY, 110 + Math.random() * 60, angle));
      }
      setCracks([{ x: clickX, y: clickY, path: branches.join(" ") }]);
      setCrackLevel(1);
    } else if (nextLevel === 2) {
      // Second hit: Extensive spiderweb fissures across the pane
      soundEffects.playCrack(1.8);
      const branches: string[] = [];
      const numBranches = 9;
      for (let i = 0; i < numBranches; i++) {
        const angle = (i / numBranches) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        branches.push(generateCrackBranch(clickX, clickY, 190 + Math.random() * 90, angle));
      }
      setCracks((prev) => [...prev, { x: clickX, y: clickY, path: branches.join(" ") }]);
      setCrackLevel(2);
    } else if (nextLevel >= 3) {
      // Third hit: CATASTROPHIC SHATTER!
      soundEffects.playShatter();
      soundEffects.playVictoryChime();
      setCrackLevel(3);

      // Setup canvas dimensions to match container exactly
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.offsetWidth;
        canvasRef.current.height = containerRef.current.offsetHeight;
        triggerCanvasShatter(clickX, clickY);
      }
    }
  };

  // Instant Shatter button
  const handleInstantShatter = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (crackLevel >= 3) return;
    const rect = containerRef.current?.getBoundingClientRect();
    const midX = (rect?.width || 500) / 2;
    const midY = (rect?.height || 360) / 2;

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 350);

    soundEffects.playShatter();
    soundEffects.playVictoryChime();
    setCrackLevel(3);

    if (canvasRef.current && containerRef.current) {
      canvasRef.current.width = containerRef.current.offsetWidth;
      canvasRef.current.height = containerRef.current.offsetHeight;
      triggerCanvasShatter(midX, midY);
    }
  };

  // Reset to pristine unbroken glass
  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setCrackLevel(0);
    setCracks([]);
    setDisplayAmount(0);
  };

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 sm:my-12">
      {/* Dynamic Background Volumetric Atmospheric Bloom */}
      <div
        className={`absolute -inset-4 sm:-inset-8 rounded-[2.5rem] transition-all duration-1000 pointer-events-none -z-10 ${
          crackLevel === 3
            ? "bg-gradient-to-r from-[#00C8E8]/25 via-[#FFD700]/20 to-[#00C8E8]/25 blur-[90px] opacity-100"
            : crackLevel === 2
            ? "bg-[#00C8E8]/20 blur-[70px] opacity-75"
            : "bg-[#00C8E8]/10 blur-[50px] opacity-40"
        }`}
      />

      {/* Main Interactive Stage Container */}
      <div
        ref={containerRef}
        onClick={handleGlassClick}
        className={`relative w-full rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col overflow-hidden transition-all duration-500 border select-none ${
          isShaking ? "animate-[shake_0.25s_ease-in-out_infinite]" : ""
        } ${
          crackLevel === 3
            ? "bg-gradient-to-b from-[#07131C] via-[#04080D] to-[#07131C] border-[#00C8E8]/50 shadow-[0_0_60px_rgba(0,200,232,0.35)]"
            : crackLevel === 2
            ? "justify-between min-h-[420px] sm:min-h-[440px] bg-[#07131C]/90 border-[#00C8E8]/60 cursor-pointer shadow-[0_0_40px_rgba(0,200,232,0.3)] hover:scale-[1.01]"
            : crackLevel === 1
            ? "justify-between min-h-[420px] sm:min-h-[440px] bg-[#07131C]/85 border-[#00C8E8]/45 cursor-pointer shadow-[0_0_30px_rgba(0,200,232,0.2)] hover:scale-[1.01]"
            : "justify-between min-h-[420px] sm:min-h-[440px] bg-[#050708]/90 border-white/15 cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.6)] hover:border-[#00C8E8]/40 hover:scale-[1.01]"
        }`}
      >
        {/* =========================================================================
            STATE A: UNBROKEN / CRACKING SECURITY GLASS (Levels 0, 1, 2)
            ========================================================================= */}
        {crackLevel < 3 && (
          <div className="relative z-10 flex flex-col justify-between h-full w-full">
            {/* Top Bar: Eyebrow Tag, Integrity Gauge & Sound Toggle */}
            <div className="flex items-center justify-between gap-3 w-full border-b border-white/10 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/15 text-[11px] sm:text-xs font-mono text-[#8DEBFF]">
                <span
                  className={`w-2 h-2 rounded-full ${
                    crackLevel === 0
                      ? "bg-emerald-400"
                      : crackLevel === 1
                      ? "bg-amber-400 animate-pulse"
                      : "bg-rose-500 animate-ping"
                  }`}
                />
                <span className="font-bold tracking-wider">
                  {crackLevel === 0
                    ? "VAULT SEALED // 100% INTEGRITY"
                    : crackLevel === 1
                    ? "STRUCTURAL COMPROMISE // 66% INTEGRITY"
                    : "CRITICAL FAILURE // 33% INTEGRITY — BREAK NOW!"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleSound}
                  title={isMuted ? "Unmute Sound" : "Mute Sound"}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-[#8DEBFF] border border-white/10 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Middle Centerpiece: Cyber Security Vault Icon & Interactive Challenge */}
            <div className="my-auto py-8 text-center flex flex-col items-center justify-center">
              {/* Vault Emblem with Glowing Brackets */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#00C8E8]/20 to-[#07131C] border border-[#00C8E8]/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,200,232,0.25)] group-hover:scale-110 transition-transform">
                <div className="absolute inset-0 rounded-2xl border border-dashed border-[#00C8E8]/40 animate-[spin_12s_linear_infinite]" />
                <Lock className="w-9 h-9 sm:w-11 sm:h-11 text-[#00C8E8]" />
                <Sparkles className="w-4 h-4 text-[#FFD700] absolute -top-1 -right-1 animate-bounce" />
              </div>

              {/* Norris Headline Tagline */}
              <div className="text-xs sm:text-sm font-mono tracking-widest text-[#8DEBFF] uppercase mb-2">
                AN INTERFACE YOU CAN LITERALLY BREAK
              </div>

              <NorrisHeadline className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl md:text-5xl text-[#F3F8FA] uppercase tracking-tight mb-3">
                CLASSIFIED <span className="cyan-turquoise-text">PRIZE VAULT</span>
              </NorrisHeadline>

              <p className="text-sm sm:text-base text-[#A4B6BF] max-w-lg mx-auto leading-relaxed font-['Inter',sans-serif] px-4">
                Think you have what it takes to conquer HackIgnite 1.0?{" "}
                <span className="text-[#00C8E8] font-semibold">
                  Tap or click this security glass {3 - crackLevel} more time{3 - crackLevel > 1 ? "s" : ""}
                </span>{" "}
                to shatter the vault and reveal the grand bounty awaiting your team.
              </p>

              {/* Interactive Hit Prompt Bar */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00C8E8]/15 border border-[#00C8E8]/40 text-xs sm:text-sm font-mono font-bold text-[#00C8E8] shadow-[0_0_20px_rgba(0,200,232,0.2)] animate-pulse">
                  <Zap className="w-4 h-4" />
                  <span>CLICK GLASS TO HIT ({3 - crackLevel}/3 HITS LEFT)</span>
                </div>

                <button
                  type="button"
                  onClick={handleInstantShatter}
                  className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 text-xs font-mono text-white/80 hover:text-white transition-all cursor-pointer"
                >
                  ⚡ Instant Shatter
                </button>
              </div>
            </div>

            {/* Bottom Glass Integrity Progress Bar */}
            <div className="w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#A4B6BF]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00C8E8]" />
                <span>
                  DEFENSE RATING:{" "}
                  <strong className="text-white">
                    {crackLevel === 0 ? "MAXIMUM" : crackLevel === 1 ? "BREACH DETECTED" : "CRITICAL"}
                  </strong>
                </span>
              </div>
              <div className="w-full sm:w-48 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    crackLevel === 0
                      ? "w-full bg-emerald-400"
                      : crackLevel === 1
                      ? "w-2/3 bg-amber-400"
                      : "w-1/3 bg-rose-500 animate-pulse"
                  }`}
                />
              </div>
            </div>

            {/* Procedural SVG Fracture Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="crack-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {cracks.map((c, i) => (
                <path
                  key={i}
                  d={c.path}
                  stroke={crackLevel === 2 ? "#8DEBFF" : "#FFFFFF"}
                  strokeWidth={crackLevel === 2 ? "2" : "1.4"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  filter="url(#crack-glow)"
                  className="animate-[pulse_1.5s_ease-in-out_infinite]"
                  opacity={crackLevel === 2 ? 0.95 : 0.8}
                />
              ))}
            </svg>
          </div>
        )}

        {/* =========================================================================
            STATE B: SHATTERED / GRAND PRIZE POOL REVEALED (Level 3)
            ========================================================================= */}
        {crackLevel === 3 && (
          <div className="relative z-10 flex flex-col gap-5 sm:gap-6 w-full animate-[fadeIn_0.6s_ease-out]">
            {/* Top Bar: Vault Unlocked, ROI Badge & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 w-full">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 via-[#00C8E8]/20 to-[#FFD700]/20 border border-[#FFD700]/40 text-xs font-mono text-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.25)]">
                <Unlock className="w-3.5 h-3.5 text-[#FFD700]" />
                <span className="font-bold tracking-widest uppercase">
                  VAULT BREACHED // OFFICIAL PRIZE POOL REVEALED
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs font-mono text-[#8DEBFF] border border-white/10 transition-colors cursor-pointer"
                  title="Break again"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-Shatter ↺</span>
                </button>
              </div>
            </div>

            {/* Centerpiece: The ₹40,000 Grand Odometer & Value Proposition */}
            <div className="py-3 sm:py-5 text-center flex flex-col items-center justify-center">
              {/* Golden Trophy Icon with Radial Halo */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#FFD700]/25 via-[#00C8E8]/20 to-[#04080D] border border-[#FFD700]/50 flex items-center justify-center mb-3 shadow-[0_0_40px_rgba(255,215,0,0.4)] animate-[bounce_2s_infinite]">
                <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFD700]" />
                <Sparkles className="w-4 h-4 text-[#8DEBFF] absolute -top-1.5 -right-1.5 animate-spin" />
              </div>

              {/* Kicker Tag */}
              <div className="text-xs sm:text-sm font-mono tracking-widest text-[#8DEBFF] uppercase mb-1 font-semibold">
                NATIONAL LEVEL 24-HOUR CHALLENGE // TOTAL BOUNTY
              </div>

              {/* THE ROLLING ₹40,000 HEADLINE */}
              <div className="flex items-baseline justify-center gap-2 sm:gap-3 my-2 flex-wrap">
                <span className="text-xs sm:text-sm md:text-base font-['Space_Grotesk'] font-normal text-[#7E939E] lowercase tracking-normal self-center sm:self-baseline pb-1">
                  (up to)
                </span>
                <span className="font-['Space_Grotesk'] font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00C8E8] via-[#8DEBFF] to-[#FFD700] drop-shadow-[0_0_45px_rgba(0,200,232,0.6)]">
                  ₹{displayAmount.toLocaleString("en-IN")}
                </span>
                <span className="font-mono text-sm sm:text-xl text-[#FFD700] font-bold tracking-wider">
                  CASH POOL
                </span>
              </div>

              <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#A4B6BF] mb-6">
                Turn a <strong className="text-[#00C8E8]">₹2,000 team entry</strong> into up to{" "}
                <strong className="text-[#FFD700]">₹40,000 in grand rewards</strong> + national prestige
              </div>

              {/* High-Value 5 Places to Conquer Mini Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 w-full max-w-3xl mb-6 text-left">
                <div className="p-3 rounded-xl bg-gradient-to-b from-[#FFD700]/15 to-transparent border border-[#FFD700]/40 shadow-[0_0_15px_rgba(255,215,0,0.15)]">
                  <div className="text-[10px] font-mono text-[#FFD700] font-bold">🥇 WINNER</div>
                  <div className="font-['Space_Grotesk'] font-bold text-sm text-[#F3F8FA] mt-0.5">CHAMPION</div>
                  <div className="text-[10px] text-[#A4B6BF] mt-1 leading-tight">Supreme Cash + Golden Trophy</div>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-b from-[#8DEBFF]/15 to-transparent border border-[#8DEBFF]/40">
                  <div className="text-[10px] font-mono text-[#8DEBFF] font-bold">🥈 RUNNER UP</div>
                  <div className="font-['Space_Grotesk'] font-bold text-sm text-[#F3F8FA] mt-0.5">EXCELLENCE</div>
                  <div className="text-[10px] text-[#A4B6BF] mt-1 leading-tight">Cash Award + Silver Honor</div>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-b from-[#CD7F32]/20 to-transparent border border-[#CD7F32]/40">
                  <div className="text-[10px] font-mono text-[#CD7F32] font-bold">🥉 2ND RUNNER UP</div>
                  <div className="font-['Space_Grotesk'] font-bold text-sm text-[#F3F8FA] mt-0.5">INNOVATION</div>
                  <div className="text-[10px] text-[#A4B6BF] mt-1 leading-tight">Cash Award + Bronze Honor</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-mono text-[#A4B6BF]">💎 BEST DEV</div>
                  <div className="font-['Space_Grotesk'] font-bold text-sm text-[#F3F8FA] mt-0.5">CODE RIGOR</div>
                  <div className="text-[10px] text-[#A4B6BF] mt-1 leading-tight">Architecture Distinction</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-mono text-[#A4B6BF]">🚀 BEST PROJECT</div>
                  <div className="font-['Space_Grotesk'] font-bold text-sm text-[#F3F8FA] mt-0.5">VIABILITY</div>
                  <div className="text-[10px] text-[#A4B6BF] mt-1 leading-tight">Impact & UX Distinction</div>
                </div>
              </div>

              {/* Motivation Statement */}
              <p className="text-xs sm:text-sm text-[#A4B6BF] max-w-xl mx-auto leading-relaxed font-['Inter',sans-serif] mb-6">
                5 distinct competitive podium placements. 24 hours of non-stop adrenaline. Free meals, gigabit WiFi,
                expert mentorship, and official verified certificates for every participant.
              </p>

              {/* Direct Conversion Action */}
              <button
                type="button"
                onClick={onOpenRegister}
                className="w-full sm:w-auto h-[52px] sm:h-[56px] px-10 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold font-['Space_Grotesk'] uppercase tracking-wider text-[#050708] bg-gradient-to-r from-[#00C8E8] via-[#FFD700] to-[#00C8E8] bg-[length:200%_auto] hover:bg-[position:right_center] cyan-btn-glow transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(255,215,0,0.35)]"
              >
                <span>CLAIM YOUR SHARE — REGISTER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Proof Strip */}
            <div className="w-full pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#8DEBFF]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% INTELLECTUAL PROPERTY RETAINED BY TEAMS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>24H FREE MEALS, ACCOMMODATION & POWER HUBS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C8E8]" />
                <span>ALL-INCLUSIVE TEAM PASS: ₹2,000</span>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Canvas Shard Physics Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
        />
      </div>
    </div>
  );
}

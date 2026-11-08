import React, { useState, useEffect, useRef } from "react";

interface CinematicPreloaderProps {
  onComplete: () => void;
}

// Lightweight 3D drifting cosmic particles with varied Z-depths
const PARTICLES_3D = [
  { top: "25%", left: "30%", z: 40, size: 3, delay: "0.1s", dur: "2.4s" },
  { top: "68%", left: "24%", z: -30, size: 2.5, delay: "0.3s", dur: "2.1s" },
  { top: "22%", left: "68%", z: 60, size: 2, delay: "0.2s", dur: "2.6s" },
  { top: "74%", left: "72%", z: -40, size: 3, delay: "0.15s", dur: "2.2s" },
  { top: "42%", left: "18%", z: 20, size: 2, delay: "0.4s", dur: "2.5s" },
  { top: "54%", left: "82%", z: 50, size: 2.5, delay: "0.25s", dur: "2.3s" },
  { top: "18%", left: "48%", z: -20, size: 3, delay: "0.05s", dur: "2.7s" },
  { top: "82%", left: "46%", z: 30, size: 2, delay: "0.35s", dur: "2.0s" },
  { top: "34%", left: "76%", z: -50, size: 2, delay: "0.2s", dur: "2.4s" },
  { top: "62%", left: "15%", z: 40, size: 2.5, delay: "0.3s", dur: "2.5s" },
  { top: "28%", left: "20%", z: -10, size: 1.5, delay: "0.45s", dur: "2.2s" },
  { top: "78%", left: "80%", z: 70, size: 2, delay: "0.1s", dur: "2.8s" },
];

export default function CinematicPreloader({ onComplete }: CinematicPreloaderProps) {
  // Stage state: 1 (awakening), 2 (3d materialization), 3 (power-up & sweep), 4 (portal reveal)
  const [stage, setStage] = useState<number>(1);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  // Damped 3D mouse tilt coordinates
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock page scroll during the 2.8s cinematic sequence
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress bar animation ticker (0 to 100% across 2100ms)
    const startTime = performance.now();
    const durationMs = 2100;
    let animId = 0;

    const tickProgress = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgressPercent(progress);
      if (progress < 100) {
        animId = requestAnimationFrame(tickProgress);
      }
    };
    animId = requestAnimationFrame(tickProgress);

    // Timeline Schedule:
    // Stage 1 (0ms - 400ms): 3D space, grid & gyro rings awaken
    // Stage 2 (400ms - 1100ms): 3D logo levitation & materialization into center
    const tStage2 = setTimeout(() => {
      setStage(2);
    }, 400);

    // Stage 3 (1100ms - 2200ms): Kinetic energy overcharge, 3D laser sweep, plasma bloom
    const tStage3 = setTimeout(() => {
      setStage(3);
    }, 1100);

    // Stage 4 (2200ms - 2750ms): Smooth cinematic portal dissolve reveal (550ms ease-out)
    const tStage4 = setTimeout(() => {
      setStage(4);
      setIsFadingOut(true);
    }, 2200);

    // Complete & unmount from DOM (2800ms total - comfortably under 3.0s max)
    const tComplete = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      onComplete();
    }, 2800);

    // Strict safety timeout fallback at 3000ms max
    const tSafety = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      onComplete();
    }, 3000);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(tStage2);
      clearTimeout(tStage3);
      clearTimeout(tStage4);
      clearTimeout(tComplete);
      clearTimeout(tSafety);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  // Subtle interactive 3D mouse parallax response
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: x * 14, y: -y * 14 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      role="status"
      aria-label="HackIgnite 1.0 3D Cinematic Loading"
      className={`fixed inset-0 z-[99999] bg-[#030609] flex items-center justify-center overflow-hidden transition-all duration-550 ease-out select-none ${
        isFadingOut
          ? "opacity-0 scale-[1.04] pointer-events-none"
          : "opacity-100 scale-100 pointer-events-auto"
      }`}
      style={{
        perspective: "1200px",
      }}
    >
      {/* =========================================================================
          1. 3D PERSPECTIVE FLOOR GRID & HORIZON DEPTH
          ========================================================================= */}
      <div className="absolute inset-x-0 bottom-0 h-[55vh] pointer-events-none overflow-hidden opacity-45">
        <div
          className="w-full h-full grid-3d-perspective-floor"
          style={{
            transform: `rotateX(78deg) translateZ(-80px) translateY(40px) rotateY(${mouseTilt.x * 0.3}deg)`,
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* =========================================================================
          2. DEEP NEBULA ATMOSPHERIC LIGHTING
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Outer radial cyan atmosphere */}
        <div
          className={`w-[520px] h-[520px] sm:w-[750px] sm:h-[750px] rounded-full bg-gradient-to-tr from-[#00C8E8]/16 via-[#19D8E8]/10 to-transparent blur-[120px] sm:blur-[150px] transition-all duration-1000 ease-out ${
            stage >= 2 ? "opacity-100 scale-100" : "opacity-35 scale-75"
          }`}
        />
        {/* Deep electric core glow */}
        <div
          className={`absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] rounded-full bg-[#00C8E8]/20 blur-[75px] transition-all duration-700 ${
            stage >= 3 ? "opacity-100 scale-110" : stage === 2 ? "opacity-75 scale-100" : "opacity-0 scale-85"
          }`}
        />
      </div>

      {/* =========================================================================
          3. 3D FLOATING COSMIC PARTICLES (Multi-Depth Z-Layers)
          ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {PARTICLES_3D.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#8DEBFF] shadow-[0_0_10px_#00C8E8] pointer-events-none transition-opacity duration-500"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              transform: `translateZ(${p.z}px)`,
              opacity: stage >= 2 ? 0.8 : 0.25,
            }}
          />
        ))}
      </div>

      {/* =========================================================================
          4. 3D GYROSCOPIC CONCENTRIC ORBITAL RINGS
          ========================================================================= */}
      <div
        className={`absolute pointer-events-none transition-opacity duration-700 ${
          stage >= 2 ? "opacity-100" : "opacity-25"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${mouseTilt.x * 0.5}deg) rotateX(${mouseTilt.y * 0.5}deg)`,
        }}
      >
        {/* Outer 3D Gyro Ring */}
        <div
          className="gyro-ring-outer w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] md:w-[580px] md:h-[580px] rounded-full border border-dashed border-[#00C8E8]/35 flex items-center justify-center relative shadow-[0_0_30px_rgba(0,200,232,0.25)]"
        >
          {/* Luminous Waypoint Beads on Outer Ring */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#8DEBFF] border border-[#00C8E8] shadow-[0_0_12px_#00C8E8]" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#8DEBFF] border border-[#00C8E8] shadow-[0_0_12px_#00C8E8]" />
        </div>

        {/* Inner 3D Counter-Rotating Gyro Ring */}
        <div
          className="gyro-ring-inner absolute inset-0 m-auto w-[270px] h-[270px] sm:w-[390px] sm:h-[390px] md:w-[460px] md:h-[460px] rounded-full border border-[#19D8E8]/40 shadow-[0_0_20px_rgba(25,216,232,0.3)] flex items-center justify-center"
        >
          {/* Accent tick notches */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00C8E8] shadow-[0_0_8px_#00C8E8]" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00C8E8] shadow-[0_0_8px_#00C8E8]" />
        </div>
      </div>

      {/* =========================================================================
          5. 3D CENTRAL OFFICIAL HACKIGNITE LOGO BADGE
          ========================================================================= */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-4 max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[440px] w-full"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${mouseTilt.x}deg) rotateX(${mouseTilt.y}deg)`,
        }}
      >
        {/* 3D Floating & Levitation Logo Container */}
        <div
          className={`relative w-full aspect-square flex items-center justify-center transition-all duration-700 ease-out ${
            stage >= 3
              ? "logo-3d-levitate opacity-100"
              : stage === 2
              ? "opacity-100 scale-100"
              : "opacity-0 scale-[0.82]"
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform:
              stage >= 2
                ? "translateZ(40px) rotateX(0deg) rotateY(0deg)"
                : "translateZ(-160px) rotateX(24deg) rotateY(-20deg)",
          }}
        >
          {/* Refined 3D Multi-Layer Radial Plasma Bloom */}
          <div
            className={`absolute -inset-8 sm:-inset-14 rounded-full bg-gradient-to-tr from-[#00C8E8]/35 via-[#19D8E8]/20 to-transparent blur-3xl sm:blur-4xl pointer-events-none transition-all duration-800 ${
              stage >= 3
                ? "opacity-100 scale-115"
                : stage === 2
                ? "opacity-75 scale-100"
                : "opacity-0 scale-85"
            }`}
          />

          {/* 3D Glass Holographic Backplate Accent */}
          <div className="absolute inset-2 sm:inset-4 rounded-[28px] sm:rounded-[36px] bg-[#07131C]/60 border border-[#00C8E8]/30 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] pointer-events-none" />

          {/* Official HackIgnite Logo Artwork */}
          <picture className="relative z-10 block w-full h-full flex items-center justify-center p-3 sm:p-5">
            <source srcSet="/assets/logo/hackignite-badge.webp" type="image/webp" />
            <img
              src="/assets/logo/hackignite-badge.png"
              alt="HackIgnite 1.0"
              className={`w-full h-full object-contain transition-all duration-700 ${
                stage >= 3
                  ? "filter drop-shadow-[0_0_30px_rgba(0,200,232,0.95)] drop-shadow-[0_0_55px_rgba(25,216,232,0.65)]"
                  : stage === 2
                  ? "filter drop-shadow-[0_0_18px_rgba(0,200,232,0.7)]"
                  : "filter drop-shadow-[0_0_6px_rgba(0,200,232,0.3)]"
              }`}
              loading="eager"
              decoding="sync"
            />
          </picture>

          {/* Stage 3: 3D High-Velocity Laser Sheen Across the Flame & Orbit */}
          {stage >= 3 && (
            <div className="absolute inset-3 sm:inset-5 rounded-[26px] sm:rounded-[34px] overflow-hidden pointer-events-none z-20">
              <div className="absolute inset-0 w-3/4 h-[250%] -top-3/4 bg-gradient-to-r from-transparent via-[#8DEBFF]/45 to-transparent laser-sweep-3d-active" />
            </div>
          )}
        </div>

        {/* =========================================================================
            6. FUTURISTIC 3D TELEMETRY & ENERGY PROGRESS BAR
            ========================================================================= */}
        <div
          className={`mt-4 sm:mt-6 w-full max-w-[280px] sm:max-w-[320px] flex flex-col items-center transition-all duration-600 ${
            stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Telemetry Status Line */}
          <div className="w-full flex items-center justify-between text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#8DEBFF] uppercase mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8] shadow-[0_0_8px_#00C8E8] animate-pulse" />
              <span>{progressPercent >= 100 ? "IGNITION PROTOCOL ONLINE" : "SYSTEM INITIALIZING"}</span>
            </span>
            <span className="text-[#00C8E8]">{progressPercent}%</span>
          </div>

          {/* Ultra-Slim 2px Cyber Energy Progress Track */}
          <div className="w-full h-1 sm:h-1.5 rounded-full bg-white/10 p-[1px] overflow-hidden relative border border-[#00C8E8]/30 shadow-[0_0_12px_rgba(0,200,232,0.2)]">
            <div
              className="h-full bg-gradient-to-r from-[#00C8E8] via-[#19D8E8] to-[#8DEBFF] rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_#00C8E8] relative"
              style={{ width: `${progressPercent}%` }}
            >
              {/* Traveling light bead at progress tip */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FFFFFF]" />
            </div>
          </div>

          {/* Subtitle Protocol Label */}
          <span className="mt-2 text-[9px] sm:text-[10px] font-mono text-[#A4B6BF]/70 tracking-widest uppercase">
            HACKIGNITE 1.0 // 24-HOUR RUN
          </span>
        </div>
      </div>
    </div>
  );
}

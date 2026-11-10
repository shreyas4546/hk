import React, { useEffect, useRef, useState } from "react";

interface CinematicPreloaderProps {
  onComplete: () => void;
}

// 12 Lightweight ambient cosmic stars
const STARS = [
  { top: "18%", left: "22%", size: 2, delay: "0s", duration: "2.4s" },
  { top: "28%", left: "75%", size: 2.5, delay: "0.4s", duration: "2.8s" },
  { top: "72%", left: "18%", size: 1.8, delay: "0.2s", duration: "2.1s" },
  { top: "80%", left: "78%", size: 2.2, delay: "0.6s", duration: "2.6s" },
  { top: "38%", left: "15%", size: 2, delay: "0.3s", duration: "2.3s" },
  { top: "60%", left: "85%", size: 1.5, delay: "0.5s", duration: "2.5s" },
  { top: "15%", left: "55%", size: 2.5, delay: "0.1s", duration: "2.7s" },
  { top: "85%", left: "45%", size: 2, delay: "0.7s", duration: "2.2s" },
];

export default function CinematicPreloader({ onComplete }: CinematicPreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Lock scroll during the swift cinematic sequence
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Direct DOM progress animation (Zero React re-renders = 100% 60-120fps smoothness)
    const startTime = performance.now();
    const durationMs = 1350; // Progress completes smoothly in 1.35s
    let animId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(100, Math.round((elapsed / durationMs) * 100));

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`;
      }
      if (percentTextRef.current) {
        percentTextRef.current.textContent = `${progress}%`;
      }
      if (statusTextRef.current) {
        if (progress < 35) {
          statusTextRef.current.textContent = "INITIALIZING CORE SYSTEMS";
        } else if (progress < 70) {
          statusTextRef.current.textContent = "CALIBRATING NEURAL PROTOCOLS";
        } else if (progress < 98) {
          statusTextRef.current.textContent = "IGNITION SEQUENCE PRIMED";
        } else {
          statusTextRef.current.textContent = "ACCESS GRANTED // LAUNCHING";
        }
      }

      if (progress < 100) {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);

    // Smooth exit transition at 1.45s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1450);

    // Complete & unmount at 1.75s (swift, exhilarating, never laggy or stuck)
    const completeTimer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      onComplete();
    }, 1750);

    // Safety fallback at 2.0s max
    const safetyTimer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      onComplete();
    }, 2000);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      clearTimeout(safetyTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  // Zero-rerender mouse tilt using CSS Custom Properties directly on DOM
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    containerRef.current.style.setProperty("--tilt-x", `${x.toFixed(2)}deg`);
    containerRef.current.style.setProperty("--tilt-y", `${y.toFixed(2)}deg`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      role="status"
      aria-label="HackIgnite 1.0 Loading"
      className={`fixed inset-0 z-[99999] bg-[#030608] flex items-center justify-center overflow-hidden select-none transition-all duration-400 ease-out ${
        isFadingOut
          ? "opacity-0 scale-[1.03] pointer-events-none filter blur-[2px]"
          : "opacity-100 scale-100 pointer-events-auto"
      }`}
      style={
        {
          "--tilt-x": "0deg",
          "--tilt-y": "0deg",
          perspective: "1000px",
        } as React.CSSProperties
      }
    >
      {/* Scoped CSS animations for smooth 60-120fps hardware-accelerated motion */}
      <style>{`
        @keyframes preloaderOrbitCw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes preloaderOrbitCcw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes preloaderAuraPulse {
          0%, 100% { transform: scale(0.95); opacity: 0.55; }
          50% { transform: scale(1.15); opacity: 0.85; }
        }
        @keyframes preloaderFlameFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-6px) scale(1.02); }
        }
        @keyframes preloaderStarBlink {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50% { opacity: 0.9; transform: scale(1.2); }
        }
        .preloader-orbit-cw {
          animation: preloaderOrbitCw 14s linear infinite;
          will-change: transform;
        }
        .preloader-orbit-ccw {
          animation: preloaderOrbitCcw 18s linear infinite;
          will-change: transform;
        }
        .preloader-aura-pulse {
          animation: preloaderAuraPulse 3s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .preloader-flame-float {
          animation: preloaderFlameFloat 3.5s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* =========================================================================
          1. DEEP AMBIENT COSMIC ATMOSPHERE (Lightweight Radial Glow)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Core cyan nebula halo */}
        <div className="preloader-aura-pulse w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full bg-gradient-to-tr from-[#00C8E8]/18 via-[#19D8E8]/10 to-transparent blur-[90px] sm:blur-[110px]" />
        {/* Deep electric core spark */}
        <div className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full bg-[#00C8E8]/20 blur-[50px]" />
      </div>

      {/* =========================================================================
          2. LIGHTWEIGHT DRIFTING STARS
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#8DEBFF] shadow-[0_0_8px_#00C8E8]"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animation: `preloaderStarBlink ${s.duration} ease-in-out infinite ${s.delay}`,
            }}
          />
        ))}
      </div>

      {/* =========================================================================
          3. MAIN EMBLEM & TYPOGRAPHY SHOWCASE (NO SQUARES, NO APP-ICON BOXES)
          ========================================================================= */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-4 max-w-md w-full"
        style={{
          transform: "rotateY(var(--tilt-x)) rotateX(var(--tilt-y))",
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* Free-Floating Central Reactor Node */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
          {/* Outer Dashed Orbit Ring */}
          <div className="preloader-orbit-cw absolute inset-0 rounded-full border border-dashed border-[#00C8E8]/40 shadow-[0_0_25px_rgba(0,200,232,0.2)] flex items-center justify-center pointer-events-none">
            {/* Luminous Waypoint Beads */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#8DEBFF] border border-[#00C8E8] shadow-[0_0_10px_#00C8E8]" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#8DEBFF] border border-[#00C8E8] shadow-[0_0_10px_#00C8E8]" />
          </div>

          {/* Inner Dotted Counter-Rotating Orbit Ring */}
          <div className="preloader-orbit-ccw absolute inset-3 sm:inset-4 rounded-full border border-dotted border-[#19D8E8]/35 pointer-events-none">
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00C8E8] shadow-[0_0_8px_#00C8E8]" />
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00C8E8] shadow-[0_0_8px_#00C8E8]" />
          </div>

          {/* Soft Atmospheric Core Glow (Pure Organic Radial Aura - Zero Box, Zero Hard Borders) */}
          <div className="absolute inset-4 rounded-full bg-[#00C8E8]/10 blur-xl pointer-events-none" />

          {/* The Pure Official HackIgnite Emblem (Flame 'H' with Orbit) - 100% Transparent, No Square Borders */}
          <div className="preloader-flame-float relative z-10 w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
            <picture>
              <source srcSet="/assets/logo/hackignite-emblem.webp" type="image/webp" />
              <img
                src="/assets/logo/hackignite-emblem.png"
                alt="HackIgnite 1.0 Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,200,232,0.85)] drop-shadow-[0_0_45px_rgba(25,216,232,0.45)]"
                loading="eager"
                decoding="sync"
              />
            </picture>
          </div>
        </div>

        {/* =========================================================================
            4. SLEEK BRAND TYPOGRAPHY
            ========================================================================= */}
        <div className="text-center mt-3 sm:mt-4">
          <h1 className="font-['Space_Grotesk'] font-bold text-xl sm:text-2xl tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#8DEBFF] to-[#00C8E8] drop-shadow-[0_0_15px_rgba(0,200,232,0.4)]">
            HACKIGNITE 1.0
          </h1>
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.28em] text-[#A4B6BF] uppercase mt-1">
            24-HOUR INNOVATION CHALLENGE
          </p>
        </div>

        {/* =========================================================================
            5. ULTRA-SLIM CYBER ENERGY TELEMETRY & PROGRESS BAR
            ========================================================================= */}
        <div className="mt-5 sm:mt-6 w-full max-w-[260px] sm:max-w-[300px] flex flex-col items-center">
          {/* Status readout with pulse bead & dynamic percentage */}
          <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#8DEBFF] uppercase mb-1.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8] shadow-[0_0_8px_#00C8E8] animate-pulse" />
              <span ref={statusTextRef} className="truncate">
                INITIALIZING CORE SYSTEMS
              </span>
            </span>
            <span ref={percentTextRef} className="text-[#00C8E8] font-mono font-bold ml-2">
              0%
            </span>
          </div>

          {/* Ultra-Slim 2px Cyber Progress Track */}
          <div className="w-full h-1 sm:h-1.5 rounded-full bg-white/10 p-[1px] overflow-hidden relative border border-[#00C8E8]/35 shadow-[0_0_12px_rgba(0,200,232,0.25)]">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#00C8E8] via-[#19D8E8] to-[#8DEBFF] rounded-full shadow-[0_0_10px_#00C8E8] relative"
              style={{ width: "0%" }}
            >
              {/* Traveling spark light on bar tip */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FFFFFF]" />
            </div>
          </div>

          {/* Campus Host Sub-Tag */}
          <span className="mt-2 text-[8.5px] sm:text-[9.5px] font-mono text-[#A4B6BF]/60 tracking-widest uppercase">
            JCET HUBBALLI // 12-13 DEC 2026
          </span>
        </div>
      </div>
    </div>
  );
}

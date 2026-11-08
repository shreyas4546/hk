import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  Trophy,
  ShieldCheck,
  Check,
  Copy,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Award,
  Zap,
  ArrowDown,
} from "lucide-react";
import { useScroll, useSpring } from "motion/react";
import { EVENT_DETAILS } from "../data/eventData";
import NorrisHeadline from "./ui/norris-headline";

// --- 3D Curved Arc Coverflow Math ---
interface CardTransform {
  transform: string;
  opacity: number;
  zIndex: number;
  filter: string;
  pointerEvents: "auto" | "none";
}

function calculateCardTransform(d: number, isMobile: boolean): CardTransform {
  const sign = Math.sign(d);
  const absD = Math.abs(d);

  // Beyond 3 cards away: fully hide
  if (absD >= 3) {
    const x = sign * (isMobile ? 360 : 760);
    const y = isMobile ? 60 : 105;
    const z = -380;
    const rZ = sign * (isMobile ? 18 : 25);
    const rY = -sign * (isMobile ? 30 : 45);
    return {
      transform: `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${rZ}deg) rotateY(${rY}deg) scale(0.6)`,
      opacity: 0,
      zIndex: 5,
      filter: "brightness(0.3)",
      pointerEvents: "none",
    };
  }

  // Linear / Curved Interpolation Constants
  const step1X = isMobile ? 165 : 310;
  const step2X = isMobile ? 285 : 550;
  const step3X = isMobile ? 360 : 760;

  const step1Y = isMobile ? 14 : 22;
  const step2Y = isMobile ? 36 : 64;
  const step3Y = isMobile ? 60 : 105;

  const step1Z = isMobile ? -80 : -120;
  const step2Z = isMobile ? -150 : -240;
  const step3Z = isMobile ? -240 : -360;

  const step1RZ = isMobile ? 7 : 10;
  const step2RZ = isMobile ? 13 : 18;
  const step3RZ = isMobile ? 18 : 25;

  const step1RY = isMobile ? 16 : 22;
  const step2RY = isMobile ? 26 : 36;
  const step3RY = isMobile ? 32 : 45;

  let x = 0;
  let y = 0;
  let z = 0;
  let rZ = 0;
  let rY = 0;
  let scale = 1;
  let opacity = 1;
  let brightness = 1;

  if (absD <= 1) {
    const t = absD;
    x = sign * t * step1X;
    y = t * step1Y;
    z = t * step1Z;
    rZ = sign * t * step1RZ;
    rY = -sign * t * step1RY;
    scale = 1 - t * 0.12;
    opacity = 1 - t * 0.25;
    brightness = 1 - t * 0.25;
  } else if (absD <= 2) {
    const t = absD - 1;
    x = sign * (step1X + t * (step2X - step1X));
    y = step1Y + t * (step2Y - step1Y);
    z = step1Z + t * (step2Z - step1Z);
    rZ = sign * (step1RZ + t * (step2RZ - step1RZ));
    rY = -sign * (step1RY + t * (step2RY - step1RY));
    scale = 0.88 - t * 0.14;
    opacity = 0.75 - t * 0.37;
    brightness = 0.75 - t * 0.25;
  } else {
    const t = absD - 2;
    x = sign * (step2X + t * (step3X - step2X));
    y = step2Y + t * (step3Y - step2Y);
    z = step2Z + t * (step3Z - step2Z);
    rZ = sign * (step2RZ + t * (step3RZ - step2RZ));
    rY = -sign * (step2RY + t * (step3RY - step2RY));
    scale = 0.74 - t * 0.14;
    opacity = 0.38 - t * 0.38;
    brightness = 0.5 - t * 0.2;
  }

  const zIndex = Math.round(50 - absD * 12);

  return {
    transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateZ(${rZ.toFixed(2)}deg) rotateY(${rY.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
    opacity: Math.max(0, opacity),
    zIndex,
    filter: `brightness(${brightness.toFixed(2)})`,
    pointerEvents: absD <= 1.2 ? "auto" : "none",
  };
}

export default function EventOverview() {
  const [copied, setCopied] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);

  // Drag tracking state
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);

  // Motion scroll progress hooks attached specifically to the 3D scroll track
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    mass: 0.4,
    restDelta: 0.0001,
  });

  // Responsive breakpoint check
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const totalCards = 6;

  // Programmatic scroll-to-card helper
  const goToCard = useCallback(
    (targetIndex: number) => {
      const clamped = Math.max(0, Math.min(totalCards - 1, targetIndex));
      if (!scrollTrackRef.current) return;
      const rect = scrollTrackRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const trackTop = rect.top + currentScroll;
      const maxScroll = scrollTrackRef.current.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const targetScroll = trackTop + (clamped / (totalCards - 1)) * maxScroll;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    },
    [totalCards]
  );

  // Directly apply transforms on DOM nodes without triggering React re-renders on scroll
  const applyTransforms = useCallback(
    (progressVal: number) => {
      const currentFloat = progressVal * (totalCards - 1);
      const roundedIndex = Math.min(totalCards - 1, Math.max(0, Math.round(currentFloat)));

      if (roundedIndex !== activeIndexRef.current) {
        activeIndexRef.current = roundedIndex;
        setActiveIndex(roundedIndex);
      }

      cardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        const diff = idx - currentFloat;
        const { transform, opacity, zIndex, filter, pointerEvents } = calculateCardTransform(
          diff,
          isMobile
        );

        cardEl.style.transform = transform;
        cardEl.style.opacity = `${opacity}`;
        cardEl.style.zIndex = `${zIndex}`;
        cardEl.style.filter = filter;
        cardEl.style.pointerEvents = pointerEvents;

        if (Math.abs(diff) < 0.35) {
          cardEl.classList.add("active-card");
        } else {
          cardEl.classList.remove("active-card");
        }
      });
    },
    [totalCards, isMobile]
  );

  // Subscribe to smooth motion scroll spring
  useEffect(() => {
    applyTransforms(smoothProgress.get());
    const unsubscribe = smoothProgress.on("change", (latest) => {
      applyTransforms(latest);
    });
    return () => unsubscribe();
  }, [smoothProgress, applyTransforms]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    dragStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current === null || dragStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - dragStartX.current;
    const deltaY = e.changedTouches[0].clientY - dragStartY.current;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goToCard(activeIndex + 1);
      } else {
        goToCard(activeIndex - 1);
      }
    }
    dragStartX.current = null;
    dragStartY.current = null;
  };

  // Mouse Drag Handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        goToCard(activeIndex + 1);
      } else {
        goToCard(activeIndex - 1);
      }
    }
    dragStartX.current = null;
  };

  // 1-Click Copy Address Handler
  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(EVENT_DETAILS.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <section id="overview" className="relative w-full bg-transparent overflow-visible">
      {/* Anchor for About Section */}
      <div id="about" className="absolute -top-24 pointer-events-none" />
      {/* =========================================================================
          PART 1: THE MISSION BRIEFING (Spacious, High-Impact Editorial Section Intro)
          Fonts are cleanly placed with zero card collision and optimal reading flow
          ========================================================================= */}
      <div className="relative pt-24 sm:pt-32 md:pt-36 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center z-10">
        {/* Glow backdrop behind intro */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#00C8E8]/10 via-[#8A2BE2]/08 to-transparent blur-[120px] pointer-events-none rounded-full -z-10" />

        {/* Subtle Section Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07131C]/80 backdrop-blur-md border border-[#00C8E8]/30 text-xs font-mono text-[#8DEBFF] mb-5 shadow-[0_0_20px_rgba(0,200,232,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8] animate-pulse" />
          <span className="tracking-widest uppercase">ABOUT THE EVENT // MISSION BRIEFING</span>
        </div>

        {/* Sleek Geometric Sans-Serif Header */}
        <NorrisHeadline className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.12] mb-6">
          <span className="text-[#F3F8FA] block">24 HOURS. ONE MISSION.</span>
          <span className="cyan-turquoise-text block mt-1 drop-shadow-[0_0_25px_rgba(0,200,232,0.35)]">
            INFINITE POSSIBILITIES.
          </span>
        </NorrisHeadline>

        {/* Clean, Entirely Static Paragraph in White Sans-Serif Text */}
        <p className="text-base sm:text-lg md:text-xl text-[#F3F8FA]/90 font-['Inter',sans-serif] font-normal leading-relaxed max-w-3xl mx-auto mb-8">
          HackIgnite 1.0 is a national-level, 24-hour hackathon presented by the {EVENT_DETAILS.department} at {EVENT_DETAILS.institution}.
          Bring ideas, collaborate, and engineer solutions for real-world impact.
        </p>

        {/* Aerospace Mission Telemetry Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 text-xs font-mono text-[#8DEBFF]">
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
            DURATION // 24 HOURS NON-STOP
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
            VENUE // JCET HUBBALLI
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
            ENTRY // ₹2,000 PER TEAM
          </span>
        </div>

        {/* Scroll Invitation Cue */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-2 text-xs font-mono text-[#A4B6BF]/80 tracking-widest uppercase">
          <span>EXPLORE 3D EVENT ARCHITECTURE</span>
          <ArrowDown className="w-4 h-4 text-[#00C8E8] animate-bounce" />
        </div>
      </div>

      {/* =========================================================================
          PART 2: THE 3D COVERFLOW SCROLL ARENA (Pinned Viewport with Luxurious Space)
          Zero overlap: cards have 100% of the stage to float, rotate, and recede
          ========================================================================= */}
      <div ref={scrollTrackRef} className="relative w-full h-[260vh] sm:h-[300vh]">
        <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between items-center pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6 overflow-hidden z-20">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-b from-[#00C8E8]/10 via-[#8A2BE2]/08 to-transparent blur-[140px] pointer-events-none rounded-full -z-10" />

          {/* Minimal HUD Header for the 3D Stage (Takes only ~50px, zero clutter) */}
          <div className="text-center z-10 w-full pt-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07131C]/60 backdrop-blur-md border border-[#00C8E8]/30 text-[11px] font-mono text-[#8DEBFF] mb-1 shadow-[0_0_15px_rgba(0,200,232,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8] animate-pulse" />
              <span className="tracking-widest uppercase">EVENT CORE // 3D TIMELINE & VENUE</span>
            </div>
            <h3 className="font-['Space_Grotesk'] font-bold text-lg sm:text-2xl text-[#F3F8FA] tracking-tight uppercase">
              EXPLORE EVENT DETAILS
            </h3>
          </div>

          {/* -----------------------------------------------------------------------
              3D CURVED ARC COVERFLOW CAROUSEL
              Ample vertical breathing room — no text colliding with the cards
              ----------------------------------------------------------------------- */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center perspective-[1100px] sm:perspective-[1400px] select-none my-auto"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* ---------------- CARD 0: 24 HOURS (Mission Core) ---------------- */}
            <div
              ref={(el) => {
                cardRefs.current[0] = el;
              }}
              onClick={() => goToCard(0)}
              className="coverflow-3d-card group w-[86vw] max-w-[340px] sm:max-w-[440px] md:max-w-[480px] h-[340px] sm:h-[380px] p-5 sm:p-7 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Thematic Cosmic Space Background Image */}
              <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden -z-10 pointer-events-none">
                <img
                  src="/assets/cards/coverflow-24h.webp"
                  alt="24 Hours Sprint Nebula"
                  decoding="async"
                  className="w-full h-full object-cover object-center opacity-45 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04080D] via-[#07131C]/75 to-[#07131C]/50" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#04080D_90%)]" />
              </div>

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#00C8E8] animate-ping" />
                  <span className="text-[11px] font-mono tracking-widest text-[#8DEBFF] uppercase">
                    MISSION CORE // 24-HOUR SPRINT
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00C8E8]/10 text-[#00C8E8] border border-[#00C8E8]/30">
                  NON-STOP
                </span>
              </div>

              {/* Centerpiece: Bold 24 HOURS Typography with Orbital Trajectory */}
              <div className="relative flex flex-col items-center justify-center my-auto py-2 text-center">
                <div className="relative inline-flex items-center justify-center w-[240px] h-[120px] sm:w-[280px] sm:h-[135px]">
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                    viewBox="0 0 300 150"
                  >
                    <ellipse
                      cx="150"
                      cy="75"
                      rx="135"
                      ry="50"
                      transform="rotate(-15 150 75)"
                      fill="none"
                      stroke="rgba(138, 43, 226, 0.25)"
                      strokeWidth="1.2"
                      strokeDasharray="4 6"
                    />
                    <ellipse
                      cx="150"
                      cy="75"
                      rx="125"
                      ry="45"
                      transform="rotate(16 150 75)"
                      fill="none"
                      stroke="url(#covOrbitGrad)"
                      strokeWidth="1.8"
                    />
                    <g className="animate-slow-orbit" style={{ transformOrigin: "150px 75px" }}>
                      <circle cx="275" cy="75" r="4" fill="#00C8E8" className="drop-shadow-[0_0_12px_#00C8E8]" />
                      <circle cx="275" cy="75" r="8" fill="none" stroke="#8DEBFF" strokeWidth="1" opacity="0.6" />
                    </g>
                    <g className="animate-reverse-orbit" style={{ transformOrigin: "150px 75px" }}>
                      <circle cx="25" cy="75" r="3" fill="#8A2BE2" className="drop-shadow-[0_0_10px_#8A2BE2]" />
                    </g>
                    <defs>
                      <linearGradient id="covOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00C8E8" stopOpacity="0.85" />
                        <stop offset="50%" stopColor="#8DEBFF" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="flex items-baseline gap-2 relative z-10">
                    <span className="font-['Space_Grotesk'] font-black text-6xl sm:text-7xl md:text-8xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#F3F8FA] via-[#F3F8FA] to-[#8DEBFF]/40 drop-shadow-[0_0_35px_rgba(0,200,232,0.35)]">
                      24
                    </span>
                    <span className="font-['Space_Grotesk'] font-bold text-xl sm:text-2xl text-[#00C8E8] tracking-widest uppercase">
                      HOURS
                    </span>
                  </div>
                </div>

                <div className="max-w-xs sm:max-w-sm mt-1 text-center">
                  <h3 className="font-['Space_Grotesk'] font-bold text-sm sm:text-base text-[#F3F8FA] uppercase tracking-wide mb-1">
                    Non-Stop Innovation Marathon
                  </h3>
                  <p className="text-xs text-[#A4B6BF] font-['Inter',sans-serif] leading-relaxed line-clamp-2">
                    Ideate, architect, and ship high-impact prototypes before the clock hits zero.
                  </p>
                </div>
              </div>

              {/* Telemetry Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#8DEBFF]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00C8E8]" />
                  DURATION // 24 HOURS
                </span>
                <span className="text-[#A4B6BF]">ROUND-THE-CLOCK</span>
              </div>
            </div>

            {/* ---------------- CARD 1: HACKIGNITE 1.0 (Flagship Edition) ---------------- */}
            <div
              ref={(el) => {
                cardRefs.current[1] = el;
              }}
              onClick={() => goToCard(1)}
              className="coverflow-3d-card group w-[86vw] max-w-[340px] sm:max-w-[440px] md:max-w-[480px] h-[340px] sm:h-[380px] p-5 sm:p-7 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Thematic Cybernetic Mesh Background Image */}
              <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden -z-10 pointer-events-none">
                <img
                  src="/assets/cards/coverflow-hackignite.webp"
                  alt="HackIgnite Cybernetic Arena"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center opacity-45 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04080D] via-[#07131C]/75 to-[#07131C]/50" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#04080D_90%)]" />
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00C8E8]" />
                  <span className="text-[11px] font-mono tracking-widest text-[#8DEBFF] uppercase">
                    EVENT // EDITION 01
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00C8E8]/10 text-[#00C8E8] border border-[#00C8E8]/30">
                  OFFICIAL
                </span>
              </div>

              <div className="flex flex-col items-center justify-center my-auto py-2 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#00C8E8]/20 to-[#8A2BE2]/20 border border-[#00C8E8]/40 flex items-center justify-center shadow-[0_0_25px_rgba(0,200,232,0.25)] mb-3">
                  <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-[#00C8E8]" />
                </div>
                <h3 className="font-['Space_Grotesk'] font-bold text-2xl sm:text-3xl text-[#F3F8FA] tracking-tight uppercase mb-1">
                  {EVENT_DETAILS.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#00C8E8] font-mono mb-2 uppercase tracking-wider">
                  Inaugural National Innovation Sprint
                </p>
                <p className="text-xs text-[#A4B6BF] font-['Inter',sans-serif] leading-relaxed max-w-xs sm:max-w-sm line-clamp-2">
                  Presented by {EVENT_DETAILS.department} at {EVENT_DETAILS.institution}.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#8DEBFF]">
                <span>STATUS // REGISTRATION OPEN</span>
                <span className="text-[#A4B6BF]">TIER-1 ARENA</span>
              </div>
            </div>

            {/* ---------------- CARD 2: 5 PLACES TO CONQUER (Competition Highlights) ---------------- */}
            <div
              ref={(el) => {
                cardRefs.current[2] = el;
              }}
              onClick={() => goToCard(2)}
              className="coverflow-3d-card group w-[86vw] max-w-[340px] sm:max-w-[440px] md:max-w-[480px] h-[340px] sm:h-[380px] p-5 sm:p-7 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Thematic Holographic Crystal Prism Background Image */}
              <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden -z-10 pointer-events-none">
                <img
                  src="/assets/cards/coverflow-podium.webp"
                  alt="Podium Honors Crystal"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center opacity-45 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04080D] via-[#07131C]/75 to-[#07131C]/50" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#04080D_90%)]" />
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#8A2BE2]" />
                  <span className="text-[11px] font-mono tracking-widest text-[#8DEBFF] uppercase">
                    PODIUM // 5 RANKS
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8A2BE2]/20 text-[#A78BFA] border border-[#8A2BE2]/40">
                  AWARDS
                </span>
              </div>

              <div className="flex flex-col items-center justify-center my-auto py-2 text-center">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-3">
                  {["#01", "#02", "#03", "#04", "#05"].map((rank, i) => (
                    <span
                      key={rank}
                      className={`px-2 py-1 rounded-md text-[11px] sm:text-xs font-mono font-bold border ${i === 0
                          ? "bg-[#00C8E8]/20 border-[#00C8E8] text-[#8DEBFF] shadow-[0_0_12px_rgba(0,200,232,0.3)]"
                          : i === 1
                            ? "bg-[#8A2BE2]/20 border-[#8A2BE2] text-[#DDD6FE]"
                            : "bg-white/5 border-white/10 text-white/70"
                        }`}
                    >
                      {rank}
                    </span>
                  ))}
                </div>
                <h3 className="font-['Space_Grotesk'] font-bold text-2xl sm:text-3xl text-[#F3F8FA] tracking-tight uppercase mb-1">
                  {EVENT_DETAILS.competitionHighlight}
                </h3>
                <p className="text-xs sm:text-sm text-[#00C8E8] font-mono mb-2 uppercase tracking-wider font-bold">
                  {EVENT_DETAILS.prizePool} Total Prize Pool
                </p>
                <p className="text-xs text-[#A4B6BF] font-['Inter',sans-serif] leading-relaxed max-w-xs sm:max-w-sm line-clamp-2">
                  Five distinct podium placements rewarding standout technological engineering, viable product design, and pitch execution.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#8DEBFF]">
                <span>HONORS // {EVENT_DETAILS.prizePool} PRIZE POOL</span>
                <span className="text-[#A4B6BF]">RIGOROUS JURY</span>
              </div>
            </div>

            {/* ---------------- CARD 3: 12–13 DECEMBER 2026 (Launch Window) ---------------- */}
            <div
              ref={(el) => {
                cardRefs.current[3] = el;
              }}
              onClick={() => goToCard(3)}
              className="coverflow-3d-card group w-[86vw] max-w-[340px] sm:max-w-[440px] md:max-w-[480px] h-[340px] sm:h-[380px] p-5 sm:p-7 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Thematic Stargate Timeline Background Image */}
              <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden -z-10 pointer-events-none">
                <img
                  src="/assets/cards/coverflow-dates.webp"
                  alt="Launch Window Stargate"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center opacity-45 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04080D] via-[#07131C]/75 to-[#07131C]/50" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#04080D_90%)]" />
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#00C8E8]" />
                  <span className="text-[11px] font-mono tracking-widest text-[#8DEBFF] uppercase">
                    TIMELINE // 2-DAY SPRINT
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00C8E8]/10 text-[#00C8E8] border border-[#00C8E8]/30">
                  DECEMBER 2026
                </span>
              </div>

              <div className="flex flex-col items-center justify-center my-auto py-2 text-center w-full">
                <h3 className="font-['Space_Grotesk'] font-bold text-2xl sm:text-3xl md:text-4xl text-[#F3F8FA] tracking-tight uppercase mb-3">
                  {EVENT_DETAILS.dates}
                </h3>

                {/* Dual Day Timeline Chips */}
                <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-left">
                    <div className="text-[10px] font-mono text-[#00C8E8] font-bold mb-0.5">DAY 01 // 12 DEC</div>
                    <div className="text-xs font-semibold text-[#F3F8FA]">Sprint Launch</div>
                    <div className="text-[10px] text-[#A4B6BF] mt-0.5">Kickoff & Architecture</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-left">
                    <div className="text-[10px] font-mono text-[#8A2BE2] font-bold mb-0.5">DAY 02 // 13 DEC</div>
                    <div className="text-xs font-semibold text-[#F3F8FA]">Grand Finale</div>
                    <div className="text-[10px] text-[#A4B6BF] mt-0.5">Demos & Valedictory</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#8DEBFF]">
                <span>WEEKEND // SAT & SUN</span>
                <span className="text-[#A4B6BF]">48H IMMERSION</span>
              </div>
            </div>

            {/* ---------------- CARD 4: JCET, HUBBALLI (Ground Station Venue) ---------------- */}
            <div
              ref={(el) => {
                cardRefs.current[4] = el;
              }}
              onClick={() => goToCard(4)}
              className="coverflow-3d-card group w-[86vw] max-w-[340px] sm:max-w-[440px] md:max-w-[480px] h-[340px] sm:h-[380px] p-5 sm:p-7 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Thematic Planetary Orbital Ground Station Background Image */}
              <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden -z-10 pointer-events-none">
                <img
                  src="/assets/cards/coverflow-venue.webp"
                  alt="JCET Hubballi Ground Station"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center opacity-45 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04080D] via-[#07131C]/75 to-[#07131C]/50" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#04080D_90%)]" />
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00C8E8]" />
                  <span className="text-[11px] font-mono tracking-widest text-[#8DEBFF] uppercase">
                    GROUND STATION // VENUE
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00C8E8]/10 text-[#00C8E8] border border-[#00C8E8]/30">
                  HUBBALLI
                </span>
              </div>

              <div className="flex flex-col items-center justify-center my-auto py-2 text-center w-full">
                <div className="relative mb-2">
                  <div className="w-12 h-12 rounded-full bg-[#00C8E8]/15 border border-[#00C8E8]/40 flex items-center justify-center text-[#8DEBFF]">
                    <MapPin className="w-6 h-6 text-[#00C8E8]" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#00C8E8] animate-ping" />
                </div>

                <h3 className="font-['Space_Grotesk'] font-bold text-xl sm:text-2xl text-[#F3F8FA] tracking-tight uppercase mb-1">
                  {EVENT_DETAILS.venue}
                </h3>
                <p className="text-[11px] text-[#A4B6BF] max-w-xs leading-relaxed mb-3">
                  {EVENT_DETAILS.address}
                </p>

                {/* Interactive Copy Address Button */}
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#00C8E8]/15 border border-white/15 hover:border-[#00C8E8]/40 text-xs font-mono text-[#8DEBFF] transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#00C8E8]" />
                      <span>Copy Full Address</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#8DEBFF]">
                <span>COORDS // 15.3647° N, 75.1240° E</span>
                <span className="text-[#A4B6BF]">KARNATAKA</span>
              </div>
            </div>

            {/* ---------------- CARD 5: ENTRY FEE ₹2,000 (Team All-Inclusive Pass) ---------------- */}
            <div
              ref={(el) => {
                cardRefs.current[5] = el;
              }}
              onClick={() => goToCard(5)}
              className="coverflow-3d-card group w-[86vw] max-w-[340px] sm:max-w-[440px] md:max-w-[480px] h-[340px] sm:h-[380px] p-5 sm:p-7 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Thematic Cosmic Aurora Access Pass Background Image */}
              <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden -z-10 pointer-events-none">
                <img
                  src="/assets/cards/coverflow-pass.webp"
                  alt="Team Access Aurora"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center opacity-45 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04080D] via-[#07131C]/75 to-[#07131C]/50" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#04080D_90%)]" />
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#00C8E8]" />
                  <span className="text-[11px] font-mono tracking-widest text-[#8DEBFF] uppercase">
                    REGISTRATION // ACCESS PASS
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  TEAM PASS
                </span>
              </div>

              <div className="flex flex-col items-center justify-center my-auto py-2 text-center w-full">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-['Space_Grotesk'] font-black text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#00C8E8] via-[#8DEBFF] to-[#8A2BE2] drop-shadow-[0_0_25px_rgba(0,200,232,0.35)]">
                    {EVENT_DETAILS.registrationFeeAmount}
                  </span>
                  <span className="font-mono text-sm sm:text-base text-[#00C8E8] font-bold">
                    / TEAM
                  </span>
                </div>
                <p className="text-xs text-[#A4B6BF] mb-3">Flat fee for up to 4 innovators</p>

                {/* Perks Grid */}
                <div className="grid grid-cols-2 gap-2 text-left w-full max-w-xs text-[11px] text-[#F3F8FA]/90">
                  <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/5">
                    <Zap className="w-3.5 h-3.5 text-[#00C8E8] shrink-0" />
                    <span>24H Meals & Fuel</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/5">
                    <Sparkles className="w-3.5 h-3.5 text-[#8A2BE2] shrink-0" />
                    <span>Mentorship & Swag</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/5">
                    <Clock className="w-3.5 h-3.5 text-[#00C8E8] shrink-0" />
                    <span>Gigabit Fiber WiFi</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/5">
                    <Award className="w-3.5 h-3.5 text-[#8A2BE2] shrink-0" />
                    <span>Official Certificates</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#8DEBFF]">
                <span>PASS // ALL-INCLUSIVE</span>
                <span className="text-emerald-400">NO HIDDEN CHARGES</span>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------------
              BOTTOM: NAVIGATION HUD, DOTS & SCROLL CUE
              Matches reference video with glowing active indicators & counter
              ----------------------------------------------------------------------- */}
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-2 sm:gap-3 z-10 pb-1 sm:pb-2">
            {/* Controls Bar */}
            <div className="flex items-center justify-between w-full px-4 sm:px-8">
              {/* Prev Chevron */}
              <button
                onClick={() => goToCard(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous card"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#07131C]/70 backdrop-blur-md border border-[#00C8E8]/30 hover:border-[#00C8E8] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-[#8DEBFF] hover:text-white transition-all shadow-[0_0_15px_rgba(0,200,232,0.15)]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {[0, 1, 2, 3, 4, 5].map((idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => goToCard(idx)}
                      aria-label={`Go to card ${idx + 1}`}
                      className={`transition-all duration-300 ${isActive
                          ? "w-7 sm:w-8 h-2 sm:h-2.5 rounded-full bg-gradient-to-r from-[#00C8E8] to-[#8A2BE2] shadow-[0_0_12px_rgba(0,200,232,0.6)]"
                          : "w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white/20 hover:bg-white/40"
                        }`}
                    />
                  );
                })}
              </div>

              {/* Next Chevron */}
              <button
                onClick={() => goToCard(activeIndex + 1)}
                disabled={activeIndex === totalCards - 1}
                aria-label="Next card"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#07131C]/70 backdrop-blur-md border border-[#00C8E8]/30 hover:border-[#00C8E8] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-[#8DEBFF] hover:text-white transition-all shadow-[0_0_15px_rgba(0,200,232,0.15)]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Micro Telemetry Cue */}
            <div className="flex items-center justify-between w-full px-6 sm:px-10 text-[10px] sm:text-xs font-mono text-[#A4B6BF]/70">
              <span>[ 0{activeIndex + 1} // 06 ]</span>
              <span className="hidden sm:inline-block tracking-wider uppercase">
                SCROLL DOWN TO ADVANCE CARDS • DRAG OR TAP TO NAVIGATE
              </span>
              <span className="sm:hidden tracking-wider uppercase">
                SWIPE TO BROWSE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

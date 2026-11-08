import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Calendar, MapPin, Play } from "lucide-react";
import { EVENT_DETAILS } from "../data/eventData";
import FocusText from "./ui/focus-text";
import NorrisHeadline from "./ui/norris-headline";

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export default function HeroSection({ onOpenRegister }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  // Interaction & motion states
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, active: false });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Check device capabilities and motion preferences
  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsTouchDevice(touch);
    setPrefersReducedMotion(reducedMotion);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  // Handle video autoplay and fallback detection
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setAutoplayBlocked(false);
        })
        .catch(() => {
          setAutoplayBlocked(true);
        });
    }
  }, []);

  // Mouse move handler for restrained parallax & subtle cursor lighting on desktop
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isTouchDevice || prefersReducedMotion) return;
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates from -1 to 1
      const normX = (clientX - rect.width / 2) / (rect.width / 2);
      const normY = (clientY - rect.height / 2) / (rect.height / 2);

      // Restrained parallax: ±5px horizontal, ±3px vertical
      setParallax({
        x: Math.max(-5, Math.min(5, normX * 5)),
        y: Math.max(-3, Math.min(3, normY * 3)),
      });

      setCursorPos({
        x: clientX,
        y: clientY,
        active: true,
      });
    },
    [isTouchDevice, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
    setCursorPos((prev) => ({ ...prev, active: false }));
  }, []);

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setAutoplayBlocked(false));
    }
  };

  const handleScrollToOverview = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const overviewSection = document.querySelector("#overview");
    if (overviewSection) {
      overviewSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      data-zero-gravity-exclude="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 w-full flex flex-col lg:min-h-screen lg:flex-row lg:items-center overflow-hidden bg-[#050708] select-none pt-16 lg:pt-0"
    >
      {/* =========================================================================
          ASTRONAUT VISUAL (MOBILE UPPER AREA) & DESKTOP CINEMATIC BACKGROUND
          ========================================================================= */}
      <div className="relative w-full h-[270px] xs:h-[300px] sm:h-[340px] lg:absolute lg:inset-0 lg:w-full lg:h-full lg:max-h-none overflow-hidden pointer-events-none z-0">
        {/* Poster Image for zero layout-shift */}
        <img
          src="/videos/hero-poster.jpg"
          alt="HackIgnite Astronaut in Deep Space"
          className={`hero-media-cover absolute inset-0 w-full h-full transition-opacity duration-500 ease-out ${isVideoLoaded ? "opacity-0" : "opacity-100"
            }`}
          loading="eager"
          decoding="async"
        />

        {/* Real-Time Seamless 4.88s Crossfaded Loop Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-poster.jpg"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
          aria-hidden="true"
          className="hero-media-cover w-full h-full"
          style={{
            transform:
              !prefersReducedMotion && !isTouchDevice
                ? `translate3d(${-parallax.x * 0.35}px, ${-parallax.y * 0.25}px, 0) scale(1.02)`
                : "none",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <source src="/videos/hackignite-hero-loop.mp4" type="video/mp4" />
        </video>

        {/* Desktop directional overlay: dark on left for text readability, clear on right for astronaut */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#050708] via-[#050708]/85 to-transparent via-50% z-10" />

        {/* Mobile bottom gradient: smooth gradual dissolve into content background below */}
        <div className="lg:hidden absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#050708] via-[#050708]/80 to-transparent z-10" />

        {/* Top subtle shadow under header */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#050708]/80 to-transparent z-10" />

        {/* Desktop bottom section transition gradient */}
        <div className="hidden lg:block absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#050708] to-transparent z-10" />

        {/* Subtle cyan ambient atmospheric glow behind astronaut */}
        <div className="absolute right-4 sm:right-10 top-1/4 w-60 sm:w-96 h-60 sm:h-96 bg-gradient-to-br from-[#00C8E8]/10 via-[#19D8E8]/05 to-transparent rounded-full blur-[90px] pointer-events-none z-10" />
      </div>

      {/* Desktop Cursor-Reactive Subtle Glow (fine pointer only) */}
      {cursorPos.active && !isTouchDevice && !prefersReducedMotion && (
        <div
          className="hidden lg:block absolute pointer-events-none transition-opacity duration-300 z-10"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            width: "500px",
            height: "500px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(0, 200, 232, 0.08) 0%, rgba(9, 35, 43, 0.02) 50%, transparent 70%)",
          }}
        />
      )}

      {/* =========================================================================
          HERO CONTENT CONTAINER
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-3 pb-12 sm:pt-4 sm:pb-16 lg:py-24 flex items-center">
        <div
          className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl text-left"
          style={{
            transform:
              !prefersReducedMotion && !isTouchDevice
                ? `translate3d(${parallax.x}px, ${parallax.y}px, 0)`
                : "none",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Eyebrow Label: NATIONAL LEVEL HACKATHON · 2026 */}
          <div className="hero-animate-1 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07131C]/85 backdrop-blur-md border border-[#00C8E8]/30 text-[11px] sm:text-xs font-mono tracking-wider text-[#8DEBFF] mb-2.5 sm:mb-3 shadow-[0_0_16px_rgba(0,200,232,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8] animate-pulse" />
            <span className="font-bold tracking-widest text-[#F3F8FA]">
              NATIONAL LEVEL HACKATHON
            </span>
            <span className="text-[#00C8E8]/40">·</span>
            <span className="tracking-widest text-[#8DEBFF]">
              2026
            </span>
          </div>

          {/* Main Heading: THE FUTURE ISN'T BUILT. IT'S INVENTED. */}
          <h1 className="hero-animate-2 font-['Space_Grotesk'] font-bold text-[31px] xs:text-[33px] sm:text-[38px] lg:text-6xl xl:text-[4.75rem] tracking-tight text-[#F3F8FA] uppercase leading-[1.12] lg:leading-[1.08] mb-3 sm:mb-4 lg:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            <NorrisHeadline as="span">THE FUTURE ISN'T BUILT.</NorrisHeadline>
            <br />
            <FocusText text="IT'S INVENTED." className="mt-1" />
          </h1>

          {/* Supporting Description: A 24-hour innovation challenge to solve real-world problems through technology. */}
          <p className="hero-animate-3 text-sm sm:text-base lg:text-lg text-[#A4B6BF] font-normal leading-relaxed max-w-xl mb-5 sm:mb-6 lg:mb-8 font-['Inter',sans-serif]">
            A 24-hour innovation challenge to solve real-world problems through technology.
          </p>

          {/* Event Dates & Venue: 12–13 DECEMBER 2026 • JCET, HUBBALLI */}
          <div className="hero-animate-4 flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-5 text-xs sm:text-sm text-[#A4B6BF] font-mono mb-6 sm:mb-7 lg:mb-9">
            <div className="flex items-center gap-2 shrink-0">
              <Calendar className="w-4 h-4 text-[#00C8E8] shrink-0" />
              <span className="text-[#F3F8FA] font-semibold tracking-wide uppercase">
                {EVENT_DETAILS.dates.toUpperCase()}
              </span>
            </div>
            <span className="text-white/20 hidden xs:inline">•</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#19D8E8] shrink-0" />
              <span className="text-[#A4B6BF] tracking-wide uppercase whitespace-normal">
                {EVENT_DETAILS.shortVenue}
              </span>
            </div>
          </div>

          {/* Call-to-Action Buttons: REGISTER YOUR TEAM & EXPLORE THE EVENT */}
          <div className="hero-animate-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Primary CTA */}
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto h-[50px] sm:h-[52px] px-8 text-xs sm:text-sm font-bold font-['Space_Grotesk'] uppercase tracking-wider text-[#050708] bg-gradient-to-r from-[#00C8E8] via-[#19D8E8] to-[#00C8E8] bg-[length:200%_auto] hover:bg-[position:right_center] rounded-xl sm:rounded-full cyan-btn-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>REGISTER YOUR TEAM</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary CTA */}
            <a
              href="#overview"
              onClick={handleScrollToOverview}
              className="w-full sm:w-auto h-[46px] sm:h-[52px] px-7 sm:px-8 text-xs sm:text-sm font-semibold font-['Space_Grotesk'] tracking-wider text-[#F3F8FA] border border-[#00C8E8]/30 bg-[#07131C]/50 hover:bg-[#07131C]/80 rounded-xl sm:rounded-full hover:border-[#00C8E8] hover:text-[#8DEBFF] transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              EXPLORE THE EVENT
            </a>
          </div>
        </div>
      </div>

      {/* Autoplay Fallback Trigger */}
      {autoplayBlocked && (
        <button
          onClick={handleManualPlay}
          className="absolute bottom-4 right-4 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07131C]/90 backdrop-blur-md border border-[#00C8E8]/40 text-xs font-mono text-[#8DEBFF] hover:bg-[#09232B] hover:text-white transition-all shadow-[0_0_15px_rgba(0,200,232,0.25)] cursor-pointer"
          aria-label="Play background cinematic video"
        >
          <Play className="w-3.5 h-3.5 text-[#00C8E8] fill-[#00C8E8]" />
          <span>PLAY CINEMATIC</span>
        </button>
      )}
    </section>
  );
}

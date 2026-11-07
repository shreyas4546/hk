import React, { useState } from "react";
import { ArrowRight, Calendar, MapPin, Sparkles, Trophy } from "lucide-react";
import { EVENT_DETAILS } from "../data/eventData";
import AstronautCanvas from "./AstronautCanvas";

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export default function HeroSection({ onOpenRegister }: HeroSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Background Radial Blue Nebulae */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[850px] h-[450px] bg-gradient-to-b from-[#20CFFF]/15 via-[#168BFF]/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-[#168BFF]/15 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 -right-32 w-72 sm:w-96 h-72 sm:h-96 bg-[#20CFFF]/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Margins: Futuristic Numerical Step Markers (01, 02) */}
      <div className="hidden lg:flex flex-col items-center gap-6 absolute right-6 xl:right-10 top-1/3 text-xs font-mono tracking-widest text-[#9AAFC1]/60">
        <span className="text-[#8DEBFF] font-bold">01</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#20CFFF] to-transparent" />
        <span>02</span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col items-center text-center">
        {/* Top Kicker / Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full cosmic-glass border border-[#20CFFF]/30 text-[11px] sm:text-xs md:text-sm font-medium text-[#8DEBFF] mb-4 sm:mb-6 shadow-[0_0_20px_rgba(32,207,255,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#20CFFF] shrink-0" />
          <span>A National Level 24-Hour Hackathon</span>
          <span className="text-white/40">·</span>
          <span className="text-white/80">Season 1.0</span>
        </div>

        {/* Massive Futuristic Display Title with Styled Tech Split */}
        <div className="relative mb-2 sm:mb-3 w-full">
          <h1 className="font-display font-black text-[clamp(2.2rem,7.5vw,6.5rem)] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F5FAFF] to-[#8DEBFF] uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] leading-[1.05]">
            HACK<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20CFFF] to-[#168BFF]">IGNITE</span>
          </h1>
          {/* Subtle horizontal laser tech line across the title */}
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#20CFFF]/40 to-transparent pointer-events-none" />
        </div>

        {/* Tagline */}
        <p className="font-display text-[clamp(0.95rem,2.8vw,1.75rem)] font-bold tracking-[0.18em] sm:tracking-[0.2em] text-[#8DEBFF] uppercase mb-4 sm:mb-5 cyan-glow">
          {EVENT_DETAILS.tagline}
        </p>

        {/* Event Quick-Meta Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#9AAFC1] mb-6 sm:mb-8 font-medium max-w-2xl px-2">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#20CFFF]" />
            <span>{EVENT_DETAILS.dates}</span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 text-center">
            <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#20CFFF] shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-none">{EVENT_DETAILS.venue}</span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Trophy className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#20CFFF]" />
            <span className="text-white font-semibold">{EVENT_DETAILS.prizePool}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 z-20 mb-6 sm:mb-8 w-full px-4">
          <button
            onClick={onOpenRegister}
            className="group w-full sm:w-auto px-7 sm:px-8 py-3.5 min-h-[44px] text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#168BFF] via-[#20CFFF] to-[#168BFF] bg-[length:200%_auto] hover:bg-[position:right_center] rounded-full cyan-btn-glow transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#tracks"
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 min-h-[44px] text-sm sm:text-base font-semibold text-[#F5FAFF] cosmic-glass rounded-full hover:border-[#20CFFF]/60 hover:text-[#8DEBFF] transition-all duration-300 hover:scale-105 flex items-center justify-center"
          >
            EXPLORE TRACKS
          </a>
        </div>

        {/* Centerpiece: Real-time 3D Astronaut Canvas & Atmospheric Curved Earth Horizon */}
        <div className="relative w-full max-w-4xl mx-auto h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] flex items-center justify-center">
          {/* Floating Left Hologram HUD card matching reference */}
          <div className="absolute left-2 sm:left-4 top-2 sm:top-6 z-20 max-w-[180px] sm:max-w-[220px] p-3 rounded-xl cosmic-glass border border-[#20CFFF]/30 text-left shadow-[0_8px_30px_rgba(0,0,0,0.6)] hidden md:block">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono text-[#20CFFF] uppercase tracking-wider">#1 Arena</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#20CFFF]" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white mb-1">National Innovation</h4>
            <p className="text-[11px] text-[#9AAFC1] leading-relaxed">
              Real-time interactive 3D space telemetry. 24-hour sprint in AI, Web3, and defense.
            </p>
          </div>

          {/* Genuine Real-Time 3D Astronaut Three.js Scene */}
          <div className="relative z-10 w-full h-full max-w-lg mx-auto">
            <AstronautCanvas />
          </div>

          {/* Curved Glowing Blue Planet Horizon at bottom */}
          <div className="absolute -bottom-20 sm:-bottom-28 left-1/2 -translate-x-1/2 w-[160%] max-w-[1200px] h-[200px] sm:h-[280px] pointer-events-none z-0">
            {/* Luminous Curved Horizon Line */}
            <div className="w-full h-full rounded-[50%] bg-gradient-to-t from-[#07111D] via-[#0A1724]/90 to-transparent border-t-2 border-[#20CFFF] shadow-[0_-15px_60px_rgba(32,207,255,0.5),0_-30px_120px_rgba(22,139,255,0.35)] relative overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#20CFFF]/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";

interface HackIgniteLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function HackIgniteLogo({
  size = "md",
  showText = true,
  className = "",
}: HackIgniteLogoProps) {
  // Dimension mappings
  const dimensions = {
    sm: {
      box: "w-8 h-8",
      img: "w-6 h-6",
      text: "text-sm sm:text-base",
      badge: "text-[9px]",
    },
    md: {
      box: "w-9 h-9 sm:w-10 sm:h-10",
      img: "w-7 h-7 sm:w-8 sm:h-8",
      text: "text-base sm:text-lg lg:text-xl",
      badge: "text-[10px] sm:text-xs",
    },
    lg: {
      box: "w-12 h-12 sm:w-14 sm:h-14",
      img: "w-9 h-9 sm:w-11 sm:h-11",
      text: "text-xl sm:text-2xl",
      badge: "text-xs",
    },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 group whitespace-nowrap shrink-0 ${className}`}>
      {/* Living Cyber Emblem Container */}
      <div className={`relative ${dimensions.box} flex items-center justify-center shrink-0`}>
        {/* 1. Ambient Breathing Energy Aura (Living Glow) */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#00C8E8] via-[#19D8E8] to-[#8DEBFF] logo-aura-alive pointer-events-none" />

        {/* 2. Rotating Cyber Orbit Ring / Energy Flare */}
        <div className="absolute -inset-[2px] rounded-xl overflow-hidden pointer-events-none">
          <div className="w-full h-full rounded-xl bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(0,200,232,0.9)_340deg,#FFFFFF_360deg)] logo-orbit-alive opacity-75 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* 3. Outer Squircle Glass Shield */}
        <div className="relative w-full h-full rounded-xl bg-[#04090F]/90 border border-[#00C8E8]/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(0,200,232,0.35)] group-hover:shadow-[0_0_25px_rgba(0,200,232,0.7)] group-hover:border-[#00C8E8] transition-all duration-300">
          {/* 4. Alive High-Res Fiery 'H' Emblem */}
          <picture className="flex items-center justify-center">
            <source srcSet="/assets/logo/hackignite-emblem.webp" type="image/webp" />
            <img
              src="/assets/logo/hackignite-emblem.png"
              alt="HackIgnite 1.0 Living Emblem"
              className={`${dimensions.img} object-contain logo-flame-alive transition-transform duration-300 group-hover:scale-110`}
              loading="eager"
            />
          </picture>
        </div>
      </div>

      {/* Brand Typography (if enabled) */}
      {showText && (
        <div className="flex items-baseline gap-1.5 select-none">
          <span className={`font-['Space_Grotesk'] font-bold ${dimensions.text} tracking-tight text-[#F3F8FA] group-hover:text-white transition-colors`}>
            HACK<span className="text-[#00C8E8] group-hover:text-[#8DEBFF] transition-colors">IGNITE</span>
          </span>
          <span className={`${dimensions.badge} font-mono font-semibold text-[#8DEBFF]/90 tracking-wider bg-[#00C8E8]/10 px-1.5 py-0.5 rounded border border-[#00C8E8]/30 shadow-[0_0_8px_rgba(0,200,232,0.2)]`}>
            1.0
          </span>
        </div>
      )}
    </div>
  );
}

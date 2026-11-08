import React, { useMemo } from "react";
import {
  Calendar,
  MapPin,
  CreditCard,
  User,
  Phone,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (id === "#about") {
      const fallback = document.querySelector("#overview");
      if (fallback) fallback.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 128 Bubbles exactly as in the original reference Codepen:
  // - for (var i = 0; i < 128; i++)
  // style=`--size:${2+Math.random()*4}rem; --distance:${6+Math.random()*4}rem; --position:${-5+Math.random()*110}%; --time:${2+Math.random()*2}s; --delay:${-1*(2+Math.random()*2)}s;`
  // PROTECTED WAVE/BLOB EFFECT IMPLEMENTATION - UNTOUCHED
  const bubbles = useMemo(() => {
    return Array.from({ length: 128 }, () => ({
      size: `${2 + Math.random() * 4}rem`,
      distance: `${6 + Math.random() * 4}rem`,
      position: `${-5 + Math.random() * 110}%`,
      time: `${2 + Math.random() * 2}s`,
      delay: `${-1 * (2 + Math.random() * 2)}s`,
    }));
  }, []);

  return (
    <footer className="blob-footer">
      {/* SVG Gooey Filter for Liquid Metaball Physics (PROTECTED - UNTOUCHED) */}
      <svg
        style={{ position: "fixed", top: "100vh", pointerEvents: "none", width: 0, height: 0, opacity: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="blob"
            />
          </filter>
        </defs>
      </svg>

      {/* Bubbles Layer for Liquid Wave Upper Boundary (PROTECTED - UNTOUCHED) */}
      <div className="bubbles">
        {bubbles.map((b, i) => (
          <div
            key={i}
            className="bubble"
            style={
              {
                "--size": b.size,
                "--distance": b.distance,
                "--position": b.position,
                "--time": b.time,
                "--delay": b.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Balanced, Connected & Refined Footer Content */}
      <div className="content relative pt-4 pb-4 sm:pt-5 sm:pb-5 px-4 sm:px-6 lg:px-8 text-[#04080D]">
        {/* Subtle Atmospheric Top Highlight for Refined Visual Depth */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-3.5 sm:space-y-4">
          {/* Main 3-Column Content Layout with Balanced Proportions & Subtle Vertical Separators */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* COLUMN 1 — HACKIGNITE IDENTITY (Desktop: 4 cols | Mobile: Order 1) */}
            <div className="md:col-span-5 lg:col-span-4 space-y-2 md:border-r border-[#04080D]/12 md:pr-6">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-lg bg-[#04080D] flex items-center justify-center p-1 shadow-sm shrink-0 border border-[#04080D]/20 overflow-hidden">
                  <picture>
                    <source srcSet="/assets/logo/hackignite-emblem.webp" type="image/webp" />
                    <img
                      src="/assets/logo/hackignite-emblem.png"
                      alt="HackIgnite 1.0"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <div>
                  <span className="font-['Space_Grotesk'] font-bold text-base sm:text-lg text-[#04080D] tracking-tight block leading-tight">
                    HACKIGNITE 1.0
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-[#04080D]/85 block leading-tight">
                    24-Hour Innovation Challenge
                  </span>
                </div>
              </div>

              <p className="text-xs font-['Inter',sans-serif] text-[#04080D]/90 font-medium leading-relaxed max-w-sm">
                Think. Build. Innovate. Impact.
              </p>

              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#04080D]/10 text-[9.5px] font-mono font-bold text-[#04080D] tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#04080D]" />
                <span>National Level Hackathon</span>
              </div>
            </div>

            {/* COLUMN 2 — QUICK NAVIGATION (Desktop: 3 cols | Mobile: Order 2) */}
            <div className="md:col-span-3 lg:col-span-3 space-y-2 md:border-r border-[#04080D]/12 md:pr-4">
              <div className="text-[10.5px] font-mono font-bold tracking-wider text-[#04080D] uppercase flex items-center gap-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#04080D]" />
                <span>Quick Navigation</span>
              </div>

              {/* Mobile: 2-column compact grid | Desktop: Clean vertical stack */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
                {[
                  { label: "About the Event", href: "#overview" },
                  { label: "Tracks & Rules", href: "#tracks-rules" },
                  { label: "Event Schedule", href: "#schedule" },
                  { label: "FAQs", href: "#faq" },
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="group inline-flex items-center gap-1 text-xs font-medium text-[#04080D]/90 hover:text-white transition-all py-0.5 px-1 -ml-1 rounded hover:bg-[#04080D]/10 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#04080D]/60 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span className="font-['Inter',sans-serif]">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* COLUMN 3 — EVENT INFORMATION (Desktop: 5 cols | Mobile: Order 3) */}
            <div className="md:col-span-4 lg:col-span-5 space-y-2">
              <div className="text-[10.5px] font-mono font-bold tracking-wider text-[#04080D] uppercase flex items-center gap-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#04080D]" />
                <span>Event Information</span>
              </div>

              <div className="space-y-1.5 text-xs text-[#04080D]/90 font-['Inter',sans-serif]">
                <div className="flex items-start gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#04080D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold text-[#04080D]/70 block leading-tight">Date</span>
                    <span className="font-semibold text-[#04080D]">12–13 December 2026</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#04080D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold text-[#04080D]/70 block leading-tight">Venue</span>
                    <span className="font-semibold text-[#04080D] leading-tight block">
                      Jain College of Engineering and Technology, Hubballi
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-[#04080D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold text-[#04080D]/70 block leading-tight">Entry Fee</span>
                    <span className="font-semibold text-[#04080D]">₹2,000 per team</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <User className="w-3.5 h-3.5 text-[#04080D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold text-[#04080D]/70 block leading-tight">Coordinator & Contact</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-[#04080D]">Aditya R H</span>
                      <span className="text-[#04080D]/40">·</span>
                      <a
                        href="tel:+917022951232"
                        className="font-mono font-bold text-[#04080D] hover:text-white underline underline-offset-2 decoration-[#04080D]/40 transition-colors inline-flex items-center gap-1"
                        title="Call Coordinator Aditya R H"
                      >
                        <Phone className="w-3 h-3 inline" />
                        <span>+91 70229 51232</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* AREA D — BOTTOM FOOTER ROW */}
          <div className="pt-2.5 sm:pt-3 border-t border-[#04080D]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-3 text-[11px] sm:text-xs text-[#04080D]/90 sm:pr-64 lg:pr-72 pr-16">
            {/* Left / Mobile Order 5: Copyright */}
            <div className="font-medium text-[10.5px] sm:text-xs text-[#04080D]/80">
              © 2026 HackIgnite 1.0. All rights reserved.
            </div>

            {/* Right / Mobile Order 6: Developer Credit with LinkedIn (Guaranteed Completely Visible) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0.5 sm:gap-1.5 text-[10.5px] sm:text-xs font-['Inter',sans-serif] max-w-[210px] sm:max-w-none">
              <span className="text-[#04080D]/75">Website crafted by</span>
              <a
                href="https://www.linkedin.com/in/shreyas-ugargol-69a2762b6/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#04080D] hover:text-white underline underline-offset-2 decoration-[#04080D]/40 hover:decoration-white inline-flex items-center gap-1 transition-all group font-mono"
                title="Shreyas Ugargol LinkedIn Profile"
              >
                <span>SHREYAS UGARGOL</span>
                <svg
                  className="w-3.5 h-3.5 fill-current opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.54a1.64 1.64 0 0 0-1.66 1.64 1.66 1.66 0 0 0 1.66 1.66 1.64 1.64 0 0 0 1.64-1.66 1.64 1.64 0 0 0-1.64-1.64Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

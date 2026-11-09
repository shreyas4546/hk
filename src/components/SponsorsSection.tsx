import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Handshake, Sparkles, ExternalLink } from "lucide-react";
import NorrisHeadline from "./ui/norris-headline";

interface Sponsor {
  name: string;
  src: string;
  tag?: string;
  featured?: boolean;
}

const SPONSORS: Sponsor[] = [
  {
    name: "Unstop",
    src: "/assets/sponsors/unstop.svg",
    tag: "Platform Partner",
    featured: true,
  },
  {
    name: "Amazon Prime Video",
    src: "https://assets.codepen.io/191814/logo-prime-video.png",
    tag: "Streaming Partner",
  },
  {
    name: "BMW",
    src: "https://assets.codepen.io/191814/logo-BMW.png",
    tag: "Automotive Partner",
  },
  {
    name: "Coca-Cola",
    src: "https://assets.codepen.io/191814/logo-coca-cola+%281%29.png",
    tag: "Beverage Partner",
  },
  {
    name: "Warner Brothers",
    src: "https://assets.codepen.io/191814/logo-warner-brothers+%281%29.png",
    tag: "Entertainment",
  },
  {
    name: "NFL",
    src: "https://assets.codepen.io/191814/logo-nfl.png",
    tag: "Global Brand",
  },
  {
    name: "Greenleaf",
    src: "https://assets.codepen.io/191814/logo-geenleaf.png",
    tag: "Eco Partner",
  },
  {
    name: "Barry's",
    src: "https://assets.codepen.io/191814/logo-barrys.png",
    tag: "Fitness & Energy",
  },
  {
    name: "Louis Vuitton",
    src: "https://assets.codepen.io/191814/Louis-V.png",
    tag: "Luxury Design",
  },
  {
    name: "Los Angeles Ballet",
    src: "https://assets.codepen.io/191814/logo-la-ballet.png",
    tag: "Arts & Culture",
  },
];

export default function SponsorsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = containerRef.current?.querySelector(".logo-scroller-row") as HTMLElement | null;
    if (!row) return;

    let tl: gsap.core.Timeline | null = null;
    let observer: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      gsap.set(row, { xPercent: 0, force3D: true });

      tl = gsap.timeline({ repeat: -1, ease: "none" });
      tl.to(row, {
        xPercent: -50,
        duration: 28,
        ease: "none",
      });

      const onEnter = () => tl?.pause();
      const onLeave = () => tl?.resume();

      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
      row.addEventListener("touchstart", onEnter, { passive: true });
      row.addEventListener("touchend", onLeave, { passive: true });

      // Pause ticker when offscreen to save main-thread and GPU cycles on mobile
      if (containerRef.current && typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                tl?.play();
              } else {
                tl?.pause();
              }
            });
          },
          { rootMargin: "150px 0px 150px 0px", threshold: 0 }
        );
        observer.observe(containerRef.current);
      }
    }, containerRef);

    return () => {
      if (observer) observer.disconnect();
      ctx.revert();
    };
  }, []);

  // Duplicate items for gapless infinite marquee
  const scrollerItems = [...SPONSORS, ...SPONSORS];

  return (
    <section
      id="sponsors"
      className="relative w-full min-w-0 max-w-7xl mx-auto pt-14 sm:pt-20 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[550px] h-[280px] bg-gradient-to-r from-[#00C8E8]/08 via-[#19D8E8]/05 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center w-full max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07131C]/85 border border-[#00C8E8]/30 text-xs font-mono text-[#8DEBFF] mb-3 shadow-[0_0_15px_rgba(0,200,232,0.15)]">
          <Handshake className="w-3.5 h-3.5 text-[#00C8E8]" />
          <span>INNOVATION NETWORK // PARTNERS</span>
        </div>

        <NorrisHeadline className="font-['Space_Grotesk'] font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-[#F3F8FA] mb-3 uppercase tracking-tight">
          OFFICIAL <br className="sm:hidden" />
          <span className="cyan-turquoise-text">SPONSORS & PARTNERS</span>
        </NorrisHeadline>

        <p className="text-xs xs:text-sm sm:text-base text-[#A4B6BF] font-['Inter',sans-serif] leading-relaxed max-w-2xl mx-auto">
          Proudly supported by visionary platforms, industry leaders, and innovation ecosystems empowering HackIgnite 1.0.
        </p>

        {/* Featured Unstop Banner Badge */}
        <div className="mt-4 sm:mt-5 inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#07131C]/90 border border-[#00C8E8]/40 shadow-[0_0_20px_rgba(0,200,232,0.15)] max-w-full">
          <span className="w-2 h-2 rounded-full bg-[#00C8E8] animate-pulse shrink-0" />
          <span className="font-mono text-[11px] sm:text-xs text-[#8DEBFF] font-semibold truncate">
            OFFICIAL PLATFORM PARTNER: <span className="text-white font-bold">UNSTOP</span>
          </span>
        </div>
      </div>

      {/* Continuous Logo Scroller Marquee */}
      <div ref={containerRef} className="logo-scroller w-full min-w-0 max-w-full overflow-hidden">
        <div className="logo-scroller-content w-full min-w-0 max-w-full overflow-hidden">
          <div className="logo-scroller-items w-full min-w-0 max-w-full overflow-hidden" role="marquee">
            <div className="logo-scroller-row">
              {scrollerItems.map((sponsor, index) => (
                <div
                  key={`${sponsor.name}-${index}`}
                  className="logo-scroller-item group"
                >
                  <div
                    className={`flex flex-col items-center justify-center h-20 sm:h-24 md:h-28 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-2xl transition-all duration-300 backdrop-blur-md cursor-pointer ${sponsor.featured
                        ? "bg-[#07131C]/90 border border-[#00C8E8]/50 shadow-[0_0_25px_rgba(0,200,232,0.25)] hover:border-[#00C8E8] hover:scale-105"
                        : "bg-[#07131C]/50 hover:bg-[#07131C]/80 border border-white/10 hover:border-[#00C8E8]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105"
                      }`}
                  >
                    <span>
                      <img
                        src={sponsor.src}
                        alt={`${sponsor.name} Logo`}
                        loading="lazy"
                        decoding="async"
                        className={`h-8 sm:h-10 md:h-12 w-auto max-w-[110px] sm:max-w-[130px] md:max-w-[160px] object-contain transition-all duration-300 ${sponsor.featured
                            ? "brightness-125 filter drop-shadow-[0_0_8px_rgba(0,200,232,0.4)]"
                            : "filter grayscale opacity-80 brightness-150 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100"
                          }`}
                      />
                    </span>
                    {sponsor.tag && (
                      <span className="text-[9px] sm:text-[9.5px] font-mono text-[#8DEBFF]/75 group-hover:text-[#8DEBFF] mt-1 transition-colors uppercase tracking-wider">
                        {sponsor.tag}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


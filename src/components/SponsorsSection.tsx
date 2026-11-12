import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ExternalLink, ArrowUpRight, Handshake, Code2 } from "lucide-react";
import NorrisHeadline from "./ui/norris-headline";

interface Sponsor {
  id: string;
  name: string;
  tag: string;
  description: string;
  ctaText: string;
  url: string;
  ariaLabel: string;
  logoSrc: string;
  isLightLogo: boolean;
  accentBorder: string;
  isLocation?: boolean;
}

const SPONSORS: Sponsor[] = [
  {
    id: "unstop",
    name: "Unstop",
    tag: "Official Partner",
    description: "Official Challenge & Talent Engagement Platform",
    ctaText: "Visit Official Platform",
    url: "https://unstop.com/o/ozT1RUD?utm_medium=Share&utm_source=adityhan33581&utm_campaign=Online_coding_challenge",
    ariaLabel: "Visit Unstop official platform",
    logoSrc: "/assets/sponsors/unstop.svg",
    isLightLogo: true,
    accentBorder: "group-hover:border-[#00C8E8]",
  },
  {
    id: "developers-club",
    name: "Developers Club",
    tag: "Community Partner",
    description: "Official Student Developer Community · JCET Hubballi",
    ctaText: "Student Developer Community",
    url: "#sponsors",
    ariaLabel: "Developers Club JCET Hubballi",
    logoSrc: "/assets/sponsors/developers-club.png",
    isLightLogo: true,
    accentBorder: "group-hover:border-[#00C8E8]",
  },
  {
    id: "phoenix",
    name: "Phoenix Gaming Zone",
    tag: "Gaming & Venue Partner",
    description: "Premier Esports & Gaming Arena · Hubballi",
    ctaText: "View on Google Maps",
    url: "https://share.google/d6E4xHTe135BRFZS8",
    ariaLabel: "View Phoenix Gaming Zone location on Google Maps",
    logoSrc: "/assets/sponsors/phoenix-gaming-zone.jpg",
    isLightLogo: false,
    accentBorder: "group-hover:border-[#8DEBFF]",
    isLocation: true,
  },
];

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbsContainerRef = useRef<HTMLDivElement>(null);

  // Smooth Staggered Scroll Entrance
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const orbs = orbsContainerRef.current?.querySelectorAll(".sponsor-circle-orb");
    if (!orbs || orbs.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        orbs,
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: orbsContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative w-full min-w-0 max-w-5xl mx-auto pt-10 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 z-10 overflow-visible"
    >
      {/* Scoped CSS Keyframes for Continuous Living Loop Animation */}
      <style>{`
        @keyframes sponsorOrbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sponsorOrbitReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes sponsorFloat1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes sponsorFloat2 {
          0%, 100% { transform: translateY(-7px); }
          50% { transform: translateY(1px); }
        }
        @keyframes sponsorFloat3 {
          0%, 100% { transform: translateY(-3px); }
          50% { transform: translateY(6px); }
        }
        .sponsor-orb-float-1 {
          animation: sponsorFloat1 4.5s ease-in-out infinite;
          will-change: transform;
        }
        .sponsor-orb-float-2 {
          animation: sponsorFloat2 4.5s ease-in-out infinite;
          will-change: transform;
        }
        .sponsor-orb-float-3 {
          animation: sponsorFloat3 5.2s ease-in-out infinite;
          will-change: transform;
        }
        .sponsor-orbit-cw {
          animation: sponsorOrbitSpin 14s linear infinite;
          will-change: transform;
        }
        .sponsor-orbit-ccw {
          animation: sponsorOrbitReverse 20s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Atmospheric Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[480px] h-[240px] bg-gradient-to-r from-[#00C8E8]/10 via-[#19D8E8]/06 to-transparent blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Compact Section Header */}
      <div className="text-center w-full max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
        <NorrisHeadline className="font-['Space_Grotesk'] font-bold text-2xl xs:text-3xl sm:text-4xl text-[#F3F8FA] mb-2 uppercase tracking-tight">
          OFFICIAL <span className="cyan-turquoise-text">SPONSORS & PARTNERS</span>
        </NorrisHeadline>

        <p className="text-xs sm:text-sm text-[#A4B6BF] font-['Inter',sans-serif] leading-relaxed max-w-lg mx-auto">
          Hover to view details · Click to visit official destination
        </p>
      </div>

      {/* Living Circular Orbs — Clean, Alive, Compact */}
      <div
        ref={orbsContainerRef}
        className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-16 w-full pt-2 pb-6"
      >
        {SPONSORS.map((sponsor, idx) => {
          const isUnstop = sponsor.id === "unstop";
          const isPhoenix = sponsor.id === "phoenix";
          const isDevelopersClub = sponsor.id === "developers-club";

          const floatClass =
            idx === 0
              ? "sponsor-orb-float-1"
              : idx === 1
              ? "sponsor-orb-float-2"
              : "sponsor-orb-float-3";

          return (
            <div
              key={sponsor.id}
              className={`sponsor-circle-orb relative flex flex-col items-center ${floatClass}`}
            >
              {/* Entire Partner Node is a Direct Link */}
              <a
                href={sponsor.url}
                target={sponsor.url.startsWith("http") ? "_blank" : undefined}
                rel={sponsor.url.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={sponsor.ariaLabel}
                title={sponsor.ariaLabel}
                className="group relative flex flex-col items-center cursor-pointer text-center no-underline focus:outline-none"
              >
                {/* Circle Container */}
                <div className="relative flex items-center justify-center w-26 h-26 xs:w-28 xs:h-28 sm:w-32 sm:h-32 rounded-full transition-transform duration-300 group-hover:scale-105">
                  {/* Ambient Breathing Aura Glow */}
                  <div className="absolute inset-0 rounded-full blur-xl bg-[#00C8E8]/20 group-hover:bg-[#00C8E8]/40 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

                  {/* Outer Animated Orbital Tracer Ring */}
                  <div className="absolute -inset-2.5 sm:-inset-3 rounded-full border border-dashed border-[#00C8E8]/40 group-hover:border-[#00C8E8] opacity-70 group-hover:opacity-100 sponsor-orbit-cw transition-all duration-500 pointer-events-none" />

                  {/* Secondary Counter-Rotating Orbital Ring */}
                  <div className="absolute -inset-1 sm:-inset-1.5 rounded-full border border-dotted border-[#8DEBFF]/30 group-hover:border-[#8DEBFF]/70 opacity-40 group-hover:opacity-80 sponsor-orbit-ccw transition-all duration-500 pointer-events-none" />

                  {/* Circular Logo Disc */}
                  <div
                    className={`relative w-full h-full rounded-full flex items-center justify-center p-3.5 sm:p-4 transition-all duration-300 shadow-lg overflow-hidden border-2 border-white/20 ${
                      sponsor.accentBorder
                    } group-hover:shadow-[0_0_30px_rgba(0,200,232,0.4)] ${
                      sponsor.isLightLogo
                        ? "bg-white/95 group-hover:bg-white"
                        : "bg-black/95 group-hover:bg-black"
                    }`}
                  >
                    <img
                      src={sponsor.logoSrc}
                      alt={`${sponsor.name} Logo`}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 ${
                        isUnstop
                          ? "max-h-10 sm:max-h-12"
                          : isDevelopersClub
                          ? "max-h-20 sm:max-h-24 scale-110"
                          : "rounded-full"
                      }`}
                    />
                  </div>

                  {/* Floating Action Badge Icon */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#07131C] border border-[#00C8E8]/40 group-hover:border-[#00C8E8] group-hover:bg-[#00C8E8]/20 flex items-center justify-center text-[#8DEBFF] shadow-md transition-all duration-300 group-hover:scale-110">
                    {isDevelopersClub ? (
                      <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00C8E8]" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00C8E8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </div>
                </div>

                {/* Brand Name Pill */}
                <div className="mt-3.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-['Space_Grotesk'] font-bold text-[#F3F8FA] group-hover:text-[#8DEBFF] bg-[#07131C]/90 border border-white/10 group-hover:border-[#00C8E8]/50 shadow-[0_2px_12px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_15px_rgba(0,200,232,0.25)] transition-all flex items-center gap-1.5">
                  <span>{sponsor.name}</span>
                  {isPhoenix ? (
                    <MapPin className="w-3 h-3 text-[#00C8E8]" />
                  ) : isDevelopersClub ? (
                    <Code2 className="w-3 h-3 text-[#00C8E8]" />
                  ) : (
                    <ExternalLink className="w-3 h-3 text-[#00C8E8]" />
                  )}
                </div>

                {/* Floating Information Tooltip (Revealed on Hover) */}
                <div className="absolute top-[calc(100%+0.6rem)] left-1/2 -translate-x-1/2 w-60 sm:w-68 p-3 rounded-xl bg-gradient-to-b from-[#071722]/95 to-[#040C12]/98 border border-[#00C8E8]/40 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,200,232,0.25)] text-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-30">
                  <div className="inline-flex items-center gap-1 text-[10px] font-['Space_Grotesk'] font-bold uppercase tracking-wider text-[#00C8E8] bg-[#00C8E8]/10 px-2 py-0.5 rounded-full border border-[#00C8E8]/30 mb-1">
                    {isPhoenix ? (
                      <MapPin className="w-3 h-3 text-[#00C8E8]" />
                    ) : isDevelopersClub ? (
                      <Code2 className="w-3 h-3 text-[#00C8E8]" />
                    ) : (
                      <Handshake className="w-3 h-3 text-[#00C8E8]" />
                    )}
                    <span>{sponsor.tag}</span>
                  </div>

                  <p className="text-[11px] text-[#A4B6BF] font-['Inter',sans-serif] leading-tight mb-2">
                    {sponsor.description}
                  </p>

                  <div className="inline-flex items-center gap-1 text-[10px] font-['Space_Grotesk'] font-semibold text-[#8DEBFF]">
                    <span>
                      {isPhoenix
                        ? "Open Google Maps"
                        : isDevelopersClub
                        ? "JCET Community"
                        : "Visit Platform"}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#00C8E8]" />
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

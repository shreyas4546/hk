import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  MapPin,
  ExternalLink,
  GraduationCap,
  Building2,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { EVENT_DETAILS } from "../data/eventData";
import NorrisHeadline from "./ui/norris-headline";

interface Coordinator {
  name: string;
  role: string;
  phone: string;
  formattedPhone: string;
  isLead?: boolean;
  monogram: string;
}

const COORDINATORS: Coordinator[] = [
  {
    name: "Aditya R H",
    role: "Lead Coordinator",
    phone: "7022951232",
    formattedPhone: "+91 70229 51232",
    isLead: true,
    monogram: "AR",
  },
  {
    name: "Alvin Benedict",
    role: "Event Coordinator",
    phone: "7349190317",
    formattedPhone: "+91 73491 90317",
    isLead: false,
    monogram: "AB",
  },
  {
    name: "Pallavi",
    role: "Event Coordinator",
    phone: "7892127598",
    formattedPhone: "+91 78921 27598",
    isLead: false,
    monogram: "P",
  },
];

interface FacultyMember {
  name: string;
  role: string;
  department: string;
  monogram: string;
  icon: typeof GraduationCap;
}

const ACADEMIC_LEADERSHIP: FacultyMember[] = [
  {
    name: "Dr. Prashanth Bankar",
    role: "Principal",
    department: "JCET Hubballi",
    monogram: "PB",
    icon: Award,
  },
  {
    name: "Dr. Maheshkumar Patil",
    role: "CSE HoD",
    department: "Computer Science & Engineering",
    monogram: "MP",
    icon: GraduationCap,
  },
  {
    name: "Prof. Vishwanath J",
    role: "AI&ML HoD",
    department: "AI & Machine Learning",
    monogram: "VJ",
    icon: Sparkles,
  },
  {
    name: "Prof. Amruta N",
    role: "Faculty Coordinator",
    department: "JCET Hubballi",
    monogram: "AN",
    icon: ShieldCheck,
  },
];

export default function SponsorsOrganizers() {
  const sectionRef = useRef<HTMLElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rows = consoleRef.current?.querySelectorAll(".roster-row");
    if (!rows || rows.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows,
        {
          opacity: 0,
          y: 16,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: consoleRef.current,
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
      id="contact"
      className="relative scroll-mt-24 pt-10 sm:pt-16 pb-20 sm:pb-24 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 w-full"
    >
      {/* Living Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[620px] h-[320px] bg-gradient-to-r from-[#00C8E8]/10 via-[#19D8E8]/05 to-transparent blur-[130px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Simplified, Neutral Headline */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 px-2 flex flex-col items-center">
        <div className="w-full">
          <NorrisHeadline className="font-['Space_Grotesk'] font-bold text-2xl sm:text-3xl md:text-4xl text-[#F3F8FA] mb-2 uppercase tracking-tight">
            ORGANIZERS & <span className="cyan-turquoise-text">LEADERSHIP</span>
          </NorrisHeadline>
        </div>

        <p className="text-xs sm:text-sm text-[#A4B6BF] font-['Inter',sans-serif] leading-relaxed max-w-xl mx-auto px-1">
          Faculty leadership and event coordinators at Jain College of Engineering and Technology, Hubballi.
        </p>
      </div>

      {/* Unified Compact Glass Roster Console */}
      <div
        ref={consoleRef}
        className="relative w-full min-w-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#071722]/80 via-[#07131C]/90 to-[#040C12]/95 border border-[#00C8E8]/30 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.7)] overflow-hidden"
      >
        {/* Subtle Ambient Accent Border Beam */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C8E8]/60 to-transparent" />

        {/* Two-Column Balanced Grid: Coordinators (Left) | Academic Leadership (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08] w-full min-w-0">
          {/* =========================================================================
              COLUMN 1: EVENT COORDINATION TEAM (3 Coordinators)
              ========================================================================= */}
          <div className="p-3 sm:p-5 lg:p-7 flex flex-col justify-between w-full min-w-0">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-1.5 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-white/[0.06] w-full min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                  <span className="w-2 h-2 rounded-full bg-[#00C8E8] shadow-[0_0_8px_#00C8E8] shrink-0 animate-pulse" />
                  <h3 className="font-['Space_Grotesk'] font-bold text-xs sm:text-sm uppercase tracking-wider text-[#F3F8FA] truncate">
                    Event Coordination Team
                  </h3>
                </div>
                <span className="text-[10px] font-['Space_Grotesk'] text-[#8DEBFF] uppercase tracking-wider shrink-0 hidden xs:inline-block">
                  Direct Helplines
                </span>
              </div>

              {/* Coordinator Rows */}
              <div className="space-y-2 sm:space-y-2.5 w-full min-w-0">
                {COORDINATORS.map((coordinator) => {
                  const isLead = coordinator.isLead;

                  return (
                    <div
                      key={coordinator.name}
                      className={`roster-row group relative flex items-center justify-between gap-2 p-2 sm:p-3 rounded-xl transition-all duration-300 hover:translate-x-1 w-full min-w-0 ${
                        isLead
                          ? "bg-[#00C8E8]/[0.06] hover:bg-[#00C8E8]/[0.12] border border-[#00C8E8]/35 hover:border-[#00C8E8] shadow-[0_0_15px_rgba(0,200,232,0.1)]"
                          : "bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-[#00C8E8]/30"
                      }`}
                    >
                      {/* Name & Role */}
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div
                          className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-['Space_Grotesk'] font-bold text-[11px] sm:text-xs shrink-0 transition-transform group-hover:scale-105 ${
                            isLead
                              ? "bg-[#071A24] text-[#8DEBFF] border border-[#00C8E8]/60 shadow-[0_0_10px_rgba(0,200,232,0.3)]"
                              : "bg-[#07131C] text-[#F3F8FA] border border-white/10 group-hover:border-[#00C8E8]/40"
                          }`}
                        >
                          {coordinator.monogram}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-nowrap min-w-0">
                            <span className="font-['Space_Grotesk'] font-bold text-xs sm:text-sm text-[#F3F8FA] group-hover:text-[#8DEBFF] transition-colors truncate">
                              {coordinator.name}
                            </span>
                            {isLead && (
                              <span className="text-[8px] sm:text-[9px] font-['Space_Grotesk'] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#00C8E8]/20 text-[#00C8E8] border border-[#00C8E8]/40 shrink-0">
                                Lead
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-[#A4B6BF] font-['Inter',sans-serif] truncate">
                            {coordinator.role}
                          </div>
                        </div>
                      </div>

                      {/* Tap-to-Call Phone Button */}
                      <a
                        href={`tel:+91${coordinator.phone}`}
                        aria-label={`Call ${coordinator.name} at ${coordinator.formattedPhone}`}
                        title={`Call ${coordinator.name}`}
                        className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-['Space_Grotesk'] font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
                          isLead
                            ? "bg-[#00C8E8] hover:bg-[#8DEBFF] text-[#050708] shadow-[0_0_12px_rgba(0,200,232,0.35)]"
                            : "bg-[#07131C] hover:bg-[#00C8E8]/20 text-[#8DEBFF] border border-white/10 hover:border-[#00C8E8]/50"
                        }`}
                      >
                        <Phone className="w-3 h-3 text-current shrink-0" />
                        <span className="hidden sm:inline">{coordinator.formattedPhone}</span>
                        <span className="sm:hidden font-mono text-[11px] tracking-tight">{coordinator.phone}</span>
                        <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-current shrink-0 opacity-80" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =========================================================================
              COLUMN 2: ACADEMIC LEADERSHIP (4 Faculty Members)
              ========================================================================= */}
          <div className="p-3 sm:p-5 lg:p-7 flex flex-col justify-between w-full min-w-0">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-1.5 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-white/[0.06] w-full min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                  <span className="w-2 h-2 rounded-full bg-[#19D8E8] shadow-[0_0_8px_#19D8E8] shrink-0" />
                  <h3 className="font-['Space_Grotesk'] font-bold text-xs sm:text-sm uppercase tracking-wider text-[#F3F8FA] truncate">
                    Academic Leadership
                  </h3>
                </div>
                <span className="text-[10px] font-['Space_Grotesk'] text-[#A4B6BF] uppercase tracking-wider shrink-0">
                  JCET Hubballi
                </span>
              </div>

              {/* Faculty Rows */}
              <div className="space-y-2 sm:space-y-2.5 w-full min-w-0">
                {ACADEMIC_LEADERSHIP.map((faculty) => {
                  const Icon = faculty.icon;

                  return (
                    <div
                      key={faculty.name}
                      className="roster-row group relative flex items-center justify-between gap-2 p-2 sm:p-2.5 md:p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-[#19D8E8]/35 transition-all duration-300 hover:translate-x-1 w-full min-w-0"
                    >
                      {/* Name & Department */}
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#07131C] border border-white/10 flex items-center justify-center text-[#19D8E8] shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="font-['Space_Grotesk'] font-bold text-xs sm:text-sm text-[#F3F8FA] group-hover:text-[#8DEBFF] transition-colors truncate">
                            {faculty.name}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-[#A4B6BF] font-['Inter',sans-serif] truncate">
                            {faculty.department}
                          </div>
                        </div>
                      </div>

                      {/* Role Pill */}
                      <span className="shrink-0 text-[8.5px] xs:text-[9.5px] sm:text-[10px] md:text-[11px] font-['Space_Grotesk'] font-semibold uppercase tracking-wider text-[#8DEBFF] bg-[#19D8E8]/10 px-1.5 xs:px-2 sm:px-2.5 py-0.5 rounded-full border border-[#19D8E8]/20 whitespace-nowrap">
                        {faculty.role === "Faculty Coordinator" ? (
                          <>
                            <span className="xs:hidden">FACULTY COORD</span>
                            <span className="hidden xs:inline">FACULTY COORDINATOR</span>
                          </>
                        ) : (
                          faculty.role
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM STRIP: COMPACT INSTITUTIONAL COMMAND BAR
            ========================================================================= */}
        <div className="p-3 sm:p-4 md:p-5 bg-[#040A10]/95 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full min-w-0">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#07131C] border border-[#00C8E8]/30 flex items-center justify-center text-[#00C8E8] shrink-0 mt-0.5 sm:mt-0 shadow-sm">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1.5 flex-wrap min-w-0">
                <span className="font-['Space_Grotesk'] font-bold text-xs sm:text-sm text-[#F3F8FA] break-words">
                  {EVENT_DETAILS.institution}
                </span>
                <span className="text-[10px] text-[#00C8E8] font-['Space_Grotesk'] uppercase font-medium shrink-0">
                  • {EVENT_DETAILS.department}
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#A4B6BF] font-['Inter',sans-serif] flex items-center gap-1 mt-0.5 min-w-0">
                <MapPin className="w-3 h-3 text-[#00C8E8] shrink-0" />
                <span className="truncate">{EVENT_DETAILS.address}</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <a
              href={EVENT_DETAILS.coordinates.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to Jain College of Engineering and Technology, Hubballi on Google Maps"
              title="Get directions on Google Maps"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-['Space_Grotesk'] font-bold text-[#050708] bg-gradient-to-r from-[#00C8E8] to-[#19D8E8] hover:from-[#19D8E8] hover:to-[#8DEBFF] shadow-[0_0_15px_rgba(0,200,232,0.25)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#050708]" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 text-[#050708]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import {
  Calendar,
  Clock,
  Download,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Radio,
  Coffee,
  Code2,
  Award,
  AlertCircle,
  Flag,
  UserCheck,
} from "lucide-react";
import { OFFICIAL_SCHEDULE, ScheduleItem, EVENT_DETAILS } from "../data/eventData";
import NorrisHeadline from "./ui/norris-headline";
import { generateSchedulePdf } from "../utils/generateSchedulePdf";

// Pin SVG from HowItWorks component
const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

// Card layout positions on desktop (winding alternating zig-zag pattern)
const DESKTOP_POSITIONS = [
  { className: "md:absolute md:top-[0px] md:left-[5%] lg:left-[8%]", rotate: "rotate-2" },
  { className: "md:absolute md:top-[260px] md:right-[5%] lg:right-[8%]", rotate: "-rotate-2" },
  { className: "md:absolute md:top-[520px] md:left-[5%] lg:left-[8%]", rotate: "rotate-2" },
  { className: "md:absolute md:top-[780px] md:right-[5%] lg:right-[8%]", rotate: "-rotate-2" },
  { className: "md:absolute md:top-[1040px] md:left-[5%] lg:left-[8%]", rotate: "rotate-2" },
];

// Milestone coordinates along the connector path for node indicators
const MILESTONE_NODES = [
  { x: 290, y: 140, threshold: 0.05 },
  { x: 710, y: 380, threshold: 0.25 },
  { x: 290, y: 640, threshold: 0.50 },
  { x: 710, y: 900, threshold: 0.75 },
  { x: 290, y: 1160, threshold: 0.95 },
];

export default function EventSchedule() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentCoord, setCurrentCoord] = useState<{ x: number; y: number } | null>({ x: 290, y: 140 });

  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);

  // S-curve connector path across the 5 cards
  const connectorPathD =
    "M 290 140 C 580 140, 710 240, 710 380 C 710 510, 290 510, 290 640 C 290 770, 710 770, 710 900 C 710 1030, 290 1030, 290 1160";

  // Smooth scroll tracking driving the connector line in between cards
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        if (!cardsContainerRef.current) return;
        const rect = cardsContainerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Progress begins as the first card approaches view and completes as the last card is crossed
        const startOffset = windowHeight * 0.65;
        const totalDistance = rect.height - windowHeight * 0.25;
        const currentDistance = startOffset - rect.top;

        const raw = Math.max(0, Math.min(1, currentDistance / totalDistance));
        setScrollProgress(raw);

        // Calculate exact (x, y) along the curved path for the traveling alive bead
        if (svgPathRef.current) {
          try {
            const totalLen = svgPathRef.current.getTotalLength();
            if (totalLen > 0) {
              const pt = svgPathRef.current.getPointAtLength(raw * totalLen);
              setCurrentCoord({ x: pt.x, y: pt.y });
            }
          } catch {
            // Ignore during initial layout mount
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Helper to determine activity state in Asia/Kolkata (IST = UTC+5:30)
  const getActivityStatus = (dateIso: string, item: ScheduleItem) => {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const istNow = new Date(utcMs + 3600000 * 5.5);

    const [year, month, day] = dateIso.split("-").map(Number);
    const start = new Date(year, month - 1, day, item.startHour, item.startMinute, 0);
    const end = new Date(year, month - 1, day, item.endHour, item.endMinute, 0);

    const nowVal = istNow.getTime();
    const startVal = start.getTime();
    const endVal = end.getTime();

    if (nowVal > endVal) {
      return { label: "COMPLETED", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", icon: CheckCircle2 };
    }
    if (nowVal >= startVal && nowVal <= endVal) {
      return { label: "LIVE NOW", color: "bg-[#00C8E8]/20 text-[#8DEBFF] border-[#00C8E8]/60 animate-pulse", icon: Radio };
    }
    if (nowVal < startVal && startVal - nowVal <= 1000 * 60 * 60 * 6) {
      return { label: "UP NEXT", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40", icon: Clock };
    }
    return { label: "SCHEDULED", color: "bg-white/5 text-[#A4B6BF] border-white/10", icon: Clock };
  };

  const activeDaySchedule = useMemo(() => {
    return OFFICIAL_SCHEDULE.find((d) => d.dayNumber === selectedDay) || OFFICIAL_SCHEDULE[0];
  }, [selectedDay]);

  const getActivityIcon = (type: ScheduleItem["type"]) => {
    switch (type) {
      case "registration":
        return UserCheck;
      case "coding":
        return Code2;
      case "food":
        return Coffee;
      case "checkpoint":
        return Flag;
      case "ceremony":
        return Award;
      default:
        return Clock;
    }
  };

  const googleCalendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=HackIgnite+1.0+—+National+Level+24-Hour+Hackathon&dates=20261212T040000Z/20261213T073000Z&details=A+24-Hour+Innovation+Challenge+to+Solve+Real-World+Problems+through+Technology.+Jain+College+of+Engineering+and+Technology,+Hubballi.&location=Jain+College+of+Engineering+and+Technology,+Hubballi";

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="schedule"
        ref={sectionRef}
        className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10"
      >
        {/* Ambient Cosmic Teal/Cyan Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#00C8E8]/08 blur-[160px] rounded-full" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#19D8E8]/06 blur-[150px] rounded-full" />
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07131C]/80 border border-[#00C8E8]/30 backdrop-blur-md mb-3 shadow-[0_0_15px_rgba(0,200,232,0.15)]">
            <Clock className="w-3.5 h-3.5 text-[#00C8E8]" />
            <span className="text-xs font-mono tracking-widest text-[#8DEBFF] uppercase">
              TIMELINE PROTOCOL // 24-HOUR RUN
            </span>
          </div>

          <NorrisHeadline
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-['Space_Grotesk',sans-serif] mb-3"
          >
            INTERACTIVE <span className="cyan-turquoise-text">EVENT SCHEDULE</span>
          </NorrisHeadline>

          <p className="text-sm sm:text-base text-[#A4B6BF] font-['Inter',sans-serif] max-w-2xl mx-auto leading-relaxed">
            The verified minute-by-minute timetable for the 24-hour innovation marathon. All times in India Standard Time (IST / Asia/Kolkata).
          </p>

          {/* Day Segmented Switcher & PDF / Calendar Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Day 1 / Day 2 Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-[#07131C]/90 border border-white/10 backdrop-blur-lg shadow-lg">
              {OFFICIAL_SCHEDULE.map((day) => {
                const isSelected = selectedDay === day.dayNumber;
                return (
                  <button
                    key={day.dayNumber}
                    onClick={() => setSelectedDay(day.dayNumber)}
                    className={`px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-[#00C8E8]/20 text-[#8DEBFF] border border-[#00C8E8]/60 shadow-[0_0_20px_rgba(0,200,232,0.3)]"
                        : "text-[#A4B6BF] hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-[#00C8E8]" />
                    <span>{day.dayLabel} // {day.dateStr}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons: Official PDF Download & Google Calendar */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={generateSchedulePdf}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00C8E8]/20 to-[#19D8E8]/20 hover:from-[#00C8E8]/30 hover:to-[#19D8E8]/30 border border-[#00C8E8]/50 hover:border-[#00C8E8] text-[#8DEBFF] hover:text-white font-mono text-xs font-bold transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(0,200,232,0.2)] hover:shadow-[0_0_25px_rgba(0,200,232,0.4)] cursor-pointer group"
                title="Download Official HackIgnite 1.0 Timetable (PDF)"
              >
                <Download className="w-3.5 h-3.5 text-[#00C8E8] group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform" />
                <span>DOWNLOAD SCHEDULE (PDF)</span>
              </button>

              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-[#07131C]/80 hover:bg-[#07131C] border border-white/10 hover:border-[#00C8E8]/50 text-[#A4B6BF] hover:text-white font-mono text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                title="Add to Google Calendar"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#00C8E8]" />
                <span className="hidden sm:inline">GOOGLE CALENDAR</span>
                <span className="sm:hidden">GCAL</span>
              </a>
            </div>
          </div>
        </div>

        {/* HOW-IT-WORKS WINDING CARDS & FLOWING TIMELINE LINE */}
        <div
          ref={cardsContainerRef}
          className="relative max-w-6xl mx-auto z-10"
        >
          {/* Subtle Grid Backdrop */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage: "linear-gradient(#00C8E8 1px, transparent 1px)",
              backgroundSize: "100% 40px",
            }}
          />

          <div
            className="relative w-full max-w-[1050px] mx-auto flex flex-col space-y-8 md:space-y-0 md:block h-auto md:h-[1360px]"
          >
            {/* SVG S-Curve Timeline Indicator in Between Cards (Desktop) */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
              viewBox="0 0 1000 1360"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="scheduleProgressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00C8E8" />
                  <stop offset="50%" stopColor="#19D8E8" />
                  <stop offset="100%" stopColor="#8DEBFF" />
                </linearGradient>
                <filter id="scheduleGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00C8E8" floodOpacity="0.8" />
                  <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#19D8E8" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* 1. Ambient Background Guide Track (dim dashed roadmap line) */}
              <path
                d={connectorPathD}
                stroke="rgba(0, 200, 232, 0.15)"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />

              {/* 2. Active Illuminated Timeline Progress Line (fills along path as you scroll) */}
              <path
                ref={svgPathRef}
                d={connectorPathD}
                stroke="url(#scheduleProgressGrad)"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - Math.max(0, Math.min(1, scrollProgress))}
                filter="url(#scheduleGlow)"
                style={{
                  transition: "stroke-dashoffset 0.1s ease-out",
                }}
              />

              {/* 3. Milestone Waypoints at Card Anchor Nodes */}
              {MILESTONE_NODES.map((node, i) => {
                const isReached = scrollProgress >= node.threshold;
                return (
                  <g key={i} transform={`translate(${node.x}, ${node.y})`}>
                    <circle
                      r="7"
                      fill={isReached ? "#07131C" : "#050708"}
                      stroke={isReached ? "#00C8E8" : "rgba(255,255,255,0.15)"}
                      strokeWidth="2"
                      className="transition-colors duration-300"
                    />
                    <circle
                      r="3"
                      fill={isReached ? "#8DEBFF" : "rgba(255,255,255,0.2)"}
                      className="transition-colors duration-300"
                    />
                    {isReached && (
                      <circle
                        r="12"
                        fill="none"
                        stroke="#00C8E8"
                        strokeWidth="1"
                        opacity="0.4"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                );
              })}

              {/* 4. Alive Energy Pulse Bead Travelling Along the Active Line */}
              {currentCoord && scrollProgress > 0.02 && (
                <g transform={`translate(${currentCoord.x}, ${currentCoord.y})`}>
                  {/* Outer Ripple */}
                  <circle r="16" fill="#00C8E8" opacity="0.25" className="animate-ping" />
                  {/* Cyan Halo */}
                  <circle r="9" fill="#00C8E8" opacity="0.6" />
                  {/* Cyan Ring */}
                  <circle r="6" fill="none" stroke="#8DEBFF" strokeWidth="2" />
                  {/* Intense White Core */}
                  <circle r="3.5" fill="#FFFFFF" />
                </g>
              )}
            </svg>

            {/* Mobile Vertical Timeline Track with Smooth Scroll Progress Fill */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-white/10 md:hidden pointer-events-none">
              <div
                className="w-full bg-gradient-to-b from-[#00C8E8] via-[#19D8E8] to-[#8DEBFF] shadow-[0_0_12px_#00C8E8] transition-all duration-150 ease-out relative"
                style={{ height: `${Math.round(Math.min(100, Math.max(0, scrollProgress * 100)))}%` }}
              >
                {scrollProgress > 0.02 && (
                  <div className="absolute -bottom-1.5 -left-[4px] w-2.5 h-2.5 rounded-full bg-white border border-[#00C8E8] shadow-[0_0_10px_#00C8E8] animate-pulse" />
                )}
              </div>
            </div>

            {/* 5 Schedule Milestone Cards */}
            {activeDaySchedule.events.map((event, index) => {
              const position = DESKTOP_POSITIONS[index % DESKTOP_POSITIONS.length];
              const status = getActivityStatus(activeDaySchedule.dateIso, event);
              const StatusIcon = status.icon;
              const ActivityIcon = getActivityIcon(event.type);

              // Card is reached by the line progress
              const cardThreshold = index * 0.22;
              const isReached = scrollProgress >= cardThreshold;

              return (
                <div
                  id={`schedule-card-${index}`}
                  key={event.id}
                  className={`relative w-full md:w-[420px] lg:w-[460px] transition-all duration-300 hover:z-30 hover:scale-[1.02] hover:rotate-0 pl-10 md:pl-0 ${position.rotate} ${position.className}`}
                >
                  {/* Outer Glowing Card Frame */}
                  <div
                    className={`p-2.5 rounded-[24px] bg-[#07131C]/90 backdrop-blur-xl border transition-all duration-300 shadow-[0_12px_30px_rgba(0,0,0,0.6)] ${
                      isReached
                        ? "border-[#00C8E8] shadow-[0_0_35px_rgba(0,200,232,0.3)] ring-1 ring-[#00C8E8]/50"
                        : "border-white/10 hover:border-[#00C8E8]/60 hover:shadow-[0_0_25px_rgba(0,200,232,0.2)]"
                    }`}
                  >
                    {/* Top Cyber Push-Pin Icon */}
                    <div className="relative z-20 -mt-5 mb-2 mx-auto flex items-center justify-center">
                      <div
                        className={`p-1.5 rounded-full bg-[#050708] border transition-all duration-300 ${
                          isReached
                            ? "border-[#00C8E8] shadow-[0_0_16px_rgba(0,200,232,0.7)] scale-110"
                            : "border-white/10 shadow-[0_0_8px_rgba(0,200,232,0.3)]"
                        }`}
                      >
                        <Pin
                          className={`w-6 h-6 transition-colors duration-300 ${
                            isReached
                              ? "text-[#8DEBFF] drop-shadow-[0_0_10px_#00C8E8]"
                              : "text-[#00C8E8]/70"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Inner Card Body */}
                    <div className="rounded-[18px] bg-gradient-to-b from-[#09232B]/50 via-[#07131C]/80 to-[#050708]/90 border border-[#00C8E8]/20 p-5 sm:p-6 flex flex-col relative overflow-hidden">
                      {/* Big Stylized Step Number in Top-Right */}
                      <span
                        className={`absolute -top-3 right-3 text-5xl sm:text-6xl font-black font-['Space_Grotesk'] text-transparent bg-clip-text select-none pointer-events-none transition-opacity duration-300 ${
                          isReached
                            ? "bg-gradient-to-br from-[#8DEBFF]/40 via-[#00C8E8]/25 to-transparent opacity-100"
                            : "bg-gradient-to-br from-white/15 to-transparent opacity-40"
                        }`}
                      >
                        0{index + 1}
                      </span>

                      {/* Header Row: Time Range & Live Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/10 relative z-10">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#00C8E8]" />
                          <span className="font-mono text-xs sm:text-sm font-bold text-[#8DEBFF]">
                            {event.timeRange}
                          </span>
                          <span className="text-[#A4B6BF]/40 text-xs hidden sm:inline">| IST</span>
                        </div>

                        {/* Calculated Live Activity State Badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold tracking-wider ${status.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          <span>{status.label}</span>
                        </span>
                      </div>

                      {/* Activity Title & Category Icon */}
                      <div className="flex items-start gap-3 relative z-10">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                            isReached
                              ? "bg-[#00C8E8]/20 border border-[#00C8E8] text-[#8DEBFF] shadow-[0_0_15px_rgba(0,200,232,0.3)]"
                              : "bg-[#00C8E8]/10 border border-[#00C8E8]/30 text-[#00C8E8]"
                          }`}
                        >
                          <ActivityIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-['Space_Grotesk'] font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
                            {event.activity}
                          </h4>
                          <p className="mt-1.5 text-xs sm:text-sm text-[#A4B6BF] leading-relaxed font-['Inter',sans-serif]">
                            {event.description}
                          </p>

                          {/* Organizer Note Badge if present */}
                          {event.note && (
                            <div className="mt-3 inline-flex items-center gap-1.5 text-[10.5px] font-mono text-cyan-300/90 bg-[#09232B]/80 px-2.5 py-1 rounded-md border border-[#00C8E8]/40">
                              <AlertCircle className="w-3 h-3 text-[#00C8E8] shrink-0" />
                              <span>{event.note}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

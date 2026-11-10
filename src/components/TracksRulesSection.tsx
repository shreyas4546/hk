import React, { useState } from "react";
import {
  ShieldAlert,
  Layers,
  Users,
  Code2,
  FileText,
  Download,
  Sparkles,
  CheckCircle2,
  Radio,
  Lock,
  ArrowRight,
  Globe,
  Smartphone,
} from "lucide-react";
import { OFFICIAL_RULES, TRACKS } from "../data/eventData";
import NorrisHeadline from "./ui/norris-headline";

interface TracksRulesSectionProps {
  onOpenRegister?: () => void;
}

export default function TracksRulesSection({ onOpenRegister }: TracksRulesSectionProps) {
  const [activeTab, setActiveTab] = useState<"tracks" | "rules">("tracks");

  const handleDownloadRules = () => {
    const rulesDocument = [
      "============================================================",
      "HACKIGNITE 1.0 — OFFICIAL COMPETITION RULES & GUIDELINES",
      "Department of Computer Science and Engineering (CSE/AI&ML)",
      "Jain College of Engineering and Technology, Hubballi",
      "Event Dates: 12–13 December 2026",
      "============================================================",
      "",
      "1. TEAM COMPOSITION & ELIGIBILITY",
      "- Each participating team must consist of strictly 2 to 4 members.",
      "- Teams must have a designated Team Lead for all official communications.",
      "- Inter-college and cross-disciplinary collaborations are permitted.",
      "",
      "2. 24-HOUR SPRINT & CODE INTEGRITY",
      "- The coding period begins at 11:30 AM on 12 December 2026 and ends at 11:30 AM on 13 December 2026.",
      "- All project code, architectures, and assets must be developed during the 24-hour sprint.",
      "- Pre-built proprietary products or existing projects are strictly disallowed.",
      "- Public open-source libraries, frameworks, and APIs are permitted provided their usage is documented.",
      "",
      "3. INTELLECTUAL PROPERTY (100% PARTICIPANT OWNERSHIP)",
      "- All code, software, repositories, prototypes, and presentations developed during HackIgnite 1.0 remain the exclusive intellectual property of the respective participating teams.",
      "- The organizers and institution claim zero ownership over participant inventions.",
      "",
      "4. MANDATORY CHECKPOINTS & JURY EVALUATION",
      "- Checkpoint 1 (12 Dec, 06:00 PM – 07:30 PM): Problem framing, architectural scope, and feasibility.",
      "- Checkpoint 2 (13 Dec, 05:30 AM – 07:00 AM): Working prototype verification and feature progress.",
      "- Both checkpoints are mandatory for teams to qualify for the final pitching round.",
      "",
      "5. VENUE & CODE OF CONDUCT",
      "- Participants must carry their valid college identity card at all times.",
      "- Respectful, professional, and ethical conduct is strictly required. Harassment or misconduct results in immediate disqualification.",
      "- High-speed Wi-Fi, power connectivity, and meals (Lunch, Dinner, Midnight Refreshment, Breakfast) are provided on campus.",
      "",
      "6. OFFICIAL COORDINATION HOTLINE",
      "- Event Coordinator: Aditya R H",
      "- Phone: +91 70229 51232",
      "- Campus: JCET, Hebballi Road, Sai Nagar, Unkal, Hubballi – 580031",
      "============================================================",
    ].join("\n");

    const blob = new Blob([rulesDocument], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hackignite-1.0-official-rules.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="tracks-rules" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-[#00C8E8]/08 blur-[160px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#8DEBFF] mb-3 font-['Space_Grotesk']">
          Tracks & Rules
        </p>

        <NorrisHeadline
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-['Space_Grotesk',sans-serif] mb-3"
        >
          CHOOSE YOUR <span className="cyan-turquoise-text">CHALLENGE</span>
        </NorrisHeadline>

        <p className="text-sm sm:text-base text-[#A4B6BF] font-['Inter',sans-serif] max-w-xl mx-auto leading-relaxed">
          Explore the challenges. Discover your direction. Build something meaningful.
        </p>

        {/* Segmented View Switcher: Tracks vs Rules */}
        <div className="mt-7 inline-flex p-1.5 rounded-2xl bg-[#07131C]/90 border border-white/10 backdrop-blur-lg shadow-lg">
          <button
            onClick={() => setActiveTab("tracks")}
            className={`px-6 py-2 rounded-xl font-['Space_Grotesk'] text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${activeTab === "tracks"
              ? "bg-[#00C8E8]/20 text-[#8DEBFF] border border-[#00C8E8]/60 shadow-[0_0_15px_rgba(0,200,232,0.3)]"
              : "text-[#A4B6BF] hover:text-white border border-transparent"
              }`}
          >
            <Layers className="w-4 h-4 text-[#00C8E8]" />
            <span>Challenge Tracks</span>
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-6 py-2 rounded-xl font-['Space_Grotesk'] text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${activeTab === "rules"
              ? "bg-[#00C8E8]/20 text-[#8DEBFF] border border-[#00C8E8]/60 shadow-[0_0_15px_rgba(0,200,232,0.3)]"
              : "text-[#A4B6BF] hover:text-white border border-transparent"
              }`}
          >
            <ShieldAlert className="w-4 h-4 text-[#00C8E8]" />
            <span>Rules & Guidelines</span>
          </button>
        </div>
      </div>

      {/* Tab Content: Tracks */}
      {activeTab === "tracks" && (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {TRACKS.map((track) => {
              const isWeb = track.id === "web-development";
              const TrackIcon = isWeb ? Globe : Smartphone;

              return (
                <div
                  key={track.id}
                  className="rounded-3xl bg-[#07131C]/90 border border-white/10 hover:border-[#00C8E8]/60 p-6 sm:p-7 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(0,200,232,0.25)] transition-all duration-300 flex flex-col justify-between group overflow-hidden relative"
                >
                  {/* Ambient Card Glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#00C8E8]/08 blur-2xl pointer-events-none rounded-full group-hover:bg-[#00C8E8]/15 transition-colors" />

                  <div>
                    {/* 3D Cyber Thematic Preview Image Banner */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#00C8E8]/25 group-hover:border-[#00C8E8]/60 transition-all duration-500 mb-6 bg-[#050708]">
                      <img
                        src={track.image}
                        alt={track.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Subtle Vignette Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07131C] via-transparent to-black/30 opacity-90" />

                      {/* Top Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050708]/85 backdrop-blur-md border border-white/10 flex items-center shadow-md">
                        <span className="text-xs font-['Space_Grotesk'] font-bold text-[#8DEBFF]">
                          {track.code} · {track.category}
                        </span>
                      </div>

                      {/* Watermark Icon at bottom right of image */}
                      <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-[#050708]/85 backdrop-blur-md border border-[#00C8E8]/40 flex items-center justify-center text-[#00C8E8] shadow-[0_0_15px_rgba(0,200,232,0.25)]">
                        <TrackIcon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Header: Title & Category */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00C8E8]/10 border border-[#00C8E8]/30 flex items-center justify-center text-[#00C8E8] shadow-[0_0_12px_rgba(0,200,232,0.2)] group-hover:scale-110 transition-transform">
                        <TrackIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-['Space_Grotesk'] font-bold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-[#8DEBFF] transition-colors">
                          {track.name}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#A4B6BF] leading-relaxed font-['Inter',sans-serif] mb-5">
                      {track.description}
                    </p>

                    {/* Technologies Tag Cloud */}
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-[#8DEBFF] font-['Space_Grotesk'] mb-2">
                        Suggested Tech Stack
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {track.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-[#09232B]/80 border border-[#00C8E8]/30 text-xs font-['Inter',sans-serif] text-[#8DEBFF] hover:border-[#00C8E8] transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Bar: Domain Identifier & Apply Action */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#A4B6BF] font-['Inter',sans-serif] block">
                        Domain
                      </span>
                      <span className="font-['Space_Grotesk'] font-bold text-sm sm:text-base text-[#8DEBFF]">
                        {track.name}
                      </span>
                    </div>

                    <button
                      onClick={onOpenRegister}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C8E8] to-[#19D8E8] hover:from-[#8DEBFF] hover:to-[#00C8E8] text-[#050708] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,200,232,0.3)] hover:shadow-[0_0_25px_rgba(0,200,232,0.5)] cursor-pointer group/btn"
                    >
                      <span>Apply For This Track</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content: Rules */}
      {activeTab === "rules" && (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Rules Top Summary & Download Rules Button */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#07131C]/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-[#8DEBFF] font-['Space_Grotesk'] uppercase tracking-wider">
                Guidelines & Code of Conduct
              </div>
              <p className="text-xs sm:text-sm text-[#A4B6BF] mt-0.5 font-['Inter',sans-serif]">
                Every participant must comply with the official HackIgnite 1.0 guidelines.
              </p>
            </div>

            <button
              onClick={handleDownloadRules}
              className="px-4 py-2.5 rounded-xl bg-[#00C8E8] hover:bg-[#8DEBFF] text-[#050708] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,200,232,0.3)] shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Rules (.txt)</span>
            </button>
          </div>

          {/* Verified Rule Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OFFICIAL_RULES.map((rule) => (
              <div
                key={rule.id}
                className="p-5 rounded-2xl bg-[#07131C]/80 border border-white/10 hover:border-[#00C8E8]/40 transition-all duration-300 space-y-2 backdrop-blur-md shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#00C8E8]/15 border border-[#00C8E8]/30 font-['Space_Grotesk'] text-[10px] font-bold tracking-wider text-[#8DEBFF] uppercase">
                    {rule.badge}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#00C8E8]" />
                </div>
                <h4 className="font-['Space_Grotesk'] font-bold text-lg text-white">
                  {rule.title}
                </h4>
                <p className="text-xs text-[#8DEBFF] font-medium">
                  {rule.summary}
                </p>
                <p className="text-xs text-[#A4B6BF] leading-relaxed font-['Inter',sans-serif]">
                  {rule.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}


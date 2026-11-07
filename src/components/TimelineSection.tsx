import { useState } from "react";
import { TIMELINE } from "../data/eventData";
import { Flag } from "lucide-react";

export default function TimelineSection() {
  const [selectedPhase, setSelectedPhase] = useState<string>("All");

  const phases = [
    "All",
    "Phase 1: Screening",
    "Phase 2: Launch",
    "Phase 3: Orbit Sprint",
    "Phase 4: Final Evaluation",
    "Phase 5: Victory",
  ];

  const filteredTimeline =
    selectedPhase === "All"
      ? TIMELINE
      : TIMELINE.filter((item) =>
          item.phase.includes(selectedPhase.replace("Phase ", "").split(":")[0])
        );

  return (
    <section id="timeline" className="relative py-20 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[500px] bg-[#168BFF]/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full cosmic-glass border border-[#20CFFF]/25 text-[11px] sm:text-xs font-mono text-[#8DEBFF] mb-3">
          <Flag className="w-3.5 h-3.5 text-[#20CFFF] shrink-0" />
          <span>MISSION CHRONOLOGY // 24-HOUR COUNTDOWN</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white mb-3 sm:mb-4">
          EVENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20CFFF] to-[#8DEBFF]">TIMELINE</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-[#9AAFC1]">
          A precision-timed schedule engineered to maximize productive building, architectural mentorship, and project pitching.
        </p>
      </div>

      {/* Filter Tabs for Phases (Responsive wrap) */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10 sm:mb-14 px-2">
        {phases.map((phase) => (
          <button
            key={phase}
            onClick={() => setSelectedPhase(phase)}
            className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all ${
              selectedPhase === phase
                ? "bg-[#20CFFF] text-[#030609] font-bold shadow-[0_0_15px_#20CFFF]"
                : "cosmic-glass text-[#9AAFC1] hover:text-white"
            }`}
          >
            {phase}
          </button>
        ))}
      </div>

      {/* Timeline Tree with zero-overflow mobile margin */}
      <div className="relative border-l border-[#20CFFF]/30 ml-4 sm:ml-28 md:ml-40 pl-5 sm:pl-8 space-y-8 sm:space-y-10">
        {filteredTimeline.map((item) => (
          <div key={item.step} className="relative group">
            {/* Left Time Badge (for Desktop) */}
            <div className="hidden sm:block absolute -left-36 md:-left-44 top-1 w-28 md:w-36 text-right">
              <div className="text-[11px] font-mono text-[#8DEBFF] font-semibold">{item.date}</div>
              <div className="text-xs sm:text-sm font-mono font-bold text-white tabular-nums">{item.time}</div>
            </div>

            {/* Glowing Node on Timeline Axis */}
            <div
              className={`absolute -left-[27px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                item.isMilestone
                  ? "bg-[#20CFFF] border-white shadow-[0_0_12px_#20CFFF]"
                  : "bg-[#07111D] border-[#20CFFF]/80"
              }`}
            />

            {/* Content Card */}
            <div className="sci-fi-card p-4 sm:p-6 transition-all duration-300 group-hover:border-[#20CFFF]/60">
              {/* Mobile Time Stamp Header */}
              <div className="sm:hidden flex items-center justify-between text-xs font-mono text-[#8DEBFF] mb-2 pb-2 border-b border-[#20CFFF]/15">
                <span>{item.date}</span>
                <span className="font-bold text-white">{item.time}</span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-[10px] sm:text-[11px] font-mono text-[#20CFFF] uppercase tracking-wider">
                  {item.phase}
                </span>
                <span className="text-[11px] font-mono text-[#9AAFC1]/60">STEP // {item.step}</span>
              </div>

              <h3 className="font-display font-bold text-base sm:text-lg text-white mb-2 group-hover:text-[#8DEBFF] transition-colors flex flex-wrap items-center gap-2">
                <span>{item.title}</span>
                {item.isMilestone && (
                  <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-[#20CFFF]/20 text-[#8DEBFF] border border-[#20CFFF]/40">
                    Milestone
                  </span>
                )}
              </h3>

              <p className="text-xs sm:text-sm text-[#9AAFC1] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

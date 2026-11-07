import { Clock, Users, Gift, Trophy, ShieldCheck, MapPin } from "lucide-react";
import { EVENT_DETAILS } from "../data/eventData";

export default function EventOverview() {
  const cards = [
    {
      icon: Clock,
      value: "24H",
      label: "Non-Stop Coding",
      detail: "Continuous 24-hour sprint from kickoff to code freeze with non-stop mentor support.",
    },
    {
      icon: Users,
      value: "2 – 4",
      label: "Builders Per Squad",
      detail: "Collaborate in interdisciplinary pods combining frontends, backends, AI and design.",
    },
    {
      icon: Gift,
      value: "₹0",
      label: "Zero Entry Fee",
      detail: "Free entry for all shortlisted teams including meals, energy snacks, and swag kits.",
    },
    {
      icon: Trophy,
      value: "₹2.5L+",
      label: "Prize Pool & Grants",
      detail: "Direct cash bounties, cloud computing credits, hardware perks, and incubator passes.",
    },
    {
      icon: ShieldCheck,
      value: "500+",
      label: "Innovators Onboard",
      detail: "Elite coders, designers, and problem solvers from top engineering institutions.",
    },
    {
      icon: MapPin,
      value: "Hybrid",
      label: "Campus & Metaverse",
      detail: "On-site main campus arena with gigabit LAN plus virtual metaverse broadcast.",
    },
  ];

  return (
    <section id="overview" className="relative py-16 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full cosmic-glass border border-[#20CFFF]/20 text-[11px] sm:text-xs font-mono text-[#8DEBFF] mb-3">
          <span>MISSION TELEMETRY</span>
          <span className="text-white/30">/</span>
          <span>EVENT BRIEF</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-3 sm:mb-4">
          ENGINEERED FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20CFFF] to-[#8DEBFF]">IMPACT</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-[#9AAFC1] leading-relaxed">
          {EVENT_DETAILS.name} brings together India's boldest developers, researchers, and creators to build real-world solutions under high-pressure creative momentum.
        </p>
      </div>

      {/* Grid of Futuristic Sci-Fi Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="sci-fi-card p-6 sm:p-8 flex flex-col justify-between group hover:border-[#20CFFF]/60 relative overflow-hidden"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#07111D] border border-[#20CFFF]/30 flex items-center justify-center text-[#8DEBFF] group-hover:scale-110 group-hover:border-[#20CFFF] transition-all duration-300 shadow-[0_0_15px_rgba(32,207,255,0.15)]">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-[#9AAFC1]/60">0{idx + 1}</span>
              </div>

              <div>
                <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight mb-2 group-hover:text-[#8DEBFF] transition-colors tabular-nums">
                  {card.value}
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 tracking-wide">
                  {card.label}
                </h3>
                <p className="text-sm text-[#9AAFC1] leading-relaxed">
                  {card.detail}
                </p>
              </div>

              {/* Decorative Corner Bracket Line */}
              <div className="mt-6 pt-4 border-t border-[#20CFFF]/10 flex items-center justify-between text-[11px] font-mono text-[#20CFFF]/70">
                <span>STATUS // VERIFIED</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#20CFFF] opacity-60" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

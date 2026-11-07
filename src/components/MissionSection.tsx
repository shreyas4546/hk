import { Lightbulb, Network, Code2, Rocket, Activity, Radio } from "lucide-react";

export default function MissionSection() {
  const pillars = [
    {
      num: "01",
      icon: Lightbulb,
      title: "Radical Ideation",
      desc: "Deconstruct systemic bottlenecks. Re-imagine consumer tools, infrastructure security, and edge intelligence.",
    },
    {
      num: "02",
      icon: Network,
      title: "High-Bandwidth Collaboration",
      desc: "Form unstoppable builder squads. Pair engineering rigor with visionary product architecture.",
    },
    {
      num: "03",
      icon: Code2,
      title: "24H High-Velocity Sprint",
      desc: "Ship production-grade code, APIs, smart contracts, and microservices under adrenaline and laser focus.",
    },
    {
      num: "04",
      icon: Rocket,
      title: "Planetary Demonstration",
      desc: "Pitch live to tech leaders, venture investors, and veteran engineering judges for cash prizes and seed incubation.",
    },
  ];

  return (
    <section id="mission" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#20CFFF]/10 via-[#168BFF]/10 to-transparent blur-[150px] pointer-events-none rounded-full" />

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full cosmic-glass border border-[#20CFFF]/25 text-xs font-mono text-[#8DEBFF] mb-3">
          <Radio className="w-3.5 h-3.5 text-[#20CFFF] animate-pulse" />
          <span>EXPEDITION BLUEPRINT // 24-HOUR TRAJECTORY</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
          TRANSFORM YOUR IDEAS INTO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20CFFF] to-[#8DEBFF]">FRONTIER REALITY</span>
        </h2>
        <p className="text-base sm:text-lg text-[#9AAFC1]">
          HackIgnite 1.0 is not an ordinary hackathon. It is a crucible for builders aiming to push humanity's technological envelope.
        </p>
      </div>

      {/* Signature Composition: Lunar Astronaut flanked by sci-fi telemetry cards (Direct match to reference image!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
        {/* Left Telemetry Card */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="sci-fi-card p-5 relative">
            <div className="text-[10px] font-mono text-[#20CFFF] mb-2">{`{01/04} ORBITAL INTENT`}</div>
            <h4 className="font-display font-bold text-base text-white mb-2">Dark Elegance & Speed</h4>
            <p className="text-xs text-[#9AAFC1] leading-relaxed mb-4">
              Pushing beyond standard frameworks into low-latency, real-world utility.
            </p>
            <div className="w-full h-24 rounded-lg bg-[#07111D] border border-[#20CFFF]/20 flex items-center justify-center relative overflow-hidden">
              {/* Planetary orbit graphic */}
              <div className="w-16 h-16 rounded-full border border-[#20CFFF]/40 animate-[spin_12s_linear_infinite]" />
              <div className="w-8 h-8 rounded-full border border-dashed border-[#8DEBFF]/60 absolute animate-[spin_6s_linear_infinite_reverse]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#20CFFF] shadow-[0_0_10px_#20CFFF]" />
            </div>
          </div>
        </div>

        {/* Center Main Frame: Seated Lunar Astronaut */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden sci-fi-card group p-2">
            <img
              src="/src/assets/images/mission_astronaut_lunar_1794046420834.jpg"
              alt="Astronaut seated on lunar surface contemplating Earth"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030609] via-transparent to-transparent opacity-80" />
            
            {/* Tag on frame */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full cosmic-glass border border-[#20CFFF]/30 text-xs font-mono text-[#8DEBFF]">
              {`{Cosmic Masterpiece}`}
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="font-display text-sm font-bold text-white tracking-widest uppercase">
                Zero Gravity · Infinite Potential
              </span>
            </div>
          </div>
        </div>

        {/* Right Telemetry Card: Waveform telemetry */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="sci-fi-card p-5 relative">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#20CFFF] mb-3">
              <span>SPECTRAL ANALYSIS</span>
              <Activity className="w-3.5 h-3.5 text-[#20CFFF]" />
            </div>
            
            {/* Audio / signal waveform matching Astrovue reference */}
            <div className="w-full h-12 bg-[#07111D] rounded-lg border border-[#20CFFF]/20 flex items-center justify-center px-3 gap-1 mb-3">
              {[40, 65, 25, 90, 75, 30, 85, 45, 100, 60, 35, 70, 50, 80, 40, 95, 30, 60, 45].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#168BFF] to-[#20CFFF] rounded-full"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="text-xs font-bold text-white mb-1">Otherworldly Essence</div>
            <p className="text-[11px] text-[#9AAFC1]">
              Continuous telemetric mentorship ensuring code resilience and scalable architecture.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div key={pillar.num} className="sci-fi-card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#07111D] border border-[#20CFFF]/30 flex items-center justify-center text-[#20CFFF] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-sm font-bold text-[#8DEBFF]">{pillar.num}</span>
                </div>
                <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-[#8DEBFF] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#9AAFC1] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

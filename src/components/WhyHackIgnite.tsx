import { Target, Users2, Sparkles, Award } from "lucide-react";

export default function WhyHackIgnite() {
  const benefits = [
    {
      icon: Target,
      title: "Real-World Engineering Challenges",
      desc: "Step beyond basic tutorials. Build robust prototypes solving actual bottlenecks in modern computing, cybersecurity, and open protocols.",
    },
    {
      icon: Users2,
      title: "High-Caliber Builder Community",
      desc: "Connect with the top 500+ student developers, UI/UX designers, and researchers across the nation in an intense creative atmosphere.",
    },
    {
      icon: Sparkles,
      title: "Hands-on Technical Mentorship",
      desc: "Receive actionable guidance from seasoned engineers and domain specialists to elevate your code, database, and system architecture.",
    },
    {
      icon: Award,
      title: "Showcase on a National Stage",
      desc: "Present your live demonstration before distinguished jury panels, tech founders, and recruitment scouts looking for exceptional talent.",
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
          WHY COMPETE IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20CFFF] to-[#8DEBFF]">HACKIGNITE 1.0</span>
        </h2>
        <p className="text-base sm:text-lg text-[#9AAFC1]">
          Designed from the ground up to give developers the ultimate crucible to learn, ship, and get recognized.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.title} className="sci-fi-card p-6 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#07111D] border border-[#20CFFF]/30 flex items-center justify-center text-[#20CFFF] mb-6 group-hover:scale-110 group-hover:border-[#20CFFF] transition-all shadow-[0_0_15px_rgba(32,207,255,0.2)]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-[#8DEBFF] transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9AAFC1] leading-relaxed">
                  {b.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#20CFFF]/10 flex items-center justify-between text-[11px] font-mono text-[#20CFFF]">
                <span>ADVANTAGE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#20CFFF]" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

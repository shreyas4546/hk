import React from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { EVENT_DETAILS, ORGANIZERS } from "../data/eventData";

export default function Footer() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#030609] border-t border-[#20CFFF]/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-xs text-[#9AAFC1] z-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Disclaimer / Intro Line matching Astrovue reference */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b border-[#20CFFF]/15 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#8DEBFF] font-mono">DISCLAIMER</span>
            <span className="text-white/20">·</span>
            <span>All code authored during the 24h sprint remains 100% intellectual property of participating teams.</span>
          </div>

          <a
            href="#hero"
            onClick={(e) => scrollTo(e, "#hero")}
            className="text-[#8DEBFF] hover:text-white flex items-center gap-1 font-mono group"
          >
            <span>BACK TO TOP</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Middle Navigation & Info Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* Col 1: Identity */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-[#20CFFF]/20 border border-[#20CFFF] flex items-center justify-center text-[#8DEBFF]">
                <Sparkles className="w-3 h-3" />
              </div>
              <span className="font-display font-black text-base text-white tracking-wider">
                HACK<span className="text-[#20CFFF]">IGNITE</span> 1.0
              </span>
            </div>
            <p className="text-[11px] text-[#9AAFC1] leading-relaxed mb-4">
              National Level 24-Hour Hackathon. Beyond Innovation. Uniting engineering minds to forge planetary breakthroughs.
            </p>
            <div className="text-[10px] font-mono text-[#20CFFF]">
              HOST // {ORGANIZERS.institution}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div className="font-mono text-white text-xs font-bold uppercase tracking-wider mb-4">
              NAVIGATION
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#hero" onClick={(e) => scrollTo(e, "#hero")} className="hover:text-[#8DEBFF] transition-colors">
                  Home Terminal
                </a>
              </li>
              <li>
                <a href="#overview" onClick={(e) => scrollTo(e, "#overview")} className="hover:text-[#8DEBFF] transition-colors">
                  Event Brief
                </a>
              </li>
              <li>
                <a href="#tracks" onClick={(e) => scrollTo(e, "#tracks")} className="hover:text-[#8DEBFF] transition-colors">
                  Technology Tracks
                </a>
              </li>
              <li>
                <a href="#mission" onClick={(e) => scrollTo(e, "#mission")} className="hover:text-[#8DEBFF] transition-colors">
                  Mission Blueprint
                </a>
              </li>
              <li>
                <a href="#timeline" onClick={(e) => scrollTo(e, "#timeline")} className="hover:text-[#8DEBFF] transition-colors">
                  Schedule Chronology
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => scrollTo(e, "#faq")} className="hover:text-[#8DEBFF] transition-colors">
                  FAQ & Policies
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div>
            <div className="font-mono text-white text-xs font-bold uppercase tracking-wider mb-4">
              COMMUNICATION
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] text-[#9AAFC1]">SUPPORT EMAIL</div>
                <a href={`mailto:${EVENT_DETAILS.contactEmail}`} className="text-white hover:text-[#8DEBFF] font-mono transition-colors">
                  {EVENT_DETAILS.contactEmail}
                </a>
              </div>
              <div>
                <div className="text-[10px] text-[#9AAFC1]">HELPLINE</div>
                <div className="text-white font-mono">{EVENT_DETAILS.contactPhone}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#9AAFC1]">OPERATIONS</div>
                <div className="text-white font-mono">24/7 Continuous Support</div>
              </div>
            </div>
          </div>

          {/* Col 4: Venue & Ecosystem */}
          <div>
            <div className="font-mono text-white text-xs font-bold uppercase tracking-wider mb-4">
              CAMPUS ARENA
            </div>
            <p className="text-[11px] leading-relaxed mb-3">
              {EVENT_DETAILS.venue}
            </p>
            <div className="p-3 rounded-lg bg-[#07111D] border border-[#20CFFF]/20 text-[10px] font-mono text-[#8DEBFF]">
              SYSTEMS: ONLINE <br />
              NETWORK: 10 Gbps FIBER
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Status */}
        <div className="pt-8 border-t border-[#20CFFF]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 {EVENT_DETAILS.name}. Department of Computer Science & Engineering. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-[#8DEBFF]">
            <span>STABLE RELEASE</span>
            <span>·</span>
            <span>HYBRID METAVERSE READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

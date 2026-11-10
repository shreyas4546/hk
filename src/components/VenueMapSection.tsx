import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Compass,
  Train,
  Plane,
  Bus,
} from "lucide-react";
import { EVENT_DETAILS } from "../data/eventData";
import NorrisHeadline from "./ui/norris-headline";

export default function VenueMapSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(EVENT_DETAILS.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="venue" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#00C8E8]/08 blur-[160px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#8DEBFF] mb-3 font-['Space_Grotesk']">
          Find the Venue
        </p>

        <NorrisHeadline
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-['Space_Grotesk',sans-serif] mb-3"
        >
          FIND YOUR WAY TO <span className="cyan-turquoise-text">HACKIGNITE</span>
        </NorrisHeadline>

        <p className="text-sm sm:text-base text-[#A4B6BF] font-['Inter',sans-serif] max-w-xl mx-auto leading-relaxed">
          Your innovation destination. One campus. Endless possibilities.
        </p>
      </div>

      {/* Main Map & Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-6xl mx-auto">
        {/* Left: Interactive Map Container (7 cols on lg) */}
        <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl bg-[#07131C]/90 border border-[#00C8E8]/35 overflow-hidden shadow-[0_0_35px_rgba(0,200,232,0.18)] relative flex flex-col min-h-[380px] sm:min-h-[440px]">
          {/* Top Map Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#050708]/90 border-b border-white/10 text-xs font-['Inter',sans-serif] z-10">
            <span className="text-[#8DEBFF] font-medium">JCET Campus Map</span>
            <span className="text-[#A4B6BF] text-xs">Hubballi, Karnataka</span>
          </div>

          {/* Interactive Google Map Embed with Cyber Filter */}
          <div className="relative flex-1 w-full h-full min-h-[320px] overflow-hidden">
            <iframe
              title="JCET Hubballi Campus Map"
              src={EVENT_DETAILS.coordinates.embedUrl}
              className="w-full h-full border-0 absolute inset-0 filter invert-[90%] hue-rotate-180 contrast-[105%] brightness-[92%] opacity-85 hover:opacity-100 transition-opacity"
              loading="lazy"
              allowFullScreen
            />
          </div>

          {/* Bottom Fast Action Bar */}
          <div className="p-3 bg-[#050708]/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-['Inter',sans-serif]">
            <span className="text-[#A4B6BF] text-xs">
              Destination: Jain College of Engineering and Technology
            </span>
            <a
              href={EVENT_DETAILS.coordinates.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#00C8E8] text-[#050708] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:bg-[#8DEBFF] transition-all shadow-[0_0_12px_rgba(0,200,232,0.4)] cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* Right: Detailed Venue Card (5 cols on lg) */}
        <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-[#07131C]/90 border border-white/10 p-5 sm:p-7 backdrop-blur-xl flex flex-col justify-between shadow-xl space-y-6">
          {/* Institution Identity */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#8DEBFF] text-xs font-semibold uppercase tracking-wider font-['Space_Grotesk']">
              <Building2 className="w-4 h-4 text-[#00C8E8]" />
              <span>Host Institution</span>
            </div>
            <h3 className="font-['Space_Grotesk'] font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
              {EVENT_DETAILS.institution}
            </h3>
            <p className="text-xs text-[#8DEBFF] font-['Inter',sans-serif] mt-1">
              {EVENT_DETAILS.department}
            </p>
          </div>

          {/* Full Verified Address */}
          <div className="p-4 rounded-xl bg-[#050708]/80 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#8DEBFF] font-['Space_Grotesk']">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00C8E8]" />
                <span>Campus Address</span>
              </span>
              <button
                onClick={handleCopyAddress}
                className="text-xs text-[#A4B6BF] hover:text-white flex items-center gap-1 transition-colors cursor-pointer font-['Inter',sans-serif]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#F3F8FA] leading-relaxed font-['Inter',sans-serif]">
              {EVENT_DETAILS.address}
            </p>
          </div>

          {/* Transit Proximity Nodes */}
          <div>
            <div className="text-xs font-semibold text-[#8DEBFF] uppercase tracking-wider mb-2.5 font-['Space_Grotesk']">
              Nearby Transit
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-['Inter',sans-serif] text-xs">
              <div className="p-2.5 rounded-lg bg-[#050708]/60 border border-white/5 flex items-center gap-2">
                <Train className="w-4 h-4 text-[#00C8E8] shrink-0" />
                <div>
                  <div className="font-bold text-white">Hubballi Jnc</div>
                  <div className="text-[10px] text-[#A4B6BF]">~6.2 km</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#050708]/60 border border-white/5 flex items-center gap-2">
                <Plane className="w-4 h-4 text-[#00C8E8] shrink-0" />
                <div>
                  <div className="font-bold text-white">Airport (HBX)</div>
                  <div className="text-[10px] text-[#A4B6BF]">~11.5 km</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#050708]/60 border border-white/5 flex items-center gap-2">
                <Bus className="w-4 h-4 text-[#00C8E8] shrink-0" />
                <div>
                  <div className="font-bold text-white">Unkal Lake</div>
                  <div className="text-[10px] text-[#A4B6BF]">~2.8 km</div>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Navigation Links */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <a
              href={EVENT_DETAILS.coordinates.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-[#00C8E8] hover:bg-[#8DEBFF] text-[#050708] font-bold font-['Space_Grotesk'] text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,200,232,0.3)] text-center cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>

            <a
              href={EVENT_DETAILS.coordinates.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#07131C] hover:bg-white/10 border border-white/20 text-[#F3F8FA] font-bold font-['Space_Grotesk'] text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all text-center cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-[#00C8E8]" />
              <span>Open Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


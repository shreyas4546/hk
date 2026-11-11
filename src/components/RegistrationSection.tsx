import React from "react";
import { ArrowRight, Sparkles, Calendar, Clock, MapPin, Tag } from "lucide-react";
import { EVENT_DETAILS } from "../data/eventData";
import NorrisHeadline from "./ui/norris-headline";
import LiveCountdown from "./LiveCountdown";
import ShatterablePrizeReveal from "./ShatterablePrizeReveal";

interface RegistrationSectionProps {
  onOpenRegister: () => void;
}

export default function RegistrationSection({ onOpenRegister }: RegistrationSectionProps) {

  return (
    <section id="register" className="relative py-20 sm:py-28 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Background radial atmospheric lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[850px] h-[500px] bg-gradient-to-r from-[#00C8E8]/12 via-[#19D8E8]/08 to-transparent blur-[160px] pointer-events-none rounded-full" />

      {/* Main Conversion Frame */}
      <div className="relative rounded-2xl sm:rounded-3xl cosmic-glass border border-[#00C8E8]/30 p-4 sm:p-10 md:p-14 lg:p-16 overflow-hidden text-center shadow-[0_0_50px_rgba(0,200,232,0.15)]">
        {/* Section Kicker */}
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#8DEBFF] mb-4 sm:mb-5 font-['Space_Grotesk']">
          One Hackathon · One Shared Prize Pool
        </p>

        {/* Section 4 F Heading: YOUR IDEAS CAN CHANGE TOMORROW. */}
        <NorrisHeadline className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F3F8FA] tracking-tight uppercase mb-4 max-w-4xl mx-auto leading-tight">
          YOUR IDEAS CAN <span className="cyan-turquoise-text">CHANGE TOMORROW.</span>
        </NorrisHeadline>

        {/* Supporting description */}
        <p className="text-sm sm:text-base lg:text-lg text-[#A4B6BF] font-['Inter',sans-serif] max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed font-light px-2">
          Step into the 24-hour innovation challenge. Collaborate with builders, solve real-world problems, and turn your technology vision into reality.
        </p>

        {/* INTERACTIVE SHATTERABLE PRIZE VAULT REVEAL (Interactive Glass Break) */}
        <ShatterablePrizeReveal onOpenRegister={onOpenRegister} />

        {/* SECTION 4 F: PROMINENT ENTRY FEE DISPLAY */}
        <div className="max-w-md mx-auto mb-8 sm:mb-10 p-5 sm:p-6 rounded-2xl bg-[#07131C]/85 border border-[#00C8E8]/40 shadow-[0_0_25px_rgba(0,200,232,0.2)]">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#8DEBFF] mb-1 font-['Space_Grotesk']">
            Entry Fee
          </div>
          <div className="font-['Space_Grotesk'] font-bold text-4xl sm:text-5xl text-[#F3F8FA] tracking-tight my-1">
            <span className="cyan-turquoise-text">{EVENT_DETAILS.registrationFeeAmount}</span>
            <span className="text-base sm:text-lg text-[#A4B6BF] font-normal font-['Space_Grotesk'] ml-2">per team</span>
          </div>
          <p className="text-xs text-[#A4B6BF] mt-2 font-['Inter',sans-serif]">
            This is the complete registration fee per participating team.
          </p>
        </div>

        {/* Live Countdown Component */}
        <LiveCountdown className="max-w-xl mx-auto mb-8 sm:mb-10" />

        {/* Event Key Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto mb-8 sm:mb-10 text-left">
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#07131C]/90 border border-white/10">
            <div className="text-xs text-[#A4B6BF] font-['Inter',sans-serif]">Event Dates</div>
            <div className="text-xs sm:text-sm font-bold text-[#F3F8FA] mt-0.5 font-['Space_Grotesk']">{EVENT_DETAILS.dates}</div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#07131C]/90 border border-white/10">
            <div className="text-xs text-[#A4B6BF] font-['Inter',sans-serif]">Duration</div>
            <div className="text-xs sm:text-sm font-bold text-[#F3F8FA] mt-0.5 font-['Space_Grotesk']">{EVENT_DETAILS.duration}</div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#07131C]/90 border border-white/10">
            <div className="text-xs text-[#A4B6BF] font-['Inter',sans-serif]">Venue</div>
            <div className="text-xs sm:text-sm font-bold text-[#F3F8FA] mt-0.5 font-['Space_Grotesk']">{EVENT_DETAILS.shortVenue}</div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#07131C]/90 border border-white/10">
            <div className="text-xs text-[#A4B6BF] font-['Inter',sans-serif]">Entry Fee</div>
            <div className="text-xs sm:text-sm font-bold text-[#00C8E8] mt-0.5 font-['Space_Grotesk']">{EVENT_DETAILS.registrationFee}</div>
          </div>
        </div>

        {/* SECTION 4 F: Registration Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenRegister}
            className="w-full sm:w-auto h-[52px] sm:h-[56px] px-9 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold font-['Space_Grotesk'] uppercase tracking-wider text-[#050708] bg-gradient-to-r from-[#00C8E8] via-[#19D8E8] to-[#00C8E8] bg-[length:200%_auto] hover:bg-[position:right_center] cyan-btn-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer shadow-[0_4px_25px_rgba(0,200,232,0.45)]"
          >
            <span>REGISTER YOUR TEAM ON UNSTOP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sponsor Endorsement & Quick QR Micro-Hint */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-['Inter',sans-serif] text-[#A4B6BF]">
          <span className="flex items-center gap-1.5">
            <span>Official Platform:</span>
            <strong className="text-white">Unstop</strong>
          </span>
          <span className="text-white/20">|</span>
          <button
            onClick={onOpenRegister}
            className="text-[#8DEBFF] hover:underline underline-offset-4 cursor-pointer inline-flex items-center gap-1"
          >
            <span>Scan QR Code or Open Direct Link</span>
            <ArrowRight className="w-3 h-3 inline" />
          </button>
        </div>
      </div>
    </section>
  );
}

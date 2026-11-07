import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { EVENT_DETAILS } from "../data/eventData";
import { calculateTimeRemaining, CountdownTime } from "../utils/rules";

interface RegistrationSectionProps {
  onOpenRegister: () => void;
}

export default function RegistrationSection({ onOpenRegister }: RegistrationSectionProps) {
  const [countdown, setCountdown] = useState<CountdownTime>(
    calculateTimeRemaining(EVENT_DETAILS.countdownTarget)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateTimeRemaining(EVENT_DETAILS.countdownTarget));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="register" className="relative py-20 sm:py-28 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Background radial blue lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[850px] h-[550px] bg-gradient-to-r from-[#168BFF]/15 via-[#20CFFF]/20 to-transparent blur-[160px] pointer-events-none rounded-full" />

      {/* Main Conversion Frame */}
      <div className="relative rounded-2xl sm:rounded-3xl cosmic-glass border border-[#20CFFF]/40 p-5 sm:p-10 md:p-14 lg:p-16 overflow-hidden text-center shadow-[0_0_60px_rgba(32,207,255,0.2)]">
        {/* Top Kicker */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#07111D] border border-[#20CFFF]/30 text-[11px] sm:text-xs md:text-sm font-mono text-[#8DEBFF] mb-5 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#20CFFF] shrink-0" />
          <span>PORTAL STATUS // REGISTRATION OPEN</span>
        </div>

        {/* Headline with fluid clamp */}
        <h2 className="font-display font-black text-[clamp(1.75rem,5.5vw,3.75rem)] text-white tracking-tight uppercase mb-3 sm:mb-4 max-w-4xl mx-auto leading-tight">
          YOUR NEXT BIG IDEA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20CFFF] to-[#8DEBFF]">STARTS HERE.</span>
        </h2>

        {/* Supporting text */}
        <p className="text-sm sm:text-lg md:text-xl text-[#9AAFC1] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light px-2">
          Step into the innovation arena. Build something that matters. 24 hours of pure adrenaline, frontier engineering, and global recognition.
        </p>

        {/* Countdown Timer Strip */}
        <div className="max-w-xl mx-auto mb-8 sm:mb-12 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#07111D]/80 border border-[#20CFFF]/25">
          <div className="text-[10px] sm:text-[11px] font-mono text-[#20CFFF] uppercase tracking-wider mb-2.5 sm:mb-3">
            COUNTDOWN TO HACKATHON COMMENCEMENT
          </div>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 text-center">
            <div className="p-2 sm:p-3 rounded-lg bg-[#0A1724] border border-[#20CFFF]/20">
              <div className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-white tabular-nums">
                {String(countdown.days).padStart(2, "0")}
              </div>
              <div className="text-[9px] sm:text-xs text-[#9AAFC1] font-mono mt-0.5 sm:mt-1">DAYS</div>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-[#0A1724] border border-[#20CFFF]/20">
              <div className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-white tabular-nums">
                {String(countdown.hours).padStart(2, "0")}
              </div>
              <div className="text-[9px] sm:text-xs text-[#9AAFC1] font-mono mt-0.5 sm:mt-1">HOURS</div>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-[#0A1724] border border-[#20CFFF]/20">
              <div className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-white tabular-nums">
                {String(countdown.minutes).padStart(2, "0")}
              </div>
              <div className="text-[9px] sm:text-xs text-[#9AAFC1] font-mono mt-0.5 sm:mt-1">MINS</div>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-[#0A1724] border border-[#20CFFF]/20">
              <div className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-[#20CFFF] tabular-nums">
                {String(countdown.seconds).padStart(2, "0")}
              </div>
              <div className="text-[9px] sm:text-xs text-[#9AAFC1] font-mono mt-0.5 sm:mt-1">SECS</div>
            </div>
          </div>
        </div>

        {/* Verified Facts & Rules Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto mb-8 sm:mb-10 text-left">
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#07111D] border border-[#20CFFF]/20">
            <div className="text-[9px] sm:text-[10px] font-mono text-[#9AAFC1]">REGISTRATION FEE</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{EVENT_DETAILS.registrationFee}</div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#07111D] border border-[#20CFFF]/20">
            <div className="text-[9px] sm:text-[10px] font-mono text-[#9AAFC1]">TEAM ELIGIBILITY</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{EVENT_DETAILS.teamSize}</div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#07111D] border border-[#20CFFF]/20">
            <div className="text-[9px] sm:text-[10px] font-mono text-[#9AAFC1]">DEADLINE</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{EVENT_DETAILS.registrationDeadline}</div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#07111D] border border-[#20CFFF]/20">
            <div className="text-[9px] sm:text-[10px] font-mono text-[#9AAFC1]">EVENT DATES</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{EVENT_DETAILS.dates}</div>
          </div>
        </div>

        {/* Massive Conversion CTA Button (Full width on mobile, auto on desktop) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenRegister}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 min-h-[48px] text-sm sm:text-base md:text-lg font-black text-white bg-gradient-to-r from-[#168BFF] via-[#20CFFF] to-[#168BFF] bg-[length:200%_auto] hover:bg-[position:right_center] rounded-full cyan-btn-glow transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-wider"
          >
            <span>REGISTER NOW — FREE ENTRY</span>
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" />
          </button>
        </div>

        {/* Wide Cinematic Astronaut Horizon Card */}
        <div className="mt-10 sm:mt-14 relative w-full h-52 sm:h-72 md:h-88 rounded-2xl overflow-hidden sci-fi-card p-0">
          <img
            src="/src/assets/images/hero_astronaut_floating_1794046417639.jpg"
            alt="Astronaut exploring cosmos"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-75 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030609] via-[#07111D]/40 to-transparent" />

          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 px-3 py-1 rounded-full cosmic-glass border border-[#20CFFF]/40 text-[10px] sm:text-xs font-mono text-[#8DEBFF]">
            Step In. Stand Out. Own the Future.
          </div>

          <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 text-left max-w-md pr-4">
            <h3 className="font-display font-black text-lg sm:text-2xl md:text-3xl text-white mb-1.5 leading-tight">
              Create, Code, and Conquer HackIgnite
            </h3>
            <p className="text-xs sm:text-sm text-[#9AAFC1] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#20CFFF] shrink-0" />
              <span>Full meals, swag kits, and compute grants provided to shortlists.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

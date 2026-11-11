import React, { useState, useEffect } from "react";
import { calculateEventCountdownState, CountdownStateResult } from "../utils/countdownState";
import { Radio } from "lucide-react";

interface LiveCountdownProps {
  className?: string;
}

export default function LiveCountdown({ className = "" }: LiveCountdownProps) {
  const [state, setState] = useState<CountdownStateResult>(calculateEventCountdownState());

  useEffect(() => {
    const timer = setInterval(() => {
      setState(calculateEventCountdownState());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="live-countdown"
      className={`relative rounded-2xl bg-[#07131C]/85 border border-[#00C8E8]/35 p-3.5 sm:p-6 md:p-7 backdrop-blur-xl shadow-[0_0_35px_rgba(0,200,232,0.18)] ${className}`}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10 text-xs font-['Space_Grotesk']">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00C8E8] shadow-[0_0_8px_#00C8E8]" />
          <span className="text-[#8DEBFF] font-bold tracking-wider uppercase">{state.statusBadge}</span>
        </div>
        <span className="text-[#A4B6BF] text-xs font-['Inter',sans-serif]">12 Dec 2026 · 09:30 AM IST</span>
      </div>

      {/* Digits Grid (When countdown is active) */}
      {state.isCountdownActive ? (
        <div className="grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 max-w-lg mx-auto text-center w-full">
          {/* Days */}
          <div className="relative py-2.5 px-1 sm:p-4 rounded-xl bg-[#050708]/90 border border-[#00C8E8]/25 shadow-inner group min-w-0 flex flex-col items-center justify-center overflow-hidden">
            <div className="font-['Space_Grotesk'] font-extrabold text-xl sm:text-4xl md:text-5xl text-[#F3F8FA] tabular-nums tracking-tight leading-none">
              {String(state.days).padStart(2, "0")}
            </div>
            <div className="text-[9px] sm:text-xs font-['Space_Grotesk'] font-semibold text-[#8DEBFF] mt-1.5 uppercase truncate max-w-full tracking-normal sm:tracking-wider">
              <span>DAYS</span>
            </div>
          </div>

          {/* Hours */}
          <div className="relative py-2.5 px-1 sm:p-4 rounded-xl bg-[#050708]/90 border border-[#00C8E8]/25 shadow-inner group min-w-0 flex flex-col items-center justify-center overflow-hidden">
            <div className="font-['Space_Grotesk'] font-extrabold text-xl sm:text-4xl md:text-5xl text-[#F3F8FA] tabular-nums tracking-tight leading-none">
              {String(state.hours).padStart(2, "0")}
            </div>
            <div className="text-[9px] sm:text-xs font-['Space_Grotesk'] font-semibold text-[#8DEBFF] mt-1.5 uppercase truncate max-w-full tracking-normal sm:tracking-wider">
              <span className="sm:hidden">HRS</span>
              <span className="hidden sm:inline">HOURS</span>
            </div>
          </div>

          {/* Minutes */}
          <div className="relative py-2.5 px-1 sm:p-4 rounded-xl bg-[#050708]/90 border border-[#00C8E8]/25 shadow-inner group min-w-0 flex flex-col items-center justify-center overflow-hidden">
            <div className="font-['Space_Grotesk'] font-extrabold text-xl sm:text-4xl md:text-5xl text-[#F3F8FA] tabular-nums tracking-tight leading-none">
              {String(state.minutes).padStart(2, "0")}
            </div>
            <div className="text-[9px] sm:text-xs font-['Space_Grotesk'] font-semibold text-[#8DEBFF] mt-1.5 uppercase truncate max-w-full tracking-normal sm:tracking-wider">
              <span className="sm:hidden">MINS</span>
              <span className="hidden sm:inline">MINUTES</span>
            </div>
          </div>

          {/* Seconds */}
          <div className="relative py-2.5 px-1 sm:p-4 rounded-xl bg-[#050708]/90 border border-[#00C8E8]/50 shadow-[0_0_15px_rgba(0,200,232,0.2)] group min-w-0 flex flex-col items-center justify-center overflow-hidden">
            <div className="font-['Space_Grotesk'] font-extrabold text-xl sm:text-4xl md:text-5xl text-[#00C8E8] tabular-nums tracking-tight drop-shadow-[0_0_12px_rgba(0,200,232,0.6)] leading-none">
              {String(state.seconds).padStart(2, "0")}
            </div>
            <div className="text-[9px] sm:text-xs font-['Space_Grotesk'] font-semibold text-[#8DEBFF] mt-1.5 uppercase truncate max-w-full tracking-normal sm:tracking-wider">
              <span className="sm:hidden">SECS</span>
              <span className="hidden sm:inline">SECONDS</span>
            </div>
          </div>
        </div>
      ) : (
        /* Event In-Session / Concluded Banner */
        <div className="max-w-md mx-auto p-4 rounded-xl bg-[#00C8E8]/10 border border-[#00C8E8]/40 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-['Space_Grotesk'] font-semibold text-[#8DEBFF]">
            <Radio className="w-4 h-4 text-[#00C8E8]" />
            <span>HackIgnite Arena Synchronized</span>
          </div>
        </div>
      )}
    </div>
  );
}


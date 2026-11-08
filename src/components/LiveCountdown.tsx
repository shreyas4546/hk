import React, { useState, useEffect } from "react";
import { calculateEventCountdownState, CountdownStateResult } from "../utils/countdownState";
import { Clock, Radio, Sparkles } from "lucide-react";

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
      className={`relative rounded-2xl bg-[#07131C]/85 border border-[#00C8E8]/35 p-5 sm:p-7 backdrop-blur-xl shadow-[0_0_35px_rgba(0,200,232,0.18)] ${className}`}
    >
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00C8E8] animate-pulse shadow-[0_0_8px_#00C8E8]" />
          <span className="text-[#8DEBFF] font-bold tracking-wider">{state.statusBadge}</span>
        </div>
        <span className="text-[#A4B6BF]/70 text-[11px]">TARGET: 12 DEC 2026 // 09:30 AM IST</span>
      </div>

      {/* Main Headline */}
      <div className="text-center mb-5">
        <h3 className="font-['Space_Grotesk'] font-bold text-lg sm:text-2xl md:text-3xl text-white uppercase tracking-tight">
          {state.statusHeadline}
        </h3>
        <p className="text-xs sm:text-sm text-[#A4B6BF] mt-1 font-['Inter',sans-serif]">
          {state.targetDescription}
        </p>
      </div>

      {/* Digits Grid (When countdown is active) */}
      {state.isCountdownActive ? (
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto text-center">
          {/* Days */}
          <div className="relative p-2.5 sm:p-4 rounded-xl bg-[#050708]/90 border border-[#00C8E8]/25 shadow-inner group">
            <div className="font-['Space_Grotesk'] font-extrabold text-2xl sm:text-4xl md:text-5xl text-[#F3F8FA] tabular-nums tracking-tight">
              {String(state.days).padStart(2, "0")}
            </div>
            <div className="text-[9px] sm:text-xs font-mono text-[#8DEBFF] mt-1 tracking-wider uppercase">
              Days
            </div>
          </div>

          {/* Hours */}
          <div className="relative p-2.5 sm:p-4 rounded-xl bg-[#050708]/90 border border-[#00C8E8]/25 shadow-inner group">
            <div className="font-['Space_Grotesk'] font-extrabold text-2xl sm:text-4xl md:text-5xl text-[#F3F8FA] tabular-nums tracking-tight">
              {String(state.hours).padStart(2, "0")}
            </div>
            <div className="text-[9px] sm:text-xs font-mono text-[#8DEBFF] mt-1 tracking-wider uppercase">
              Hours
            </div>
          </div>

          {/* Minutes */}
          <div className="relative p-2.5 sm:p-4 rounded-xl bg-[#050708]/90 border border-[#00C8E8]/25 shadow-inner group">
            <div className="font-['Space_Grotesk'] font-extrabold text-2xl sm:text-4xl md:text-5xl text-[#F3F8FA] tabular-nums tracking-tight">
              {String(state.minutes).padStart(2, "0")}
            </div>
            <div className="text-[9px] sm:text-xs font-mono text-[#8DEBFF] mt-1 tracking-wider uppercase">
              Minutes
            </div>
          </div>

          {/* Seconds */}
          <div className="relative p-2.5 sm:p-4 rounded-xl bg-[#050708]/90 border border-[#00C8E8]/50 shadow-[0_0_15px_rgba(0,200,232,0.2)] group">
            <div className="font-['Space_Grotesk'] font-extrabold text-2xl sm:text-4xl md:text-5xl text-[#00C8E8] tabular-nums tracking-tight drop-shadow-[0_0_12px_rgba(0,200,232,0.6)]">
              {String(state.seconds).padStart(2, "0")}
            </div>
            <div className="text-[9px] sm:text-xs font-mono text-[#8DEBFF] mt-1 tracking-wider uppercase">
              Seconds
            </div>
          </div>
        </div>
      ) : (
        /* Event In-Session / Concluded Banner */
        <div className="max-w-md mx-auto p-4 rounded-xl bg-[#00C8E8]/10 border border-[#00C8E8]/40 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-mono font-bold text-[#8DEBFF]">
            <Radio className="w-4 h-4 text-[#00C8E8] animate-pulse" />
            <span>CAMPUS ARENA SYNCHRONIZED</span>
          </div>
        </div>
      )}
    </div>
  );
}


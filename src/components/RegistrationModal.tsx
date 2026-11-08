import React, { useState, useEffect } from "react";
import {
  X,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  QrCode,
  ShieldCheck,
  Trophy,
  Coffee,
  Award,
  Users,
  Flame,
  Zap,
  ArrowRight,
  Clock,
  Phone,
  Share2,
} from "lucide-react";
import { EVENT_DETAILS, UNSTOP_REGISTRATION } from "../data/eventData";
import { soundEffects } from "../utils/soundEffects";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedTrackId?: string;
}

export default function RegistrationModal({
  isOpen,
  onClose,
}: RegistrationModalProps) {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    soundEffects.playCrack(0.6);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(UNSTOP_REGISTRATION.url);
    soundEffects.playVictoryChime();
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleLaunchUnstop = () => {
    soundEffects.playVictoryChime();
    window.open(UNSTOP_REGISTRATION.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="unstop-portal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-[#050B11]/95 border border-[#00C8E8]/40 shadow-[0_0_80px_rgba(0,200,232,0.3)] overflow-hidden text-left flex flex-col max-h-[94vh]">
        {/* Ambient Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00C8E8] to-transparent shadow-[0_0_20px_#00C8E8]" />

        {/* Modal Header */}
        <div className="relative px-5 pt-5 pb-4 sm:px-8 sm:pt-7 sm:pb-5 border-b border-white/10 flex items-start justify-between gap-4 bg-gradient-to-b from-[#071724]/90 to-transparent">
          <div>
            {/* Live Status Pill & Sponsor Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C8E8]/15 border border-[#00C8E8]/40 text-[10px] sm:text-xs font-mono font-bold text-[#8DEBFF] shadow-[0_0_12px_rgba(0,200,232,0.25)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C8E8] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C8E8]" />
                </span>
                <span>OFFICIAL PORTAL // UNSTOP POWERED</span>
              </span>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/95 text-[#1C4980] text-[11px] font-bold tracking-tight shadow-sm">
                <img
                  src="/assets/sponsors/unstop.svg"
                  alt="Unstop Logo"
                  className="h-3 w-auto inline-block object-contain"
                />
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#1C4980]">
                  OFFICIAL PARTNER
                </span>
              </div>
            </div>

            {/* Modal Title */}
            <h2
              id="unstop-portal-title"
              className="font-['Space_Grotesk'] font-bold text-2xl sm:text-3xl md:text-4xl text-[#F3F8FA] tracking-tight uppercase leading-tight"
            >
              REGISTER ON <span className="cyan-turquoise-text">UNSTOP</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A4B6BF] font-['Inter',sans-serif] mt-1 max-w-xl">
              Official registration for <strong className="text-white">HackIgnite 1.0</strong> (12–13 Dec 2026 at JCET Hubballi). Tap below to open Unstop directly, or scan the QR code from another device.
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-[#00C8E8]/20 border border-white/10 hover:border-[#00C8E8]/60 text-[#A4B6BF] hover:text-[#8DEBFF] transition-all cursor-pointer shrink-0"
            aria-label="Close registration modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="px-5 py-5 sm:px-8 sm:py-6 overflow-y-auto space-y-6 custom-scrollbar">
          {/* Main Registration Grid: Mobile Action First on small screens, QR side-by-side on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Desktop Left / Mobile Bottom: Interactive Cyber QR Scanner (5 Cols) */}
            <div className="order-2 lg:order-1 lg:col-span-5 rounded-2xl bg-[#07131C]/90 border border-[#00C8E8]/35 p-5 sm:p-6 flex flex-col items-center justify-between text-center relative group overflow-hidden shadow-[0_0_30px_rgba(0,200,232,0.15)]">
              {/* Corner HUD reticles */}
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />

              {/* Ambient radial glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00C8E8]/10 blur-3xl pointer-events-none rounded-full" />

              {/* QR Header Tag */}
              <div className="w-full flex items-center justify-between mb-3 text-[10px] font-mono text-[#8DEBFF] uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-[#00C8E8]" />
                  <span>FAST MOBILE SCAN</span>
                </span>
                <span className="text-[#A4B6BF]">100% SECURE</span>
              </div>

              {/* QR Code Frame with Animated Cyber Laser */}
              <div
                onClick={handleLaunchUnstop}
                className="relative w-44 h-44 sm:w-52 sm:h-52 p-2 rounded-2xl bg-white shadow-[0_0_30px_rgba(0,200,232,0.35)] transition-transform duration-300 group-hover:scale-[1.02] flex items-center justify-center overflow-hidden border-2 border-[#00C8E8] cursor-pointer"
                title="Click or scan to open Unstop registration"
              >
                {/* Laser scan line & trailing glow */}
                <div className="qr-laser-line" />
                <div className="qr-laser-trail" />

                {/* Official Unstop QR Image */}
                <img
                  src={UNSTOP_REGISTRATION.qrImage}
                  alt="HackIgnite 1.0 Unstop Official Registration QR Code"
                  className="w-full h-full object-contain block"
                />
              </div>

              {/* Instruction Below QR */}
              <div className="mt-4 space-y-1">
                <div className="text-xs sm:text-sm font-bold text-[#F3F8FA] font-['Space_Grotesk'] flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00C8E8]" />
                  <span>POINT PHONE CAMERA TO SCAN</span>
                </div>
                <p className="text-[11px] text-[#A4B6BF] max-w-xs font-['Inter',sans-serif]">
                  Scan with Google Lens, Paytm/GPay or your phone's camera to register instantly on mobile.
                </p>
              </div>
            </div>

            {/* Desktop Right / Mobile Top: Direct Link Launch & Value Highlights (7 Cols) */}
            <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-between space-y-4">
              {/* Urgency & Fee Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#071724] to-[#0A222E] border border-[#00C8E8]/40 shadow-[0_0_25px_rgba(0,200,232,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono text-[#8DEBFF] uppercase tracking-widest flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#00C8E8]" />
                    <span>ALL-INCLUSIVE TEAM ENTRY</span>
                  </div>
                  <div className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl text-white mt-1">
                    <span className="cyan-turquoise-text">₹2,000</span>
                    <span className="text-xs sm:text-sm font-mono text-[#A4B6BF] font-normal ml-2">
                      / TEAM
                    </span>
                  </div>
                  <div className="text-[11px] text-[#A4B6BF] mt-1 font-mono">
                    2–4 members · <span className="text-[#8DEBFF] font-semibold">₹500 per person</span>
                  </div>
                </div>

                <div className="px-3.5 py-2.5 rounded-xl bg-[#050708]/85 border border-[#00C8E8]/30 sm:text-right shrink-0 w-full sm:w-auto">
                  <div className="text-[9px] font-mono text-[#A4B6BF] uppercase tracking-wider">
                    SHARED CASH POOL
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#8DEBFF] font-['Space_Grotesk']">
                    UP TO ₹40,000
                  </div>
                  <div className="text-[9px] font-mono text-[#00C8E8]">
                    5 PODIUM PLACEMENTS
                  </div>
                </div>
              </div>

              {/* Direct Primary CTA Button */}
              <div className="space-y-3">
                <button
                  onClick={handleLaunchUnstop}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#00C8E8] via-[#19D8E8] to-[#00C8E8] bg-[length:200%_auto] hover:bg-[position:right_center] text-[#050708] font-['Space_Grotesk'] font-bold text-base sm:text-lg tracking-wide uppercase shadow-[0_0_30px_rgba(0,200,232,0.5)] hover:shadow-[0_0_45px_rgba(0,200,232,0.8)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span>CONTINUE TO UNSTOP PORTAL</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                {/* Secondary Quick-Copy Link Button */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      readOnly
                      value={UNSTOP_REGISTRATION.url}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#07131C] border border-white/10 text-xs font-mono text-[#8DEBFF]/90 select-all focus:outline-none focus:border-[#00C8E8]/60"
                    />
                  </div>

                  <button
                    onClick={handleCopyLink}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      copied
                        ? "bg-[#00C8E8]/20 border-[#00C8E8] text-[#8DEBFF] shadow-[0_0_15px_rgba(0,200,232,0.3)]"
                        : "bg-white/5 border-white/10 hover:border-[#00C8E8]/50 text-white hover:text-[#8DEBFF]"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00C8E8]" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY LINK</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Verified Trust Guarantees */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#A4B6BF]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00C8E8] shrink-0" />
                  <span>Official Unstop Platform</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#00C8E8] shrink-0" />
                  <span>Instant Team Confirmation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Value Stack & FOMO Drivers: "What Every Team Receives" */}
          <div className="rounded-2xl bg-[#07131C]/60 border border-white/10 p-4 sm:p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-[#8DEBFF] mb-3 flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-[#00C8E8]" />
              <span>WHAT YOUR ₹2,000 ENTRY UNLOCKS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#050708]/80 border border-white/5 flex items-start gap-2.5">
                <Trophy className="w-4 h-4 text-[#00C8E8] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white font-['Space_Grotesk']">
                    Up to ₹40,000 Prize Pool
                  </div>
                  <div className="text-[10px] text-[#A4B6BF] leading-tight mt-0.5">
                    Common cash rewards across Web & App tracks.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#050708]/80 border border-white/5 flex items-start gap-2.5">
                <Coffee className="w-4 h-4 text-[#00C8E8] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white font-['Space_Grotesk']">
                    100% Free Meals & Coffee
                  </div>
                  <div className="text-[10px] text-[#A4B6BF] leading-tight mt-0.5">
                    Lunch, dinner, breakfast, midnight snacks & energy.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#050708]/80 border border-white/5 flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#00C8E8] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white font-['Space_Grotesk']">
                    Verified Certificates
                  </div>
                  <div className="text-[10px] text-[#A4B6BF] leading-tight mt-0.5">
                    National credentials for all team members from JCET & Unstop.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#050708]/80 border border-white/5 flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-[#00C8E8] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white font-['Space_Grotesk']">
                    Gigabit Campus WiFi
                  </div>
                  <div className="text-[10px] text-[#A4B6BF] leading-tight mt-0.5">
                    High-speed connectivity + dedicated power hubs.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#050708]/80 border border-white/5 flex items-start gap-2.5">
                <Users className="w-4 h-4 text-[#00C8E8] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white font-['Space_Grotesk']">
                    Industry Mentors
                  </div>
                  <div className="text-[10px] text-[#A4B6BF] leading-tight mt-0.5">
                    Direct architectural guidance & project review.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#050708]/80 border border-white/5 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#00C8E8] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white font-['Space_Grotesk']">
                    Talent Scouting
                  </div>
                  <div className="text-[10px] text-[#A4B6BF] leading-tight mt-0.5">
                    Direct visibility to recruiters and partner companies.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="px-5 py-3.5 sm:px-8 sm:py-4 border-t border-white/10 bg-[#03070B] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A4B6BF]">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-[#00C8E8]" />
            <span>Registration query?</span>
            <a
              href="tel:+917022951232"
              className="text-[#8DEBFF] hover:underline font-mono font-bold inline-flex items-center gap-1"
            >
              <Phone className="w-3 h-3 inline" />
              <span>Aditya R H (+91 70229 51232)</span>
            </a>
          </div>

          <button
            onClick={handleLaunchUnstop}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#00C8E8]/20 hover:bg-[#00C8E8]/30 border border-[#00C8E8]/50 text-[#8DEBFF] font-mono text-xs font-bold transition-all cursor-pointer"
          >
            <span>OPEN UNSTOP CHALLENGE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

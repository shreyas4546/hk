import { Building2, GraduationCap, MapPin, Phone, User } from "lucide-react";
import { EVENT_DETAILS } from "../data/eventData";
import NorrisHeadline from "./ui/norris-headline";

export default function SponsorsOrganizers() {
  return (
    <section id="contact" className="relative pt-16 sm:pt-20 pb-16 sm:pb-20 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gradient-to-r from-[#00C8E8]/08 via-[#07131C]/50 to-transparent blur-[140px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07131C]/85 border border-[#00C8E8]/30 text-xs font-mono text-[#8DEBFF] mb-3 shadow-[0_0_15px_rgba(0,200,232,0.15)]">
          <GraduationCap className="w-3.5 h-3.5 text-[#00C8E8]" />
          <span>HOST ACADEMIA & LEADERSHIP</span>
        </div>
        <NorrisHeadline className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F3F8FA] mb-4 uppercase tracking-tight">
          ORGANIZING INSTITUTION & <span className="cyan-turquoise-text">CONTACT</span>
        </NorrisHeadline>
        <p className="text-sm sm:text-base text-[#A4B6BF] font-['Inter',sans-serif] leading-relaxed max-w-2xl mx-auto">
          HackIgnite 1.0 is organized under the auspices of the {EVENT_DETAILS.department} at {EVENT_DETAILS.institution}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {/* Organizing Institution & Department Card */}
        <div className="sci-fi-card p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#07131C] border border-[#00C8E8]/30 flex items-center justify-center text-[#8DEBFF]">
                <Building2 className="w-5 h-5 text-[#00C8E8]" />
              </div>
              <h3 className="font-['Space_Grotesk'] font-bold text-lg text-[#F3F8FA]">
                Academic Authority
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-mono uppercase text-[#8DEBFF] mb-1">
                  ORGANIZING INSTITUTION
                </div>
                <div className="font-bold text-[#F3F8FA] text-base">
                  {EVENT_DETAILS.institution}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase text-[#8DEBFF] mb-1">
                  DEPARTMENT
                </div>
                <div className="text-sm text-[#F3F8FA] font-medium">
                  {EVENT_DETAILS.department}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase text-[#8DEBFF] mb-1">
                  CAMPUS ADDRESS
                </div>
                <div className="text-xs sm:text-sm text-[#A4B6BF] leading-relaxed flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-[#00C8E8] shrink-0 mt-0.5" />
                  <span>{EVENT_DETAILS.address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3.5 border-t border-white/10 text-[10px] font-mono text-[#A4B6BF]/60">
            HOST CAMPUS // HUBBALLI
          </div>
        </div>

        {/* Official Event Coordinator Card */}
        <div className="sci-fi-card p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#07131C] border border-[#00C8E8]/30 flex items-center justify-center text-[#8DEBFF]">
                <User className="w-5 h-5 text-[#00C8E8]" />
              </div>
              <h3 className="font-['Space_Grotesk'] font-bold text-lg text-[#F3F8FA]">
                Event Coordinator
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-mono uppercase text-[#8DEBFF] mb-1">
                  LEAD COORDINATOR
                </div>
                <div className="font-['Space_Grotesk'] font-bold text-xl text-[#F3F8FA]">
                  {EVENT_DETAILS.coordinator}
                </div>
                <div className="text-xs text-[#A4B6BF] mt-0.5">
                  Official Event Coordinator · HackIgnite 1.0
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase text-[#8DEBFF] mb-1">
                  CONTACT TELEPHONE
                </div>
                <a
                  href={`tel:${EVENT_DETAILS.contactPhone}`}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#07131C] border border-[#00C8E8]/40 text-[#F3F8FA] hover:text-[#8DEBFF] hover:border-[#00C8E8] transition-all duration-200 group text-sm sm:text-base font-mono font-bold shadow-[0_0_15px_rgba(0,200,232,0.15)]"
                >
                  <Phone className="w-4 h-4 text-[#00C8E8] group-hover:scale-110 transition-transform" />
                  <span>{EVENT_DETAILS.contactPhoneFormatted}</span>
                </a>
                <p className="text-[11px] text-[#A4B6BF] mt-2">
                  Click to dial directly for student registration queries and coordination.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3.5 border-t border-white/10 text-[10px] font-mono text-[#A4B6BF]/60">
            OFFICIAL HOTLINE // 7022951232
          </div>
        </div>
      </div>
    </section>
  );
}

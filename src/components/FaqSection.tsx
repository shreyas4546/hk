import { useState } from "react";
import { ArrowUpRight, Phone, HelpCircle } from "lucide-react";
import { FAQS, EVENT_DETAILS } from "../data/eventData";
import NorrisHeadline from "./ui/norris-headline";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section id="faq" className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gradient-to-r from-[#00C8E8]/08 via-[#07131C]/50 to-transparent blur-[140px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 sm:mb-16 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07131C]/85 border border-[#00C8E8]/30 text-xs font-mono text-[#8DEBFF] mb-3 shadow-[0_0_15px_rgba(0,200,232,0.15)]">
            <HelpCircle className="w-3.5 h-3.5 text-[#00C8E8]" />
            <span>VERIFIED INFORMATION</span>
          </div>
          <NorrisHeadline className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F3F8FA]">
            FREQUENTLY ASKED <br className="hidden sm:inline" />
            <span className="cyan-turquoise-text">QUESTIONS</span>
          </NorrisHeadline>
        </div>
        <p className="text-sm sm:text-base text-[#A4B6BF] font-['Inter',sans-serif] max-w-md text-left md:text-right">
          Official, verified answers derived directly from the HackIgnite 1.0 announcement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Visual Support Card */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="sci-fi-card p-6 flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-[#07131C] border border-[#00C8E8]/30 flex items-center justify-center text-[#8DEBFF] mb-4 shadow-[0_0_20px_rgba(0,200,232,0.2)]">
              <Phone className="w-7 h-7 text-[#00C8E8]" />
            </div>
            <div className="text-xs font-mono text-[#8DEBFF] mb-1">EVENT COORDINATION</div>
            <h4 className="font-['Space_Grotesk'] font-bold text-lg text-[#F3F8FA] mb-2">Have Direct Questions?</h4>
            <p className="text-xs text-[#A4B6BF] leading-relaxed mb-5 font-['Inter',sans-serif]">
              Connect directly with Coordinator {EVENT_DETAILS.coordinator} for official event assistance.
            </p>
            <a
              href={`tel:${EVENT_DETAILS.contactPhone}`}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold text-[#F3F8FA] bg-[#07131C] border border-[#00C8E8]/40 hover:border-[#00C8E8] hover:text-[#8DEBFF] transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#00C8E8]" />
              <span>Call {EVENT_DETAILS.contactPhoneFormatted}</span>
            </a>
          </div>
        </div>

        {/* Right Accordion List */}
        <div className="lg:col-span-8 divide-y divide-white/10">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-5 sm:py-6 first:pt-0">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-left group gap-4 transition-colors focus:outline-none cursor-pointer"
                >
                  <span
                    className={`font-['Space_Grotesk'] text-base sm:text-lg font-bold transition-colors ${isOpen ? "text-[#8DEBFF]" : "text-[#F3F8FA] group-hover:text-[#8DEBFF]"
                      }`}
                  >
                    {faq.question}
                  </span>

                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen
                        ? "bg-gradient-to-r from-[#00C8E8] to-[#19D8E8] text-[#050708] border-[#00C8E8] rotate-90 shadow-[0_0_15px_rgba(0,200,232,0.4)]"
                        : "cosmic-glass text-[#A4B6BF] border-white/20 group-hover:border-[#00C8E8] group-hover:text-white"
                      }`}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3.5 pr-8 text-sm text-[#A4B6BF] font-['Inter',sans-serif] leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                    <p>{faq.answer}</p>
                    <div className="mt-2.5 inline-block text-[10px] font-mono text-[#8DEBFF]/80">
                      CATEGORY // {faq.category.toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

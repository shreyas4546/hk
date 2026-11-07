import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FAQS } from "../data/eventData";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section id="faq" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header matching Astrovue reference */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-[#20CFFF]/20">
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-[#07111D] border border-[#20CFFF]/30 text-xs font-mono text-[#8DEBFF] mb-3">
            FAQ
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white">
            Frequently Asked <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20CFFF] to-[#8DEBFF]">Questions</span>
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#9AAFC1] max-w-md text-left md:text-right">
          Clear, verified parameters for student developers, team formations, hardware logistics, and evaluation criteria.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Visual Holographic Card with Astronaut Visor (exact match to Astrovue reference!) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="sci-fi-card p-6 flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-48 h-48 rounded-2xl overflow-hidden mb-4 border border-[#20CFFF]/40 shadow-[0_0_20px_rgba(32,207,255,0.25)]">
              <img
                src="/src/assets/images/track_ai_astronaut_1794046418232.jpg"
                alt="Astronaut Assistant"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs font-mono text-[#20CFFF] mb-1">SUPPORT BEACON</div>
            <h4 className="font-display font-bold text-base text-white mb-2">Have More Queries?</h4>
            <p className="text-xs text-[#9AAFC1] leading-relaxed mb-4">
              Our mentorship coordinators and student desk are available 24/7 on Discord and email for squad clarifications.
            </p>
            <a
              href="mailto:hackignite@campus.edu"
              className="px-4 py-2 rounded-full text-xs font-bold text-[#8DEBFF] cosmic-glass border border-[#20CFFF]/40 hover:bg-[#20CFFF]/20 transition-colors"
            >
              Contact Support Beacon
            </a>
          </div>
        </div>

        {/* Right Accordion List */}
        <div className="lg:col-span-8 divide-y divide-[#20CFFF]/20">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-6 first:pt-0">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-left group gap-4 transition-colors focus:outline-none"
                >
                  <span
                    className={`font-display text-base sm:text-xl font-bold transition-colors ${
                      isOpen ? "text-[#8DEBFF]" : "text-white group-hover:text-[#8DEBFF]"
                    }`}
                  >
                    {faq.question}
                  </span>

                  {/* Circular ↗ arrow icon matching the reference */}
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#20CFFF] text-[#030609] border-[#20CFFF] rotate-90 shadow-[0_0_15px_#20CFFF]"
                        : "cosmic-glass text-[#9AAFC1] border-[#20CFFF]/30 group-hover:border-[#20CFFF] group-hover:text-white"
                    }`}
                  >
                    <ArrowUpRight className="w-5 h-5 transition-transform" />
                  </div>
                </button>

                {/* Animated expandable content */}
                {isOpen && (
                  <div className="mt-4 pr-12 text-sm sm:text-base text-[#9AAFC1] leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                    <p>{faq.answer}</p>
                    <div className="mt-3 inline-block text-[11px] font-mono text-[#20CFFF]/80">
                      CATEGORY // {faq.category}
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

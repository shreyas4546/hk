import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import {
  EffectCoverflow,
  Autoplay,
  Scrollbar,
  Mousewheel,
  Navigation,
} from "swiper/modules";
import {
  Trophy,
  Award,
  Shield,
  Flag,
  Compass,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import NorrisHeadline from "./ui/norris-headline";

interface WhyHackIgniteProps {
  onOpenRegister?: (trackId?: string) => void;
}

export default function WhyHackIgnite({ onOpenRegister }: WhyHackIgniteProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const places = [
    {
      num: "01",
      label: "Winner",
      subtitle: "Pinnacle Achievement",
      icon: Trophy,
      badge: "WINNER // CHAMPION",
      image: "/assets/cards/place-1-gold.webp",
      desc: "The supreme honor of HackIgnite 1.0. Awarded to the team delivering the most exceptional technological engineering, viable product architecture, and captivating pitch demonstration.",
      cta: "Aim For Winner",
      isApex: true,
    },
    {
      num: "02",
      label: "Runner Up",
      subtitle: "Excellence in Engineering",
      icon: Award,
      badge: "RUNNER-UP",
      image: "/assets/cards/place-2-silver.webp",
      desc: "Recognizing first-class technical prowess, deep architectural rigor, and robust full-stack execution engineered during the intense 24-hour innovation marathon.",
      cta: "Target Runner Up",
    },
    {
      num: "03",
      label: "Second Runner Up",
      subtitle: "Outstanding Innovation",
      icon: Shield,
      badge: "2ND RUNNER-UP",
      image: "/assets/cards/place-3-bronze.webp",
      desc: "Honoring daring creativity, breakthrough problem framing, and original solutions addressing critical domains in AI, sustainability, healthcare, and open tech.",
      cta: "Compete For 2nd Runner Up",
    },
    {
      num: "04",
      label: "Best Development",
      subtitle: "Architecture & Code Rigor",
      icon: Flag,
      badge: "BEST DEVELOPMENT",
      image: "/assets/cards/place-4-distinction.webp",
      desc: "Awarded to the team delivering the most robust software architecture, exceptional code quality, technical complexity, and high-performance engineering.",
      cta: "Build Best Development",
    },
    {
      num: "05",
      label: "Best Project",
      subtitle: "Complete Viability & Impact",
      icon: Compass,
      badge: "BEST PROJECT",
      image: "/assets/cards/place-5-merit.webp",
      desc: "Celebrating the most complete, functional, and impactful solution demonstrating real-world viability, seamless user experience, and outstanding presentation.",
      cta: "Create Best Project",
    },
  ];

  return (
    <section
      id="conquer"
      className="conquer-section relative w-full min-w-0 max-w-7xl py-16 sm:py-20 px-4 sm:px-6 lg:px-8 mx-auto z-10 overflow-hidden bg-transparent"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07131C]/80 backdrop-blur-md border border-[#00C8E8]/30 text-xs font-mono text-[#8DEBFF] mb-3 shadow-[0_0_20px_rgba(0,200,232,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8] animate-pulse" />
          <span>COMPETITION HIGHLIGHT // PODIUM AWARDS</span>
        </div>
        <NorrisHeadline className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F3F8FA] mb-3 uppercase tracking-tight">
          5 PLACES TO <span className="cyan-turquoise-text">CONQUER</span>
        </NorrisHeadline>
        <p className="text-sm sm:text-base text-[#F3F8FA]/90 font-['Inter',sans-serif] leading-relaxed max-w-xl mx-auto">
          Five competitive positions open for teams rising to solve real-world challenges during the 24-hour innovation challenge.
        </p>
      </div>

      {/* Outer Article & Section Wrapper */}
      <article className="w-full min-w-0 max-w-full overflow-hidden bg-transparent">
        <div className="conquer-sectionWrapper w-full min-w-0 max-w-full overflow-hidden bg-transparent">
          <Swiper
            modules={[EffectCoverflow, Autoplay, Scrollbar, Mousewheel, Navigation]}
            onSwiper={setSwiperInstance}
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
            direction="horizontal"
            loop={false}
            speed={600}
            centeredSlides={true}
            initialSlide={0}
            slideToClickedSlide={false}
            preventClicks={false}
            preventClicksPropagation={false}
            touchStartPreventDefault={false}
            noSwiping={true}
            noSwipingClass="swiper-no-swiping"
            noSwipingSelector=".conquer-cta-btn"
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 160,
              modifier: 1,
              scale: 0.88,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            scrollbar={{
              el: ".conquer-swiper-scrollbar",
              draggable: true,
            }}
            navigation={{
              prevEl: ".conquer-prev-btn",
              nextEl: ".conquer-next-btn",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.15,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 1.6,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2.6,
                spaceBetween: 32,
              },
              1280: {
                slidesPerView: 3.2,
                spaceBetween: 36,
              },
            }}
            className="conquer-swiper w-full min-w-0 max-w-full bg-transparent"
          >
            {places.map((place, idx) => {
              const Icon = place.icon;
              return (
                <SwiperSlide key={place.num}>
                  <div
                    className="cardPopout"
                    onClick={() => {
                      if (swiperInstance && activeIndex !== idx) {
                        swiperInstance.slideTo(idx);
                      }
                    }}
                  >
                    {/* Top Header with Badge & Rank */}
                    <div className="w-full flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                      <span
                        className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border ${
                          place.isApex
                            ? "bg-[#00C8E8]/15 border-[#00C8E8]/40 text-[#8DEBFF]"
                            : "bg-white/5 border-white/10 text-white/70"
                        }`}
                      >
                        {place.badge}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#00C8E8]">{place.num}</span>
                    </div>

                    {/* Thematic Header Visual with Overlay & Icon */}
                    <div className="cardPopout-img-wrapper">
                      <img
                        src={place.image}
                        alt={place.label}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#04080D]/40 via-transparent to-transparent pointer-events-none" />
                      <div
                        className={`absolute bottom-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-md ${
                          place.isApex
                            ? "bg-[#00C8E8]/20 border border-[#00C8E8] text-[#8DEBFF] shadow-[0_0_15px_rgba(0,200,232,0.4)]"
                            : "bg-[#07131C]/90 border border-white/20 text-[#00C8E8]"
                        }`}
                      >
                        <Icon className="w-5 h-5 text-[#00C8E8]" />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="title">
                      {place.label}
                    </h2>

                    {/* Subtitle */}
                    <h4 className="subtitle">
                      {place.subtitle}
                    </h4>

                    {/* Figcaption with description */}
                    <figcaption>
                      <p>{place.desc}</p>
                    </figcaption>

                    {/* Slide-out Action CTA Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (onOpenRegister) {
                          onOpenRegister();
                        } else {
                          const reg = document.getElementById("register");
                          if (reg) reg.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                      className="conquer-cta-btn swiper-no-swiping cursor-pointer relative z-50 pointer-events-auto"
                      aria-label={`Register for ${place.label}`}
                    >
                      <span className="pointer-events-none">{place.cta}</span>
                      <ArrowRight className="w-4 h-4 ml-2 pointer-events-none" />
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Controls Bar: Navigation Chevrons + Telemetry Position Indicator */}
          <div className="flex items-center justify-between mt-8 px-2 max-w-xl mx-auto">
            <button
              className="conquer-prev-btn w-10 h-10 rounded-full bg-[#07131C]/80 hover:bg-[#00C8E8]/20 border border-white/10 hover:border-[#00C8E8]/50 flex items-center justify-center text-white/80 hover:text-[#00C8E8] transition-all cursor-pointer shadow-lg active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 font-mono text-xs text-[#8DEBFF]">
              <span className="w-2 h-2 rounded-full bg-[#00C8E8] animate-pulse" />
              <span>POSITION // 0{activeIndex + 1} OF 05</span>
            </div>

            <button
              className="conquer-next-btn w-10 h-10 rounded-full bg-[#07131C]/80 hover:bg-[#00C8E8]/20 border border-white/10 hover:border-[#00C8E8]/50 flex items-center justify-center text-white/80 hover:text-[#00C8E8] transition-all cursor-pointer shadow-lg active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Custom Styled Swiper Scrollbar */}
          <div className="conquer-swiper-scrollbar swiper-scrollbar max-w-md mx-auto" />
        </div>
      </article>
    </section>
  );
}

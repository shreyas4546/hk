import { useState } from "react";
import { ChevronLeft, ChevronRight, Layers, ArrowUpRight, Cpu } from "lucide-react";
import { TRACKS } from "../data/eventData";

interface TracksSectionProps {
  onSelectTrack: (trackId: string) => void;
}

export default function TracksSection({ onSelectTrack }: TracksSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(0);

  const categories = ["All", "AI & ML", "Web3", "Cybersecurity", "Open Track"];

  const filteredTracks =
    activeCategory === "All"
      ? TRACKS
      : TRACKS.filter((t) => t.category === activeCategory);

  const currentTrack = filteredTracks[selectedTrackIndex] || filteredTracks[0] || TRACKS[0];

  const handlePrev = () => {
    setSelectedTrackIndex((prev) => (prev > 0 ? prev - 1 : filteredTracks.length - 1));
  };

  const handleNext = () => {
    setSelectedTrackIndex((prev) => (prev < filteredTracks.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="tracks" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#168BFF]/10 via-[#20CFFF]/15 to-transparent blur-[140px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
          EXPLORE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20CFFF] to-[#8DEBFF]">TRACKS</span>
        </h2>
        <p className="text-base sm:text-lg text-[#9AAFC1]">
          Choose your battleground. Formulate solutions tailored for real planetary impact across frontier domains.
        </p>
      </div>

      {/* Filter / Connector Bar matching the reference (―●― style) */}
      <div className="flex flex-col items-center justify-center gap-6 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full cosmic-glass border border-[#20CFFF]/30">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedTrackIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#168BFF] to-[#20CFFF] text-white cyan-btn-glow"
                  : "text-[#9AAFC1] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Luminous Connector Line with Dot */}
        <div className="flex items-center gap-2 text-[#20CFFF]/60 w-64 max-w-full">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#20CFFF]" />
          <div className="w-2 h-2 rounded-full bg-[#20CFFF] shadow-[0_0_8px_#20CFFF]" />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#20CFFF]" />
        </div>
      </div>

      {/* Multi-Card Futuristic Showcase (Fluxar / Orvox / Zenith style from reference) */}
      <div className="relative">
        {/* Navigation Chevrons */}
        <button
          onClick={handlePrev}
          aria-label="Previous track"
          className="absolute left-1 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-9 sm:w-11 h-9 sm:h-11 rounded-full cosmic-glass border border-[#20CFFF]/40 flex items-center justify-center text-[#8DEBFF] hover:bg-[#20CFFF]/20 hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        >
          <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next track"
          className="absolute right-1 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-9 sm:w-11 h-9 sm:h-11 rounded-full cosmic-glass border border-[#20CFFF]/40 flex items-center justify-center text-[#8DEBFF] hover:bg-[#20CFFF]/20 hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        >
          <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
        </button>

        {/* Track Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTracks.map((track) => {
            const isSelected = track.id === currentTrack.id;
            return (
              <div
                key={track.id}
                onClick={() => onSelectTrack(track.id)}
                className={`sci-fi-card cursor-pointer group flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? "ring-2 ring-[#20CFFF] shadow-[0_0_35px_rgba(32,207,255,0.3)] scale-[1.02]"
                    : "opacity-90 hover:opacity-100"
                }`}
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#07111D]">
                  <img
                    src={track.image}
                    alt={track.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Atmospheric Cyan Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1724] via-transparent to-transparent opacity-90" />

                  {/* Corner Code Tag */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded cosmic-glass border border-[#20CFFF]/40 text-[10px] font-mono text-[#8DEBFF]">
                    {track.code}
                  </div>

                  {/* Status chip matching reference (e.g., Orvox / Digital speed) */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#07111D]/80 border border-[#20CFFF]/30 text-[11px] font-mono text-[#20CFFF]">
                    {track.status}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-[#8DEBFF] transition-colors mb-1.5 flex items-center justify-between">
                      <span>{track.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#20CFFF]" />
                    </h3>
                    <p className="text-xs text-[#9AAFC1] line-clamp-2 mb-4 leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {track.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#07111D] text-[#8DEBFF]/80 border border-[#20CFFF]/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Prize allocation */}
                    <div className="pt-3 border-t border-[#20CFFF]/15 flex items-center justify-between text-xs">
                      <span className="text-[#9AAFC1]">Track Bounty</span>
                      <span className="font-bold text-white font-mono">{track.prize}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Track Detailed Feature Banner */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl cosmic-glass border border-[#20CFFF]/40 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#20CFFF] mb-2 font-['Space_Grotesk']">
              <Cpu className="w-4 h-4" />
              <span>Track Focus · {currentTrack.code}</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
              {currentTrack.name}
            </h3>
            <p className="text-sm text-[#9AAFC1] max-w-2xl leading-relaxed">
              {currentTrack.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTrack(currentTrack.id)}
              className="px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#168BFF] to-[#20CFFF] cyan-btn-glow flex items-center gap-2"
            >
              <span>Build for this Track</span>
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect, lazy, Suspense } from "react";
import { ZeroGravityBackground } from "./components/ui/zero-gravity-background";
import CinematicPreloader from "./components/ui/CinematicPreloader";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import EventOverview from "./components/EventOverview";
import TracksRulesSection from "./components/TracksRulesSection";
import EventSchedule from "./components/EventSchedule";
import MissionSection from "./components/MissionSection";
import WhyHackIgnite from "./components/WhyHackIgnite";
import RegistrationSection from "./components/RegistrationSection";
import SponsorsOrganizers from "./components/SponsorsOrganizers";
import SponsorsSection from "./components/SponsorsSection";
import Footer from "./components/Footer";

// Lazy-loaded components below the fold for fast initial paint and low mobile memory overhead
const VenueMapSection = lazy(() => import("./components/VenueMapSection"));
const FaqSection = lazy(() => import("./components/FaqSection"));
const AiEventAssistant = lazy(() => import("./components/AiEventAssistant"));
const RegistrationModal = lazy(() => import("./components/RegistrationModal"));

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string>("open-innovation");

  useEffect(() => {
    // Preload below-the-fold chunks during browser idle time
    const preloader = () => {
      import("./components/RegistrationModal");
      import("./components/VenueMapSection");
      import("./components/FaqSection");
      import("./components/AiEventAssistant");
    };
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const handle = (window as any).requestIdleCallback(preloader);
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(preloader, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenRegister = (trackId?: string) => {
    if (trackId) {
      setSelectedTrackId(trackId);
    }
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#050708] text-[#F3F8FA] overflow-x-clip selection:bg-[#00C8E8]/30 selection:text-[#8DEBFF]">
      {/* Cinematic Brand Intro / Preloader (Full Page Load & Refresh Only) */}
      {!isIntroComplete && (
        <CinematicPreloader onComplete={() => setIsIntroComplete(true)} />
      )}

      {/* Zero Gravity Interactive Particle & Ambient Cosmic Background */}
      <ZeroGravityBackground />

      {/* Floating Glass Navigation */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      {/* Main Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Section A: Cinematic Hero */}
        <HeroSection onOpenRegister={() => handleOpenRegister()} />

        {/* Section B & C: About Event & Event Details */}
        <EventOverview />

        {/* Feature 4: Interactive Tracks & Rules (Choose Your Challenge) */}
        <TracksRulesSection onOpenRegister={() => handleOpenRegister()} />

        {/* Feature 3: Interactive Two-Day Event Schedule */}
        <EventSchedule />

        {/* Section D: Event Pillars (Think · Build · Innovate · Impact) */}
        <MissionSection />

        {/* Section E: Competition Highlight (5 Places to Conquer) */}
        <WhyHackIgnite onOpenRegister={() => handleOpenRegister()} />

        {/* Section F: Entry Fee & Live Countdown */}
        <RegistrationSection onOpenRegister={() => handleOpenRegister()} />

        {/* Feature 1: Interactive JCET Campus Venue Map */}
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <VenueMapSection />
        </Suspense>

        {/* Section H: Verified FAQ */}
        <Suspense fallback={<div className="min-h-[300px]" />}>
          <FaqSection />
        </Suspense>

        {/* Section G: Organizing Institution & Coordinator Contact */}
        <SponsorsOrganizers />

        {/* Feature: Official Sponsors & Partners Scroller */}
        <SponsorsSection />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Feature 5: AI Event Assistant (Floating Intelligent Assistant) */}
      <Suspense fallback={null}>
        <AiEventAssistant />
      </Suspense>

      {/* Interactive Registration Portal / Modal (Code-split for performance) */}
      <Suspense fallback={null}>
        {isRegisterModalOpen && (
          <RegistrationModal
            isOpen={isRegisterModalOpen}
            onClose={handleCloseRegister}
            preSelectedTrackId={selectedTrackId}
          />
        )}
      </Suspense>
    </div>
  );
}

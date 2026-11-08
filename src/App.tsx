import { useState } from "react";
import { ZeroGravityBackground } from "./components/ui/zero-gravity-background";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import EventOverview from "./components/EventOverview";
import TracksRulesSection from "./components/TracksRulesSection";
import EventSchedule from "./components/EventSchedule";
import MissionSection from "./components/MissionSection";
import WhyHackIgnite from "./components/WhyHackIgnite";
import RegistrationSection from "./components/RegistrationSection";
import VenueMapSection from "./components/VenueMapSection";
import FaqSection from "./components/FaqSection";
import SponsorsOrganizers from "./components/SponsorsOrganizers";
import SponsorsSection from "./components/SponsorsSection";
import Footer from "./components/Footer";
import AiEventAssistant from "./components/AiEventAssistant";
import RegistrationModal from "./components/RegistrationModal";

export default function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string>("open-innovation");

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
        <VenueMapSection />

        {/* Section H: Verified FAQ */}
        <FaqSection />

        {/* Section G: Organizing Institution & Coordinator Contact */}
        <SponsorsOrganizers />

        {/* Feature: Official Sponsors & Partners Scroller */}
        <SponsorsSection />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Feature 5: AI Event Assistant (Floating Intelligent Assistant) */}
      <AiEventAssistant />

      {/* Interactive Registration Portal / Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegister}
        preSelectedTrackId={selectedTrackId}
      />
    </div>
  );
}

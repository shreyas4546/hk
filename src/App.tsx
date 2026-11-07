import { useState } from "react";
import CosmicCanvas from "./components/CosmicCanvas";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import EventOverview from "./components/EventOverview";
import TracksSection from "./components/TracksSection";
import MissionSection from "./components/MissionSection";
import TimelineSection from "./components/TimelineSection";
import WhyHackIgnite from "./components/WhyHackIgnite";
import RegistrationSection from "./components/RegistrationSection";
import FaqSection from "./components/FaqSection";
import SponsorsOrganizers from "./components/SponsorsOrganizers";
import Footer from "./components/Footer";
import RegistrationModal from "./components/RegistrationModal";

export default function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string>("ai-intelligence");

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
    <div className="relative min-h-screen bg-[#030609] text-[#F5FAFF] overflow-x-hidden selection:bg-[#20CFFF]/30 selection:text-[#8DEBFF]">
      {/* 3D Particle Cosmic Canvas Background */}
      <CosmicCanvas />

      {/* Floating Glass Navigation */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      {/* Main Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Section 02: Cinematic Hero */}
        <HeroSection onOpenRegister={() => handleOpenRegister()} />

        {/* Section 03: Event Overview */}
        <EventOverview />

        {/* Section 04: Explore The Tracks */}
        <TracksSection onSelectTrack={(trackId) => handleOpenRegister(trackId)} />

        {/* Section 05: The Mission */}
        <MissionSection />

        {/* Section 06: Event Timeline */}
        <TimelineSection />

        {/* Section 07: Why HackIgnite */}
        <WhyHackIgnite />

        {/* Section 08: Registration CTA */}
        <RegistrationSection onOpenRegister={() => handleOpenRegister()} />

        {/* Section 09: FAQ */}
        <FaqSection />

        {/* Section 10: Organizers & Sponsors */}
        <SponsorsOrganizers />
      </main>

      {/* Section 11: Minimal Futuristic Footer */}
      <Footer />

      {/* Interactive Registration Portal / Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegister}
        preSelectedTrackId={selectedTrackId}
      />
    </div>
  );
}

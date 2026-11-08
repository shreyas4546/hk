import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";

interface NavbarProps {
  onOpenRegister: () => void;
}

export default function Navbar({ onOpenRegister }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#hero");

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#overview" },
    { label: "Tracks & Rules", href: "#tracks-rules" },
    { label: "Schedule", href: "#schedule" },
    { label: "Pillars", href: "#pillars" },
    { label: "Register", href: "#register" },
    { label: "Venue", href: "#venue" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
    { label: "Sponsors", href: "#sponsors" },
  ];

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.substring(1));
    let animId: number = 0;
    let lastActive = "#hero";
    let lastScrolled = false;

    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        const scrolled = window.scrollY > 20;
        if (scrolled !== lastScrolled) {
          lastScrolled = scrolled;
          setIsScrolled(scrolled);
        }

        // Check if user has scrolled near bottom of page (activate #sponsors)
        const docHeight = document.documentElement.scrollHeight;
        const scrollBottom = window.innerHeight + window.scrollY;
        if (scrollBottom >= docHeight - 100) {
          if (lastActive !== "#sponsors") {
            lastActive = "#sponsors";
            setActiveSection("#sponsors");
          }
          return;
        }

        // Detection threshold: 180px below viewport top
        const scrollPos = window.scrollY + 180;
        let currentActive = "#hero";

        for (let i = 0; i < sectionIds.length; i++) {
          const id = sectionIds[i];
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            if (top <= scrollPos) {
              currentActive = `#${id}`;
            }
          }
        }

        if (currentActive !== lastActive) {
          lastActive = currentActive;
          setActiveSection(currentActive);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on mount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    setMobileMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 flex items-center ${isScrolled
          ? "bg-[#050708]/85 backdrop-blur-xl border-b border-[#00C8E8]/20 shadow-[0_8px_32px_rgba(0,0,0,0.85)]"
          : "bg-[#050708]/35 backdrop-blur-md border-b border-white/5"
        }`}
    >
      {/* Bottom glowing animated accent highlight on navbar boundary */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C8E8]/50 to-transparent pointer-events-none transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-30"
          }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2.5 group whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="HackIgnite 1.0 Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00C8E8] to-[#19D8E8] p-[1.5px] shadow-[0_0_12px_rgba(0,200,232,0.3)]">
              <div className="w-full h-full bg-[#07131C] rounded-[7px] flex items-center justify-center group-hover:bg-[#09232B] transition-colors">
                <span className="font-['Space_Grotesk'] font-bold text-xs text-[#00C8E8] tracking-tight">HI</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-['Space_Grotesk'] font-bold text-base sm:text-lg lg:text-xl tracking-tight text-[#F3F8FA]">
                HACK<span className="text-[#00C8E8]">IGNITE</span>
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-semibold text-[#8DEBFF]/90 tracking-wider">1.0</span>
            </div>
          </a>

          {/* Desktop Navigation Links with Traveling Active Indicator Line */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1.5 text-xs lg:text-[13px] font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-2.5 lg:px-3 py-1.5 rounded-full font-['Inter',sans-serif] tracking-wide transition-colors duration-200 cursor-pointer ${isActive
                      ? "text-[#8DEBFF] font-semibold"
                      : "text-[#A4B6BF] hover:text-white"
                    }`}
                >
                  {/* Active Traveling Glowing Line Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute -bottom-1 inset-x-2 h-[2px] bg-gradient-to-r from-[#00C8E8] via-[#8DEBFF] to-[#00C8E8] rounded-full shadow-[0_0_10px_rgba(0,200,232,0.9)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Active Traveling Ambient Pill Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-[#00C8E8]/10 rounded-full -z-10 border border-[#00C8E8]/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action / Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop Register Button */}
            <button
              onClick={onOpenRegister}
              className="hidden md:inline-flex items-center justify-center px-5 py-2 text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-[#050708] bg-gradient-to-r from-[#00C8E8] via-[#19D8E8] to-[#00C8E8] bg-[length:200%_auto] hover:bg-[position:right_center] rounded-full cyan-btn-glow transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
            >
              REGISTER NOW
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#A4B6BF] hover:text-[#F3F8FA] rounded-lg hover:bg-[#07131C] border border-[#00C8E8]/20 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#F3F8FA]" /> : <Menu className="w-5 h-5 text-[#F3F8FA]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Active Section Highlighting */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-3.5 rounded-xl bg-[#07131C]/98 backdrop-blur-2xl border border-[#00C8E8]/30 shadow-[0_12px_40px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all font-['Inter',sans-serif] flex items-center justify-between cursor-pointer ${isActive
                        ? "bg-[#00C8E8]/15 text-[#8DEBFF] font-semibold border-l-2 border-[#00C8E8] shadow-[inset_0_0_12px_rgba(0,200,232,0.15)]"
                        : "text-[#A4B6BF] hover:text-[#F3F8FA] hover:bg-[#050708]/60"
                      }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8] shadow-[0_0_8px_#00C8E8]" />
                    )}
                  </a>
                );
              })}
              <div className="pt-2.5 mt-1 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full py-2.5 text-center text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-[#050708] bg-gradient-to-r from-[#00C8E8] to-[#19D8E8] rounded-lg cyan-btn-glow cursor-pointer"
                >
                  REGISTER NOW
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

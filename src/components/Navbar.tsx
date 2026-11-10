import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import HackIgniteLogo from "./ui/HackIgniteLogo";

interface NavbarProps {
  onOpenRegister: () => void;
}

export default function Navbar({ onOpenRegister }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#hero");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile menu is open to prevent page drift
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

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
    let sectionCache: Array<{ id: string; top: number }> = [];

    const measureSections = () => {
      sectionCache = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop } : null;
        })
        .filter(Boolean) as Array<{ id: string; top: number }>;
    };

    measureSections();
    window.addEventListener("resize", measureSections, { passive: true });

    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        const scrolled = window.scrollY > 20;
        if (scrolled !== lastScrolled) {
          lastScrolled = scrolled;
          React.startTransition(() => {
            setIsScrolled(scrolled);
          });
        }

        // Check if user has scrolled near bottom of page (activate #sponsors)
        const docHeight = document.documentElement.scrollHeight;
        const scrollBottom = window.innerHeight + window.scrollY;
        if (scrollBottom >= docHeight - 100) {
          if (lastActive !== "#sponsors") {
            lastActive = "#sponsors";
            React.startTransition(() => {
              setActiveSection("#sponsors");
            });
          }
          return;
        }

        // Detection threshold: 180px below viewport top
        const scrollPos = window.scrollY + 180;
        let currentActive = "#hero";

        for (let i = 0; i < sectionCache.length; i++) {
          const s = sectionCache[i];
          if (s.top <= scrollPos) {
            currentActive = `#${s.id}`;
          }
        }

        if (currentActive !== lastActive) {
          lastActive = currentActive;
          React.startTransition(() => {
            setActiveSection(currentActive);
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on mount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measureSections);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] h-16 transition-all duration-300 flex items-center ${isScrolled || mobileMenuOpen
          ? "bg-[#050708]/90 backdrop-blur-xl border-b border-[#00C8E8]/20 shadow-[0_8px_32px_rgba(0,0,0,0.85)]"
          : "bg-[#050708]/35 backdrop-blur-md border-b border-white/5"
          }`}
      >
        {/* Bottom glowing animated accent highlight on navbar boundary */}
        <div
          className={`absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C8E8]/50 to-transparent pointer-events-none transition-opacity duration-300 ${isScrolled || mobileMenuOpen ? "opacity-100" : "opacity-30"
            }`}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between">
            {/* Logo & Brand (Living Cyber Emblem) */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="cursor-pointer"
              aria-label="HackIgnite 1.0 Home"
            >
              <HackIgniteLogo size="md" />
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
        </div>
      </header>

      {/* Mobile Navigation Drawer Portaled Directly to Body to Guarantee 100% Viewport Alignment */}
      {mobileMenuOpen && mounted && createPortal(
        <div className="md:hidden fixed inset-0 z-50 pointer-events-auto">
          {/* Subtle Dimming Backdrop - Tapping outside closes menu */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Dropdown Panel - Always begins exactly below the 64px header (top: 4.25rem = 68px) */}
          <div
            id="mobile-nav-dropdown"
            role="dialog"
            aria-label="Mobile Navigation"
            className="fixed top-[4.25rem] inset-x-3.5 sm:inset-x-6 max-w-md mx-auto z-10 p-3.5 rounded-2xl bg-[#07131C]/98 backdrop-blur-2xl border border-[#00C8E8]/35 shadow-[0_16px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(0,200,232,0.15)] max-h-[calc(100vh-5.25rem)] max-h-[calc(100dvh-5.25rem)] overflow-y-auto overscroll-contain animate-in fade-in slide-in-from-top-2 duration-200"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3.5 py-2.5 text-sm font-medium rounded-lg transition-all font-['Inter',sans-serif] flex items-center justify-between cursor-pointer ${isActive
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
        </div>,
        document.body
      )}
    </>
  );
}

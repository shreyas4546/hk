import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenRegister: () => void;
}

export default function Navbar({ onOpenRegister }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#overview" },
    { label: "Tracks", href: "#tracks" },
    { label: "Mission", href: "#mission" },
    { label: "Timeline", href: "#timeline" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#030609]/80 backdrop-blur-md border-b border-[#20CFFF]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark & emblem */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2.5 group whitespace-nowrap shrink-0"
            aria-label="HackIgnite 1.0 Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#20CFFF] to-[#168BFF] p-[1px] shadow-[0_0_15px_rgba(32,207,255,0.4)]">
              <div className="w-full h-full bg-[#07111D] rounded-lg flex items-center justify-center group-hover:bg-[#0A1724] transition-colors">
                <Sparkles className="w-4 h-4 text-[#8DEBFF] transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-lg sm:text-xl tracking-wider text-white">
                HACK<span className="text-[#20CFFF]">IGNITE</span>
              </span>
              <span className="text-xs font-mono font-semibold text-[#8DEBFF]/80">1.0</span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#9AAFC1]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#8DEBFF] hover:drop-shadow-[0_0_8px_rgba(32,207,255,0.6)] transition-all whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRegister}
              className="relative group px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#168BFF] to-[#20CFFF] rounded-full cyan-btn-glow transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Register Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#9AAFC1] hover:text-white rounded-lg hover:bg-[#0A1724] border border-[#20CFFF]/20 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-xl cosmic-glass border border-[#20CFFF]/30 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 text-sm font-medium text-[#9AAFC1] hover:text-[#8DEBFF] hover:bg-[#0A1724]/60 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-[#20CFFF]/20">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-[#168BFF] to-[#20CFFF] rounded-lg cyan-btn-glow"
                >
                  Register Now
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

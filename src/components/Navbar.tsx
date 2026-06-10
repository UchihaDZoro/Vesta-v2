import React, { useState, useEffect } from "react";
import VestaLogo from "./VestaLogo";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About Us", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Mission", href: "#mission" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b border-[#EBE9E2]/80 py-4 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand Links */}
          <a href="#" className="flex items-center gap-1 focus:outline-none">
            <VestaLogo size={42} showText={true} />
          </a>

          {/* Desktop Links Group */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer relative py-1 focus:outline-none"
              >
                {link.name}
                {/* Subtle active underlines under links */}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-300 hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Action CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleLinkClick("#contact")}
              className="px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase text-[#0A0A0A] bg-brand-gold hover:bg-brand-gold-light transition-all duration-300 shadow-[0_4px_20px_rgba(212,166,74,0.15)] hover:shadow-[0_4px_28px_rgba(212,166,74,0.3)] hover:-translate-y-0.5 cursor-pointer"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-800 hover:text-brand-gold transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Backdrop & Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 top-0 pt-24 pb-8 px-6 bg-[#FCFAF7]/95 backdrop-blur-xl border-b border-[#EBE9E2] z-40 md:hidden flex flex-col gap-6 shadow-md"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-left text-lg font-medium text-neutral-700 hover:text-brand-gold py-2 border-b border-neutral-100 cursor-pointer focus:outline-none"
                >
                  {link.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => handleLinkClick("#contact")}
              className="w-full py-3.5 rounded-lg text-sm font-bold tracking-widest uppercase text-[#0A0A0A] bg-gradient-to-r from-brand-teal to-brand-gold hover:opacity-90 transition-all duration-300 shadow-[0_4px_20px_rgba(212,166,74,0.1) ] cursor-pointer"
            >
              Get in Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

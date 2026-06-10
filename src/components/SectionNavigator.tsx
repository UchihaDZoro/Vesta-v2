import React, { useEffect, useState, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SECTIONS = [
  { id: "hero", label: "Home", num: "01" },
  { id: "about", label: "About Us", num: "02" },
  { id: "products", label: "Products", num: "03" },
  { id: "mission", label: "Core Beliefs", num: "04" },
  { id: "vision", label: "Our Vision", num: "05" },
  { id: "faq", label: "FAQ", num: "06" },
  { id: "contact-footer", label: "Connect", num: "07"}
];

export default function SectionNavigator() {
  const [activeId, setActiveId] = useState("hero");
  const [showScrollUp, setShowScrollUp] = useState(false);
  const lockScrollRef = useRef(false);

  useEffect(() => {
    // 1. Set up IntersectionObserver to detect which section occupies most of the screen
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px", // Trigger when section fills substantial viewport area
      threshold: 0.2
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the entry that has the highest intersection ratio
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) {
        setActiveId(visible.target.id);
        setShowScrollUp(visible.target.id !== "hero");
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    // 2. Prevent getting stuck halfway: Smart Auto-Snap Realignment
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (lockScrollRef.current) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // If the user remains parked between section boundaries, gently align to the closest one
        const activeEl = document.getElementById(activeId);
        if (activeEl) {
          const rect = activeEl.getBoundingClientRect();
          // If active element is considerably out of view but not snapped, snap to it or neighboring
          if (Math.abs(rect.top) > 50 && Math.abs(rect.top) < window.innerHeight * 0.4) {
            activeEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 700);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 3. Handle Keyboard Arrow Controls for Fluid Section-to-Section Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp"].includes(e.key) &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        const currentIndex = SECTIONS.findIndex((s) => s.id === activeId);
        
        if (e.key === "ArrowDown" || e.key === "PageDown") {
          if (currentIndex < SECTIONS.length - 1) {
            scrollToSection(SECTIONS[currentIndex + 1].id);
          }
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
          if (currentIndex > 0) {
            scrollToSection(SECTIONS[currentIndex - 1].id);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(scrollTimeout);
    };
  }, [activeId]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      lockScrollRef.current = true;
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      
      // Temporarily bypass auto-snap alignment during intentional navigation
      setTimeout(() => {
        lockScrollRef.current = false;
      }, 900);
    }
  };

  const currentIdx = SECTIONS.findIndex((s) => s.id === activeId);

  return (
    <>
      {/* Vertical luxury side-indicator rail */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6 items-center">
        
        <div className="flex flex-col gap-4 items-center relative py-4 px-2 rounded-full border border-brand-gold/10 bg-black/40 backdrop-blur-md">
          {SECTIONS.map((sec, i) => {
            const isActive = sec.id === activeId;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="group relative flex items-center justify-center w-3 h-3 cursor-pointer focus:outline-none"
                aria-label={`Scroll to ${sec.label}`}
              >
                {/* Glowing central dot indicator */}
                <motion.div
                  className={`rounded-full transition-all duration-300 ${
                    isActive 
                      ? "w-2.5 h-2.5 bg-brand-gold shadow-[0_0_8px_rgba(212,166,74,0.6)]" 
                      : "w-1.5 h-1.5 bg-[#FAF9F7]/15 group-hover:bg-brand-teal/60"
                  }`}
                  animate={{
                    scale: isActive ? 1.2 : 1.0
                  }}
                />

                {/* Floating elegance text badges on hover */}
                <div className="absolute right-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center bg-[#111111]/90 border border-brand-gold/20 px-3 py-1.5 rounded-lg shadow-xl text-right select-none translate-x-2 group-hover:translate-x-0 transition-transform">
                  <span className="text-[10px] text-brand-gold font-bold mr-2 tracking-widest">{sec.num}</span>
                  <span className="text-[10px] text-brand-white font-semibold tracking-wider uppercase whitespace-nowrap">{sec.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

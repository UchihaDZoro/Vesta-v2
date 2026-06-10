import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function GlowingCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Core coordinates using motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animations for ultra-smooth fluid movement
  const springConfig = { damping: 40, stiffness: 450, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Ambient aura lags slightly for a realistic fluid drag effect
  const auraXSpring = useSpring(cursorX, { damping: 50, stiffness: 220, mass: 0.8 });
  const auraYSpring = useSpring(cursorY, { damping: 50, stiffness: 220, mass: 0.8 });

  useEffect(() => {
    // Only enable cursor on devices that support hover (non-touch)
    const mediaQuery = window.matchMedia("(any-hover: hover)");
    if (!mediaQuery.matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for hover targets
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .cursor-pointer, .clickable-card'
      );
      
      const onMouseEnter = () => setIsHovered(true);
      const onMouseLeave = () => setIsHovered(false);

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", onMouseEnter);
          el.removeEventListener("mouseleave", onMouseLeave);
        });
      };
    };

    // Listen to DOM mutations to bind new elements
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    // Initial binding
    const removeListeners = addHoverListeners();
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      removeListeners();
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Large subtle background glowing aura (acts as a torch illuminating elements) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-30 mix-blend-screen"
        style={{
          x: auraXSpring,
          y: auraYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: 380,
          height: 380,
          background: "radial-gradient(circle, rgba(15,139,141,0.06) 0%, rgba(212,166,74,0.015) 50%, transparent 80%)",
        }}
      />

      {/* 2. Premium glowing dot and precise circular cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.6 : 1.0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Core point */}
        <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
        
        {/* Border ring */}
        <motion.div
          className="absolute rounded-full border border-brand-teal/50"
          animate={{
            width: isHovered ? 36 : 24,
            height: isHovered ? 36 : 24,
            borderColor: isHovered ? "rgba(212,166,74,0.8)" : "rgba(15,139,141,0.5)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </motion.div>
    </>
  );
}

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import WhatWeStandFor from "./components/WhatWeStandFor";
import Vision from "./components/Vision";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GlowingCursor from "./components/GlowingCursor";
import SectionNavigator from "./components/SectionNavigator";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
  // Pure React Scroll Progress Indicators
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="bg-[#FCFAF7] min-h-screen text-neutral-800 selection:bg-brand-teal selection:text-white overflow-x-hidden antialiased flex flex-col relative">
      
      {/* Custom Glowing Cursor */}
      <GlowingCursor />

      {/* Floating Section-to-Section Navigation & Hotkeys */}
      <SectionNavigator />

      {/* Scroll Progress Indicator Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-teal via-brand-gold to-brand-teal-light origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Floating global deep background atmospheric blur patterns */}
      <div className="absolute top-[10%] left-[-20%] w-[800px] h-[800px] rounded-full bg-radial from-brand-teal/4 to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-20%] w-[900px] h-[900px] rounded-full bg-radial from-brand-gold/3 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Navigation Header */}
      <Navbar />

      <main className="flex-grow relative z-10">
        
        {/* Section 1 — Full-Screen Hero */}
        <Hero />

        {/* Section 2 — Split About Us Layout */}
        <About />

        {/* Section 3 — High End Ecosystem Showcase */}
        <Products />

        {/* Section 4 — Guided Mission / Value Principles */}
        <WhatWeStandFor />

        {/* Section 5 — Dark Immersive Vision Core */}
        <Vision />

        {/* Section 6 — Premium FAQ Dropdown Accordions */}
        <FAQ />

        {/* Section 7 — Unified Contact & Footer Section (Flows naturally on all viewports, guaranteeing the footer is fully visible) */}
        <div id="contact-footer" className="min-h-screen flex flex-col justify-between bg-[#FCFAF7] border-t border-[#EBE9E2] snap-start snap-always relative z-10 w-full py-0 my-0 overflow-y-auto">
          <div className="flex-grow flex items-center justify-center max-w-7xl mx-auto px-6 lg:px-8 w-full py-12 lg:py-16">
            <Contact />
          </div>
          <Footer />
        </div>

      </main>
    </div>
  );
}

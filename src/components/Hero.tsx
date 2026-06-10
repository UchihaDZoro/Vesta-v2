import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import VestaLogo from "./VestaLogo";
import { ShieldAlert, ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle subtle interactive mouse tilt/parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Scroll driven animation values
  const { scrollY } = useScroll();
  const logoY = useTransform(scrollY, [0, 800], [0, -150]);
  const logoScale = useTransform(scrollY, [0, 800], [1, 0.9]);
  const logoOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const textY = useTransform(scrollY, [0, 800], [0, -80]);

  // Handle smooth scroll anchor trigger
  const scrollToAbout = () => {
    const nextSection = document.querySelector("#about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen md:min-h-[100dvh] py-12 md:py-0 flex flex-col justify-center items-center overflow-hidden bg-[#FCFAF7] px-6 lg:px-8 my-0 text-center snap-start snap-always"
    >
      {/* Premium HTML5 Ambient Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
          poster="/Logo.png"
        >
          <source src="/vesta_video.mp4" type="video/mp4" />
          <p className="sr-only">Your browser does not support the video tag.</p>
        </video>
        {/* Subtle premium light overlay (25% opacity) to elevate typography readability while preserving high video vibrancy */}
        <div className="absolute inset-0 bg-[#FCFAF7]/25 backdrop-blur-[1px]" />
      </div>

      {/* Background radial glow overlaid above the video for luxury integration */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-radial from-brand-teal/10 via-brand-teal/2 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-radial from-brand-gold/8 via-transparent to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* Content wrapper with motion parallax */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center select-none pt-8">
        {/* Cinematic 3D Floating rotating Logo centerpiece */}
        <motion.div
          style={{ y: logoY, scale: logoScale, opacity: logoOpacity }}
          className="relative mb-8 cursor-grab active:cursor-grabbing preserve-3d"
          animate={{
            rotateX: mousePosition.y * 0.8,
            rotateY: mousePosition.x * 0.8,
            y: [0, -10, 0],
          }}
          transition={{
            rotateX: { type: "spring", stiffness: 120, damping: 20 },
            rotateY: { type: "spring", stiffness: 120, damping: 20 },
            y: { duration: 6, ease: "easeInOut", repeat: Infinity },
          }}
        >
          {/* Layered glowing backdrop blurs beneath the main 3D logo */}
          <div className="absolute inset-0 bg-[#0F8B8D]/8 rounded-full blur-2xl transform scale-110 animate-pulse-subtle" />
          <div className="absolute inset-0 bg-[#D4A64A]/8 rounded-full blur-xl transform scale-90 translate-y-3" />

          {/* Vesta Logo with 3D Depth Styling (Luxury Cream Plate Badge replicating the user's uploaded design) */}
          <div
            className="p-3 rounded-full border border-brand-gold/20 relative overflow-hidden group shadow-[0_25px_60px_rgba(15,139,141,0.15)] bg-white/40 backdrop-blur-md"
          >
            {/* Glossy sheen on hover */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-[#FAF9F7]/20 to-transparent pointer-events-none" />
            
            <VestaLogo size={240} variant="cream-plate" />
          </div>
        </motion.div>

        {/* Text Area */}
        <motion.div style={{ y: textY }} className="flex flex-col items-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="font-display font-extrabold text-[44px] sm:text-[62px] lg:text-[72px] leading-[1.05] tracking-tight text-neutral-900 max-w-4xl"
          >
            Empowering Safety <br />
            <span className="text-gradient-glowing-gold tracking-tighter">
              Through Innovation
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-6 text-neutral-700 text-base sm:text-lg max-w-2xl font-light leading-relaxed px-4"
          >
            Vesta develops intelligent safety technologies that combine wearable innovation, artificial intelligence, and connected response systems to help people stay protected when it matters most.
          </motion.p>

          {/* Buttons CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md px-4"
          >
            <button
              onClick={scrollToAbout}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold tracking-wider uppercase text-[#0A0A0A] bg-brand-gold hover:bg-brand-gold-light transition-all duration-300 shadow-[0_8px_32px_rgba(212,166,74,0.22)] hover:shadow-[0_12px_44px_rgba(212,166,74,0.35)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
            >
              Explore Vesta
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold tracking-wider uppercase text-neutral-800 border border-neutral-300/80 bg-white/60 hover:bg-white hover:border-brand-gold-light/40 shadow-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              Contact Us
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

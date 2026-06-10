import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, Shield, Compass } from "lucide-react";

export default function WhatWeStandFor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 30;
    const y = (e.clientY - top - height / 2) / 30;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const values = [
    {
      title: "Human First",
      desc: "People are at the center of everything we build. We create safety technologies that prioritize trust, accessibility, empathy, and meaningful real-world impact.",
      icon: Heart,
      color: "from-red-500/10 to-transparent",
    },
    {
      title: "Innovation with Purpose",
      desc: "We embrace emerging technologies, artificial intelligence, and connected systems to solve meaningful safety challenges and create lasting impact in people's lives.",
      icon: Sparkles,
      color: "from-brand-teal/10 to-transparent",
    },
    {
      title: "Reliability When It Matters",
      desc: "Safety solutions must be dependable. We are committed to building products that people can trust in critical moments — engineered for the moments that matter most.",
      icon: Shield,
      color: "from-brand-gold/10 to-transparent",
    },
    {
      title: "Empowering Confidence",
      desc: "We believe everyone deserves the freedom to live, work, and explore with greater confidence, knowing intelligent support is always within reach.",
      icon: Compass,
      color: "from-[#FAF9F7]/5 to-transparent",
    },
  ];  return (
    <section
      id="mission"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen md:min-h-[100dvh] py-16 md:py-0 flex flex-col justify-center items-center overflow-hidden bg-[#FCFAF7] border-t border-[#EBE9E2] snap-start snap-always px-6 lg:px-8 w-full"
    >
      {/* Background golden light trails & ambient particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-[30%] left-[5%] w-[450px] h-[450px] rounded-full bg-radial from-brand-gold/6 via-transparent to-transparent blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x * -1.6,
            y: mousePosition.y * -1.6,
          }}
          transition={{ type: "spring", stiffness: 45, damping: 20 }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-radial from-brand-teal/6 via-transparent to-transparent blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x * 1.6,
            y: mousePosition.y * 1.6,
          }}
          transition={{ type: "spring", stiffness: 45, damping: 20 }}
        />

        {/* 3D Floating Geometry for What We Stand For */}
        <motion.div
          className="absolute top-[20%] right-[10%] w-12 h-12 rounded-lg border border-brand-gold/20 bg-brand-gold/5 pointer-events-none hidden lg:block"
          animate={{
            x: mousePosition.x * 2.2,
            y: mousePosition.y * 2.2,
            rotateX: mousePosition.y * 1,
            rotateY: mousePosition.x * 1,
            rotateZ: 45,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          style={{ transformStyle: "preserve-3d" }}
        />
        <motion.div
          className="absolute bottom-[25%] left-[8%] w-10 h-10 rounded-xl border border-brand-teal/20 bg-brand-teal/5 pointer-events-none hidden lg:block"
          animate={{
            x: mousePosition.x * -2,
            y: mousePosition.y * -2,
            rotateX: mousePosition.y * -1,
            rotateY: mousePosition.x * -1,
            rotateZ: -30,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Additional 3D Shapes */}
        <motion.div
          className="absolute top-[50%] left-[4%] w-12 h-12 rounded-full border-[3px] border-brand-teal/25 bg-radial from-brand-teal/10 to-transparent pointer-events-none shadow-[4px_12px_25px_rgba(15,139,141,0.08)] hidden lg:block"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            x: mousePosition.x * -1.8,
            y: mousePosition.y * -2.4,
            rotateX: mousePosition.y * 1.5,
            rotateY: mousePosition.x * -1.5,
            rotateZ: [0, 360],
          }}
          transition={{
            x: { type: "spring", stiffness: 45, damping: 15 },
            y: { type: "spring", stiffness: 45, damping: 15 },
            rotateZ: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[11%] w-10 h-10 border border-brand-gold/20 bg-brand-gold/5 rotate-45 pointer-events-none shadow-[2px_10px_20px_rgba(212,166,74,0.06)] hidden lg:block"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            x: mousePosition.x * 2.3,
            y: mousePosition.y * 1.9,
            rotateX: mousePosition.y * -1.1,
            rotateY: mousePosition.x * 1.1,
            rotateZ: [45, -315],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 15 },
            y: { type: "spring", stiffness: 50, damping: 15 },
            rotateZ: { duration: 15, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* Animated golden stars */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              backgroundColor: i % 2 === 0 ? "#D4A64A" : "#0F8B8D",
              top: `${Math.random() * 95}%`,
              left: `${Math.random() * 95}%`,
              animation: `float-slow ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8 lg:mb-10">
          <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block mb-2 sm:mb-3">
            Core Beliefs
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#18181B]">
            What We <span className="text-gradient-teal-gold">Stand For</span>
          </h2>
          <p className="mt-3 text-neutral-500 text-sm sm:text-base font-light max-w-2xl mx-auto">
            These are the core principles that guide every decision, design, product selection, and engineering blueprint we create at Vesta.
          </p>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {values.map((v, i) => {
            const IconComponent = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-5 sm:p-6 rounded-xl border border-[#EBE9E2]/80 relative overflow-hidden group flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(15,139,141,0.08)] transition-all duration-300 bg-white/90"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(212,166,74,0.01) 100%)`,
                }}
              >
                {/* Intense Glowing effect from before behind glass morphic tile */}
                <div className="absolute -inset-10 bg-radial from-brand-teal/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl z-0" />

                {/* Background ambient accent swipe */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${v.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`} />

                <div className="relative z-10 flex-grow flex flex-col justify-between w-full">
                  <div>
                    {/* Icon Frame */}
                    <div className="p-3 w-11 h-11 rounded-lg bg-brand-teal/5 border border-brand-teal/15 text-brand-teal flex items-center justify-center mb-5 group-hover:border-brand-gold/40 group-hover:bg-brand-gold/5 group-hover:text-brand-gold transition-all duration-300">
                      <IconComponent size={20} className="transform group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    </div>

                    {/* Title Label */}
                    <h4 className="font-display font-bold text-base sm:text-lg text-neutral-800 group-hover:text-brand-gold transition-colors duration-300">
                      {v.title}
                    </h4>

                    {/* Description Paragraph */}
                    <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed font-light">
                      {v.desc}
                    </p>
                  </div>

                  {/* Micro accent corner decoration */}
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-gold/10 group-hover:bg-brand-gold/40 transition-colors duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Compass, Sparkles, Hand, ShieldAlert } from "lucide-react";
import VestaLogo from "./VestaLogo";

export default function About() {
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

  const points = [
    {
      title: "Human-Centered Design",
      desc: "Quietly working in the background, active when called upon.",
      icon: Hand,
    },
    {
      title: "AI-Driven Intelligence",
      desc: "Proprietary models powering situational context and anomaly triggers.",
      icon: Sparkles,
    },
    {
      title: "Connected Response",
      desc: "Seamless networks connecting wearers to prompt personal support.",
      icon: ShieldAlert,
    },
    {
      title: "Engineered for Trust",
      desc: "Robust offline architectures built with modern security standard.",
      icon: Compass,
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen md:min-h-[100dvh] py-16 md:py-0 flex flex-col justify-center items-center bg-[#FCFAF7] border-t border-[#EBE9E2] snap-start snap-always w-full overflow-hidden"
    >
      {/* 3D background illumination nodes synced with mouse movement */}
      <motion.div
        className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-radial from-brand-teal/10 to-transparent blur-3xl pointer-events-none z-0"
        animate={{
          x: mousePosition.x * -1.8,
          y: mousePosition.y * -1.8,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-radial from-brand-gold/8 to-transparent blur-3xl pointer-events-none z-0"
        animate={{
          x: mousePosition.x * 1.8,
          y: mousePosition.y * 1.8,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      />

      {/* Floating 3D Geometric objects in background */}
      <motion.div
        className="absolute top-[15%] right-[15%] w-10 h-10 rounded-lg border border-brand-teal/15 bg-brand-teal/5 pointer-events-none hidden lg:block"
        animate={{
          x: mousePosition.x * 2.5,
          y: mousePosition.y * 2.5,
          rotateX: mousePosition.y * 1.5,
          rotateY: mousePosition.x * 1.5,
          rotateZ: 45,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[10%] w-14 h-14 rounded-full border border-brand-gold/20 bg-brand-gold/1 pointer-events-none hidden lg:block"
        animate={{
          x: mousePosition.x * -2,
          y: mousePosition.y * -2,
          rotateX: mousePosition.y * -1,
          rotateY: mousePosition.x * -1,
          rotateZ: 15,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      />
      
      {/* Additional 3D Floating Elements */}
      <motion.div
        className="absolute top-[40%] left-[6%] w-10 h-10 rotate-45 border-2 border-brand-gold/25 bg-brand-gold/5 pointer-events-none shadow-[4px_12px_25px_rgba(212,166,74,0.1)] hidden lg:block"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          x: mousePosition.x * -2.2,
          y: mousePosition.y * -1.8,
          rotateX: mousePosition.y * -1.2,
          rotateY: mousePosition.x * -1.2,
          rotateZ: [45, 405],
        }}
        transition={{
          x: { type: "spring", stiffness: 45, damping: 15 },
          y: { type: "spring", stiffness: 45, damping: 15 },
          rotateZ: { duration: 22, repeat: Infinity, ease: "linear" },
        }}
      />
      <motion.div
        className="absolute bottom-[45%] right-[5%] w-12 h-12 rounded-full border-4 border-brand-teal/15 bg-brand-teal/5 pointer-events-none shadow-[2px_10px_20px_rgba(15,139,141,0.06)] hidden lg:block"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          x: mousePosition.x * 2.1,
          y: mousePosition.y * 2.3,
          rotateX: mousePosition.y * 1.5,
          rotateY: mousePosition.x * 1.5,
          rotateZ: [0, 360],
        }}
        transition={{
          x: { type: "spring", stiffness: 50, damping: 15 },
          y: { type: "spring", stiffness: 50, damping: 15 },
          rotateZ: { duration: 16, repeat: Infinity, ease: "linear" },
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:max-w-6xl relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Glassmorphic concentric mock product/logo presentation resembling the gold circular premium brand badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-12 xl:col-span-5 lg:col-start-1 flex flex-col items-center justify-center p-4 relative"
          >
            {/* Background glowing shield circle layout */}
            <div className="relative w-80 h-80 sm:w-[410px] sm:h-[410px] flex items-center justify-center rounded-full border border-brand-teal/15 bg-white/45 relative shadow-[0_10px_40px_rgba(0,0,0,0.03)] backdrop-blur-md">
              
              {/* Outer spinning dash gold loop */}
              <div className="absolute inset-4 rounded-full border border-dashed border-brand-gold/25 animate-spin-slow pointer-events-none" />

              {/* Inner floating orbital tracker */}
              <motion.div
                animate={{
                  rotateZ: [360, 0],
                }}
                transition={{
                  duration: 25,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="absolute inset-10 rounded-full border border-brand-teal/20 flex items-center justify-center"
              >
                <div className="absolute h-3 w-3 rounded-full bg-brand-teal -top-1.5 left-1/2 -ml-1.5 filter drop-shadow-[0_0_8px_rgba(15,139,141,0.6)]" />
              </motion.div>

              {/* Center core glassmorphic tray with the actual provided premium logo */}
              <div className="relative z-10 p-1 rounded-full border border-brand-gold/30 bg-white shadow-2xl flex items-center justify-center overflow-hidden w-[240px] h-[240px] sm:w-[260px] sm:h-[260px]">
                <img 
                  src="/Logo.png" 
                  alt="Vesta Premium Logo" 
                  className="w-full h-full object-contain rounded-full" 
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Double ring glowing flare */}
              <div className="absolute -inset-2 bg-radial from-brand-gold/5 to-transparent rounded-full filter blur-xl pointer-events-none" />

              {/* Info ribbon below the logo plate inside the ring */}
              <div className="absolute -bottom-4 bg-white border border-[#E5E3DB] backdrop-blur-lg px-4 py-1.5 rounded-full text-[10px] text-brand-gold font-bold tracking-[0.25em] flex items-center gap-1.5 shadow-lg">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                VESTA OS • ACTIVE SYSTEMS
              </div>

              {/* Subtle accent elements */}
              <div className="absolute top-12 right-12 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-teal"></span>
              </div>
            </div>

            {/* Est 2026 luxury foundation caption */}
            <div className="mt-8 text-center">
              <p className="text-xs tracking-[0.4em] text-neutral-400 uppercase font-semibold">
                ESTABLISHED IN
              </p>
              <h3 className="font-display font-extrabold text-3xl text-gradient-teal-gold mt-1">
                2026
              </h3>
            </div>
          </motion.div>

          {/* Right Column: Mission descriptions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-12 xl:col-span-7"
          >
            <span className="text-xs font-bold tracking-widest text-brand-gold block uppercase mb-3">
              About Vesta
            </span>
            <h2 className="font-display font-extrabold text-[#18181B] text-3xl sm:text-4xl lg:text-5xl tracking-tight">
              Redefining <span className="text-gradient-glowing-gold">Personal Safety</span>
            </h2>
            
            <p className="mt-4 text-neutral-700 text-sm sm:text-base font-light leading-relaxed">
              Vesta is a safety technology company focused on creating intelligent solutions that help individuals stay connected, protected, and empowered. By combining advanced sensing, real-time communication, and human-centered design, we are building the next generation of personal safety.
            </p>

            <p className="mt-3 text-neutral-500 text-xs sm:text-sm font-light leading-relaxed hidden md:block">
              Each device runs our proprietary Vesta OS to deliver context-aware safety monitoring quietly in the background, immediately activating the second a user requires assistance.
            </p>

            {/* Premium Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-8">
              {points.map((pt, idx) => {
                const IconComponent = pt.icon;
                return (
                  <div
                    key={pt.title}
                    className="group flex flex-col gap-1.5 p-3.5 sm:p-4 rounded-xl border border-[#EBE9E2]/80 bg-white/70 hover:bg-white hover:border-brand-gold/30 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden"
                  >
                    {/* Gorgeous glowing effect from before behind glass morphic tiles */}
                    <div className="absolute -inset-10 bg-radial from-brand-teal/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl z-0" />
                    
                    <div className="relative z-10 flex flex-col gap-1.5 w-full">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-brand-teal/5 border border-brand-teal/15 text-brand-teal group-hover:bg-brand-gold/5 group-hover:border-brand-gold/30 group-hover:text-brand-gold transition-colors duration-300">
                          <IconComponent size={18} />
                        </div>
                        <h4 className="font-display font-semibold text-sm text-[#18181B] group-hover:text-brand-gold transition-colors duration-300">
                          {pt.title}
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed pl-1 font-light">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

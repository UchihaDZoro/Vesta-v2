import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Eye, ShieldAlert, Sparkles, Activity } from "lucide-react";

export default function Vision() {
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

  const pillars = [
    {
      id: "prevention",
      title: "Prevention",
      desc: "Helping people stay aware before situations escalate. Utilizing on-device wearable sensor intelligence to look for contextual anomalies and alert trusted networks.",
      icon: Eye,
      glowStyle: "border-brand-teal/20 shadow-[0_0_20px_rgba(15,139,141,0.15)]",
      indicatorClass: "bg-brand-teal animate-pulse-subtle",
      indicatorDetail: "Continuous Environmental Sweep",
    },
    {
      id: "protection",
      title: "Protection",
      desc: "Providing immediate, encrypted access to active response assistance when every second matters. Our devices support tactile tactile SOS trigger lines.",
      icon: ShieldAlert,
      glowStyle: "border-brand-gold/30 shadow-[0_0_25px_rgba(212,166,74,0.18)]",
      indicatorClass: "bg-[#EF4444] animate-ping",
      indicatorDetail: "Dual-Sim Emergency Triage",
    },
    {
      id: "confidence",
      title: "Confidence",
      desc: "Creating mental freedom through always-connected, dependable, privacy-centric safety channels. Giving citizens the peace of mind to live and wander freely.",
      icon: Sparkles,
      glowStyle: "border-brand-white/10 shadow-[0_0_20px_rgba(250,249,247,0.1)]",
      indicatorClass: "bg-[#F9E0A2] shadow-[0_0_8px_rgba(249,224,162,1)]",
      indicatorDetail: "Guardian Sync Active",
    },
  ];

  return (
    <section
      id="vision"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen md:min-h-[100dvh] py-16 md:py-0 flex flex-col justify-center items-center overflow-hidden bg-[#FCFAF7] border-t border-[#EBE9E2] snap-start snap-always px-6 lg:px-8 w-full"
    >
      {/* Background celestial visual gradients */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FAF9F6]/20 to-transparent pointer-events-none" />
      
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[400px] rounded-full bg-radial from-brand-teal/8 via-brand-teal/1 to-transparent blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5,
          }}
          transition={{ type: "spring", stiffness: 45, damping: 20 }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[25%] w-[300px] h-[300px] rounded-full bg-radial from-brand-gold/6 via-transparent to-transparent blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x * 1.5,
            y: mousePosition.y * 1.5,
          }}
          transition={{ type: "spring", stiffness: 45, damping: 20 }}
        />

        {/* 3D Floating Geometry for Vision Section */}
        <motion.div
          className="absolute top-[25%] left-[12%] w-10 h-10 rounded-lg border border-brand-teal/20 bg-brand-teal/5 pointer-events-none hidden lg:block"
          animate={{
            x: mousePosition.x * -2,
            y: mousePosition.y * -2,
            rotateX: mousePosition.y * -1,
            rotateY: mousePosition.x * -1,
            rotateZ: 25,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          style={{ transformStyle: "preserve-3d" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[12%] w-12 h-12 rounded-xl border border-brand-gold/20 bg-brand-gold/5 pointer-events-none hidden lg:block"
          animate={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
            rotateX: mousePosition.y * 1,
            rotateY: mousePosition.x * 1,
            rotateZ: -45,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Additional 3D Floating Objects */}
        <motion.div
          className="absolute bottom-[45%] left-[6%] w-12 h-12 rounded-xl border-2 border-brand-teal/15 bg-brand-teal/5 pointer-events-none shadow-[4px_12px_25px_rgba(15,139,141,0.06)] hidden lg:block"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            x: mousePosition.x * -1.9,
            y: mousePosition.y * 2.2,
            rotateX: mousePosition.y * -1.5,
            rotateY: mousePosition.x * 1.5,
            rotateZ: [15, -345],
          }}
          transition={{
            x: { type: "spring", stiffness: 45, damping: 15 },
            y: { type: "spring", stiffness: 45, damping: 15 },
            rotateZ: { duration: 25, repeat: Infinity, ease: "linear" },
          }}
        />
        <motion.div
          className="absolute top-[35%] right-[6%] w-10 h-10 rounded-full border-4 border-brand-gold/20 bg-brand-gold/5 pointer-events-none shadow-[2px_10px_20px_rgba(212,166,74,0.08)] hidden lg:block"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            x: mousePosition.x * 2.1,
            y: mousePosition.y * -1.9,
            rotateX: mousePosition.y * 1.3,
            rotateY: mousePosition.x * -1.3,
            rotateZ: [0, 360],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 15 },
            y: { type: "spring", stiffness: 50, damping: 15 },
            rotateZ: { duration: 18, repeat: Infinity, ease: "linear" },
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* Title Block */}
        <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8 lg:mb-10">
          <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block mb-2 sm:mb-3">
            Our Vision
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-[#18181B]">
            A Safer Future, <br className="sm:hidden" />
            <span className="text-gradient-teal-gold">Powered by Intelligence</span>
          </h2>
          <p className="mt-3 text-neutral-500 text-sm sm:text-base font-light max-w-2xl mx-auto">
            Vesta is charting a course toward proactive safety, where modern AI hardware and private user networks cooperate seamlessly to prevent crises.
          </p>
        </div>

        {/* Illuminated Glass Cards Pillar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-h-[60vh] sm:max-h-none overflow-y-auto sm:overflow-visible p-2">
          {pillars.map((p, idx) => {
            const IconComponent = p.icon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="p-6 sm:p-8 rounded-2xl border border-[#EBE9E2]/80 bg-white/90 relative overflow-hidden group flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(15,139,141,0.08)] transition-all duration-300"
              >
                {/* Intense Glowing effect from before behind glass morphic tile */}
                <div className="absolute -inset-10 bg-radial from-brand-teal/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl z-0" />

                {/* Internal top lighting shine */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent pointer-events-none z-10" />

                <div className="relative z-10 flex-grow flex flex-col justify-between w-full">
                  <div>
                    {/* Status Indicator Bar */}
                    <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
                      <div className="relative flex h-2.5 w-2.5">
                        <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${p.indicatorClass}`} />
                        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${p.indicatorClass}`} />
                      </div>
                      <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase font-mono">
                        {p.indicatorDetail}
                      </span>
                    </div>

                    {/* Header Title */}
                    <div className="flex items-center gap-4 mb-4 sm:mb-6">
                      <div className="p-2.5 rounded-xl bg-brand-teal/5 border border-brand-teal/15 text-brand-teal group-hover:border-brand-gold/30 group-hover:bg-brand-gold/5 group-hover:text-brand-gold transition-colors duration-300">
                        <IconComponent size={22} strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-neutral-800 group-hover:text-brand-gold transition-colors duration-300">
                        {p.title}
                      </h3>
                    </div>

                    {/* Body description */}
                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-light mt-2">
                      {p.desc}
                    </p>
                  </div>

                  {/* Bottom luxury metric icon/accent pattern */}
                  <div className="mt-6 sm:mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[10px] text-brand-gold/80 font-semibold uppercase tracking-wider">
                      Pillar 0{idx + 1}
                    </span>
                    <Activity size={14} className="text-brand-teal/40 group-hover:text-brand-teal transition-colors duration-700 animate-pulse-subtle" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import React from "react";
import { motion } from "motion/react";
import { Smartphone, Watch, Circle, ShieldCheck, Heart, Radio } from "lucide-react";

interface ProductCardProps {
  title: string;
  badge: string;
  desc: string;
  icon: React.ComponentType<any>;
  features: string[];
  delay: number;
  children: React.ReactNode;
}

function ProductCard({ title, badge, desc, icon: Icon, features, delay, children }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -6, rotateX: 1, rotateY: -1 }}
      className="p-4 sm:p-5 md:p-6 rounded-2xl border border-[#EBE9E2] bg-white/95 flex flex-col justify-between overflow-hidden relative group transition-all duration-300 shadow-[0_5px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(15,139,141,0.08)]"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(212,166,74,0.01) 100%)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Intense Glowing effect from before behind glass morphic tile */}
      <div className="absolute -inset-10 bg-radial from-brand-teal/15 via-brand-gold/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl z-0" />

      {/* Secondary soft color glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-brand-teal/8 to-brand-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

      <div className="relative z-10 flex-grow flex flex-col justify-between">

      <div>
        {/* Header Block */}
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 rounded-xl bg-brand-teal/5 border border-brand-teal/15 text-brand-teal">
            <Icon size={18} />
          </div>
          <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-widest text-brand-gold border border-brand-gold/30 bg-brand-gold/5 uppercase animate-pulse-subtle">
            {badge}
          </span>
        </div>

        {/* Labels */}
        <h3 className="font-display font-extrabold text-lg sm:text-xl text-neutral-900 group-hover:text-brand-gold transition-colors duration-300">
          {title}
        </h3>
        
        <p className="mt-2 text-neutral-600 text-xs sm:text-sm leading-relaxed font-light">
          {desc}
        </p>

        {/* Highlight Bullets */}
        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {features.map((feat) => (
            <li
              key={feat}
              className="px-2 py-0.5 rounded bg-brand-teal/5 border border-brand-teal/10 text-[9px] sm:text-[10px] text-neutral-600 font-medium flex items-center gap-1"
            >
              <div className="w-1 h-1 rounded-full bg-brand-teal" />
              {feat}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual Render container */}
      <div className="mt-3 flex justify-center items-center w-full min-h-[110px] lg:min-h-[130px] relative pointer-events-none select-none">
        {children}
      </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

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

  return (
    <section
      id="products"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen py-24 sm:py-32 flex flex-col justify-center items-center overflow-hidden bg-[#FCFAF7] border-t border-[#EBE9E2] snap-start snap-always px-6 lg:px-8 w-full"
    >
      {/* 3D Radial lighting nodes synced with mouse movement */}
      <motion.div
        className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-radial from-brand-teal/10 to-transparent blur-3xl pointer-events-none z-0"
        animate={{
          x: mousePosition.x * -1.5,
          y: mousePosition.y * -1.5,
        }}
        transition={{ type: "spring", stiffness: 45, damping: 20 }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[10%] w-[650px] h-[650px] rounded-full bg-radial from-brand-gold/6 to-transparent blur-3xl pointer-events-none z-0"
        animate={{
          x: mousePosition.x * 1.5,
          y: mousePosition.y * 1.5,
        }}
        transition={{ type: "spring", stiffness: 45, damping: 20 }}
      />

      {/* Floating 3D design accents */}
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-12 h-12 rounded-lg border border-brand-teal/20 bg-brand-teal/5 pointer-events-none hidden lg:block"
        animate={{
          x: mousePosition.x * 2.2,
          y: mousePosition.y * 2.2,
          rotateX: mousePosition.y * 1,
          rotateY: mousePosition.x * 1,
          rotateZ: -15,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      />
      <motion.div
        className="absolute top-[20%] left-[8%] w-16 h-16 rounded-full border border-brand-gold/15 bg-brand-gold/1 pointer-events-none hidden lg:block"
        animate={{
          x: mousePosition.x * -2.4,
          y: mousePosition.y * -2.4,
          rotateX: mousePosition.y * -1.2,
          rotateY: mousePosition.x * -1.2,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      />

      {/* Floating 3D Gold Rings & Glass Hexagons (Additional elements) */}
      <motion.div
        className="absolute top-[45%] left-[4%] w-14 h-14 rounded-xl border border-dashed border-brand-teal/20 bg-brand-teal/5 pointer-events-none shadow-[2px_10px_20px_rgba(15,139,141,0.06)] hidden lg:block"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          x: mousePosition.x * -1.8,
          y: mousePosition.y * -2.2,
          rotateX: mousePosition.y * 1.2,
          rotateY: mousePosition.x * -1.2,
          rotateZ: [45, 405],
        }}
        transition={{
          x: { type: "spring", stiffness: 40, damping: 20 },
          y: { type: "spring", stiffness: 40, damping: 20 },
          rotateZ: { duration: 25, repeat: Infinity, ease: "linear" },
        }}
      />
      <motion.div
        className="absolute bottom-[40%] right-[6%] w-12 h-12 rounded-full border-4 border-brand-gold/25 bg-brand-gold/5 pointer-events-none shadow-[2px_10px_20px_rgba(212,166,74,0.08)] hidden lg:block"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          x: mousePosition.x * 2.5,
          y: mousePosition.y * 1.8,
          rotateX: mousePosition.y * -1.5,
          rotateY: mousePosition.x * 1.5,
          rotateZ: [0, -360],
        }}
        transition={{
          x: { type: "spring", stiffness: 50, damping: 15 },
          y: { type: "spring", stiffness: 50, damping: 15 },
          rotateZ: { duration: 18, repeat: Infinity, ease: "linear" },
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Title Group */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block mb-2 sm:mb-3">
            Ecosystem Suite
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#18181B]">
            Our <span className="text-gradient-teal-gold">Ecosystem</span>
          </h2>
          <p className="mt-3 text-neutral-500 text-sm sm:text-base font-light">
            Modular personal protection: four beautiful products engineered with premium materials and integrated with responsive safety systems.
          </p>
        </div>

        {/* Bento Products Grid - Remodelled for generous space and readability */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 w-full">
          
          {/* CARD 1: Vesta Mobile */}
          <ProductCard
            title="Vesta Mobile"
            badge="Coming Soon"
            desc="AI-powered safety companion application featuring emergency response triage, trusted contact circles, real-time context check-ins, and intelligent safety tools built from the ground up."
            icon={Smartphone}
            features={["Dual Sim Response", "Emergency SOS", "Safe-Zone Maps", "AI Assistance"]}
            delay={0}
          >
            {/* Interactive Vector Smartphone Mockup */}
            <div className="relative w-28 h-44 rounded-2xl border-2 border-[#FAF9F7]/15 bg-[#0D0D0D] p-1.5 flex flex-col justify-between overflow-hidden shadow-2xl group-hover:scale-105 duration-500">
              {/* Phone Notch */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-3 rounded-full bg-brand-white/20 z-10" />
              
              {/* App Screen layout */}
              <div className="flex-1 w-full rounded-[10px] border border-[#FAF9F7]/5 bg-[#080808] flex flex-col justify-between p-2 relative overflow-hidden">
                {/* Radar glow */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border border-brand-teal/20 animate-pulse-subtle flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-brand-teal/40 animate-ping flex items-center justify-center bg-brand-teal/5">
                    <ShieldCheck size={16} className="text-brand-gold" />
                  </div>
                </div>

                {/* Micro details at bottom */}
                <div className="mt-auto space-y-1 z-10">
                  <div className="h-1 w-10 rounded-full bg-brand-gold/60" />
                  <div className="h-4 w-full rounded bg-[#FAF9F7]/5 flex items-center justify-between px-1.5">
                    <span className="text-[5px] text-brand-white/60 font-semibold tracking-wider">SECURE RESPONSE ACTIVE</span>
                    <Heart size={5} className="text-red-500 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </ProductCard>

          {/* CARD 2: Vesta iOS */}
          <ProductCard
            title="Vesta iOS"
            badge="Coming Soon"
            desc="A seamless Apple ecosystem experience built to bring intelligent safety and connected support to iPhone users. Leverages native system sensors, lockscreen widgets, and core features."
            icon={Smartphone}
            features={["Siri Activation", "Widget Support", "Watch Synchronization", "Enncrypted Vault"]}
            delay={0.15}
          >
            {/* Interactive Vector iPhone Mockup */}
            <div className="relative w-28 h-44 rounded-2xl border-2 border-brand-gold/20 bg-[#121212] p-1.5 flex flex-col justify-between overflow-hidden shadow-2xl group-hover:scale-105 duration-500">
              {/* iPhone Dynamic Island */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-full bg-[#000] z-10" />
              
              {/* iOS UI */}
              <div className="flex-1 w-full rounded-[10px] border border-brand-gold/10 bg-[#0A0A0A] flex flex-col justify-between p-2 relative overflow-hidden">
                {/* Visual grid layout */}
                <div className="flex items-center justify-between text-[4px] text-brand-white/40 uppercase font-semibold">
                  <span>9:41</span>
                  <Radio size={6} className="text-brand-gold animate-pulse" />
                </div>

                {/* Core alert badge */}
                <div className="my-auto flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full border-2 border-brand-gold/30 flex items-center justify-center relative">
                    <div className="absolute inset-0.5 rounded-full border border-brand-gold/50 bg-[#151515] flex items-center justify-center">
                      <Smartphone size={14} className="text-brand-teal" />
                    </div>
                  </div>
                  <span className="text-[5px] text-brand-white/70 tracking-[0.2em] font-bold mt-2 uppercase">VESTA ACTIVE</span>
                </div>

                <div className="h-1 w-8 rounded-full bg-brand-white/30 self-center" />
              </div>
            </div>
          </ProductCard>

          {/* CARD 3: Vesta Band */}
          <ProductCard
            title="Vesta Band"
            badge="Coming Soon"
            desc="An intelligent wearable companion designed to provide always-accessible safety support through real-time awareness and connected emergency assistance. Minimalist, premium materials, elite durability."
            icon={Watch}
            features={["Fall Detection", "Vibration Alerts", "3-Day Battery", "Waterproof Body"]}
            delay={0.3}
          >
            {/* Interactive Wearable Band Vector layout */}
            <div className="relative flex flex-col items-center justify-center h-44 group-hover:scale-105 duration-500">
              {/* Wrist Strap (Top/Bottom) */}
              <div className="w-8 h-40 rounded-xl bg-gradient-to-b from-brand-teal/20 via-[#151515] to-brand-teal/20 border border-[#FAF9F7]/10 absolute z-0" />
              
              {/* Core Capsule element */}
              <div className="w-11 h-16 rounded-2xl border-2 border-brand-gold/30 bg-[#000000] z-10 shadow-2xl flex flex-col items-center p-1 relative">
                {/* Glass screen glow */}
                <div className="absolute inset-0 bg-[#0F8B8D]/5 rounded-xl filter blur-sm" />

                {/* Status Indicator */}
                <span className="text-[4px] text-brand-gold tracking-[0.1em] font-semibold mt-1">VESTA</span>
                
                {/* Optical display indicator */}
                <div className="w-7 h-7 rounded-full border border-brand-teal/20 flex items-center justify-center mt-1.5">
                  <div className="w-4 h-4 rounded-full bg-brand-teal/20 animate-pulse flex items-center justify-center">
                    <Heart size={8} className="text-brand-gold" />
                  </div>
                </div>

                <div className="h-0.5 w-4 rounded-full bg-[#FAF9F7]/25 mt-1.5" />
              </div>
            </div>
          </ProductCard>

          {/* CARD 4: Vesta Ring */}
          <ProductCard
            title="Vesta Ring"
            badge="Coming Soon"
            desc="A discreet smart ring engineered for continuous safety monitoring, intelligent alerts, and seamless access to emergency assistance, delivering peace of mind through advanced wearable technology."
            icon={Circle}
            features={["Titanium Outer", "NFC Integrations", "Silent Haptics", "Scratch Proof"]}
            delay={0.45}
          >
            {/* High-Fidelity concentric Vector Smart Ring Render with CSS Parallax depth */}
            <div className="relative flex items-center justify-center h-44 w-44 group-hover:scale-105 duration-500">
              {/* Background glowing rings */}
              <div className="absolute inset-0 bg-brand-gold/5 rounded-full filter blur-xl animate-pulse-subtle" />

              {/* Ring Outer Edge (Gold) */}
              <div className="w-28 h-28 rounded-full border-[6px] border-brand-gold bg-[#0A0A0A] flex items-center justify-center relative shadow-[0_0_40px_rgba(212,166,74,0.3)]">
                {/* Outer ring reflection detail */}
                <div className="absolute inset-0.5 rounded-full border border-[#FAF9F7]/20" />

                {/* Ring Inner Core (Teal Steel) */}
                <div className="w-[100px] h-[100px] rounded-full border-[5px] border-brand-teal bg-gradient-to-tr from-[#0F8B8D]/20 to-[#0A0a0a] flex items-center justify-center shadow-inner">
                  {/* Glowing inner optical sensor */}
                  <div className="w-[84px] h-[84px] rounded-full border border-brand-gold/20 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-brand-teal/10 animate-glow-pulse flex items-center justify-center relative shadow-[0_0_15px_rgba(29,195,198,0.5)]">
                      <Circle size={8} className="text-brand-gold" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ProductCard>

        </div>
      </div>
    </section>
  );
}

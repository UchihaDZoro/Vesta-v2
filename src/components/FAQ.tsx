import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, Sparkles } from "lucide-react";

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export default function FAQ() {
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

  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: "vesta-what",
      q: "What is Vesta?",
      a: "Vesta is a safety technology company focused on developing intelligent wearable and mobile solutions that help individuals stay connected, protected, and empowered through innovative safety experiences.",
    },
    {
      id: "vesta-timeline",
      q: "When will Vesta products be available?",
      a: "Vesta is currently under active development, with our mobile platform and wearable ecosystem progressing through validation and refinement. We are focused on delivering reliable, high-quality safety solutions and will share availability updates through our official channels.",
    },
    {
      id: "vesta-privacy",
      q: "How does Vesta protect user privacy?",
      a: "Privacy and security are fundamental to Vesta. User data is protected through secure cloud infrastructure, encrypted communication, controlled access mechanisms, and privacy-first design principles. Users maintain control over how and when their information is shared.",
    },
    {
      id: "vesta-diff",
      q: "What makes Vesta different from existing safety apps?",
      a: "Unlike traditional safety applications that rely primarily on manual actions, Vesta is building an intelligent safety ecosystem that combines wearable technology, real-time assistance, connected support networks, and AI-driven capabilities to create a more proactive and responsive safety experience.",
    },
    {
      id: "vesta-offline",
      q: "Will Vesta work without an internet connection?",
      a: "Certain core functionalities are being designed to remain available even in limited connectivity environments. However, advanced features such as real-time tracking, cloud synchronization, and connected emergency services may require internet access to operate at full capability.",
    },
    {
      id: "vesta-enterprise",
      q: "Is Vesta suitable for enterprise or institutional use?",
      a: "Yes. While Vesta is initially focused on individual users, the platform is being developed with scalability in mind, enabling future applications for educational institutions, corporate workforce safety programs, residential communities, and public safety initiatives.",
    },
    {
      id: "vesta-invest",
      q: "How can investors learn more about Vesta?",
      a: "We welcome conversations with investors, strategic partners, and industry stakeholders who share our vision of advancing personal safety through technology. Interested parties can reach out through our contact section or connect with our leadership team directly for further discussions.",
    },
    {
      id: "vesta-partner",
      q: "Can organizations partner with Vesta?",
      a: "Yes. We actively welcome collaboration opportunities with educational institutions, enterprises, technology partners, research organizations, and safety-focused initiatives that align with our mission.",
    },
  ];

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section
      id="faq"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen md:min-h-[100dvh] py-16 md:py-0 flex flex-col justify-center items-center overflow-hidden bg-[#FAF9F6] border-t border-[#EBE9E2] snap-start snap-always px-6 lg:px-8 w-full"
    >
      {/* Background visual halo nodes - soft and light */}
      <motion.div
        className="absolute top-[20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-radial from-[#F0EDE4]/60 to-transparent blur-3xl pointer-events-none z-0"
        animate={{
          x: mousePosition.x * -1.6,
          y: mousePosition.y * -1.6,
        }}
        transition={{ type: "spring", stiffness: 45, damping: 20 }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[-15%] w-[500px] h-[500px] rounded-full bg-radial from-brand-teal/8 to-transparent blur-3xl pointer-events-none z-0"
        animate={{
          x: mousePosition.x * 1.6,
          y: mousePosition.y * 1.6,
        }}
        transition={{ type: "spring", stiffness: 45, damping: 20 }}
      />

      {/* 3D Floating Geometry for FAQ Section */}
      <motion.div
        className="absolute top-[25%] right-[10%] w-12 h-12 rounded-xl border border-brand-teal/15 bg-brand-teal/5 pointer-events-none hidden lg:block"
        animate={{
          x: mousePosition.x * 2.4,
          y: mousePosition.y * 2.4,
          rotateX: mousePosition.y * 1.2,
          rotateY: mousePosition.x * 1.2,
          rotateZ: 60,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[12%] w-10 h-10 rounded-lg border border-brand-gold/20 bg-brand-gold/1 pointer-events-none hidden lg:block"
        animate={{
          x: mousePosition.x * -2,
          y: mousePosition.y * -2,
          rotateX: mousePosition.y * -1,
          rotateY: mousePosition.x * -1,
          rotateZ: -15,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      />

      {/* Additional 3D Floating Elements */}
      <motion.div
        className="absolute top-[50%] left-[5%] w-10 h-10 border-2 border-dashed border-brand-teal/30 bg-brand-teal/5 rotate-12 pointer-events-none shadow-[4px_12px_25px_rgba(15,139,141,0.06)] hidden lg:block"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          x: mousePosition.x * -1.8,
          y: mousePosition.y * -2.4,
          rotateX: mousePosition.y * 1.5,
          rotateY: mousePosition.x * -1.5,
          rotateZ: [12, 372],
        }}
        transition={{
          x: { type: "spring", stiffness: 45, damping: 15 },
          y: { type: "spring", stiffness: 45, damping: 15 },
          rotateZ: { duration: 25, repeat: Infinity, ease: "linear" },
        }}
      />
      <motion.div
        className="absolute bottom-[40%] right-[8%] w-12 h-12 rounded-full border-4 border-brand-gold/20 bg-brand-gold/5 pointer-events-none shadow-[2px_10px_20px_rgba(212,166,74,0.08)] hidden lg:block"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          x: mousePosition.x * 2.3,
          y: mousePosition.y * 1.8,
          rotateX: mousePosition.y * -1.2,
          rotateY: mousePosition.x * 1.2,
          rotateZ: [0, -360],
        }}
        transition={{
          x: { type: "spring", stiffness: 50, damping: 15 },
          y: { type: "spring", stiffness: 50, damping: 15 },
          rotateZ: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        
        {/* Title Group */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block mb-3">
            Inquiries
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#18181B]">
            Frequently Asked <span className="text-gradient-teal-gold">Questions</span>
          </h2>
          <p className="mt-4 text-neutral-500 text-sm sm:text-base font-light">
            Learn more about Vesta, our vision, products, privacy approach, and future roadmap.
          </p>
        </div>

        {/* Accordions Wrapper */}
        <div className="space-y-3 sm:space-y-4 max-h-[50vh] overflow-y-auto pr-2" style={{ scrollbarWidth: "thin" }}>
          {faqs.map((faq) => {
            const isOpen = openIndex === faq.id;
            return (
              <div
                key={faq.id}
                className={`relative rounded-xl border transition-all duration-500 overflow-hidden group ${
                  isOpen
                    ? "border-brand-gold/30 bg-white shadow-[0_10px_35px_rgba(15,139,141,0.06)]"
                    : "border-[#E5E3DB] bg-white/70 hover:border-brand-teal/30 hover:bg-white"
                }`}
              >
                {/* Intense Glowing effect from before behind glass morphic tile */}
                <div className="absolute -inset-10 bg-radial from-brand-teal/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl z-0" />

                <div className="relative z-10 w-full">
                  {/* Accordion trigger button */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left px-5 py-3.5 sm:py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold/50"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-[#18181B] group-hover:text-brand-gold transition-colors duration-300">
                      {faq.q}
                    </span>
                    
                    {/* Plus/Minus vector */}
                    <div className={`p-1 rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-brand-gold bg-brand-gold text-[#0A0A0A]"
                        : "border-brand-teal/20 text-brand-teal bg-brand-teal/5"
                    }`}>
                      {isOpen ? <Minus size={12} strokeWidth={2.5} /> : <Plus size={12} strokeWidth={2.5} />}
                    </div>
                  </button>

                  {/* Animated Dropdown Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 pb-4 text-neutral-600 text-xs sm:text-sm leading-relaxed font-light border-t border-[#F2F0E8] pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

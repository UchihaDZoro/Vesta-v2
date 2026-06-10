import React from "react";
import { motion } from "motion/react";

interface Abstract3DSphereProps {
  className?: string;
  color1?: string;
  color2?: string;
  speed?: number;
}

export default function Abstract3DSphere({
  className = "w-64 h-64",
  color1 = "#0F8B8D", // Brand Teal
  color2 = "#D4A64A", // Brand Gold
  speed = 40,
}: Abstract3DSphereProps) {
  return (
    <div className={`relative ${className} aspect-square pointer-events-none select-none overflow-visible shrink-0 transition-opacity`}>
      {/* Absolute Ambient Soft Background Glow behind the sphere */}
      <div 
        className="absolute inset-[15%] rounded-full opacity-15 blur-[60px]" 
        style={{
          background: `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`,
        }}
      />

      {/* Primary Animated Sphere Wireframe container rotating on multiple bounds */}
      <motion.div
        className="w-full h-full relative"
        animate={{
          rotateZ: [0, 360],
          rotateX: [15, 45, 15],
          rotateY: [-15, 30, -15],
        }}
        transition={{
          rotateZ: { duration: speed, repeat: Infinity, ease: "linear" },
          rotateX: { duration: speed * 0.8, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: speed * 0.9, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0 overflow-visible">
          {/* Outer Ring boundary */}
          <circle 
            cx="100" 
            cy="100" 
            r="90" 
            fill="none" 
            stroke={color1} 
            strokeWidth="0.75" 
            strokeDasharray="4 8" 
            className="opacity-25" 
          />

          {/* Latitude and Longitude orbital paths */}
          {/* Latitude ellipse 1 */}
          <ellipse 
            cx="100" 
            cy="100" 
            rx="90" 
            ry="25" 
            fill="none" 
            stroke={color2} 
            strokeWidth="1" 
            strokeDasharray="2 3" 
            className="opacity-30" 
          />
          {/* Latitude ellipse 2 */}
          <ellipse 
            cx="100" 
            cy="100" 
            rx="90" 
            ry="55" 
            fill="none" 
            stroke={color1} 
            strokeWidth="0.75" 
            className="opacity-20" 
          />

          {/* Longitude ellipse 1 */}
          <ellipse 
            cx="100" 
            cy="100" 
            rx="25" 
            ry="90" 
            fill="none" 
            stroke={color1} 
            strokeWidth="1" 
            strokeDasharray="3 4" 
            className="opacity-35" 
          />
          {/* Longitude ellipse 2 */}
          <ellipse 
            cx="100" 
            cy="100" 
            rx="60" 
            ry="90" 
            fill="none" 
            stroke={color2} 
            strokeWidth="0.75" 
            className="opacity-20" 
          />

          {/* Diagonal Angle Ring 1 */}
          <g transform="rotate(45 100 100)">
            <ellipse 
              cx="100" 
              cy="100" 
              rx="90" 
              ry="18" 
              fill="none" 
              stroke={color1} 
              strokeWidth="0.75" 
              className="opacity-25" 
            />
          </g>
          {/* Diagonal Angle Ring 2 */}
          <g transform="rotate(135 100 100)">
            <ellipse 
              cx="100" 
              cy="100" 
              rx="90" 
              ry="35" 
              fill="none" 
              stroke={color2} 
              strokeWidth="0.75" 
              strokeDasharray="5 5" 
              className="opacity-30" 
            />
          </g>

          {/* Core nucleus glow */}
          <circle 
            cx="100" 
            cy="100" 
            r="4.5" 
            fill={color2} 
            className="opacity-60 animate-pulse" 
          />

          {/* Small orbital focus dots */}
          <circle cx="100" cy="10" r="2.5" fill={color1} className="opacity-70" />
          <circle cx="10" cy="100" r="2" fill={color2} className="opacity-60" />
          <circle cx="190" cy="100" r="2.5" fill={color1} className="opacity-70" />
          <circle cx="100" cy="190" r="2" fill={color2} className="opacity-60" />
          <circle cx="150" cy="40" r="1.5" fill={color1} className="opacity-50" />
          <circle cx="50" cy="160" r="1.5" fill={color2} className="opacity-50" />
        </svg>
      </motion.div>
    </div>
  );
}

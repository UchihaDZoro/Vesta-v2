import React, { useState } from "react";

interface VestaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
  variant?: "transparent" | "cream-plate" | "dark-plate";
}

export default function VestaLogo({
  className = "",
  size = 40,
  showText = false,
  textClassName = "",
  variant = "transparent",
}: VestaLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div 
        className="relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
        style={{ width: size, height: size }}
      >
        {!imgFailed ? (
          <img
            src="/Logo.png"
            alt="Vesta Logo"
            className="w-full h-full object-contain rounded-full select-none"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        ) : (
          /* Safe, elegant custom Vector Fallback in case of image failure */
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="46" stroke="#D4A64A" strokeWidth="2.5" fill="#FAF9F7" />
            <circle cx="50" cy="50" r="42" stroke="#D4A64A" strokeWidth="0.75" fill="none" opacity="0.6" />
            
            {/* Minimalist Wing & Lifeline representation */}
            <path
              d="M 22 54 L 34 54 L 38 46 L 42 66 L 46 42 L 50 56 L 54 54"
              stroke="#0F8B8D"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 52 35 C 59 34, 70 24, 74 15 C 76 11, 71 13, 66 18 C 59 23, 50 31, 52 35 Z"
              fill="#D4A64A"
            />
            <text
              x="50"
              y="82"
              fill="#0F8B8D"
              fontSize="8"
              fontWeight="bold"
              letterSpacing="2.5"
              textAnchor="middle"
              className="font-sans font-extrabold tracking-[0.25em]"
            >
              VESTA
            </text>
          </svg>
        )}
      </div>

      {showText && (
        <span className={`font-display font-bold uppercase tracking-[0.25em] text-sm text-brand-teal ${textClassName}`}>
          Vesta
        </span>
      )}
    </div>
  );
}

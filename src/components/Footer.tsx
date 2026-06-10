import React from "react";
import VestaLogo from "./VestaLogo";
import { Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#F5F3ED] border-t border-[#E5E2D8] pt-12 pb-6 px-6 lg:px-8">
      {/* Visual top border sheen */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto xl:max-w-6xl relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-10 border-b border-[#E1DEC9]/40">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleScrollToTop}>
              <VestaLogo size={40} showText={true} />
            </div>
            <p className="text-sm text-neutral-500 font-light max-w-sm leading-relaxed">
              Vesta is a forward-thinking safety tech enterprise creating intelligent wearable hardware, intuitive smart ecosystems, and connected response networks.
            </p>
            <p className="text-xs text-brand-gold/80 font-semibold tracking-widest uppercase italic">
              Intelligent Safety. Human Confidence.
            </p>
          </div>

          {/* Quick Sitemap Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest text-neutral-400 uppercase font-mono">
              Navigate
            </h4>
            <ul className="space-y-2">
              {[
                { name: "About Us", href: "#about" },
                { name: "Products", href: "#products" },
                { name: "Mission", href: "#mission" },
                { name: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                     onClick={() => handleLinkClick(link.href)}
                     className="text-sm text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Circles & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest text-neutral-400 uppercase font-mono">
              Channels
            </h4>
            
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:vesta.wearables@gmail.com"
                  className="text-sm text-neutral-600 hover:text-neutral-950 transition-colors flex items-center gap-2"
                >
                  <Mail size={14} className="text-brand-teal" />
                  <span>vesta.wearables@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/vesta-wearables/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-600 hover:text-brand-gold transition-colors flex items-center gap-2"
                >
                  <Linkedin size={14} className="text-brand-gold" />
                  <span>LinkedIn Page</span>
                </a>
              </li>
            </ul>

            {/* Back to top indicator capsule */}
            <div className="pt-1.5">
              <button
                onClick={handleScrollToTop}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#DCDAD2] hover:border-brand-gold bg-white hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer focus:outline-none shadow-sm"
              >
                <span>Back to Top</span>
                <ArrowUp size={10} />
              </button>
            </div>

          </div>

        </div>

        {/* Footer Base bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 font-light font-mono">
          <span>&copy; {new Date().getFullYear()} Vesta Technologies Pvt. Ltd. All rights reserved.</span>
          <span>Made in India &middot; Engineered for Global Safety</span>
        </div>

      </div>
    </footer>
  );
}

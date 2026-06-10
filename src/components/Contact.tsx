import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Linkedin, CheckCircle2, Send, ShieldCheck, X } from "lucide-react";

export default function Contact() {
  const [tab, setTab] = useState<"Partnership" | "Investor" | "General">("General");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const [pathanImgError, setPathanImgError] = useState(false);
  const [nancyImgSrc, setNancyImgSrc] = useState("/image_1.png");
  const [nancyImgError, setNancyImgError] = useState(false);

  const handleNancyError = () => {
    if (nancyImgSrc === "/image_1.png") {
      setNancyImgSrc("/image-1.png");
    } else if (nancyImgSrc === "/image-1.png") {
      setNancyImgSrc("/image_2.png");
    } else if (nancyImgSrc === "/image_2.png") {
      setNancyImgSrc("/image.png");
    } else {
      setNancyImgError(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const { name, email, organization, message } = formData;

    // Check mandatory fields
    if (!name.trim() || !email.trim() || !organization.trim() || !message.trim()) {
      setValidationError("All form fields are mandatory. Please fill in all details.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setValidationError("Please enter a valid email address (e.g., mail@domain.com).");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          organization: organization.trim(),
          message: message.trim(),
          category: tab,
        }),
      });

      const contentType = response.headers.get("content-type");
      let data: any = {};

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
          throw new Error("Unable to contact backend mailer (received HTML page). If you deployed to Hostinger, please make sure you copied the .htaccess and api-contact.php from your build folder.");
        }
        throw new Error("Invalid response received from the mail server.");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setIsSubmitted(true);
      setShowToast(true);
      // Auto-hide toast after 6 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 6000);
    } catch (err: any) {
      console.error("Form delivery error:", err);
      setValidationError(err.message || "Connection failed. Unable to dispatch message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", organization: "", message: "" });
    setIsSubmitted(false);
    setValidationError(null);
    setShowToast(false);
  };

  return (
    <div
      id="contact"
      className="relative py-4 md:py-6 lg:py-8 w-full overflow-hidden bg-transparent"
    >
      {/* Background visual gradient blobs */}
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-radial from-brand-teal/8 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-radial from-brand-gold/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
          <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block mb-1.5 sm:mb-2">
            Get in Touch
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#18181B]">
            Let's Build a Safer <br />
            <span className="text-gradient-teal-gold">Future Together</span>
          </h2>
          <p className="mt-3 text-neutral-500 text-sm sm:text-base font-light">
            Whether you are an investor, institutional partner, or prospective collaborator, we welcome open conversations. Join our waitlist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start mt-2">
          
          {/* LEFT: Contact & Inquiries Form Capsule */}
          <div className="lg:col-span-7 rounded-2xl border border-[#EBE9E2] bg-white p-5 sm:p-6 relative shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Subject Category Segment Tabs */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                      Inquiry Category
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 bg-neutral-50 p-1 border border-[#EBE9E2] rounded-xl">
                      {(["Partnership", "Investor", "General"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setTab(type)}
                          className={`py-2 px-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                            tab === type
                              ? "bg-brand-gold text-[#0A0A0A] shadow-sm"
                              : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100"
                          }`}
                        >
                          {type === "General" ? "General Contact" : `${type} Inquiry`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-[#FCFAF7] border border-[#DCDAD2] rounded-lg p-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-brand-teal focus:bg-white transition-all font-light"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-[#FCFAF7] border border-[#DCDAD2] rounded-lg p-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-brand-teal focus:bg-white transition-all font-light"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                      Organization / Association *
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                      placeholder="Organization Name"
                      className="w-full bg-[#FCFAF7] border border-[#DCDAD2] rounded-lg p-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-brand-teal focus:bg-white transition-all font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                      Message Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Hello, I’m interested in your upcoming wearable releases..."
                      className="w-full bg-[#FCFAF7] border border-[#DCDAD2] rounded-lg p-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-brand-teal focus:bg-white transition-all font-light resize-none"
                    />
                  </div>

                  {/* Validation Error feedback */}
                  {validationError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                      <span>{validationError}</span>
                    </motion.div>
                  )}

                  {/* Submission triggers */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-teal hover:bg-brand-teal-light text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_30px_rgba(15,139,141,0.15)] hover:shadow-[0_4px_35px_rgba(15,139,141,0.25)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
                    >
                      <span>{isSubmitting ? "Sending Dispatch..." : "Send Message"}</span>
                      <Send size={14} className={isSubmitting ? "animate-pulse" : ""} />
                    </button>
                    <p className="text-center text-[9px] text-neutral-400 mt-2.5 font-mono font-medium tracking-wider">
                      REPLIES WITHIN 24 HOURS
                    </p>
                  </div>

                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-10 text-center flex flex-col items-center select-none"
                >
                  <div className="p-4 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold mb-6 animate-glow-pulse">
                    <CheckCircle2 size={44} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="font-display font-extrabold text-2xl text-neutral-900">
                    Inquiry Received
                  </h3>
                  
                  <p className="mt-4 text-neutral-600 text-sm max-w-sm font-light">
                    Thank you. Your message regarding <strong className="text-brand-gold">{tab}</strong> has been transmitted successfully. A Vesta leadership specialist will connect with you shortly.
                  </p>

                  <button
                    onClick={handleReset}
                    className="mt-8 px-6 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase text-[#0A0A0A] bg-brand-gold hover:bg-brand-gold-light transition-all cursor-pointer shadow-sm"
                  >
                    Submit Another Receipt
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* RIGHT: Leadership Profiles */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* FOUNDER PROFILE */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 4 }}
              className="p-5 sm:p-6 rounded-xl border border-[#EBE9E2] bg-white relative overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(212,166,74,0.01) 100%)",
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-gold/5 via-transparent to-transparent rounded-bl-full pointer-events-none z-0" />
              
              <div className="flex flex-row gap-4 sm:gap-6 justify-between items-stretch relative z-10 w-full">
                {/* Left side: Information and contacts */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.2em] text-brand-gold uppercase block">
                      FOUNDING TEAM
                    </span>
                    <h4 className="font-display font-extrabold text-lg sm:text-xl text-neutral-900 mt-1">
                      Pathan Gulamgaush
                    </h4>
                    <p className="text-xs text-brand-teal font-medium uppercase tracking-wider mt-0.5">
                      Co-Founder & CTO — Vesta
                    </p>
                  </div>

                  {/* Action Handles (inside left block) */}
                  <div className="space-y-2 border-t border-neutral-100 pt-4 mt-6">
                    <a
                      href="mailto:pathangulam203@gmail.com"
                      className="flex items-center gap-3 text-xs text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer group/item"
                    >
                      <Mail size={14} className="text-brand-teal group-hover/item:text-brand-gold shrink-0" />
                      <span className="truncate max-w-[140px] sm:max-w-[200px]">pathangulam203@gmail.com</span>
                    </a>
                    
                    <a
                      href="tel:+918758964805"
                      className="flex items-center gap-3 text-xs text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer group/item"
                    >
                      <Phone size={14} className="text-brand-teal group-hover/item:text-brand-gold shrink-0" />
                      <span>+91 87589 64805</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/gulamgaush-pathan/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-xs text-neutral-600 hover:text-brand-gold transition-colors cursor-pointer group/item pt-1"
                    >
                      <Linkedin size={14} className="text-brand-gold shrink-0" />
                      <span className="font-bold underline decoration-brand-gold/20">Connect on LinkedIn →</span>
                    </a>
                  </div>
                </div>

                {/* Right side: Elegant Rounded Corner Image Box */}
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl border-2 border-brand-gold/30 bg-neutral-50 overflow-hidden shrink-0 shadow-md relative group/image flex items-center justify-center">
                  {!pathanImgError ? (
                    <img
                      src="/pathan_gulamgaush.jpg"
                      alt="Pathan Gulamgaush"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={() => setPathanImgError(true)}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold via-white to-brand-teal/20 flex flex-col items-center justify-center font-display font-black text-[#8E6515] text-xl">
                      PG
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* CO-FOUNDER PROFILE */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              whileHover={{ x: 4 }}
              className="p-5 sm:p-6 rounded-xl border border-[#EBE9E2] bg-white relative overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(212,166,74,0.01) 100%)",
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-teal/5 via-transparent to-transparent rounded-bl-full pointer-events-none z-0" />

              <div className="flex flex-row gap-4 sm:gap-6 justify-between items-stretch relative z-10 w-full">
                {/* Left side: Information and contacts */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.2em] text-brand-gold uppercase block">
                      FOUNDING TEAM
                    </span>
                    <h4 className="font-display font-extrabold text-lg sm:text-xl text-neutral-900 mt-1">
                      Nancy Srivastava
                    </h4>
                    <p className="text-xs text-brand-teal font-medium uppercase tracking-wider mt-0.5">
                      Co-Founder & CEO — Vesta
                    </p>
                  </div>

                  {/* Action Handles */}
                  <div className="space-y-2 border-t border-neutral-100 pt-4 mt-6">
                    <a
                      href="mailto:edhas6514@gmail.com"
                      className="flex items-center gap-3 text-xs text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer group/item"
                    >
                      <Mail size={14} className="text-brand-teal group-hover/item:text-brand-gold shrink-0" />
                      <span className="truncate max-w-[140px] sm:max-w-[200px]">edhas6514@gmail.com</span>
                    </a>

                    <a
                      href="tel:+919219342528"
                      className="flex items-center gap-3 text-xs text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer group/item"
                    >
                      <Phone size={14} className="text-brand-teal group-hover/item:text-brand-gold shrink-0" />
                      <span>+91 92193 42528</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/nancy-srivastava-2k05/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-xs text-neutral-600 hover:text-brand-gold transition-colors cursor-pointer group/item pt-1"
                    >
                      <Linkedin size={14} className="text-brand-gold shrink-0" />
                      <span className="font-bold underline decoration-brand-gold/20">Connect on LinkedIn →</span>
                    </a>
                  </div>
                </div>

                {/* Right side: Elegant Rounded Corner Image Box */}
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl border-2 border-brand-teal/30 bg-neutral-50 overflow-hidden shrink-0 shadow-md relative group/image flex items-center justify-center">
                  {!nancyImgError ? (
                    <img
                      src="/nancy.jpeg"
                      alt="Nancy Srivastava"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={() => setNancyImgError(true)}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-teal via-white to-brand-gold/20 flex flex-col items-center justify-center font-display font-black text-brand-teal text-xl">
                      NS
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Premium Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white border-l-4 border-brand-teal rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-[#EBE9E2]/80 p-4 font-sans text-neutral-800"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-brand-teal/10 p-1.5 text-brand-teal shrink-0 mt-0.5">
                <CheckCircle2 size={16} />
              </div>
              <div className="flex-grow">
                <p className="text-[10px] font-bold uppercase tracking-wider text-brand-teal">
                  Dispatch Successful
                </p>
                <h4 className="text-xs font-bold text-neutral-900 mt-1">
                  Inquiry safekept & sent
                </h4>
                <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                  Your details have been securely delivered. We will contact you soon.
                </p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer shrink-0 mt-0.5"
                aria-label="Close Toast"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

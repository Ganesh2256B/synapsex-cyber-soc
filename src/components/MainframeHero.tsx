import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

interface MainframeHeroProps {
  onOpenSoc: () => void;
}

const HERO_VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4";
const SERVICE_OPTIONS = ["Brand", "Digital", "Campaign", "Other"];

export const MainframeHero: React.FC<MainframeHeroProps> = ({ onOpenSoc }) => {
  // Navigation & Interactive Pill States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [services, setServices] = useState<string[]>([]);

  // Typewriter hook for headline
  const { displayed, done } = useTypewriter("we'd love to\nhear from you!", 38, 600);

  // Video Scrubbing & Autoplay Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previousXRef = useRef<number | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const pendingTimeRef = useRef<number | null>(null);

  // Desktop Mouse Scrubbing & Mobile Autoplay Effect Hooks
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mobile Autoplay Hook (< 1024px)
    if (window.innerWidth < 1024) {
      video.autoplay = true;
      video.play().catch(() => {});
      return;
    }

    // Desktop Mouse Scrubbing Hook (>= 1024px)
    const handleSeeked = () => {
      if (pendingTimeRef.current !== null && videoRef.current) {
        const nextTime = pendingTimeRef.current;
        pendingTimeRef.current = null;
        videoRef.current.currentTime = nextTime;
      } else {
        isSeekingRef.current = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024 || !videoRef.current || !videoRef.current.duration) return;

      if (previousXRef.current === null) {
        previousXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - previousXRef.current;
      previousXRef.current = e.clientX;

      const duration = videoRef.current.duration;
      const timeDelta = (delta / window.innerWidth) * 0.8 * duration;
      const targetTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + timeDelta));

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        videoRef.current.currentTime = targetTime;
      } else {
        pendingTimeRef.current = targetTime;
      }
    };

    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleService = (option: string) => {
    setServices((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
    );
  };

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      
      {/* 4. Interactive Navbar */}
      <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
        {/* Logo (Left side) */}
        <div className="flex flex-row items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            Mainframe&reg;
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
            &#10033;
          </span>
        </div>

        {/* Desktop Nav Links (Center) */}
        <nav className="hidden md:flex flex-row items-center text-[23px] text-black font-normal">
          <a href="#labs" className="hover:opacity-60 transition-opacity">Labs</a>
          <span className="opacity-40">,&nbsp;</span>
          <a href="#studio" className="hover:opacity-60 transition-opacity">Studio</a>
          <span className="opacity-40">,&nbsp;</span>
          <a href="#openings" className="hover:opacity-60 transition-opacity">Openings</a>
          <span className="opacity-40">,&nbsp;</span>
          <a href="#shop" className="hover:opacity-60 transition-opacity">Shop</a>
          <span className="opacity-40">,&nbsp;</span>
          <button
            onClick={onOpenSoc}
            className="text-emerald-900 font-bold hover:opacity-60 transition-opacity flex items-center gap-1.5 cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            Mini SOC
          </button>
        </nav>

        {/* Desktop CTA (Right) */}
        <div className="hidden md:block">
          <button
            onClick={onOpenSoc}
            className="text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer"
          >
            Get in touch
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden z-20 flex flex-col justify-between w-6 h-4 focus:outline-none cursor-pointer"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>

        {/* Mobile Navigation Overlay */}
        <div
          className={`fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-all duration-300 flex flex-col justify-center px-8 md:hidden ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col gap-6 text-2xl font-medium text-black">
            <a href="#labs" onClick={() => setIsMobileMenuOpen(false)}>Labs</a>
            <a href="#studio" onClick={() => setIsMobileMenuOpen(false)}>Studio</a>
            <a href="#openings" onClick={() => setIsMobileMenuOpen(false)}>Openings</a>
            <a href="#shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSoc();
              }}
              className="text-emerald-800 font-bold text-left flex items-center gap-2"
            >
              <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse" />
              Mini SOC Operations Center
            </button>
          </div>
        </div>
      </header>

      {/* 3. Background Video Component (with Native Scrubbing) */}
      <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-right lg:object-right-bottom"
        />
      </div>

      {/* 5. Content Layout Container */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main id="spade-hero" className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center pt-28 sm:pt-36">
          
          {/* 6. Typewriter Hook and Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
              )}
            </h1>
          </motion.div>

          {/* 7. Secondary Description Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
              Whether you have questions, feedback, <br /> drop us a message and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* 8. Interactive Multi-Select Service Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-2xl"
          >
            <h2 className="text-2xl font-medium tracking-tight mb-2 text-black">
              What sort of service?
            </h2>
            <p className="opacity-85 text-[#738273] mb-8 text-base">
              Select all that apply
            </p>

            {/* Service Pills Container */}
            <div className="flex flex-wrap gap-3 mb-6">
              {SERVICE_OPTIONS.map((option) => {
                const isActive = services.includes(option);
                return (
                  <motion.button
                    key={option}
                    onClick={() => toggleService(option)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer select-none ${
                      isActive
                        ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform'
                        : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.span>
                    )}
                    <span>{option}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Contingent Feedback Status Banner */}
            <AnimatePresence mode="wait">
              {services.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="italic text-xs text-[#738273]"
                >
                  Please click to select services above.
                </motion.p>
              ) : (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="bg-[#FAFBF9] border border-[#F1F3F1] rounded-2xl p-4 flex items-center justify-between shadow-sm overflow-hidden"
                >
                  <span className="text-sm font-medium text-[#1C2E1E]">
                    Ready to inquire about: <strong className="text-black">{services.join(', ')}</strong>
                  </span>
                  <button
                    onClick={onOpenSoc}
                    className="text-[#4D6D47] uppercase text-xs font-bold tracking-wider flex items-center gap-1.5 hover:text-[#1C2E1E] transition-colors cursor-pointer"
                  >
                    <span>Let's Go</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </main>
      </div>
    </div>
  );
};

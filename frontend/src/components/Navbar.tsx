import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SynapseXLogo } from './SynapseXLogo';
import { SquashHamburger } from './SquashHamburger';
import { ScrambleText } from './ScrambleText';

interface NavbarProps {
  entranceComplete: boolean;
  onOpenSoc: () => void;
  onOpenShowcase: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ entranceComplete, onOpenSoc, onOpenShowcase }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredDownload, setHoveredDownload] = useState(false);

  const springConfig = { type: 'spring', stiffness: 350, damping: 28 };

  const scrollToPosition = (posY: number) => {
    window.scrollTo({ top: posY, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleDownload = () => {
    window.open('https://github.com/Ganesh2256B/synapsex-cyber-soc/archive/refs/heads/main.zip', '_blank');
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full h-20 z-50 px-4 sm:px-6 md:px-8 flex items-center justify-between pointer-events-auto bg-transparent"
    >
      {/* Desktop Navigation (sm and up) */}
      <div className="hidden sm:flex items-center gap-2">
        {/* Logo Pill */}
        <AnimatePresence>
          {!isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.22)' }}
              whileTap={{ scale: 0.98 }}
              className="h-12 px-5 bg-white/15 backdrop-blur-md rounded-[14px] flex items-center gap-2.5 cursor-pointer transition-colors duration-200"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <SynapseXLogo size={18} className="text-white" />
              <span className="text-white text-[16px] font-medium tracking-tight">SynapseX</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanding Menu Pill */}
        <motion.div
          initial={false}
          animate={{ width: isMenuOpen ? 380 : 48 }}
          transition={springConfig}
          className="h-12 rounded-[14px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
        >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className={`flex items-center justify-center transition-all duration-200 shrink-0 ${
              isMenuOpen
                ? 'w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5'
                : 'w-12 h-12 rounded-[14px]'
            }`}
          >
            <SquashHamburger isOpen={isMenuOpen} />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-5 px-4 whitespace-nowrap text-[14px]"
              >
                <button
                  onMouseEnter={() => setHoveredLink('about')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => scrollToPosition(window.innerHeight)}
                  className="text-white/85 hover:text-white transition-colors cursor-pointer"
                >
                  <ScrambleText text="About" isHovered={hoveredLink === 'about'} />
                </button>
                <button
                  onMouseEnter={() => setHoveredLink('metrics')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => scrollToPosition(window.innerHeight * 2)}
                  className="text-white/85 hover:text-white transition-colors cursor-pointer"
                >
                  <ScrambleText text="Metrics" isHovered={hoveredLink === 'metrics'} />
                </button>
                <button
                  onMouseEnter={() => setHoveredLink('guide')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenShowcase();
                  }}
                  className="text-white/85 hover:text-white transition-colors cursor-pointer"
                >
                  <ScrambleText text="Guide" isHovered={hoveredLink === 'guide'} />
                </button>
                <button
                  onMouseEnter={() => setHoveredLink('soc')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenSoc();
                  }}
                  className="text-cyber-cyan hover:text-white flex items-center gap-1.5 font-bold transition-colors cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                  <ScrambleText text="SOC Matrix" isHovered={hoveredLink === 'soc'} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile Navigation (below sm) */}
      <div className="flex sm:hidden items-center gap-1.5 w-full justify-between">
        {/* Logo Pill Mobile */}
        <motion.div
          animate={{ width: isMenuOpen ? 0 : 'auto', opacity: isMenuOpen ? 0 : 1 }}
          transition={springConfig}
          className="overflow-hidden"
        >
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="h-9 px-3 bg-white/15 backdrop-blur-md rounded-[10px] flex items-center gap-2 cursor-pointer shrink-0"
          >
            <SynapseXLogo size={14} className="text-white" />
            <span className="text-white text-[13px] font-medium tracking-tight">SynapseX</span>
          </div>
        </motion.div>

        {/* Mobile Expanding Menu Pill */}
        <motion.div
          animate={{ width: isMenuOpen ? '100%' : 36 }}
          transition={springConfig}
          className="h-9 rounded-[10px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
        >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-9 h-9 flex items-center justify-center shrink-0"
          >
            <SquashHamburger isOpen={isMenuOpen} isMobile />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                className="flex items-center gap-3 px-2 text-[13px] overflow-x-auto"
              >
                <button onClick={() => scrollToPosition(window.innerHeight)} className="text-white/90 whitespace-nowrap">
                  About
                </button>
                <button onClick={() => { setIsMenuOpen(false); onOpenShowcase(); }} className="text-white/90 whitespace-nowrap">
                  Guide
                </button>
                <button onClick={() => { setIsMenuOpen(false); onOpenSoc(); }} className="text-cyber-cyan font-bold whitespace-nowrap">
                  SOC
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Group: Guide Button, Mini SOC Button & Direct Zip Download Button */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        <button
          onClick={onOpenShowcase}
          className="hidden lg:flex items-center gap-1.5 h-12 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-[13px] transition-all cursor-pointer"
        >
          <i className="bi bi-compass text-cyber-cyan"></i>
          <span>Feature Guide</span>
        </button>

        <button
          onClick={onOpenSoc}
          className="hidden md:flex items-center gap-2 h-12 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-[14px] transition-all cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
          </span>
          <span>Mini SOC</span>
        </button>

        <motion.button
          onClick={handleDownload}
          onMouseEnter={() => setHoveredDownload(true)}
          onMouseLeave={() => setHoveredDownload(false)}
          whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
          whileTap={{ scale: 0.97 }}
          className="h-9 sm:h-12 px-3.5 sm:px-6 bg-white text-black rounded-full flex items-center gap-2 font-medium text-[13px] sm:text-[15px] cursor-pointer transition-colors shadow-lg"
          title="Click to download full project ZIP from GitHub"
        >
          <i className="bi bi-apple text-[15px] sm:text-[17px]"></i>
          <ScrambleText text="Download" isHovered={hoveredDownload} />
        </motion.button>
      </div>
    </motion.nav>
  );
};

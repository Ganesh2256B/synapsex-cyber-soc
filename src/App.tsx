import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CinematicSection } from './components/CinematicSection';
import { MetricsSection } from './components/MetricsSection';
import { TechSection } from './components/TechSection';
import { ArchSection } from './components/ArchSection';
import { Footer } from './components/Footer';
import { SocModal } from './components/soc/SocModal';
import { ProjectShowcaseModal } from './components/ProjectShowcaseModal';

export const App: React.FC = () => {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [isSocOpen, setIsSocOpen] = useState(false);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div
      style={{ fontFamily: '"Space Mono", monospace' }}
      className="relative w-full min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden"
    >
      {/* Floating Feature Guide Launch Pill */}
      <button
        onClick={() => setIsShowcaseOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-cyber-cyan text-black px-4 py-2.5 rounded-full font-bold text-[12px] flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer"
      >
        <i className="bi bi-info-circle-fill text-[15px]"></i>
        <span>Project Capabilities & Guide</span>
      </button>

      {/* Navbar */}
      <Navbar
        entranceComplete={entranceComplete}
        onOpenSoc={() => setIsSocOpen(true)}
        onOpenShowcase={() => setIsShowcaseOpen(true)}
      />

      {/* Main Landing Page Sections */}
      <main>
        <HeroSection onEntranceComplete={() => setEntranceComplete(true)} />
        <CinematicSection />
        <MetricsSection />
        <TechSection />
        <ArchSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cyber Threat Operations Center (Mini SOC) Modal */}
      <SocModal
        isOpen={isSocOpen}
        onClose={() => setIsSocOpen(false)}
      />

      {/* Project Capabilities & Feature Showcase Modal */}
      <ProjectShowcaseModal
        isOpen={isShowcaseOpen}
        onClose={() => setIsShowcaseOpen(false)}
        onOpenSoc={() => setIsSocOpen(true)}
      />
    </div>
  );
};

export default App;

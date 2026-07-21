import React, { useState } from 'react';
import { initPolyfills } from './utils/polyfills';
import { MainframeHero } from './components/MainframeHero';
import { SocModal } from './components/soc/SocModal';
import { ProjectShowcaseModal } from './components/ProjectShowcaseModal';

// Guarantee polyfills initialization
initPolyfills();

export const App: React.FC = () => {
  const [isSocOpen, setIsSocOpen] = useState(false);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased">
      {/* Mainframe Hero Section */}
      <MainframeHero onOpenSoc={() => setIsSocOpen(true)} />

      {/* Floating Mini SOC Access Pill */}
      <button
        onClick={() => setIsSocOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#1C2E1E] text-white px-5 py-3 rounded-full font-medium text-sm flex items-center gap-2.5 shadow-xl hover:scale-105 transition-all cursor-pointer border border-emerald-900/30"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Launch 3D Earth Mini SOC</span>
      </button>

      {/* Cyber Threat Operations Center (Mini SOC) Modal with 3D Earth */}
      <SocModal
        isOpen={isSocOpen}
        onClose={() => setIsSocOpen(false)}
      />

      {/* Project Showcase & Capabilities Modal */}
      <ProjectShowcaseModal
        isOpen={isShowcaseOpen}
        onClose={() => setIsShowcaseOpen(false)}
        onOpenSoc={() => setIsSocOpen(true)}
      />
    </div>
  );
};

export default App;

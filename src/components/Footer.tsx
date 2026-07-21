import React from 'react';
import { SynapseXLogo } from './SynapseXLogo';

const FOOTER_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black overflow-hidden select-none border-t border-white/10">
      <div className="flex flex-col md:flex-row min-h-[400px] w-full">
        {/* Left Half: Video #5 */}
        <div className="relative w-full md:w-1/2 h-[300px] md:h-auto overflow-hidden">
          <video
            src={FOOTER_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Half: Content Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-10 sm:p-16 font-mono">
          {/* Top Block */}
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <SynapseXLogo size={18} className="text-white/70" />
              <span className="text-[15px] font-medium text-white/70 tracking-tight">
                SynapseX
              </span>
            </div>

            <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
              The next evolution of human-machine interaction. Built for those who refuse to be limited by biology alone.
            </p>
          </div>

          {/* Bottom Block */}
          <div>
            <p className="text-white/25 text-[12px] mt-12">
              &copy; 2026 SynapseX Labs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

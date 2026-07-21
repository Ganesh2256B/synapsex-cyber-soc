import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrambleText } from './ScrambleText';

interface ProjectShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSoc: () => void;
}

export const ProjectShowcaseModal: React.FC<ProjectShowcaseModalProps> = ({
  isOpen,
  onClose,
  onOpenSoc,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'workflow' | 'demo'>('overview');
  const [hoveredButton, setHoveredButton] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between overflow-y-auto font-mono text-white p-4 sm:p-6 md:p-10 select-none"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyber-cyan animate-ping" />
              <h1 className="text-[18px] sm:text-[22px] font-bold tracking-tight text-white flex items-center gap-2">
                SynapseX System Capabilities & Feature Guide
              </h1>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-lg transition-colors cursor-pointer"
            >
              &times;
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 my-6 overflow-x-auto border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-cyber-cyan text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              1. Executive Overview
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                activeTab === 'features'
                  ? 'bg-cyber-cyan text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              2. Interactive Features List
            </button>
            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                activeTab === 'workflow'
                  ? 'bg-cyber-cyan text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              3. System Workflow (What Happens)
            </button>
            <button
              onClick={() => setActiveTab('demo')}
              className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                activeTab === 'demo'
                  ? 'bg-cyber-cyan text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              4. Demo Action Center
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 max-w-5xl mx-auto w-full my-4 text-[13px] sm:text-[14px] leading-relaxed text-white/80">
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-6">
                <div className="p-6 bg-white/[0.03] border border-white/10 rounded-xl">
                  <h2 className="text-[18px] font-bold text-cyber-cyan mb-2">
                    What is SynapseX?
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    SynapseX is a dual-purpose platform combining a futuristic neural-AI landing site with a real-time **AI-Powered Global Cyber Threat Detection & Automated Response Operations Center (Mini SOC)**.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
                    <h3 className="text-[15px] font-bold text-white mb-2 flex items-center gap-2">
                      <i className="bi bi-display text-cyber-cyan"></i> Landing Experience Features
                    </h3>
                    <ul className="list-disc list-inside text-white/60 space-y-1.5 text-[12px]">
                      <li>Mouse-Scrubbed Video Hero timeline control</li>
                      <li>Custom character scramble entrance & hover effects</li>
                      <li>3D scroll-driven perspective text rotation</li>
                      <li>5 HD CloudFront video backgrounds</li>
                      <li>Responsive expanding navbar with spring physics</li>
                    </ul>
                  </div>

                  <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
                    <h3 className="text-[15px] font-bold text-white mb-2 flex items-center gap-2">
                      <i className="bi bi-shield-lock text-cyber-red"></i> Mini SOC Operations Features
                    </h3>
                    <ul className="list-disc list-inside text-white/60 space-y-1.5 text-[12px]">
                      <li>IsolationForest Machine Learning anomaly engine</li>
                      <li>Live network telemetry (Mbps, PPS, TCP/UDP ratios)</li>
                      <li>Interactive 2D/3D Global Cyber Threat Vector Map</li>
                      <li>Automated active defense IP null-routing firewall</li>
                      <li>Synthetic attack simulation command center</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                  <span className="text-[11px] text-cyber-cyan font-bold block mb-1">FEATURE #1</span>
                  <h3 className="text-[15px] font-bold text-white mb-2">Mouse Video Scrubbing</h3>
                  <p className="text-[12px] text-white/60">
                    In Section 1 (Hero), moving your mouse horizontally across the screen scrubs the background video backward and forward in real-time with zero lag.
                  </p>
                </div>

                <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                  <span className="text-[11px] text-cyber-amber font-bold block mb-1">FEATURE #2</span>
                  <h3 className="text-[15px] font-bold text-white mb-2">AI Anomaly Scoring</h3>
                  <p className="text-[12px] text-white/60">
                    The backend uses an <code className="text-cyber-cyan">IsolationForest</code> ML model combined with heuristic rules to score incoming traffic risk from 0 to 100 in real time.
                  </p>
                </div>

                <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                  <span className="text-[11px] text-cyber-red font-bold block mb-1">FEATURE #3</span>
                  <h3 className="text-[15px] font-bold text-white mb-2">Automated Firewall</h3>
                  <p className="text-[12px] text-white/60">
                    When an attack score exceeds the sensitivity threshold, the system automatically null-routes the attacker's IP and sets an auto-decay expiration timer.
                  </p>
                </div>

                <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                  <span className="text-[11px] text-cyber-green font-bold block mb-1">FEATURE #4</span>
                  <h3 className="text-[15px] font-bold text-white mb-2">Global Attack Map</h3>
                  <p className="text-[12px] text-white/60">
                    Displays animated bezier curve attack arcs connecting resolved origin locations (Lat/Long via GeoIP) straight to the target SOC hub node.
                  </p>
                </div>

                <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                  <span className="text-[11px] text-cyber-cyan font-bold block mb-1">FEATURE #5</span>
                  <h3 className="text-[15px] font-bold text-white mb-2">3D Scroll Text</h3>
                  <p className="text-[12px] text-white/60">
                    Section 2 uses Framer Motion spring physics to tilt text on a 3D perspective plane as you scroll through the page.
                  </p>
                </div>

                <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                  <span className="text-[11px] text-cyber-amber font-bold block mb-1">FEATURE #6</span>
                  <h3 className="text-[15px] font-bold text-white mb-2">Attack Simulator</h3>
                  <p className="text-[12px] text-white/60">
                    Trigger SYN Floods, UDP Amplification, ICMP Ping Sweeps, and Brute Force Scans on demand using built-in buttons or <code className="text-cyber-cyan">traffic_simulator.py</code>.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'workflow' && (
              <div className="flex flex-col gap-4">
                <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-cyber-cyan text-black flex items-center justify-center font-bold text-[14px] shrink-0">1</span>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">Packet Ingestion & Feature Extraction</h3>
                    <p className="text-[12px] text-white/60 mt-1">
                      Network traffic is aggregated over 2-second sliding windows to calculate Packets Per Second (PPS), Byte Rate (BPS), TCP SYN ratios, protocol ratios, and source IP entropy.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-cyber-amber text-black flex items-center justify-center font-bold text-[14px] shrink-0">2</span>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">Hybrid ML Threat Detection</h3>
                    <p className="text-[12px] text-white/60 mt-1">
                      The telemetry vector is evaluated by the IsolationForest machine learning model and heuristic threshold triggers. If malicious patterns (e.g. SYN flood) are found, a Threat Score (0-100) is assigned.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-cyber-red text-black flex items-center justify-center font-bold text-[14px] shrink-0">3</span>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">GeoIP Resolution & Visual Mapping</h3>
                    <p className="text-[12px] text-white/60 mt-1">
                      Attacker source IPs are mapped to geographical coordinates (Country, City, Lat/Lng) and drawn as live animated attack arcs on the Global Cyber Threat Vector Map.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-cyber-green text-black flex items-center justify-center font-bold text-[14px] shrink-0">4</span>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">Automated Active Defense Null-Routing</h3>
                    <p className="text-[12px] text-white/60 mt-1">
                      When Auto-Mitigation is enabled, the system immediately executes a firewall drop rule (<code className="text-cyber-cyan">iptables</code> / <code className="text-cyber-cyan">netsh</code>) to block the threat for a configurable duration.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'demo' && (
              <div className="p-6 bg-cyber-card border border-cyber-border rounded-xl flex flex-col items-center text-center gap-6">
                <div>
                  <h2 className="text-[20px] font-bold text-white mb-2">Ready to Test & Launch the Operations Center?</h2>
                  <p className="text-white/60 max-w-lg text-[13px]">
                    Click the button below to launch the live Mini SOC Operations Center, trigger simulated attacks, adjust firewall thresholds, and test real-time AI anomaly detection!
                  </p>
                </div>

                <motion.button
                  onMouseEnter={() => setHoveredButton(true)}
                  onMouseLeave={() => setHoveredButton(false)}
                  onClick={() => {
                    onClose();
                    onOpenSoc();
                  }}
                  className="px-8 py-4 bg-cyber-cyan text-black rounded-full font-bold text-[15px] flex items-center gap-3 cursor-pointer shadow-lg hover:shadow-cyber-cyan/30 transition-all"
                >
                  <i className="bi bi-shield-fill-check text-[18px]"></i>
                  <ScrambleText text="LAUNCH MINI SOC OPERATIONS MATRIX" isHovered={hoveredButton} />
                </motion.button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 shrink-0">
            <span>SynapseX Interactive System Guide</span>
            <span>Version 2.4.0</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

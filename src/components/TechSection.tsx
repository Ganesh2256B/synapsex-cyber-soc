import React from 'react';
import { motion } from 'framer-motion';

const SECTION_4_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4";

interface FeatureCard {
  title: string;
  desc: string;
}

const FEATURES: FeatureCard[] = [
  {
    title: "Cortical Mapping",
    desc: "Real-time spatial reconstruction of active neural regions.",
  },
  {
    title: "Signal Isolation",
    desc: "Separates cognitive intent from biological noise.",
  },
  {
    title: "State Prediction",
    desc: "Anticipates cognitive transitions before they occur.",
  },
  {
    title: "Loop Feedback",
    desc: "Closed-loop adjustment based on outcome correlation.",
  },
];

export const TechSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen h-[100dvh] bg-black overflow-hidden flex flex-col justify-between px-8 sm:px-12 md:px-16 py-12 sm:py-16 select-none">
      {/* Background Video #4 */}
      <video
        src={SECTION_4_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Top Area */}
      <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-6 w-full">
        {/* Left Heading */}
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0 }}
          className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em] font-mono"
        >
          Adaptive <br />
          Intelligence
        </motion.h2>

        {/* Right Paragraph */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2 font-mono"
        >
          The system learns your neural baseline within 72 hours. From there, every cognitive state is mapped, predicted, and optimized in real time.
        </motion.p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, delay: 0.3 }}
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 w-full"
      >
        {FEATURES.map((feat, idx) => (
          <motion.div
            key={feat.title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            className="flex flex-col"
          >
            <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2 font-mono">
              {feat.title}
            </h3>
            <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed font-mono">
              {feat.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

const SECTION_3_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4";

interface MetricItem {
  value: string;
  label: string;
}

const METRICS: MetricItem[] = [
  { value: "2.4ms", label: "Synaptic Latency" },
  { value: "99.7%", label: "Signal Accuracy" },
  { value: "140B", label: "Neural Parameters" },
];

export const MetricsSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center select-none py-32">
      {/* Background Video #3 */}
      <video
        src={SECTION_3_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center font-mono"
        >
          Performance Metrics
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 w-full">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none font-mono">
                {metric.value}
              </span>
              <span className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide font-mono">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

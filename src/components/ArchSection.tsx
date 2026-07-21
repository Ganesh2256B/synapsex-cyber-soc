import React from 'react';
import { motion } from 'framer-motion';

interface LayerCard {
  layerNum: string;
  name: string;
}

const LAYERS: LayerCard[] = [
  { layerNum: "Layer 1", name: "Capture" },
  { layerNum: "Layer 2", name: "Process" },
  { layerNum: "Layer 3", name: "Interface" },
];

export const ArchSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center select-none px-6 py-32">
      <div className="w-full max-w-3xl flex flex-col items-center text-center">
        {/* Heading Block */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
          className="flex flex-col items-center"
        >
          <span className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8 font-mono">
            Architecture
          </span>

          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10 font-mono">
            Three layers. Zero friction.
          </h2>

          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto font-mono">
            Sensor layer captures raw bioelectric signals. Processing layer isolates intent. Interface layer delivers structured output to any connected system.
          </p>
        </motion.div>

        {/* Layer Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-20 flex flex-col items-center gap-4 w-full"
        >
          {LAYERS.map((layer) => (
            <div
              key={layer.layerNum}
              className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
            >
              <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase font-mono">
                {layer.layerNum}
              </span>
              <span className="text-white text-[16px] sm:text-[18px] font-light font-mono">
                {layer.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

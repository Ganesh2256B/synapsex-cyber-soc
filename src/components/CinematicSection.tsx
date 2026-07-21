import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';

const SECTION_2_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4";

export const CinematicSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });

  const yScaleValue = useTransform(springProgress, [0, 1], [60, -120]);
  const opacityValue = useTransform(springProgress, [0.15, 0.35, 0.75, 0.95], [0, 1, 1, 0]);

  const transformTemplate = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen h-[100dvh] bg-black overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background Video #2 */}
      <video
        src={SECTION_2_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Top Gradient Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-[180px] z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #010103 0%, transparent 100%)',
        }}
      />

      {/* Centered 3D Perspective Text Container */}
      <div className="relative z-20 w-full max-w-5xl px-6 sm:px-12 flex items-center justify-center [perspective:400px]">
        <motion.p
          style={{
            transform: transformTemplate,
            opacity: opacityValue,
          }}
          className="font-mono font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none text-center"
        >
          A neural-AI interface built on the architecture of the human nervous system. SynapseX translates synaptic activity into computational intelligence. Every signal becomes measurable, structured, and visible. It continuously reconstructs internal state as a dynamic neural map. Biological noise is filtered into actionable cognitive patterns.
        </motion.p>
      </div>
    </section>
  );
};

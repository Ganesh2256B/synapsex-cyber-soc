import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrambleIn } from './ScrambleIn';

interface HeroSectionProps {
  onEntranceComplete: () => void;
}

const HERO_VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4";

export const HeroSection: React.FC<HeroSectionProps> = ({ onEntranceComplete }) => {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [scrubTime, setScrubTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(10);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // Mouse scrubbing refs
  const lastMouseXRef = useRef<number | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const pendingTargetTimeRef = useRef<number | null>(null);

  // Handle Entrance Timer (800ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setEntranceComplete(true);
      onEntranceComplete();
    }, 800);
    return () => clearTimeout(timer);
  }, [onEntranceComplete]);

  // Video Mouse Scrubbing setup
  const performSeek = (targetTime: number) => {
    if (!videoRef.current) return;
    const duration = videoRef.current.duration || 10;
    const clampedTime = Math.max(0, Math.min(duration, targetTime));

    setScrubTime(clampedTime);
    setVideoDuration(duration);

    if (!isSeekingRef.current) {
      isSeekingRef.current = true;
      videoRef.current.currentTime = clampedTime;
    } else {
      pendingTargetTimeRef.current = clampedTime;
    }
  };

  const handleSeeked = () => {
    if (pendingTargetTimeRef.current !== null && videoRef.current) {
      const nextTime = pendingTargetTimeRef.current;
      pendingTargetTimeRef.current = null;
      videoRef.current.currentTime = nextTime;
      setScrubTime(nextTime);
    } else {
      isSeekingRef.current = false;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lastMouseXRef.current === null) {
        lastMouseXRef.current = e.clientX;
        return;
      }

      const deltaX = e.clientX - lastMouseXRef.current;
      lastMouseXRef.current = e.clientX;

      if (!videoRef.current || !videoRef.current.duration) return;

      const sensitivity = 0.8;
      const duration = videoRef.current.duration;
      const timeDelta = (deltaX / window.innerWidth) * duration * sensitivity;
      const targetTime = videoRef.current.currentTime + timeDelta;

      performSeek(targetTime);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const progressPercent = videoDuration > 0 ? (scrubTime / videoDuration) * 100 : 0;

  return (
    <section className="relative w-full h-screen h-[100dvh] bg-black overflow-hidden flex flex-col select-none">
      {/* Background Video (Mouse Scrubbed, Paused) */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        onSeeked={handleSeeked}
        preload="auto"
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dot Grid Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Large Background Watermark Text "TRANSCENDENCE" */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <h2
          className="font-anton uppercase tracking-[-4px] select-none text-center"
          style={{
            fontSize: 'clamp(120px, 30vw, 521px)',
            marginTop: '50px',
            opacity: 0.10,
            backgroundImage: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          TRANSCENDENCE
        </h2>
      </div>

      {/* Real-Time Mouse Scrubbing Indicator Badge */}
      <div className="absolute top-24 right-6 z-30 pointer-events-none hidden sm:flex items-center gap-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-white/70">
        <i className="bi bi-arrows-arrows text-cyber-cyan"></i>
        <span>Mouse Scrub: {scrubTime.toFixed(1)}s / {videoDuration.toFixed(1)}s</span>
        <div className="w-12 bg-white/20 h-1 rounded-full overflow-hidden">
          <div className="bg-cyber-cyan h-full" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Main Content Layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1.0 }}
        className="relative z-20 w-full h-full flex flex-col justify-between px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
      >
        {/* Top spacer pushing content down */}
        <div className="flex-1" />

        {/* Bottom Row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between w-full">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] font-mono">
              <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={entranceComplete ? { y: 0, opacity: 1 } : { y: 25, opacity: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.215, 0.610, 0.355, 1.000],
              }}
              className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed font-mono"
            >
              Built at the intersection of neuroscience and artificial intelligence. SynapseX continuously maps neural pathways, cognitive load, and physiological states into a single adaptive intelligence layer.
            </motion.p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] text-left md:text-right font-mono">
              <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
            </h1>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

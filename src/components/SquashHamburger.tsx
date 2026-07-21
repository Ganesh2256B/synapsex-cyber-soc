import React from 'react';
import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  isOpen: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}

export const SquashHamburger: React.FC<SquashHamburgerProps> = ({
  isOpen,
  onClick,
  isMobile = false,
}) => {
  const springTransition = { type: 'spring', stiffness: 300, damping: 20 };

  const width = isMobile ? 15 : 18;
  const height = isMobile ? 10 : 12;
  const barHeight = isMobile ? 1.2 : 1.5;

  // Vertical offsets from center
  const yOffset = (height - barHeight) / 2;

  return (
    <div
      onClick={onClick}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="relative flex items-center justify-center cursor-pointer select-none"
    >
      {/* Top Bar */}
      <motion.span
        style={{
          width: '100%',
          height: `${barHeight}px`,
          backgroundColor: '#ffffff',
          borderRadius: '1px',
          position: 'absolute',
          top: 0,
        }}
        animate={{
          y: isOpen ? yOffset : 0,
          rotate: isOpen ? 45 : 0,
        }}
        transition={springTransition}
      />

      {/* Middle Bar */}
      <motion.span
        style={{
          width: '100%',
          height: `${barHeight}px`,
          backgroundColor: '#ffffff',
          borderRadius: '1px',
          position: 'absolute',
          top: `${yOffset}px`,
        }}
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={springTransition}
      />

      {/* Bottom Bar */}
      <motion.span
        style={{
          width: '100%',
          height: `${barHeight}px`,
          backgroundColor: '#ffffff',
          borderRadius: '1px',
          position: 'absolute',
          bottom: 0,
        }}
        animate={{
          y: isOpen ? -yOffset : 0,
          rotate: isOpen ? -45 : 0,
        }}
        transition={springTransition}
      />
    </div>
  );
};

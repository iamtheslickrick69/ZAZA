'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Add spring physics for smooth animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX,
        backgroundImage: 'linear-gradient(90deg, #6b7280 0%, #6b7280 50%, #6b7280 100%)',
        backgroundSize: '200% 100%',
      }}
    >
      {/* Animated gradient scan */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%'],
        }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
      {/* Subtle glow */}
      <motion.div
        className="absolute inset-0 blur-sm"
        style={{
          backgroundImage: 'linear-gradient(90deg, #6b7280 0%, #6b7280 50%, #6b7280 100%)',
          opacity: 0.6,
        }}
      />
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface HexagonProps {
  delay: number;
  index: number;
}

const Hexagon = ({ delay, index }: HexagonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 1.2,
        delay,
        type: "spring",
        stiffness: 80,
        damping: 12
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
      style={{
        width: '120px',
        height: '138px',
      }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.12 : 1,
          rotate: isHovered ? 3 : 0,
          y: isHovered ? -8 : 0,
        }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 120,
          damping: 15
        }}
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      >
        {/* Background layer with enhanced gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isHovered
              ? 'radial-gradient(ellipse at 35% 35%, #ff5555 0%, #ee3333 30%, #cc0000 60%, #880000 100%)'
              : 'radial-gradient(ellipse at 40% 40%, #ff4444 0%, #dd2222 30%, #bb0000 60%, #770000 100%)',
          }}
          transition={{ duration: 0.7 }}
          style={{
            boxShadow: isHovered
              ? '0 0 60px rgba(255, 68, 68, 0.7), 0 0 100px rgba(255, 68, 68, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.25)'
              : '0 0 35px rgba(238, 51, 51, 0.5), 0 0 60px rgba(238, 51, 51, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.12)',
            transition: 'box-shadow 0.7s ease',
          }}
        />

        {/* Enhanced inner glow layer */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.9 : 0.5,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        />

        {/* Subtle border effect */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, transparent 50%, rgba(0, 0, 0, 0.4) 100%)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            mixBlendMode: 'overlay',
          }}
        />

        {/* Ambient glow reflection */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.3) 0%, transparent 40%)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        />
      </motion.div>

      {/* Hover pulse effect - slower and more graceful */}
      {isHovered && (
        <motion.div
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{
            duration: 1.4,
            ease: "easeOut"
          }}
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'radial-gradient(circle at center, #ff4444 0%, #ff4444 30%, transparent 80%)',
          }}
        />
      )}

      {/* Subtle breathing animation */}
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: 'radial-gradient(circle at center, rgba(255, 100, 100, 0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
};

export function HoneycombLogo() {
  // Hexagon positions to create the cluster pattern (scaled up 1.5x)
  const hexPositions = [
    { x: 90, y: 0, delay: 0.2 },      // Top
    { x: 0, y: 69, delay: 0.4 },      // Middle Left
    { x: 90, y: 69, delay: 0.6 },     // Middle Center
    { x: 180, y: 69, delay: 0.4 },    // Middle Right
    { x: 45, y: 138, delay: 0.8 },    // Bottom Left
    { x: 135, y: 138, delay: 0.8 },   // Bottom Right
    { x: 90, y: 207, delay: 1.0 },    // Bottom
  ];

  return (
    <div className="relative flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeOut"
        }}
        className="relative"
        style={{
          width: '300px',
          height: '345px',
          filter: 'drop-shadow(0 0 80px rgba(238, 51, 51, 0.5)) drop-shadow(0 0 120px rgba(238, 51, 51, 0.3))',
        }}
      >
        {hexPositions.map((pos, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
            }}
          >
            <Hexagon delay={pos.delay} index={index} />
          </div>
        ))}

        {/* Ambient background glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(circle at center, rgba(238, 51, 51, 0.4) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>
    </div>
  );
}

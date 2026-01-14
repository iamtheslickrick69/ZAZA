"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { PixelCanvas } from '@/components/ui/pixel-canvas';

interface Card {
  id: number;
  title: string;
  description: string;
  dotColor: string;
  pixelColorsLight: string[];
  pixelColorsDark: string[];
  angle: number; // Position in orbital circle (degrees)
}

const cards: Card[] = [
  {
    id: 1,
    title: '10x Output',
    description: 'AI that multiplies your team\'s productivity without adding headcount',
    dotColor: '#6b7280',
    pixelColorsLight: ['#93c5fd', '#3b82f6', '#6b7280'],
    pixelColorsDark: ['#1a3a4a', '#6b7280', '#004466'],
    angle: 0, // Top
  },
  {
    id: 2,
    title: 'Zero Latency',
    description: 'Real-time AI responses that feel instant and scale infinitely',
    dotColor: '#6b7280',
    pixelColorsLight: ['#fca5a5', '#ef4444', '#6b7280'],
    pixelColorsDark: ['#4a1a1a', '#6b7280', '#660004'],
    angle: 120, // Bottom right
  },
  {
    id: 3,
    title: 'Infinite Scale',
    description: 'Systems that grow with your business automatically and effortlessly',
    dotColor: '#6b7280',
    pixelColorsLight: ['#93c5fd', '#6b7280', '#6b7280', '#fca5a5'],
    pixelColorsDark: ['#1a3a4a', '#6b7280', '#6b7280', '#4a1a1a'],
    angle: 240, // Bottom left
  },
];

interface OrbitalCardsProps {
  isDark?: boolean;
}

export function OrbitalCards({ isDark = false }: OrbitalCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [containerCenter, setContainerCenter] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  // Smooth mouse tracking with springs
  const mouseX = useSpring(0, { stiffness: 150, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 30 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateContainerCenter = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updateContainerCenter();
    window.addEventListener('resize', updateContainerCenter);
    window.addEventListener('scroll', updateContainerCenter);

    return () => {
      window.removeEventListener('resize', updateContainerCenter);
      window.removeEventListener('scroll', updateContainerCenter);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize mouse position relative to container center
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);

        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const getPixelColors = (card: Card) => {
    return isDark ? card.pixelColorsDark : card.pixelColorsLight;
  };

  // Calculate orbital positions
  const orbitalRadius = 140;
  const centerX = 0;
  const centerY = 0;

  // Generate floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 12,
    radius: orbitalRadius + 80,
    delay: i * 0.2,
  }));

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center opacity-0">
          {/* Placeholder for SSR */}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: '1200px' }}
      suppressHydrationWarning
    >
      {/* Orbital Container */}
      <div className="relative w-full h-full flex items-center justify-center">

        {/* Connecting Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.3 }}
        >
          {cards.map((card, idx) => {
            const nextCard = cards[(idx + 1) % cards.length];

            const x1 = centerX + orbitalRadius * Math.cos((card.angle * Math.PI) / 180);
            const y1 = centerY + orbitalRadius * Math.sin((card.angle * Math.PI) / 180);
            const x2 = centerX + orbitalRadius * Math.cos((nextCard.angle * Math.PI) / 180);
            const y2 = centerY + orbitalRadius * Math.sin((nextCard.angle * Math.PI) / 180);

            return (
              <motion.line
                key={`line-${card.id}`}
                x1="50%"
                y1="50%"
                x2="50%"
                y2="50%"
                className={isDark ? 'stroke-white/20' : 'stroke-zinc-400/30'}
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: 1,
                  x1: x1,
                  y1: y1,
                  x2: x2,
                  y2: y2,
                }}
                transition={{
                  pathLength: { duration: 1.5, delay: idx * 0.2 },
                  default: { duration: 0.5 },
                }}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="8"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </motion.line>
            );
          })}
        </svg>

        {/* Floating Particles */}
        {particles.map((particle) => {
          const x = particle.radius * Math.cos((particle.angle * Math.PI) / 180);
          const y = particle.radius * Math.sin((particle.angle * Math.PI) / 180);

          return (
            <motion.div
              key={particle.id}
              className={`absolute w-1.5 h-1.5 rounded-full ${
                isDark ? 'bg-white/20' : 'bg-zinc-400/30'
              }`}
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ x, y, opacity: 0, scale: 0 }}
              animate={{
                x: [x, x * 1.1, x],
                y: [y, y * 1.1, y],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Orbital Cards */}
        {cards.map((card, index) => {
          const isHovered = hoveredCard === card.id;

          // Base orbital position
          const baseX = orbitalRadius * Math.cos((card.angle * Math.PI) / 180);
          const baseY = orbitalRadius * Math.sin((card.angle * Math.PI) / 180);

          // Magnetic attraction to mouse (stronger when closer)
          const magneticStrength = 30;
          const attractX = mousePosition.x * magneticStrength;
          const attractY = mousePosition.y * magneticStrength;

          // Calculate distance from mouse to card for hover detection
          const cardAngle = Math.atan2(baseY, baseX);
          const mouseAngle = Math.atan2(mousePosition.y, mousePosition.x);
          const angleDiff = Math.abs(cardAngle - mouseAngle);
          const isNearMouse = angleDiff < 0.5 || angleDiff > Math.PI * 2 - 0.5;

          // Z-depth based on angle (cards at top are closer)
          const depthZ = 50 * Math.cos((card.angle * Math.PI) / 180);

          return (
            <motion.div
              key={card.id}
              className="absolute cursor-pointer"
              style={{
                left: '50%',
                top: '50%',
                transformStyle: 'preserve-3d',
              }}
              initial={{
                x: baseX,
                y: baseY,
                z: depthZ,
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                x: baseX + (isHovered ? attractX * 0.3 : attractX * 0.1),
                y: baseY + (isHovered ? attractY * 0.3 : attractY * 0.1),
                z: isHovered ? depthZ + 100 : depthZ,
                opacity: 1,
                scale: isHovered ? 1.1 : isNearMouse ? 1.05 : 1,
                rotateY: mousePosition.x * (isHovered ? 15 : 5),
                rotateX: -mousePosition.y * (isHovered ? 10 : 3),
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: index * 0.15,
              }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.div
                className={`relative w-64 p-6 rounded-2xl border overflow-hidden backdrop-blur-xl ${
                  isDark
                    ? 'bg-zinc-900/80 border-white/20'
                    : 'bg-white/80 border-zinc-300/50'
                }`}
                style={{
                  boxShadow: isHovered
                    ? isDark
                      ? '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      : '0 30px 80px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                    : isDark
                    ? '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                    : '0 20px 50px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Edge Highlight */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%, rgba(255, 255, 255, 0.3) 100%)',
                  }}
                />

                {/* PixelCanvas Background */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
                  style={{ opacity: isDark ? 0.4 : 0.3 }}
                >
                  <PixelCanvas
                    gap={10}
                    speed={35}
                    colors={getPixelColors(card)}
                    variant="icon"
                    noFocus
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Animated Dot */}
                  <div className='mb-4 flex items-center justify-center'>
                    <motion.div
                      className='relative'
                      animate={{
                        scale: isHovered ? [1, 1.4, 1] : [1, 1.15, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div
                        className='absolute inset-0 rounded-full blur-lg'
                        style={{
                          background: card.dotColor,
                          opacity: isHovered ? 0.8 : 0.5,
                        }}
                      />
                      <div
                        className='relative w-3 h-3 rounded-full'
                        style={{ background: card.dotColor }}
                      />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-base font-bold mb-2 text-center ${
                    isDark ? 'text-white' : 'text-zinc-900'
                  }`}>
                    {card.title}
                  </h3>

                  {/* Description */}
                  <motion.p
                    className={`text-xs leading-relaxed text-center ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                    animate={{
                      opacity: isHovered ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {card.description}
                  </motion.p>

                  {/* Learn More - appears on hover */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="mt-4 text-center"
                    >
                      <span className={`text-xs font-semibold inline-flex items-center gap-1 ${
                        isDark ? 'text-white/90' : 'text-zinc-900'
                      }`}>
                        Explore →
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Glow effect on hover */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: isDark
                        ? 'radial-gradient(circle at center, rgba(107, 114, 128, 0.2), transparent 70%)'
                        : 'radial-gradient(circle at center, rgba(107, 114, 128, 0.15), transparent 70%)',
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Center Glow */}
        <motion.div
          className="absolute"
          style={{
            width: '200px',
            height: '200px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: isDark
              ? 'radial-gradient(circle, rgba(107, 114, 128, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(107, 114, 128, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}

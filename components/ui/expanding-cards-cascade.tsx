"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PixelCanvas } from '@/components/ui/pixel-canvas';

interface Card {
  id: number;
  title: string;
  description: string;
  dotColor: string;
  pixelColorsLight: string[];
  pixelColorsDark: string[];
}

const cards: Card[] = [
  {
    id: 1,
    title: 'Smart Sites / AGI',
    description: 'Websites powered by artificial general intelligence that learn and adapt',
    dotColor: '#6b7280',
    pixelColorsLight: ['#93c5fd', '#3b82f6', '#6b7280'],
    pixelColorsDark: ['#1a3a4a', '#6b7280', '#004466'],
  },
  {
    id: 2,
    title: 'AI Implementation',
    description: 'Custom AI solutions that automate workflows and multiply output',
    dotColor: '#6b7280',
    pixelColorsLight: ['#fca5a5', '#ef4444', '#6b7280'],
    pixelColorsDark: ['#4a1a1a', '#6b7280', '#660004'],
  },
  {
    id: 3,
    title: 'Apps That Think',
    description: 'AI-native iOS & Android apps that learn user behavior and get smarter over time',
    dotColor: '#6b7280',
    pixelColorsLight: ['#93c5fd', '#6b7280', '#6b7280', '#fca5a5'],
    pixelColorsDark: ['#1a3a4a', '#6b7280', '#6b7280', '#4a1a1a'],
  },
  {
    id: 4,
    title: 'AI Orchestration',
    description: 'End-to-end AI workflow automation that connects all systems and multiplies team efficiency',
    dotColor: '#6b7280',
    pixelColorsLight: ['#a78bfa', '#8b5cf6', '#6b7280'],
    pixelColorsDark: ['#2d1a4a', '#6b7280', '#440066'],
  },
];

interface ExpandingCardsCascadeProps {
  isDark?: boolean;
}

export function ExpandingCardsCascade({ isDark = false }: ExpandingCardsCascadeProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const getPixelColors = (card: Card) => {
    return isDark ? card.pixelColorsDark : card.pixelColorsLight;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
      <div className="relative w-full max-w-md h-[600px]">
        {cards.map((card, index) => {
          const isHovered = hoveredCard === card.id;
          const isOtherHovered = hoveredCard !== null && hoveredCard !== card.id;

          // Calculate base position for cascade
          const baseY = index * 120;
          const baseX = index * 20;
          const baseZ = -index * 40;

          return (
            <motion.div
              key={card.id}
              className="absolute top-0 left-0 w-full cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
              }}
              initial={{
                y: baseY,
                x: baseX,
                rotateX: 2,
                rotateY: -2,
              }}
              animate={{
                y: isHovered ? baseY - 10 : isOtherHovered ? baseY + 10 : baseY,
                x: isHovered ? baseX + 10 : baseX,
                z: isHovered ? 50 : isOtherHovered ? baseZ - 20 : baseZ,
                scale: isHovered ? 1.05 : isOtherHovered ? 0.95 : 1,
                rotateX: isHovered ? 0 : 2,
                rotateY: isHovered ? 0 : -2,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.div
                className={`relative p-6 rounded-2xl border overflow-hidden ${
                  isDark
                    ? 'bg-zinc-900/90 border-white/10'
                    : 'bg-white/90 border-zinc-200'
                }`}
                animate={{
                  boxShadow: isHovered
                    ? isDark
                      ? '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                      : '0 20px 60px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                    : isDark
                    ? '0 10px 30px rgba(0, 0, 0, 0.5)'
                    : '0 10px 30px rgba(0, 0, 0, 0.1)',
                  opacity: isOtherHovered ? 0.6 : 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                {/* PixelCanvas Background */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ opacity: isDark ? 0.6 : 0.4 }}
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
                        scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div
                        className='absolute inset-0 rounded-full blur-md opacity-50'
                        style={{ background: card.dotColor }}
                      />
                      <div
                        className='relative w-3 h-3 rounded-full'
                        style={{ background: card.dotColor }}
                      />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-bold mb-2 text-center ${
                    isDark ? 'text-white' : 'text-zinc-900'
                  }`}>
                    {card.title}
                  </h3>

                  {/* Description */}
                  <AnimatePresence>
                    <motion.p
                      className={`text-sm leading-relaxed text-center ${
                        isDark ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                      initial={{ opacity: 0.7, height: 'auto' }}
                      animate={{
                        opacity: isHovered ? 1 : 0.7,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.description}
                    </motion.p>
                  </AnimatePresence>

                  {/* Learn More Link - appears on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="mt-4 text-center"
                      >
                        <span className={`text-xs font-medium inline-flex items-center gap-1 ${
                          isDark ? 'text-white/70 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                        } transition-colors`}>
                          Learn More →
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

interface ImageComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView: 'before' | 'after';
}

const SITES = {
  before: {
    id: 'before',
    label: '2025>',
    title: 'Static Sites',
    image: '/before.png',
    url: 'https://www.beehiverentalandsales.com/',
  },
  after: {
    id: 'after',
    label: 'AGI Sites',
    title: 'Intelligent Web',
    image: '/after.png',
    url: 'https://beehive-2026.vercel.app/',
  },
};

// Brand colors
const BRAND_RED = '#C00008';
const BRAND_BLUE = '#006AAA';

export function ImageComparisonModal({ isOpen, onClose, initialView }: ImageComparisonModalProps) {
  const [currentView, setCurrentView] = useState<'before' | 'after'>(initialView);
  const [hasShownTeaser, setHasShownTeaser] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position for glass reflection
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for reflection
  const springConfig = { damping: 25, stiffness: 150 };
  const reflectX = useSpring(mouseX, springConfig);
  const reflectY = useSpring(mouseY, springConfig);

  // Transform mouse position to reflection gradient
  const reflectionGradient = useTransform(
    [reflectX, reflectY],
    ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 40%)`
  );

  // Reset to initial view when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentView(initialView);
      setHasShownTeaser(false);
    }
  }, [isOpen, initialView]);

  // Auto-flip teaser animation
  useEffect(() => {
    if (isOpen && !hasShownTeaser) {
      const timer = setTimeout(() => {
        setCurrentView(prev => prev === 'before' ? 'after' : 'before');
        setTimeout(() => {
          setCurrentView(initialView);
          setHasShownTeaser(true);
        }, 400);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasShownTeaser, initialView]);

  // Handle ESC key and arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrentView('before');
      if (e.key === "ArrowRight") setCurrentView('after');
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Handle mouse move for reflection
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  // Swipe gesture handling
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      setCurrentView('before');
    } else if (info.offset.x < -threshold) {
      setCurrentView('after');
    }
  };

  const current = SITES[currentView];
  const isBefore = currentView === 'before';
  const accentColor = isBefore ? BRAND_RED : BRAND_BLUE;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Liquid Glass Backdrop with Grain */}
          <motion.div
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          >
            {/* Base gradient */}
            <div
              className="absolute inset-0 backdrop-blur-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(250,250,250,0.97) 0%, rgba(240,242,245,0.98) 50%, rgba(250,250,250,0.97) 100%)',
              }}
            />
            {/* Film grain texture */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
            {/* Floating gradient orbs */}
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${accentColor}40, transparent 70%)`,
                top: '10%',
                left: '5%',
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${isBefore ? BRAND_BLUE : BRAND_RED}40, transparent 70%)`,
                bottom: '10%',
                right: '10%',
              }}
              animate={{
                x: [0, -25, 0],
                y: [0, 25, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-6 md:p-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-5xl pointer-events-auto flex flex-col"
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                {/* Label/Title */}
                <motion.div
                  key={current.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <motion.span
                    className="text-sm font-nav tracking-widest font-bold"
                    style={{ color: accentColor }}
                    animate={{ color: accentColor }}
                    transition={{ duration: 0.3 }}
                  >
                    {current.label}
                  </motion.span>
                  <span className="text-neutral-300">—</span>
                  <span className="text-neutral-800 font-display text-lg">
                    {current.title}
                  </span>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  className="p-2.5 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-neutral-500 hover:text-neutral-700 transition-colors" />
                </motion.button>
              </div>

              {/* Image Container - Premium Glass Card */}
              <motion.div
                ref={containerRef}
                className="relative rounded-[28px] overflow-hidden cursor-grab active:cursor-grabbing"
                style={{
                  background: 'linear-gradient(165deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.8),
                    0 2px 4px rgba(0,0,0,0.02),
                    0 8px 16px rgba(0,0,0,0.04),
                    0 24px 48px rgba(0,0,0,0.08),
                    0 48px 96px rgba(0,0,0,0.06)
                  `,
                }}
                onMouseMove={handleMouseMove}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
              >
                {/* Glass reflection overlay */}
                <motion.div
                  className="absolute inset-0 z-20 pointer-events-none rounded-[28px]"
                  style={{ background: reflectionGradient }}
                />

                {/* Inner border glow */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none rounded-[28px]"
                  style={{
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -1px 1px rgba(0,0,0,0.02)',
                  }}
                />

                {/* Left Arrow */}
                <motion.button
                  onClick={() => setCurrentView('before')}
                  className={`absolute left-5 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full transition-all ${
                    isBefore
                      ? 'bg-neutral-100 text-neutral-300 cursor-default'
                      : 'bg-white text-neutral-600 cursor-pointer shadow-xl hover:shadow-2xl'
                  }`}
                  disabled={isBefore}
                  whileHover={!isBefore ? { scale: 1.08, x: -2 } : {}}
                  whileTap={!isBefore ? { scale: 0.95 } : {}}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                {/* Right Arrow */}
                <motion.button
                  onClick={() => setCurrentView('after')}
                  className={`absolute right-5 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full transition-all ${
                    !isBefore
                      ? 'bg-neutral-100 text-neutral-300 cursor-default'
                      : 'bg-white text-neutral-600 cursor-pointer shadow-xl hover:shadow-2xl'
                  }`}
                  disabled={!isBefore}
                  whileHover={isBefore ? { scale: 1.08, x: 2 } : {}}
                  whileTap={isBefore ? { scale: 0.95 } : {}}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>

                {/* Image with smooth crossfade - Fixed aspect ratio */}
                <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={current.id}
                      src={current.image}
                      alt={current.title}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      draggable={false}
                    />
                  </AnimatePresence>
                </div>

                {/* View Live Button - Premium Style */}
                <motion.a
                  key={`link-${current.id}`}
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-5 right-5 z-30 flex items-center gap-2.5 px-6 py-3 rounded-full text-white text-sm font-medium"
                  style={{
                    background: accentColor,
                    boxShadow: `0 4px 20px ${accentColor}50, 0 8px 40px ${accentColor}30`,
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.05, boxShadow: `0 6px 30px ${accentColor}60, 0 12px 50px ${accentColor}40` }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>View Live</span>
                  <ExternalLink size={16} />
                </motion.a>

                {/* Swipe Hint - Shows briefly */}
                <motion.div
                  className="absolute bottom-5 left-5 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white/80 text-xs"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: [0, 1, 1, 0], x: [0, 0, 0, 0] }}
                  transition={{ duration: 3, times: [0, 0.1, 0.8, 1], delay: 1 }}
                >
                  <ChevronLeft size={14} />
                  <span>Swipe to compare</span>
                  <ChevronRight size={14} />
                </motion.div>

                {/* Dots Indicator - Premium */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 rounded-full bg-black/20 backdrop-blur-sm">
                  <motion.button
                    onClick={() => setCurrentView('before')}
                    className="relative w-2.5 h-2.5 rounded-full transition-all"
                    animate={{
                      width: isBefore ? 24 : 10,
                      backgroundColor: isBefore ? BRAND_RED : 'rgba(255,255,255,0.4)',
                    }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <motion.button
                    onClick={() => setCurrentView('after')}
                    className="relative w-2.5 h-2.5 rounded-full transition-all"
                    animate={{
                      width: !isBefore ? 24 : 10,
                      backgroundColor: !isBefore ? BRAND_BLUE : 'rgba(255,255,255,0.4)',
                    }}
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
              </motion.div>

              {/* Keyboard Hint */}
              <motion.div
                className="mt-4 text-center text-neutral-400 text-xs font-nav tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ← → arrow keys to flip • ESC to close • drag to swipe
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

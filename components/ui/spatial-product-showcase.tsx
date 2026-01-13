'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  Clock,
  XCircle,
  AlertTriangle,
  UserX,
  Rocket,
  Sparkles,
  Zap,
  LucideIcon,
  DollarSign,
  Ghost,
  Bot,
  Wrench,
  TrendingUp,
  Brain,
} from 'lucide-react';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type ProductId = 'before' | 'after';

export interface FeatureMetric {
  label: string;
  icon: LucideIcon;
  isNegative?: boolean;
}

export interface ProductData {
  id: ProductId;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  features: FeatureMetric[];
}

// Brand colors
const BRAND_RED = '#C00008';
const BRAND_BLUE = '#006AAA';

// Smart Sites Data
const PRODUCT_DATA: Record<ProductId, ProductData> = {
  before: {
    id: 'before',
    label: '2025>',
    title: 'Static Sites',
    subtitle: 'Is your website more like a PDF?',
    description: 'The old way of building websites. Slow timelines, endless revisions, paying for every tiny change, and a site that just sits there doing nothing while your competitors pull ahead.',
    features: [
      { label: 'Months before launch', icon: Clock, isNegative: true },
      { label: 'Hostage to developers', icon: UserX, isNegative: true },
      { label: 'Every edit needs a ticket', icon: AlertTriangle, isNegative: true },
      { label: 'Paying for every tiny change', icon: DollarSign, isNegative: true },
      { label: 'No SEO, no traffic, no leads', icon: Ghost, isNegative: true },
      { label: 'Site just sits there doing nothing', icon: XCircle, isNegative: true },
    ],
  },
  after: {
    id: 'after',
    label: 'AGI Sites',
    title: 'Your 24/7 Digital Employee',
    subtitle: 'Not just a website. An AI-powered team member.',
    description: 'AGI means Artificial General Intelligence—an AI trained specifically on YOUR business. It watches, learns, and works around the clock. We handle all updates, build custom AI features, and your site gets smarter every single day.',
    features: [
      { label: 'AI trained on YOUR business', icon: Brain },
      { label: 'We handle all updates', icon: Wrench },
      { label: 'Custom AI features built for you', icon: Bot },
      { label: 'AI-powered SEO & blogs', icon: TrendingUp },
      { label: 'Live in days, not months', icon: Rocket },
      { label: 'Gets smarter over time', icon: Zap },
    ],
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10 },
  },
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const SectionHeader = ({ isBefore }: { isBefore: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center mb-4"
  >
    <h2
      className="text-4xl md:text-5xl lg:text-6xl font-display mb-2 transition-colors duration-500"
      style={{ color: isBefore ? BRAND_RED : BRAND_BLUE }}
    >
      SMART SITES
    </h2>
    <p className="text-lg md:text-xl font-display-light transition-colors duration-500"
      style={{ color: isBefore ? 'rgba(192, 0, 8, 0.7)' : 'rgba(0, 106, 170, 0.7)' }}
    >
      Finally, websites that think.
    </p>
  </motion.div>
);

// Magnetic Button Component
const MagneticButton = ({
  children,
  className,
  onClick,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.2;
    const distY = (e.clientY - centerY) * 0.2;
    x.set(distX);
    y.set(distY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, ...style }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const Switcher = ({
  activeId,
  onToggle
}: {
  activeId: ProductId;
  onToggle: (id: ProductId) => void
}) => {
  const options = Object.values(PRODUCT_DATA).map(p => ({ id: p.id, label: p.label }));
  const isBefore = activeId === 'before';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex justify-center mb-6"
    >
      <div
        className="relative flex items-center gap-1 p-1.5 rounded-full border shadow-xl overflow-hidden transition-all duration-500"
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderColor: isBefore ? 'rgba(192, 0, 8, 0.3)' : 'rgba(0, 106, 170, 0.3)',
          boxShadow: isBefore
            ? '0 10px 40px rgba(192, 0, 8, 0.15), 0 0 0 1px rgba(192, 0, 8, 0.1)'
            : '0 10px 40px rgba(0, 106, 170, 0.15), 0 0 0 1px rgba(0, 106, 170, 0.1)',
        }}
      >
        {/* Animated glow behind switcher */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isBefore
              ? `radial-gradient(circle at 25% 50%, ${BRAND_RED}20, transparent 60%)`
              : `radial-gradient(circle at 75% 50%, ${BRAND_BLUE}20, transparent 60%)`,
          }}
          transition={{ duration: 0.5 }}
        />

        {options.map((opt) => {
          const isActive = activeId === opt.id;
          const isOptBefore = opt.id === 'before';

          return (
            <MagneticButton
              key={opt.id}
              onClick={() => onToggle(opt.id)}
              className="relative px-8 py-3 rounded-full flex items-center justify-center text-sm font-medium focus:outline-none"
            >
              {isActive && (
                <motion.div
                  layoutId="switcher-bg"
                  style={{
                    background: isOptBefore
                      ? `linear-gradient(135deg, ${BRAND_RED}25, ${BRAND_RED}10)`
                      : `linear-gradient(135deg, ${BRAND_BLUE}25, ${BRAND_BLUE}10)`
                  }}
                  className="absolute inset-0 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {/* Active glow ring */}
              {isActive && (
                <motion.div
                  layoutId="switcher-glow"
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: isOptBefore
                      ? `0 0 25px ${BRAND_RED}40, inset 0 0 15px ${BRAND_RED}15`
                      : `0 0 25px ${BRAND_BLUE}40, inset 0 0 15px ${BRAND_BLUE}15`,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-300 font-nav text-sm tracking-wider ${!isActive ? 'text-neutral-400 hover:text-neutral-600' : ''}`}
                style={{ color: isActive ? (isOptBefore ? BRAND_RED : BRAND_BLUE) : undefined }}
              >
                {opt.label}
              </span>
            </MagneticButton>
          );
        })}
      </div>
    </motion.div>
  );
};

const ProductDetails = ({ data, isBefore }: { data: ProductData; isBefore: boolean }) => {
  const accentColor = isBefore ? BRAND_RED : BRAND_BLUE;

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-left"
    >
      {/* Title Section */}
      <motion.div variants={ANIMATIONS.item} className="mb-4">
        <span
          className="text-xs font-bold uppercase tracking-[0.3em] mb-1 block"
          style={{ color: accentColor }}
        >
          {data.label}
        </span>
        <h3 className="text-2xl md:text-3xl font-display mb-1"
          style={{ color: isBefore ? 'rgba(100, 0, 5, 1)' : 'rgba(0, 60, 100, 1)' }}
        >
          {data.title}
        </h3>
        <p className="text-base md:text-lg font-display-light"
          style={{ color: isBefore ? 'rgba(150, 0, 5, 0.7)' : 'rgba(0, 80, 120, 0.7)' }}
        >
          {data.subtitle}
        </p>
      </motion.div>

      {/* Description */}
      <motion.p variants={ANIMATIONS.item} className="text-sm md:text-base leading-relaxed font-body mb-4"
        style={{ color: isBefore ? 'rgba(100, 0, 5, 0.8)' : 'rgba(0, 60, 100, 0.8)' }}
      >
        {data.description}
      </motion.p>

      {/* Features Grid - 2x3 for 6 features */}
      <motion.div variants={ANIMATIONS.item} className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {data.features.map((feature, idx) => (
          <motion.div
            key={feature.label}
            variants={ANIMATIONS.item}
            className="group relative p-3 rounded-xl flex items-center gap-3 backdrop-blur-sm overflow-hidden transition-all duration-300"
            style={{
              background: isBefore
                ? 'linear-gradient(135deg, rgba(192, 0, 8, 0.12) 0%, rgba(192, 0, 8, 0.06) 100%)'
                : 'linear-gradient(135deg, rgba(0, 106, 170, 0.12) 0%, rgba(0, 106, 170, 0.06) 100%)',
              border: `1.5px solid ${isBefore ? 'rgba(192, 0, 8, 0.25)' : 'rgba(0, 106, 170, 0.25)'}`,
              boxShadow: `0 4px 20px ${isBefore ? 'rgba(192, 0, 8, 0.12)' : 'rgba(0, 106, 170, 0.12)'}`,
            }}
            whileHover={{
              y: -3,
              background: isBefore
                ? 'linear-gradient(135deg, rgba(192, 0, 8, 0.2) 0%, rgba(192, 0, 8, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(0, 106, 170, 0.2) 0%, rgba(0, 106, 170, 0.1) 100%)',
              boxShadow: isBefore
                ? `0 12px 30px rgba(192, 0, 8, 0.25), 0 0 0 1px rgba(192, 0, 8, 0.4)`
                : `0 12px 30px rgba(0, 106, 170, 0.25), 0 0 0 1px rgba(0, 106, 170, 0.4)`,
            }}
          >
            <feature.icon
              size={18}
              style={{ color: accentColor, flexShrink: 0 }}
              className="relative z-10"
            />
            <p className="text-xs md:text-sm font-body-medium text-left relative z-10"
              style={{ color: isBefore ? 'rgba(120, 0, 5, 0.9)' : 'rgba(0, 70, 115, 0.9)' }}
            >
              {feature.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button - Different for each tab */}
      <motion.div variants={ANIMATIONS.item} className="mt-6">
        <MagneticButton
          className="group relative inline-flex items-center gap-2 px-8 py-4 text-white text-base font-semibold rounded-full overflow-hidden"
          style={{
            background: isBefore
              ? `linear-gradient(135deg, ${BRAND_RED}, #8B0006)`
              : `linear-gradient(135deg, ${BRAND_BLUE}, #004d7a)`,
            boxShadow: isBefore
              ? '0 10px 40px rgba(192, 0, 8, 0.4)'
              : '0 10px 40px rgba(0, 106, 170, 0.4)',
          }}
          onClick={() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {/* Button shine effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transform: 'skewX(-20deg)',
            }}
          />
          {isBefore ? (
            <>
              <Rocket size={20} className="relative z-10" />
              <span className="relative z-10">Escape the Old Way</span>
            </>
          ) : (
            <>
              <Bot size={20} className="relative z-10" />
              <span className="relative z-10">Meet Your AI Team</span>
            </>
          )}
        </MagneticButton>
      </motion.div>
    </motion.div>
  );
};

// =========================================
// 4. MAIN COMPONENT
// =========================================

export default function SmartSitesShowcase() {
  const [activeSide, setActiveSide] = useState<ProductId>('before');

  const currentData = PRODUCT_DATA[activeSide];
  const isBefore = activeSide === 'before';

  return (
    <div className="relative w-full overflow-hidden py-8 md:py-10 lg:py-12">
      {/* Base colored background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isBefore
            ? 'linear-gradient(180deg, rgba(192, 0, 8, 0.08) 0%, rgba(255, 245, 245, 1) 100%)'
            : 'linear-gradient(180deg, rgba(0, 106, 170, 0.08) 0%, rgba(245, 250, 255, 1) 100%)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Animated Background Gradient - BOLD */}
      <motion.div
        className="absolute inset-0 transition-all duration-700"
        animate={{
          background: isBefore
            ? 'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(192, 0, 8, 0.35) 0%, transparent 60%)'
            : 'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0, 106, 170, 0.35) 0%, transparent 60%)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Secondary gradient for depth - BOLD */}
      <motion.div
        className="absolute inset-0 transition-all duration-700"
        animate={{
          background: isBefore
            ? 'radial-gradient(ellipse 100% 60% at 80% 90%, rgba(192, 0, 8, 0.25) 0%, transparent 50%)'
            : 'radial-gradient(ellipse 100% 60% at 80% 90%, rgba(0, 106, 170, 0.25) 0%, transparent 50%)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Third gradient - opposite corner */}
      <motion.div
        className="absolute inset-0 transition-all duration-700"
        animate={{
          background: isBefore
            ? 'radial-gradient(ellipse 80% 50% at 10% 70%, rgba(192, 0, 8, 0.18) 0%, transparent 50%)'
            : 'radial-gradient(ellipse 80% 50% at 10% 70%, rgba(0, 106, 170, 0.18) 0%, transparent 50%)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Film Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Large Floating Gradient Orb - Top Left - BOLD */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          top: '-10%',
          left: '-5%',
          filter: 'blur(60px)',
        }}
        animate={{
          background: isBefore
            ? `radial-gradient(circle, ${BRAND_RED}65 0%, ${BRAND_RED}30 40%, transparent 70%)`
            : `radial-gradient(circle, ${BRAND_BLUE}65 0%, ${BRAND_BLUE}30 40%, transparent 70%)`,
          x: [0, 40, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          background: { duration: 0.5 },
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 14, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Medium Floating Orb - Bottom Right - BOLD */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '450px',
          height: '450px',
          bottom: '0%',
          right: '-5%',
          filter: 'blur(50px)',
        }}
        animate={{
          background: isBefore
            ? `radial-gradient(circle, ${BRAND_RED}55 0%, ${BRAND_RED}25 40%, transparent 70%)`
            : `radial-gradient(circle, ${BRAND_BLUE}55 0%, ${BRAND_BLUE}25 40%, transparent 70%)`,
          x: [0, -35, 0],
          y: [0, -25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          background: { duration: 0.5 },
          x: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 11, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 13, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Accent Orb - Center Right - BOLD */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '350px',
          height: '350px',
          top: '30%',
          right: '10%',
          filter: 'blur(45px)',
        }}
        animate={{
          background: isBefore
            ? `radial-gradient(circle, ${BRAND_RED}45 0%, transparent 60%)`
            : `radial-gradient(circle, ${BRAND_BLUE}45 0%, transparent 60%)`,
          x: [0, 25, 0],
          y: [0, -30, 0],
        }}
        transition={{
          background: { duration: 0.5 },
          x: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 11, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Accent Orb - Bottom Left - BOLD */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '300px',
          height: '300px',
          bottom: '15%',
          left: '5%',
          filter: 'blur(40px)',
        }}
        animate={{
          background: isBefore
            ? `radial-gradient(circle, ${BRAND_RED}40 0%, transparent 60%)`
            : `radial-gradient(circle, ${BRAND_BLUE}40 0%, transparent 60%)`,
          x: [0, -20, 0],
          y: [0, 25, 0],
        }}
        transition={{
          background: { duration: 0.5 },
          x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Animated accent line - top - BOLD */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1.5"
        animate={{
          background: isBefore
            ? `linear-gradient(90deg, transparent 0%, ${BRAND_RED} 50%, transparent 100%)`
            : `linear-gradient(90deg, transparent 0%, ${BRAND_BLUE} 50%, transparent 100%)`,
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 w-full px-6 max-w-4xl mx-auto">
        {/* Centered Header + Tabs at TOP */}
        <SectionHeader isBefore={isBefore} />
        <Switcher activeId={activeSide} onToggle={setActiveSide} />

        {/* Centered Content */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            <ProductDetails key={`details-${activeSide}`} data={currentData} isBefore={isBefore} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

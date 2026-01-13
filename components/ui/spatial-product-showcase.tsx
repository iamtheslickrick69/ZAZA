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
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10 },
  },
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const SectionHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center mb-6"
  >
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-neutral-900 mb-3">
      SMART SITES
    </h2>
    <p className="text-lg md:text-xl text-neutral-500 font-display-light">
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex justify-center mb-10"
    >
      <div className="relative flex items-center gap-1 p-1.5 rounded-full bg-white border border-neutral-200 shadow-lg overflow-hidden">
        {/* Glow effect behind active tab */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: activeId === 'before'
              ? `radial-gradient(circle at 25% 50%, ${BRAND_RED}15, transparent 50%)`
              : `radial-gradient(circle at 75% 50%, ${BRAND_BLUE}15, transparent 50%)`,
          }}
          transition={{ duration: 0.4 }}
        />

        {options.map((opt) => {
          const isActive = activeId === opt.id;
          const isBefore = opt.id === 'before';

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
                    background: isBefore
                      ? 'linear-gradient(to bottom, rgba(192, 0, 8, 0.15), rgba(192, 0, 8, 0.05))'
                      : 'linear-gradient(to bottom, rgba(0, 106, 170, 0.15), rgba(0, 106, 170, 0.05))'
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
                    boxShadow: isBefore
                      ? `0 0 20px ${BRAND_RED}30, inset 0 0 10px ${BRAND_RED}10`
                      : `0 0 20px ${BRAND_BLUE}30, inset 0 0 10px ${BRAND_BLUE}10`,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-300 font-nav text-sm tracking-wider ${!isActive ? 'text-neutral-400 hover:text-neutral-600' : ''}`}
                style={{ color: isActive ? (isBefore ? BRAND_RED : BRAND_BLUE) : undefined }}
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
      <motion.div variants={ANIMATIONS.item} className="mb-6">
        <span
          className="text-xs font-bold uppercase tracking-[0.3em] mb-2 block"
          style={{ color: accentColor }}
        >
          {data.label}
        </span>
        <h3 className="text-2xl md:text-3xl font-display text-neutral-900 mb-2">
          {data.title}
        </h3>
        <p className="text-base md:text-lg font-display-light text-neutral-500">
          {data.subtitle}
        </p>
      </motion.div>

      {/* Description */}
      <motion.p variants={ANIMATIONS.item} className="text-neutral-600 text-sm md:text-base leading-relaxed font-body mb-6">
        {data.description}
      </motion.p>

      {/* Features Grid - 2x3 for 6 features */}
      <motion.div variants={ANIMATIONS.item} className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {data.features.map((feature, idx) => (
          <motion.div
            key={feature.label}
            variants={ANIMATIONS.item}
            className="p-3 md:p-4 rounded-xl flex items-center gap-3 bg-white border shadow-sm hover:shadow-md transition-shadow"
            style={{
              borderColor: isBefore ? 'rgba(192, 0, 8, 0.2)' : 'rgba(0, 106, 170, 0.2)',
            }}
            whileHover={{ y: -2 }}
          >
            <feature.icon
              size={20}
              style={{ color: accentColor, flexShrink: 0 }}
            />
            <p className="text-xs md:text-sm font-body-medium text-left text-neutral-700">
              {feature.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button - Different for each tab */}
      <motion.div variants={ANIMATIONS.item} className="mt-8">
        <MagneticButton
          className="inline-flex items-center gap-2 px-8 py-4 text-white text-base font-semibold rounded-full shadow-lg transition-shadow hover:shadow-xl"
          style={{
            background: isBefore ? BRAND_RED : BRAND_BLUE,
            boxShadow: isBefore ? '0 10px 40px rgba(192, 0, 8, 0.3)' : '0 10px 40px rgba(0, 106, 170, 0.3)',
          }}
          onClick={() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {isBefore ? (
            <>
              <Rocket size={20} />
              <span>Escape the Old Way</span>
            </>
          ) : (
            <>
              <Bot size={20} />
              <span>Meet Your AI Team</span>
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
    <div className="relative w-full overflow-hidden py-12 md:py-16 lg:py-20 min-h-[70vh] bg-[#FAFAFA]">
      {/* Film Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${isBefore ? BRAND_RED : BRAND_BLUE}50, transparent 70%)`,
          top: '-10%',
          left: '-10%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${isBefore ? BRAND_BLUE : BRAND_RED}40, transparent 70%)`,
          bottom: '-5%',
          right: '-5%',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${BRAND_BLUE}30, transparent 70%)`,
          top: '40%',
          right: '20%',
        }}
        animate={{
          x: [0, 20, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 w-full px-6 max-w-4xl mx-auto">
        {/* Centered Header + Tabs at TOP */}
        <SectionHeader />
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

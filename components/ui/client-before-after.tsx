'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Gauge,
  TrendingUp,
  Smartphone,
  Clock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

// =========================================
// TYPES & DATA
// =========================================

type ViewMode = 'before' | 'after';

interface Metric {
  label: string;
  beforeValue: string;
  afterValue: string;
  icon: React.ElementType;
}

const CLIENT_DATA = {
  name: 'Beehive Rental & Sales',
  industry: 'Equipment Rental',
  url: 'https://www.beehiverentalandsales.com',
  testimonial: '"Night and day difference. Our phone started ringing the first week."',
  metrics: [
    { label: 'Page Load', beforeValue: '8.2s', afterValue: '1.4s', icon: Clock },
    { label: 'Mobile Score', beforeValue: '34', afterValue: '96', icon: Smartphone },
    { label: 'Monthly Leads', beforeValue: '12', afterValue: '47', icon: TrendingUp },
    { label: 'SEO Score', beforeValue: '28', afterValue: '94', icon: Gauge },
  ] as Metric[],
};

const COLORS = {
  before: {
    gradient: 'from-[#FF8C42] to-[#cc6f35]',
    glow: 'bg-[#FF8C42]',
    text: '#FF8C42',
    textMuted: 'rgba(255, 140, 66, 0.7)',
    bg: 'rgba(255, 140, 66, 0.1)',
    border: 'rgba(255, 140, 66, 0.3)',
  },
  after: {
    gradient: 'from-[#004a58] to-[#00556a]',
    glow: 'bg-[#00a8cc]',
    text: '#00a8cc',
    textMuted: 'rgba(0, 168, 204, 0.7)',
    bg: 'rgba(0, 74, 88, 0.2)',
    border: 'rgba(0, 168, 204, 0.3)',
  },
};

// =========================================
// ANIMATIONS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  visual: (isBefore: boolean): Variants => ({
    initial: {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(15px)',
      x: isBefore ? -50 : 50,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      x: 0,
      transition: { type: 'spring', stiffness: 260, damping: 25 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(20px)',
      transition: { duration: 0.25 },
    },
  }),
};

// =========================================
// SUB-COMPONENTS
// =========================================

const BackgroundGradient = ({ isBefore }: { isBefore: boolean }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      animate={{
        background: isBefore
          ? 'radial-gradient(circle at 30% 50%, rgba(255, 140, 66, 0.12), transparent 60%)'
          : 'radial-gradient(circle at 70% 50%, rgba(0, 168, 204, 0.12), transparent 60%)',
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
  </div>
);

const BeforeMockup = () => (
  <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden shadow-inner">
    {/* Fake old website header */}
    <div className="bg-gray-400 h-12 flex items-center px-4 gap-2">
      <div className="w-20 h-4 bg-gray-500 rounded" />
      <div className="flex gap-2 ml-auto">
        <div className="w-12 h-3 bg-gray-500 rounded" />
        <div className="w-12 h-3 bg-gray-500 rounded" />
        <div className="w-12 h-3 bg-gray-500 rounded" />
      </div>
    </div>
    {/* Hero area */}
    <div className="p-6 bg-gray-300">
      <div className="w-48 h-6 bg-gray-400 rounded mb-3" />
      <div className="w-64 h-4 bg-gray-400/70 rounded mb-2" />
      <div className="w-56 h-4 bg-gray-400/70 rounded mb-4" />
      <div className="w-24 h-8 bg-yellow-600/50 rounded" />
    </div>
    {/* Content blocks */}
    <div className="p-6 grid grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-300 rounded p-3">
          <div className="w-full h-16 bg-gray-400/50 rounded mb-2" />
          <div className="w-full h-3 bg-gray-400/40 rounded mb-1" />
          <div className="w-3/4 h-3 bg-gray-400/40 rounded" />
        </div>
      ))}
    </div>
    {/* Outdated stamp */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-red-500/20 border-2 border-red-500/40 text-red-400 px-6 py-2 rounded-lg rotate-[-15deg] text-sm font-bold uppercase tracking-wider backdrop-blur-sm">
        Outdated Template
      </div>
    </div>
  </div>
);

const AfterScreenshot = () => (
  <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-[#004a58] to-[#00556a] relative">
    {/* Modern site mockup */}
    <div className="absolute inset-0 bg-neutral-900">
      {/* Header */}
      <div className="h-14 bg-neutral-800/80 flex items-center px-4 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-[#00a8cc]/20 flex items-center justify-center">
          <div className="w-4 h-4 rounded bg-[#00a8cc]/60" />
        </div>
        <div className="ml-3 w-24 h-3 bg-white/20 rounded" />
        <div className="ml-auto flex gap-4">
          <div className="w-16 h-2.5 bg-white/10 rounded" />
          <div className="w-16 h-2.5 bg-white/10 rounded" />
          <div className="w-20 h-7 bg-[#00a8cc] rounded-full" />
        </div>
      </div>
      {/* Hero */}
      <div className="p-6 bg-gradient-to-b from-neutral-800/50 to-transparent">
        <div className="w-40 h-3 bg-[#00a8cc]/40 rounded mb-3" />
        <div className="w-72 h-8 bg-white/30 rounded mb-2" />
        <div className="w-64 h-6 bg-white/20 rounded mb-4" />
        <div className="flex gap-3">
          <div className="w-28 h-10 bg-[#00a8cc] rounded-lg" />
          <div className="w-28 h-10 bg-white/10 rounded-lg border border-white/20" />
        </div>
      </div>
      {/* Content Grid */}
      <div className="px-6 grid grid-cols-3 gap-3 mt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-neutral-800/60 rounded-xl p-3 border border-white/5">
            <div className="w-full h-20 bg-gradient-to-br from-[#004a58]/30 to-[#00556a]/30 rounded-lg mb-2" />
            <div className="w-full h-2.5 bg-white/15 rounded mb-1.5" />
            <div className="w-3/4 h-2.5 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    </div>
    {/* Success Badge */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-[#00a8cc]/20 border border-[#00a8cc]/40 text-[#00a8cc] px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00a8cc] animate-pulse" />
        Live & Converting
      </div>
    </div>
  </div>
);

const SiteVisual = ({ mode }: { mode: ViewMode }) => {
  const isBefore = mode === 'before';
  const colors = COLORS[mode];

  return (
    <motion.div layout="position" className="relative group shrink-0">
      {/* Animated Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-10%] rounded-2xl border border-dashed opacity-30"
        style={{ borderColor: colors.text }}
      />

      {/* Glow */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} blur-3xl`}
      />

      {/* Visual Container */}
      <div className="relative w-[320px] h-[220px] md:w-[500px] md:h-[340px] rounded-2xl border border-white/10 shadow-2xl overflow-hidden bg-neutral-900/50 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            variants={ANIMATIONS.visual(isBefore)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 p-2"
          >
            {isBefore ? <BeforeMockup /> : <AfterScreenshot />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Status Badge */}
      <motion.div layout="position" className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div
          className="flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2 rounded-full border backdrop-blur"
          style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: colors.border,
            color: colors.textMuted
          }}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${colors.glow} animate-pulse`} />
          {isBefore ? 'Generic Template' : 'AI-Powered Site'}
        </div>
      </motion.div>
    </motion.div>
  );
};

const MetricsPanel = ({ mode }: { mode: ViewMode }) => {
  const isBefore = mode === 'before';
  const colors = COLORS[mode];
  const alignClass = isBefore ? 'items-start text-left' : 'items-end text-right';
  const flexDir = isBefore ? 'flex-row' : 'flex-row-reverse';

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${alignClass}`}
    >
      <motion.span
        variants={ANIMATIONS.item}
        className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
        style={{ color: colors.textMuted }}
      >
        {isBefore ? 'The Problem' : 'The Solution'}
      </motion.span>

      <motion.h2
        variants={ANIMATIONS.item}
        className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-2 text-white"
      >
        {isBefore ? 'Before Haestus' : 'After Haestus'}
      </motion.h2>

      <motion.p
        variants={ANIMATIONS.item}
        className={`text-neutral-400 mb-6 max-w-sm leading-relaxed ${isBefore ? 'mr-auto' : 'ml-auto'}`}
      >
        {isBefore
          ? 'Slow, outdated template. Zero SEO. Mobile disaster. Leads trickling in.'
          : 'Lightning fast. AI-powered features. Dominating local search. Phone ringing daily.'}
      </motion.p>

      {/* Metrics */}
      <motion.div
        variants={ANIMATIONS.item}
        className="w-full space-y-4 p-5 rounded-2xl border backdrop-blur-sm"
        style={{ backgroundColor: colors.bg, borderColor: colors.border }}
      >
        {CLIENT_DATA.metrics.map((metric, idx) => (
          <div key={metric.label} className="group">
            <div className={`flex items-center justify-between mb-2 text-sm ${flexDir}`}>
              <div className="flex items-center gap-2 text-neutral-300">
                <metric.icon size={14} style={{ color: colors.text }} />
                <span>{metric.label}</span>
              </div>
              <span className="font-mono text-lg font-bold" style={{ color: colors.text }}>
                {isBefore ? metric.beforeValue : metric.afterValue}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Client Info */}
      <motion.div variants={ANIMATIONS.item} className={`mt-6 ${isBefore ? '' : 'text-right'}`}>
        <p className="text-sm text-neutral-500 mb-1">{CLIENT_DATA.industry}</p>
        <p className="text-lg font-semibold text-white">{CLIENT_DATA.name}</p>
        {!isBefore && (
          <a
            href={CLIENT_DATA.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-sm transition-colors hover:underline"
            style={{ color: colors.text }}
          >
            Visit Live Site <ExternalLink size={12} />
          </a>
        )}
      </motion.div>
    </motion.div>
  );
};

const ViewSwitcher = ({
  activeMode,
  onToggle
}: {
  activeMode: ViewMode;
  onToggle: (mode: ViewMode) => void;
}) => {
  const options: { id: ViewMode; label: string }[] = [
    { id: 'before', label: 'Before' },
    { id: 'after', label: 'After' },
  ];

  return (
    <div className="flex justify-center mt-12">
      <motion.div
        layout
        className="flex items-center gap-1 p-1.5 rounded-full bg-neutral-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            whileTap={{ scale: 0.96 }}
            className="relative w-28 h-11 rounded-full flex items-center justify-center text-sm font-medium focus:outline-none"
          >
            {activeMode === opt.id && (
              <motion.div
                layoutId="toggle-surface"
                className="absolute inset-0 rounded-full shadow-inner"
                style={{
                  background: opt.id === 'before'
                    ? 'linear-gradient(to bottom, rgba(255,140,66,0.2), rgba(255,140,66,0.1))'
                    : 'linear-gradient(to bottom, rgba(0,168,204,0.2), rgba(0,168,204,0.1))'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-300 ${
                activeMode === opt.id ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {opt.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

// =========================================
// MAIN COMPONENT
// =========================================

export default function ClientBeforeAfter() {
  const [viewMode, setViewMode] = useState<ViewMode>('before');
  const isBefore = viewMode === 'before';

  return (
    <section className="relative w-full py-20 bg-neutral-950 overflow-hidden">
      <BackgroundGradient isBefore={isBefore} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 px-6 relative z-10"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-neutral-400 mb-4">
          Real Client Results
        </span>
        <h2 className="text-4xl md:text-5xl font-display text-white mb-3">
          See the Transformation
        </h2>
        <p className="text-lg text-neutral-500 font-display-light max-w-xl mx-auto">
          {CLIENT_DATA.testimonial}
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
          className={`flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 ${
            isBefore ? 'lg:flex-row' : 'lg:flex-row-reverse'
          }`}
        >
          {/* Visual */}
          <SiteVisual mode={viewMode} />

          {/* Content */}
          <motion.div layout="position" className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <MetricsPanel key={viewMode} mode={viewMode} />
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Switcher */}
        <ViewSwitcher activeMode={viewMode} onToggle={setViewMode} />
      </div>
    </section>
  );
}

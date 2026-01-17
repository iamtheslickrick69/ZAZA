'use client';

import { useState } from 'react';
import {
  Gauge,
  TrendingUp,
  Smartphone,
  Clock,
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
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
}

const CLIENT_DATA = {
  name: 'Beehive Rental & Sales',
  industry: 'Equipment Rental',
  url: 'https://www.beehiverentalandsales.com',
  testimonial: '"Night and day difference. Our phone started ringing the first week."',
  metrics: [
    { label: 'Page Load', beforeValue: '8.2s', afterValue: '1.4s', icon: Clock },
    { label: 'Mobile', beforeValue: '34', afterValue: '96', icon: Smartphone },
    { label: 'Leads/mo', beforeValue: '12', afterValue: '47', icon: TrendingUp },
    { label: 'SEO', beforeValue: '28', afterValue: '94', icon: Gauge },
  ] as Metric[],
};

const COLORS = {
  before: {
    accent: '#e5e5e5',
    accentMuted: 'rgba(229, 229, 229, 0.5)',
    glow: 'rgba(255, 255, 255, 0.6)',
    glowSoft: 'rgba(255, 255, 255, 0.15)',
  },
  after: {
    accent: '#0ea5e9',
    accentMuted: 'rgba(14, 165, 233, 0.5)',
    glow: 'rgba(14, 165, 233, 0.8)',
    glowSoft: 'rgba(14, 165, 233, 0.2)',
  },
};

// =========================================
// SUB-COMPONENTS
// =========================================

const MiniToggle = ({
  activeMode,
  onToggle,
}: {
  activeMode: ViewMode;
  onToggle: (mode: ViewMode) => void;
}) => (
  <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-900/80 backdrop-blur border border-white/10">
    {(['before', 'after'] as ViewMode[]).map((mode) => (
      <button
        key={mode}
        onClick={() => onToggle(mode)}
        className={`relative px-5 py-2 rounded-lg text-sm font-medium ${
          activeMode === mode
            ? 'text-white'
            : 'text-neutral-500 hover:text-neutral-300'
        }`}
      >
        {activeMode === mode && (
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background:
                mode === 'before'
                  ? 'rgba(255,255,255,0.15)'
                  : 'rgba(0,168,204,0.25)',
            }}
          />
        )}
        <span className="relative z-10 capitalize">{mode}</span>
      </button>
    ))}
  </div>
);

const MetricBadge = ({
  metric,
  mode,
}: {
  metric: Metric;
  mode: ViewMode;
}) => {
  const value = mode === 'before' ? metric.beforeValue : metric.afterValue;
  const colors = COLORS[mode];
  const Icon = metric.icon;

  return (
    <div
      className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all"
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(255,255,255,0.1)',
      }}
    >
      <Icon size={16} style={{ color: colors.accent }} strokeWidth={1.5} />
      <span
        className="font-mono text-base font-bold"
        style={{ color: colors.accent }}
      >
        {value}
      </span>
    </div>
  );
};

const BrowserFrame = ({
  mode,
  children,
}: {
  mode: ViewMode;
  children: React.ReactNode;
}) => {
  return (
    <div className="rounded-xl overflow-hidden">
      {/* Browser Chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{
          backgroundColor: 'rgba(23, 23, 23, 0.95)',
          borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-neutral-600" />
          <div className="w-3 h-3 rounded-full bg-neutral-600" />
          <div className="w-3 h-3 rounded-full bg-neutral-600" />
        </div>
        <div className="flex-1 mx-3">
          <div
            className="h-6 rounded-md flex items-center justify-center text-xs text-neutral-500 truncate px-3"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            {mode === 'after' ? 'beehiverentalandsales.com' : 'old-site.com'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative aspect-[16/10] bg-neutral-900">
        {children}
      </div>
    </div>
  );
};

// =========================================
// MAIN COMPONENT
// =========================================

export default function ClientBeforeAfter() {
  const [viewMode, setViewMode] = useState<ViewMode>('before');
  const isBefore = viewMode === 'before';
  const colors = COLORS[viewMode];

  return (
    <section className="relative w-full py-16 bg-neutral-950 overflow-hidden">
      {/* Subtle background glow */}
      <div
        style={{
          background: isBefore
            ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03), transparent 50%)'
            : 'radial-gradient(circle at 50% 50%, rgba(0,168,204,0.06), transparent 50%)',
        }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-neutral-400">
            Real Client Results
          </span>
          <h2 className="text-3xl md:text-4xl font-display text-white">
            See the Transformation
          </h2>
          <p className="text-neutral-400 text-sm md:text-base max-w-xl">
            Real results from a real business—no fluff, just proof.
          </p>
          <MiniToggle activeMode={viewMode} onToggle={setViewMode} />
        </div>

        {/* Main Card with Glow Border */}
        <div className="relative">
          {/* Static Glow Border */}
          <div
            className="absolute -inset-[2px] rounded-3xl"
            style={{
              background: isBefore
                ? 'rgba(255,255,255,0.2)'
                : 'rgba(0,168,204,0.3)',
            }}
          />

          {/* Glow Shadow */}
          <div
            className="absolute -inset-4 rounded-3xl pointer-events-none"
            style={{
              boxShadow: isBefore
                ? '0 0 60px rgba(255,255,255,0.15), 0 0 120px rgba(255,255,255,0.08)'
                : '0 0 60px rgba(0,168,204,0.25), 0 0 120px rgba(0,168,204,0.15)',
            }}
          />

          {/* Card Container */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(23, 23, 23, 0.6)',
              backdropFilter: 'blur(20px)',
              borderColor: isBefore
                ? 'rgba(255,255,255,0.2)'
                : 'rgba(0,168,204,0.3)',
            }}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left: Image with Browser Frame */}
              <div className="lg:w-[58%] p-5">
                <BrowserFrame mode={viewMode}>
                  <img
                    key={viewMode}
                    src={isBefore ? '/before.png' : '/after.png'}
                    alt={isBefore ? 'Before Haestus' : 'After Haestus'}
                    className="w-full h-full object-cover object-top"
                  />
                </BrowserFrame>
              </div>

              {/* Right: Content */}
              <div className="lg:w-[42%] p-8 lg:p-10 flex flex-col justify-center">
                <div key={viewMode}>
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                    {isBefore ? 'Before Haestus' : 'After Haestus'}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-base text-neutral-400 mb-8 leading-relaxed">
                    {isBefore
                      ? 'Slow, outdated template. Zero SEO. Mobile disaster.'
                      : 'A business this professional deserves an online presence to match.'}
                  </p>

                  {/* Metrics Row */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {CLIENT_DATA.metrics.map((metric) => (
                      <MetricBadge
                        key={metric.label}
                        metric={metric}
                        mode={viewMode}
                      />
                    ))}
                  </div>

                  {/* Client Info Footer */}
                  <div
                    className="flex items-center justify-between pt-6 border-t"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <div>
                      <p className="text-xs text-neutral-500">
                        {CLIENT_DATA.industry}
                      </p>
                      <p className="text-base font-semibold text-white">
                        {CLIENT_DATA.name}
                      </p>
                    </div>
                    {!isBefore && (
                      <a
                        href={CLIENT_DATA.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
                        style={{ color: colors.accent }}
                      >
                        Visit Site <ExternalLink size={14} />
                      </a>
                    )}
                  </div>

                  {/* Testimonial */}
                  <p className="mt-6 text-sm text-neutral-500 italic">
                    {CLIENT_DATA.testimonial}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

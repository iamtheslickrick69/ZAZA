'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  Warning,
  UserMinus,
  Rocket,
  Lightning,
  CurrencyDollar,
  Wrench,
  TrendUp,
  Brain,
  Skull,
  Sparkle,
  Prohibit,
  X,
  Robot,
} from '@phosphor-icons/react';

// Pain points - compact labels
const oldWayPains = [
  { label: 'Months to launch', icon: Clock },
  { label: 'Hostage to devs', icon: UserMinus },
  { label: 'Every edit = ticket', icon: Warning },
  { label: 'Pay per change', icon: CurrencyDollar },
  { label: 'No SEO or leads', icon: Prohibit },
  { label: 'Does nothing', icon: Skull },
];

// Benefits - compact labels
const newWayBenefits = [
  { label: 'AI trained on you', icon: Brain },
  { label: 'We handle updates', icon: Wrench },
  { label: 'Custom AI features', icon: Robot },
  { label: 'AI-powered SEO', icon: TrendUp },
  { label: 'Live in days', icon: Rocket },
  { label: 'Gets smarter', icon: Lightning },
];

// Pill component with hover effects
const FeaturePill = ({
  label,
  icon: Icon,
  variant,
}: {
  label: string;
  icon: React.ComponentType<any>;
  variant: 'pain' | 'benefit';
}) => {
  const isPain = variant === 'pain';

  return (
    <motion.div
      className="relative flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-default"
      style={{
        backgroundColor: isPain
          ? 'rgba(255, 140, 66, 0.15)'
          : 'rgba(0, 85, 106, 0.25)',
      }}
      whileHover={{
        scale: 1.05,
        backgroundColor: isPain
          ? 'rgba(255, 140, 66, 0.25)'
          : 'rgba(0, 85, 106, 0.4)',
        boxShadow: isPain
          ? '0 0 20px rgba(255, 140, 66, 0.3)'
          : '0 0 20px rgba(14, 165, 233, 0.3)',
      }}
      transition={{ duration: 0.2 }}
    >
      <Icon
        className="w-4 h-4 shrink-0"
        weight="thin"
        style={{ color: isPain ? '#FF8C42' : '#0ea5e9' }}
      />
      <span
        className="text-xs font-medium whitespace-nowrap"
        style={{ color: isPain ? 'rgba(255, 179, 128, 0.9)' : 'rgba(200, 230, 240, 0.9)' }}
      >
        {label}
      </span>
      {/* X mark for pain points */}
      {isPain && (
        <X
          className="w-3 h-3 ml-1 opacity-40"
          weight="bold"
          style={{ color: '#ef4444' }}
        />
      )}
    </motion.div>
  );
};

export default function SmartSitesShowcase() {
  return (
    <section className="relative w-full overflow-hidden py-16 bg-neutral-950">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 px-6"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-neutral-400 mb-4">
          Smart Sites
        </span>
        <h2 className="text-3xl md:text-4xl font-display text-white mb-3">
          Your 24/7 Digital Employee
        </h2>
        <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto">
          Your website should close deals while you sleep.
        </p>
      </motion.div>

      {/* Side by Side Comparison */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* LEFT - Static Sites */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <div
              className="relative overflow-hidden rounded-2xl p-8 h-full flex flex-col"
              style={{
                background: 'linear-gradient(to bottom right, rgba(255, 140, 66, 0.2), rgba(255, 140, 66, 0.08))',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(255, 140, 66, 0.25)',
              }}
            >
              <div className="relative z-10 flex flex-col h-full">
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-5 self-start"
                  style={{
                    backgroundColor: 'rgba(255, 140, 66, 0.2)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(255, 140, 66, 0.3)',
                  }}
                >
                  <Skull className="w-3 h-3" weight="thin" style={{ color: '#FF8C42' }} />
                  <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: '#FF8C42' }}>The Old Way</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-display mb-2" style={{ color: '#FFB380' }}>
                  Static Sites
                </h3>
                <p className="text-sm mb-6 font-display-light" style={{ color: 'rgba(255, 140, 66, 0.6)' }}>
                  Is your website more like a PDF?
                </p>

                {/* Pain Pills - Grid */}
                <div className="grid grid-cols-3 gap-2 mt-auto">
                  {oldWayPains.map((pain, idx) => (
                    <motion.div
                      key={pain.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <FeaturePill
                        label={pain.label}
                        icon={pain.icon}
                        variant="pain"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT - Your 24/7 Digital Employee */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full"
          >
            {/* Animated border */}
            <div className="relative h-full">
              <motion.div
                className="absolute -inset-[1px] rounded-2xl opacity-60"
                style={{
                  background: 'linear-gradient(90deg, #004a58, #0ea5e9, #004a58)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              <div
                className="relative overflow-hidden rounded-2xl p-8 h-full flex flex-col"
                style={{
                  background: 'linear-gradient(to bottom right, rgba(0, 74, 88, 0.25), rgba(0, 85, 106, 0.12))',
                }}
              >
                {/* Glow orb */}
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                  style={{ backgroundColor: 'rgba(0, 85, 106, 0.15)' }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header with Badge and AI Bot */}
                  <div className="flex items-start justify-between mb-5">
                    <motion.div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: 'rgba(0, 85, 106, 0.3)',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'rgba(14, 165, 233, 0.3)',
                      }}
                      animate={{
                        boxShadow: ['0 0 15px rgba(14, 165, 233, 0)', '0 0 20px rgba(14, 165, 233, 0.3)', '0 0 15px rgba(14, 165, 233, 0)'],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkle className="w-3 h-3" weight="thin" style={{ color: '#0ea5e9' }} />
                      <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: '#0ea5e9' }}>The New Way</span>
                    </motion.div>

                    {/* AI Bot Icon */}
                    <motion.img
                      src="/slickai.png"
                      alt="Slick AI"
                      className="w-12 h-12 object-contain"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display text-white mb-2">
                    Your 24/7 Digital Employee
                  </h3>
                  <p className="text-sm mb-6 font-display-light" style={{ color: 'rgba(14, 165, 233, 0.7)' }}>
                    Not just a website. An AI-powered team member.
                  </p>

                  {/* Benefit Pills - Grid */}
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    {newWayBenefits.map((benefit, idx) => (
                      <motion.div
                        key={benefit.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 + 0.2 }}
                      >
                        <FeaturePill
                          label={benefit.label}
                          icon={benefit.icon}
                          variant="benefit"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

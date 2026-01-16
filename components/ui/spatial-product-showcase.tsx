'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  XCircle,
  Warning,
  UserMinus,
  Rocket,
  Lightning,
  CurrencyDollar,
  Ghost,
  Robot,
  Wrench,
  TrendUp,
  Brain,
  Skull,
  Sparkle,
  CheckCircle,
  ArrowUpRight,
  Timer,
  PiggyBank,
} from '@phosphor-icons/react';

// Pain points - BUILD THE PAIN
const oldWayPains = [
  { label: 'Your developer charges $150 to change a comma', icon: CurrencyDollar },
  { label: "You're paying Google $3,000/mo to compete with Amazon", icon: Warning },
  { label: 'Last blog post: March 2022', icon: Clock },
  { label: "Your 'contact us' form goes to an inbox nobody checks", icon: Ghost },
  { label: 'Competitor launched last month. Already outranks you.', icon: UserMinus },
  { label: 'You paid for a website. You got a digital business card.', icon: XCircle },
];

// Benefits - CREATE FOMO
const newWayBenefits = [
  { label: 'Customer asks at 2am. AI closes the sale by 2:01am.', icon: Robot },
  { label: 'ChatGPT recommends your competitor. Unless you fix that.', icon: Brain },
  { label: 'Your AI knows your pricing, FAQs, objections. Handles all of it.', icon: Lightning },
  { label: 'Change your headline yourself. Takes 11 seconds.', icon: Wrench },
  { label: 'Launched Monday. Ranked by Friday.', icon: Rocket },
  { label: 'Every visitor conversation makes it smarter. Forever.', icon: TrendUp },
];

// Stats for the results bar
const stats = [
  { label: 'More leads', value: '4x', icon: ArrowUpRight },
  { label: 'Days to live', value: '7', icon: Timer },
  { label: 'To rank', value: '$0', icon: PiggyBank },
];

export default function SmartSitesShowcase() {
  return (
    <section className="relative w-full overflow-hidden py-20 bg-neutral-950">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 px-6"
      >
        <h2 className="text-4xl md:text-6xl font-display text-white mb-3">
          SMART SITES
        </h2>
        <p className="text-lg text-neutral-500 font-display-light">
          Finally, websites that think.
        </p>
      </motion.div>

      {/* Side by Side Comparison */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-2">

          {/* LEFT SIDE - THE OLD WAY (Graveyard) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative group"
          >
            <div
              className="relative overflow-hidden rounded-3xl p-8 md:p-10 h-full"
              style={{
                background: 'linear-gradient(to bottom right, rgba(255, 140, 66, 0.25), rgba(255, 140, 66, 0.15), rgba(255, 140, 66, 0.1))',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(255, 140, 66, 0.3)',
              }}
            >
              {/* Cracked texture */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L15 25 L30 35 L45 20 L60 30 M0 45 L20 50 L40 40 L60 50' stroke='%23FF8C42' fill='none' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Warm glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(255, 140, 66, 0.15), transparent)',
                }}
              />

              <div className="relative z-10">
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                  style={{
                    backgroundColor: 'rgba(255, 140, 66, 0.2)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(255, 140, 66, 0.4)',
                  }}
                >
                  <Skull className="w-4 h-4" weight="thin" style={{ color: '#FF8C42' }} />
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: '#FF8C42' }}>The Old Way</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-display mb-2" style={{ color: '#FFB380' }}>
                  Static Sites
                </h3>
                <p className="text-lg mb-8 font-display-light" style={{ color: 'rgba(255, 140, 66, 0.7)' }}>
                  The $50,000 Mistake You're Still Paying For
                </p>

                {/* Pain Points */}
                <div className="space-y-3">
                  {oldWayPains.map((pain, idx) => (
                    <motion.div
                      key={pain.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl group/item transition-all duration-300"
                      style={{
                        backgroundColor: 'rgba(255, 140, 66, 0.15)',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'rgba(255, 140, 66, 0.3)',
                      }}
                    >
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 140, 66, 0.25)' }}>
                        <pain.icon className="w-4 h-4" weight="thin" style={{ color: 'rgba(255, 140, 66, 0.8)' }} />
                      </div>
                      <span className="text-sm transition-colors" style={{ color: 'rgba(255, 179, 128, 0.8)' }}>
                        {pain.label}
                      </span>
                      <XCircle className="w-4 h-4 ml-auto" weight="thin" style={{ color: 'rgba(239, 68, 68, 0.6)' }} />
                    </motion.div>
                  ))}
                </div>

                {/* Dead CTA */}
                <div
                  className="mt-8 p-4 rounded-xl text-center"
                  style={{
                    backgroundColor: 'rgba(255, 140, 66, 0.15)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(255, 140, 66, 0.25)',
                  }}
                >
                  <p className="text-sm italic" style={{ color: 'rgba(255, 140, 66, 0.6)' }}>
                    "Let me check with my developer and get back to you next quarter..."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - THE NEW WAY (Paradise) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative group"
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute -inset-[1px] rounded-3xl opacity-75"
              style={{
                background: 'linear-gradient(90deg, #004a58, #00556a, #004a58)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            <div
              className="relative overflow-hidden rounded-3xl p-8 md:p-10 h-full"
              style={{
                background: 'linear-gradient(to bottom right, rgba(0, 74, 88, 0.3), rgba(0, 85, 106, 0.2), rgba(0, 74, 88, 0.15))',
              }}
            >
              {/* Animated glow orbs */}
              <motion.div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: 'rgba(0, 85, 106, 0.15)' }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: 'rgba(0, 74, 88, 0.15)' }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />

              {/* Sparkles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{ left: `${15 + i * 12}%`, top: `${8 + (i % 4) * 25}%`, backgroundColor: '#00a8cc' }}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [1, 2, 1], y: [0, -10, 0] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                {/* Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                  style={{
                    backgroundColor: 'rgba(0, 85, 106, 0.3)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(0, 168, 204, 0.4)',
                  }}
                  animate={{
                    boxShadow: ['0 0 20px rgba(0, 168, 204, 0)', '0 0 30px rgba(0, 168, 204, 0.4)', '0 0 20px rgba(0, 168, 204, 0)'],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkle className="w-4 h-4" weight="thin" style={{ color: '#00a8cc' }} />
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: '#00a8cc' }}>The New Way</span>
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-display text-white mb-2">
                  Smart Sites
                </h3>
                <p className="text-lg mb-8 font-display-light" style={{ color: 'rgba(0, 168, 204, 0.8)' }}>
                  While You Read This, One Just Closed a Deal
                </p>

                {/* Benefits */}
                <div className="space-y-3">
                  {newWayBenefits.map((benefit, idx) => (
                    <motion.div
                      key={benefit.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                      className="flex items-center gap-3 p-3 rounded-xl group/item transition-all duration-300"
                      style={{
                        backgroundColor: 'rgba(0, 85, 106, 0.2)',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'rgba(0, 168, 204, 0.3)',
                      }}
                    >
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(0, 85, 106, 0.4)' }}>
                        <benefit.icon className="w-4 h-4" weight="thin" style={{ color: '#00a8cc' }} />
                      </div>
                      <span className="text-neutral-300 text-sm group-hover/item:text-white transition-colors">
                        {benefit.label}
                      </span>
                      <CheckCircle className="w-4 h-4 ml-auto" weight="thin" style={{ color: '#00a8cc' }} />
                    </motion.div>
                  ))}
                </div>

                {/* Results Stats Bar */}
                <motion.div
                  className="mt-6 p-4 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(0, 85, 106, 0.25)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(0, 168, 204, 0.3)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <stat.icon className="w-3 h-3" weight="thin" style={{ color: '#00a8cc' }} />
                          <span className="text-xl md:text-2xl font-bold text-white">{stat.value}</span>
                        </div>
                        <span className="text-xs" style={{ color: 'rgba(0, 168, 204, 0.7)' }}>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA with shine */}
                <motion.button
                  className="mt-6 w-full p-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(to right, #004a58, #00556a)',
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <Robot className="w-5 h-5 relative z-10" weight="thin" />
                  <span className="relative z-10">See It Work in 60 Seconds</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* VS Badge */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            className="w-16 h-16 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.5 }}
          >
            <span className="text-xl font-bold text-neutral-400">VS</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

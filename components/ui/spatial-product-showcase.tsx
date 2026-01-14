'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  XCircle,
  AlertTriangle,
  UserX,
  Rocket,
  Zap,
  DollarSign,
  Ghost,
  Bot,
  Wrench,
  TrendingUp,
  Brain,
  Skull,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Timer,
  PiggyBank,
} from 'lucide-react';

// Pain points - SHARPER copy with specifics
const oldWayPains = [
  { label: '3-6 months just to go live', icon: Clock },
  { label: '$150/hr for a text edit', icon: DollarSign },
  { label: 'Developers ghost you for weeks', icon: UserX },
  { label: 'Every tiny change = support ticket', icon: AlertTriangle },
  { label: 'Zero SEO, zero leads, zero ROI', icon: Ghost },
  { label: 'Site collects dust while competitors win', icon: XCircle },
];

// Benefits - BOLDER copy with specifics
const newWayBenefits = [
  { label: 'AI trained on YOUR customers & data', icon: Brain },
  { label: 'Never touch code again. Ever.', icon: Wrench },
  { label: '50+ custom AI features built for you', icon: Bot },
  { label: 'AI writes SEO blogs while you sleep', icon: TrendingUp },
  { label: 'Live in 7 days, not 7 months', icon: Rocket },
  { label: 'Learns & improves autonomously', icon: Zap },
];

// Stats for the results bar
const stats = [
  { label: 'More leads', value: '340%', icon: ArrowUpRight },
  { label: 'Faster launch', value: '12x', icon: Timer },
  { label: 'Maintenance cost', value: '$0', icon: PiggyBank },
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
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-950/40 via-orange-900/30 to-amber-950/30 border border-orange-800/40 p-8 md:p-10 h-full">
              {/* Cracked texture */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L15 25 L30 35 L45 20 L60 30 M0 45 L20 50 L40 40 L60 50' stroke='%23fb923c' fill='none' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Warm glow */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-900/20 to-transparent pointer-events-none" />

              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-950/60 border border-orange-700/40 mb-6">
                  <Skull className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-mono text-orange-300 uppercase tracking-wider">The Old Way</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-display text-orange-200 mb-2">
                  Static Sites
                </h3>
                <p className="text-orange-400/70 text-lg mb-8 font-display-light">
                  R.I.P. Your Growth Potential
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
                      className="flex items-center gap-3 p-3 rounded-xl bg-orange-950/30 border border-orange-800/40 group/item hover:bg-orange-900/40 hover:border-orange-700/50 transition-all duration-300"
                    >
                      <div className="p-2 rounded-lg bg-orange-900/40">
                        <pain.icon className="w-4 h-4 text-orange-400/80" />
                      </div>
                      <span className="text-orange-200/70 text-sm group-hover/item:text-orange-200 transition-colors">
                        {pain.label}
                      </span>
                      <XCircle className="w-4 h-4 text-red-500/60 ml-auto" />
                    </motion.div>
                  ))}
                </div>

                {/* Dead CTA */}
                <div className="mt-8 p-4 rounded-xl bg-orange-950/30 border border-orange-800/30 text-center">
                  <p className="text-orange-300/60 text-sm italic">
                    "We'll get back to you in 2-3 business weeks..."
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
                background: 'linear-gradient(90deg, #10b981, #06b6d4, #10b981)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/40 via-neutral-900 to-cyan-950/30 p-8 md:p-10 h-full">
              {/* Animated glow orbs */}
              <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />

              {/* Sparkles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                    style={{ left: `${15 + i * 12}%`, top: `${8 + (i % 4) * 25}%` }}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [1, 2, 1], y: [0, -10, 0] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                {/* Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 mb-6"
                  animate={{
                    boxShadow: ['0 0 20px rgba(16, 185, 129, 0)', '0 0 30px rgba(16, 185, 129, 0.4)', '0 0 20px rgba(16, 185, 129, 0)'],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">The New Way</span>
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-display text-white mb-2">
                  AGI Sites
                </h3>
                <p className="text-emerald-400/70 text-lg mb-8 font-display-light">
                  Your 24/7 Digital Employee
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
                      className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/30 group/item hover:bg-emerald-900/30 hover:border-emerald-500/40 transition-all duration-300"
                    >
                      <div className="p-2 rounded-lg bg-emerald-900/50">
                        <benefit.icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-neutral-300 text-sm group-hover/item:text-white transition-colors">
                        {benefit.label}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto" />
                    </motion.div>
                  ))}
                </div>

                {/* Results Stats Bar */}
                <motion.div
                  className="mt-6 p-4 rounded-xl bg-emerald-950/30 border border-emerald-700/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <stat.icon className="w-3 h-3 text-emerald-400" />
                          <span className="text-xl md:text-2xl font-bold text-white">{stat.value}</span>
                        </div>
                        <span className="text-xs text-emerald-400/70">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA with shine */}
                <motion.button
                  className="mt-6 w-full p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold flex items-center justify-center gap-2 hover:from-emerald-500 hover:to-cyan-500 transition-all duration-300 relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <Bot className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Meet Your AI Team</span>
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

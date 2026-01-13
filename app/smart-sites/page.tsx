'use client';

import { motion } from 'framer-motion';
import { Clock, Users, AlertTriangle, XCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SmartSitesPage() {
  return (
    <div className='min-h-screen bg-black'>
      {/* Hero Section */}
      <section className='relative pt-24 pb-16 px-6 max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h1 className='text-6xl md:text-7xl font-light tracking-tight text-white mb-4'>
            SMART SITES
          </h1>
          <p className='text-xl md:text-2xl text-gray-400 font-light'>
            Finally, websites that think.
          </p>

          {/* Toggle Pills */}
          <div className='flex items-center justify-center gap-2 mt-6'>
            <button className='px-6 py-2 rounded-full bg-red-600/20 text-red-500 font-medium text-sm hover:bg-red-600/30 transition-colors border border-red-600/30'>
              2025&gt;
            </button>
            <button className='px-6 py-2 rounded-full bg-neutral-800 text-gray-400 font-medium text-sm hover:bg-neutral-700 transition-colors border border-neutral-700'>
              AGI SITES
            </button>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className='grid md:grid-cols-1 gap-12 items-center max-w-xl mx-auto'>
          {/* Static Sites Problems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className='mb-6'>
              <span className='text-red-500 font-mono text-sm font-semibold'>
                2025&gt;
              </span>
              <h2 className='text-3xl md:text-4xl font-light text-white mt-2 mb-3'>
                Static Sites
              </h2>
              <p className='text-gray-400 text-base'>
                Is your website more like a PDF?
              </p>
            </div>

            <p className='text-gray-300 text-sm mb-6 leading-relaxed'>
              The old way of building websites. Slow timelines, endless
              revisions, and sites that feel outdated before they even launch.
            </p>

            {/* Problem Cards */}
            <div className='grid grid-cols-2 gap-3 mb-6'>
              <div className='p-3 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-red-600/30 transition-colors'>
                <Clock className='w-4 h-4 text-red-500 mb-1' />
                <p className='text-xs text-gray-300 font-medium'>
                  Months before launch
                </p>
              </div>
              <div className='p-3 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-red-600/30 transition-colors'>
                <Users className='w-4 h-4 text-red-500 mb-1' />
                <p className='text-xs text-gray-300 font-medium'>
                  Hostage to developers
                </p>
              </div>
              <div className='p-3 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-red-600/30 transition-colors'>
                <AlertTriangle className='w-4 h-4 text-red-500 mb-1' />
                <p className='text-xs text-gray-300 font-medium'>
                  Every edit needs a ticket
                </p>
              </div>
              <div className='p-3 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-red-600/30 transition-colors'>
                <XCircle className='w-4 h-4 text-red-500 mb-1' />
                <p className='text-xs text-gray-300 font-medium'>
                  Outdated on arrival
                </p>
              </div>
            </div>

            <button className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-red-600/30 mx-auto'>
              <Sparkles className='w-4 h-4' />
              See What&apos;s Possible
            </button>
          </motion.div>
        </div>

        {/* Stats Row - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-neutral-800'
        >
          <div className='text-center'>
            <div className='text-3xl font-bold text-blue-500 mb-1'>8s → 1.2s</div>
            <p className='text-gray-400 text-sm'>Page Load</p>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-blue-500 mb-1'>+347%</div>
            <p className='text-gray-400 text-sm'>Conversion</p>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-blue-500 mb-1'>72hrs</div>
            <p className='text-gray-400 text-sm'>Launch Time</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='text-center mt-12'
        >
          <Link
            href='#contact'
            className='inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold rounded-full text-base transition-all shadow-xl shadow-blue-600/30 hover:scale-105'
          >
            <Sparkles className='w-5 h-5' />
            Transform Your Site
          </Link>
        </motion.div>
      </section>

      {/* Back to Home */}
      <div className='py-6 text-center border-t border-neutral-800'>
        <Link
          href='/'
          className='text-gray-400 hover:text-white font-medium transition-colors text-sm'
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

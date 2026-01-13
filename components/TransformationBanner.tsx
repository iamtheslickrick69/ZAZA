'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageComparisonSlider } from '@/components/ui/image-comparison-slider-horizontal';
import { X, ArrowLeftRight } from 'lucide-react';

export function TransformationBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Compact CTA Button */}
      <section className='relative py-12 px-6 bg-black'>
        <div className='max-w-4xl mx-auto'>
          <motion.button
            onClick={() => setIsOpen(true)}
            className='group relative w-full p-6 md:p-8 rounded-2xl overflow-hidden cursor-pointer'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated Gradient Border */}
            <div
              className='absolute inset-0 rounded-2xl'
              style={{
                background: 'linear-gradient(90deg, #006AAA, #C00008, #006AAA, #C00008)',
                backgroundSize: '300% 100%',
                animation: 'gradient-flow 4s ease infinite',
              }}
            />

            {/* Inner Background */}
            <div className='absolute inset-[2px] rounded-2xl bg-neutral-900/95 backdrop-blur-sm' />

            {/* Hover Glow Effect */}
            <div
              className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'
              style={{
                background: 'radial-gradient(circle at center, rgba(0, 106, 170, 0.15), transparent 70%)',
              }}
            />

            {/* Content */}
            <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-4'>
              <div className='text-center md:text-left'>
                <h3 className='text-2xl md:text-3xl font-bold text-white mb-2'>
                  See The Transformation
                </h3>
                <p className='text-gray-400 text-sm md:text-base'>
                  From outdated to outstanding in 72 hours
                </p>
              </div>

              {/* Before/After Button Indicator */}
              <div className='flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors'>
                <span className='text-gray-400 text-sm font-medium'>Before</span>
                <ArrowLeftRight className='w-5 h-5 text-white' />
                <span className='text-gray-400 text-sm font-medium'>After</span>
              </div>
            </div>
          </motion.button>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='fixed inset-0 bg-black/90 backdrop-blur-sm z-50'
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className='fixed inset-4 md:inset-8 lg:inset-12 z-50 flex flex-col'
            >
              {/* Close Button */}
              <div className='flex justify-end mb-4'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors'
                >
                  <X className='w-6 h-6 text-white' />
                </button>
              </div>

              {/* Header */}
              <div className='text-center mb-6'>
                <h2 className='text-3xl md:text-5xl font-bold text-white mb-2'>
                  See The Transformation
                </h2>
                <p className='text-lg text-gray-400'>
                  From outdated to outstanding in 72 hours
                </p>
              </div>

              {/* Comparison Slider */}
              <div className='flex-1 flex items-center justify-center'>
                <div className='w-full max-w-6xl'>
                  <div className='relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-neutral-700'>
                    <ImageComparisonSlider
                      leftImage='/before.png'
                      rightImage='/after.png'
                      altLeft='Before: Static Website'
                      altRight='After: Smart Website'
                      initialPosition={50}
                    />
                  </div>

                  {/* Instructions */}
                  <p className='text-center text-gray-400 mt-4 text-sm'>
                    ← Drag the slider to compare →
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

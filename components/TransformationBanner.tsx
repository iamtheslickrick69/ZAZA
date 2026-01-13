'use client';

import { motion } from 'framer-motion';
import { ImageComparisonSlider } from '@/components/ui/image-comparison-slider-horizontal';

export function TransformationBanner() {
  return (
    <section className='relative py-20 px-6 bg-black overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute inset-0' style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h2 className='text-5xl md:text-6xl font-bold text-white mb-4'>
            See The Transformation
          </h2>
          <p className='text-xl text-gray-400'>
            From outdated to outstanding in 72 hours
          </p>
        </motion.div>

        {/* Image Comparison Slider - Directly Visible */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='w-full max-w-6xl mx-auto'
        >
          <div className='relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-neutral-800'>
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
        </motion.div>
      </div>
    </section>
  );
}

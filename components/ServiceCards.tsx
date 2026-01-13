'use client';

import { motion } from 'framer-motion';
import { PixelCanvas } from '@/components/ui/pixel-canvas';

const services = [
  {
    id: 1,
    title: 'Design Systems',
    description: 'Scalable component libraries that grow with your brand',
    dotColor: 'bg-[#006AAA]',
    pixelColors: ['#1a3a4a', '#006AAA', '#004466'],
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'High-performance sites built with modern technology',
    dotColor: 'bg-[#C00008]',
    pixelColors: ['#4a1a1a', '#C00008', '#660004'],
  },
  {
    id: 3,
    title: 'Brand Identity',
    description: 'Visual systems that make your brand unforgettable',
    dotColor: 'bg-gradient-to-r from-[#006AAA] to-[#C00008]',
    pixelColors: ['#1a3a4a', '#006AAA', '#C00008', '#4a1a1a'],
  },
];

export function ServiceCards() {
  return (
    <section className='py-16 px-6 bg-black'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group'
            >
              {/* Card */}
              <div className='relative p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800/50 hover:border-neutral-700 transition-all duration-300 h-full backdrop-blur-sm overflow-hidden'>
                {/* Pixel Canvas Effect */}
                <PixelCanvas
                  gap={8}
                  speed={30}
                  colors={service.pixelColors}
                  variant="icon"
                  noFocus
                />

                {/* Small Dot */}
                <div className='relative z-10 mb-6 flex items-center justify-center'>
                  <div
                    className={`w-3 h-3 rounded-full ${service.dotColor}`}
                  />
                </div>

                {/* Content */}
                <div className='relative z-10 text-center'>
                  <h3 className='text-xl font-semibold text-white mb-3'>
                    {service.title}
                  </h3>
                  <p className='text-gray-400 text-sm leading-relaxed'>
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

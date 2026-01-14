'use client';

import { motion } from 'framer-motion';
import { PixelCanvas } from '@/components/ui/pixel-canvas';

const services = [
  {
    id: 1,
    title: 'Smart Sites / AGI',
    description: 'Websites powered by artificial general intelligence that learn and adapt',
    dotColor: 'bg-[#006AAA]',
    pixelColors: ['#1a3a4a', '#006AAA', '#004466'],
  },
  {
    id: 2,
    title: 'AI Implementation',
    description: 'Custom AI solutions that automate workflows and multiply output',
    dotColor: 'bg-[#C00008]',
    pixelColors: ['#4a1a1a', '#C00008', '#660004'],
  },
  {
    id: 3,
    title: 'Mobile Apps',
    description: 'Native iOS and Android apps that users love and actually use',
    dotColor: 'bg-gradient-to-r from-[#006AAA] to-[#C00008]',
    pixelColors: ['#1a3a4a', '#006AAA', '#C00008', '#4a1a1a'],
  },
];

export function ServiceCards() {
  return (
    <div className='w-full'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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
              <div className='relative p-5 rounded-xl bg-card/80 border border-border hover:border-foreground/20 transition-all duration-300 h-full backdrop-blur-sm overflow-hidden'>
                {/* Pixel Canvas Effect */}
                <PixelCanvas
                  gap={8}
                  speed={30}
                  colors={service.pixelColors}
                  variant="icon"
                  noFocus
                />

                {/* Small Dot */}
                <div className='relative z-10 mb-4 flex items-center justify-center'>
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${service.dotColor}`}
                  />
                </div>

                {/* Content */}
                <div className='relative z-10 text-center'>
                  <h3 className='text-lg font-semibold text-foreground mb-2'>
                    {service.title}
                  </h3>
                  <p className='text-muted-foreground text-xs leading-relaxed'>
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

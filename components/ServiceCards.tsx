'use client';

import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    title: 'Design Systems',
    description: 'Scalable component libraries that grow with your brand',
    dotColor: 'bg-[#006AAA]',
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'High-performance sites built with modern technology',
    dotColor: 'bg-[#C00008]',
  },
  {
    id: 3,
    title: 'Brand Identity',
    description: 'Visual systems that make your brand unforgettable',
    dotColor: 'bg-gradient-to-r from-[#006AAA] to-[#C00008]',
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
              <div className='relative p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800/50 hover:border-neutral-700 transition-all duration-300 h-full backdrop-blur-sm'>
                {/* Small Dot */}
                <div className='mb-6 flex items-center justify-center'>
                  <div
                    className={`w-3 h-3 rounded-full ${service.dotColor}`}
                  />
                </div>

                {/* Content */}
                <div className='text-center'>
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

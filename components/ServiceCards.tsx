'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PixelCanvas } from '@/components/ui/pixel-canvas';
import { useTheme } from 'next-themes';

const services = [
  {
    id: 1,
    title: 'Smart Sites / AGI',
    description: 'Websites powered by artificial general intelligence that learn and adapt',
    dotColor: '#006AAA',
    pixelColorsLight: ['#93c5fd', '#3b82f6', '#006AAA'],
    pixelColorsDark: ['#1a3a4a', '#006AAA', '#004466'],
  },
  {
    id: 2,
    title: 'AI Implementation',
    description: 'Custom AI solutions that automate workflows and multiply output',
    dotColor: '#C00008',
    pixelColorsLight: ['#fca5a5', '#ef4444', '#C00008'],
    pixelColorsDark: ['#4a1a1a', '#C00008', '#660004'],
  },
  {
    id: 3,
    title: 'Apps That Think',
    description: 'AI-native iOS & Android apps that learn user behavior and get smarter over time',
    dotColor: 'gradient',
    pixelColorsLight: ['#93c5fd', '#006AAA', '#C00008', '#fca5a5'],
    pixelColorsDark: ['#1a3a4a', '#006AAA', '#C00008', '#4a1a1a'],
  },
];

export function ServiceCards() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  const getPixelColors = (service: typeof services[0]) => {
    if (!mounted) return service.pixelColorsLight;
    return isDark ? service.pixelColorsDark : service.pixelColorsLight;
  };

  return (
    <div className='w-full'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
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
              <div className={`relative p-6 rounded-2xl border transition-all duration-300 h-full overflow-hidden ${
                isDark
                  ? 'bg-zinc-900/80 border-white/10 hover:border-white/20'
                  : 'bg-zinc-50/80 border-zinc-200 hover:border-zinc-300 shadow-sm hover:shadow-md'
              }`}>
                {/* Pixel Canvas Effect */}
                <div className={isDark ? 'opacity-100' : 'opacity-70'}>
                  <PixelCanvas
                    gap={10}
                    speed={35}
                    colors={getPixelColors(service)}
                    variant="icon"
                    noFocus
                  />
                </div>

                {/* Dot with subtle glow */}
                <div className='relative z-10 mb-5 flex items-center justify-center'>
                  <motion.div
                    className='relative'
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Glow effect */}
                    <div
                      className='absolute inset-0 rounded-full blur-md opacity-50'
                      style={{
                        background: service.dotColor === 'gradient'
                          ? 'linear-gradient(135deg, #006AAA, #C00008)'
                          : service.dotColor
                      }}
                    />
                    {/* Dot */}
                    <div
                      className='relative w-2 h-2 rounded-full'
                      style={{
                        background: service.dotColor === 'gradient'
                          ? 'linear-gradient(135deg, #006AAA, #C00008)'
                          : service.dotColor
                      }}
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className='relative z-10 text-center'>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
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

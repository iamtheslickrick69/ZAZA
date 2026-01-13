'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);

  // Hint animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      // Wiggle animation
      x.set(45);
      setTimeout(() => x.set(55), 300);
      setTimeout(() => x.set(50), 600);
    }, 500);

    return () => clearTimeout(timer);
  }, [x]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    const clampedPosition = Math.max(0, Math.min(100, position));

    setSliderPosition(clampedPosition);
    x.set(clampedPosition);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const beforeOpacity = useTransform(x, [0, 50], [0.3, 1]);
  const afterOpacity = useTransform(x, [50, 100], [1, 0.3]);

  return (
    <div className={cn('relative w-full h-full select-none', className)}>
      {/* Container */}
      <div
        ref={containerRef}
        className='relative w-full h-full overflow-hidden rounded-2xl cursor-col-resize'
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* After Image (Background) */}
        <div className='absolute inset-0 w-full h-full'>
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            className='object-cover'
            priority
          />
          {/* After Label */}
          <motion.div
            style={{ opacity: afterOpacity }}
            className='absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-full text-sm shadow-lg'
          >
            {afterLabel}
          </motion.div>
        </div>

        {/* Before Image (Overlay with clip) */}
        <div
          className='absolute inset-0 w-full h-full'
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            className='object-cover'
            priority
          />
          {/* Before Label */}
          <motion.div
            style={{ opacity: beforeOpacity }}
            className='absolute top-4 left-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-full text-sm shadow-lg'
          >
            {beforeLabel}
          </motion.div>
        </div>

        {/* Slider Handle */}
        <motion.div
          className='absolute top-0 bottom-0 w-1 cursor-col-resize'
          style={{
            left: `${sliderPosition}%`,
            x: '-50%',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* Vertical Line */}
          <div className='absolute inset-0 bg-white shadow-2xl' />

          {/* Handle Circle */}
          <motion.div
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-gray-200'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Arrows */}
            <div className='flex items-center gap-1'>
              <svg
                className='w-4 h-4 text-gray-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
              <svg
                className='w-4 h-4 text-gray-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Instruction text */}
      <motion.p
        initial={{ opacity: 1 }}
        animate={{ opacity: isDragging ? 0 : 1 }}
        className='text-center text-sm text-gray-500 mt-4'
      >
        ← Drag to compare →
      </motion.p>
    </div>
  );
}

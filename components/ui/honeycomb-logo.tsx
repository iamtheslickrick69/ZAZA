'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function HoneycombLogo() {
  return (
    <div className="relative flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          type: "spring",
          stiffness: 80,
          damping: 12
        }}
        whileHover={{
          scale: 1.05,
          rotate: 2,
          transition: { duration: 0.3 }
        }}
        className="relative"
        style={{
          width: '300px',
          height: '300px',
        }}
      >
        <Image
          src="/anvil.png"
          alt="Haestus"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}

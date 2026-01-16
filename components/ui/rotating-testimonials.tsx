"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function RotatingTestimonials() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col items-center text-center"
      >
        {/* Quote */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-2xl md:text-3xl text-muted-foreground leading-tight whitespace-nowrap">
            "AI is the rematch between <strong className="font-semibold text-foreground">David and Goliath</strong>;"
          </p>
          <p className="text-2xl md:text-3xl text-muted-foreground leading-tight italic mt-2">
            and we're crafting slingshots.
          </p>
        </motion.div>

        {/* Author Info */}
        <motion.div
          className="mt-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {/* Avatar */}
          <div className="relative size-24 rounded-full overflow-hidden bg-muted ring-3 ring-border shadow-xl">
            <Image
              src="/slick.png"
              alt="Rocky Bunker"
              fill
              className="object-cover grayscale"
            />
          </div>

          {/* Name & Position */}
          <h5 className="mt-5 text-xl font-semibold text-foreground">
            Rocky Bunker
          </h5>
          <p className="mt-1 text-base text-muted-foreground">
            Founder
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

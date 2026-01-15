"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from "next/link";
import { PixelCanvas } from "@/components/ui/pixel-canvas";

export default function HeroSection() {
  const gradientRef = useRef<HTMLDivElement>(null);

  const transitionVariants = {
    item: {
      hidden: {
        opacity: 0,
        filter: "blur(12px)",
        y: 12,
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          type: "spring" as const,
          bounce: 0.3,
          duration: 1.5,
        },
      },
    },
  };

  useEffect(() => {
    if (!gradientRef.current) return;
    gsap.fromTo(
      gradientRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="p-6 overflow-hidden rounded-xl">
        <div className="relative w-full">
        {/* SVG Noise Filter for Grain Texture */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.80"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
              <feBlend mode="multiply" in2="SourceGraphic" />
            </filter>
          </defs>
        </svg>

        <div
            ref={gradientRef}
            className="mesh-gradient absolute inset-0 -z-10 max-h-[90vh] rounded-2xl overflow-hidden"
        >
          {/* Light mode mesh gradient - Clean Minimal White */}
          <div className="absolute inset-0 dark:hidden"
            style={{
              background: `
                radial-gradient(at 20% 30%, rgba(224, 231, 255, 0.4) 0px, transparent 50%),
                radial-gradient(at 80% 20%, rgba(253, 244, 255, 0.4) 0px, transparent 50%),
                radial-gradient(at 60% 70%, rgba(240, 249, 255, 0.4) 0px, transparent 50%),
                radial-gradient(at 10% 80%, rgba(255, 247, 237, 0.3) 0px, transparent 50%),
                linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 25%, #FDF4FF 50%, #FFF7ED 75%, #FFFFFF 100%)
              `,
              filter: 'url(#noiseFilter)'
            }}
          />
          <div className="absolute inset-0 dark:hidden"
            style={{
              background: `
                radial-gradient(at 40% 40%, rgba(224, 242, 254, 0.2) 0px, transparent 50%),
                radial-gradient(at 90% 60%, rgba(243, 232, 255, 0.2) 0px, transparent 50%),
                radial-gradient(at 30% 90%, rgba(254, 243, 199, 0.15) 0px, transparent 50%)
              `,
              mixBlendMode: 'overlay'
            }}
          />

          {/* Dark mode mesh gradient - Monochrome Dark */}
          <div className="absolute inset-0 hidden dark:block"
            style={{
              background: `
                radial-gradient(at 20% 30%, rgba(75, 85, 99, 0.15) 0px, transparent 50%),
                radial-gradient(at 80% 20%, rgba(55, 65, 81, 0.12) 0px, transparent 50%),
                radial-gradient(at 60% 70%, rgba(107, 114, 128, 0.15) 0px, transparent 50%),
                radial-gradient(at 10% 80%, rgba(75, 85, 99, 0.1) 0px, transparent 50%),
                linear-gradient(135deg, #0a0a0a 0%, #141414 25%, #1a1a1a 50%, #1f1f1f 75%, #171717 100%)
              `,
              filter: 'url(#noiseFilter)'
            }}
          />
          <div className="absolute inset-0 hidden dark:block"
            style={{
              background: `
                radial-gradient(at 40% 40%, rgba(75, 85, 99, 0.2) 0px, transparent 50%),
                radial-gradient(at 90% 60%, rgba(55, 65, 81, 0.15) 0px, transparent 50%),
                radial-gradient(at 30% 90%, rgba(107, 114, 128, 0.12) 0px, transparent 50%)
              `,
              mixBlendMode: 'overlay'
            }}
          />

          {/* Subtle grid lines with brand gradient */}
          <div className="absolute inset-0 hidden dark:block opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(107, 114, 128, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(107, 114, 128, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
          {/* Light mode grid with subtle brand colors */}
          <div className="absolute inset-0 dark:hidden opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(107, 114, 128, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(107, 114, 128, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
        </div>

        <div className="pt-32 pb-10 sm:pt-40 sm:pb-12 text-center">
            <div className="relative max-w-2xl mx-auto">
            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Base text */}
              <span className="text-foreground">
                Haestus: Design Systems for the Visionary Web
              </span>
              {/* Soft, graceful shimmer overlay */}
              <motion.span
                className="absolute inset-0 bg-clip-text text-transparent opacity-40"
                style={{
                  backgroundImage: 'linear-gradient(90deg, transparent 0%, transparent 20%, #6b7280 40%, #6b7280 60%, #6b7280 80%, transparent 100%)',
                  backgroundSize: '300% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '300% 0%'],
                }}
                transition={{
                  duration: 10,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
              >
                Haestus: Design Systems for the Visionary Web
              </motion.span>
            </motion.h1>
            <p className="mt-4 text-lg text-muted-foreground">
                The age of AI is the rematch between David and Goliath.<br />
                and we&apos;re crafting slingshots
            </p>
            <AnimatedGroup
                variants={{
                container: {
                    visible: {
                    transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                    },
                    },
                },
                ...transitionVariants,
                }}
                className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
            >
                <div key={1} className="group relative rounded-[14px]">
                  {/* Animated gradient border - ENHANCED */}
                  <motion.div
                    className="absolute -inset-[3px] rounded-[14px] z-0"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #6b7280, #6b7280, #6b7280, #6b7280, #6b7280)',
                      backgroundSize: '400% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                    }}
                    transition={{
                      duration: 4,
                      ease: 'linear',
                      repeat: Infinity,
                    }}
                  />
                  {/* Enhanced glow with pulsing */}
                  <motion.div
                    className="absolute -inset-[3px] rounded-[14px] z-0 blur-lg"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #6b7280, #6b7280, #6b7280)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      ease: 'easeInOut',
                      repeat: Infinity,
                    }}
                  />
                  <Button asChild size="lg" className="relative z-10 rounded-xl px-5 text-base bg-foreground text-background hover:bg-foreground/90 border-0 backdrop-blur-sm">
                    <span className="text-nowrap">Start Building</span>
                  </Button>
                </div>
                <div key={2} className="group relative rounded-[14px]">
                  {/* Animated gradient border - ENHANCED */}
                  <motion.div
                    className="absolute -inset-[3px] rounded-[14px] z-0"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #6b7280, #6b7280, #6b7280, #6b7280, #6b7280)',
                      backgroundSize: '400% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                    }}
                    transition={{
                      duration: 4,
                      ease: 'linear',
                      repeat: Infinity,
                    }}
                  />
                  {/* Enhanced glow with pulsing */}
                  <motion.div
                    className="absolute -inset-[3px] rounded-[14px] z-0 blur-lg"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #6b7280, #6b7280, #6b7280)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      ease: 'easeInOut',
                      repeat: Infinity,
                    }}
                  />
                  <Button
                    asChild
                    size="lg"
                    className="relative z-10 rounded-xl px-5 text-base bg-background text-foreground hover:bg-foreground hover:text-background border border-border"
                  >
                    <span className="text-nowrap">Request a demo</span>
                  </Button>
                </div>
            </AnimatedGroup>
            </div>
        </div>

        <AnimatedGroup
            variants={{
            container: {
                visible: {
                transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                },
                },
            },
            ...transitionVariants,
            }}
        >
            <div className="relative overflow-hidden px-2">
            <div
                aria-hidden
                className="bg-gradient-to-b from-background to-background absolute inset-0 z-10 from-transparent from-35%"
            />
            <div className="inset-shadow-2xs max-h-[40vh] ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-t-2xl border border-gray-50 border-b-0 p-4 shadow-lg shadow-zinc-950/15 ring-1">
                <Link href="https://ruixen.com?utm_source=21st.dev&utm_medium=hero_section_05&utm_campaign=ruixen" target="_blank">
                    <Image
                    className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                    src="https://tailark.com/_next/image?url=%2Fmail2.png&w=3840&q=75"
                    alt="app screen"
                    width={2700}
                    height={1440}
                    unoptimized
                    />
                    <Image
                    className="z-2 border-border/25 aspect-15/8 relative rounded-2xl dark:hidden"
                    src="https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75"
                    alt="app screen"
                    width={2700}
                    height={1440}
                    unoptimized
                    />
                </Link>
            </div>
            </div>
        </AnimatedGroup>
        </div>
    </div>
  );
}

type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'blur-slide'
  | 'zoom'
  | 'flip'
  | 'bounce'
  | 'rotate'
  | 'swing';

type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants: Record<
  PresetType,
  { container: Variants; item: Variants }
> = {
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(4px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
  },
  'blur-slide': {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(4px)', y: 20 },
      visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
    },
  },
  zoom: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      },
    },
  },
  flip: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, rotateX: -90 },
      visible: {
        opacity: 1,
        rotateX: 0,
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      },
    },
  },
  bounce: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: -50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 400, damping: 10 },
      },
    },
  },
  rotate: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, rotate: -180 },
      visible: {
        opacity: 1,
        rotate: 0,
        transition: { type: "spring" as const, stiffness: 200, damping: 15 },
      },
    },
  },
  swing: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, rotate: -10 },
      visible: {
        opacity: 1,
        rotate: 0,
        transition: { type: "spring" as const, stiffness: 300, damping: 8 },
      },
    },
  },
};

function AnimatedGroup({
  children,
  className,
  variants,
  preset,
}: AnimatedGroupProps) {
  const selectedVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants };
  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export { AnimatedGroup };

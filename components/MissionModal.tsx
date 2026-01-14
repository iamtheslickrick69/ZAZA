"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { SparkIcon } from "@/components/ui/spark-icon";

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  originRect?: DOMRect | null;
}

const principles = [
  {
    title: "Turns pain into mastery",
    description: "Instead of dwelling on rejection, he channeled it into becoming the best.",
  },
  {
    title: "Builds for legends",
    description: "Achilles' armor. Zeus' thunderbolts. Every hero depended on his craft.",
  },
  {
    title: "Creation outlasts power",
    description: "Lightning fades. Systems endure. The world runs on builders.",
  },
  {
    title: "Works while others posture",
    description: "While Olympus drowns in drama, he's in the forge doing the work.",
  },
];

export function MissionModal({ isOpen, onClose, originRect }: MissionModalProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const originY = originRect ? originRect.top + originRect.height / 2 : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-foreground/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-xl max-h-[90vh] pointer-events-auto"
              initial={{
                opacity: 0,
                scale: 0.9,
                y: originY ? originY - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) : -30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: -20,
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 400,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Light Card with subtle shadow */}
              <div className="relative bg-[#FAFAFA] rounded-2xl shadow-2xl overflow-hidden">
                {/* Subtle top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6b7280] via-[#6b7280] to-[#6b7280]" />

                <div className="relative p-8 md:p-10 max-h-[85vh] overflow-y-auto">

                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
                    onClick={onClose}
                  >
                    <X className="w-5 h-5 text-neutral-400 hover:text-neutral-600 transition-colors" />
                  </button>

                  {/* Content */}
                  <div className="text-center">
                    {/* Lambda Icon */}
                    <motion.div
                      className="flex justify-center mb-6"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                    >
                      <SparkIcon size={48} color="#6b7280" />
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      className="text-2xl md:text-3xl font-display text-neutral-900 mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      Leveraging AI
                    </motion.h2>

                    {/* Hephaestus Intro */}
                    <motion.p
                      className="text-neutral-600 font-body leading-relaxed mb-8 max-w-md mx-auto text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-neutral-800 font-body-medium">Hephaestus</span> was the Greek god of fire, metalworking, and craftsmanship. Thrown from Olympus, crippled, underestimated—yet he became the master craftsman of the gods.
                    </motion.p>

                    {/* 4 Principles - Clean List */}
                    <motion.div
                      className="space-y-4 mb-8 text-left"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      {principles.map((principle, idx) => (
                        <motion.div
                          key={principle.title}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#6b7280] mt-2 flex-shrink-0" />
                          <div>
                            <h4 className="text-neutral-800 font-body-semibold text-sm">
                              {principle.title}
                            </h4>
                            <p className="text-neutral-500 text-xs font-body leading-relaxed">
                              {principle.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                      className="h-px w-12 mx-auto bg-neutral-200 mb-8"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.5 }}
                    />

                    {/* Our Mission Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <p className="text-[10px] font-nav tracking-[0.2em] text-neutral-400 mb-3 uppercase">Our Mission</p>
                      <p className="text-base md:text-lg text-neutral-700 font-display-light mb-1">
                        The age of AI is the rematch between David and Goliath.
                      </p>
                      <p className="text-lg md:text-xl text-neutral-900 font-display">
                        We&apos;re the ones making the slingshots.
                      </p>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      className="mt-8"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <a
                        href="#contact"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all hover:gap-3 hover:shadow-lg"
                        style={{
                          background: '#6b7280',
                          boxShadow: '0 4px 20px rgba(107, 114, 128, 0.25)',
                        }}
                      >
                        <span>See What We Build</span>
                        <ArrowRight size={16} />
                      </a>
                    </motion.div>

                    {/* Signature */}
                    <motion.p
                      className="mt-6 text-neutral-400 text-xs font-nav tracking-wider"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.65 }}
                    >
                      — ISR
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import MacBookKeyboard from "./macbook-keyboard";

interface VaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VAULT_CODE = "izr";

export function VaultModal({ isOpen, onClose }: VaultModalProps) {
  const router = useRouter();
  const [unlocked, setUnlocked] = React.useState(false);

  const handleCodeComplete = (code: string) => {
    if (code === VAULT_CODE) {
      setUnlocked(true);
      setTimeout(() => {
        onClose();
        router.push("/vault");
      }, 1000);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-3xl mx-4"
          >
            <div className="bg-zinc-900/95 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <Lock className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Partner Vault</h2>
                    <p className="text-xs text-zinc-400">Restricted Access</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {unlocked ? (
                    <motion.div
                      key="unlocked"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4 py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10, stiffness: 200 }}
                        className="p-4 rounded-full bg-green-500/10"
                      >
                        <ShieldCheck className="w-12 h-12 text-green-500" />
                      </motion.div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-white">Access Granted</h3>
                        <p className="text-sm text-zinc-400 mt-1">Redirecting to vault...</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="keyboard"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <MacBookKeyboard
                        onCodeComplete={handleCodeComplete}
                        correctCode={VAULT_CODE}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default VaultModal;

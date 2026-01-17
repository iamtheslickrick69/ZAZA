"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LiveClockProps {
  onMidnight?: () => void;
}

export function LiveClock({ onMidnight }: LiveClockProps) {
  const [time, setTime] = useState(new Date());
  const [prevDay, setPrevDay] = useState(new Date().getDate());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date();
      const newDay = newTime.getDate();

      // Check if day changed (midnight transition)
      if (newDay !== prevDay) {
        setPrevDay(newDay);
        if (onMidnight) {
          onMidnight();
        }
      }

      setTime(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [prevDay, onMidnight]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={time.toISOString()}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-2xl font-semibold text-foreground tracking-wider"
        >
          {formatTime(time)}
        </motion.div>
      </AnimatePresence>
      <div className="font-body text-sm text-muted-foreground">
        {formatDate(time)}
      </div>
    </div>
  );
}

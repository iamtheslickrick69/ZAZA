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
    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-wide">
      <span>{formatDate(time)}</span>
      <span className="text-muted-foreground/50">·</span>
      <span>{formatTime(time)}</span>
    </div>
  );
}

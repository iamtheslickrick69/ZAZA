"use client";

import { useState, useEffect } from "react";
import dailyContentData from "@/data/daily-content.json";

interface Quote {
  date: string;
  text: string;
  author: string;
  authorImage: string;
}

interface Song {
  date: string;
  title: string;
  artist: string;
  albumCover: string;
  spotifyEmbed: string;
}

interface DailyContent {
  quote: Quote | null;
  song: Song | null;
}

export function useDailyContent() {
  const [content, setContent] = useState<DailyContent>({
    quote: null,
    song: null,
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const loadTodayContent = () => {
    const todayString = getTodayString();

    const todayQuote = dailyContentData.quotes.find(
      (q) => q.date === todayString
    );
    const todaySong = dailyContentData.songs.find(
      (s) => s.date === todayString
    );

    // Fallback to first item if today's date not found
    setContent({
      quote: todayQuote || dailyContentData.quotes[0],
      song: todaySong || dailyContentData.songs[0],
    });
  };

  const handleMidnightTransition = () => {
    setIsTransitioning(true);

    // Wait for exit animation
    setTimeout(() => {
      loadTodayContent();

      // Wait for enter animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 500);
  };

  useEffect(() => {
    loadTodayContent();
  }, []);

  return {
    content,
    isTransitioning,
    handleMidnightTransition,
  };
}

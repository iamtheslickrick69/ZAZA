"use client";

import { useState, useEffect } from "react";

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
}

interface DailyContent {
  quote: Quote | null;
  song: Song | null;
}

// Schedule data structure
interface ScheduleDay {
  dayOfWeek: number;
  dayName: string;
  song: {
    title: string;
    artist: string;
    album: string;
    albumCover: string;
  };
  quote: {
    text: string;
    author: string;
    authorImage: string;
  };
}

interface ScheduleData {
  timezone: string;
  generatedAt: string;
  schedule: ScheduleDay[];
}

// Get current day of week in MST (America/Denver)
function getDayOfWeekInMST(): number {
  const now = new Date();
  const mstFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    weekday: "short",
  });
  const dayStr = mstFormatter.format(now);

  const dayMap: Record<string, number> = {
    "Sun": 0,
    "Mon": 1,
    "Tue": 2,
    "Wed": 3,
    "Thu": 4,
    "Fri": 5,
    "Sat": 6,
  };

  return dayMap[dayStr] ?? 0;
}

export function useDailyContent() {
  const [content, setContent] = useState<DailyContent>({
    quote: null,
    song: null,
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const loadTodayContent = async () => {
    try {
      // Fetch the weekly schedule
      const response = await fetch('/isr-of-the-day/schedule.json');
      const data: ScheduleData = await response.json();

      // Get current day of week in MST
      const dayOfWeek = getDayOfWeekInMST();

      // Find today's content
      const todayContent = data.schedule.find(day => day.dayOfWeek === dayOfWeek);

      if (todayContent) {
        const dateStr = new Date().toISOString().split('T')[0];

        setContent({
          song: {
            date: dateStr,
            title: todayContent.song.title,
            artist: todayContent.song.artist,
            albumCover: `/isr-of-the-day/${todayContent.song.albumCover}`,
          },
          quote: {
            date: dateStr,
            text: todayContent.quote.text,
            author: todayContent.quote.author,
            authorImage: `/isr-of-the-day/${todayContent.quote.authorImage}`,
          },
        });
      }
    } catch (error) {
      console.error('Failed to load ISR-of-the-Day content:', error);
      // Set fallback content
      setContent({
        song: {
          date: new Date().toISOString().split('T')[0],
          title: "Loading...",
          artist: "Please wait",
          albumCover: "",
        },
        quote: {
          date: new Date().toISOString().split('T')[0],
          text: "Loading...",
          author: "Please wait",
          authorImage: "",
        },
      });
    }
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

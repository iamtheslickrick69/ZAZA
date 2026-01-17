"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SparklesCore } from "@/components/ui/sparkles";
import { Rocket, Eye, Layers, Zap, Target, Calendar, Shield, TrendingUp, Quote, Music } from "lucide-react";
import { PixelCanvas } from "@/components/ui/pixel-canvas";
import { useState, useEffect, useRef, useCallback } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LiveClock } from "@/components/ui/live-clock";
import { useDailyContent } from "@/hooks/use-daily-content";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

export function HeroBranding() {
  const subtitleText = "AND WE'RE CRAFTING SLINGSHOTS.";
  const [displayText, setDisplayText] = useState(subtitleText);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const frameRef = useRef(0);
  const hasAnimated = useRef(false);

  // Daily content hook
  const { content, isTransitioning, handleMidnightTransition } = useDailyContent();

  // Tab state for Song/Quote toggle
  const [activeTab, setActiveTab] = useState<"song" | "quote">("song");

  const scramble = useCallback(() => {
    setIsScrambling(true);
    frameRef.current = 0;
    const duration = subtitleText.length * 3;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      frameRef.current++;

      const progress = frameRef.current / duration;
      const revealedLength = Math.floor(progress * subtitleText.length);

      const newText = subtitleText
        .split("")
        .map((char, i) => {
          if (char === " " || char === "'") return char;
          if (i < revealedLength) return subtitleText[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(newText);

      if (frameRef.current >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(subtitleText);
        setIsScrambling(false);
      }
    }, 30);
  }, [subtitleText]);

  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      const timer = setTimeout(() => {
        scramble();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [scramble]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  const handleBookCall = async () => {
    const cal = await getCalApi();
    cal("modal", {
      calLink: "rocky-bunker-n2hayf/15min",
      config: {
        layout: "month_view",
        theme: "dark"
      }
    });
  };

  return (
    <section className="relative pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Live Clock - Top Right */}
        <div className="absolute top-8 right-8">
          <LiveClock onMidnight={handleMidnightTransition} />
        </div>

        {/* LAYER 1: Logo + Sparkles (Centered) */}
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Logo */}
          <motion.a
            href="/"
            className="block mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              src="/haestus1.png"
              alt="HAESTUS"
              width={380}
              height={56}
              priority
              className="brightness-0 invert"
            />
          </motion.a>

          {/* Sparkles */}
          <div className="relative w-96 h-10">
            <SparklesCore
              id="hero-sparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1.2}
              particleDensity={60}
              className="w-full h-full"
              particleColor="#FFFFFF"
              speed={0.4}
            />
          </div>
        </motion.div>

        {/* LAYER 2: Title + Subtitle (Side by Side with Vertical Divider) */}
        <motion.div
          className="relative flex items-center justify-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 items-center w-full max-w-7xl">
            {/* LEFT SIDE */}
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground leading-tight mb-6 max-w-3xl">
                AI is the rematch between{" "}
                <span className="font-body-semibold">David and Goliath</span>.
              </h1>

              {/* Scramble Subtitle */}
              <div className="flex flex-col items-center">
                <p className="font-mono text-lg md:text-xl tracking-widest">
                  {displayText.split("").map((char, i) => (
                    <span
                      key={i}
                      className={`inline-block transition-all duration-150 ${
                        isScrambling && char !== subtitleText[i]
                          ? "text-amber-500 scale-110"
                          : "text-muted-foreground"
                      }`}
                      style={{ transitionDelay: `${i * 10}ms` }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            {/* CENTER: Vertical Divider */}
            <motion.div
              className="hidden lg:flex flex-col items-center h-64"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
            </motion.div>

            {/* RIGHT SIDE - Daily Content with Tabs */}
            <div className="flex flex-col items-center gap-6 w-full max-w-md">
              {/* Tab Buttons */}
              <div className="flex gap-2 p-1.5 bg-muted/30 rounded-xl border border-border/50">
                <motion.button
                  onClick={() => setActiveTab("song")}
                  className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === "song"
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: activeTab === "song" ? 1 : 1,
                    backgroundColor: activeTab === "song" ? "rgb(14 165 233)" : "transparent",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  Song of the Day
                </motion.button>
                <motion.button
                  onClick={() => setActiveTab("quote")}
                  className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === "quote"
                      ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: activeTab === "quote" ? 1 : 1,
                    backgroundColor: activeTab === "quote" ? "rgb(245 158 11)" : "transparent",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  Quote
                </motion.button>
              </div>

              {/* Single Item Card - Content switches based on active tab */}
              <div className="w-full">
                <AnimatePresence mode="wait">
                  {!isTransitioning && activeTab === "song" && content.song && (
                    <motion.div
                      key={`song-${content.song.date}`}
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        borderColor: "rgba(14, 165, 233, 0.3)"
                      }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      whileHover={{
                        scale: 1.02,
                        borderColor: "rgba(14, 165, 233, 0.5)",
                        boxShadow: "0 20px 25px -5px rgba(14, 165, 233, 0.2), 0 8px 10px -6px rgba(14, 165, 233, 0.2)"
                      }}
                      className="relative rounded-lg border-2 border-sky-500/30 bg-card p-6 shadow-lg shadow-sky-500/10"
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-sky-500/10 border border-sky-500/30 flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {content.song.albumCover ? (
                            <Image
                              src={content.song.albumCover}
                              alt={content.song.title}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          ) : (
                            <Music className="h-6 w-6 text-sky-500" />
                          )}
                        </motion.div>
                        <div className="flex flex-1 flex-col gap-1.5">
                          <h3 className="text-lg font-semibold leading-none tracking-tight text-sky-500">
                            Song
                          </h3>
                          <p className="text-base text-foreground font-medium">
                            {content.song.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {content.song.artist}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {!isTransitioning && activeTab === "quote" && content.quote && (
                    <motion.div
                      key={`quote-${content.quote.date}`}
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        borderColor: "rgba(245, 158, 11, 0.3)"
                      }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      whileHover={{
                        scale: 1.02,
                        borderColor: "rgba(245, 158, 11, 0.5)",
                        boxShadow: "0 20px 25px -5px rgba(245, 158, 11, 0.2), 0 8px 10px -6px rgba(245, 158, 11, 0.2)"
                      }}
                      className="relative rounded-lg border-2 border-amber-500/30 bg-card p-6 shadow-lg shadow-amber-500/10"
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Avatar className="h-16 w-16 shrink-0 border-2 border-amber-500/30 bg-amber-500/10">
                            <AvatarImage src={content.quote.authorImage} alt={content.quote.author} />
                            <AvatarFallback className="bg-amber-500/10">
                              <Quote className="h-6 w-6 text-amber-500" />
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>
                        <div className="flex flex-1 flex-col gap-1.5">
                          <h3 className="text-lg font-semibold leading-none tracking-tight text-amber-500">
                            Quote
                          </h3>
                          <p className="text-base text-foreground font-medium italic">
                            &ldquo;{content.quote.text}&rdquo;
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            — {content.quote.author}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* LAYER 3: Subtle Divider */}
        <motion.div
          className="flex justify-center mb-20"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>

        {/* LAYER 4: Three Service Cards (Left-aligned design) */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-5xl">
            {/* Card 1 - Smart Sites (Cyan) */}
            <div className="group relative overflow-hidden p-8 md:border-r border-border">
              <PixelCanvas
                gap={10}
                speed={25}
                colors={["#0ea5e9", "#7dd3fc", "#0ea5e9"]}
                variant="default"
              />
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-sky-500/20">
                  <Layers className="w-5 h-5 text-sky-500" strokeWidth={1.5} />
                </div>
                {/* Title with accent line */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-6 bg-sky-500 rounded-full" />
                  <h3 className="text-xl font-body-semibold text-foreground">Smart Sites</h3>
                </div>
                {/* Description */}
                <p className="text-sm text-muted-foreground font-body leading-relaxed pl-4">
                  Your site shouldn&apos;t be a PDF<br />— it should think, respond, and sell
                </p>
              </div>
            </div>

            {/* Card 2 - AI Agents (White) */}
            <div className="group relative overflow-hidden p-8 md:border-r border-border">
              <PixelCanvas
                gap={10}
                speed={25}
                colors={["#e2e8f0", "#f1f5f9", "#ffffff"]}
                variant="default"
              />
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                  <Zap className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                {/* Title with accent line */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-6 bg-white rounded-full" />
                  <h3 className="text-xl font-body-semibold text-foreground">AI Agents</h3>
                </div>
                {/* Description */}
                <p className="text-sm text-muted-foreground font-body leading-relaxed pl-4">
                  Custom-built AI that actually moves the needle — not hype, not demos
                </p>
              </div>
            </div>

            {/* Card 3 - AEO (Orange) */}
            <div className="group relative overflow-hidden p-8">
              <PixelCanvas
                gap={10}
                speed={25}
                colors={["#D97706", "#F59E0B", "#D97706"]}
                variant="default"
              />
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-amber-600/10 border border-amber-600/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-600/20">
                  <Target className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
                </div>
                {/* Title with accent line */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-6 bg-amber-600 rounded-full" />
                  <h3 className="text-xl font-body-semibold text-foreground">AEO</h3>
                </div>
                {/* Description */}
                <p className="text-sm text-muted-foreground font-body leading-relaxed pl-4">
                  Don&apos;t get left behind — make sure AI search engines put you above your competition
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* LAYER 5: Two CTAs (Centered) */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Primary CTA - Book a call */}
          <motion.button
            onClick={handleBookCall}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all overflow-hidden bg-foreground text-background"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar className="w-5 h-5" strokeWidth={1.5} />
            <span>Book a call</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-base transition-all overflow-hidden bg-background text-foreground border-2 border-border hover:border-foreground/30"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye className="w-5 h-5" strokeWidth={1.5} />
            <span>Recent Projects</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}

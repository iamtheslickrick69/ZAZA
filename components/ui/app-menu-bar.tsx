"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Boxes,
  Code,
  Palette,
  Eye,
  FileText,
  MessageSquare,
  Target,
  Rocket,
  Trophy,
  Mail,
  Calendar,
  Sun,
  Moon,
} from "lucide-react";

export default function AppMenuBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = theme === "dark";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Frosted Glass Nav Container */}
      <motion.nav
        className={`flex items-center gap-2 px-2 py-2 rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border border-border shadow-2xl"
            : "bg-foreground/5 backdrop-blur-md border border-border/50"
        }`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Navigation Menu */}
        <Menubar className="bg-transparent border-0 hidden md:flex gap-0">
          {/* Services Menu */}
          <MenubarMenu>
            <MenubarTrigger className="flex items-center gap-2 px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-xl data-[state=open]:text-foreground data-[state=open]:bg-foreground/10 cursor-pointer transition-all">
              <Boxes className="w-4 h-4" />
              Services
            </MenubarTrigger>
            <MenubarContent className="w-56 bg-background/95 backdrop-blur-md border-border mt-2">
              <MenubarItem className="flex items-center gap-2 text-foreground hover:bg-foreground/10 cursor-pointer">
                <Boxes className="w-4 h-4 text-[#006AAA]" />
                Design Systems
              </MenubarItem>
              <MenubarItem className="flex items-center gap-2 text-foreground hover:bg-foreground/10 cursor-pointer">
                <Code className="w-4 h-4 text-[#C00008]" />
                Web Development
              </MenubarItem>
              <MenubarItem className="flex items-center gap-2 text-foreground hover:bg-foreground/10 cursor-pointer">
                <Palette className="w-4 h-4 text-[#7C3AED]" />
                Brand Identity
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/* Work Menu */}
          <MenubarMenu>
            <MenubarTrigger className="flex items-center gap-2 px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-xl data-[state=open]:text-foreground data-[state=open]:bg-foreground/10 cursor-pointer transition-all">
              <Eye className="w-4 h-4" />
              Work
            </MenubarTrigger>
            <MenubarContent className="w-56 bg-background/95 backdrop-blur-md border-border mt-2">
              <MenubarItem className="flex items-center gap-2 text-foreground hover:bg-foreground/10 cursor-pointer">
                <Eye className="w-4 h-4" />
                Portfolio
              </MenubarItem>
              <MenubarItem className="flex items-center gap-2 text-foreground hover:bg-foreground/10 cursor-pointer">
                <FileText className="w-4 h-4" />
                Case Studies
              </MenubarItem>
              <MenubarItem className="flex items-center gap-2 text-foreground hover:bg-foreground/10 cursor-pointer">
                <MessageSquare className="w-4 h-4" />
                Testimonials
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/* Process Menu */}
          <MenubarMenu>
            <MenubarTrigger className="flex items-center gap-2 px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-xl data-[state=open]:text-foreground data-[state=open]:bg-foreground/10 cursor-pointer transition-all">
              <Target className="w-4 h-4" />
              Process
            </MenubarTrigger>
            <MenubarContent className="w-56 bg-background/95 backdrop-blur-md border-border mt-2">
              <MenubarItem className="flex items-center gap-2 text-foreground hover:bg-foreground/10 cursor-pointer">
                <Target className="w-4 h-4" />
                Strategy
              </MenubarItem>
              <MenubarItem className="flex items-center gap-2 text-foreground hover:bg-foreground/10 cursor-pointer">
                <Palette className="w-4 h-4" />
                Design
              </MenubarItem>
              <MenubarItem className="flex items-center gap-2 text-foreground hover:bg-foreground/10 cursor-pointer">
                <Rocket className="w-4 h-4" />
                Deploy
              </MenubarItem>
              <MenubarSeparator className="bg-border" />
              <MenubarItem className="flex items-center gap-2 text-foreground hover:bg-foreground/10 cursor-pointer">
                <Trophy className="w-4 h-4 text-[#006AAA]" />
                Win Together
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/* Contact Menu */}
          <MenubarMenu>
            <MenubarTrigger className="flex items-center gap-2 px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-xl data-[state=open]:text-foreground data-[state=open]:bg-foreground/10 cursor-pointer transition-all">
              <Mail className="w-4 h-4" />
              Contact
            </MenubarTrigger>
            <MenubarContent className="w-56 bg-background/95 backdrop-blur-md border-border mt-2">
              <MenubarItem className="flex items-center gap-2 text-foreground hover:bg-foreground/10 cursor-pointer">
                <Calendar className="w-4 h-4" />
                Book a Call
              </MenubarItem>
              <MenubarItem className="flex items-center gap-2 text-foreground hover:bg-foreground/10 cursor-pointer">
                <Mail className="w-4 h-4" />
                hello@haestus.com
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-border mx-1" />

        {/* Theme Toggle Button */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-xl hover:bg-foreground/10 transition-all duration-300"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-5 h-5 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-5 h-5 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}

        {/* Divider */}
        <div className="w-px h-6 bg-border mx-1" />

        {/* CTA Button */}
        <button
          className="px-5 py-2 text-sm font-medium rounded-2xl bg-foreground text-background hover:bg-foreground/90 transition-all"
        >
          Start Project
        </button>
      </motion.nav>
    </motion.header>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Twitter, Linkedin, Instagram, Github, Mail, MapPin } from "lucide-react";

interface FooterProps {
  logo?: React.ReactNode;
  brandName?: string;
  email?: string;
  location?: string;
  socialLinks?: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  mainLinks?: Array<{
    href: string;
    label: string;
  }>;
  legalLinks?: Array<{
    href: string;
    label: string;
  }>;
}

export function Footer({
  logo,
  brandName = "HAESTUS",
  email = "hello@haestus.dev",
  location,
  socialLinks = [
    {
      icon: <Twitter className="h-4 w-4" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Linkedin className="h-4 w-4" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <Instagram className="h-4 w-4" />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <Github className="h-4 w-4" />,
      href: "https://github.com",
      label: "GitHub",
    },
  ],
  mainLinks = [
    { href: "#home", label: "Home" },
    { href: "#showcase", label: "Features" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ],
  legalLinks = [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
}: FooterProps) {
  const handleAskSlick = () => {
    window.dispatchEvent(new CustomEvent("openChatWidget"));
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Glassmorphic radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.05) 0%, transparent 50%)",
        }}
      />

      {/* Single unified content section */}
      <div className="relative backdrop-blur-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          {/* Main grid layout - everything in one cohesive section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

            {/* Left: Logo + Description + Contact */}
            <div className="md:col-span-4 space-y-4">
              {/* Logo */}
              <a href="/" className="block w-max">
                {logo || (
                  <Image
                    src="/haestus1.png"
                    alt={brandName}
                    width={160}
                    height={23}
                    className="brightness-0 invert"
                  />
                )}
              </a>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                AI-powered websites that work while you sleep. We craft Smart Sites that think, respond, and convert 24/7.
              </p>

              {/* Contact info */}
              <div className="space-y-2 text-sm">
                <a href={`mailto:${email}`} className="flex items-center gap-2 text-muted-foreground hover:text-sky-400 transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>{email}</span>
                </a>
                {location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Middle: Navigation + Ask Slick CTA */}
            <div className="md:col-span-5 space-y-6">
              {/* Ask Slick CTA - prominent placement */}
              <button
                onClick={handleAskSlick}
                className="group flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-all"
              >
                <Image
                  src="/slickai.png"
                  alt="Slick AI"
                  width={24}
                  height={24}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-medium">Quick question? Ask Slick</span>
                <span className="transition-transform group-hover:translate-x-1 duration-300">
                  →
                </span>
              </button>

              {/* Main navigation */}
              <nav>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {mainLinks.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-sm text-foreground/80 hover:text-sky-400 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Legal links */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {legalLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Social + Copyright */}
            <div className="md:col-span-3 flex flex-col justify-between gap-6">
              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.map((link, i) => (
                  <Button
                    key={i}
                    variant="secondary"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:bg-sky-500/10 hover:border-sky-500/30 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all duration-300"
                    asChild
                  >
                    <a href={link.href} target="_blank" aria-label={link.label}>
                      {link.icon}
                    </a>
                  </Button>
                ))}
              </div>

              {/* Copyright - compact */}
              <div className="text-xs text-muted-foreground">
                <div>© 2026 Haestus</div>
                <div>All rights reserved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

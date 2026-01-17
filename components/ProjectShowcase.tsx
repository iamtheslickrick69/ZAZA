"use client";

import MusicPortfolio from "@/components/ui/music-portfolio";

const haestusProjects = [
  {
    id: 1,
    artist: "TEAM PAYPRO",
    album: "PAYMENT SOLUTIONS",
    category: "WEB APP",
    label: "FINANCE",
    year: "2024",
    image: "/projects/paypro.png",
  },
  {
    id: 2,
    artist: "MAW",
    album: "MARKETING & DESIGN",
    category: "BRANDING",
    label: "MARKETING",
    year: "2025",
    image: "/wake2.png",
  },
  {
    id: 3,
    artist: "BEEHIVE RENTALS",
    album: "EQUIPMENT RENTALS",
    category: "WEB DEV",
    label: "RENTALS",
    year: "2026",
    image: "/beehive.png",
  },
  {
    id: 4,
    artist: "RAIN ROOFING",
    album: "ROOFING COMPANY",
    category: "WEB DEV",
    label: "CONSTRUCTION",
    year: "2026",
    image: "/rain.png",
  },
  {
    id: 5,
    artist: "LOOPSYNC",
    album: "AI SAAS",
    category: "WEB APP",
    label: "TECHNOLOGY",
    year: "2026",
    image: "/loop.png",
  },
];

const config = {
  timeZone: "America/Denver",
  timeUpdateInterval: 1000,
  idleDelay: 4000,
  debounceDelay: 100
};

const socialLinks = {
  spotify: "https://open.spotify.com",
  email: "mailto:hello@haestus.com",
  x: "https://x.com/haestus"
};

const location = {
  latitude: "34.0522° N",
  longitude: "118.2437° W",
  display: false
};

interface ProjectShowcaseProps {
  onPreviewModeChange?: (isPreview: boolean) => void;
}

export function ProjectShowcase({ onPreviewModeChange }: ProjectShowcaseProps) {
  return (
    <section id="projects">
      <MusicPortfolio
        PROJECTS_DATA={haestusProjects}
        CONFIG={config}
        SOCIAL_LINKS={socialLinks}
        LOCATION={location}
        onPreviewModeChange={onPreviewModeChange}
      />
    </section>
  );
}

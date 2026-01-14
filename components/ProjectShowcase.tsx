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
    artist: "PULSE FINANCE",
    album: "WEB APPLICATION",
    category: "WEB DEV",
    label: "FINTECH",
    year: "2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  },
  {
    id: 3,
    artist: "VERTEX GAMING",
    album: "DESIGN SYSTEM & UI KIT",
    category: "DESIGN SYSTEM",
    label: "ENTERTAINMENT",
    year: "2024",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
  },
  {
    id: 4,
    artist: "NOVA HEALTH",
    album: "MOBILE APP INTERFACE",
    category: "PRODUCT",
    label: "HEALTHCARE",
    year: "2023",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
  },
  {
    id: 5,
    artist: "CIPHER SECURITY",
    album: "DASHBOARD & ANALYTICS",
    category: "WEB DEV",
    label: "CYBERSECURITY",
    year: "2023",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
  },
  {
    id: 6,
    artist: "ECHO RECORDS",
    album: "E-COMMERCE PLATFORM",
    category: "WEB DEV",
    label: "MUSIC INDUSTRY",
    year: "2023",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
  },
];

const config = {
  timeZone: "America/Los_Angeles",
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
  display: true
};

export function ProjectShowcase() {
  return (
    <section id="projects">
      <MusicPortfolio
        PROJECTS_DATA={haestusProjects}
        CONFIG={config}
        SOCIAL_LINKS={socialLinks}
        LOCATION={location}
      />
    </section>
  );
}

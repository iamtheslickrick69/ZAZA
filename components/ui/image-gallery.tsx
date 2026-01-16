"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface BlogPost {
  image: string;
  title: string;
}

interface ImageGalleryProps {
  posts?: BlogPost[];
}

export default function ImageGallery({ posts }: ImageGalleryProps) {
  const defaultPosts: BlogPost[] = [
    {
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&h=800&auto=format&fit=crop",
      title: "The Future of AEO",
    },
    {
      image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=800&h=800&auto=format&fit=crop",
      title: "Smart Sites Revolution",
    },
    {
      image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=800&h=800&auto=format&fit=crop",
      title: "AI Agents in 2026",
    },
    {
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=800&h=800&auto=format&fit=crop",
      title: "Why Your Business Needs AI",
    },
    {
      image: "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=800&h=800&auto=format&fit=crop",
      title: "From SEO to AEO",
    },
    {
      image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=800&h=800&auto=format&fit=crop",
      title: "Building Digital Employees",
    },
  ];

  const galleryPosts = posts || defaultPosts;

  return (
    <section className="w-full flex flex-col items-center justify-start py-12">
      {/* Gallery */}
      <div className="flex items-center gap-2 h-[400px] w-full max-w-5xl px-4">
        {galleryPosts.map((post, idx) => (
          <div
            key={idx}
            className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full cursor-pointer"
          >
            {/* Background Image */}
            <img
              className="h-full w-full object-cover object-center"
              src={post.image}
              alt={post.title}
            />

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Coming Soon Badge - Top Right - Hover Only with Liquid Glass */}
            <div className="absolute top-4 right-4 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-95 group-hover:scale-100"
              style={{
                background: 'rgba(14, 165, 233, 0.2)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(14, 165, 233, 0.3)',
                boxShadow: '0 8px 32px 0 rgba(14, 165, 233, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              <span className="text-sky-100 text-xs font-medium uppercase tracking-wider">Coming Soon</span>
            </div>

            {/* Blog Title - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-white font-display text-xl md:text-2xl leading-tight">
                {post.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

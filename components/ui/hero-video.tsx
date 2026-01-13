"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in immediately
    setOpacity(1);

    const video = videoRef.current;
    if (!video) return;

    // Set playback speed to 0.4
    video.playbackRate = 0.4;
  }, []);

  return (
    <div
      className="relative w-full aspect-video overflow-hidden bg-black transition-opacity duration-1000"
      style={{ opacity }}
    >
      <video
        ref={videoRef}
        src="https://pub-7824dae2ffd24193b52760c54972be1d.r2.dev/0011cubes.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

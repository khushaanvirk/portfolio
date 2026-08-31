"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { ProjectContent } from "@/content/projects/types";

interface Props {
  hero: ProjectContent["hero"];
}

/**
 * Hero video with a sound toggle. Browsers only autoplay muted, so the video
 * starts muted and the button is the user gesture that unmutes it.
 */
export default function HeroVideo({ hero }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    // Autoplay may have been blocked entirely; unmuting is a gesture, so this
    // is the first moment playback is allowed to start.
    if (video.paused) video.play().catch(() => {});
  }

  return (
    <div className="relative flex justify-center bg-black">
      <video
        ref={videoRef}
        src={hero.src}
        poster={hero.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={cn(
          "object-contain bg-black print:hidden",
          hero.orientation === "portrait"
            ? "h-[560px] max-h-[75vh] w-auto max-w-full"
            : "w-full max-h-[500px]"
        )}
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-[#1F1F1F] bg-[#0A0A0A]/80 px-3 py-1.5 text-xs text-[#A3A3A3] backdrop-blur-sm transition-colors hover:border-[#404040] hover:text-[#F5F5F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] print:hidden"
      >
        <SpeakerIcon muted={muted} />
        {muted ? "Sound" : "Mute"}
      </button>
    </div>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 5 6 9H3v6h3l5 4z" />
      {muted ? (
        <>
          <path d="m16 9 5 6" />
          <path d="m21 9-5 6" />
        </>
      ) : (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 6a9 9 0 0 1 0 12" />
        </>
      )}
    </svg>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  onAudioReady?: () => void;
}

export default function AudioPlayer({ onAudioReady }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          if (onAudioReady) onAudioReady();
        })
        .catch((error) => {
          console.log("Audio play error:", error);
        });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/audio/soundtrack.m4a" type="audio/mp4" />
        <source src="/audio/soundtrack.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {!isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <button
            onClick={startAudio}
            className="px-8 py-4 text-white bg-red-600 hover:bg-red-700 transition-colors rounded-lg border-2 border-red-500 hover:border-red-400 text-xl font-pixel"
            style={{ fontFamily: "var(--font-press-start), monospace" }}
          >
            START
          </button>
        </div>
      )}

      {isPlaying && (
        <button
          onClick={toggleMute}
          className="fixed top-6 right-6 z-50 text-white hover:text-red-500 transition-colors p-2 bg-black bg-opacity-50 rounded-lg border border-white border-opacity-20 hover:border-red-500"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            // Muted icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          ) : (
            // Unmuted icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          )}
        </button>
      )}
    </>
  );
}

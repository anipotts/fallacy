"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TypeWriter from "./TypeWriter";

interface Slide {
  image: string;
  text: string;
}

interface SlideshowProps {
  slides: Slide[];
  onComplete: () => void;
}

export default function Slideshow({ slides, onComplete }: SlideshowProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(false);
  const [key, setKey] = useState(0); // Force re-render of TypeWriter

  const SLIDE_DURATION = 6200; // 6.2 seconds per slide in ms
  const FADE_IN_DELAY = 500;
  const FADE_OUT_START = 5200; // Start fade out at 5.2s (1s before end)
  const TEXT_START_DELAY = 700; // Start typing after 0.7s

  useEffect(() => {
    // Start first slide
    const startSlide = () => {
      setIsVisible(true);

      // Start text typing
      setTimeout(() => {
        setShowText(true);
      }, TEXT_START_DELAY);

      // Start fade out
      setTimeout(() => {
        setIsVisible(false);
        setShowText(false);
      }, FADE_OUT_START);

      // Move to next slide or complete
      setTimeout(() => {
        if (currentSlideIndex < slides.length - 1) {
          setCurrentSlideIndex((prev) => prev + 1);
          setKey((prev) => prev + 1); // Force TypeWriter reset
        } else {
          onComplete();
        }
      }, SLIDE_DURATION);
    };

    startSlide();
  }, [currentSlideIndex, slides.length, onComplete]);

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div
        className={`flex flex-col items-center justify-center gap-6 transition-opacity duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ maxWidth: "90vw" }}
      >
        {/* Image - Hidden for now */}
        <div className="relative w-full max-w-2xl hidden aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <Image
            src={currentSlide.image}
            alt={`Slide ${currentSlideIndex + 1}`}
            fill
            style={{ objectFit: "contain" }}
            priority
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Text with typing effect - centered */}
        <div className="text-center px-4 max-w-4xl min-h-[200px] flex items-center justify-center">
          {showText && (
            <TypeWriter
              key={key}
              text={currentSlide.text}
              speed={35}
              className="slide-text"
            />
          )}
        </div>
      </div>
    </div>
  );
}

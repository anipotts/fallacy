"use client";

import { useState } from "react";
import Slideshow from "@/components/Slideshow";
import AudioPlayer from "@/components/AudioPlayer";

const slides = [
  {
    image: "/images/slide1.jpg",
    text: "The [[truth]] is often hidden beneath layers of [[deception]] and carefully crafted [[narratives]].",
  },
  {
    image: "/images/slide2.jpg",
    text: "Every [[argument]] can be manipulated through [[logical]] flaws and [[emotional]] appeals.",
  },
  {
    image: "/images/slide3.jpg",
    text: "What appears to be [[reason]] may simply be [[illusion]] wrapped in sophisticated [[rhetoric]].",
  },
  {
    image: "/images/slide4.jpg",
    text: "The [[masses]] follow [[beliefs]] constructed from carefully designed [[fallacies]].",
  },
  {
    image: "/images/slide5.jpg",
    text: "[[Question]] everything, especially what seems most [[certain]] and [[absolute]].",
  },
];

export default function Home() {
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleSlideshowComplete = () => {
    // Show final screen immediately after last slide
    setShowFinalScreen(true);
  };

  const handleAudioReady = () => {
    setHasStarted(true);
  };

  return (
    <main className="min-h-screen bg-black">
      <AudioPlayer onAudioReady={handleAudioReady} />
      {hasStarted && !showFinalScreen && (
        <Slideshow slides={slides} onComplete={handleSlideshowComplete} />
      )}
      {hasStarted && showFinalScreen && (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="final-text keyword-red text-center fade-in px-4">
            FALLACY
          </h1>
        </div>
      )}
    </main>
  );
}

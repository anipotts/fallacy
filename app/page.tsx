"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import ElectricBorder from "@/components/ElectricBorder";

const messages = [
  "I was a dreamer once",
  "I dreamt of peace",
  "I dreamt of love",
  "I dreamt of happiness",
  "But they",
  "They took that dream from me",
  "They stripped me of my purpose",
  "And a man without a purpose",
  "Reverts to his old ways",
  "Unfortunately for them",
  "My old ways consist of",
  "Brutality",
];

export default function Home() {
  const [showButton, setShowButton] = useState(true);
  const [showWhiteScreen, setShowWhiteScreen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const startSequence = async () => {
    // Start audio
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        console.log("Music started");
      } catch (error) {
        console.error("Could not play music:", error);
      }
    }

    // Fade out button
    setShowButton(false);

    // Wait 800ms then show white screen
    await wait(800);
    setShowWhiteScreen(true);

    // Wait 2100ms before first message
    await wait(2100);

    // Loop through all messages
    for (const message of messages) {
      // Show message
      setCurrentMessage(message);
      setMessageVisible(true);

      // Hold for 2200ms
      await wait(2200);

      // Fade out
      setMessageVisible(false);

      // Wait for fade transition (1400ms)
      await wait(1400);
    }

    // After all messages, could add navigation or final screen
    console.log("Sequence complete");
  };

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Audio element */}
      <audio ref={audioRef} loop>
        <source src="/audio/soundtrack.m4a" type="audio/mp4" />
        <source src="/audio/soundtrack.mp3" type="audio/mpeg" />
      </audio>

      {/* Three Panel Container - Always visible in background */}
      <div className="three-panel-container">
        <div className="panel panel-left">
          <Image
            src="/images/image2.jpg"
            alt="Panel 1"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="panel panel-center">
          <Image
            src="/images/image3.jpg"
            alt="Panel 2"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="panel panel-right">
          <Image
            src="/images/image4.jpg"
            alt="Panel 3"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>

      {/* White Screen Overlay */}
      <div className={`white-screen ${showWhiteScreen ? "visible" : ""}`}>
        <div className="star-bg"></div>
        <div className={`white-screen-text ${messageVisible ? "visible" : ""}`}>
          {currentMessage}
        </div>
      </div>

      {/* Begin Button Container */}
      <div className={`container ${!showButton ? "fade-out" : ""}`}>
        <ElectricBorder color="#ff0000" speed={2}>
          <button onClick={startSequence} className="electric-button">
            <span className="button-text">Begin</span>
          </button>
        </ElectricBorder>
      </div>
    </main>
  );
}

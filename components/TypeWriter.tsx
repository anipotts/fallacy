"use client";

import { useEffect, useState } from "react";

interface TypeWriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export default function TypeWriter({
  text,
  speed = 50,
  onComplete,
  className = "",
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset on mount or text change
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  // Parse text to highlight keywords in red
  const renderTextWithKeywords = (text: string) => {
    // Split by markers: [[keyword]]
    const parts = text.split(/(\[\[.*?\]\])/);

    return parts.map((part, index) => {
      if (part.startsWith("[[") && part.endsWith("]]")) {
        const keyword = part.slice(2, -2);
        return (
          <span key={index} className="keyword-red">
            {keyword}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={className}>
      {renderTextWithKeywords(displayedText)}
      {currentIndex < text.length && (
        <span className="keyword-red animate-pulse">|</span>
      )}
    </div>
  );
}

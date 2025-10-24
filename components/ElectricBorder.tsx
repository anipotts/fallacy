"use client";

import React from "react";

interface ElectricBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  speed?: number;
}

export default function ElectricBorder({
  children,
  className = "",
  color = "#ff0000",
  speed = 2,
}: ElectricBorderProps) {
  return (
    <>
      <style jsx global>{`
        @keyframes electricFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <div className={`relative ${className}`}>
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(45deg, ${color}, ${color}44, ${color}, ${color}44)`,
            backgroundSize: "300% 300%",
            animation: `electricFlow ${speed}s linear infinite`,
            mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </>
  );
}


"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type SparklesCoreProps = {
  id: string;
  background: string;
  minSize: number;
  maxSize: number;
  particleDensity: number;
  className?: string;
  particleColor: string;
};

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}) => {
  const [sparkles, setSparkles] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      color: string;
      animationDelay: string;
      animationDuration: string;
    }[]
  >([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: particleDensity }).map((_, i) => {
        const size = Math.random() * (maxSize - minSize) + minSize;
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 50, // Start in the top half
          size: size,
          color: particleColor,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${Math.random() * 4 + 2}s`,
        };
      });
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 7000); 

    return () => clearInterval(interval);
  }, [particleDensity, minSize, maxSize, particleColor]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <div className="absolute inset-0" style={{ background }}>
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-water-drop"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              backgroundColor: sparkle.color,
              borderRadius: '50%',
              animationDelay: sparkle.animationDelay,
              animationDuration: sparkle.animationDuration,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

    
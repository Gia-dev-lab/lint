
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
      translateX: string;
      translateY: string;
    }[]
  >([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: particleDensity }).map((_, i) => {
        const size = Math.random() * (maxSize - minSize) + minSize;
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100, // Random vertical position
          size: size,
          color: particleColor,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 5 + 3}s`,
          translateX: `${(Math.random() - 0.5) * 20}px`,
          translateY: `${(Math.random() - 0.5) * 20}px`,
        };
      });
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 8000); 

    return () => clearInterval(interval);
  }, [particleDensity, minSize, maxSize, particleColor]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <div className="absolute inset-0" style={{ background }}>
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-sparkle-float"
            style={{
              '--translateX': sparkle.translateX,
              '--translateY': sparkle.translateY,
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              backgroundColor: sparkle.color,
              borderRadius: '50%',
              animationDelay: sparkle.animationDelay,
              animationDuration: sparkle.animationDuration,
            } as React.CSSProperties}
          ></div>
        ))}
      </div>
    </div>
  );
};

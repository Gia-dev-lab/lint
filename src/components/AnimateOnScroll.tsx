"use client";

import { useRef, useEffect, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export function AnimateOnScroll({
  children,
  className,
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when element's intersection status changes
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );
    
    observer.observe(element);
    
    // Check if the element is already visible on mount
    const initialEntry = observer.takeRecords()[0];
    if(initialEntry && initialEntry.isIntersecting){
        setIsVisible(true);
    }

    return () => {
       if (element) {
         observer.unobserve(element);
       }
    };
  }, [threshold]);
  
  // This effect will unobserve the element if it has become visible
  // and we only want the animation to trigger once.
  useEffect(() => {
      const element = ref.current;
      if (isVisible && element) {
          const observer = new IntersectionObserver(() => {}, {threshold});
          observer.observe(element);
          observer.unobserve(element);
      }
  }, [isVisible, threshold]);


  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
    >
      {children}
    </div>
  );
}

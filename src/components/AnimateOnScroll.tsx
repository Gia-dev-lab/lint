
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
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(element);
        }
      },
      { threshold }
    );
    
    observer.observe(element);

    return () => {
       if (element) {
         observer.unobserve(element);
       }
    };
  }, [threshold]);


  return (
    <div
      ref={ref}
      data-visible={inView}
      className={cn(
        'transition-all duration-700 ease-out',
        'group/animatescroll',
        inView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-md',
        className
      )}
    >
      {children}
    </div>
  );
}

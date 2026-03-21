"use client";

import React, { useEffect, useRef } from 'react';
import { animate, stagger, createScope } from 'animejs';
import { cn } from '@/lib/utils';

interface TestimonialQuoteProps {
  quote: string;
  author: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const TestimonialQuote = ({ quote, author, className, align = 'left' }: TestimonialQuoteProps) => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const scope = createScope({ root: root.current! }).add(() => {
             animate('.split-word', {
                translateY: [20, 0], opacity: [0, 1],
                delay: stagger(60), duration: 1000, ease: 'outQuart'
             });
             animate('.author', {
                opacity: [0, 1], translateX: [-20, 0],
                duration: 1200, delay: 800, ease: 'outExpo'
             });
             animate('.quote-mark', {
                opacity: [0, 0.4], scale: [0.8, 1],
                duration: 2000, ease: 'outCubic'
             });
        });
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    
    observer.observe(root.current);
    
    return () => observer.disconnect();
  }, []);

  const words = quote.split(' ');

  return (
    <section ref={root} className={cn("w-full max-w-6xl mx-auto py-24 px-6 md:px-12 relative", className)}>
      <blockquote className={cn("relative z-10 flex flex-col", 
        align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-right' : 'items-start text-left'
      )}>
        <p className={cn("relative z-10 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground font-bold flex flex-wrap gap-x-3 gap-y-2",
          align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'
        )}>
          {words.map((w, i) => (
             <span key={i} className="split-word opacity-0 inline-block relative z-10">
                {i === 0 && (
                  <span className="quote-mark absolute -top-[0.4em] -left-[0.8em] text-[1.8em] leading-none font-heading text-deco-gold opacity-0 select-none z-[-1] pointer-events-none">
                    "
                  </span>
                )}
                {w}
             </span>
          ))}
        </p>
        <footer className={cn("author opacity-0 mt-8 md:mt-12 font-mono tracking-widest text-xs md:text-sm text-foreground/60 uppercase flex items-center gap-4",
          align === 'right' ? 'flex-row-reverse' : 'flex-row'
        )}>
          <div className="w-12 h-px bg-retro-red" />
          {author}
        </footer>
      </blockquote>
    </section>
  );
};

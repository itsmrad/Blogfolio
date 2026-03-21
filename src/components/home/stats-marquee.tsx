"use client";

import React, { useEffect, useRef } from 'react';
import { animate, createScope } from 'animejs';

export const StatsMarquee = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    let scope: any;
    try {
      scope = createScope({ root: root.current }).add(() => {
        animate('.track', {
          translateX: ['0%', '-50%'],
          duration: 30000,
          ease: 'linear',
          loop: true,
        });
      });
    } catch(e) { console.error(e) }
    
    return () => scope && scope.revert();
  }, []);

  const metrics = [
    "42 STORIES", "18 CONTRIBUTORS", "12 COUNTRIES", "8,401 READS", "SYS 1984 ACTIVE", "AESTHETIC V1.8"
  ];
  // Double for seamless loop
  const items = [...metrics, ...metrics];

  return (
    <div ref={root} className="w-full overflow-hidden border-y border-border/20 py-4 bg-card/10 backdrop-blur-md">
      <div className="track flex w-[200%] md:w-[150%] gap-8 items-center whitespace-nowrap">
        {items.map((item, i) => (
          <div key={i} className="flex-1 flex justify-center items-center gap-6">
            <span className="font-mono text-sm tracking-[0.3em] font-semibold text-foreground/80">{item}</span>
            <div className="w-1.5 h-1.5 bg-retro-red rotate-45 transform" />
          </div>
        ))}
      </div>
    </div>
  );
};

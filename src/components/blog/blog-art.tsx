"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { motion, Variants } from "framer-motion";

export function BlogArt() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ambient floating for minimalist Fuji clouds
    animate(".fuji-cloud", {
      translateX: [-20, 20],
      duration: 10000,
      ease: "easeInOutSine",
      delay: stagger(1000),
      alternate: true,
      loop: true,
    });
    
    // Wave oscillation loop
    animate(".ocean-wave", {
      strokeDashoffset: [1000, 0],
      duration: 15000,
      ease: "linear",
      loop: true,
    });
    
    // Falling sakura petals sequence
    animate(".sakura-petal", {
      translateY: [0, 800],
      translateX: () => [0, (Math.random() - 0.5) * 200],
      rotate: [0, 360],
      opacity: [0, 0.8, 0],
      duration: () => 5000 + Math.random() * 3000,
      ease: "linear",
      delay: stagger(600),
      loop: true,
    });
  }, []);

  const draw: any = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 0.8,
      transition: {
        pathLength: { delay: i * 0.4, type: "spring", duration: 3, bounce: 0 },
        opacity: { delay: i * 0.4, duration: 2 }
      }
    })
  };

  const fadeUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 2, ease: "easeOut" } }
  };

  // Generate deterministic petals for SSR/Hydration matching
  const petals = Array.from({ length: 12 }).map((_, i) => ({
    cx: 150 + (i * 85),
    cy: -50 - (i % 3) * 100
  }));

  return (
    <div ref={containerRef} className="absolute top-0 right-0 w-full h-200 overflow-hidden pointer-events-none -z-10 select-none">
      <motion.svg 
        initial="hidden"
        animate="visible"
        className="w-full h-full object-cover opacity-80 dark:opacity-40" 
        viewBox="0 0 1200 800" 
        preserveAspectRatio="xMidYMin slice" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sun" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="text-retro-red" stopColor="currentColor" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fuji" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" className="text-muted-foreground" stopColor="currentColor" />
          </linearGradient>
        </defs>

        {/* Minimal Sun */}
        <motion.circle variants={fadeUp} cx="600" cy="300" r="150" fill="url(#sun)" opacity="0.6" />
        
        {/* Mount Fuji Outline */}
        <motion.path 
          custom={1} variants={draw}
          d="M 300,600 Q 500,350 600,250 Q 700,350 900,600 Z" 
          fill="url(#fuji)" stroke="currentColor" strokeWidth="2" opacity="0.5" 
          className="text-foreground"
        />
        {/* Fuji Snow Cap */}
        <motion.path 
          custom={1.5} variants={draw}
          d="M 520,380 Q 600,400 680,380 L 600,250 Z" 
          fill="currentColor" opacity="0.9"
          className="text-background"
        />
        
        {/* Dynamic Ocean Waves */}
        <g className="text-deco-gold opacity-50">
          <motion.path custom={2} variants={draw} className="ocean-wave" strokeDasharray="1000 1000" d="M 0,650 Q 150,600 300,650 T 600,650 T 900,650 T 1200,650" fill="none" stroke="currentColor" strokeWidth="1" />
          <motion.path custom={2.2} variants={draw} className="ocean-wave" strokeDasharray="1000 1000" d="M 0,680 Q 150,630 300,680 T 600,680 T 900,680 T 1200,680" fill="none" stroke="currentColor" strokeWidth="1" />
          <motion.path custom={2.4} variants={draw} className="ocean-wave" strokeDasharray="1000 1000" d="M 0,710 Q 150,660 300,710 T 600,710 T 900,710 T 1200,710" fill="none" stroke="currentColor" strokeWidth="1" />
        </g>

        {/* Floating Clouds */}
        <motion.g custom={3} variants={draw} className="fuji-cloud text-foreground opacity-20" fill="currentColor">
          <rect x="200" y="200" width="120" height="4" rx="2" />
          <rect x="230" y="215" width="80" height="4" rx="2" />
        </motion.g>
        <motion.g custom={3.2} variants={draw} className="fuji-cloud text-foreground opacity-20" fill="currentColor">
          <rect x="850" y="150" width="150" height="4" rx="2" />
          <rect x="880" y="165" width="90" height="4" rx="2" />
        </motion.g>

        {/* Falling Sakura Petals */}
        <motion.g custom={4} variants={draw} className="text-retro-red opacity-60">
           {petals.map((petal, i) => (
             <ellipse 
               key={i} 
               className="sakura-petal" 
               cx={petal.cx} 
               cy={petal.cy} 
               rx="6" ry="3" 
               fill="currentColor" 
             />
           ))}
        </motion.g>
      </motion.svg>
    </div>
  );
}

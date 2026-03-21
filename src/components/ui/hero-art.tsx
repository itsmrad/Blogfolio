"use client";

import React, { useEffect, useRef, useMemo } from 'react';
import { animate, stagger, createScope } from 'animejs';
import { cn } from '@/lib/utils';

type BranchData = {
  x1: number; y1: number; x2: number; y2: number;
  strokeWidth: number; depth: number; isLeaf: boolean; blossomScale: number;
};

const generateTreeData = (x: number, y: number, angle: number, depth: number, maxDepth: number, seed: number, acc: BranchData[] = []) => {
  if (depth === 0) return acc;
  const r1 = Math.abs(Math.sin(seed * 12.9898)) * 0.4;
  const r2 = Math.abs(Math.sin(seed * 78.233)) * 0.4;
  const length = depth * 4 + r1 * 6;
  const x2 = x + Math.cos(angle) * length;
  const y2 = y + Math.sin(angle) * length;
  const strokeWidth = Math.max(0.5, depth * 0.5);
  const blossomScale = 1.5 + r1 * 3;

  acc.push({ x1: x, y1: y, x2, y2, strokeWidth, depth, isLeaf: depth <= 2, blossomScale });
  generateTreeData(x2, y2, angle - 0.35 - r1 * 0.2, depth - 1, maxDepth, seed + 1, acc);
  generateTreeData(x2, y2, angle + 0.35 + r2 * 0.2, depth - 1, maxDepth, seed + 2, acc);
  return acc;
};

export const HeroArt = ({ className }: { className?: string }) => {
  const root = useRef<SVGSVGElement>(null);
  
  const treeData = useMemo(() => generateTreeData(250, 410, -Math.PI / 2, 6, 6, 1), []);
  const stairsData = useMemo(() => Array.from({ length: 12 }), []);
  const petalsData = useMemo(() => Array.from({ length: 24 }), []);

  useEffect(() => {
    if (!root.current) return;
    let scope: any;

    try {
      scope = createScope({ root: root.current }).add(() => {
        // Enso Ring (Anticipation / Arc)
        animate('.enso-ring', { 
           strokeDashoffset: [(el: any) => el.getTotalLength?.() || 1200, 0],
           opacity: [0, 1], rotate: ['-90deg', '0deg'],
           transformOrigin: ['50% 50%', '50% 50%'],
           duration: 1500, ease: 'inOutQuart' 
        });

        // Enso Solid (Slow In and Slow Out)
        animate('.enso-solid', { 
           scale: [0, 1], opacity: [0, 0.8], 
           transformOrigin: ['50% 50%', '50% 50%'],
           duration: 2000, delay: 400, ease: 'outExpo' 
        });

        // Swiss Perspective Stairs (Staggering / Linear progression)
        animate('.stair-rect', { 
           scaleX: [0, 1], opacity: [0, 1], 
           transformOrigin: ['50% 50%', '50% 50%'],
           duration: 800, delay: stagger(50, { start: 600 }), ease: 'outQuad' 
        });
        
        animate('.stair-line', {
           scaleY: [0, 1], opacity: [0, 0.2],
           transformOrigin: ['50% 100%', '50% 100%'],
           duration: 1000, delay: 700, ease: 'outQuart'
        });

        // Fractal Tree (Follow Through and Overlapping Action via Stagger)
        animate('.tree-branch', { 
           opacity: [0, 1], scale: [0.3, 1],
           transformOrigin: [(el: any) => `${el.getAttribute('x1')}px ${el.getAttribute('y1')}px`],
           duration: 600, delay: stagger(10, { start: 1000, from: 'last' }), ease: 'spring(1, 80, 10, 0)' 
        });

        animate('.tree-blossom', { 
           scale: [0, 1], opacity: [0, 0.9],
           transformOrigin: ['50% 50%', '50% 50%'],
           duration: 600, delay: stagger(15, { start: 1400, from: 'last' }), ease: 'outBack' 
        });

        // Gate construction (Solid Drawing / Staging)
        animate('.gate-pillar', { 
           scaleY: [0, 1], opacity: [0, 1], transformOrigin: ['50% 100%', '50% 100%'],
           duration: 1000, delay: stagger(100, { start: 1200 }), ease: 'outExpo' 
        });
        animate('.gate-beam', { 
           scaleX: [0, 1], opacity: [0, 1], transformOrigin: ['50% 50%', '50% 50%'],
           duration: 1000, delay: stagger(150, { start: 1400 }), ease: 'outExpo' 
        });
        animate('.gate-roof', { 
           opacity: [0, 1], translateY: [-30, 0],
           duration: 1200, delay: stagger(150, { start: 1600 }), ease: 'outCubic' 
        });

        // Golden Branch Swoosh (Appeal / Timing)
        animate('.gold-branch', { 
           strokeDashoffset: [1500, 0], opacity: [0, 1],
           duration: 2500, delay: 2000, ease: 'inOutSine' 
        });
        
        animate('.fg-blossom', { 
           scale: [0, 1], transformOrigin: ['50% 50%', '50% 50%'],
           duration: 800, delay: stagger(100, { start: 2500 }), ease: 'outBack' 
        });

        // Tech Accents
        animate('.tech-accent', {
           opacity: [0, 1], translateX: [-10, 0],
           duration: 600, delay: stagger(80, { start: 3000 }), ease: 'outQuad'
        });

        // Ambient Falling Petals (Continuous Arch)
        animate('.anim-petal', {
           translateY: [0, 80], opacity: [0, 0.8, 0],
           duration: (el: any, i: number) => 3000 + (i % 5) * 500,
           delay: (el: any, i: number) => 3500 + i * 150,
           loop: true,
           ease: 'linear'
        });
      });
    } catch (e) {
      console.error('Animejs scope error:', e);
    }
    
    return () => {
      if (scope) scope.revert();
    };
  }, [treeData]);

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 700" 
      className={cn("w-full h-full", className)}
      ref={root}
    >
      <defs>
        <pattern id="swiss-grid-art" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" className="stroke-foreground/10" strokeWidth="1"/>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#swiss-grid-art)" />

      {/* Abstract Sun / Enso */}
      <circle cx="250" cy="350" r="180" className="enso-ring fill-none stroke-retro-red/80 stroke-2 opacity-0" strokeDasharray="1200" />
      <circle cx="250" cy="350" r="140" className="enso-solid fill-retro-red mix-blend-multiply dark:mix-blend-screen opacity-0" />

      {/* Minimalist Swiss perspective stairs */}
      <g className="fill-foreground">
        {stairsData.map((_, i) => {
          const t = i / 11;
          const perspectiveT = Math.pow(t, 1.5);
          const y = 530 - perspectiveT * 120;
          const width = 110 - perspectiveT * 90;
          const x = 250 - width / 2;
          const stairHeight = Math.max(1, 3.5 * (1 - perspectiveT));

          return (
            <rect 
              key={`stair-${i}`}
              className="stair-rect opacity-0"
              x={x} y={y} width={width} height={stairHeight} 
            />
          );
        })}
        <line x1="195" y1="530" x2="240" y2="410" className="stair-line stroke-foreground/20 opacity-0" strokeWidth="1" />
        <line x1="305" y1="530" x2="260" y2="410" className="stair-line stroke-foreground/20 opacity-0" strokeWidth="1" />
      </g>

      {/* Fractal Sakura Tree */}
      <g id="fractal-tree">
        {treeData.map((branch, i) => (
          <g key={`branch-${i}`}>
            <line 
              className="tree-branch stroke-foreground opacity-0"
              x1={branch.x1} y1={branch.y1} x2={branch.x2} y2={branch.y2}
              strokeWidth={branch.strokeWidth} strokeLinecap="round"
            />
            {branch.isLeaf && (
              <circle 
                className="tree-blossom fill-retro-red mix-blend-multiply dark:mix-blend-screen opacity-0"
                cx={branch.x2} cy={branch.y2} r={branch.blossomScale} 
              />
            )}
          </g>
        ))}
      </g>

      {/* Falling petals */}
      <g>
        {petalsData.map((_, i) => {
          const r1 = Math.abs(Math.sin(i * 11.11));
          const r2 = Math.abs(Math.sin(i * 22.22));
          const rx = 160 + r1 * 180;
          const ry = 280 + r2 * 200;
          return (
            <circle 
              key={`petal-${i}`}
              className="anim-petal fill-retro-red opacity-0"
              cx={rx} cy={ry} r={1.2 + r1 * 2} 
            />
          );
        })}
      </g>

      {/* Gate */}
      <g className="fill-foreground">
        <rect className="gate-pillar opacity-0" x="180" y="250" width="16" height="280" />
        <rect className="gate-pillar opacity-0" x="304" y="250" width="16" height="280" />
        <rect className="gate-beam opacity-0" x="120" y="280" width="260" height="20" rx="2" />
        <rect className="gate-beam opacity-0" x="140" y="230" width="220" height="24" />
        <path className="gate-roof opacity-0" d="M 80 230 Q 250 180 420 230 L 400 200 Q 250 160 100 200 Z" />
        <path className="gate-roof opacity-0" d="M 120 150 Q 250 110 380 150 L 360 130 Q 250 100 140 130 Z" />
      </g>

      {/* Gold Branch */}
      <path 
        className="gold-branch stroke-deco-gold opacity-0" 
        fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray="1500"
        d="M 500 500 Q 350 480 250 350 T -20 200" 
      />
      
      {/* FG Blossoms */}
      <g className="fill-retro-red">
        <circle className="fg-blossom opacity-0" cx="150" cy="270" r="14" />
        <circle className="fg-blossom opacity-0" cx="280" cy="330" r="10" />
        <circle className="fg-blossom opacity-0" cx="360" cy="420" r="18" />
        <circle className="fg-blossom opacity-0" cx="440" cy="480" r="12" />
        <circle className="fg-blossom opacity-0" cx="100" cy="220" r="9" />
      </g>
      
      {/* Tech Accents */}
      <g className="fill-foreground font-mono text-[10px] tracking-[0.2em] uppercase">
        <text className="tech-accent opacity-0" x="40" y="640">SYS. 1984</text>
        <text className="tech-accent opacity-0" x="40" y="660">OP. NORMAL</text>
        <rect className="tech-accent opacity-0" x="420" y="640" width="40" height="2" />
        <rect className="tech-accent opacity-0" x="420" y="650" width="20" height="2" />
        <rect className="tech-accent opacity-0" x="420" y="660" width="30" height="2" />
      </g>
    </svg>
  );
};

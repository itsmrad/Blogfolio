"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { animate, createScope } from 'animejs';

export const Footer = () => {
    const root = useRef<HTMLElement>(null);
    useEffect(() => {
      if (!root.current) return;
      const observer = new IntersectionObserver(([entry]) => {
         if (entry.isIntersecting) {
            createScope({ root: root.current! }).add(() => {
               animate('.footer-fade', {
                 translateY: [10, 0], opacity: [0, 1],
                 duration: 1000, delay: 200, ease: 'outCubic'
               });
            });
            observer.disconnect();
         }
      });
      observer.observe(root.current);
      return () => observer.disconnect();
    }, []);

    return (
       <footer ref={root} className="w-full border-t border-border/20 bg-background pt-24 pb-12 px-6 md:px-12 flex flex-col items-center">
          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 footer-fade opacity-0">
             <div className="col-span-1 md:col-span-2">
                <div className="font-heading text-4xl font-bold mb-6 tracking-tighter">Blogfolio.</div>
                <p className="font-mono text-sm text-foreground/50 max-w-xs leading-relaxed">
                   A digital sanctuary exploring the intersections of code, retro-futurism, and Japanese minimalism.
                </p>
             </div>
             <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-foreground/40 tracking-[0.2em] uppercase mb-2">Index</span>
                <Link href="#" className="font-mono text-sm hover:text-retro-red transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-transparent hover:bg-retro-red transition-colors" /> INITIATE</Link>
                <Link href="/blog" className="font-mono text-sm hover:text-retro-red transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-transparent hover:bg-retro-red transition-colors" /> ARCHIVES</Link>
                <Link href="/projects" className="font-mono text-sm hover:text-retro-red transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-transparent hover:bg-retro-red transition-colors" /> SYSTEMS</Link>
             </div>
             <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-foreground/40 tracking-[0.2em] uppercase mb-2">Connect</span>
                <a href="https://x.com/anupamio" target="_blank" rel="noopener noreferrer" className="font-mono text-sm hover:text-retro-red transition-colors">X / TWITTER</a>
                <a href="https://github.com/itsmrad" target="_blank" rel="noopener noreferrer" className="font-mono text-sm hover:text-retro-red transition-colors">GITHUB</a>
             </div>
          </div>
          
          <div className="footer-fade opacity-0 w-full max-w-7xl border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
             <span className="font-mono text-xs text-foreground/40 uppercase tracking-widest text-center md:text-left">
                © 2026 Blogfolio Core. All rights reserved.
             </span>
             <div className="font-mono text-[10px] text-foreground/40 uppercase tracking-[0.3em] flex items-center gap-3">
                <div className="w-2 h-2 bg-deco-gold rounded-full animate-pulse" />
                SYS. 1984 / OPERATIONAL
             </div>
          </div>
       </footer>
    );
};

"use client";
import React, { useEffect, useRef } from 'react';
import { animate, createScope } from 'animejs';

export const Newsletter = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        createScope({ root: root.current! }).add(() => {
             animate('.nl-reveal', {
                translateY: [20, 0], opacity: [0, 1],
                duration: 800, delay: 200, ease: 'outQuart'
             });
        });
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={root} className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12">
       <div className="w-full border border-border/40 bg-card/10 backdrop-blur-sm p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Decorative lines */}
          <div className="absolute top-0 left-0 w-2 h-full bg-retro-red" />
          
          <div className="flex-1 nl-reveal opacity-0">
             <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Join the Protocol.</h2>
             <p className="font-mono text-sm text-foreground/60 leading-relaxed max-w-md">
               Receive periodic logs on software engineering, AI models, and deep tech. Zero spam. Pure signal.
             </p>
          </div>
          
          <div className="w-full md:w-auto flex-1 max-w-lg nl-reveal opacity-0">
             <form className="flex flex-col sm:flex-row gap-4 w-full" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="ID@DOMAIN.COM" 
                  className="flex-1 bg-background border border-border/50 px-6 py-4 font-mono text-sm uppercase tracking-widest placeholder:text-foreground/30 focus:outline-none focus:border-retro-red transition-colors rounded-none"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-foreground text-background font-mono text-xs tracking-widest px-8 py-4 uppercase hover:bg-retro-red transition-colors rounded-none whitespace-nowrap"
                >
                  Init sequence &rarr;
                </button>
             </form>
          </div>
       </div>
    </section>
  );
};

"use client";

import React, { useEffect, useRef } from 'react';
import { animate, stagger, createScope } from 'animejs';

export const TopicPills = () => {
    const root = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (!root.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && root.current) {
                const scope = createScope({ root: root.current }).add(() => {
                    animate('.pill-btn', {
                        translateY: [20, 0],
                        opacity: [0, 1],
                        delay: stagger(80, { from: 'center' }),
                        duration: 800,
                        ease: 'outBack'
                    });
                });
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        observer.observe(root.current);
        return () => observer.disconnect();
    }, []);

    const topics = [
      "AI / ML", "Web Dev", "Android Dev", "Systems Design", 
      "Rust", "LLMs", "React Server Components", "Microservices",
      "TensorFlow", "Jetpack Compose", "Kubernetes", "WebAssembly"
    ];

    return (
      <section ref={root} className="w-full max-w-7xl mx-auto py-16 px-6 relative">
        <div className="mb-10 flex flex-col items-center md:items-start">
           <h3 className="font-mono text-xs tracking-widest uppercase text-retro-red mb-2">Explore Stack</h3>
           <h2 className="font-heading text-3xl font-bold">Tech Filters.</h2>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {topics.map((topic, i) => (
            <button 
              key={i} 
              className="pill-btn opacity-0 px-6 py-2.5 rounded-full border border-border/60 bg-card/30 hover:bg-foreground hover:text-background hover:border-foreground transition-colors duration-300 font-mono text-xs tracking-wider backdrop-blur-sm shadow-sm"
            >
              {topic}
            </button>
          ))}
        </div>
      </section>
    );
};

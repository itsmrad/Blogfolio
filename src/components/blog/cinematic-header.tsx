"use client";

import { motion, Variants } from "framer-motion";

interface CinematicHeaderProps {
  title: string;
  subtitle: string;
}

export function CinematicHeader({ title, subtitle }: CinematicHeaderProps) {
  const letters = title.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -90,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="py-12 md:py-24 text-center md:text-left perspective-1000">
      <motion.h1
        className="font-heading text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase overflow-hidden"
        variants={container}
        initial="hidden"
        animate="visible"
        aria-label={title}
      >
        {letters.map((letter, index) => (
          <motion.span
            variants={child}
            key={index}
            className="inline-block transform-style-3d origin-bottom"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
          className="inline-block w-4 h-full bg-retro-red ml-2 -mb-2"
        />
      </motion.h1>
      
      <motion.p 
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
        className="pt-6 text-base md:text-xl text-muted-foreground font-mono tracking-widest uppercase"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

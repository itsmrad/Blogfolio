"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import { HeroArt } from '@/components/ui/hero-art';

const heroTopics = [
  {
    part1: "machine",
    part2: "learning.",
    desc: "Where low-level system architecture meets the bleeding edge of AI. An intersection of robust engineering and machine learning.",
    link: "Explore the Stack"
  },
  {
    part1: "modern",
    part2: "web.",
    desc: "Building scalable, interactive interfaces. Embracing React Server Components, Edge computing, and seamless user experiences.",
    link: "Inspect the DOM"
  },
  {
    part1: "web3",
    part2: "infra.",
    desc: "Cryptographically secure, trustless architecture. Exploring consensus mechanisms, smart contracts, and the future of web3 networks.",
    link: "Validate the Chain"
  },
  {
    part1: "mobile",
    part2: "native.",
    desc: "Native performance in the palm of your hand. Crafting fluid, concurrent applications using modern multi-threaded patterns.",
    link: "Compile the App"
  }
];

/* ── Spring config — smooth, natural, no overshoot ── */
const morphSpring = { type: "spring" as const, stiffness: 120, damping: 20, mass: 0.4 };

/* ── Per-character morphing text (MorphingText pattern) ── */
const MorphingWord = ({ word, staggerBase = 0 }: { word: string; staggerBase?: number }) => (
  <span className="inline-block">
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={word}
        className="inline-block"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.03, delayChildren: staggerBase * 0.03 } },
          exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
        }}
      >
        {word.split('').map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block will-change-transform"
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              exit: { opacity: 0, y: -12, filter: "blur(4px)" },
            }}
            transition={morphSpring}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  </span>
);

interface MinimalistHeroProps {
  logoText?: string;
  navLinks?: { label: string; href: string }[];
  readMoreLink?: string;
  socialLinks?: { icon: React.ElementType; href: string }[];
  locationText?: string;
  className?: string;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground font-sans uppercase">
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="size-5" />
  </a>
);

export const MinimalistHero = ({
  navLinks = [],
  readMoreLink = "#",
  socialLinks = [
    { icon: Github, href: 'https://github.com/itsmrad' },
    { icon: Twitter, href: 'https://x.com/anupamio' },
  ],
  locationText = "US-EAST-1",
  className,
}: MinimalistHeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ── Auto-cycle every 5s ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroTopics.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const topic = heroTopics[currentIndex];
  const part1Length = topic.part1.length;

  return (
    <div
      className={cn(
        'relative flex min-h-[90vh] w-full flex-col items-center justify-between overflow-hidden bg-background p-8 md:p-12 border-b border-border/40',
        className
      )}
    >
      <header className="z-30 flex w-full max-w-7xl items-center justify-between mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Logo />
        </motion.div>
        <div className="hidden items-center space-x-12 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>{link.label}</NavLink>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="flex flex-col gap-1.5 md:hidden" aria-label="Open menu"
        >
          <span className="block h-0.5 w-6 bg-foreground" />
          <span className="block h-0.5 w-6 bg-foreground" />
          <span className="block h-0.5 w-4 bg-foreground self-end" />
        </motion.button>
      </header>

      <div className="relative w-full max-w-7xl flex-grow grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
        {/* Left Typography Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="z-20 flex flex-col justify-center h-full order-2 lg:order-1 text-center lg:text-left pt-8 lg:pt-0"
        >
          {/* Headings — per-character spring morph */}
          <h1 className="text-6xl font-extrabold text-foreground font-heading leading-[0.9] tracking-tighter sm:text-7xl lg:text-8xl xl:text-[9rem] min-h-[8rem] sm:min-h-[10rem] lg:min-h-[13rem] xl:min-h-[18rem]">
            <span className="block text-retro-red">
              <MorphingWord word={topic.part1} staggerBase={0} />
            </span>
            <span className="block italic mt-2">
              <MorphingWord word={topic.part2} staggerBase={part1Length} />
            </span>
          </h1>

          {/* Description — smooth spring crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ ...morphSpring, delay: 0.1 }}
              className="mt-12 border-l-2 border-retro-red pl-6 py-2 mx-auto lg:mx-0 max-w-md text-left"
            >
              <p className="text-base leading-relaxed text-foreground/80 font-mono tracking-tight">
                {topic.desc}
              </p>
              <a href={readMoreLink} className="mt-8 inline-block text-sm font-bold tracking-widest uppercase text-foreground/60 hover:text-retro-red transition-colors font-sans">
                {topic.link} &rarr;
              </a>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Right Image Section */}
        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end items-center h-full min-h-[400px]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-75 w-75 rounded-full bg-deco-gold/15 mix-blend-multiply dark:mix-blend-screen md:h-112.5 md:w-112.5"
          />
          <motion.div
            className="relative z-10 w-75 md:w-112.5 bg-card/40 backdrop-blur-sm border border-border/40 shadow-2xl overflow-hidden p-0.5"
            initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            <div className="w-full h-full bg-muted/20">
              <HeroArt />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute -right-8 bottom-12 z-20 origin-center text-xs tracking-[0.4em] font-mono text-retro-red uppercase hidden lg:block"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            SYS. 1984 &mdash; DEV. ENV.
          </motion.div>
        </div>
      </div>

      <footer className="z-30 flex w-full max-w-7xl items-center justify-between mt-12 pt-8 border-t border-border/20">
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center gap-6"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.3 }}
          className="text-xs tracking-widest uppercase font-mono text-foreground/50 border border-border/40 px-3 py-1 bg-muted/20"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};


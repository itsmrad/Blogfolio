"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Zap, 
  Shield, 
  Layers, 
  Sparkles, 
  Lock,
  Globe,
  Smartphone
} from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

// Feature Card Component
interface FeatureCardProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ className, children, delay = 0 }) => {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "group relative overflow-hidden rounded-none border border-border/40 bg-card p-6",
        "hover:border-retro-red/60 transition-colors duration-500",
        className
      )}
      whileHover={{ scale: 0.99 }}
      transition={{ delay }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-retro-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {children}
    </motion.div>
  );
};

// Animated Typography Component
const AnimatedTypography: React.FC = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.2 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <motion.span
        className="font-heading text-7xl md:text-8xl text-foreground font-semibold"
        animate={{ scale }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        JP
      </motion.span>
    </div>
  );
};

// Layout Animation Component
const LayoutAnimation: React.FC = () => {
  const [layout, setLayout] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const layouts = ["grid-cols-2", "grid-cols-4", "grid-cols-1", "grid-cols-3"];

  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        className={`grid ${layouts[layout]} gap-1 w-full max-w-40 p-2 border border-border/40`}
        layout
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="bg-retro-red/20 h-8 w-full border border-retro-red/40"
            layout
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Speed Indicator Component
const SpeedIndicator: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="h-12 flex items-center justify-center overflow-hidden relative w-full font-mono">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              className="h-10 w-28 bg-muted rounded-none"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              exit={{ opacity: 0, y: -20, position: "absolute" as const }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ) : (
            <motion.span
              key="text"
              initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter"
            >
              <span className="text-retro-red">0.1</span>s
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Kinetic Flow</span>
      <div className="w-full max-w-35 h-0.5 bg-border overflow-hidden">
        <motion.div
          className="h-full bg-retro-red"
          initial={{ width: 0 }}
          animate={{ width: loading ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
        />
      </div>
    </div>
  );
};

// Security Badge Component
const SecurityBadge: React.FC = () => {
  const [shields, setShields] = useState([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShields((prev) => {
        const nextIndex = prev.findIndex((s) => !s.active);
        if (nextIndex === -1) {
          return prev.map(() => ({ id: Math.random(), active: false }));
        }
        return prev.map((s, i) => (i === nextIndex ? { ...s, active: true } : s));
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-full gap-3">
      {shields.map((shield) => (
        <motion.div
          key={shield.id}
          className={cn(
            "w-12 h-12 flex items-center justify-center border",
            shield.active ? "bg-retro-red/10 border-retro-red/40" : "bg-transparent border-border/40"
          )}
          animate={{ scale: shield.active ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Lock className={cn("w-5 h-5", shield.active ? "text-retro-red" : "text-muted-foreground")} />
        </motion.div>
      ))}
    </div>
  );
};

// Global Network Component
const GlobalNetwork: React.FC = () => {
  const [pulses] = useState([0, 1, 2, 3]);

  return (
    <div className="flex items-center justify-center h-full relative">
      <Globe className="w-16 h-16 text-deco-gold z-10 opacity-80" />
      {pulses.map((pulse) => (
        <motion.div
          key={pulse}
          className="absolute w-16 h-16 border border-deco-gold/30 rounded-full"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: pulse * 1,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Main Bento Grid Component
export const BentoGrid: React.FC = () => {
  return (
    <section className="w-full bg-background px-4 py-24 pb-32 border-b border-border/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:ml-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-retro-red" />
            <p className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
              Core Architecture
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-6 max-w-xl leading-tight">
            Distributed Systems Built for Scale.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-6 gap-px auto-rows-[220px] bg-border/40 border border-border/40 p-px"
        >
          {/* Typography - Tall (2x2) */}
          <FeatureCard className="md:col-span-2 md:row-span-2 flex flex-col items-center text-center justify-between">
            <div className="flex flex-col h-full w-full">
              <div className="flex-1">
                <AnimatedTypography />
              </div>
              <div className="mt-auto border-t border-border/20 pt-4 w-full">
                <h3 className="text-lg font-bold font-sans uppercase tracking-wider text-foreground mb-1">Algorithms</h3>
                <p className="text-xs text-muted-foreground font-mono">
                  O(1) optimal data paths
                </p>
              </div>
            </div>
          </FeatureCard>

          {/* Layouts - Standard (2x1) */}
          <FeatureCard className="md:col-span-2" delay={0.1}>
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <LayoutAnimation />
              </div>
              <div className="mt-auto pt-4 border-t border-border/20">
                <h3 className="text-lg font-bold font-sans uppercase tracking-wider text-foreground mb-1 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-retro-red" />
                  Microservices
                </h3>
                <p className="text-xs text-muted-foreground font-mono">Decoupled architecture grids</p>
              </div>
            </div>
          </FeatureCard>

          {/* Global Network - Tall (2x2) */}
          <FeatureCard className="md:col-span-2 md:row-span-2" delay={0.2}>
            <div className="flex flex-col h-full w-full">
              <div className="flex-1 flex items-center justify-center">
                <GlobalNetwork />
              </div>
              <div className="mt-auto border-t border-border/20 pt-4">
                <h3 className="text-lg font-bold font-sans uppercase tracking-wider text-foreground mb-1 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-deco-gold" />
                  Edge Computing
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  Low latency routing worldwide
                </p>
              </div>
            </div>
          </FeatureCard>

          {/* Speed - Standard (2x1) */}
          <FeatureCard className="md:col-span-2" delay={0.3}>
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <SpeedIndicator />
              </div>
              <div className="mt-auto border-t border-border/20 pt-4">
                <h3 className="text-lg font-bold font-sans uppercase tracking-wider text-foreground mb-1 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-retro-red" />
                  High Performance
                </h3>
                <p className="text-xs text-muted-foreground font-mono">Sub-millisecond latency</p>
              </div>
            </div>
          </FeatureCard>

          {/* Security - Wide (3x1) */}
          <FeatureCard className="md:col-span-3" delay={0.4}>
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <SecurityBadge />
              </div>
              <div className="mt-auto border-t border-border/20 pt-4">
                <h3 className="text-lg font-bold font-sans uppercase tracking-wider text-foreground mb-1 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-retro-red" />
                  Zero Trust
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  End-to-end encryption boundaries
                </p>
              </div>
            </div>
          </FeatureCard>

          {/* Mobile Responsive - Wide (3x1) */}
          <FeatureCard className="md:col-span-3" delay={0.5}>
            <div className="flex flex-col h-full">
              <div className="flex-1 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Smartphone className="w-12 h-12 text-retro-red" strokeWidth={1.5} />
                </motion.div>
              </div>
              <div className="mt-auto border-t border-border/20 pt-4">
                <h3 className="text-lg font-bold font-sans uppercase tracking-wider text-foreground mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-retro-red" />
                  Cross-Platform
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  Web, Android & iOS Native
                </p>
              </div>
            </div>
          </FeatureCard>
        </motion.div>
      </div>
    </section>
  );
};

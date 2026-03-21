import { cn } from "@/lib/utils";
import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {}

export const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="h-10 w-10 md:h-12 md:w-12"
        aria-label="Culture Logo"
        {...props}
      >
        {/* Retro Red Sun */}
        <circle cx="100" cy="100" r="55" className="fill-retro-red" opacity="0.9" />

        {/* Minimalist Temple / Torii structure */}
        <path d="M 65 110 Q 100 95 135 110 L 128 100 Q 100 85 72 100 Z" className="fill-foreground" />
        <path d="M 50 135 Q 100 120 150 135 L 142 125 Q 100 110 58 125 Z" className="fill-foreground" />
        <rect x="85" y="80" width="8" height="70" className="fill-foreground" />
        <rect x="107" y="80" width="8" height="70" className="fill-foreground" />
        <rect x="60" y="150" width="80" height="6" className="fill-foreground" rx="2" />

        {/* Golden Sakura Branch */}
        <path
          d="M 160 170 Q 140 120 100 90 T 40 60"
          fill="none"
          className="stroke-deco-gold"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Abstract Blossoms */}
        <circle cx="120" cy="110" r="9" className="fill-retro-red mix-blend-multiply dark:mix-blend-screen" />
        <circle cx="145" cy="135" r="7" className="fill-retro-red mix-blend-multiply dark:mix-blend-screen opacity-80" />
        <circle cx="85" cy="75" r="6" className="fill-retro-red mix-blend-multiply dark:mix-blend-screen" />
        <circle cx="55" cy="60" r="4" className="fill-retro-red mix-blend-multiply dark:mix-blend-screen opacity-70" />
      </svg>
      <span className="font-heading font-bold text-xl tracking-widest uppercase text-foreground">
        Culture
      </span>
    </div>
  );
};

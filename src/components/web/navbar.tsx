"use client";

import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "../ui/button";
import { ForesightLink } from "./ForeSightLink";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  
  return (
    <nav className="w-full relative z-40 mb-12">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between py-8 border-b border-border/40">
        
        {/* Brand Area */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-6 md:mb-0">
          <ForesightLink href="/" className="group flex flex-col pt-1 items-center md:items-start text-center md:text-left">
            <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tighter flex items-center justify-center gap-2">
              <span className="text-foreground">Blogfolio</span>
              <span className="w-2 h-2 rounded-full bg-retro-red" />
            </h1>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-deco-gold mt-2">Swiss Engineering</span>
          </ForesightLink>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:flex-nowrap items-center gap-6 md:ml-8 font-mono text-xs uppercase tracking-widest mt-4 md:mt-0">
            {[
              { label: "Home", href: "/home" },
              { label: "Archive", href: "/blog" },
              { label: "Publish", href: "/create" }
            ].map((link, i) => (
              <ForesightLink 
                key={i} 
                href={link.href}
                className="group relative overflow-hidden py-1 text-foreground/70 hover:text-foreground transition-colors"
              >
                 <span className="relative z-10">{link.label}</span>
                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-retro-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </ForesightLink>
            ))}
          </div>
        </div>

        {/* Actions Area */}
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          {isLoading ? (
             <div className="w-24 h-10 animate-pulse bg-card border border-border/40" />
          ) : isAuthenticated ? (
             <button
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        toast.success("System Logout Verified");
                        router.push("/");
                      },
                      onError: (error) => { toast.error(error.error.message); },
                    },
                  })
                }
                className="font-mono text-[10px] tracking-widest uppercase border border-border/60 hover:border-retro-red hover:text-retro-red px-5 py-2.5 transition-all outline-none"
             >
                Terminate Session
             </button>
          ) : (
            <div className="flex items-center gap-4">
              <ForesightLink
                href="/auth/login"
                className="font-mono text-[10px] tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors"
              >
                Access
              </ForesightLink>
              <ForesightLink
                href="/auth/sign-up"
                className="font-mono text-[10px] tracking-widest uppercase bg-foreground text-background hover:bg-retro-red hover:text-white px-5 py-2.5 transition-all outline-none border border-foreground hover:border-retro-red"
              >
                Initialize
              </ForesightLink>
            </div>
          )}
          
          <div className="w-px h-8 bg-border/40 mx-2 hidden sm:block" />
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

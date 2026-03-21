import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HeroArt } from "@/components/ui/hero-art";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-(--spacing(16)))] w-full flex flex-col lg:flex-row bg-background border border-border/40 my-8 rounded-lg overflow-hidden shadow-2xl relative z-20">
      
      {/* Visual / Art Side */}
      <div className="hidden lg:flex w-1/2 relative bg-muted items-center justify-center border-r border-border/40 overflow-hidden">
        {/* Go Back button positioned cleanly inside the auth art container */}
        <div className="absolute top-8 left-8 z-30">
          <Link href="/" className={`${buttonVariants({ variant: "outline", size: "sm" })} shadow-md bg-background/80 backdrop-blur-md`}>
            <ArrowLeft className="size-4 mr-2" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Return</span>
          </Link>
        </div>
        
        {/* Integrate the existing Hero SVG Art */}
        <div className="w-full h-200 scale-[1.3] opacity-80 pointer-events-none transform-gpu flex items-center justify-center">
          <HeroArt />
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 relative bg-background">
        <div className="lg:hidden absolute top-6 left-6 z-20">
          <Link href="/" className={`${buttonVariants({ variant: "outline", size: "sm" })} shadow-md`}>
            <ArrowLeft className="size-4 mr-2" />
            <span className="font-mono text-[10px] tracking-widest uppercase">Back</span>
          </Link>
        </div>
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
      
    </div>
  );
}

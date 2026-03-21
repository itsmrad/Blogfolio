import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "../components/ui/theme-provider";
import { ConvexClientProvider } from "../components/web/ConvexClientProvider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jbMono = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devfolio | The Runtime Engine",
  description: "Advanced insights into AI/ML, Web Development, and Android Engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${outfit.variable} ${jbMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full bg-background relative overflow-x-hidden selection:bg-retro-red selection:text-white">
            
            {/* Left Structural Frame */}
            <aside className="hidden md:flex w-12 lg:w-16 xl:w-20 border-r border-border/40 fixed inset-y-0 left-0 flex-col items-center justify-between py-12 z-50 bg-background/50 backdrop-blur-sm pointer-events-none">
                <div className="w-px h-24 bg-linear-to-b from-retro-red to-transparent" />
                <p className="[writing-mode:vertical-lr] rotate-180 font-mono text-[9px] tracking-[0.3em] text-foreground/40 uppercase">
                    Sys. Structure
                </p>
                <div className="w-px h-24 bg-linear-to-t from-deco-gold to-transparent" />
            </aside>

            {/* Right Structural Frame */}
            <aside className="hidden md:flex w-12 lg:w-16 xl:w-20 border-l border-border/40 fixed inset-y-0 right-0 flex-col items-center justify-between py-12 z-50 bg-background/50 backdrop-blur-sm pointer-events-none">
                <div className="w-px h-24 bg-linear-to-b from-deco-gold to-transparent" />
                <p className="[writing-mode:vertical-lr] font-mono text-[9px] tracking-[0.3em] text-foreground/40 uppercase">
                    Runtime 01—26
                </p>
                <div className="w-px h-24 bg-linear-to-t from-retro-red to-transparent" />
            </aside>
            
            {/* Main Content */}
            <main className="flex-1 w-full md:pl-12 lg:pl-16 xl:pl-20 md:pr-12 lg:pr-16 xl:pr-20 relative">
              <ConvexClientProvider>{children}</ConvexClientProvider>
            </main>

          </div>
          <Toaster closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

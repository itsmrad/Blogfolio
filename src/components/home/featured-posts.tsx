"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from "framer-motion";
import Image from 'next/image';

interface Post {
    _id: string;
    _creationTime: number;
    title: string;
    body: string;
    authorId: string;
    imageStorageId?: string;
    imageUrl: string | null;
}

interface FeaturedPostsProps {
    posts: Post[];
}

export const FeaturedPosts = ({ posts }: FeaturedPostsProps) => {
    const root = useRef<HTMLDivElement>(null);
    const isInView = useInView(root, { once: true, margin: "-10%" });

    if (!posts || posts.length === 0) return null;

    const featuredPost = posts[0];
    const sidePosts = posts.slice(1, 4);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
      <section ref={root} className="w-full max-w-7xl mx-auto py-32 px-6 md:px-12 relative bg-transparent">
         {/* Title area */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col md:flex-row justify-between items-end border-b border-border/40 pb-8 mb-16 relative"
         >
           <div>
             <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-deco-gold mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-deco-gold" />
                Curated Reading
             </h3>
             <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter">Featured Logs.</h2>
           </div>
           <Link href="/blog" className="hidden md:flex items-center gap-4 font-mono text-xs tracking-widest uppercase hover:text-retro-red transition-colors group">
             <span className="border-b border-transparent group-hover:border-retro-red transition-colors pb-1">View Full Archive</span>
             <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-retro-red group-hover:bg-retro-red/10 transition-all">
                +
             </div>
           </Link>
         </motion.div>

         <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8"
         >
            {/* Primary Featured Post (Span 7) */}
            {featuredPost && (
                <Link href={`/blog/${featuredPost._id}`} className="lg:col-span-7 group flex flex-col relative outline-none">
                    <motion.div variants={itemVariants} className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-card/20 border border-border/20 mb-8">
                        {featuredPost.imageUrl ? (
                            <Image 
                                src={featuredPost.imageUrl} 
                                alt={featuredPost.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-card/40 to-background flex items-center justify-center">
                                <span className="font-mono text-4xl text-foreground/10 uppercase tracking-widest -rotate-45 select-none pointer-events-none">No Signal</span>
                            </div>
                        )}
                        <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 pointer-events-none" />
                        <div className="absolute top-6 left-6 bg-background/80 backdrop-blur-md px-4 py-2 font-mono text-[10px] tracking-widest uppercase border border-border/50">
                            LATEST ENTRY
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col px-2">
                        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-foreground/50 mb-4 uppercase">
                            <span>SYS. {new Date(featuredPost._creationTime).getFullYear()}</span>
                            <div className="w-1 h-1 bg-retro-red rounded-full" />
                            <span>INDEX: 01</span>
                        </div>
                        <h3 className="font-heading text-3xl md:text-5xl font-bold leading-tight group-hover:text-retro-red transition-colors duration-500 mb-6">
                            {featuredPost.title}
                        </h3>
                        {featuredPost.body && (
                            <p className="font-mono text-sm text-foreground/60 leading-relaxed max-w-xl line-clamp-3">
                                {featuredPost.body.replace(/[#*`_~\[\]]/g, '').substring(0, 150)}...
                            </p>
                        )}
                    </motion.div>
                </Link>
            )}

            {/* Side Posts List (Span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-0 border-t lg:border-t-0 border-border/40 pt-8 lg:pt-0">
                {sidePosts.map((post, i) => (
                    <motion.div variants={itemVariants} key={post._id} className="h-full border-b border-border/40 last:border-b-0">
                        <Link 
                            href={`/blog/${post._id}`} 
                            className="group flex flex-col justify-center h-full py-8 relative overflow-hidden outline-none"
                        >
                            <div className="absolute inset-0 bg-foreground/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            
                            <div className="relative z-10 flex flex-col w-full px-4">
                                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-foreground/40 mb-4 uppercase">
                                    <span>INDEX: {(i + 2).toString().padStart(2, '0')}</span>
                                    <span>SYS. {new Date(post._creationTime).getFullYear()}</span>
                                </div>
                                <h3 className="font-heading text-2xl md:text-3xl font-bold leading-tight group-hover:text-retro-red transition-colors duration-300">
                                    {post.title}
                                </h3>
                                
                                <div className="mt-6 flex items-center gap-4 text-xs font-mono tracking-widest text-foreground/50 group-hover:text-foreground transition-colors">
                                    <span>READ LOG</span>
                                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
                
                {sidePosts.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full py-12 border-b border-border/40">
                        <p className="font-mono text-xs tracking-widest text-foreground/40 uppercase">Awaiting further logs...</p>
                    </div>
                )}
            </div>
         </motion.div>
         
         <Link href="/blog" className="md:hidden mt-16 flex items-center justify-center gap-4 font-mono text-xs tracking-widest uppercase hover:text-retro-red transition-colors group w-full border border-border py-4">
            View Full Archive <span className="transform group-hover:translate-x-2 transition-transform">&rarr;</span>
         </Link>
      </section>
    );
};

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
// We don't have the date-fns import, so we stick to native Date parsing

interface PostCardProps {
  post: any;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = post._creationTime 
    ? new Date(post._creationTime).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) 
    : 'Recently';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hover"
      className={`group relative flex flex-col ${featured ? "md:flex-row md:col-span-2 lg:col-span-3 items-center gap-8 md:gap-16" : "gap-6"} w-full`}
    >
      <div className={`relative w-full overflow-hidden bg-muted ${featured ? "md:w-3/5 aspect-video md:aspect-21/9 rounded-sm" : "aspect-4/3 rounded-sm"}`}>
        <motion.div
          variants={{
            hover: { scale: 1.05 }
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="w-full h-full relative"
        >
          <Image
            src={post.imageUrl ?? "https://images.unsplash.com/photo-1765238358559-81dd5b57c094?q=80&w=3687&auto=format&fit=crop"}
            fill
            alt={post.title}
            className="object-cover"
          />
          <motion.div 
             variants={{ hover: { opacity: 0.2 } }}
             initial={{ opacity: 0 }}
             className="absolute inset-0 bg-black transition-opacity"
          />
        </motion.div>
      </div>

      <div className={`flex flex-col flex-1`}>
        <div className="flex items-center gap-4 mb-4 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          <span>{formattedDate}</span>
          <span className="w-8 h-px bg-border/60" />
          <span>Editorial</span>
        </div>
        
        <Link href={`/blog/${post._id}`} className="block group-hover:text-retro-red transition-colors">
          <h2 className={`font-heading tracking-tight mb-4 leading-tight ${featured ? "text-4xl md:text-5xl lg:text-6xl font-extrabold" : "text-2xl font-bold"}`}>
            {post.title}
          </h2>
        </Link>
        
        <p className={`text-muted-foreground font-sans ${featured ? "text-lg md:text-xl max-w-xl" : "text-base line-clamp-3"}`}>
          {post.body}
        </p>
        
        <div className="mt-8 flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase">
          <Link href={`/blog/${post._id}`} className="flex items-center gap-2 group-hover:text-retro-red transition-colors">
            <span>Read Publication</span>
            <motion.div
              variants={{
                hover: { width: "32px" }
              }}
              className="w-4 h-0.5 bg-retro-red origin-left"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

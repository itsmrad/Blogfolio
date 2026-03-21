import { fetchQuery } from "convex/nextjs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { cacheLife, cacheTag } from "next/cache";
import { BlogArt } from "@/components/blog/blog-art";
import { PostCard } from "@/components/blog/post-card";
import { CinematicHeader } from "@/components/blog/cinematic-header";

export default function blogPage() {
  return (
    <div className="relative min-h-screen">
      <BlogArt />
      
      <div className="pt-16 md:pt-24 pb-24 md:pb-32 max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full overflow-hidden">
        <CinematicHeader title="Archive 01—26" subtitle="Intermediate to advanced insights on AI/ML, Web, and Android." />
        
        <div className="mt-16 md:mt-24">
          <Suspense fallback={<SkeletonLoadingUi />}>
            <LoadBlogList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

const LoadBlogList = async () => {
  "use cache"
  cacheLife("hours")
  cacheTag("blog")
  
  const data = await fetchQuery(api.posts.getPosts);
  
  if (!data || data.length === 0) {
    return (
      <div className="w-full text-center py-32 border-t border-border/40">
         <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">No publications found.</p>
      </div>
    );
  }

  const [featuredPost, ...standardPosts] = data;

  return (
    <div className="grid gap-y-24 gap-x-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
      {featuredPost && (
        <PostCard post={featuredPost} featured={true} />
      )}
      
      {standardPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

const SkeletonLoadingUi = () => {
  return (
    <div className="grid gap-y-24 gap-x-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
      {/* Featured skeleton */}
      <div className="md:col-span-2 lg:col-span-3 flex flex-col md:flex-row gap-8 md:gap-16 w-full items-center">
         <Skeleton className="w-full md:w-3/5 aspect-video md:aspect-21/9 rounded-sm" />
         <div className="flex-1 space-y-6 w-full">
           <Skeleton className="h-4 w-32" />
           <Skeleton className="h-16 w-full" />
           <Skeleton className="h-12 w-3/4" />
         </div>
      </div>
      {/* Standard skeletons */}
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex flex-col space-y-6">
          <Skeleton className="aspect-4/3 w-full rounded-sm" />
          <div className="flex flex-col space-y-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

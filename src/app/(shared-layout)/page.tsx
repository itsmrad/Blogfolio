import { Suspense } from 'react';
import { fetchQuery } from 'convex/nextjs';
import { cacheLife, cacheTag } from 'next/cache';
import { MinimalistHero } from '@/components/home/hero';
import { StatsMarquee } from '@/components/home/stats-marquee';
import { TopicPills } from '@/components/home/topic-pills';
import { FeaturedPosts } from '@/components/home/featured-posts';
import { BentoGrid } from '@/components/home/bento';
import { TestimonialQuote } from '@/components/home/testimonials';
import { Newsletter } from '@/components/home/newsletter';
import { Footer } from '@/components/home/footer';
import { api } from '@/convex/_generated/api';

async function FeaturedPostsLoader() {
  'use cache';
  cacheLife('minutes');
  cacheTag('featured-posts');

  const posts = await fetchQuery(api.posts.getPosts);
  return <FeaturedPosts posts={posts} />;
}

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen relative bg-background overflow-x-hidden">
      <MinimalistHero />
      <StatsMarquee />
      
      <TestimonialQuote 
        quote="Talk is cheap. Show me the code." 
        author="— Linus Torvalds" 
      />
      
      <TopicPills />
      <Suspense fallback={null}>
        <FeaturedPostsLoader />
      </Suspense>
      
      <TestimonialQuote 
        quote="Simplicity is prerequisite for reliability." 
        author="— Edsger W. Dijkstra" 
        align="right"
      />
      
      <BentoGrid />

      <TestimonialQuote 
        quote="Measuring programming progress by lines of code is like measuring airplane building progress by weight." 
        author="— Bill Gates" 
      />

      <Newsletter />
      
      <Footer />
    </div>
  );
}

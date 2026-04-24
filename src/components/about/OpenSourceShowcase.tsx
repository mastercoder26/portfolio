'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useScrollDots } from '@/hooks/useScrollDots';
import type { GitHubData } from '@/hooks/useGithub';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  githubData: GitHubData | null;
  isLoading: boolean;
  error: string | null;
}

export default function OpenSourceShowcase({
  githubData,
  isLoading,
  error
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const repos = githubData?.repos ?? [];
  const DOT_COUNT = Math.min(repos.length, 5);

  const { activeDot, showDots } = useScrollDots(scrollRef, {
    dotCount: DOT_COUNT,
    axis: 'x',
    dependencies: [repos.length]
  });

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollRef.current;
    if (!container || !scrollContainer || repos.length === 0) return;

    const ctx = gsap.context(() => {
      const cards = scrollContainer.children;
      gsap.fromTo(
        cards,
        { opacity: 0, x: 60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            once: true
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, [repos.length]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Open Source</h2>
          <p className="text-xs text-foreground/50">Templates & repos</p>
        </div>
        <Link
          href="https://github.com/mastercoder26"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 rounded-full border border-foreground/10 px-2.5 py-1 text-[11px] text-foreground/70 transition-all hover:border-foreground/30 hover:text-foreground"
        >
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          View all
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      {/* Loading skeleton */}
      {(isLoading || error) && (
        <div className="scrollbar-hide -mx-2 flex gap-3 overflow-x-hidden px-2 pb-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[200px] max-w-[220px] shrink-0 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4"
            >
              <div className="mb-2 h-3 w-24 rounded bg-foreground/10" />
              <div className="mb-1 h-2 w-full rounded bg-foreground/5" />
              <div className="mb-3 h-2 w-3/4 rounded bg-foreground/5" />
              <div className="flex gap-1">
                <div className="h-4 w-12 rounded-full bg-foreground/5" />
                <div className="h-4 w-10 rounded-full bg-foreground/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Horizontal scrolling cards */}
      {!isLoading && !error && repos.length > 0 && (
        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-2 flex snap-x snap-mandatory gap-3 overflow-x-auto px-2 pb-2"
        >
          {repos.map((repo, index) => {
            const isFeatured =
              index === 0 ||
              repo.stars === Math.max(...repos.map((r) => r.stars));
            const tags =
              repo.topics.length > 0
                ? repo.topics.slice(0, 3)
                : repo.language
                ? [repo.language.name]
                : [];

            return (
              <Link
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex min-w-[200px] max-w-[220px] shrink-0 snap-start flex-col rounded-xl border p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                  isFeatured
                    ? 'border-primary/30 bg-primary/[0.03] ring-1 ring-primary/10'
                    : 'border-foreground/10 bg-foreground/[0.02]'
                }`}
              >
                {isFeatured && (
                  <span className="absolute right-3 top-3 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    Featured
                  </span>
                )}

                <div className="mb-2 flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-foreground/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  <span className="font-mono text-xs font-semibold text-foreground">
                    {repo.name}
                  </span>
                </div>

                <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-foreground/60">
                  {repo.description ?? 'No description provided.'}
                </p>

                <div className="mt-auto flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-foreground/10 bg-foreground/5 px-2 py-0.5 text-[10px] font-medium text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {repo.language && (
                    <div className="flex shrink-0 items-center gap-1">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: repo.language.color ?? '#888'
                        }}
                      />
                      <span className="text-[10px] text-foreground/50">
                        {repo.language.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Hover arrow */}
                <div
                  className={`absolute opacity-0 transition-opacity group-hover:opacity-100 ${
                    isFeatured ? 'right-3 top-9' : 'right-3 top-3'
                  }`}
                >
                  <svg
                    className="h-3.5 w-3.5 text-foreground/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {showDots && repos.length > 0 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: DOT_COUNT }).map((_, index) => (
            <span
              key={`opensource-dot-${index}`}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                index === activeDot ? 'bg-foreground/70' : 'bg-foreground/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

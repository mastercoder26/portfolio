'use client';

import React from 'react';
import Link from 'next/link';
import { useGitHub, Repo } from '@/hooks/useGithub';
import { Star, GitFork } from 'lucide-react';

export default function CompactGitHubWidget() {
  const { githubData, isLoading, error } = useGitHub();

  if (error) return null;

  if (isLoading || !githubData) {
    return (
      <div className="rounded-xl border border-foreground/10 bg-white p-4 shadow-sm">
        <div className="mb-3 h-4 w-24 rounded bg-foreground/10" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-full rounded bg-foreground/5" />
          ))}
        </div>
      </div>
    );
  }

  const repos: Repo[] = githubData.repos ?? [];

  return (
    <div className="rounded-xl border border-foreground/10 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-foreground"
            fill="currentColor"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <h4 className="text-sm font-semibold text-foreground">GitHub</h4>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-xs text-foreground/60">
            {githubData.totalContributions.toLocaleString()} this year
          </span>
        </div>
      </div>

      {/* Repo list */}
      <div className="flex flex-col divide-y divide-foreground/5">
        {repos.map((repo) => (
          <Link
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-0.5 py-2.5 transition-opacity hover:opacity-80"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-xs font-semibold text-foreground transition-colors group-hover:text-primary">
                {repo.name}
              </span>
              <div className="flex shrink-0 items-center gap-2.5 text-foreground/50">
                {repo.stars > 0 && (
                  <span className="flex items-center gap-0.5 text-[10px]">
                    <Star className="h-2.5 w-2.5" />
                    {repo.stars}
                  </span>
                )}
                {repo.forks > 0 && (
                  <span className="flex items-center gap-0.5 text-[10px]">
                    <GitFork className="h-2.5 w-2.5" />
                    {repo.forks}
                  </span>
                )}
              </div>
            </div>

            {repo.description && (
              <p className="truncate text-[10px] text-foreground/50">
                {repo.description}
              </p>
            )}

            {repo.language && (
              <div className="flex items-center gap-1 pt-0.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: repo.language.color ?? '#888' }}
                />
                <span className="text-[10px] text-foreground/50">
                  {repo.language.name}
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-2 border-t border-foreground/5 pt-2">
        <Link
          href="https://github.com/AkhilKonduru1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-foreground/40 transition-colors hover:text-foreground/70"
        >
          View all repos →
        </Link>
      </div>
    </div>
  );
}

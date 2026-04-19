import { useEffect, useState } from 'react';

interface ContributionDay {
  date: string;
  count: number;
}

interface RepoLanguage {
  name: string;
  color: string;
}

export interface Repo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  isArchived: boolean;
  language: RepoLanguage | null;
  updatedAt: string;
  topics: string[];
}

export interface GitHubData {
  contributions: ContributionDay[];
  totalContributions: number;
  restrictedContributions: number;
  name: string;
  repos: Repo[];
}

export const useGitHub = () => {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/github-activity');
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }
        const data = await response.json();
        setGithubData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return { githubData, isLoading, error };
};

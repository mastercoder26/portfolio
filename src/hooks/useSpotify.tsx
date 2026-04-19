'use client';

import { useEffect, useState } from 'react';

export interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
}
export const useSpotify = () => {
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);
  const [topArtists, setTopArtists] = useState<SpotifyTrack[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopTracks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/spotify-top-tracks');
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          const msg =
            typeof data.error === 'string'
              ? data.error
              : `Failed to fetch top tracks (${response.status})`;
          throw new Error(msg);
        }
        setTopTracks(data.topTracks ?? []);
        setTopArtists(data.topArtists ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopTracks();
  }, []);

  return { topTracks, topArtists, isLoading, error };
};

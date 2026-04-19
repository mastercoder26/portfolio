import { NextResponse } from 'next/server';

/** Node runtime: Buffer + stable HTTPS for Spotify token + Web API. */
export const runtime = 'nodejs';

const CALM_SONGS = [
  'End of Beginning Djo',
  'White Ferrari Frank Ocean',
  'Dark Red Steve Lacy',
  'Lovers Rock TV Girl',
  '505 Arctic Monkeys',
  'Cinnamon Girl Lana Del Rey',
  'Japanese Denim Daniel Caesar',
  'Hotel California Joji',
  'Is There Someone Else The Weeknd',
  'No One Noticed The Marias'
];

type SpotifySearchTrack = {
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
  external_urls: { spotify: string };
};

type SpotifySearchResponse = {
  tracks?: { items: SpotifySearchTrack[] };
};

async function getClientCredentialsToken(
  clientId: string,
  clientSecret: string
): Promise<string> {
  const body = new URLSearchParams({ grant_type: 'client_credentials' });
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Spotify token request failed (${res.status}): ${text.slice(0, 200)}`
    );
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error('Spotify token response missing access_token');
  }
  return data.access_token;
}

async function searchTrack(
  accessToken: string,
  query: string
): Promise<SpotifySearchTrack | null> {
  const params = new URLSearchParams({
    q: query,
    type: 'track',
    limit: '1'
  });

  const res = await fetch(
    `https://api.spotify.com/v1/search?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Spotify search failed (${res.status}) for "${query}": ${text.slice(0, 200)}`
    );
  }

  const json = (await res.json()) as SpotifySearchResponse;
  const item = json.tracks?.items?.[0];
  return item ?? null;
}

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID?.trim();
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      {
        error:
          'Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET. Add both in the Vercel project Environment Variables (not NEXT_PUBLIC_*).'
      },
      { status: 503 }
    );
  }

  try {
    const accessToken = await getClientCredentialsToken(clientId, clientSecret);

    const results = await Promise.all(
      CALM_SONGS.map((query) => searchTrack(accessToken, query))
    );

    const formattedTracks = results
      .filter(Boolean)
      .map((track) => ({
        name: track!.name,
        artist: track!.artists[0]?.name ?? 'Unknown artist',
        album: track!.album.name,
        url: track!.external_urls.spotify,
        albumArt: track!.album.images[0]?.url ?? null
      }));

    if (formattedTracks.length === 0) {
      return NextResponse.json(
        { error: 'Spotify search returned no tracks for the configured queries.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      topTracks: formattedTracks,
      topArtists: []
    });
  } catch (error) {
    console.error('Error fetching Spotify tracks:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to fetch Spotify data';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

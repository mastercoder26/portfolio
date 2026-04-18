import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

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

export async function GET() {
  try {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    });

    const tokenData = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(tokenData.body['access_token']);

    const results = await Promise.all(
      CALM_SONGS.map((query) => spotifyApi.searchTracks(query, { limit: 1 }))
    );

    const formattedTracks = results
      .map((result) => result.body.tracks?.items[0])
      .filter(Boolean)
      .map((track) => ({
        name: track!.name,
        artist: track!.artists[0].name,
        album: track!.album.name,
        url: track!.external_urls.spotify,
        albumArt: track!.album.images[0]?.url ?? null
      }));

    return NextResponse.json({
      topTracks: formattedTracks,
      topArtists: []
    });
  } catch (error) {
    console.error('Error fetching Spotify tracks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
}

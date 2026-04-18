import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
});

const CHILL_PLAYLIST_ID = '37i9dQZF1EIfH4we62RxMe';

export async function GET() {
  try {
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body['access_token']);

    const [topArtists, playlistTracks] = await Promise.all([
      spotifyApi.getMyTopArtists({ limit: 25 }),
      spotifyApi.getPlaylistTracks(CHILL_PLAYLIST_ID, { limit: 10 })
    ]);

    const formattedArtists = topArtists.body.items.map((artist) => ({
      name: artist.name,
      url: artist.external_urls.spotify,
      images: artist.images
    }));

    const formattedTracks = playlistTracks.body.items
      .filter((item) => item.track && item.track.type === 'track')
      .map((item) => {
        const track = item.track as SpotifyApi.TrackObjectFull;
        return {
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          url: track.external_urls.spotify,
          albumArt: track.album.images[0]?.url ?? null
        };
      });

    return NextResponse.json({
      topArtists: formattedArtists,
      topTracks: formattedTracks
    });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
}

export interface SpotifyToken {
  token: string;
  token_expirationDate: number;
}

export interface SpotifyAlbumImage {
  height: number;
  width: number;
  url: string;
}

export interface SpotifyTrack {
  id: string;
  album: {
    images: Array<SpotifyAlbumImage>
  };
  artists: Array<SpotifyArtist>;
  name: string;
  external_urls: {
      spotify: string;
    };
  duration_ms: number;
}

export interface SpotifyFormattedTrack {
  artist: string;
  duration: string;
  id: string;
  image: string;
  link: string;
  trackName: string;
}

export interface SpotifyArtist {
  name: string;
}

export interface SpotifySearchTrackResponse {
  tracks: {
    items: Array<SpotifyTrack>
  };
}


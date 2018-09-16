import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SpotifyArtist, SpotifySearchTrackResponse, SpotifyTrack} from '../models/spotify.model';


@Injectable()
export class SpotifyService {
  private spotifyBasePath = 'https://api.spotify.com/v1/';
  private spotifyAcountsPath = 'https://us-central1-wed-nvttn-roccar.cloudfunctions.net/getSpotifyToken';

  private searchTrackFormatter = (track: SpotifyTrack) => {
    console.log({track});
    return {
      id: track.id,
      artist: track.artists
                .reduce((acc, artist) => {
                  return acc + (!!acc) ? ' & ' : '' + artist.name;
                }, ''),
      trackName: track.name,
      image: track.album.images
                .reduce((acc, image) => {
                  return acc.height < image.height
                    ? acc
                    : image;
                }, {height: 9999, url: '', width: 9999})
                .url,
      duration: track.duration,
      link: track.external_urls.spotify
    };
  }

  constructor(private http: HttpClient) { }

  searchSong(token: string, searchParams: string) {
    return this.http.get(`${this.spotifyBasePath}search`, {
      params: {
        q: searchParams,
        type: 'track'
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).map((searchTrack: SpotifySearchTrackResponse) => {
      return searchTrack.tracks.items.map(this.searchTrackFormatter);
    });
  }

  getToken(functionCallback?: Function) {
    // return this.http.get(this.spotifyAcountsPath).map(() => functionCallback);
    return this.http.get(this.spotifyAcountsPath).subscribe(resp => {
      console.log({resp});
    });
  }
}

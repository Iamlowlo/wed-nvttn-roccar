import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SpotifyArtist, SpotifySearchTrackResponse, SpotifyTrack} from '../models/spotify.model';
import * as moment from 'moment';


@Injectable()
export class SpotifyService {
  private spotifyBasePath = 'https://api.spotify.com/v1/';
  private spotifyAcountsPath = 'https://us-central1-wed-nvttn-roccar.cloudfunctions.net/getSpotifyToken';

  private searchTrackFormatter = (track: SpotifyTrack) => {
    return {
      id: track.id,
      artist: track.artists
                .reduce((acc, artist) => {
                  return acc + ((!!acc) ? ' & ' : '') + artist.name;
                }, ''),
      trackName: track.name,
      images: track.album.images
                .reduce((acc, image) => {
                  const xs = acc.xs.height < image.height
                    ? acc.xs
                    : image;
                  const xl = image.height !== 300
                    ? acc.xl
                    : image;
                  return {xs, xl};
                }, {
                  xs: {
                    height: 9999,
                    width: 9999,
                    url: ''
                  },
                  xl: {
                    height: 0,
                    width: 0,
                    url: ''
                  }
                }),
      duration: moment(track.duration_ms).format('m:ss'),
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
    return this.http.get(this.spotifyAcountsPath).map(resp => {
      console.log({resp});
      return functionCallback;
    });
    // return this.http.get(this.spotifyAcountsPath).subscribe(resp => {
    //   console.log({resp});
    // });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SpotifyArtist, SpotifySearchTrackResponse, SpotifyTrack} from '../models/spotify.model';
import * as moment from 'moment';
import * as _ from 'lodash';


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
      images: _.orderBy(track.album.images, ['height'], ['asc'])
                .reduce((acc, image, index, total) => {
                  switch (index) {
                      case 0:
                        return {...acc, xs: image};
                      case 1:
                        return {
                            ...acc,
                            md: image,
                            xl: total.length === 2
                                ? image
                                : acc.xl
                        };
                      case 2:
                        return {...acc, xl: image};
                      default:
                          return acc;
                  }
                }, {
                  xs: {
                    height: 0,
                    width: 0,
                    url: ''
                  },
                  md: {
                    height: 0,
                    width: 0,
                    url: ''
                  },
                  xl: {
                    height: 0,
                    width: 0,
                    url: ''
                  }
                }),
      duration: moment(track.duration_ms).format('m:ss'),
      duration_ms: track.duration_ms,
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

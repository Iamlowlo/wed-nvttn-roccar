import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class SpotifyService {
  private spotifyBasePath = 'https://api.spotify.com/v1/';
  private spotifyToken = 'BQCTSzrUDOG17G7dPk8sbBb0iwk0q1R0NRRvA1ro50SkSt7rhWz_bUO_' +
                         'gPtTDj65s5FoGTa76gy0r73bf4jVCfnF4O0L-6f8ZstKQ9HIe8xf-DQ6' +
                         'VE9vmp_AOcgxmMR6cWBDlChEcAEn_Ib-mA';

  constructor(private http: HttpClient) { }

  searchSong(searchParams: string) {
    return this.http.get(`${this.spotifyBasePath}search`, {
      params: {
        q: searchParams,
        type: 'track'
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.spotifyToken}`
      }
    });
  }
}

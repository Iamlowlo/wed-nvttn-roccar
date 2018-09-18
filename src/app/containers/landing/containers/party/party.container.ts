import {Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../../../app.animations';
import {FormControl, FormGroup} from '@angular/forms';
import {SpotifyService} from '../../../../services/spotify.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import {SpotifyFormattedTrack, SpotifyToken} from '../../../../models/spotify.model';
import * as moment from 'moment';
import * as _ from 'lodash';
import {User} from '../../../../models/user.model';

@Component({
  selector: 'app-party',
  templateUrl: './party.container.html',
  styleUrls: ['./party.container.scss'],
  animations: [routerTransition]
})
export class PartyContainer implements OnInit, OnDestroy {
  @HostBinding('@routerTransition') public isLoaded = {value: '*', params: {duration: 800}};
  @ViewChild('audio') audio: ElementRef;
  @ViewChild('galleryContainer') galleryContainer: ElementRef;
  private isPlayingAudio: Boolean = true;
  private subscriptions: Array<Subscription>;
  private spotifyTokenData: SpotifyToken;
  public partyAddress = {
    lat: 40.431543,
    lng: -3.702142
  };
  public searchForm = new FormGroup({
    song: new FormControl('')
  });
  public searchSongSuggestions: Array<SpotifyFormattedTrack>;
  public searchSuggestionsOpened: Boolean;
  public tracksPicked: Array<any>;
  private userTracksRoute: string;

  constructor(public db: AngularFireDatabase, public spotifyService: SpotifyService) {
    this.searchSongSuggestions = [];
    this.userTracksRoute = 'guests/' + window.localStorage.getItem('uid') + '/tracks';
    this.searchSuggestionsOpened = false;
    this.tracksPicked = [];
    this.spotifyTokenData = {} as SpotifyToken;
    this.subscriptions = [];
  }

  ngOnInit() {
    this.subscriptions.push(
      this.db.object('data/spotify')
        .valueChanges()
        .subscribe((spotifyData: SpotifyToken) => {
          if (moment().isAfter(spotifyData.token_expirationDate, 'second')) {
            this.spotifyService
              .getToken()
              .subscribe(functionCallback => {
                if (functionCallback) {
                  functionCallback();
                }
              });
          } else {
            this.spotifyTokenData = spotifyData;
          }
        }),
        this.db.object(this.userTracksRoute)
          .valueChanges()
          .subscribe((userTracks: Array<SpotifyFormattedTrack>) => {
            this.tracksPicked = !!userTracks && userTracks.length
              ? userTracks
              : [];
          })
    );
  }

  pauseMusic() {
    if (this.isPlayingAudio) {
      this.audio.nativeElement.pause();
    } else {
      this.audio.nativeElement.play();
    }
    this.isPlayingAudio = !this.isPlayingAudio;
  }

  galleryMove(direction: string) {
    const _galleryContainer = this.galleryContainer.nativeElement;
    const _galleryImages: Array<HTMLElement> = Array.from(_galleryContainer.children);
    const activeImageIdx = _galleryImages.findIndex((image: HTMLElement) => {
      return image.offsetLeft > _galleryContainer.scrollLeft;
    });
    let goToIdx: number;

    if (direction === 'prev') {
      goToIdx = activeImageIdx > 1
       ? _galleryImages[activeImageIdx - 1].offsetLeft === _galleryContainer.scrollLeft
          ? activeImageIdx - 2
          : activeImageIdx - 1
       : activeImageIdx === -1
          ? _galleryImages.length - 2
          : 0;
    }
    if (direction === 'next') {
      goToIdx = activeImageIdx <= _galleryImages.length - 1 && activeImageIdx !== -1
        ? activeImageIdx
        : _galleryImages.length - 1;
    }
    _galleryContainer.scroll(_galleryImages[goToIdx].offsetLeft, 0);
  }

  onFocus($event) {
    $event.target.classList.add('ng-focused');
  }

  onBlur($event) {
    $event.target.classList.remove('ng-focused');
  }

  pickTrack(track) {
    this.searchSuggestionsOpened = false;
    if (!this.tracksPicked.filter(_track => _track.id === track.id).length) {
      this.tracksPicked.push(track);
      this.db.database.ref()
          .update({
            [this.userTracksRoute]: this.tracksPicked
          })
          .then(res => {
            // console.log('database updated');
          })
          .catch(err => {
            // console.error({err});
          });
    }
  }

  removeTrack(track) {
    this.db.database.ref()
        .update({
          [this.userTracksRoute]: this.tracksPicked.filter(_track => track.id !== _track.id)
        })
        .then(res => {
          // console.log('database updated');
        })
        .catch(err => {
          // console.error({err});
        });
  }

  searchSong(searchValue: string) {
    if (!searchValue && !this.searchForm.controls.song.value) {
      return false;
    }
    if (moment().isAfter(this.spotifyTokenData.token_expirationDate, 'second')) {
      this.spotifyService.getToken(_.bind(this.searchSong, this.searchForm.controls.song.value));
    } else {
      this.searchSuggestionsOpened = true;
      this.searchSongSuggestions = [];
      this.spotifyService
        .searchSong(this.spotifyTokenData.token, searchValue || this.searchForm.controls.song.value)
        .subscribe((results: Array<SpotifyFormattedTrack>) => {
          this.searchSongSuggestions = results;
        });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}


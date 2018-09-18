import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../models/user.model';
import * as _ from 'lodash';
import {AngularFireDatabase} from 'angularfire2/database';
import {SpotifyFormattedTrack} from '../../models/spotify.model';
import {dropDown} from '../../app.animations';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.container.html',
  styleUrls: ['../admin/admin.component.scss'],
  animations: [dropDown]
})
export class PlaylistContainer implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription>;
  public attendeeDataList: Array<User>;
  public nonAttendeeDataList: Array<User>;
  public nonAttendeeOpened: Boolean;
  public attendeeOpened: Boolean;
  public suggestedTracks: Array<SpotifyFormattedTrack>;

  constructor(private db: AngularFireDatabase) {
    this.subscriptions = [];
    this.attendeeDataList = [];
    this.nonAttendeeDataList = [];
    this.nonAttendeeOpened = false;
    this.attendeeOpened = false;
    this.suggestedTracks = [];

    this.subscriptions.push(
      this.db
        .list('guests')
        .valueChanges()
        .subscribe((userDataList: Array<User>) => {
          const _userDataList = userDataList
            .filter(user => !!user.party && (!user.rsvp || !!user.rsvp.party));
          _.sortBy(_userDataList, ['rsvp', 'name', 'email']).forEach(user => {
            if (user.rsvp && user.rsvp.party) {
              this.attendeeDataList.push(user);
            } else {
              this.nonAttendeeDataList.push(user);
            }
          });
          let suggestedTracks = [];
          _userDataList.filter(user => !!user.tracks)
            .forEach(user => {
              suggestedTracks = suggestedTracks.concat(user.tracks);
            })
          this.suggestedTracks = suggestedTracks.reduce((acc, track: SpotifyFormattedTrack) => {
            const trackIndex = acc.findIndex(_track => _track.id === track.id);
            if (trackIndex >= 0) {
              acc[trackIndex].occurrences = acc[trackIndex].occurrences + 1;
            } else {
              acc.push({...track, occurrences: 1});
            }
            return acc;
          }, []);
        })
    );
  }

  ngOnInit() {
  }

  toggleNonAttendee() {
    this.nonAttendeeOpened = !this.nonAttendeeOpened;
  }

  toggleAttendee() {
    this.attendeeOpened = !this.attendeeOpened;
  }

  addTrackToPlaylist(trackId: string) {
    console.log(trackId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

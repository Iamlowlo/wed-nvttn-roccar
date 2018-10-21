import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../models/user.model';
import * as _ from 'lodash';
import {AngularFireDatabase} from 'angularfire2/database';
import {SpotifyFormattedTrack, SpotifyToken} from '../../models/spotify.model';
import {dropDown} from '../../app.animations';
import * as moment from 'moment';
import {SpotifyService} from '../../services/spotify.service';
import {Router} from '@angular/router';

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
  public totalTime: string;
  private spotifyTokenData;

  constructor(private db: AngularFireDatabase, private spotifyService: SpotifyService, private router: Router) {
    this.subscriptions = [];
    this.attendeeDataList = [];
    this.nonAttendeeDataList = [];
    this.nonAttendeeOpened = false;
    this.attendeeOpened = false;
    this.suggestedTracks = [];
    this.totalTime = '';
    this.spotifyTokenData = JSON.parse(window.localStorage.getItem('spotifyTokenData'));

    if (!!this.spotifyTokenData && moment().diff(this.spotifyTokenData.expirationDate) < 0) {
    } else if (window.location.hash) {
      const _spotifyTokenData: any = window.location.hash
        .substring(1)
        .split('&')
        .reduce((acc, param) => {
          if (param) {
            const parts = param.split('=');
            acc[parts[0]] = decodeURIComponent(parts[1]);
          }
          return acc;
        }, {});
      this.spotifyTokenData = {
        token: _spotifyTokenData.access_token,
        expirationDate: moment().add(3600, 's').valueOf(),
      };
      window.localStorage.setItem('spotifyTokenData', JSON.stringify(this.spotifyTokenData));
      this.router.navigate(['/admin/playlist']);
    } else {
      this.spotifyService.getUserToken();
    }

    this.subscriptions.push(
      this.db
        .list('guests')
        .snapshotChanges()
        .subscribe((userDataList: Array<any>) => {
          this.attendeeDataList = [];
          this.nonAttendeeDataList = [];
          const _userDataList = userDataList
            .map(userAction => ({
              ...userAction.payload.val(),
              id: userAction.key
            }))
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
              suggestedTracks = suggestedTracks.concat(user.tracks.map(_track => ({
                ..._track,
                userName: user.name,
                userIds: [user.id]
              })));
            });
          this.suggestedTracks = _.orderBy(suggestedTracks.reduce((acc, track: SpotifyFormattedTrack) => {
            const trackIndex = acc.findIndex(_track => _track.id === track.id);
            if (trackIndex >= 0) {
              acc[trackIndex].occurrences = acc[trackIndex].occurrences + 1;
              acc[trackIndex].userName = `${acc[trackIndex].userName} / ${track.userName}`;
              acc[trackIndex].userIds = [...acc[trackIndex].userIds, ...track.userIds];
            } else {
              acc.push({...track, occurrences: 1});

            }
            return acc;
          }, []), ['occurrences'], ['desc']);
          this.totalTime = moment()
            .startOf('day')
            .add(this.suggestedTracks.reduce((acc, track) => track.duration_ms + acc, 0), 'ms')
            .format('HH:mm:ss');
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

  addTrackToPlaylist(track: SpotifyFormattedTrack) {
    if (track.isIncluded) {
      console.log('Already included');
    } else {
      this.spotifyService.addSongToPlaylist(this.spotifyTokenData.token, track.id)
        .subscribe(() => {
          track.userIds.forEach(userId => {
            const user = this.attendeeDataList.find(_user => _user.id === userId);
            const tracks = user && user.tracks ? user.tracks : [];
            this.db.object(`guests/${userId}/tracks`)
              .set(tracks
                .map(_track => _track.id === track.id
                  ? {..._track, isIncluded: true}
                  : _track
                  ));
          });
        });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

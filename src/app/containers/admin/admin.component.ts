import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as _ from 'lodash';
import {User} from '../../models/user.model';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public userDataList: Array<User>;
  public attendanceData;
  public nonAttendanceData;
  public nonRespondedData;
  private subscriptions: Array<Subscription>;
  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.attendanceData = {ceremony: 0, lunch: 0, party: 0};
    this.nonAttendanceData = {ceremony: 0, lunch: 0, party: 0};
    this.nonRespondedData = {ceremony: 0, lunch: 0, party: 0};
    this.subscriptions = [
      this.db
        .list('guests')
        .valueChanges()
        .subscribe((userDataList: Array<User>) => {
          this.userDataList = _.sortBy(userDataList, ['name', 'email']);
          this.attendanceData = userDataList.reduce((acc, userData) => {
            return {
              ceremony: userData.rsvp && userData.rsvp.ceremony
                ? acc.ceremony + 1
                : acc.ceremony,
              lunch: userData.rsvp && userData.rsvp.lunch
                ? acc.lunch + 1
                : acc.lunch,
              party: userData.rsvp && userData.rsvp.party
                ? acc.party + 1
                : acc.party
            };
          }, {ceremony: 0, lunch: 0, party: 0});
          this.nonAttendanceData = userDataList.reduce((acc, userData) => {
            return {
              ceremony: userData.rsvp && userData.rsvp.ceremony !== undefined && !userData.rsvp.ceremony
                ? acc.ceremony + 1
                : acc.ceremony,
              lunch: userData.rsvp && userData.rsvp.lunch !== undefined && !userData.rsvp.lunch
                ? acc.lunch + 1
                : acc.lunch,
              party: userData.rsvp && userData.rsvp.party !== undefined && !userData.rsvp.party
                ? acc.party + 1
                : acc.party
            };
          }, {ceremony: 0, lunch: 0, party: 0});
          this.nonRespondedData = userDataList.reduce((acc, userData) => {
            return {
              ceremony: !userData.rsvp || userData.rsvp.ceremony === undefined
                ? acc.ceremony + 1
                : acc.ceremony,
              lunch: userData.lunch && (!userData.rsvp || userData.rsvp.lunch === undefined)
                ? acc.lunch + 1
                : acc.lunch,
              party: userData.party && (!userData.rsvp || userData.rsvp.party === undefined)
                ? acc.party + 1
                : acc.party
            };
          }, {ceremony: 0, lunch: 0, party: 0});
          console.log(this.attendanceData);
        })
    ];
  }

  ngOnInit() {
  }

  sendEmailVerification(guestEmail) {
    console.log('EMAIL')
  }
}

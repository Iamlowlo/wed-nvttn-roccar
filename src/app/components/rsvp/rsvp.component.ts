import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../models/user.model';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  private activeRoute: string;
  private subscriptions: Array<Subscription>;
  public userData: User;
  private uid: string;
  private debounceFirebaseUpdate;
  public rsvpForm = new FormGroup({
    ceremony: new FormControl( '', Validators.required),
    lunch: new FormControl( {value: '', disabled: true}, Validators.required),
    party: new FormControl( {value: '', disabled: true}, Validators.required)
  });

  constructor(private router: Router, private db: AngularFireDatabase) {

    this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationEnd) {
        this.activeRoute = routerEvent.urlAfterRedirects;
        switch (this.activeRoute) {
          case '/landing/comida':
            console.log('Lunch');
            break;
          case '/landing/ceremonia':
            console.log('Ceremony');
            break;
          case '/landing/fiesta':
            console.log('Party');
            break;
        }
      }
    });

    this.uid = window.localStorage.getItem('uid');
    this.subscriptions = [
      this.db.object('guests/' + this.uid)
        .valueChanges()
        .subscribe((userData: User) => {
          this.userData = userData;
          this.rsvpForm.setValue({
            ceremony: userData.rsvp ? userData.rsvp.ceremony : null,
            lunch: userData.rsvp ? userData.rsvp.lunch : null,
            party: userData.rsvp ? userData.rsvp.party : null
          });
          this.rsvpForm.controls['lunch'][!this.userData.lunch ? 'disable' : 'enable']();
          this.rsvpForm.controls['party'][!this.userData.party ? 'disable' : 'enable']();
        }),
      this.rsvpForm.valueChanges.subscribe(form => {
        clearTimeout(this.debounceFirebaseUpdate);
        const updateData = Object.assign(
          {},
          form.hasOwnProperty('ceremony')
          && form.ceremony !== this.userData.rsvp.ceremony
          && form.ceremony !== null
            ? {[`/guests/${this.uid}/rsvp/ceremony`]: form.ceremony}
            : {},
          form.hasOwnProperty('lunch')
          && form.lunch !== this.userData.rsvp.lunch
          && form.lunch !== null
            ? {[`/guests/${this.uid}/rsvp/lunch`]: form.lunch}
            : {},
          form.hasOwnProperty('party')
          && form.party !== this.userData.rsvp.party
          && form.party !== null
            ? {[`/guests/${this.uid}/rsvp/party`]: form.party}
            : {});
        this.debounceFirebaseUpdate = setTimeout(() => {
          if (!!Object.keys(updateData).length) {
            this.db.database.ref().update(updateData)
              .then(resp => {
                console.log('resp', resp);
              })
              .catch(err => {
                console.log('err', err);
              });
          }
        }, 100);
      })
    ];

  }

  ngOnInit() {
  }
}


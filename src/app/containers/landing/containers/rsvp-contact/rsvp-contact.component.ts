import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from '../../../../models/user.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-rsvp-contact',
  templateUrl: './rsvp-contact.component.html',
  styleUrls: ['./rsvp-contact.component.scss']
})
export class RSVPContactComponent implements OnInit {
  private subscription: Subscription;
  public userData: User;
  public rsvpForm = new FormGroup({});

  constructor(private db: AngularFireDatabase) {
    this.subscription = this.db.object('guests/' + window.localStorage.getItem('uid'))
      .valueChanges()
      .subscribe((userData: User) => {
        this.userData = userData;
        console.log('userData', userData);
        const formControls = Object.assign({
          ceremony: new FormControl( '', Validators.required)
        },
          !!this.userData.lunch
          ? {
              lunch: new FormControl( '', Validators.required)
            }
          : {},
          !!this.userData.party
          ? {
              party: new FormControl( '', Validators.required)
            }
          : {});
        this.rsvpForm = new FormGroup( formControls);
      });
  }

  ngOnInit() {
  }

}

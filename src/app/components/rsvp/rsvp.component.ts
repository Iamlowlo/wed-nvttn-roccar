import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
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
export class RsvpComponent implements OnInit, OnChanges, OnDestroy {
  @Input() choiceAvailable: string;
  @Output() choiceChanged: EventEmitter<any> = new EventEmitter();
  private subscriptions: Array<Subscription>;
  public userData: User;
  private uid: string;
  private debounceFirebaseUpdate;
  public rsvpForm = new FormGroup({
    ceremony: new FormControl( {value: null, disabled: true}, Validators.required),
    lunch: new FormControl( {value: null, disabled: true}, Validators.required),
    party: new FormControl( {value: null, disabled: true}, Validators.required)
  });

  constructor(private db: AngularFireDatabase) {

    this.uid = window.localStorage.getItem('uid');
    this.subscriptions = [
      this.db.object('guests/' + this.uid)
        .valueChanges()
        .subscribe((userData: User) => {
          this.userData = userData;
          this.rsvpForm.setValue({
            ceremony: userData.rsvp && userData.rsvp.ceremony !== undefined ? userData.rsvp.ceremony : null,
            lunch: userData.rsvp && userData.rsvp.lunch !== undefined ? userData.rsvp.lunch : null,
            party: userData.rsvp && userData.rsvp.party !== undefined ? userData.rsvp.party : null
          });
          this.setChoiceAvailability();
        }),
      this.rsvpForm.valueChanges.subscribe(form => {
        clearTimeout(this.debounceFirebaseUpdate);
        const updateData = Object.assign(
          {},
          form.hasOwnProperty('ceremony')
          && (this.userData.rsvp ? form.ceremony !== this.userData.rsvp.ceremony : true)
          && form.ceremony !== null
            ? {[`/guests/${this.uid}/rsvp/ceremony`]: form.ceremony}
            : {},
          form.hasOwnProperty('lunch')
          && (this.userData.rsvp ? form.lunch !== this.userData.rsvp.lunch : true)
          && form.lunch !== null
            ? {[`/guests/${this.uid}/rsvp/lunch`]: form.lunch}
            : {},
          form.hasOwnProperty('party')
          && (this.userData.rsvp ? form.party !== this.userData.rsvp.party : true)
          && form.party !== null
            ? {[`/guests/${this.uid}/rsvp/party`]: form.party}
            : {});
        this.debounceFirebaseUpdate = setTimeout(() => {
          if (!!Object.keys(updateData).length) {
            this.db.database.ref().update(updateData)
              .then(resp => {
                this.choiceChanged.emit();
              })
              .catch(err => {
                console.error('err', err);
              });


          }
        }, 100);
      })
    ];

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.userData) {
      this.setChoiceAvailability();
    }
  }

  setChoiceAvailability() {
    this.rsvpForm.controls['ceremony'][this.disableChoice('ceremony') ? 'enable' : 'disable']();
    this.rsvpForm.controls['lunch'][this.disableChoice('lunch') ? 'enable' : 'disable']();
    this.rsvpForm.controls['party'][this.disableChoice('party') ? 'enable' : 'disable']();
  }

  disableChoice(field: string) {
    return (this.userData[field] || field === 'ceremony')
        && (this.choiceAvailable === 'all' || this.choiceAvailable === field);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

